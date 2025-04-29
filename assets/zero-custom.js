/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.8",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha,"function"==typeof define&&define.amd?define(function(){return ha}):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.js.map



/* ------ Set up FadeSlider ------ */
class FadeSlider{
  constructor(selector_, options){
    this.selector = selector_;

    this.options = options || {};
    this.breakpoint = this.options.breakpoint || 797;   // {breakpoint: x} sets the breakpoint at x pixels width for mobile v desktop
    this.swipeThreshold = this.options.swipeThreshold || 10;    // {swipeThreshold: x} sets a threshold of x for recoginizing pan gestures
    this.xOffset = this.options.xOffset || 60;    // {xOffset: x} sets x offset for tweening out slides 
    this.addCSS = typeof (this.options.addCSS) === "undefined" ? true : this.options.addCSS;    // {addCSS: false} to turn off inline styling and rely on user stylesheets
    this.calcHeight = this.options.calcHeight || false; // {calcHeight: true} to add inline height value to slider equal to tallest slide -- useful for varying height layouts, works independently of addCSS option, (NOTE: needs resize functions added in);
    this.addAnimations = this.options.addAnimations || true;    // {addAnimations: false} to turn off tweening and use custom animations hooked into slideChangeStart or slideChangeEnd events
    this.hitPoints = typeof (this.options.hitPoints) === "undefined" ? true : this.options.hitPoints;      // {hitPoints: false} to turn off hit points on desktop and run hammer on each slide for mobile
    this.slideSelector = this.options.slideSelector || '.js-slider-cell';   // {slideSelector: slideSelector_} will look for a different selector value
    this.indexSelector = this.options.indexSelector || false;  // {indexSelector: indexSelector_} will query for indexSelector_ 
    this.arrows = this.options.arrows || false;    // {arrows: 'auto' } will create default arrow buttons,{arrows: arrowSelector_ } will look for selector and apply arrow functionality
    this.dots = this.options.dots || false;    // {dots: 'auto' } will create default slider dots, {dots: dotSelector_ } will look for selector and apply dot functionality
    this.infinite = typeof (this.options.infinite) === "undefined" ? true : this.options.infinite;    // {infinite: false} will stop the slider from looping at beginning and end
    this.autoPlay = this.options.autoPlay || false;    // {autoPlay: mSeconds} will set an autoplay on "x" ms -- must also be set to 'infinite'
    // this.autoInterval = null;

    this.slider = typeof(this.selector) === "object" ? this.selector : document.querySelector(this.selector);
    this.slides = this.slider.querySelectorAll(this.slideSelector);
    
    this.index = 0;
    this.count = this.slides.length;
    this.current = this.slides[this.index];
    this.next = null;
    this.previous = null;
    this.direction = null;

    this.dotEls = [];

    this.mobile = false;
    this.hammerInstance = null;
    this.animating = false;
    this.mouseover = false;

    this.prevTrigger = [];
    this.nextTrigger = [];
    this.indexMarker = null;

    //slide change events
    this.events = {
      slideChangeStart: null,
      slideChangeEnd: null,
      slideChangeData: {}
    };
  }

  init() {

    if(document.documentElement.clientWidth < this.breakpoint) {
      this.mobile = true;
    }

    this.initSlides();
    this.initEvents();
    this.initIndexMarker();
    this.createHitPoints();
    this.activateHitPoints();
    this.createArrows();
    this.createDots();
    this.activateArrows();
    this.mouseListener();
    this.activateAutoplay();
  }

  initSlides() {

    if(this.addCSS) {
      //set inline styles for slides
      // this.slider.style.position = "relative";
      for(let i = 0; i < this.count; i++) {
        this.slides[i].setAttribute("style", "position: absolute; top: 0; left: 0; bottom: 0; right: 0;");
      }
      // set opacity of all non-current slides to 0
      for(let i = 0; i < this.count; i++) {
        if(this.slides[i] !== this.current) {
          this.slides[i].style.opacity = 0;
        }
      }
    }

    //set prev and next slides
    if(this.count > 2) {
      this.next = this.slides[1];
      this.previous = this.slides[this.count - 1];
    } else {
      this.next = this.slides[1];
      this.previous = this.slides[1];
    }

    //set slide classes 
    this.current.classList.add("is-selected");
    this.previous.classList.add("is-previous");
    this.next.classList.add("is-next");
  }

  initEvents() {
    //slide change start
    this.events.slideChangeStart = new CustomEvent("slideChangeStart");
    //slide change end
    this.events.slideChangeEnd = new CustomEvent("slideChangeEnd");
  }

  updateSlideChangeData() {
    this.events.slideChangeData = {
      direction: this.direction,
      index: this.index,
      current: this.current,
      previous: this.previous,
      next: this.next
    };
  }

