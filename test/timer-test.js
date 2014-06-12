define(function(require, exports, module){
  "use strict"

  var expect, Timer, sinon;

  Timer = require('timer');
  sinon = require('sinon');
  expect = require('expect');

  describe('Timer', function(){
    it('执行一次', function(done){
      var spy = sinon.spy();

      new Timer(function(timer){
        spy();
        timer.stop();
      }, 50);

      setTimeout(function(){
        expect(spy.calledOnce).to.be(true);
        done();
      }, 120);
    });

    it('执行五次', function(done){
      var i = 0;
      var spy = sinon.spy();

      new Timer(function(timer){
        spy();
        if((++i) === 5){
          timer.stop();
        }
      }, 50);

      setTimeout(function(){
        expect(spy.callCount).to.be(5);
        done();
      }, 400);
    });

    it('在callback中使用stop()停止Timer', function(done){
      var spy = sinon.spy();

      new Timer(function(timer){
        spy();
        timer.stop();
      }, 50);

      setTimeout(function(){
        expect(spy.calledOnce).to.be(true);
        done();
      }, 120);
    });

    it('在callback中使用start()启动Timer', function(done){
      var i = 0;
      var spy = sinon.spy();

      new Timer(function(timer){
        spy();
        timer.stop();
        if((i++) <= 2){
          setTimeout(function(){
            timer.start();
          }, 50);
        }
      }, 50);

      setTimeout(function(){
        expect(spy.callCount).to.be(2);
        done();
      }, 200);
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

      var timer = new Timer(function(breaker){
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
      var spy = sinon.spy();
      this.timeout(5000);

      new Timer(function(timer){
        var elapsedTime = endTime ? (new Date() - endTime) : 100;
        spy();
        if((i++) === 10){
          timer.stop();
        }
        sleep(100);
        endTime = new Date();
      }, 100);

      setTimeout(function(){
        done();
        expect(spy.callCount).to.be(5);
      }, 1000);
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