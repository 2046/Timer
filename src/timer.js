(function(){
  "use strict"

  function Timer(func, delay){
    this.func = func;
    this.delay = delay;
    this._breaker = {};

    this.start();
  }

  Timer.prototype.start = function(){
    var context = this;

    context._timerId = setTimeout(function(){
        if(context.func(context._breaker) !== context._breaker){
            context.start();
        }
    }, context.delay);
  }

  Timer.prototype.stop = function(){
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