  slideChangeStart() {
    this.animating = true;
    this.updateSlideChangeData();
    this.events.slideChangeStart.data = this.events.slideChangeData;
    this.slider.dispatchEvent(this.events.slideChangeStart);
  }

  slideChangeEnd(slider) {
    this.updateSlideChangeData();
    this.events.slideChangeEnd.data = this.events.slideChangeData;
    this.slider.dispatchEvent(this.events.slideChangeEnd);
    this.animating = false;
  }

  initIndexMarker() {
    // check if indexSelector is on -- default false, else selector
    if(this.indexSelector) {
        this.indexMarker = this.slider.querySelector(this.indexSelector);
      }
  }

  updateIndexMarker() {
    this.indexMarker.innerHTML = this.index + 1;
  }

  updateDots() {
    
    Array.prototype.slice.call(this.dotEls).forEach((dot) => {
      dot.classList.remove("is-selected");
    });
    this.dotEls[this.index].classList.add("is-selected");
  }

  createDots() {
    if(this.dots){
      switch(this.dots){
        // generate out generic dot elements
        case 'auto':
            const dotWrapper = document.createElement("div");
            dotWrapper.classList.add("js-dot-wrapper");
            if(this.addCSS) {
              dotWrapper.setAttribute("style", "position:absolute; height:30px; bottom:0; right:50%; z-index:1; display:flex; justify-content:center;");
            }
            for(let i = 0; i < this.count; i++) {
              let dot = document.createElement("div");
              dot.classList.add("js-dot");
              if(i == 0) {
                dot.classList.add("is-selected");
              }
              if(this.addCSS) {
                dot.setAttribute("style", "height:30px; width: 30px; padding: 7px;");
              }
              dotWrapper.appendChild(dot);
              this.dotEls.push(dot);
            }

            this.slider.parentElement.appendChild(dotWrapper);
          break;
        default:

          const dotsArray = this.slider.querySelectorAll(this.dots);
          break;
      }
    }
  }


  createArrows() {
    if(this.arrows) {
      switch(this.arrows) {
        case 'auto':
            /* ------- svg code for default arrow ------- */
            const arrowSVG = `<svg></svg>`;

            const prevArrow = document.createElement("div");
            prevArrow.classList.add("js-prev-arrow");
            if(!this.infinite) {
              prevArrow.classList.add("disabled");
            }
            if(this.addCSS) {
              prevArrow.setAttribute("style", "position:absolute; width:48px; height: 48px; top:50%; right:0; z-index: 3;");
            }
            prevArrow.innerHTML = arrowSVG;
            this.slider.appendChild(prevArrow);
            this.prevTrigger.push(prevArrow);
        
            const nextArrow = document.createElement("div");
            nextArrow.classList.add("js-next-arrow");
            if(this.addCSS) {
              nextArrow.setAttribute("style", "position:absolute; width:48px; height: 48px; top:50%; right:0; z-index: 3;");
            }
            nextArrow.innerHTML = arrowSVG;
            this.slider.appendChild(nextArrow);
            this.nextTrigger.push(nextArrow);
          break;
        default:
        /* ------ presumes 'previous' arrow comes before 'next' arrow in dom, share selector ------ */
          const arrows = this.slider.parentElement.querySelectorAll(this.arrows);
          this.prevTrigger.push(arrows[0]);
          this.nextTrigger.push(arrows[1]);
          break;
      }
    }
  }

  activateArrows() {
    if(this.arrows) {
      let arrowIndex;
      /* ------ Check if hitpoints have been flagged 'false' ------ */
      if(this.hitPoints) {
        arrowIndex = 1;
      } else {
        arrowIndex = 0;
      }
      /* ------ Add click events ------ */
      this.prevTrigger[arrowIndex].addEventListener("click", () => {
          if(this.animating == false) {
            this.slideBackward(this);
          }
        });
      this.nextTrigger[arrowIndex].addEventListener("click", () => {
        if(this.animating == false) {
          this.slideForward(this);
        }
        });
    }
  }

  createHitPoints() {
    /* ------ Check if hitpoints have been flagged 'false' ------ */
    if(this.hitPoints) {
      /* ------- Check to see whether mobile or desktop ------- */
      if(this.mobile) {
        /* ------- create single hit point for mobile ------- */
        const prevNextTrigger = document.createElement("div");
        prevNextTrigger.classList.add("js-prev-next-trigger");
        if(this.addCSS) {
          prevNextTrigger.setAttribute("style", "position:absolute; width:100%; top:0; right:0; bottom: 0; z-index: 2;");
        }
        this.slider.appendChild(prevNextTrigger);
        this.nextTrigger.push(prevNextTrigger);
        this.prevTrigger.push(prevNextTrigger);
      } else {
        /* ------- default to desktop ------- */
        const prevTrigger = document.createElement("div");
        prevTrigger.classList.add("js-prev-trigger");
        if(this.addCSS) {
          prevTrigger.setAttribute("style", "position:absolute; width:50%; top:0; left:0; bottom: 0; z-index: 2;");
        }
        this.slider.appendChild(prevTrigger);
        this.prevTrigger.push(prevTrigger);
    
        const nextTrigger = document.createElement("div");
        nextTrigger.classList.add("js-next-trigger");
        if(this.addCSS) {
          nextTrigger.setAttribute("style", "position:absolute; width:50%; top:0; right:0; bottom: 0; z-index: 2;");
        }
        this.slider.appendChild(nextTrigger);
        this.nextTrigger.push(nextTrigger);
      }
    }
  }

