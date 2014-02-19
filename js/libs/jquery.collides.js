/*
  jQuery.collides plugin: collides 
  - simple collisionDetection
  © 2014 Thomas Frank, v 0.7b

   Check if one or more objects (DOM elments) collides
   with one or more other objects (DOM elements)

   If object collides the callbackFunc will be triggered.

   An optional third parameter is ms - how often the
   DOM will be checked. Default is 100 ms

   Collision detection is based on
   a simple bounding box method

  -----------------------------------------------------------

   Syntax for using:
   $("element(s)").collides("other element(s)", callbackFunc);

   callbackFunc will be triggered when element(s) and
   other element(s) collide. It will only be triggered once
   until one of the elements move again...

   The colliding elements will be sent as two in arguments
   (jQuery objects) to the callback function
    
 */

// browser standardization and polyfill for requestAnimationFrame
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame || function(aniFunc){
    var a = arguments.callee;
    a.start = a.start || new Date().getTime();
    setTimeout(function(){aniFunc(new Date().getTime() - a.start);},15);
  };

// plugin
(function ($) {

  // memory of all collide checks set
  var mem = [];

  // interval / request animation frame loop
  var s = function(t){
    for(var i = 0; i < mem.length; i++){
      if(t - (mem[i].lastCheck || 0) > mem[i].ms){
        checkCollide(mem[i]);
        mem[i].lastCheck =  t;
      }
    }
    var g2 = new Date().getTime();
    requestAnimationFrame(s);
  };
  requestAnimationFrame(s);

  // check for collides
  var top,bot,lef,rig,top2,bot2,lef2,rig2, o, o2, p;
  var checkCollide = function(mem){
    var a = $(mem.a);
    var b = $(mem.b);
    if(!mem.colliding){mem.colliding = [];}
    for(var i = 0; i < a.length; i++){
      o = a.eq(i).offset();
      top = o.top;
      lef = o.left;
      bot = top + a.eq(i).outerHeight();
      rig = lef + a.eq(i).outerWidth();
      if(!mem.colliding[i]){mem.colliding[i] = [];}
      for(var j = 0; j < b.length; j++){
        o2 = b.eq(j).offset();
        top2 = o2.top;
        lef2 = o2.left;
        bot2 = top2 + b.eq(j).outerHeight();
        rig2 = lef2 + b.eq(j).outerWidth();
        p = mem.colliding[i][j];
        mem.colliding[i][j] = !(lef > rig2 || lef2 > rig || top > bot2 || top2 > bot);
        mem.colliding[i][j] && mem.colliding[i][j] != p && mem.f(a.eq(i),b.eq(j));
      }
    }
  };

  $.fn.collides = function(colliders,callbackFunc,ms) {
    mem.push({a:this.selector,b:$(colliders).selector,f:callbackFunc,ms:ms || 100});
    return this;
  };

})(jQuery);