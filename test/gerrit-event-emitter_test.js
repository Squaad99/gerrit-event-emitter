'use strict';

var GerritEventEmitter = require('../lib/gerrit-event-emitter').GerritEventEmitter,
    EventEmitter2 = require('eventemitter2').EventEmitter2,
    sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect;

describe('GerritEventEmitter', function() {
  beforeEach(function() {
    this.subject = new GerritEventEmitter('gerrit.example.com', 29418, false);
  });

  afterEach(function() {
    this.subject.stop();
  });

  it('should inherit from EventEmitter2', function() {
    expect(this.subject).to.be.an.instanceof(EventEmitter2);
  });

  it('should set host property', function() {
    expect(this.subject.host).to.be.equal('gerrit.example.com');
  });

  it('should set port property', function() {
    expect(this.subject.port).to.be.equal(29418);
  });

  it('should set enabledAutoRestart property', function() {
    expect(this.subject.enabledAutoRestart).not.to.be.ok;
  });

  describe('#start()', function() {
    it('should start gerrit stream', function() {
      expect(this.subject.isStarted()).not.to.be.ok;
      this.subject.start();
      expect(this.subject.isStarted()).to.be.ok;
    });
  });

  describe('#stop()', function() {
    beforeEach(function() {
      this.subject.start();
    });

    it('should stop gerrit stream', function() {
      this.subject.stop();
      expect(this.subject.isStarted()).not.to.be.ok;
    });
  });

  describe('#onStreamWrite(output)', function() {
    it('should emit gerrit stream event', function(done) {
      this.subject.on('commentAdded', function(eventData) {
        expect(eventData.id).to.be.equal(19234);
        done();
      });
      this.subject.onStreamWrite('{"type":"comment-added","id":19234}\n');
    });

    it('should emit gerritStreamWrite event', function(done) {
      this.subject.on('gerritStreamWrite', function(output) {
        expect(output).to.be.equal('{"type":"comment-added","id":19234}\n');
        done();
      });
      this.subject.onStreamWrite('{"type":"comment-added","id":19234}\n');
    });
  });

  describe('#onStreamEnd(output)', function() {
    beforeEach(function() {
      sinon.spy(this.subject, 'start');
      sinon.spy(this.subject, 'stop');
    });

    it('should receive #stop', function() {
      this.subject.onStreamEnd('end');
      expect(this.subject.stop.called).to.be.ok;
    });

    it('should emit gerritStreamEnd event', function(done) {
      this.subject.on('gerritStreamEnd', function(output) {
        expect(output).to.be.equal('end');
        done();
      });
      this.subject.onStreamEnd('end');
    });

    context('enabledAutoRestart is true', function() {
      beforeEach(function() {
        this.subject.enabledAutoRestart = true;
      });

      it('should restart automatically', function() {
        this.subject.onStreamEnd('end');
        expect(this.subject.start.called).to.be.ok;
      });
    });

    context('enabledAutoRestart is false', function() {
      it('should not restart automatically', function() {
        this.subject.onStreamEnd('end');
        expect(this.subject.start.called).not.to.be.ok;
      });
    });
  });

  describe('#toCamelizedEventName(hypenated-event-name)', function() {
    it('should return the camelized event name whose first letter is low', function() {
      var actual = this.subject.toCamelizedEventName('patchset-created');
      expect(actual).to.be.equal('patchsetCreated');
    });
  });
});