  // feeds into activateHitPoints function
  panStart(e, slider) {
    // slider resets 'this'
    if (e.deltaX > this.swipeThreshold) {
      this.slideBackward(this);
    }
    if (e.deltaX < (-1 * this.swipeThreshold)) {
      this.slideForward(this);
    }
  }

  activateHitPoints() {
    /* ------ Check if hitpoints have been flagged 'false' ------ */
    if(this.hitPoints) {

      /* ------- Check to see whether mobile or desktop ------- */
      if(this.mobile) {

        /* ------- mobile -- use hammerjs for swipe detection ------- */
        // set touch-action to auto to maintain normal browser events
        this.hammerInstance = new Hammer(this.nextTrigger[0], {
          touchAction: 'auto'
        });

        // capture all movements
        this.hammerInstance.get('pan').set({
          direction   : Hammer.DIRECTION_ALL,
        });

        // listen for panstart
        this.hammerInstance.on('panstart', (e) => {
          this.panStart(e, this);
        });

      } else {

        /* ------- desktop -- set up click events ------- */
        this.prevTrigger[0].addEventListener("click", () => {
          this.slideBackward(this)});
        this.nextTrigger[0].addEventListener("click", () => {
          this.slideForward(this)});
      }
    } else {

      /* ------- add hammer instance to each slide rather than adding cover (mobile) ------- */
      if(this.mobile || this.touch) {
        this.hammerInstance = [];
        for(let i = 0; i < this.count; i++) {
          let slideObj = this.slides[i].querySelector(".slide-inner");
          let newHammerInstance = new Hammer(slideObj, {
            touchAction: 'auto'
          });
          // capture all movements
          newHammerInstance.get('pan').set({
            direction   : Hammer.DIRECTION_ALL,
          });
          // listen for panstart
          newHammerInstance.on('panstart', (e) => {
            this.panStart(e, this);
          });
          this.hammerInstance.push(newHammerInstance);
        }
      }
    }
  }

  mouseListener() {
    this.slider.addEventListener("mouseenter", () => {
      this.mouseover = true;
    });
    this.slider.addEventListener("mouseleave", () => {
      this.mouseover = false;
    });
  }

  autoPlayForward() {
    if(this.animating == false) {
      this.slideForward(this);
    }
  }

  activateAutoplay() {
    if(this.autoPlay) {
        setInterval(() => {
          if(this.animating == false && this.mouseover == false) {
            this.slideForward(this);
          }
        }, this.autoPlay);
      }
  }

  slideForward(slider) {
    this.direction = "forward";
    if(!this.animating){
      slider.updateCurrent(this.direction);
    }
  }

  slideBackward(slider) {
    this.direction = "backward";
    if(!this.animating){
      slider.updateCurrent(this.direction);
    }
  }

  updateCurrent(direction) {
    this.slideChangeStart();

    let xOffset;
    let prevIndex;
    let nextIndex;

    switch(direction) {
      case "forward":
        xOffset = -1 * this.xOffset;
        /* ---- Play Slide transitions ---- */
        if(this.addAnimations) {
          this.tweenSlides(this.current, xOffset, this.next);
        }
        /* ---- Update Index values ---- */
        if(this.count > 2) {
          if(this.index == this.count - 1) {
            prevIndex = this.index;
            this.index = 0;
            nextIndex = this.index + 1;
          } else if (this.index == this.count - 2) {
            prevIndex = this.index;
            this.index = this.index + 1;
            nextIndex = 0;
          } else {
            prevIndex = this.index;
            this.index = this.index + 1;
            nextIndex = this.index + 1;
          }
        } else {
          if(this.index == 0) {
            this.index = 1;
            prevIndex = 0;
            nextIndex = 0;
          } else {
            this.index = 0;
            prevIndex = 1;
            nextIndex = 1;
          }
        }
        break;
      case "backward":
        xOffset = this.xOffset;
        /* ---- Play Slide transitions ---- */
        if(this.addAnimations) {
          this.tweenSlides(this.current, xOffset, this.previous);
        }
        /* ---- Update Index values ---- */
        if(this.count > 2) {
          if(this.index == 0) {
            nextIndex = this.index;
            this.index = this.count - 1;
            prevIndex = this.index - 1;
          } else if (this.index == 1) {
            nextIndex = this.index;
            this.index = this.index - 1;
            prevIndex = this.count - 1;
          } else {
            nextIndex = this.index;
            this.index = this.index - 1;
            prevIndex = this.index - 1;
          }
        } else {
          if(this.index == 0) {
            this.index = 1;
            prevIndex = 0;
            nextIndex = 0;
          } else {
            this.index = 0;
            prevIndex = 1;
            nextIndex = 1;
          }
        }
        break;
    }
    
    /* ---- Update Slides ---- */
    this.next = this.slides[nextIndex];
    this.previous = this.slides[prevIndex];
    this.current = this.slides[this.index];
    this.updateSlideClasses();
    this.updateSlideChangeData();
    if(this.indexMarker) {
      this.updateIndexMarker();
    }
    if(this.dots) {
      this.updateDots();
    }
  }

