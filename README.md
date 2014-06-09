Timer
=====

## 描述
带有start()和stop()功能的定时器

## 使用

### 正常加载
```html
<script src="js/timer/src/timer.js"></script>
```

### 模块化加载
```javascript
seajs.use(['timer'], function(Timer){
  var timer = new Timer(function(breaker){
    //somethings...
    return breaker;
  }, 1000);
});

require(['timer'], function(Timer){
  var timer = new Timer(function(){
    //somethings...
    return breaker;
  }, 1000);
});
```

## 例子

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>
<body>
  seajs.use(['timer'], function(Timer){
    new Timer(function(breaker){
      console.log('once timer');
      return breaker;
    }, 1000);

    var timer = new Timer(function(breaker){
      console.log('balabala...');
    }, 1000);

    timer.stop(); //停止timer

    timer.start(); //启动timer

    setTimeout(function(){
      timer.stop();
    }, 5000);
  });
</body>
</html>
```

## 支持

 - IE6+
 - Chrome
 - Firefox
 - Safari
 - 360安全浏览器6
 - 世界之窗 3
 - 搜狗高速浏览器
 - 猎豹安全浏览器
 - 360极速浏览器
 - 傲游云浏览器

## License

The MIT License (MIT)

Copyright (c) 2014 寒飞紫

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.