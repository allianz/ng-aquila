import{a as M,b as q,c as we}from"./chunk-WZMEYUB3.js";import{c as ve,f as Me,i as qe}from"./chunk-ESTTDS5H.js";import"./chunk-UIK3HYZ6.js";import"./chunk-GCLFQC76.js";import"./chunk-KTZ2MV5R.js";import{A as S,g as y,l as v}from"./chunk-3CXM22DE.js";import"./chunk-INHV2N6H.js";import{c as Se,d as K,g as J,h as Y,i as Z}from"./chunk-VV4CBK2G.js";import{v as be,w as ye}from"./chunk-VPHHQYPB.js";import{g as _e}from"./chunk-63LXIO5M.js";import"./chunk-J2PQRSHM.js";import"./chunk-LJK2GACP.js";import{a as $}from"./chunk-T5NYCE37.js";import"./chunk-YHRSJ234.js";import{c as Ee,e as j}from"./chunk-V5XCZUGO.js";import{q as fe}from"./chunk-2EQ73B6L.js";import"./chunk-G3FDH6OQ.js";import"./chunk-TGA3OXY4.js";import{a as Ce}from"./chunk-APNBV455.js";import{z as he}from"./chunk-CCSED5RY.js";import{Aa as B,Ac as k,Ba as W,Ec as X,Fc as G,Gc as D,Hc as T,Ka as pe,Lb as d,Mb as Q,Mc as n,Oa as P,Oc as b,Qc as u,Rc as c,Sc as g,Vc as ge,Wc as xe,_ as le,ba as F,bc as m,cc as de,dc as U,ed as I,ia as se,j as V,ka as H,lc as e,mc as t,nc as h,rc as me,tc as ue,wb as s,wc as A,xb as C,xc as ce,zc as L}from"./chunk-LG2ZA55B.js";var ee=["*"],Pe=a=>({transformX:a}),Ne=(a,Oe)=>({value:a,params:Oe}),Ve=["*",[["nx-sidepanel"]]],Fe=["*","nx-sidepanel"],ke=["nxSidepanelCloseButton",""],De={sidepanelExpansion:Se("sidepanelExpansion",[Y("closed",J({transform:"translateX({{ transformX }})",boxShadow:"none",visibility:"hidden"}),{params:{transformX:"100%"}}),Y("open",J({transform:"none",boxShadow:"*",visibility:"visible"})),Z("closed => open",K(".4s cubic-bezier(0, 0, 0.1, 1)")),Z("open-instant => closed, open => closed",K(".2s cubic-bezier(0.8, 0, 1, 1)"))])},f=(()=>{class a{static{this.\u0275fac=function(o){return new(o||a)}}static{this.\u0275cmp=d({type:a,selectors:[["nx-sidepanel-header"]],ngContentSelectors:ee,decls:1,vars:0,template:function(o,i){o&1&&(L(),k(0))},styles:["[_nghost-%COMP%]{display:block;font-size:var(--sidepanel-header-font-size);line-height:var(--sidepanel-header-line-height);font-weight:var(--sidepanel-header-font-weight);letter-spacing:var(--sidepanel-header-letter-spacing)}"],changeDetection:0})}}return a})(),x=(()=>{class a{set opened(r){this._opened=Ce(r),this._setOpenState(this._opened),this._wrapper?._update(),this._cdr.markForCheck()}get opened(){return this._opened}set position(r){this._position=r,this._cdr.markForCheck(),this._wrapper?._update()}get position(){return this._position}set appearance(r){this._appearance=r,this._cdr.markForCheck()}get appearance(){return this._appearance}constructor(r,o,i,p){this._cdr=r,this._elementRef=o,this._dir=i,this._wrapper=p,this._opened=!0,this._position="floating",this._appearance="dark",this._openState="open-instant",this.openedChange=new pe,this._wrapper==null&&console.warn("NxSidepanelComponent needs a wrapping NxSidepanelOuterContainerComponent to work as expected.")}toggle(){this.opened=!this.opened,this.openedChange.emit(this._opened)}open(){this.opened||this.toggle()}close(){this.opened&&this.toggle()}_getWidth(){return this._elementRef.nativeElement.offsetWidth}_getOpenState(){return this._openState}_setOpenState(r){this._openState==="open-instant"&&r||(this._openState=r?"open":"closed",r&&(this.triggerElem=document.activeElement))}onAnimationDone(r){this.openedChange.emit(this._opened),this.focusTrigger(this._opened)}focusTrigger(r){!r&&this.triggerElem&&(this.triggerElem.focus(),this.triggerElem=null)}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}static{this.\u0275fac=function(o){return new(o||a)(C(I),C(P),C($,8),C(se(()=>_),8))}}static{this.\u0275cmp=d({type:a,selectors:[["nx-sidepanel"]],contentQueries:function(o,i,p){if(o&1&&X(p,f,5,P),o&2){let l;D(l=T())&&(i._header=l.first)}},hostAttrs:["role","complementary"],hostVars:16,hostBindings:function(o,i){o&1&&ce("@sidepanelExpansion.done",function(l){return i.onAnimationDone(l)}),o&2&&(ue("@sidepanelExpansion",xe(13,Ne,i._wrapper?i._getOpenState():"",ge(11,Pe,i.dir==="rtl"?"-100%":"100%"))),U("is-closed",!i.opened)("is-static",i.position==="static")("is-floating",i.position==="floating")("light",i.appearance==="light")("without-wrapper",!i._wrapper))},inputs:{opened:"opened",position:"position",appearance:"appearance"},outputs:{openedChange:"openedChange"},ngContentSelectors:ee,decls:1,vars:0,template:function(o,i){o&1&&(L(),k(0))},styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;position:absolute;right:0;top:0;height:100%;overflow:hidden;background:var(--sidepanel-background-color)}[dir=rtl]   [_nghost-%COMP%]{right:auto;left:0}.is-floating[_nghost-%COMP%]{z-index:1;box-shadow:var(--sidepanel-floating-shadow)}[_nghost-%COMP%]   .is-closed[_ngcontent-%COMP%]{transform:translate(100%)}[dir=rtl]   [_nghost-%COMP%]   .is-closed[_ngcontent-%COMP%]{transform:translate(-100%)}.light[_nghost-%COMP%]{background:var(--sidepanel-light-background-color);border-left:1px solid var(--sidepanel-light-border-color)}[dir=rtl]   .light[_nghost-%COMP%]{border-left:unset;border-right:1px solid var(--sidepanel-light-border-color)}@media screen and (forced-colors: active){[_nghost-%COMP%]{border-left:1px solid CanvasText}[dir=rtl]   [_nghost-%COMP%]{border-left:none;border-right:1px solid CanvasText}}.without-wrapper.is-floating[_nghost-%COMP%]{position:fixed;right:0;z-index:1;box-shadow:var(--sidepanel-floating-shadow)}[dir=rtl]   .without-wrapper.is-floating[_nghost-%COMP%]{right:auto;left:0}.without-wrapper.is-static[_nghost-%COMP%]{position:sticky;top:0}.without-wrapper.is-closed[_nghost-%COMP%]{display:none}"],data:{animation:[De.sidepanelExpansion]},changeDetection:0})}}return a})(),_=(()=>{class a{constructor(r,o){this._dir=r,this._cdr=o,this._destroyed=new V,this._dir?.change.pipe(F(this._destroyed)).subscribe(()=>{this._cdr.markForCheck()})}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}_update(){this._cdr.markForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_getOpenState(){return this._sidepanel?.position==="static"?this._sidepanel._getOpenState():"closed"}_getSidepanelWidth(){return this._sidepanel?.position==="static"&&this._sidepanel?.opened?this._sidepanel._getWidth():0}static{this.\u0275fac=function(o){return new(o||a)(C($,8),C(I))}}static{this.\u0275cmp=d({type:a,selectors:[["nx-sidepanel-outer-container"]],contentQueries:function(o,i,p){if(o&1&&X(p,x,5),o&2){let l;D(l=T())&&(i._sidepanel=l.first)}},ngContentSelectors:Fe,decls:3,vars:8,consts:[[1,"nx-sidepanel-outer-container__content"]],template:function(o,i){o&1&&(L(Ve),e(0,"div",0),k(1),t(),k(2,1)),o&2&&(de("margin-right",i.dir==="ltr"?i._getSidepanelWidth():0,"px")("margin-left",i.dir==="rtl"?i._getSidepanelWidth():0,"px"),U("with-margin",i._getOpenState()==="open")("without-margin",i._getOpenState()==="closed"))},styles:["[_nghost-%COMP%]{position:relative;display:block;height:100%;overflow:hidden}[_nghost-%COMP%]   .nx-sidepanel-outer-container__content[_ngcontent-%COMP%]{position:relative;z-index:1;display:block;height:100%;overflow:auto}[_nghost-%COMP%]   .nx-sidepanel-outer-container__content.with-margin[_ngcontent-%COMP%]{transition-duration:.4s;transition-timing-function:cubic-bezier(0,0,.1,1);transition-property:margin-right}[dir=rtl]   [_nghost-%COMP%]   .nx-sidepanel-outer-container__content.with-margin[_ngcontent-%COMP%]{transition-property:margin-left}[_nghost-%COMP%]   .nx-sidepanel-outer-container__content.without-margin[_ngcontent-%COMP%]{transition-duration:.2s;transition-timing-function:cubic-bezier(.8,0,1,1);transition-property:margin-right}[dir=rtl]   [_nghost-%COMP%]   .nx-sidepanel-outer-container__content.without-margin[_ngcontent-%COMP%]{transition-property:margin-left}"],changeDetection:0})}}return a})(),E=(()=>{class a{_toggle(){this._sidepanel.toggle()}constructor(r,o,i){this._sidepanel=r,this._focusMonitor=o,this._elementRef=i}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}static{this.\u0275fac=function(o){return new(o||a)(C(x),C(fe),C(P))}}static{this.\u0275cmp=d({type:a,selectors:[["button","nxSidepanelCloseButton",""]],hostBindings:function(o,i){o&1&&A("click",function(){return i._toggle()})},attrs:ke,decls:1,vars:0,consts:[["name","close","size","s","aria-hidden","true"]],template:function(o,i){o&1&&h(0,"nx-icon",0)},dependencies:[j,Ee],styles:["[_nghost-%COMP%]{cursor:pointer;background-color:transparent;border:none;outline:none;padding:0;display:flex;align-items:center}[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{color:var(--sidepanel-close-icon-color)}@media screen and (forced-colors: active){[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{color:buttonText}}.cdk-keyboard-focused[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow);border-radius:4px}@media screen and (forced-colors: active),(forced-colors: active){.cdk-keyboard-focused[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}"],changeDetection:0})}}return a})(),w=(()=>{class a{static{this.\u0275fac=function(o){return new(o||a)}}static{this.\u0275cmp=d({type:a,selectors:[["nx-sidepanel-content"]],hostAttrs:["tabindex","0"],ngContentSelectors:ee,decls:1,vars:0,template:function(o,i){o&1&&(L(),k(0))},styles:["[_nghost-%COMP%]{display:block;overflow-y:scroll;height:100%}"],changeDetection:0})}}return a})(),z=(()=>{class a{static{this.\u0275fac=function(o){return new(o||a)}}static{this.\u0275mod=Q({type:a})}static{this.\u0275inj=H({imports:[he,j,_e,E]})}}return a})();var te=(()=>{class a{constructor(){this.opened=!0}static{this.\u0275fac=function(o){return new(o||a)}}static{this.\u0275cmp=d({type:a,selectors:[["sidepanel-dark-example"]],decls:76,vars:5,consts:[[1,"example-container"],[1,"main-content"],["variant","small",3,"ngModelChange","ngModel"],[3,"value"],["position","static",1,"my-sidepanel",3,"openedChange","opened"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],[1,"nx-margin-top-0"]],template:function(o,i){o&1&&(e(0,"nx-sidepanel-outer-container",0)(1,"div",1)(2,"nx-radio-toggle",2),g("ngModelChange",function(l){return c(i.opened,l)||(i.opened=l),l}),e(3,"nx-radio-toggle-button",3),n(4,"Open"),t(),e(5,"nx-radio-toggle-button",3),n(6,"Close"),t()(),e(7,"p"),n(8),t(),e(9,"p")(10,"i"),n(11,"Here is some example content that can be scrolled."),t()(),e(12,"p")(13,"i"),n(14,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t()(),e(15,"p")(16,"i"),n(17,"Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus."),t()(),e(18,"p")(19,"i"),n(20,"Vestibulum auctor dapibus neque. Vestibulum auctor dapibus neque."),t()(),e(21,"p")(22,"i"),n(23,"Vivamus vestibulum ntulla nec ante. Vivamus vestibulum ntulla nec ante."),t()(),e(24,"p")(25,"i"),n(26,"Praesent placerat risus quis eros. Praesent placerat risus quis eros."),t()(),e(27,"p")(28,"i"),n(29,"Fusce pellentesque suscipit nibh. Fusce pellentesque suscipit nibh."),t()(),e(30,"p")(31,"i"),n(32,"Integer vitae libero ac risus egestas placerat. Integer vitae libero ac risus egestas placerat."),t()()(),e(33,"nx-sidepanel",4),g("openedChange",function(l){return c(i.opened,l)||(i.opened=l),l}),e(34,"nx-sidepanel-header")(35,"div",5),n(36," Sidepanel "),h(37,"button",6),t()(),e(38,"nx-sidepanel-content")(39,"div",7)(40,"p",8),n(41," Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "),t(),e(42,"p"),n(43,"Aliquam tincidunt mauris eu risus."),t(),e(44,"p"),n(45,"Vestibulum auctor dapibus neque."),t(),e(46,"p"),n(47,"Nunc dignissim risus id metus."),t(),e(48,"p"),n(49,"Cras ornare tristique elit."),t(),e(50,"p"),n(51,"Vivamus vestibulum ntulla nec ante."),t(),e(52,"p"),n(53,"Praesent placerat risus quis eros."),t(),e(54,"p"),n(55,"Fusce pellentesque suscipit nibh."),t(),e(56,"p"),n(57,"Integer vitae libero ac risus egestas placerat."),t(),e(58,"p"),n(59,"Vestibulum commodo felis quis tortor."),t(),e(60,"p"),n(61,"Ut aliquam sollicitudin leo."),t(),e(62,"p"),n(63,"Cras iaculis ultricies nulla."),t(),e(64,"p"),n(65,"Donec quis dui at dolor tempor interdum."),t(),e(66,"p"),n(67,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t(),e(68,"p"),n(69,"Aliquam tincidunt mauris eu risus."),t(),e(70,"p"),n(71,"Vestibulum auctor dapibus neque."),t(),e(72,"p"),n(73,"Nunc dignissim risus id metus."),t(),e(74,"p"),n(75,"Cras ornare tristique elit."),t()()()()()),o&2&&(s(2),u("ngModel",i.opened),s(),m("value",!0),s(2),m("value",!1),s(3),b("Opened: ",i.opened,""),s(25),u("opened",i.opened))},dependencies:[_,M,S,y,v,q,x,f,E,w],styles:[".example-container[_ngcontent-%COMP%]{height:400px}.main-content[_ngcontent-%COMP%]{padding-right:24px}.my-sidepanel[_ngcontent-%COMP%]{width:240px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 24px}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}"]})}}return a})();var ne=(()=>{class a{constructor(r,o){this.viewportService=r,this._cdr=o,this.opened=!0,this.isGreaterThanSmall=!0,this._destroyed=new V,this.viewportService.min(be.BREAKPOINT_SMALL).pipe(F(this._destroyed)).subscribe(i=>{i!==this.isGreaterThanSmall&&(this.isGreaterThanSmall=i,i&&!this.opened?this.opened=!0:!i&&this.opened&&(this.opened=!1),this._cdr.detectChanges())})}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}static{this.\u0275fac=function(o){return new(o||a)(C(ye),C(I))}}static{this.\u0275cmp=d({type:a,selectors:[["sidepanel-floating-example"]],decls:91,vars:5,consts:[[1,"example-container"],["variant","small",3,"ngModelChange","ngModel"],[3,"value"],[1,"my-sidepanel",3,"openedChange","opened"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],[1,"nx-margin-top-0"]],template:function(o,i){o&1&&(e(0,"nx-sidepanel-outer-container",0)(1,"nx-radio-toggle",1),g("ngModelChange",function(l){return c(i.opened,l)||(i.opened=l),l}),e(2,"nx-radio-toggle-button",2),n(3,"Open"),t(),e(4,"nx-radio-toggle-button",2),n(5,"Close"),t()(),e(6,"p"),n(7),t(),e(8,"p")(9,"i"),n(10,"Here is some example content that can be scrolled."),t()(),e(11,"p")(12,"i"),n(13,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t()(),e(14,"p")(15,"i"),n(16,"Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus."),t()(),e(17,"p")(18,"i"),n(19,"Vestibulum auctor dapibus neque. Vestibulum auctor dapibus neque."),t()(),e(20,"p")(21,"i"),n(22,"Vivamus vestibulum ntulla nec ante. Vivamus vestibulum ntulla nec ante."),t()(),e(23,"p")(24,"i"),n(25,"Praesent placerat risus quis eros. Praesent placerat risus quis eros."),t()(),e(26,"p")(27,"i"),n(28,"Fusce pellentesque suscipit nibh. Fusce pellentesque suscipit nibh."),t()(),e(29,"p")(30,"i"),n(31,"Integer vitae libero ac risus egestas placerat. Integer vitae libero ac risus egestas placerat."),t()(),e(32,"nx-sidepanel",3),g("openedChange",function(l){return c(i.opened,l)||(i.opened=l),l}),e(33,"nx-sidepanel-header")(34,"div",4),n(35," Sidepanel "),h(36,"button",5),t()(),e(37,"nx-sidepanel-content")(38,"div",6)(39,"p",7),n(40," Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "),t(),e(41,"p"),n(42,"Aliquam tincidunt mauris eu risus."),t(),e(43,"p"),n(44,"Vestibulum auctor dapibus neque."),t(),e(45,"p"),n(46,"Nunc dignissim risus id metus."),t(),e(47,"p"),n(48,"Cras ornare tristique elit."),t(),e(49,"p"),n(50,"Vivamus vestibulum ntulla nec ante."),t(),e(51,"p"),n(52,"Praesent placerat risus quis eros."),t(),e(53,"p"),n(54,"Fusce pellentesque suscipit nibh."),t(),e(55,"p"),n(56,"Integer vitae libero ac risus egestas placerat."),t(),e(57,"p"),n(58,"Vestibulum commodo felis quis tortor."),t(),e(59,"p"),n(60,"Ut aliquam sollicitudin leo."),t(),e(61,"p"),n(62,"Cras iaculis ultricies nulla."),t(),e(63,"p"),n(64,"Donec quis dui at dolor tempor interdum."),t(),e(65,"p"),n(66,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t(),e(67,"p"),n(68,"Aliquam tincidunt mauris eu risus."),t(),e(69,"p"),n(70,"Vestibulum auctor dapibus neque."),t(),e(71,"p"),n(72,"Nunc dignissim risus id metus."),t(),e(73,"p"),n(74,"Cras ornare tristique elit."),t(),e(75,"p"),n(76,"Vivamus vestibulum ntulla nec ante."),t(),e(77,"p"),n(78,"Praesent placerat risus quis eros."),t(),e(79,"p"),n(80,"Fusce pellentesque suscipit nibh."),t(),e(81,"p"),n(82,"Integer vitae libero ac risus egestas placerat."),t(),e(83,"p"),n(84,"Vestibulum commodo felis quis tortor."),t(),e(85,"p"),n(86,"Ut aliquam sollicitudin leo."),t(),e(87,"p"),n(88,"Cras iaculis ultricies nulla."),t(),e(89,"p"),n(90,"Donec quis dui at dolor tempor interdum."),t()()()()()),o&2&&(s(),u("ngModel",i.opened),s(),m("value",!0),s(2),m("value",!1),s(3),b("Opened: ",i.opened,""),s(25),u("opened",i.opened))},dependencies:[_,M,S,y,v,q,x,f,E,w],styles:[".example-container[_ngcontent-%COMP%]{height:400px}.my-sidepanel[_ngcontent-%COMP%]{width:240px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 24px}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}.example-hint[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%]{vertical-align:bottom}"]})}}return a})();var Be=["closeButton"],ie=(()=>{class a{constructor(){this.opened=!0,this._destroyed=new V}ngAfterViewInit(){this.panel.openedChange.pipe(le(1),F(this._destroyed)).subscribe(r=>r&&this.closeButton.nativeElement.focus())}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}static{this.\u0275fac=function(o){return new(o||a)}}static{this.\u0275cmp=d({type:a,selectors:[["sidepanel-focus-example"]],viewQuery:function(o,i){if(o&1&&(G(x,5),G(Be,5,P)),o&2){let p;D(p=T())&&(i.panel=p.first),D(p=T())&&(i.closeButton=p.first)}},decls:56,vars:5,consts:[["closeButton",""],[1,"example-container"],[1,"main-content"],["variant","small",3,"ngModelChange","ngModel"],[3,"value"],[3,"click"],["position","static",1,"my-sidepanel",3,"openedChange","opened"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],[1,"nx-margin-top-0"]],template:function(o,i){if(o&1){let p=me();e(0,"nx-sidepanel-outer-container",1)(1,"div",2)(2,"nx-radio-toggle",3),g("ngModelChange",function(O){return B(p),c(i.opened,O)||(i.opened=O),W(O)}),e(3,"nx-radio-toggle-button",4),n(4,"Open"),t(),e(5,"nx-radio-toggle-button",4),n(6,"Close"),t()(),e(7,"p"),n(8),t(),e(9,"p")(10,"i"),n(11,"Here is some example content that can be scrolled."),t()(),e(12,"button",5),A("click",function(){return B(p),W(i.panel.toggle())}),n(13,"open sidepanel 1"),t(),e(14,"p"),n(15,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t(),e(16,"p"),n(17,"Aliquam tincidunt mauris eu risus."),t(),e(18,"p"),n(19,"Vestibulum auctor dapibus neque."),t(),e(20,"p"),n(21,"Nunc dignissim risus id metus."),t(),e(22,"button",5),A("click",function(){return B(p),W(i.panel.toggle())}),n(23,"open sidepanel 2"),t(),e(24,"p"),n(25,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t(),e(26,"p"),n(27,"Aliquam tincidunt mauris eu risus."),t(),e(28,"p"),n(29,"Vestibulum auctor dapibus neque."),t(),e(30,"p"),n(31,"Nunc dignissim risus id metus."),t()(),e(32,"nx-sidepanel",6),g("openedChange",function(O){return B(p),c(i.opened,O)||(i.opened=O),W(O)}),e(33,"nx-sidepanel-header")(34,"div",7),n(35," Sidepanel "),h(36,"button",8,0),t()(),e(38,"nx-sidepanel-content")(39,"div",9)(40,"p",10),n(41," Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "),t(),e(42,"p"),n(43,"Aliquam tincidunt mauris eu risus."),t(),e(44,"p"),n(45,"Vestibulum auctor dapibus neque."),t(),e(46,"p"),n(47,"Nunc dignissim risus id metus."),t(),e(48,"p"),n(49,"Cras ornare tristique elit."),t(),e(50,"p"),n(51,"Vivamus vestibulum ntulla nec ante."),t(),e(52,"p"),n(53,"Praesent placerat risus quis eros."),t(),e(54,"p"),n(55,"Fusce pellentesque suscipit nibh."),t()()()()()}o&2&&(s(2),u("ngModel",i.opened),s(),m("value",!0),s(2),m("value",!1),s(3),b("Opened: ",i.opened,""),s(24),u("opened",i.opened))},dependencies:[M,S,y,v,q,z,x,f,w,E,_],styles:[".example-container[_ngcontent-%COMP%]{height:400px}.main-content[_ngcontent-%COMP%]{padding-right:24px}.my-sidepanel[_ngcontent-%COMP%]{width:240px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 24px}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}"]})}}return a})();var oe=(()=>{class a{constructor(){this.opened=!0}static{this.\u0275fac=function(o){return new(o||a)}}static{this.\u0275cmp=d({type:a,selectors:[["sidepanel-light-example"]],decls:76,vars:5,consts:[[1,"example-container"],[1,"main-content"],["variant","small",3,"ngModelChange","ngModel"],[3,"value"],["position","static","appearance","light",1,"my-sidepanel",3,"openedChange","opened"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],[1,"nx-margin-top-0"]],template:function(o,i){o&1&&(e(0,"nx-sidepanel-outer-container",0)(1,"div",1)(2,"nx-radio-toggle",2),g("ngModelChange",function(l){return c(i.opened,l)||(i.opened=l),l}),e(3,"nx-radio-toggle-button",3),n(4,"Open"),t(),e(5,"nx-radio-toggle-button",3),n(6,"Close"),t()(),e(7,"p"),n(8),t(),e(9,"p")(10,"i"),n(11,"Here is some example content that can be scrolled."),t()(),e(12,"p")(13,"i"),n(14,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t()(),e(15,"p")(16,"i"),n(17,"Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus."),t()(),e(18,"p")(19,"i"),n(20,"Vestibulum auctor dapibus neque. Vestibulum auctor dapibus neque."),t()(),e(21,"p")(22,"i"),n(23,"Vivamus vestibulum ntulla nec ante. Vivamus vestibulum ntulla nec ante."),t()(),e(24,"p")(25,"i"),n(26,"Praesent placerat risus quis eros. Praesent placerat risus quis eros."),t()(),e(27,"p")(28,"i"),n(29,"Fusce pellentesque suscipit nibh. Fusce pellentesque suscipit nibh."),t()(),e(30,"p")(31,"i"),n(32,"Integer vitae libero ac risus egestas placerat. Integer vitae libero ac risus egestas placerat."),t()()(),e(33,"nx-sidepanel",4),g("openedChange",function(l){return c(i.opened,l)||(i.opened=l),l}),e(34,"nx-sidepanel-header")(35,"div",5),n(36," Sidepanel "),h(37,"button",6),t()(),e(38,"nx-sidepanel-content")(39,"div",7)(40,"p",8),n(41," Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "),t(),e(42,"p"),n(43,"Aliquam tincidunt mauris eu risus."),t(),e(44,"p"),n(45,"Vestibulum auctor dapibus neque."),t(),e(46,"p"),n(47,"Nunc dignissim risus id metus."),t(),e(48,"p"),n(49,"Cras ornare tristique elit."),t(),e(50,"p"),n(51,"Vivamus vestibulum ntulla nec ante."),t(),e(52,"p"),n(53,"Praesent placerat risus quis eros."),t(),e(54,"p"),n(55,"Fusce pellentesque suscipit nibh."),t(),e(56,"p"),n(57,"Integer vitae libero ac risus egestas placerat."),t(),e(58,"p"),n(59,"Vestibulum commodo felis quis tortor."),t(),e(60,"p"),n(61,"Ut aliquam sollicitudin leo."),t(),e(62,"p"),n(63,"Cras iaculis ultricies nulla."),t(),e(64,"p"),n(65,"Donec quis dui at dolor tempor interdum."),t(),e(66,"p"),n(67,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t(),e(68,"p"),n(69,"Aliquam tincidunt mauris eu risus."),t(),e(70,"p"),n(71,"Vestibulum auctor dapibus neque."),t(),e(72,"p"),n(73,"Nunc dignissim risus id metus."),t(),e(74,"p"),n(75,"Cras ornare tristique elit."),t()()()()()),o&2&&(s(2),u("ngModel",i.opened),s(),m("value",!0),s(2),m("value",!1),s(3),b("Opened: ",i.opened,""),s(25),u("opened",i.opened))},dependencies:[_,M,S,y,v,q,x,f,E,w],styles:[".example-container[_ngcontent-%COMP%]{height:400px;background-color:var(--ui-02)}.main-content[_ngcontent-%COMP%]{padding:24px}.my-sidepanel[_ngcontent-%COMP%]{width:240px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 24px}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}"]})}}return a})();var ae=(()=>{class a{constructor(){this.opened=!0}static{this.\u0275fac=function(o){return new(o||a)}}static{this.\u0275cmp=d({type:a,selectors:[["sidepanel-static-example"]],decls:76,vars:5,consts:[[1,"example-container"],[1,"main-content"],["variant","small",3,"ngModelChange","ngModel"],[3,"value"],["position","static",1,"my-sidepanel",3,"openedChange","opened"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],[1,"nx-margin-top-0"]],template:function(o,i){o&1&&(e(0,"nx-sidepanel-outer-container",0)(1,"div",1)(2,"nx-radio-toggle",2),g("ngModelChange",function(l){return c(i.opened,l)||(i.opened=l),l}),e(3,"nx-radio-toggle-button",3),n(4,"Open"),t(),e(5,"nx-radio-toggle-button",3),n(6,"Close"),t()(),e(7,"p"),n(8),t(),e(9,"p")(10,"i"),n(11,"Here is some example content that can be scrolled."),t()(),e(12,"p")(13,"i"),n(14,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t()(),e(15,"p")(16,"i"),n(17,"Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus."),t()(),e(18,"p")(19,"i"),n(20,"Vestibulum auctor dapibus neque. Vestibulum auctor dapibus neque."),t()(),e(21,"p")(22,"i"),n(23,"Vivamus vestibulum ntulla nec ante. Vivamus vestibulum ntulla nec ante."),t()(),e(24,"p")(25,"i"),n(26,"Praesent placerat risus quis eros. Praesent placerat risus quis eros."),t()(),e(27,"p")(28,"i"),n(29,"Fusce pellentesque suscipit nibh. Fusce pellentesque suscipit nibh."),t()(),e(30,"p")(31,"i"),n(32,"Integer vitae libero ac risus egestas placerat. Integer vitae libero ac risus egestas placerat."),t()()(),e(33,"nx-sidepanel",4),g("openedChange",function(l){return c(i.opened,l)||(i.opened=l),l}),e(34,"nx-sidepanel-header")(35,"div",5),n(36," Sidepanel "),h(37,"button",6),t()(),e(38,"nx-sidepanel-content")(39,"div",7)(40,"p",8),n(41," Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "),t(),e(42,"p"),n(43,"Aliquam tincidunt mauris eu risus."),t(),e(44,"p"),n(45,"Vestibulum auctor dapibus neque."),t(),e(46,"p"),n(47,"Nunc dignissim risus id metus."),t(),e(48,"p"),n(49,"Cras ornare tristique elit."),t(),e(50,"p"),n(51,"Vivamus vestibulum ntulla nec ante."),t(),e(52,"p"),n(53,"Praesent placerat risus quis eros."),t(),e(54,"p"),n(55,"Fusce pellentesque suscipit nibh."),t(),e(56,"p"),n(57,"Integer vitae libero ac risus egestas placerat."),t(),e(58,"p"),n(59,"Vestibulum commodo felis quis tortor."),t(),e(60,"p"),n(61,"Ut aliquam sollicitudin leo."),t(),e(62,"p"),n(63,"Cras iaculis ultricies nulla."),t(),e(64,"p"),n(65,"Donec quis dui at dolor tempor interdum."),t(),e(66,"p"),n(67,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t(),e(68,"p"),n(69,"Aliquam tincidunt mauris eu risus."),t(),e(70,"p"),n(71,"Vestibulum auctor dapibus neque."),t(),e(72,"p"),n(73,"Nunc dignissim risus id metus."),t(),e(74,"p"),n(75,"Cras ornare tristique elit."),t()()()()()),o&2&&(s(2),u("ngModel",i.opened),s(),m("value",!0),s(2),m("value",!1),s(3),b("Opened: ",i.opened,""),s(25),u("opened",i.opened))},dependencies:[_,M,S,y,v,q,x,f,E,w],styles:[".example-container[_ngcontent-%COMP%]{height:400px}.main-content[_ngcontent-%COMP%]{padding-right:24px}.my-sidepanel[_ngcontent-%COMP%]{width:240px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 24px}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}"]})}}return a})();var re=(()=>{class a{constructor(){this.opened=!0}static{this.\u0275fac=function(o){return new(o||a)}}static{this.\u0275cmp=d({type:a,selectors:[["sidepanel-with-tabs-example"]],decls:81,vars:5,consts:[[1,"example-container"],[1,"main-content"],["variant","small",3,"ngModelChange","ngModel"],[3,"value"],["position","static",1,"my-sidepanel",3,"openedChange","opened"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],["appearance","expert","mobileAccordion","false"],["label","First tab"],["label","Second tab"],["nxCopytext","normal"]],template:function(o,i){o&1&&(e(0,"nx-sidepanel-outer-container",0)(1,"div",1)(2,"nx-radio-toggle",2),g("ngModelChange",function(l){return c(i.opened,l)||(i.opened=l),l}),e(3,"nx-radio-toggle-button",3),n(4,"Open"),t(),e(5,"nx-radio-toggle-button",3),n(6,"Close"),t()(),e(7,"p"),n(8),t(),e(9,"p")(10,"i"),n(11,"Here is some example content that can be scrolled."),t()(),e(12,"p")(13,"i"),n(14,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t()(),e(15,"p")(16,"i"),n(17,"Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus."),t()(),e(18,"p")(19,"i"),n(20,"Vestibulum auctor dapibus neque. Vestibulum auctor dapibus neque."),t()(),e(21,"p")(22,"i"),n(23,"Vivamus vestibulum ntulla nec ante. Vivamus vestibulum ntulla nec ante."),t()(),e(24,"p")(25,"i"),n(26,"Praesent placerat risus quis eros. Praesent placerat risus quis eros."),t()(),e(27,"p")(28,"i"),n(29,"Fusce pellentesque suscipit nibh. Fusce pellentesque suscipit nibh."),t()(),e(30,"p")(31,"i"),n(32,"Integer vitae libero ac risus egestas placerat. Integer vitae libero ac risus egestas placerat."),t()()(),e(33,"nx-sidepanel",4),g("openedChange",function(l){return c(i.opened,l)||(i.opened=l),l}),e(34,"nx-sidepanel-header")(35,"div",5),n(36," Sidepanel "),h(37,"button",6),t()(),e(38,"nx-sidepanel-content")(39,"div",7)(40,"nx-tab-group",8)(41,"nx-tab",9)(42,"p"),n(43," Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "),t(),e(44,"p"),n(45,"Aliquam tincidunt mauris eu risus."),t(),e(46,"p"),n(47,"Vestibulum auctor dapibus neque."),t(),e(48,"p"),n(49,"Nunc dignissim risus id metus."),t(),e(50,"p"),n(51,"Cras ornare tristique elit."),t(),e(52,"p"),n(53,"Vivamus vestibulum ntulla nec ante."),t(),e(54,"p"),n(55,"Praesent placerat risus quis eros."),t(),e(56,"p"),n(57,"Fusce pellentesque suscipit nibh."),t(),e(58,"p"),n(59,"Integer vitae libero ac risus egestas placerat."),t(),e(60,"p"),n(61,"Vestibulum commodo felis quis tortor."),t(),e(62,"p"),n(63,"Ut aliquam sollicitudin leo."),t(),e(64,"p"),n(65,"Cras iaculis ultricies nulla."),t(),e(66,"p"),n(67,"Donec quis dui at dolor tempor interdum."),t(),e(68,"p"),n(69," Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "),t(),e(70,"p"),n(71,"Aliquam tincidunt mauris eu risus."),t(),e(72,"p"),n(73,"Vestibulum auctor dapibus neque."),t(),e(74,"p"),n(75,"Nunc dignissim risus id metus."),t(),e(76,"p"),n(77,"Cras ornare tristique elit."),t()(),e(78,"nx-tab",10)(79,"p",11),n(80," Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mo "),t()()()()()()()),o&2&&(s(2),u("ngModel",i.opened),s(),m("value",!0),s(2),m("value",!1),s(3),b("Opened: ",i.opened,""),s(25),u("opened",i.opened))},dependencies:[_,M,S,y,v,q,x,f,E,w,Me,ve],styles:[".example-container[_ngcontent-%COMP%]{height:400px}.main-content[_ngcontent-%COMP%]{padding-right:24px}.my-sidepanel[_ngcontent-%COMP%]{width:384px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 0}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}.my-sidepanel[_ngcontent-%COMP%]     nx-tab-header{position:sticky;top:0;padding-top:24px;background:var(--sidepanel-background-color)}"]})}}return a})();var We=[ne,ae,oe,re,te,ie],Gt=(()=>{class a{static components(){return{"sidepanel-floating":ne,"sidepanel-static":ae,"sidepanel-light":oe,"sidepanel-with-tabs":re,"sidepanel-dark":te,"sidepanel-focus":ie}}static{this.\u0275fac=function(o){return new(o||a)}}static{this.\u0275mod=Q({type:a})}static{this.\u0275inj=H({imports:[z,we,S,j,qe,We]})}}return a})();export{Gt as SidepanelExamplesModule};