  /* ---- SLIDE CHANGE ANIMATIONS ALL SET HERE ---- */
  tweenSlides(first, xOffset, second) {
    this.animating = true;
    let firstVideo = first.querySelector("video");
    let secondVideo = second.querySelector("video");
    if(secondVideo) {
      secondVideo.play();
    }
    TweenMax.to(first, 0.25, {x: xOffset, opacity: 0});
    TweenMax.to(second, 0.25, {opacity: 1, delay: 0.25});
    TweenMax.to(first, 0.01, {x: 0, delay: 0.5, onComplete: () => {
      if(firstVideo) {
        
      }
      this.animating = false;
      this.slideChangeEnd(this);
      }
    });
  }

  updateSlideClasses() {
    for(let i = 0; i < this.count; i++) {
      this.slides[i].classList.remove("is-selected");
      this.slides[i].classList.remove("is-previous");
    }
    this.current.classList.add("is-selected");
    this.previous.classList.add("is-previous");
  }

  destroy() {
    // if(this.autoPlay) {
    //   clearInterval(this.autoInterval);
    //   console.log("DESTROY INTERVAL");
    //   console.log(this);
    // }
  }

}


class mobilePnpWidget {
  constructor(selector) {
    this.selector = selector;
    this.widget = typeof(this.selector) === "object" ? this.selector : document.querySelector(this.selector);
    this.closeBtn = this.widget.querySelector(".pnp-mobile-close");
    this.cover = this.widget.querySelector(".pnp-mobile-cover");
    this.swipeThreshold = 8;
    this.open = true;
  }

  closeWidget(){
    Array.prototype.slice.call(globalStorage.zeroPnp.heroes).forEach(mobilePnp => {
      mobilePnp.classList.add("is-closed");
    });
    Array.prototype.slice.call(globalStorage.mobilePnpWidgets).forEach(widget => {
      widget.open = false;
    });
  }

  activateCloseBtn() {
    this.closeBtn.addEventListener("click", ()=>{
      if(this.open) {
        this.closeWidget();
      }
    });
  }

  openWidget(){
    Array.prototype.slice.call(globalStorage.zeroPnp.heroes).forEach(mobilePnp => {
        mobilePnp.classList.remove("is-closed");
    });
    Array.prototype.slice.call(globalStorage.mobilePnpWidgets).forEach(widget => {
      widget.open = true;
    });
  }

  activateOpen() {
    this.cover.addEventListener("click", ()=> {
      if(!this.open) {
        this.openWidget();
      }
    });
  }


  // feeds into activateHitPoints function
  panStart(e) {

    if (e.deltaX < this.swipeThreshold * -1) {
      if(this.open) {
        this.closeWidget();
      }
    }
  }


  activateSwipe() {
      
      
      let videoObj = this.widget.querySelector(".video-wrapper");
      let newHammerInstance = new Hammer(videoObj, {
        touchAction: 'auto'
      });
      // capture all movements
      newHammerInstance.get('pan').set({
        direction   : Hammer.DIRECTION_ALL,
      });
      // listen for panstart
      newHammerInstance.on('panstart', (e) => {
        console.log(e);
        this.panStart(e, this);
      });

      this.hammerInstance = newHammerInstance;

  }


  init() {
    this.activateSwipe();
    this.activateCloseBtn();
    this.activateOpen();
    globalStorage.mobilePnpWidgets.push(this);
  }
}


/* ---------------------------------------- GLOBAL STORAGE --------------------------------- */


