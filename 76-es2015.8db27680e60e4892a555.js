(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{"6mPe":function(e,t,n){"use strict";n.r(t),n.d(t,"SidepanelExamplesModule",function(){return N});var i=n("mN63"),s=n("QcoT"),a=n("fXoL"),o=n("8LU1");const c=["*"];let r=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Jb({type:e,selectors:[["nx-sidepanel-header"]],ngContentSelectors:c,decls:1,vars:0,template:function(e,t){1&e&&(a.lc(),a.kc(0))},styles:["[_nghost-%COMP%]{display:block;font-size:var(--sidepanel-header-font-size);line-height:var(--sidepanel-header-line-height);font-weight:var(--sidepanel-header-font-weight);letter-spacing:var(--sidepanel-header-letter-spacing)}"],changeDetection:0}),e})();var u=n("R0Ic");const l={sidepanelExpansion:Object(u.n)("sidepanelExpansion",[Object(u.k)("closed",Object(u.l)({transform:"translateX({{ transformX }})",boxShadow:"none",visibility:"hidden"}),{params:{transformX:"100%"}}),Object(u.k)("open",Object(u.l)({transform:"none",boxShadow:"*",visibility:"visible"})),Object(u.m)("closed => open",Object(u.e)(".4s cubic-bezier(0, 0, 0.1, 1)")),Object(u.m)("open-instant => closed, open => closed",Object(u.e)(".2s cubic-bezier(0.8, 0, 1, 1)"))])};var p=n("cH1L");const b=function(e){return{transformX:e}},d=function(e,t){return{value:e,params:t}},m=["*"],g=["*",[["nx-sidepanel"]]],V=["*","nx-sidepanel"];let h=(()=>{class e{constructor(e,t,n,i){this._changeDetectorRef=e,this._elementRef=t,this._dir=n,this._wrapper=i,this._opened=!0,this.openedChange=new a.o,this._position="floating",this._appearance="dark",this._openState="open-instant",this._wrapper||console.warn("NxSidepanelComponent needs a wrapping NxSidepanelOuterContainerComponent to work as expected.")}set opened(e){var t;this._opened=Object(o.b)(e),this._setOpenState(this._opened),null===(t=this._wrapper)||void 0===t||t._update(),this._changeDetectorRef.markForCheck()}get opened(){return this._opened}set position(e){var t;this._position=e,this._changeDetectorRef.markForCheck(),null===(t=this._wrapper)||void 0===t||t._update()}get position(){return this._position}set appearance(e){this._appearance=e,this._changeDetectorRef.markForCheck()}get appearance(){return this._appearance}toggle(){this.opened=!this.opened,this.openedChange.emit(this._opened)}open(){this.opened||this.toggle()}close(){this.opened&&this.toggle()}_getWidth(){return this._elementRef.nativeElement.offsetWidth}_getOpenState(){return this._openState}_setOpenState(e){"open-instant"===this._openState&&e||(this._openState=e?"open":"closed")}get dir(){return this._dir&&"rtl"===this._dir.value?"rtl":"ltr"}}return e.\u0275fac=function(t){return new(t||e)(a.Pb(a.h),a.Pb(a.l),a.Pb(p.c),a.Pb(U,8))},e.\u0275cmp=a.Jb({type:e,selectors:[["nx-sidepanel"]],contentQueries:function(e,t,n){if(1&e&&a.Ib(n,r,1,a.l),2&e){let e;a.sc(e=a.dc())&&(t._header=e.first)}},hostAttrs:["role","complementary"],hostVars:16,hostBindings:function(e,t){2&e&&(a.Gc("@sidepanelExpansion",a.rc(13,d,t._wrapper?t._getOpenState():"",a.qc(11,b,"rtl"===t.dir?"-100%":"100%"))),a.Hb("is-closed",!t.opened)("is-static","static"===t.position)("is-floating","floating"===t.position)("light","light"===t.appearance)("without-wrapper",!t._wrapper))},inputs:{opened:"opened",position:"position",appearance:"appearance"},outputs:{openedChange:"openedChange"},ngContentSelectors:m,decls:1,vars:0,template:function(e,t){1&e&&(a.lc(),a.kc(0))},styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;position:absolute;right:0;top:0;height:100%;overflow:hidden;background:var(--sidepanel-background-color)}[dir=rtl]   [_nghost-%COMP%]{right:auto;left:0}.is-floating[_nghost-%COMP%]{z-index:1;box-shadow:var(--sidepanel-floating-shadow)}[_nghost-%COMP%]   .is-closed[_ngcontent-%COMP%]{transform:translateX(100%)}[dir=rtl]   [_nghost-%COMP%]   .is-closed[_ngcontent-%COMP%]{transform:translateX(-100%)}.light[_nghost-%COMP%]{background:var(--sidepanel-light-background-color);border-left:1px solid var(--sidepanel-light-border-color)}[dir=rtl]   .light[_nghost-%COMP%]{border-left:unset;border-right:1px solid var(--sidepanel-light-border-color)}@media screen and (-ms-high-contrast:active){[_nghost-%COMP%]{border-left:1px solid windowText}[dir=rtl]   [_nghost-%COMP%]{border-left:none;border-right:1px solid windowText}}.without-wrapper.is-floating[_nghost-%COMP%]{position:fixed;right:0;z-index:1;box-shadow:var(--sidepanel-floating-shadow)}[dir=rtl]   .without-wrapper.is-floating[_nghost-%COMP%]{right:auto;left:0}.without-wrapper.is-static[_nghost-%COMP%]{position:-webkit-sticky;position:sticky;top:0}.without-wrapper.is-closed[_nghost-%COMP%]{display:none}"],data:{animation:[l.sidepanelExpansion]},changeDetection:0}),e})(),U=(()=>{class e{constructor(e,t){this._dir=e,this._changeDetectorRef=t,this._dir.change.subscribe(()=>{this._changeDetectorRef.markForCheck()})}_update(){this._changeDetectorRef.markForCheck()}get dir(){return this._dir&&"rtl"===this._dir.value?"rtl":"ltr"}_getOpenState(){var e;return"static"===(null===(e=this._sidepanel)||void 0===e?void 0:e.position)?this._sidepanel._getOpenState():"closed"}_getSidepanelWidth(){var e,t;return"static"===(null===(e=this._sidepanel)||void 0===e?void 0:e.position)&&(null===(t=this._sidepanel)||void 0===t?void 0:t.opened)?this._sidepanel._getWidth():0}}return e.\u0275fac=function(t){return new(t||e)(a.Pb(p.c,8),a.Pb(a.h))},e.\u0275cmp=a.Jb({type:e,selectors:[["nx-sidepanel-outer-container"]],contentQueries:function(e,t,n){if(1&e&&a.Ib(n,h,1),2&e){let e;a.sc(e=a.dc())&&(t._sidepanel=e.first)}},ngContentSelectors:V,decls:3,vars:8,consts:[[1,"nx-sidepanel-outer-container__content"]],template:function(e,t){1&e&&(a.lc(g),a.Vb(0,"div",0),a.kc(1),a.Ub(),a.kc(2,1)),2&e&&(a.Ec("margin-right","ltr"===t.dir?t._getSidepanelWidth():0,"px")("margin-left","rtl"===t.dir?t._getSidepanelWidth():0,"px"),a.Hb("with-margin","open"===t._getOpenState())("without-margin","closed"===t._getOpenState()))},styles:["[_nghost-%COMP%]{position:relative;display:block;height:100%;overflow:hidden}[_nghost-%COMP%]   .nx-sidepanel-outer-container__content[_ngcontent-%COMP%]{position:relative;z-index:1;display:block;height:100%;overflow:auto}[_nghost-%COMP%]   .nx-sidepanel-outer-container__content.with-margin[_ngcontent-%COMP%]{transition-duration:.4s;transition-timing-function:cubic-bezier(0,0,.1,1);transition-property:margin-right}[dir=rtl]   [_nghost-%COMP%]   .nx-sidepanel-outer-container__content.with-margin[_ngcontent-%COMP%]{transition-property:margin-left}[_nghost-%COMP%]   .nx-sidepanel-outer-container__content.without-margin[_ngcontent-%COMP%]{transition-duration:.2s;transition-timing-function:cubic-bezier(.8,0,1,1);transition-property:margin-right}[dir=rtl]   [_nghost-%COMP%]   .nx-sidepanel-outer-container__content.without-margin[_ngcontent-%COMP%]{transition-property:margin-left}"],changeDetection:0}),e})();const x=["*"];let J=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Jb({type:e,selectors:[["nx-sidepanel-content"]],hostAttrs:["tabindex","0"],ngContentSelectors:x,decls:1,vars:0,template:function(e,t){1&e&&(a.lc(),a.kc(0))},styles:["[_nghost-%COMP%]{display:block;overflow-y:scroll;height:100%}"],changeDetection:0}),e})();var _=n("u47x"),f=n("+vaC");const v=["nxSidepanelCloseButton",""];let C=(()=>{class e{constructor(e,t,n){this._sidepanel=e,this._focusMonitor=t,this._elementRef=n,this._focusMonitor.monitor(this._elementRef)}_toggle(){this._sidepanel.toggle()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}}return e.\u0275fac=function(t){return new(t||e)(a.Pb(h),a.Pb(_.g),a.Pb(a.l))},e.\u0275cmp=a.Jb({type:e,selectors:[["button","nxSidepanelCloseButton",""]],hostBindings:function(e,t){1&e&&a.cc("click",function(){return t._toggle()})},attrs:v,decls:1,vars:0,consts:[["name","close","size","s","aria-hidden","true"]],template:function(e,t){1&e&&a.Qb(0,"nx-icon",0)},directives:[f.a],styles:["[_nghost-%COMP%]{cursor:pointer;background-color:transparent;border:none;outline:none;padding:0;display:flex;align-items:center}[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{color:var(--sidepanel-close-icon-color)}@media screen and (-ms-high-contrast:active){[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{color:buttonText}}.cdk-keyboard-focused[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow);border-radius:4px}@media screen and (-ms-high-contrast:active){.cdk-keyboard-focused[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px windowText;outline:4px solid CanvasText;outline-offset:2px}}"],changeDetection:0}),e})();var q=n("gkbm"),O=n("ofXK");let P=(()=>{class e{}return e.\u0275mod=a.Nb({type:e}),e.\u0275inj=a.Mb({factory:function(t){return new(t||e)},imports:[[O.c,i.c,q.b]]}),e})();var y=n("rU6a"),M=n("zB3U"),w=n("V3bl"),S=n("3Pt+"),k=n("AgrE");let D=(()=>{class e{constructor(e,t){this.viewportService=e,this._cdRef=t,this.opened=!0,this.isGreaterThanSmall=!0,this.viewportServiceSubscription=this.viewportService.min(M.b.BREAKPOINT_SMALL).subscribe(e=>{e!==this.isGreaterThanSmall&&(this.isGreaterThanSmall=e,e&&!this.opened?this.opened=!0:!e&&this.opened&&(this.opened=!1),this._cdRef.detectChanges())})}}return e.\u0275fac=function(t){return new(t||e)(a.Pb(M.c),a.Pb(a.h))},e.\u0275cmp=a.Jb({type:e,selectors:[["sidepanel-floating-example"]],decls:91,vars:5,consts:[[1,"example-container"],["nxStyle","small",3,"ngModel","ngModelChange"],[3,"nxValue"],[1,"my-sidepanel",3,"opened","openedChange"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],[1,"nx-margin-top-0"]],template:function(e,t){1&e&&(a.Vb(0,"nx-sidepanel-outer-container",0),a.Vb(1,"nx-radio-toggle",1),a.cc("ngModelChange",function(e){return t.opened=e}),a.Vb(2,"nx-radio-toggle-button",2),a.Jc(3,"Open"),a.Ub(),a.Vb(4,"nx-radio-toggle-button",2),a.Jc(5,"Close"),a.Ub(),a.Ub(),a.Vb(6,"p"),a.Jc(7),a.Ub(),a.Vb(8,"p"),a.Vb(9,"i"),a.Jc(10,"Here is some example content that can be scrolled."),a.Ub(),a.Ub(),a.Vb(11,"p"),a.Vb(12,"i"),a.Jc(13,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),a.Ub(),a.Ub(),a.Vb(14,"p"),a.Vb(15,"i"),a.Jc(16,"Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus."),a.Ub(),a.Ub(),a.Vb(17,"p"),a.Vb(18,"i"),a.Jc(19,"Vestibulum auctor dapibus neque. Vestibulum auctor dapibus neque."),a.Ub(),a.Ub(),a.Vb(20,"p"),a.Vb(21,"i"),a.Jc(22,"Vivamus vestibulum ntulla nec ante. Vivamus vestibulum ntulla nec ante."),a.Ub(),a.Ub(),a.Vb(23,"p"),a.Vb(24,"i"),a.Jc(25,"Praesent placerat risus quis eros. Praesent placerat risus quis eros."),a.Ub(),a.Ub(),a.Vb(26,"p"),a.Vb(27,"i"),a.Jc(28,"Fusce pellentesque suscipit nibh. Fusce pellentesque suscipit nibh."),a.Ub(),a.Ub(),a.Vb(29,"p"),a.Vb(30,"i"),a.Jc(31,"Integer vitae libero ac risus egestas placerat. Integer vitae libero ac risus egestas placerat."),a.Ub(),a.Ub(),a.Vb(32,"nx-sidepanel",3),a.cc("openedChange",function(e){return t.opened=e}),a.Vb(33,"nx-sidepanel-header"),a.Vb(34,"div",4),a.Jc(35," Sidepanel "),a.Qb(36,"button",5),a.Ub(),a.Ub(),a.Vb(37,"nx-sidepanel-content"),a.Vb(38,"div",6),a.Vb(39,"p",7),a.Jc(40,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),a.Ub(),a.Vb(41,"p"),a.Jc(42,"Aliquam tincidunt mauris eu risus."),a.Ub(),a.Vb(43,"p"),a.Jc(44,"Vestibulum auctor dapibus neque."),a.Ub(),a.Vb(45,"p"),a.Jc(46,"Nunc dignissim risus id metus."),a.Ub(),a.Vb(47,"p"),a.Jc(48,"Cras ornare tristique elit."),a.Ub(),a.Vb(49,"p"),a.Jc(50,"Vivamus vestibulum ntulla nec ante."),a.Ub(),a.Vb(51,"p"),a.Jc(52,"Praesent placerat risus quis eros."),a.Ub(),a.Vb(53,"p"),a.Jc(54,"Fusce pellentesque suscipit nibh."),a.Ub(),a.Vb(55,"p"),a.Jc(56,"Integer vitae libero ac risus egestas placerat."),a.Ub(),a.Vb(57,"p"),a.Jc(58,"Vestibulum commodo felis quis tortor."),a.Ub(),a.Vb(59,"p"),a.Jc(60,"Ut aliquam sollicitudin leo."),a.Ub(),a.Vb(61,"p"),a.Jc(62,"Cras iaculis ultricies nulla."),a.Ub(),a.Vb(63,"p"),a.Jc(64,"Donec quis dui at dolor tempor interdum."),a.Ub(),a.Vb(65,"p"),a.Jc(66,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),a.Ub(),a.Vb(67,"p"),a.Jc(68,"Aliquam tincidunt mauris eu risus."),a.Ub(),a.Vb(69,"p"),a.Jc(70,"Vestibulum auctor dapibus neque."),a.Ub(),a.Vb(71,"p"),a.Jc(72,"Nunc dignissim risus id metus."),a.Ub(),a.Vb(73,"p"),a.Jc(74,"Cras ornare tristique elit."),a.Ub(),a.Vb(75,"p"),a.Jc(76,"Vivamus vestibulum ntulla nec ante."),a.Ub(),a.Vb(77,"p"),a.Jc(78,"Praesent placerat risus quis eros."),a.Ub(),a.Vb(79,"p"),a.Jc(80,"Fusce pellentesque suscipit nibh."),a.Ub(),a.Vb(81,"p"),a.Jc(82,"Integer vitae libero ac risus egestas placerat."),a.Ub(),a.Vb(83,"p"),a.Jc(84,"Vestibulum commodo felis quis tortor."),a.Ub(),a.Vb(85,"p"),a.Jc(86,"Ut aliquam sollicitudin leo."),a.Ub(),a.Vb(87,"p"),a.Jc(88,"Cras iaculis ultricies nulla."),a.Ub(),a.Vb(89,"p"),a.Jc(90,"Donec quis dui at dolor tempor interdum."),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub()),2&e&&(a.Db(1),a.mc("ngModel",t.opened),a.Db(1),a.mc("nxValue",!0),a.Db(2),a.mc("nxValue",!1),a.Db(3),a.Lc("Opened: ",t.opened,""),a.Db(25),a.mc("opened",t.opened))},directives:[U,w.a,S.p,S.s,k.a,h,r,C,J],styles:[".example-container[_ngcontent-%COMP%]{height:400px}.my-sidepanel[_ngcontent-%COMP%]{width:240px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 24px}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}.example-hint[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%]{vertical-align:bottom}"]}),e})(),A=(()=>{class e{constructor(){this.opened=!0}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Jb({type:e,selectors:[["sidepanel-static-example"]],decls:76,vars:5,consts:[[1,"example-container"],[1,"main-content"],["nxStyle","small",3,"ngModel","ngModelChange"],[3,"nxValue"],["position","static",1,"my-sidepanel",3,"opened","openedChange"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],[1,"nx-margin-top-0"]],template:function(e,t){1&e&&(a.Vb(0,"nx-sidepanel-outer-container",0),a.Vb(1,"div",1),a.Vb(2,"nx-radio-toggle",2),a.cc("ngModelChange",function(e){return t.opened=e}),a.Vb(3,"nx-radio-toggle-button",3),a.Jc(4,"Open"),a.Ub(),a.Vb(5,"nx-radio-toggle-button",3),a.Jc(6,"Close"),a.Ub(),a.Ub(),a.Vb(7,"p"),a.Jc(8),a.Ub(),a.Vb(9,"p"),a.Vb(10,"i"),a.Jc(11,"Here is some example content that can be scrolled."),a.Ub(),a.Ub(),a.Vb(12,"p"),a.Vb(13,"i"),a.Jc(14,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),a.Ub(),a.Ub(),a.Vb(15,"p"),a.Vb(16,"i"),a.Jc(17,"Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus."),a.Ub(),a.Ub(),a.Vb(18,"p"),a.Vb(19,"i"),a.Jc(20,"Vestibulum auctor dapibus neque. Vestibulum auctor dapibus neque."),a.Ub(),a.Ub(),a.Vb(21,"p"),a.Vb(22,"i"),a.Jc(23,"Vivamus vestibulum ntulla nec ante. Vivamus vestibulum ntulla nec ante."),a.Ub(),a.Ub(),a.Vb(24,"p"),a.Vb(25,"i"),a.Jc(26,"Praesent placerat risus quis eros. Praesent placerat risus quis eros."),a.Ub(),a.Ub(),a.Vb(27,"p"),a.Vb(28,"i"),a.Jc(29,"Fusce pellentesque suscipit nibh. Fusce pellentesque suscipit nibh."),a.Ub(),a.Ub(),a.Vb(30,"p"),a.Vb(31,"i"),a.Jc(32,"Integer vitae libero ac risus egestas placerat. Integer vitae libero ac risus egestas placerat."),a.Ub(),a.Ub(),a.Ub(),a.Vb(33,"nx-sidepanel",4),a.cc("openedChange",function(e){return t.opened=e}),a.Vb(34,"nx-sidepanel-header"),a.Vb(35,"div",5),a.Jc(36," Sidepanel "),a.Qb(37,"button",6),a.Ub(),a.Ub(),a.Vb(38,"nx-sidepanel-content"),a.Vb(39,"div",7),a.Vb(40,"p",8),a.Jc(41,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),a.Ub(),a.Vb(42,"p"),a.Jc(43,"Aliquam tincidunt mauris eu risus."),a.Ub(),a.Vb(44,"p"),a.Jc(45,"Vestibulum auctor dapibus neque."),a.Ub(),a.Vb(46,"p"),a.Jc(47,"Nunc dignissim risus id metus."),a.Ub(),a.Vb(48,"p"),a.Jc(49,"Cras ornare tristique elit."),a.Ub(),a.Vb(50,"p"),a.Jc(51,"Vivamus vestibulum ntulla nec ante."),a.Ub(),a.Vb(52,"p"),a.Jc(53,"Praesent placerat risus quis eros."),a.Ub(),a.Vb(54,"p"),a.Jc(55,"Fusce pellentesque suscipit nibh."),a.Ub(),a.Vb(56,"p"),a.Jc(57,"Integer vitae libero ac risus egestas placerat."),a.Ub(),a.Vb(58,"p"),a.Jc(59,"Vestibulum commodo felis quis tortor."),a.Ub(),a.Vb(60,"p"),a.Jc(61,"Ut aliquam sollicitudin leo."),a.Ub(),a.Vb(62,"p"),a.Jc(63,"Cras iaculis ultricies nulla."),a.Ub(),a.Vb(64,"p"),a.Jc(65,"Donec quis dui at dolor tempor interdum."),a.Ub(),a.Vb(66,"p"),a.Jc(67,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),a.Ub(),a.Vb(68,"p"),a.Jc(69,"Aliquam tincidunt mauris eu risus."),a.Ub(),a.Vb(70,"p"),a.Jc(71,"Vestibulum auctor dapibus neque."),a.Ub(),a.Vb(72,"p"),a.Jc(73,"Nunc dignissim risus id metus."),a.Ub(),a.Vb(74,"p"),a.Jc(75,"Cras ornare tristique elit."),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub()),2&e&&(a.Db(2),a.mc("ngModel",t.opened),a.Db(1),a.mc("nxValue",!0),a.Db(2),a.mc("nxValue",!1),a.Db(3),a.Lc("Opened: ",t.opened,""),a.Db(25),a.mc("opened",t.opened))},directives:[U,w.a,S.p,S.s,k.a,h,r,C,J],styles:[".example-container[_ngcontent-%COMP%]{height:400px}.main-content[_ngcontent-%COMP%]{padding-right:24px}.my-sidepanel[_ngcontent-%COMP%]{width:240px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 24px}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}"]}),e})(),L=(()=>{class e{constructor(){this.opened=!0}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Jb({type:e,selectors:[["sidepanel-light-example"]],decls:76,vars:5,consts:[[1,"example-container"],[1,"main-content"],["nxStyle","small",3,"ngModel","ngModelChange"],[3,"nxValue"],["position","static","appearance","light",1,"my-sidepanel",3,"opened","openedChange"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],[1,"nx-margin-top-0"]],template:function(e,t){1&e&&(a.Vb(0,"nx-sidepanel-outer-container",0),a.Vb(1,"div",1),a.Vb(2,"nx-radio-toggle",2),a.cc("ngModelChange",function(e){return t.opened=e}),a.Vb(3,"nx-radio-toggle-button",3),a.Jc(4,"Open"),a.Ub(),a.Vb(5,"nx-radio-toggle-button",3),a.Jc(6,"Close"),a.Ub(),a.Ub(),a.Vb(7,"p"),a.Jc(8),a.Ub(),a.Vb(9,"p"),a.Vb(10,"i"),a.Jc(11,"Here is some example content that can be scrolled."),a.Ub(),a.Ub(),a.Vb(12,"p"),a.Vb(13,"i"),a.Jc(14,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),a.Ub(),a.Ub(),a.Vb(15,"p"),a.Vb(16,"i"),a.Jc(17,"Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus."),a.Ub(),a.Ub(),a.Vb(18,"p"),a.Vb(19,"i"),a.Jc(20,"Vestibulum auctor dapibus neque. Vestibulum auctor dapibus neque."),a.Ub(),a.Ub(),a.Vb(21,"p"),a.Vb(22,"i"),a.Jc(23,"Vivamus vestibulum ntulla nec ante. Vivamus vestibulum ntulla nec ante."),a.Ub(),a.Ub(),a.Vb(24,"p"),a.Vb(25,"i"),a.Jc(26,"Praesent placerat risus quis eros. Praesent placerat risus quis eros."),a.Ub(),a.Ub(),a.Vb(27,"p"),a.Vb(28,"i"),a.Jc(29,"Fusce pellentesque suscipit nibh. Fusce pellentesque suscipit nibh."),a.Ub(),a.Ub(),a.Vb(30,"p"),a.Vb(31,"i"),a.Jc(32,"Integer vitae libero ac risus egestas placerat. Integer vitae libero ac risus egestas placerat."),a.Ub(),a.Ub(),a.Ub(),a.Vb(33,"nx-sidepanel",4),a.cc("openedChange",function(e){return t.opened=e}),a.Vb(34,"nx-sidepanel-header"),a.Vb(35,"div",5),a.Jc(36," Sidepanel "),a.Qb(37,"button",6),a.Ub(),a.Ub(),a.Vb(38,"nx-sidepanel-content"),a.Vb(39,"div",7),a.Vb(40,"p",8),a.Jc(41,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),a.Ub(),a.Vb(42,"p"),a.Jc(43,"Aliquam tincidunt mauris eu risus."),a.Ub(),a.Vb(44,"p"),a.Jc(45,"Vestibulum auctor dapibus neque."),a.Ub(),a.Vb(46,"p"),a.Jc(47,"Nunc dignissim risus id metus."),a.Ub(),a.Vb(48,"p"),a.Jc(49,"Cras ornare tristique elit."),a.Ub(),a.Vb(50,"p"),a.Jc(51,"Vivamus vestibulum ntulla nec ante."),a.Ub(),a.Vb(52,"p"),a.Jc(53,"Praesent placerat risus quis eros."),a.Ub(),a.Vb(54,"p"),a.Jc(55,"Fusce pellentesque suscipit nibh."),a.Ub(),a.Vb(56,"p"),a.Jc(57,"Integer vitae libero ac risus egestas placerat."),a.Ub(),a.Vb(58,"p"),a.Jc(59,"Vestibulum commodo felis quis tortor."),a.Ub(),a.Vb(60,"p"),a.Jc(61,"Ut aliquam sollicitudin leo."),a.Ub(),a.Vb(62,"p"),a.Jc(63,"Cras iaculis ultricies nulla."),a.Ub(),a.Vb(64,"p"),a.Jc(65,"Donec quis dui at dolor tempor interdum."),a.Ub(),a.Vb(66,"p"),a.Jc(67,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),a.Ub(),a.Vb(68,"p"),a.Jc(69,"Aliquam tincidunt mauris eu risus."),a.Ub(),a.Vb(70,"p"),a.Jc(71,"Vestibulum auctor dapibus neque."),a.Ub(),a.Vb(72,"p"),a.Jc(73,"Nunc dignissim risus id metus."),a.Ub(),a.Vb(74,"p"),a.Jc(75,"Cras ornare tristique elit."),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub()),2&e&&(a.Db(2),a.mc("ngModel",t.opened),a.Db(1),a.mc("nxValue",!0),a.Db(2),a.mc("nxValue",!1),a.Db(3),a.Lc("Opened: ",t.opened,""),a.Db(25),a.mc("opened",t.opened))},directives:[U,w.a,S.p,S.s,k.a,h,r,C,J],styles:[".example-container[_ngcontent-%COMP%]{height:400px;background-color:var(--ui-02)}.main-content[_ngcontent-%COMP%]{padding:24px}.my-sidepanel[_ngcontent-%COMP%]{width:240px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 24px}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}"]}),e})();var F=n("BYLl"),I=n("Rmhm");let j=(()=>{class e{constructor(){this.opened=!0}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Jb({type:e,selectors:[["sidepanel-with-tabs-example"]],decls:81,vars:5,consts:[[1,"example-container"],[1,"main-content"],["nxStyle","small",3,"ngModel","ngModelChange"],[3,"nxValue"],["position","static",1,"my-sidepanel",3,"opened","openedChange"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],["appearance","expert"],["label","First tab"],["label","Second tab"],["nxCopytext","normal"]],template:function(e,t){1&e&&(a.Vb(0,"nx-sidepanel-outer-container",0),a.Vb(1,"div",1),a.Vb(2,"nx-radio-toggle",2),a.cc("ngModelChange",function(e){return t.opened=e}),a.Vb(3,"nx-radio-toggle-button",3),a.Jc(4,"Open"),a.Ub(),a.Vb(5,"nx-radio-toggle-button",3),a.Jc(6,"Close"),a.Ub(),a.Ub(),a.Vb(7,"p"),a.Jc(8),a.Ub(),a.Vb(9,"p"),a.Vb(10,"i"),a.Jc(11,"Here is some example content that can be scrolled."),a.Ub(),a.Ub(),a.Vb(12,"p"),a.Vb(13,"i"),a.Jc(14,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),a.Ub(),a.Ub(),a.Vb(15,"p"),a.Vb(16,"i"),a.Jc(17,"Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus."),a.Ub(),a.Ub(),a.Vb(18,"p"),a.Vb(19,"i"),a.Jc(20,"Vestibulum auctor dapibus neque. Vestibulum auctor dapibus neque."),a.Ub(),a.Ub(),a.Vb(21,"p"),a.Vb(22,"i"),a.Jc(23,"Vivamus vestibulum ntulla nec ante. Vivamus vestibulum ntulla nec ante."),a.Ub(),a.Ub(),a.Vb(24,"p"),a.Vb(25,"i"),a.Jc(26,"Praesent placerat risus quis eros. Praesent placerat risus quis eros."),a.Ub(),a.Ub(),a.Vb(27,"p"),a.Vb(28,"i"),a.Jc(29,"Fusce pellentesque suscipit nibh. Fusce pellentesque suscipit nibh."),a.Ub(),a.Ub(),a.Vb(30,"p"),a.Vb(31,"i"),a.Jc(32,"Integer vitae libero ac risus egestas placerat. Integer vitae libero ac risus egestas placerat."),a.Ub(),a.Ub(),a.Ub(),a.Vb(33,"nx-sidepanel",4),a.cc("openedChange",function(e){return t.opened=e}),a.Vb(34,"nx-sidepanel-header"),a.Vb(35,"div",5),a.Jc(36," Sidepanel "),a.Qb(37,"button",6),a.Ub(),a.Ub(),a.Vb(38,"nx-sidepanel-content"),a.Vb(39,"div",7),a.Vb(40,"nx-tab-group",8),a.Vb(41,"nx-tab",9),a.Vb(42,"p"),a.Jc(43,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),a.Ub(),a.Vb(44,"p"),a.Jc(45,"Aliquam tincidunt mauris eu risus."),a.Ub(),a.Vb(46,"p"),a.Jc(47,"Vestibulum auctor dapibus neque."),a.Ub(),a.Vb(48,"p"),a.Jc(49,"Nunc dignissim risus id metus."),a.Ub(),a.Vb(50,"p"),a.Jc(51,"Cras ornare tristique elit."),a.Ub(),a.Vb(52,"p"),a.Jc(53,"Vivamus vestibulum ntulla nec ante."),a.Ub(),a.Vb(54,"p"),a.Jc(55,"Praesent placerat risus quis eros."),a.Ub(),a.Vb(56,"p"),a.Jc(57,"Fusce pellentesque suscipit nibh."),a.Ub(),a.Vb(58,"p"),a.Jc(59,"Integer vitae libero ac risus egestas placerat."),a.Ub(),a.Vb(60,"p"),a.Jc(61,"Vestibulum commodo felis quis tortor."),a.Ub(),a.Vb(62,"p"),a.Jc(63,"Ut aliquam sollicitudin leo."),a.Ub(),a.Vb(64,"p"),a.Jc(65,"Cras iaculis ultricies nulla."),a.Ub(),a.Vb(66,"p"),a.Jc(67,"Donec quis dui at dolor tempor interdum."),a.Ub(),a.Vb(68,"p"),a.Jc(69,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),a.Ub(),a.Vb(70,"p"),a.Jc(71,"Aliquam tincidunt mauris eu risus."),a.Ub(),a.Vb(72,"p"),a.Jc(73,"Vestibulum auctor dapibus neque."),a.Ub(),a.Vb(74,"p"),a.Jc(75,"Nunc dignissim risus id metus."),a.Ub(),a.Vb(76,"p"),a.Jc(77,"Cras ornare tristique elit."),a.Ub(),a.Ub(),a.Vb(78,"nx-tab",10),a.Vb(79,"p",11),a.Jc(80," Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mo "),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub()),2&e&&(a.Db(2),a.mc("ngModel",t.opened),a.Db(1),a.mc("nxValue",!0),a.Db(2),a.mc("nxValue",!1),a.Db(3),a.Lc("Opened: ",t.opened,""),a.Db(25),a.mc("opened",t.opened))},directives:[U,w.a,S.p,S.s,k.a,h,r,C,J,F.a,I.a],styles:[".example-container[_ngcontent-%COMP%]{height:400px}.main-content[_ngcontent-%COMP%]{padding-right:24px}.my-sidepanel[_ngcontent-%COMP%]{width:384px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 0}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}.my-sidepanel[_ngcontent-%COMP%]     nx-tab-header{position:-webkit-sticky;position:sticky;top:0;padding-top:24px;background:var(--sidepanel-background-color)}"]}),e})(),R=(()=>{class e{constructor(){this.opened=!0}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Jb({type:e,selectors:[["sidepanel-dark-example"]],decls:76,vars:5,consts:[[1,"example-container"],[1,"main-content"],["nxStyle","small",3,"ngModel","ngModelChange"],[3,"nxValue"],["position","static",1,"my-sidepanel",3,"opened","openedChange"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],[1,"nx-margin-top-0"]],template:function(e,t){1&e&&(a.Vb(0,"nx-sidepanel-outer-container",0),a.Vb(1,"div",1),a.Vb(2,"nx-radio-toggle",2),a.cc("ngModelChange",function(e){return t.opened=e}),a.Vb(3,"nx-radio-toggle-button",3),a.Jc(4,"Open"),a.Ub(),a.Vb(5,"nx-radio-toggle-button",3),a.Jc(6,"Close"),a.Ub(),a.Ub(),a.Vb(7,"p"),a.Jc(8),a.Ub(),a.Vb(9,"p"),a.Vb(10,"i"),a.Jc(11,"Here is some example content that can be scrolled."),a.Ub(),a.Ub(),a.Vb(12,"p"),a.Vb(13,"i"),a.Jc(14,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),a.Ub(),a.Ub(),a.Vb(15,"p"),a.Vb(16,"i"),a.Jc(17,"Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus."),a.Ub(),a.Ub(),a.Vb(18,"p"),a.Vb(19,"i"),a.Jc(20,"Vestibulum auctor dapibus neque. Vestibulum auctor dapibus neque."),a.Ub(),a.Ub(),a.Vb(21,"p"),a.Vb(22,"i"),a.Jc(23,"Vivamus vestibulum ntulla nec ante. Vivamus vestibulum ntulla nec ante."),a.Ub(),a.Ub(),a.Vb(24,"p"),a.Vb(25,"i"),a.Jc(26,"Praesent placerat risus quis eros. Praesent placerat risus quis eros."),a.Ub(),a.Ub(),a.Vb(27,"p"),a.Vb(28,"i"),a.Jc(29,"Fusce pellentesque suscipit nibh. Fusce pellentesque suscipit nibh."),a.Ub(),a.Ub(),a.Vb(30,"p"),a.Vb(31,"i"),a.Jc(32,"Integer vitae libero ac risus egestas placerat. Integer vitae libero ac risus egestas placerat."),a.Ub(),a.Ub(),a.Ub(),a.Vb(33,"nx-sidepanel",4),a.cc("openedChange",function(e){return t.opened=e}),a.Vb(34,"nx-sidepanel-header"),a.Vb(35,"div",5),a.Jc(36," Sidepanel "),a.Qb(37,"button",6),a.Ub(),a.Ub(),a.Vb(38,"nx-sidepanel-content"),a.Vb(39,"div",7),a.Vb(40,"p",8),a.Jc(41,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),a.Ub(),a.Vb(42,"p"),a.Jc(43,"Aliquam tincidunt mauris eu risus."),a.Ub(),a.Vb(44,"p"),a.Jc(45,"Vestibulum auctor dapibus neque."),a.Ub(),a.Vb(46,"p"),a.Jc(47,"Nunc dignissim risus id metus."),a.Ub(),a.Vb(48,"p"),a.Jc(49,"Cras ornare tristique elit."),a.Ub(),a.Vb(50,"p"),a.Jc(51,"Vivamus vestibulum ntulla nec ante."),a.Ub(),a.Vb(52,"p"),a.Jc(53,"Praesent placerat risus quis eros."),a.Ub(),a.Vb(54,"p"),a.Jc(55,"Fusce pellentesque suscipit nibh."),a.Ub(),a.Vb(56,"p"),a.Jc(57,"Integer vitae libero ac risus egestas placerat."),a.Ub(),a.Vb(58,"p"),a.Jc(59,"Vestibulum commodo felis quis tortor."),a.Ub(),a.Vb(60,"p"),a.Jc(61,"Ut aliquam sollicitudin leo."),a.Ub(),a.Vb(62,"p"),a.Jc(63,"Cras iaculis ultricies nulla."),a.Ub(),a.Vb(64,"p"),a.Jc(65,"Donec quis dui at dolor tempor interdum."),a.Ub(),a.Vb(66,"p"),a.Jc(67,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),a.Ub(),a.Vb(68,"p"),a.Jc(69,"Aliquam tincidunt mauris eu risus."),a.Ub(),a.Vb(70,"p"),a.Jc(71,"Vestibulum auctor dapibus neque."),a.Ub(),a.Vb(72,"p"),a.Jc(73,"Nunc dignissim risus id metus."),a.Ub(),a.Vb(74,"p"),a.Jc(75,"Cras ornare tristique elit."),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub()),2&e&&(a.Db(2),a.mc("ngModel",t.opened),a.Db(1),a.mc("nxValue",!0),a.Db(2),a.mc("nxValue",!1),a.Db(3),a.Lc("Opened: ",t.opened,""),a.Db(25),a.mc("opened",t.opened))},directives:[U,w.a,S.p,S.s,k.a,h,r,C,J],styles:[".example-container[_ngcontent-%COMP%]{height:400px}.main-content[_ngcontent-%COMP%]{padding-right:24px}.my-sidepanel[_ngcontent-%COMP%]{width:240px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 24px}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}"]}),e})(),N=(()=>{class e{static components(){return{"sidepanel-floating":D,"sidepanel-static":A,"sidepanel-light":L,"sidepanel-with-tabs":j,"sidepanel-dark":R}}}return e.\u0275mod=a.Nb({type:e}),e.\u0275inj=a.Mb({factory:function(t){return new(t||e)},imports:[[P,s.a,S.k,i.c,y.b]]}),e})()}}]);