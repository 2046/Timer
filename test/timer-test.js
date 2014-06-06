define(function(require, exports, module){
  "use strict"

  var expect, Timer, sinon;

  Timer = require('timer');
  sinon = require('sinon');
  expect = require('expect');

  describe('Timer', function(){
    it('执行一次', function(done){
      var spy = sinon.spy();

      new Timer(function(breaker){
        spy();
        return breaker;
      }, 50);

      setTimeout(function(){
        expect(spy.calledOnce).to.be(true);
        done();
      }, 120);
    });

    it('执行五次', function(done){
      var i = 0;
      var spy = sinon.spy();

      new Timer(function(breaker){
        spy();
        if((++i) === 5){
          return breaker;
        }
      }, 50);

      setTimeout(function(){
        expect(spy.callCount).to.be(5);
        done();
      }, 300);
    });

    it('使用breaker停止Timer', function(done){
      var spy = sinon.spy();

      new Timer(function(breaker){
        spy();
        return breaker;
      }, 50);

      setTimeout(function(){
        expect(spy.calledOnce).to.be(true);
        done();
      }, 120);
    });

    it('使用stop()停止Timer', function(done){
      var spy = sinon.spy();

      var timer = new Timer(function(breaker){
        spy();
      }, 100);

      setTimeout(function(){
        expect(spy.calledOnce).to.be(true);
        timer.stop();

        setTimeout(function(){
          expect(spy.calledOnce).to.be(true);
          done();
        }, 120);
      }, 120);
    });

    it('使用start()开始Timer', function(done){
      var spy = sinon.spy();

      var timer = new Timer(function(){
        spy();
      }, 100);
      timer.stop();

      setTimeout(function(){
        expect(spy.calledOnce).to.be(false);
        timer.start();

        setTimeout(function(){
          timer.stop();
          expect(spy.calledOnce).to.be(true);
          done();
        }, 120);
      }, 120);
    });

    it('Timer每次间隔100ms', function(done){
      var i = 0;
      var endTime = null;

      new Timer(function(breaker){
        var elapsedTime = endTime ? (new Date() - endTime) : 100;

        if((i++) === 9){
          done();
          expect([100, 101]).to.contain(elapsedTime);
          return breaker;
        }
        sleep(50);
        endTime = new Date();
      }, 100);
    });

    function sleep(milliseconds){
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
    }
  });
});