const globalStorage = {
  isMobile: false,
  isTouch: false,
  windowHeight: 0,
  windowWidth: 0,
  docScroll: 0,
  zeroPnp: {
    index: 0,
    heroes: null,
    features: null,
    measures: [],
    ranges: [],
    inrange: true
  },
  starburstObj: {
    top: null,
    bottom: null,
    height: null,
    progress: 0,
    tl: null,
  },
  alienObj: {
    top: null,
    bottom: null,
    height: null,
    progress: 0,
    tl: null,
    video: null,
    isPlaying: false
  },
  supportsWebM: false,
  featuredImg: null,
  featuredImgBound: {
    top: null,
    bottom: null
  },
  featuredImgFixed: false,
  mobilePnpWidgets: []
}


function initGlobalStorageValues() {
  if(document.documentElement.clientWidth < 1025) {
    globalStorage.isMobile = true;
  }

  globalStorage.docScroll = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

  globalStorage.windowHeight = window.innerHeight;

  globalStorage.windowWidth = document.documentElement.clientWidth;
}


/* ---------------------------------------- PNP Slideshows --------------------------------- */

function initPnpSlideshowOpen() {
  const pnpSlideshows = document.querySelectorAll(".pnp-slide-deck");
  const pnpSlideshowBg = document.getElementById("pnp-slide-bg");
  const pnpSlideshowWrapper = document.getElementById("pnp-offscreen-wrapper");

  let pnpTriggers;
  let pnpSecondaryTriggers;

  if(globalStorage.isMobile) {
    pnpTriggers = document.querySelectorAll("#zero-mobile-pnp .pnp-video");
    // pnpSecondaryTriggers = document.querySelectorAll("#zero-mobile-pnp .pnp-mobile-open");
  } else {
    pnpTriggers = document.querySelectorAll("#pnp-images-wrapper .pnp-video");
  }


  for(let i = 0; i < pnpTriggers.length; i++) {
    if(!globalStorage.isMobile) {
      pnpTriggers[i].addEventListener("click", ()=>{
        pnpSlideshowWrapper.classList.add("is-active");
        pnpSlideshowBg.classList.add("is-active");
        pnpSlideshows[i + 1].classList.add("is-active");
        let playingVid = pnpSlideshows[i + 1].querySelector(".is-selected video");
        if(playingVid) {
          playingVid.play();
        }
      });
      // pnpSecondaryTriggers[i].addEventListener("click", ()=>{
      //   pnpSlideshowWrapper.classList.add("is-active");
      //   pnpSlideshowBg.classList.add("is-active");
      //   pnpSlideshows[i + 1].classList.add("is-active");
      //   let playingVid = pnpSlideshows[i + 1].querySelector(".is-selected video");
      //   if(playingVid) {
      //     playingVid.play();
      //   }
      // });
    } else {
      let innerTrigger = pnpTriggers[i].querySelector(".video-wrapper");
      innerTrigger.addEventListener("click", ()=>{
        pnpSlideshowWrapper.classList.add("is-active");
        pnpSlideshowBg.classList.add("is-active");
        pnpSlideshows[i].classList.add("is-active");
        let playingVid = pnpSlideshows[i].querySelector(".is-selected video");
        if(playingVid) {
          playingVid.play();
        }
      });
    }
  }
  
}

function initPnpSlideshowClose() {
  const pnpSlideshowWrapper = document.getElementById("pnp-offscreen-wrapper");
  const pnpSlideshowBg = document.getElementById("pnp-slide-bg");
  const pnpSlideshows = document.querySelectorAll(".pnp-slide-deck");
  const closeTriggers = document.querySelectorAll(".pnp-slide-deck .pnp-slide-deck-close");

  pnpSlideshowBg.addEventListener("click", ()=>{
    Array.prototype.slice.call(pnpSlideshows).forEach((slideshow)=>{
      slideshow.classList.remove("is-active");
      let playingVid = slideshow.querySelector(".is-selected video");
      if(playingVid) {
        playingVid.pause();
      }
    });
    pnpSlideshowBg.classList.remove("is-active");
    pnpSlideshowWrapper.classList.remove("is-active");
  });

  Array.prototype.slice.call(closeTriggers).forEach((trigger)=>{
    trigger.addEventListener("click", ()=>{
      Array.prototype.slice.call(pnpSlideshows).forEach((slideshow)=>{
        slideshow.classList.remove("is-active");
      });
      pnpSlideshowBg.classList.remove("is-active");
      pnpSlideshowWrapper.classList.remove("is-active");
    });
  });
}


function initPnPSlideshows() {
  const pnpSlideshows = document.querySelectorAll(".pnp-slide-deck-wrapper");


  Array.prototype.slice.call(pnpSlideshows).forEach((slideshow) => {
    let exampleSlideshow = new FadeSlider(slideshow, {
      slideSelector: '.pnp-slide',
      addCSS: false,
      arrows: ".arrow",
      dots: "auto",
      breakpoint: 8000,
      hitPoints: false
    });
    
    exampleSlideshow.init();
  });


  initPnpSlideshowOpen();
  initPnpSlideshowClose();
}

