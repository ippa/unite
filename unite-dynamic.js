(function() {

  /* Copyright (c) 2010 Chris O'Hara <cohara87@gmail.com>. MIT Licensed *///Include the chain.js microframework (http://github.com/chriso/chain.js)
  function loadScript(a,b,c){var d=document.createElement("script");d.type="text/javascript",d.src=a,d.onload=b,d.onerror=c,d.onreadystatechange=function(){var a=this.readyState;if(a==="loaded"||a==="complete")d.onreadystatechange=null,b()},head.insertBefore(d,head.firstChild)}(function(a){a=a||{};var b={},c,d;c=function(a,d,e){var f=a.halt=!1;a.error=function(a){throw a},a.next=function(c){c&&(f=!1);if(!a.halt&&d&&d.length){var e=d.shift(),g=e.shift();f=!0;try{b[g].apply(a,[e,e.length,g])}catch(h){a.error(h)}}return a};for(var g in b){if(typeof a[g]==="function")continue;(function(e){a[e]=function(){var g=Array.prototype.slice.call(arguments);if(e==="onError"){if(d){b.onError.apply(a,[g,g.length]);return a}var h={};b.onError.apply(h,[g,g.length]);return c(h,null,"onError")}g.unshift(e);if(!d)return c({},[g],e);a.then=a[e],d.push(g);return f?a:a.next()}})(g)}e&&(a.then=a[e]),a.call=function(b,c){c.unshift(b),d.unshift(c),a.next(!0)};return a.next()},d=a.addMethod=function(d){var e=Array.prototype.slice.call(arguments),f=e.pop();for(var g=0,h=e.length;g<h;g++)typeof e[g]==="string"&&(b[e[g]]=f);--h||(b["then"+d.substr(0,1).toUpperCase()+d.substr(1)]=f),c(a)},d("chain",function(a){var b=this,c=function(){if(!b.halt){if(!a.length)return b.next(!0);try{null!=a.shift().call(b,c,b.error)&&c()}catch(d){b.error(d)}}};c()}),d("run",function(a,b){var c=this,d=function(){c.halt||--b||c.next(!0)},e=function(a){c.error(a)};for(var f=0,g=b;!c.halt&&f<g;f++)null!=a[f].call(c,d,e)&&d()}),d("defer",function(a){var b=this;setTimeout(function(){b.next(!0)},a.shift())}),d("onError",function(a,b){var c=this;this.error=function(d){c.halt=!0;for(var e=0;e<b;e++)a[e].call(c,d)}})})(this),addMethod("load",function(a,b){for(var c=[],d=0;d<b;d++)(function(b){c.push(function(c,d){loadScript(a[b],c,d)})})(d);this.call("run",c)});var head=document.getElementsByTagName("head")[0]||document.documentElement
  function addEvent(obj, type, fn, useCapture) {
    if(obj.addEventListener) { obj.addEventListener(type, fn, useCapture); }
    else if(obj.attachEvent) {
      obj["e" + type + fn] = fn;
      obj[type + fn] = function () { obj["e" + type + fn](window.event); }
      obj.attachEvent("on" + type, obj[type + fn]);
    }
    else { obj["on" + type] = obj["e" + type + fn]; }
  }

  /*
  * Find directory of this file (unite-dynamic.js).
  * Then use it as root-dir and load all source-files from subdirectory "src".
  */
  var scripts = document.getElementsByTagName('script')
  var path = scripts[scripts.length-1].src.split('?')[0]
  var root = path.split('/').slice(0, -1).join('/') + '/src/'

  if(typeof(unite) == "undefined")  unite = {dynamically_loaded: true};
  load(root+"core.js")
  .then(root+"polyfills.js")
  .then(root+"router.js")
  .thenRun(function () {
    /*
     * We can't rely on window.onload-callback in our game when using javascript loaders.
     * window.onload callback won't wait for dynamically inserted <script>-tags to finish before executing.
     *
     * Instead we have to use the unite.onload-callback when loading the lib through unite-dynamic.js.
     * Here we call it as the very last thing we do after all the components are loaded.
     */
    unite.init();
    if(unite.onload) { unite.onload() }
  });

})();
