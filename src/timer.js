(function(){
  "use strict"

  function Timer(func, delay){
    this.func = func;
    this.delay = delay || 0;

    this.start();
  }

  Timer.prototype.start = function(){
    var context = this;

    this._status = 'start';

    context._timerId = setTimeout(function(){
      context.func(context);
      if(context._status !== 'stop'){
        context.start();
      }
    }, context.delay);
  }

  Timer.prototype.stop = function(){
    this._status = 'stop';
    clearTimeout(this._timerId);
  }

  if(typeof define === 'function' && (define.amd || define.cmd)){
    define(function(require, exports, module){
        module.exports = Timer;
    });
  }else if(typeof window === 'object' && typeof window.document === 'object'){
    this.Timer = Timer;
  }
}).call(this);