function initMobileHeroSlideshow() {
  if(globalStorage.isMobile) {
    const mobileHeroSlides = document.querySelector("#zero-mobile-header-slider .slide-container");

    let mobileHeroSlideshow = new FadeSlider(mobileHeroSlides, {
      slideSelector: '.mobile-slide',
      addCSS: false,
      dots: "auto",
      breakpoint: 8000,
    });
    
    mobileHeroSlideshow.init();
  }
}


/* ------------------------------------ PNP Page measurement STUFF --------------------- */


function grabPnpMeasurements() {

  let heroes;

  if(globalStorage.isMobile) {
    heroes = document.querySelectorAll("#zero-mobile-pnp .pnp-video");
  } else {
    heroes = document.querySelectorAll(".pnp-feature");
  }
  

  globalStorage.zeroPnp.heroes = heroes;


  let features = document.querySelectorAll(".main-collection-item.featured");

  globalStorage.zeroPnp.features = features;

  let windowHeight = window.innerHeight;
  let measure;

  globalStorage.zeroPnp.measures = [];

  for(let i = 0; i < features.length; i++) {
    measure = globalStorage.zeroPnp.features[i].getBoundingClientRect().top - globalStorage.windowHeight + globalStorage.docScroll;

    if(globalStorage.isMobile) {
      measure = globalStorage.zeroPnp.features[i].getBoundingClientRect().top - 300 + globalStorage.docScroll;
    }
    globalStorage.zeroPnp.measures.push(measure);
  }

  let collectionBottom = document.getElementById("zero-main-collection").getBoundingClientRect().bottom + globalStorage.docScroll;

  if(globalStorage.isMobile) {
    collectionBottom = collectionBottom - globalStorage.windowHeight + globalStorage.docScroll;
  }

  globalStorage.zeroPnp.measures.push(collectionBottom);

  let range;
  for(let i=0; i < globalStorage.zeroPnp.measures.length - 1; i++) {
    range = [globalStorage.zeroPnp.measures[i], globalStorage.zeroPnp.measures[i + 1]]
    globalStorage.zeroPnp.ranges.push(range);
  }

  if(globalStorage.isMobile) {
  /* ---------------------- code for mobile-only PNP swipe-to-close --------------------- */

  Array.prototype.slice.call(globalStorage.zeroPnp.heroes).forEach(mobilePnp => {
    let newWidget = new mobilePnpWidget(mobilePnp);
    newWidget.init();
  });
  }


}

function checkRange(scrollY, range) {
  if(range[0] < scrollY && scrollY < range[1]) {
    return true;
  } else {
    return false;
  }
}

function checkRanges(scrollY) {
  let inRanges = false;
  for(let i = 0; i < globalStorage.zeroPnp.ranges.length; i++) {
    if(checkRange(scrollY, globalStorage.zeroPnp.ranges[i])) {
      inRanges = true;
      return i;
    }
  }
  if(inRanges === false) {
    return 100;
  }
}


function swapPnP(index) {


  if((index == 100 && globalStorage.zeroPnp.inrange === true) || index > globalStorage.zeroPnp.heroes.length) {

    Array.prototype.slice.call(globalStorage.zeroPnp.heroes).forEach((hero)=> {
      hero.classList.remove("is-selected");
    });
    globalStorage.zeroPnp.inrange = false;
  } else if(index != 100 && globalStorage.zeroPnp.inrange === false) {

    globalStorage.zeroPnp.heroes[index].classList.add("is-selected");
    let videos = globalStorage.zeroPnp.heroes[index].querySelectorAll("video");
    if(videos){
      Array.prototype.slice.call(videos).forEach((video) => {
        if(video.readyState < 4) {
          let pnpVidInterval = setInterval(()=>{
            if(video.readyState > 3){
              video.play();
              clearInterval(pnpVidInterval);
            }
          }, 10);
        } else {
          video.play();
        }
      });
    }

    globalStorage.zeroPnp.heroes[index]
    globalStorage.zeroPnp.inrange = true;
  } else {

    if(index == globalStorage.zeroPnp.index || !globalStorage.zeroPnp.heroes[index]) {
      return;
    } else {

      globalStorage.zeroPnp.heroes[index].classList.add("is-selected");
      let videos = globalStorage.zeroPnp.heroes[index].querySelectorAll("video");

    if(videos){
      Array.prototype.slice.call(videos).forEach((video) => {
        if(video.readyState < 4) {
          let pnpVidInterval = setInterval(()=>{
            if(video.readyState > 3){
              video.play();
              clearInterval(pnpVidInterval);
            }
          }, 10);
        } else {
          video.play();
        }
      });
    }
      globalStorage.zeroPnp.heroes[globalStorage.zeroPnp.index].classList.remove("is-selected");
      let oldvideos = globalStorage.zeroPnp.heroes[globalStorage.zeroPnp.index].querySelectorAll("video");
      if(oldvideos) {
        if(oldvideos){
          Array.prototype.slice.call(oldvideos).forEach((video) => {
            video.pause();
          });
        }
      }
      globalStorage.zeroPnp.index = index;
    }
  }
}



