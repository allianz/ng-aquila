!function(){function e(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,o){if(!e)return;if("string"==typeof e)return t(e,o);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return t(e,o)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{dWOj:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var r=n("EM62"),s=n("ZTXN"),c=n("e2XY"),a=n("fAiE"),l=n("E5oP"),u=n("2kYt"),h=n("VKQk");function p(e,t){if(1&e){var o=r.Ub();r.Tb(0,"span",6),r.ac("click",(function(){return r.vc(o),r.ec(2).emitCloseButtonClick()}))("keyup",(function(e){return r.vc(o),r.ec(2)._onCloseKeyup(e)})),r.Ob(1,"nx-icon",7),r.Sb()}}function v(e,t){if(1&e){var o=r.Ub();r.Tb(0,"div",0),r.ac("click",(function(e){return r.vc(o),r.ec()._onClick(e)})),r.Tb(1,"div",1),r.Ob(2,"div",2),r.Hc(3,p,2,0,"span",3),r.Tb(4,"span",4),r.ic(5),r.Pb(6,5),r.Sb(),r.Sb(),r.Sb()}if(2&e){var n=r.ec();r.kc("ngClass",n.classList)("dir",n.dir),r.Bb(2),r.kc("ngStyle",n.arrowStyle),r.Bb(1),r.kc("ngIf",n.showCloseButton),r.Bb(1),r.kc("id",n.id),r.Bb(2),r.kc("ngTemplateOutlet",null==n._lazyContent?null:n._lazyContent._template)}}var f=["*"],d=function(){var e=function(){function e(t){o(this,e),this._dir=t,this.closed=new r.o,this.closeButtonClick=new s.a,this.showCloseButton=!1,this.arrowStyle={}}return i(e,[{key:"ngOnDestroy",value:function(){this.closed.complete()}},{key:"emitCloseButtonClick",value:function(){this.closeButtonClick.next()}},{key:"_onCloseKeyup",value:function(e){!e||e.keyCode!==a.f&&e.keyCode!==a.o||this.emitCloseButtonClick(),e.preventDefault()}},{key:"emitClosedEvent",value:function(){this.closed.emit()}},{key:"_onClick",value:function(e){e.stopPropagation()}},{key:"dir",get:function(){return this._dir&&"rtl"===this._dir.value?"rtl":"ltr"}},{key:"classList",get:function(){if(this.direction)return"nx-popover--"+this.direction}}]),e}();return e.\u0275fac=function(t){return new(t||e)(r.Nb(l.c,8))},e.\u0275cmp=r.Hb({type:e,selectors:[["nx-popover"]],contentQueries:function(e,t,o){var n;1&e&&r.Gb(o,c.a,!0),2&e&&r.qc(n=r.bc())&&(t._lazyContent=n.first)},viewQuery:function(e,t){var o;1&e&&r.Nc(r.N,!0),2&e&&r.qc(o=r.bc())&&(t.templateRef=o.first)},outputs:{closed:"nxClosed"},exportAs:["nxPopover"],ngContentSelectors:f,decls:1,vars:0,consts:[["role","tooltip","aria-hidden","false",3,"ngClass","dir","click"],["tabindex","0",1,"nx-popover__content"],[1,"nx-popover__arrow",3,"ngStyle"],["aria-label","close","tabindex","0","role","button","class","nx-popover__close-icon",3,"click","keyup",4,"ngIf"],[3,"id"],[3,"ngTemplateOutlet"],["aria-label","close","tabindex","0","role","button",1,"nx-popover__close-icon",3,"click","keyup"],["aria-hidden","true","name","close"]],template:function(e,t){1&e&&(r.jc(),r.Hc(0,v,7,6,"ng-template"))},directives:[u.q,l.b,u.w,u.t,u.A,h.a],styles:[".nx-popover__content[_ngcontent-%COMP%]{font-size:var(--popover-content-font-size);line-height:var(--popover-content-line-height);font-weight:var(--popover-content-font-weight);letter-spacing:var(--popover-content-letter-spacing);background-color:var(--popover-background-color);color:var(--popover-text-color);border:1px solid var(--popover-border-color);border-radius:4px;box-shadow:0 2px 4px rgba(65,65,65,.5);padding:23px;display:block}.nx-popover__content[_ngcontent-%COMP%]:focus{outline:none}.nx-popover__content[_ngcontent-%COMP%]::-moz-focus-inner{border:0}.nx-popover__close-icon[_ngcontent-%COMP%]{display:flex;position:absolute;top:4px;right:4px;cursor:pointer;font-size:var(--popover-close-icon-size);color:var(--popover-close-icon-color);border-radius:2px}[dir=rtl][_ngcontent-%COMP%]   .nx-popover__close-icon[_ngcontent-%COMP%]{right:auto;left:4px}.nx-popover__close-icon[_ngcontent-%COMP%]:focus{outline:none}.nx-popover__close-icon[_ngcontent-%COMP%]::-moz-focus-inner{border:0}.nx-popover__close-icon.cdk-keyboard-focused[_ngcontent-%COMP%], .nx-popover__content.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow)}@media screen and (-ms-high-contrast:active){.nx-popover__close-icon.cdk-keyboard-focused[_ngcontent-%COMP%], .nx-popover__content.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px windowText}}.nx-popover__arrow[_ngcontent-%COMP%]{width:12px;height:12px;background-color:inherit;position:absolute;transform:translate(-50%);border-top:1px solid var(--popover-border-color);border-left:1px solid var(--popover-border-color)}.nx-popover--top[_ngcontent-%COMP%]   .nx-popover__arrow[_ngcontent-%COMP%]{transform:translate(-50%) rotate(225deg);bottom:-5px;box-shadow:2px 2px 1px 1px var(--popover-background-color),-2px -2px 4px rgba(65,65,65,.5)}.nx-popover--right[_ngcontent-%COMP%]   .nx-popover__arrow[_ngcontent-%COMP%]{transform:translateY(-50%) rotate(-45deg);left:-5px}.nx-popover--bottom[_ngcontent-%COMP%]   .nx-popover__arrow[_ngcontent-%COMP%]{transform:translate(-50%) rotate(45deg);top:-5px}.nx-popover--left[_ngcontent-%COMP%]   .nx-popover__arrow[_ngcontent-%COMP%]{transform:translateY(-50%) rotate(135deg);right:-5px}"],changeDetection:0}),e}()},e2XY:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var i=n("EM62"),r=function(){var e=function e(t){o(this,e),this._template=t};return e.\u0275fac=function(t){return new(t||e)(i.Nb(i.N))},e.\u0275dir=i.Ib({type:e,selectors:[["ng-template","nxPopoverContent",""]]}),e}()},kMq3:function(t,n,r){"use strict";r.d(n,"a",(function(){return O}));var s=r("5XID"),c=r("HYj3"),a=r("Sv/w"),l=r("EM62"),u=r("ZTXN"),h=r("KTx3"),p=r("kuMc"),v=r("YtkY"),f=r("xVbo"),d=r("2kYt"),b=r("fAiE"),g=r("e4iD"),_=r("sg/T"),y=r("cZZj"),k=r("E5oP"),m=0;function w(e){return Error('Popover direction "'.concat(e,'" is invalid.'))}var O=function(){var t=function(){function t(e,n,i,r,s,c,a,v,f,d){var g=this;o(this,t),this.overlay=e,this.elementRef=n,this.viewContainerRef=i,this.eventManager=r,this._focusTrapFactory=s,this._focusMonitor=c,this._ngZone=a,this._platform=v,this._dir=f,this._document=d,this._destroyed=new u.a,this._overlayDestroyed=new u.a,this._show=!1,this._closeable=null,this._modal=!1,this._elementFocusedBeforePopoverWasOpened=null,this._manualListeners=new Map,this._possiblePopoverDirections=["bottom","top","left","right"],this.id="nx-popover-"+m++,this.changeShow=new l.o,this._closeOnClickOutside=!0,this.direction="right",this.popoverInitialVisible=!1,this.visibleChange=new l.o,this.trigger="click",this.scrollStrategy="close",this._documentClickObservable=Object(h.a)(document,"click");var _=n.nativeElement;this._platform.IOS||this._platform.ANDROID?this._manualListeners.set("touchstart",(function(){"hover"===g.trigger&&(g.show=!0)})):this._manualListeners.set("mouseenter",(function(){"hover"===g.trigger&&(g.show=!0)})).set("mouseleave",(function(){"hover"===g.trigger&&(g.show=!1)})).set("keydown",(function(e){switch(e.keyCode){case b.o:case b.f:g.handleClick();break;default:return}})),this._manualListeners.forEach((function(e,t){return _.addEventListener(t,e)})),this._focusMonitor.monitor(_).pipe(Object(p.a)(this._destroyed)).subscribe((function(e){"keyboard"===e&&"hover"===g.trigger&&g._ngZone.run((function(){return g.show=!0}))})),this._dirChangeSubscription=this._dir.change.subscribe(this._dirChangeHandler.bind(this))}return i(t,[{key:"ngOnInit",value:function(){this.popover.showCloseButton=this.isCloseable()}},{key:"ngAfterViewInit",value:function(){var e=this;this.popover.id=this.id,this.eventManager.addGlobalEventListener("window","keyup.esc",(function(){e.isOpen&&(e.show=!1)})),this.popover.closeButtonClick.pipe(Object(p.a)(this._destroyed)).subscribe((function(){e.show=!1})),(this.popoverInitialVisible||this._show)&&(this.show=!0)}},{key:"ngOnDestroy",value:function(){var e=this;this.show=!1,this._manualListeners.forEach((function(t,o){e.elementRef.nativeElement.removeEventListener(o,t)})),this._manualListeners.clear(),this._dirChangeSubscription.unsubscribe(),this._overlayDestroyed.next(),this._destroyed.next(),this._overlayDestroyed.complete(),this._destroyed.complete()}},{key:"isCloseable",value:function(){return"click"===this.trigger&&null===this._closeable||this._closeable}},{key:"updatePosition",value:function(){this._positionStrategy&&this._positionStrategy.apply()}},{key:"handleClick",value:function(){"click"===this.trigger?this.show=!this.isOpen:"hover"===this.trigger&&(this.show=!0)}},{key:"open",value:function(){this.show=!0}},{key:"close",value:function(){this.show=!1}},{key:"toggle",value:function(){this.show=!this.show}},{key:"openPopover",value:function(){if(!this.createOverlay().hasAttached()){this._embeddedViewRef=this.createOverlay().attach(this.portal);var e=this._embeddedViewRef.rootNodes[0];this._focusTrap=this._focusTrapFactory.create(e),this._elementFocusedBeforePopoverWasOpened=this.elementRef.nativeElement,this._focusMonitor.monitor(e.querySelector(".nx-popover__content"));var t=e.querySelector(".nx-popover__close-icon");t&&this._focusMonitor.monitor(t),this._autoFocusFirstTabbableElement(e),this.closeOnClickOutside&&this.waitForClose()}}},{key:"_autoFocusFirstTabbableElement",value:function(e){this._focusTrap.focusInitialElementWhenReady().then((function(t){t||e.focus()}))}},{key:"closePopover",value:function(){if(this.overlayRef){var e=this._embeddedViewRef.rootNodes[0];this._focusMonitor.stopMonitoring(e.querySelector(".nx-popover__content")),this._focusMonitor.stopMonitoring(e.querySelector(".nx-popover__close-icon")),this._returnFocusAfterPopover(),this.overlayRef.detach(),this._embeddedViewRef=null,this._focusTrap.destroy()}}},{key:"createOverlay",value:function(){var e;if(!this.overlayRef){this.portal=new a.i(this.popover.templateRef,this.viewContainerRef);var t=new c.d;t.positionStrategy=this.getPosition(),this._positionStrategy=t.positionStrategy,t.scrollStrategy="reposition"===this.scrollStrategy?this.overlay.scrollStrategies.reposition():this.overlay.scrollStrategies.close(),t.scrollStrategy.enable(),t.direction=(null===(e=this._dir)||void 0===e?void 0:e.value)||"ltr",this._modal&&(t.hasBackdrop=!0),this.overlayRef=this.overlay.create(t),this.subscribeToPositions(t.positionStrategy),this._subscribeToAttach(),this._subscribeToDetach(),this._modal&&this._closeOnClickOutside&&this._subscribeToBackdropClick()}return this.overlayRef}},{key:"subscribeToPositions",value:function(e){var t=this;e.positionChanges.pipe(Object(p.a)(this._overlayDestroyed)).subscribe((function(e){var o=e.connectionPair;t.positionOverlay(o),t.positionArrow(o),t._embeddedViewRef&&!t._embeddedViewRef.destroyed&&t._embeddedViewRef.detectChanges()}))}},{key:"_subscribeToBackdropClick",value:function(){var e=this;this.overlayRef.backdropClick().pipe(Object(p.a)(this._overlayDestroyed)).subscribe((function(t){e.show=!1}))}},{key:"_subscribeToDetach",value:function(){var e=this;this.overlayRef.detachments().pipe(Object(p.a)(this._overlayDestroyed)).subscribe((function(t){e.show&&(e.show=!1),e.changeShow.emit(e._show),e.popover.emitClosedEvent()}))}},{key:"_subscribeToAttach",value:function(){var e=this;this.overlayRef.attachments().pipe(Object(p.a)(this._overlayDestroyed)).subscribe((function(t){e.changeShow.emit(e._show)}))}},{key:"waitForClose",value:function(){var e=this;return this._documentClickObservable.pipe(Object(v.a)((function(e){return e.target})),Object(f.a)((function(t){return!e.elementRef.nativeElement.contains(t)})),Object(p.a)(this.popover.closed)).subscribe((function(){e.show=!1}))}},{key:"positionOverlay",value:function(e){"end"===e.originX&&"start"===e.overlayX?this.popover.direction=this.isRtl?"left":"right":"bottom"===e.originY&&"top"===e.overlayY?this.popover.direction="bottom":"start"===e.originX&&"end"===e.overlayX?this.popover.direction=this.isRtl?"right":"left":"top"===e.originY&&"bottom"===e.overlayY&&(this.popover.direction="top")}},{key:"positionArrow",value:function(e){var t=this.elementRef.nativeElement.getBoundingClientRect().left+this.elementRef.nativeElement.getBoundingClientRect().width/2-(this.overlayRef.overlayElement.parentElement.offsetLeft+this.overlayRef.overlayElement.offsetLeft);if(e.originX===e.overlayX){var o={};o.left=t+"px",this.popover.arrowStyle=o}"bottom"!==e.originY&&"top"!==e.originY||"center"!==e.overlayX||(this.popover.arrowStyle={left:t+"px"}),"end"!==e.originX&&"start"!==e.originX||"center"!==e.overlayY||(this.popover.arrowStyle={top:"50%"})}},{key:"getPosition",value:function(){var t=this._getOrigin(this.direction),o=this._getOverlayPosition(this.direction),n=this._getOffset(this.direction),i=this._getFallbackPositions(this.direction);return this.overlay.position().flexibleConnectedTo(this.elementRef).withPositions([Object.assign(Object.assign(Object.assign({},t),o),n)].concat(e(i)))}},{key:"_returnFocusAfterPopover",value:function(){var e=this._elementFocusedBeforePopoverWasOpened;e&&"function"==typeof e.focus&&e.focus()}},{key:"_getOrigin",value:function(e){switch(e){case"top":case"bottom":return{originX:"center",originY:e};case"left":return{originX:this.isRtl?"end":"start",originY:"center"};case"right":return{originX:this.isRtl?"start":"end",originY:"center"};default:throw w(e)}}},{key:"_getOverlayPosition",value:function(e){switch(e){case"top":case"bottom":return{overlayX:"center",overlayY:this._getInversePosition(e)};case"left":return{overlayX:this.isRtl?"start":"end",overlayY:"center"};case"right":return{overlayX:this.isRtl?"end":"start",overlayY:"center"};default:throw w(e)}}},{key:"_getOffset",value:function(e){switch(e){case"top":return{offsetY:-16};case"bottom":return{offsetY:16};case"left":return{offsetX:-16};case"right":return{offsetX:16};default:throw w(e)}}},{key:"_getInversePopoverDirection",value:function(e){return{top:"bottom",right:"left",bottom:"top",left:"right"}[e]}},{key:"_getInversePosition",value:function(e){return{top:"bottom",bottom:"top",start:"end",end:"start",center:"center"}[e]}},{key:"_getFallbackPositions",value:function(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this._possiblePopoverDirections;if(!t)return[];var n=o.filter((function(e){return e!==t})),i=[];switch(t){case"top":case"bottom":i=this._getVerticalFallbackPositionPairs(t);break;case"left":case"right":i=this._getHorizontalFallbackPositionPairs(t)}var r=this._getInversePopoverDirection(t),s=n.indexOf(r)>-1?r:o[0];return[].concat(e(i),e(this._getFallbackPositions(s,n)))}},{key:"_getVerticalFallbackPositionPairs",value:function(e){var t=e===this.direction,o=[],n=Object.assign(Object.assign(Object.assign({},this._getOrigin(e)),this._getOverlayPosition(e)),this._getOffset(e));return t||o.push(n),o.push(Object.assign(Object.assign({},n),{originX:"start",overlayX:"start"}),Object.assign(Object.assign({},n),{originX:"end",overlayX:"end"})),o}},{key:"_getHorizontalFallbackPositionPairs",value:function(e){var t=this._getOffset(e);return[Object.assign(Object.assign(Object.assign({},this._getOrigin(e)),this._getOverlayPosition(e)),t)]}},{key:"_dirChangeHandler",value:function(){this.overlayRef&&(this.closePopover(),this.overlayRef.dispose(),this.overlayRef=null,this._overlayDestroyed.next())}},{key:"show",set:function(e){e=Object(s.b)(e),this._show!==e&&(this._show=e,this._show?this.openPopover():this.closePopover())},get:function(){return this._show}},{key:"closeable",set:function(e){this._closeable=Object(s.b)(e),this.popover&&(this.popover.showCloseButton=this.isCloseable())},get:function(){return this._closeable}},{key:"closeOnClickOutside",set:function(e){this._closeOnClickOutside=Object(s.b)(e)},get:function(){return this._closeOnClickOutside}},{key:"modal",set:function(e){this._modal=Object(s.b)(e)},get:function(){return this._modal}},{key:"isOpen",get:function(){return this.overlayRef&&this.createOverlay().hasAttached()}},{key:"isRtl",get:function(){var e;return"rtl"===(null===(e=this._dir)||void 0===e?void 0:e.value)}}]),t}();return t.\u0275fac=function(e){return new(e||t)(l.Nb(c.c),l.Nb(l.l),l.Nb(l.R),l.Nb(g.c),l.Nb(_.h),l.Nb(_.g),l.Nb(l.A),l.Nb(y.a),l.Nb(k.c,8),l.Nb(d.e,8))},t.\u0275dir=l.Ib({type:t,selectors:[["","nxPopoverTriggerFor",""]],hostAttrs:["aria-haspopup","true"],hostVars:2,hostBindings:function(e,t){1&e&&l.ac("click",(function(){return t.handleClick()})),2&e&&l.Cb("aria-expanded",t.isOpen)("aria-describedby",t.isOpen?t.id:null)},inputs:{show:["nxPopoverShow","show"],closeable:["nxPopoverCloseable","closeable"],closeOnClickOutside:"closeOnClickOutside",popover:["nxPopoverTriggerFor","popover"],direction:["nxPopoverDirection","direction"],popoverInitialVisible:["nxPopoverInitialVisible","popoverInitialVisible"],visibleChange:["nxPopoverVisibleChange","visibleChange"],modal:["nxPopoverModal","modal"],trigger:["nxPopoverTrigger","trigger"],scrollStrategy:["nxPopoverScrollStrategy","scrollStrategy"]},outputs:{changeShow:"nxPopoverShowChange"},exportAs:["nxPopoverTrigger"]}),t}()},pT7h:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var i,r=n("HYj3"),s=n("2kYt"),c=n("0FLW"),a=n("EM62"),l=((i=function e(){o(this,e)}).\u0275mod=a.Lb({type:i}),i.\u0275inj=a.Kb({factory:function(e){return new(e||i)},imports:[[s.c,r.f,c.c]]}),i);n("dWOj"),n("kMq3"),n("e2XY")}}])}();