function initDesktopPnp() {
  if(globalStorage.isMobile) { return; }

  grabPnpMeasurements();
  grabFeaturedImgBoundary();
  calcFeaturedImg(globalStorage.docScroll);
}

function initMobilePnp() {
  if(!globalStorage.isMobile) { return; }
  grabPnpMeasurements();

}


function grabStarburstMeasurements() {
  let starburstBounds = document.getElementById("starburst-review").getBoundingClientRect();

  globalStorage.starburstObj.top = starburstBounds.top + globalStorage.docScroll - globalStorage.windowHeight;
  globalStorage.starburstObj.bottom = starburstBounds.bottom + globalStorage.docScroll;
  globalStorage.starburstObj.height = globalStorage.starburstObj.bottom - globalStorage.starburstObj.top;

}

function initStarburst() {
  grabStarburstMeasurements();
  let starburstTL = new gsap.timeline({paused: true});
  starburstTL.to("#starburst-svg", 4, {rotation:220, transformOrigin:"50% 50%"});
  globalStorage.starburstObj.tl = starburstTL;
}


function calcStarburstProgress(docScroll) {
  if(globalStorage.starburstObj.top < docScroll && docScroll < globalStorage.starburstObj.bottom) {
    let progress = (docScroll - globalStorage.starburstObj.top) / globalStorage.starburstObj.height;
    globalStorage.starburstObj.tl.progress(progress);
  }
}

function grabFeaturedImgBoundary() {
  let mainCollection = document.getElementById("zero-main-collection");
  let featuredImg = document.getElementById("pnp-images-wrapper");
  let topBar = document.querySelector(".page-width.header-main__container");
  globalStorage.featuredImg = featuredImg;
  globalStorage.featuredImgBound.bottom = mainCollection.getBoundingClientRect().bottom + globalStorage.docScroll - globalStorage.windowHeight;
  globalStorage.featuredImgBound.top = 27;
}




function calcFeaturedImg(docScroll) {


  if(globalStorage.isMobile === true) {return;}
  if(docScroll < globalStorage.featuredImgBound.top && globalStorage.featuredImgFixed === true) {
    globalStorage.featuredImg.classList.add("unfixed-top");
    globalStorage.featuredImgFixed = false;
  }
  if(docScroll > globalStorage.featuredImgBound.bottom && globalStorage.featuredImgFixed === true) {
    globalStorage.featuredImg.classList.add("unfixed-bottom");
    globalStorage.featuredImgFixed = false;
  } else if (docScroll < globalStorage.featuredImgBound.bottom && docScroll > globalStorage.featuredImgBound.top && globalStorage.featuredImgFixed === false) {
    globalStorage.featuredImg.classList.remove("unfixed-bottom");
    globalStorage.featuredImg.classList.remove("unfixed-top");
    globalStorage.featuredImgFixed = true;
  }
}

function amountScrolled() {
  globalStorage.docScroll = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

  swapPnP(checkRanges(globalStorage.docScroll));
  calcStarburstProgress(globalStorage.docScroll);
  calcAlienProgress(globalStorage.docScroll);
  calcFeaturedImg(globalStorage.docScroll);
}


function scrollListener() {
  window.addEventListener("scroll", function(){
    amountScrolled();
  }, false);
}

/* ------------------------------------ ALIEN STUFF --------------------- */

// INTERNATIONALIZATION -- TBD



function placeImgOrVid() {

  let isDomestic = false;
  let requestReturned = false;

  let domesticVid = "https://cdn.shopify.com/s/files/1/0118/0862/files/Crap_Eyewear-2020-alien-website-Domestic.webm?v=1600115900";
  let domesticGif = "https://cdn.shopify.com/s/files/1/0118/0862/files/Crap_Eyewear-2020-alien-website-Domestic.gif?v=1600115856";
  let intlVid = "https://cdn.shopify.com/s/files/1/0118/0862/files/Crap_Eyewear-2020-alien-website-International.webm?v=1600115892";
  let intlGif = "https://cdn.shopify.com/s/files/1/0118/0862/files/Crap_Eyewear-2020-alien-website-International.gif?v=1600115856";



  /*
    Check IP info for domestic/intl switch
  -------------------------------------------------- */

  var endpoint = 'https://pro.ip-api.com/json/?fields=status,message,countryCode&key=EFQeVib4xuH3gn0';

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      requestReturned = true;
      
      if(response.status !== 'success') {
        console.log('query failed: ' + response.message);
        return;
      }
      // switch to domestic when inside US
      if(response.countryCode == "US") {
        isDomestic = true;
      }

    }
  };
  xhr.open('GET', endpoint, true);
  xhr.send();

  /*
    Check for webm support
  -------------------------------------------------- */
  let video = document.createElement('video');
  if (video.canPlayType('video/webm; codecs="vp8, vorbis"')) {
    globalStorage.supportsWebM = true;
  }

  let wrapper = document.getElementById("alien-banner");

  function checkIpApi() {
    if(requestReturned){
      clearInterval(ipApiInterval);
      if (globalStorage.supportsWebM) {
        let video = document.createElement("video");
        globalStorage.alienObj.video = video;
        var source = document.createElement("source");
        if(isDomestic) {
          source.setAttribute("src", domesticVid);
        } else {
          source.setAttribute("src", intlVid);
        }
        video.appendChild(source);
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.load();
        video.oncanplay = function() {
          wrapper.appendChild(video);
          // video.pause();
        }
      } else {
        let image = document.createElement("img");
        if(isDomestic) {
          image.src = domesticGif;
        } else {
          image.src = intlGif;
        }
        image.onload = function() {
          wrapper.appendChild(image);
        }
      }
    }
  }

  const ipApiInterval = setInterval(checkIpApi, 1000);


}


function grabAlienMeasurements() {
  let sections = document.querySelectorAll(".collection-section")
  let sectionTop = sections[1].getBoundingClientRect().top;

  globalStorage.alienObj.top = sectionTop + globalStorage.docScroll - globalStorage.windowHeight;

  globalStorage.alienObj.bottom = sectionTop + globalStorage.docScroll;
  globalStorage.alienObj.height = globalStorage.alienObj.bottom - globalStorage.alienObj.top;

}



function calcAlienProgress(docScroll) {
  if(globalStorage.alienObj.top < docScroll && docScroll < globalStorage.alienObj.bottom) {
    if(globalStorage.alienObj.video && globalStorage.alienObj.isPlaying === false) {
      globalStorage.alienObj.video.play();
      globalStorage.alienObj.isPlaying = true;
    }
    let progress = (docScroll - globalStorage.alienObj.top) / globalStorage.alienObj.height;
    globalStorage.alienObj.tl.progress(progress);
  } else {
    if(globalStorage.alienObj.video && globalStorage.alienObj.isPlaying === true) {
      globalStorage.alienObj.isPlaying = false;
      globalStorage.alienObj.video.pause();
    }
  }
}


  function alienInit() {

    placeImgOrVid();

    grabAlienMeasurements();
    let alienTL = new gsap.timeline({paused: true});
    let dist = -1.3 * globalStorage.windowWidth;
    if(globalStorage.isMobile) {
      dist = -1.6 * globalStorage.windowWidth;
    }
    alienTL.to("#alien-banner", 4, {x:dist});
    globalStorage.alienObj.tl = alienTL;
  }




/* ------------------------------------ KILL OFF 3RD PARTY POPUPS --------------------- */

  function killPopups() {
    document.body.classList.add("kill-popups");
  }
  


  /* ------------------------------------ RESIZE FUNCTION --------------------- */

function zeroWindowResize() {
  const zeroCollection = document.getElementById("collection-zero");
  if(!zeroCollection) { return; }

  initGlobalStorageValues();
  initDesktopPnp();
  initMobilePnp();
  amountScrolled();
}


/* ------------------------------------ INITIALIZE EVERYTHING --------------------- */

function zeroCustomInit() {
  const zeroCollection = document.getElementById("collection-zero");
  if(!zeroCollection) { return; }


  setTimeout(function(){
    let videos = document.getElementsByTagName("video");
		Array.prototype.slice.call(videos).forEach((vid)=>{
      if(vid.classList.contains("visible-video")) {
        let isSelected = vid.closest(".is-selected");
        if(isSelected) {
          vid.play();
        } else {
          vid.pause();
        }
      } else {
        vid.pause();
      }

			let vidInterval = setInterval(()=>{
				if(vid.readyState > 3){
					clearInterval(vidInterval);
				}
			}, 10);
		});
  }, 1000);



  initGlobalStorageValues();
  killPopups();
  initDesktopPnp();
  initMobilePnp();
  initStarburst();
  amountScrolled();
  scrollListener();
  alienInit();
  initPnPSlideshows();
  initMobileHeroSlideshow();
}


let fired = false;

window.addEventListener('DOMContentLoaded', (event)=> {
  fired = true;
  zeroCustomInit();
});



if(document.readyState !== "loading" && fired == false){
  fired = true;
  zeroCustomInit();
}

// window.addEventListener('popstate', (event) => {
//   console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
//   console.log(document.readyState);
// });


window.addEventListener('resize', zeroWindowResize);







