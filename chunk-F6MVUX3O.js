import{a as v,b as M,c as ye}from"./chunk-4U3CSISY.js";import{c as _e,f as Ee,i as be}from"./chunk-AVVLJAVJ.js";import"./chunk-XG3CSY72.js";import{f as b,k as y,z as ue}from"./chunk-MNAWWTKB.js";import{c as ce,d as J,g as Y,h as Z,i as $}from"./chunk-BUOL5UUF.js";import{v as fe,w as Ce}from"./chunk-JQRF2ONG.js";import{j as he}from"./chunk-D6XGM6VK.js";import"./chunk-MQ3MCZLV.js";import{a as ee}from"./chunk-77EAOUPF.js";import"./chunk-LVQ7DULK.js";import{c as Se,e as U}from"./chunk-WBPLCJVU.js";import{x as xe}from"./chunk-KTTWGBFS.js";import"./chunk-I2GY6XMW.js";import{a as ge}from"./chunk-VTTX4ZNP.js";import{B as me}from"./chunk-GHZ7IFWX.js";import{$b as re,Bc as pe,Cc as de,Ia as W,Ja as A,Pb as u,Qb as ae,Ra as O,Rb as X,Sa as oe,Vb as e,Wb as t,Wc as j,Xb as S,ba as ie,bc as se,ea as k,ec as I,fc as le,hc as L,ic as D,la as ne,mc as G,n as V,na as Q,nc as K,oc as T,pc as F,rc as i,tb as p,tc as E,ub as f,vc as c,wc as g,xc as x,ya as m,za as z}from"./chunk-O56WLCF2.js";var te=["*"],Ve=r=>({transformX:r}),ke=(r,n)=>({value:r,params:n}),De=["*",[["nx-sidepanel"]]],Te=["*","nx-sidepanel"],Fe=["nxSidepanelCloseButton",""],Be={sidepanelExpansion:ce("sidepanelExpansion",[Z("closed",Y({transform:"translateX({{ transformX }})",boxShadow:"none",visibility:"hidden"}),{params:{transformX:"100%"}}),Z("open",Y({transform:"none",boxShadow:"*",visibility:"visible"})),$("closed => open",J(".4s cubic-bezier(0, 0, 0.1, 1)")),$("open-instant => closed, open => closed",J(".2s cubic-bezier(0.8, 0, 1, 1)"))])},C=(()=>{let n=class n{};n.\u0275fac=function(a){return new(a||n)},n.\u0275cmp=m({type:n,selectors:[["nx-sidepanel-header"]],ngContentSelectors:te,decls:1,vars:0,template:function(a,o){a&1&&(L(),D(0))},styles:["[_nghost-%COMP%]{display:block;font-size:var(--sidepanel-header-font-size);line-height:var(--sidepanel-header-line-height);font-weight:var(--sidepanel-header-font-weight);letter-spacing:var(--sidepanel-header-letter-spacing)}"],changeDetection:0});let r=n;return r})(),h=(()=>{let n=class n{set opened(s){this._opened=ge(s),this._setOpenState(this._opened),this._wrapper?._update(),this._cdr.markForCheck()}get opened(){return this._opened}set position(s){this._position=s,this._cdr.markForCheck(),this._wrapper?._update()}get position(){return this._position}set appearance(s){this._appearance=s,this._cdr.markForCheck()}get appearance(){return this._appearance}constructor(s,a,o,d){this._cdr=s,this._elementRef=a,this._dir=o,this._wrapper=d,this._opened=!0,this._position="floating",this._appearance="dark",this._openState="open-instant",this.openedChange=new oe,this._wrapper==null&&console.warn("NxSidepanelComponent needs a wrapping NxSidepanelOuterContainerComponent to work as expected.")}toggle(){this.opened=!this.opened,this.openedChange.emit(this._opened)}open(){this.opened||this.toggle()}close(){this.opened&&this.toggle()}_getWidth(){return this._elementRef.nativeElement.offsetWidth}_getOpenState(){return this._openState}_setOpenState(s){this._openState==="open-instant"&&s||(this._openState=s?"open":"closed",s&&(this.triggerElem=document.activeElement))}onAnimationDone(s){this.openedChange.emit(this._opened),this.focusTrigger(this._opened)}focusTrigger(s){!s&&this.triggerElem&&(this.triggerElem.focus(),this.triggerElem=null)}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}};n.\u0275fac=function(a){return new(a||n)(f(j),f(O),f(ee,8),f(ne(()=>_),8))},n.\u0275cmp=m({type:n,selectors:[["nx-sidepanel"]],contentQueries:function(a,o,d){if(a&1&&G(d,C,5,O),a&2){let l;T(l=F())&&(o._header=l.first)}},hostAttrs:["role","complementary"],hostVars:16,hostBindings:function(a,o){a&1&&le("@sidepanelExpansion.done",function(l){return o.onAnimationDone(l)}),a&2&&(se("@sidepanelExpansion",de(13,ke,o._wrapper?o._getOpenState():"",pe(11,Ve,o.dir==="rtl"?"-100%":"100%"))),X("is-closed",!o.opened)("is-static",o.position==="static")("is-floating",o.position==="floating")("light",o.appearance==="light")("without-wrapper",!o._wrapper))},inputs:{opened:"opened",position:"position",appearance:"appearance"},outputs:{openedChange:"openedChange"},ngContentSelectors:te,decls:1,vars:0,template:function(a,o){a&1&&(L(),D(0))},styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;position:absolute;right:0;top:0;height:100%;overflow:hidden;background:var(--sidepanel-background-color)}[dir=rtl]   [_nghost-%COMP%]{right:auto;left:0}.is-floating[_nghost-%COMP%]{z-index:1;box-shadow:var(--sidepanel-floating-shadow)}[_nghost-%COMP%]   .is-closed[_ngcontent-%COMP%]{transform:translate(100%)}[dir=rtl]   [_nghost-%COMP%]   .is-closed[_ngcontent-%COMP%]{transform:translate(-100%)}.light[_nghost-%COMP%]{background:var(--sidepanel-light-background-color);border-left:1px solid var(--sidepanel-light-border-color)}[dir=rtl]   .light[_nghost-%COMP%]{border-left:unset;border-right:1px solid var(--sidepanel-light-border-color)}@media screen and (forced-colors: active){[_nghost-%COMP%]{border-left:1px solid CanvasText}[dir=rtl]   [_nghost-%COMP%]{border-left:none;border-right:1px solid CanvasText}}.without-wrapper.is-floating[_nghost-%COMP%]{position:fixed;right:0;z-index:1;box-shadow:var(--sidepanel-floating-shadow)}[dir=rtl]   .without-wrapper.is-floating[_nghost-%COMP%]{right:auto;left:0}.without-wrapper.is-static[_nghost-%COMP%]{position:sticky;top:0}.without-wrapper.is-closed[_nghost-%COMP%]{display:none}"],data:{animation:[Be.sidepanelExpansion]},changeDetection:0});let r=n;return r})(),_=(()=>{let n=class n{constructor(s,a){this._dir=s,this._cdr=a,this._destroyed=new V,this._dir?.change.pipe(k(this._destroyed)).subscribe(()=>{this._cdr.markForCheck()})}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}_update(){this._cdr.markForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_getOpenState(){return this._sidepanel?.position==="static"?this._sidepanel._getOpenState():"closed"}_getSidepanelWidth(){return this._sidepanel?.position==="static"&&this._sidepanel?.opened?this._sidepanel._getWidth():0}};n.\u0275fac=function(a){return new(a||n)(f(ee,8),f(j))},n.\u0275cmp=m({type:n,selectors:[["nx-sidepanel-outer-container"]],contentQueries:function(a,o,d){if(a&1&&G(d,h,5),a&2){let l;T(l=F())&&(o._sidepanel=l.first)}},ngContentSelectors:Te,decls:3,vars:8,consts:[[1,"nx-sidepanel-outer-container__content"]],template:function(a,o){a&1&&(L(De),e(0,"div",0),D(1),t(),D(2,1)),a&2&&(ae("margin-right",o.dir==="ltr"?o._getSidepanelWidth():0,"px")("margin-left",o.dir==="rtl"?o._getSidepanelWidth():0,"px"),X("with-margin",o._getOpenState()==="open")("without-margin",o._getOpenState()==="closed"))},styles:["[_nghost-%COMP%]{position:relative;display:block;height:100%;overflow:hidden}[_nghost-%COMP%]   .nx-sidepanel-outer-container__content[_ngcontent-%COMP%]{position:relative;z-index:1;display:block;height:100%;overflow:auto}[_nghost-%COMP%]   .nx-sidepanel-outer-container__content.with-margin[_ngcontent-%COMP%]{transition-duration:.4s;transition-timing-function:cubic-bezier(0,0,.1,1);transition-property:margin-right}[dir=rtl]   [_nghost-%COMP%]   .nx-sidepanel-outer-container__content.with-margin[_ngcontent-%COMP%]{transition-property:margin-left}[_nghost-%COMP%]   .nx-sidepanel-outer-container__content.without-margin[_ngcontent-%COMP%]{transition-duration:.2s;transition-timing-function:cubic-bezier(.8,0,1,1);transition-property:margin-right}[dir=rtl]   [_nghost-%COMP%]   .nx-sidepanel-outer-container__content.without-margin[_ngcontent-%COMP%]{transition-property:margin-left}"],changeDetection:0});let r=n;return r})(),q=(()=>{let n=class n{_toggle(){this._sidepanel.toggle()}constructor(s,a,o){this._sidepanel=s,this._focusMonitor=a,this._elementRef=o}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}};n.\u0275fac=function(a){return new(a||n)(f(h),f(xe),f(O))},n.\u0275cmp=m({type:n,selectors:[["button","nxSidepanelCloseButton",""]],hostBindings:function(a,o){a&1&&I("click",function(){return o._toggle()})},attrs:Fe,decls:1,vars:0,consts:[["name","close","size","s","aria-hidden","true"]],template:function(a,o){a&1&&S(0,"nx-icon",0)},dependencies:[Se],styles:["[_nghost-%COMP%]{cursor:pointer;background-color:transparent;border:none;outline:none;padding:0;display:flex;align-items:center}[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{color:var(--sidepanel-close-icon-color)}@media screen and (forced-colors: active){[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{color:buttonText}}.cdk-keyboard-focused[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow);border-radius:4px}@media screen and (forced-colors: active),(forced-colors: active){.cdk-keyboard-focused[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}"],changeDetection:0});let r=n;return r})(),w=(()=>{let n=class n{};n.\u0275fac=function(a){return new(a||n)},n.\u0275cmp=m({type:n,selectors:[["nx-sidepanel-content"]],hostAttrs:["tabindex","0"],ngContentSelectors:te,decls:1,vars:0,template:function(a,o){a&1&&(L(),D(0))},styles:["[_nghost-%COMP%]{display:block;overflow-y:scroll;height:100%}"],changeDetection:0});let r=n;return r})(),ve=(()=>{let n=class n{};n.\u0275fac=function(a){return new(a||n)},n.\u0275mod=z({type:n}),n.\u0275inj=Q({imports:[me,U,he]});let r=n;return r})();var Me=(()=>{let n=class n{constructor(){this.opened=!0}};n.\u0275fac=function(a){return new(a||n)},n.\u0275cmp=m({type:n,selectors:[["sidepanel-dark-example"]],decls:76,vars:5,consts:[[1,"example-container"],[1,"main-content"],["variant","small",3,"ngModelChange","ngModel"],[3,"value"],["position","static",1,"my-sidepanel",3,"openedChange","opened"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],[1,"nx-margin-top-0"]],template:function(a,o){a&1&&(e(0,"nx-sidepanel-outer-container",0)(1,"div",1)(2,"nx-radio-toggle",2),x("ngModelChange",function(l){return g(o.opened,l)||(o.opened=l),l}),e(3,"nx-radio-toggle-button",3),i(4,"Open"),t(),e(5,"nx-radio-toggle-button",3),i(6,"Close"),t()(),e(7,"p"),i(8),t(),e(9,"p")(10,"i"),i(11,"Here is some example content that can be scrolled."),t()(),e(12,"p")(13,"i"),i(14,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t()(),e(15,"p")(16,"i"),i(17,"Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus."),t()(),e(18,"p")(19,"i"),i(20,"Vestibulum auctor dapibus neque. Vestibulum auctor dapibus neque."),t()(),e(21,"p")(22,"i"),i(23,"Vivamus vestibulum ntulla nec ante. Vivamus vestibulum ntulla nec ante."),t()(),e(24,"p")(25,"i"),i(26,"Praesent placerat risus quis eros. Praesent placerat risus quis eros."),t()(),e(27,"p")(28,"i"),i(29,"Fusce pellentesque suscipit nibh. Fusce pellentesque suscipit nibh."),t()(),e(30,"p")(31,"i"),i(32,"Integer vitae libero ac risus egestas placerat. Integer vitae libero ac risus egestas placerat."),t()()(),e(33,"nx-sidepanel",4),x("openedChange",function(l){return g(o.opened,l)||(o.opened=l),l}),e(34,"nx-sidepanel-header")(35,"div",5),i(36," Sidepanel "),S(37,"button",6),t()(),e(38,"nx-sidepanel-content")(39,"div",7)(40,"p",8),i(41," Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "),t(),e(42,"p"),i(43,"Aliquam tincidunt mauris eu risus."),t(),e(44,"p"),i(45,"Vestibulum auctor dapibus neque."),t(),e(46,"p"),i(47,"Nunc dignissim risus id metus."),t(),e(48,"p"),i(49,"Cras ornare tristique elit."),t(),e(50,"p"),i(51,"Vivamus vestibulum ntulla nec ante."),t(),e(52,"p"),i(53,"Praesent placerat risus quis eros."),t(),e(54,"p"),i(55,"Fusce pellentesque suscipit nibh."),t(),e(56,"p"),i(57,"Integer vitae libero ac risus egestas placerat."),t(),e(58,"p"),i(59,"Vestibulum commodo felis quis tortor."),t(),e(60,"p"),i(61,"Ut aliquam sollicitudin leo."),t(),e(62,"p"),i(63,"Cras iaculis ultricies nulla."),t(),e(64,"p"),i(65,"Donec quis dui at dolor tempor interdum."),t(),e(66,"p"),i(67,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t(),e(68,"p"),i(69,"Aliquam tincidunt mauris eu risus."),t(),e(70,"p"),i(71,"Vestibulum auctor dapibus neque."),t(),e(72,"p"),i(73,"Nunc dignissim risus id metus."),t(),e(74,"p"),i(75,"Cras ornare tristique elit."),t()()()()()),a&2&&(p(2),c("ngModel",o.opened),p(),u("value",!0),p(2),u("value",!1),p(3),E("Opened: ",o.opened,""),p(25),c("opened",o.opened))},dependencies:[h,C,w,q,_,v,M,b,y],styles:[".example-container[_ngcontent-%COMP%]{height:400px}.main-content[_ngcontent-%COMP%]{padding-right:24px}.my-sidepanel[_ngcontent-%COMP%]{width:240px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 24px}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}"]});let r=n;return r})();var qe=(()=>{let n=class n{constructor(s,a){this.viewportService=s,this._cdr=a,this.opened=!0,this.isGreaterThanSmall=!0,this._destroyed=new V,this.viewportService.min(fe.BREAKPOINT_SMALL).pipe(k(this._destroyed)).subscribe(o=>{o!==this.isGreaterThanSmall&&(this.isGreaterThanSmall=o,o&&!this.opened?this.opened=!0:!o&&this.opened&&(this.opened=!1),this._cdr.detectChanges())})}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}};n.\u0275fac=function(a){return new(a||n)(f(Ce),f(j))},n.\u0275cmp=m({type:n,selectors:[["sidepanel-floating-example"]],decls:91,vars:5,consts:[[1,"example-container"],["variant","small",3,"ngModelChange","ngModel"],[3,"value"],[1,"my-sidepanel",3,"openedChange","opened"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],[1,"nx-margin-top-0"]],template:function(a,o){a&1&&(e(0,"nx-sidepanel-outer-container",0)(1,"nx-radio-toggle",1),x("ngModelChange",function(l){return g(o.opened,l)||(o.opened=l),l}),e(2,"nx-radio-toggle-button",2),i(3,"Open"),t(),e(4,"nx-radio-toggle-button",2),i(5,"Close"),t()(),e(6,"p"),i(7),t(),e(8,"p")(9,"i"),i(10,"Here is some example content that can be scrolled."),t()(),e(11,"p")(12,"i"),i(13,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t()(),e(14,"p")(15,"i"),i(16,"Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus."),t()(),e(17,"p")(18,"i"),i(19,"Vestibulum auctor dapibus neque. Vestibulum auctor dapibus neque."),t()(),e(20,"p")(21,"i"),i(22,"Vivamus vestibulum ntulla nec ante. Vivamus vestibulum ntulla nec ante."),t()(),e(23,"p")(24,"i"),i(25,"Praesent placerat risus quis eros. Praesent placerat risus quis eros."),t()(),e(26,"p")(27,"i"),i(28,"Fusce pellentesque suscipit nibh. Fusce pellentesque suscipit nibh."),t()(),e(29,"p")(30,"i"),i(31,"Integer vitae libero ac risus egestas placerat. Integer vitae libero ac risus egestas placerat."),t()(),e(32,"nx-sidepanel",3),x("openedChange",function(l){return g(o.opened,l)||(o.opened=l),l}),e(33,"nx-sidepanel-header")(34,"div",4),i(35," Sidepanel "),S(36,"button",5),t()(),e(37,"nx-sidepanel-content")(38,"div",6)(39,"p",7),i(40," Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "),t(),e(41,"p"),i(42,"Aliquam tincidunt mauris eu risus."),t(),e(43,"p"),i(44,"Vestibulum auctor dapibus neque."),t(),e(45,"p"),i(46,"Nunc dignissim risus id metus."),t(),e(47,"p"),i(48,"Cras ornare tristique elit."),t(),e(49,"p"),i(50,"Vivamus vestibulum ntulla nec ante."),t(),e(51,"p"),i(52,"Praesent placerat risus quis eros."),t(),e(53,"p"),i(54,"Fusce pellentesque suscipit nibh."),t(),e(55,"p"),i(56,"Integer vitae libero ac risus egestas placerat."),t(),e(57,"p"),i(58,"Vestibulum commodo felis quis tortor."),t(),e(59,"p"),i(60,"Ut aliquam sollicitudin leo."),t(),e(61,"p"),i(62,"Cras iaculis ultricies nulla."),t(),e(63,"p"),i(64,"Donec quis dui at dolor tempor interdum."),t(),e(65,"p"),i(66,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t(),e(67,"p"),i(68,"Aliquam tincidunt mauris eu risus."),t(),e(69,"p"),i(70,"Vestibulum auctor dapibus neque."),t(),e(71,"p"),i(72,"Nunc dignissim risus id metus."),t(),e(73,"p"),i(74,"Cras ornare tristique elit."),t(),e(75,"p"),i(76,"Vivamus vestibulum ntulla nec ante."),t(),e(77,"p"),i(78,"Praesent placerat risus quis eros."),t(),e(79,"p"),i(80,"Fusce pellentesque suscipit nibh."),t(),e(81,"p"),i(82,"Integer vitae libero ac risus egestas placerat."),t(),e(83,"p"),i(84,"Vestibulum commodo felis quis tortor."),t(),e(85,"p"),i(86,"Ut aliquam sollicitudin leo."),t(),e(87,"p"),i(88,"Cras iaculis ultricies nulla."),t(),e(89,"p"),i(90,"Donec quis dui at dolor tempor interdum."),t()()()()()),a&2&&(p(),c("ngModel",o.opened),p(),u("value",!0),p(2),u("value",!1),p(3),E("Opened: ",o.opened,""),p(25),c("opened",o.opened))},dependencies:[h,C,w,q,_,v,M,b,y],styles:[".example-container[_ngcontent-%COMP%]{height:400px}.my-sidepanel[_ngcontent-%COMP%]{width:240px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 24px}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}.example-hint[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%]{vertical-align:bottom}"]});let r=n;return r})();var We=["closeButton"],we=(()=>{let n=class n{constructor(){this.opened=!0,this._destroyed=new V}ngAfterViewInit(){this.panel.openedChange.pipe(ie(1),k(this._destroyed)).subscribe(s=>s&&this.closeButton.nativeElement.focus())}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}};n.\u0275fac=function(a){return new(a||n)},n.\u0275cmp=m({type:n,selectors:[["sidepanel-focus-example"]],viewQuery:function(a,o){if(a&1&&(K(h,5),K(We,5,O)),a&2){let d;T(d=F())&&(o.panel=d.first),T(d=F())&&(o.closeButton=d.first)}},decls:56,vars:5,consts:[["closeButton",""],[1,"example-container"],[1,"main-content"],["variant","small",3,"ngModelChange","ngModel"],[3,"value"],[3,"click"],["position","static",1,"my-sidepanel",3,"openedChange","opened"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],[1,"nx-margin-top-0"]],template:function(a,o){if(a&1){let d=re();e(0,"nx-sidepanel-outer-container",1)(1,"div",2)(2,"nx-radio-toggle",3),x("ngModelChange",function(P){return W(d),g(o.opened,P)||(o.opened=P),A(P)}),e(3,"nx-radio-toggle-button",4),i(4,"Open"),t(),e(5,"nx-radio-toggle-button",4),i(6,"Close"),t()(),e(7,"p"),i(8),t(),e(9,"p")(10,"i"),i(11,"Here is some example content that can be scrolled."),t()(),e(12,"button",5),I("click",function(){return W(d),A(o.panel.toggle())}),i(13,"open sidepanel 1"),t(),e(14,"p"),i(15,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t(),e(16,"p"),i(17,"Aliquam tincidunt mauris eu risus."),t(),e(18,"p"),i(19,"Vestibulum auctor dapibus neque."),t(),e(20,"p"),i(21,"Nunc dignissim risus id metus."),t(),e(22,"button",5),I("click",function(){return W(d),A(o.panel.toggle())}),i(23,"open sidepanel 2"),t(),e(24,"p"),i(25,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t(),e(26,"p"),i(27,"Aliquam tincidunt mauris eu risus."),t(),e(28,"p"),i(29,"Vestibulum auctor dapibus neque."),t(),e(30,"p"),i(31,"Nunc dignissim risus id metus."),t()(),e(32,"nx-sidepanel",6),x("openedChange",function(P){return W(d),g(o.opened,P)||(o.opened=P),A(P)}),e(33,"nx-sidepanel-header")(34,"div",7),i(35," Sidepanel "),S(36,"button",8,0),t()(),e(38,"nx-sidepanel-content")(39,"div",9)(40,"p",10),i(41," Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "),t(),e(42,"p"),i(43,"Aliquam tincidunt mauris eu risus."),t(),e(44,"p"),i(45,"Vestibulum auctor dapibus neque."),t(),e(46,"p"),i(47,"Nunc dignissim risus id metus."),t(),e(48,"p"),i(49,"Cras ornare tristique elit."),t(),e(50,"p"),i(51,"Vivamus vestibulum ntulla nec ante."),t(),e(52,"p"),i(53,"Praesent placerat risus quis eros."),t(),e(54,"p"),i(55,"Fusce pellentesque suscipit nibh."),t()()()()()}a&2&&(p(2),c("ngModel",o.opened),p(),u("value",!0),p(2),u("value",!1),p(3),E("Opened: ",o.opened,""),p(24),c("opened",o.opened))},dependencies:[h,C,w,q,_,v,M,b,y],styles:[".example-container[_ngcontent-%COMP%]{height:400px}.main-content[_ngcontent-%COMP%]{padding-right:24px}.my-sidepanel[_ngcontent-%COMP%]{width:240px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 24px}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}"]});let r=n;return r})();var Pe=(()=>{let n=class n{constructor(){this.opened=!0}};n.\u0275fac=function(a){return new(a||n)},n.\u0275cmp=m({type:n,selectors:[["sidepanel-light-example"]],decls:76,vars:5,consts:[[1,"example-container"],[1,"main-content"],["variant","small",3,"ngModelChange","ngModel"],[3,"value"],["position","static","appearance","light",1,"my-sidepanel",3,"openedChange","opened"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],[1,"nx-margin-top-0"]],template:function(a,o){a&1&&(e(0,"nx-sidepanel-outer-container",0)(1,"div",1)(2,"nx-radio-toggle",2),x("ngModelChange",function(l){return g(o.opened,l)||(o.opened=l),l}),e(3,"nx-radio-toggle-button",3),i(4,"Open"),t(),e(5,"nx-radio-toggle-button",3),i(6,"Close"),t()(),e(7,"p"),i(8),t(),e(9,"p")(10,"i"),i(11,"Here is some example content that can be scrolled."),t()(),e(12,"p")(13,"i"),i(14,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t()(),e(15,"p")(16,"i"),i(17,"Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus."),t()(),e(18,"p")(19,"i"),i(20,"Vestibulum auctor dapibus neque. Vestibulum auctor dapibus neque."),t()(),e(21,"p")(22,"i"),i(23,"Vivamus vestibulum ntulla nec ante. Vivamus vestibulum ntulla nec ante."),t()(),e(24,"p")(25,"i"),i(26,"Praesent placerat risus quis eros. Praesent placerat risus quis eros."),t()(),e(27,"p")(28,"i"),i(29,"Fusce pellentesque suscipit nibh. Fusce pellentesque suscipit nibh."),t()(),e(30,"p")(31,"i"),i(32,"Integer vitae libero ac risus egestas placerat. Integer vitae libero ac risus egestas placerat."),t()()(),e(33,"nx-sidepanel",4),x("openedChange",function(l){return g(o.opened,l)||(o.opened=l),l}),e(34,"nx-sidepanel-header")(35,"div",5),i(36," Sidepanel "),S(37,"button",6),t()(),e(38,"nx-sidepanel-content")(39,"div",7)(40,"p",8),i(41," Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "),t(),e(42,"p"),i(43,"Aliquam tincidunt mauris eu risus."),t(),e(44,"p"),i(45,"Vestibulum auctor dapibus neque."),t(),e(46,"p"),i(47,"Nunc dignissim risus id metus."),t(),e(48,"p"),i(49,"Cras ornare tristique elit."),t(),e(50,"p"),i(51,"Vivamus vestibulum ntulla nec ante."),t(),e(52,"p"),i(53,"Praesent placerat risus quis eros."),t(),e(54,"p"),i(55,"Fusce pellentesque suscipit nibh."),t(),e(56,"p"),i(57,"Integer vitae libero ac risus egestas placerat."),t(),e(58,"p"),i(59,"Vestibulum commodo felis quis tortor."),t(),e(60,"p"),i(61,"Ut aliquam sollicitudin leo."),t(),e(62,"p"),i(63,"Cras iaculis ultricies nulla."),t(),e(64,"p"),i(65,"Donec quis dui at dolor tempor interdum."),t(),e(66,"p"),i(67,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t(),e(68,"p"),i(69,"Aliquam tincidunt mauris eu risus."),t(),e(70,"p"),i(71,"Vestibulum auctor dapibus neque."),t(),e(72,"p"),i(73,"Nunc dignissim risus id metus."),t(),e(74,"p"),i(75,"Cras ornare tristique elit."),t()()()()()),a&2&&(p(2),c("ngModel",o.opened),p(),u("value",!0),p(2),u("value",!1),p(3),E("Opened: ",o.opened,""),p(25),c("opened",o.opened))},dependencies:[h,C,w,q,_,v,M,b,y],styles:[".example-container[_ngcontent-%COMP%]{height:400px;background-color:var(--ui-02)}.main-content[_ngcontent-%COMP%]{padding:24px}.my-sidepanel[_ngcontent-%COMP%]{width:240px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 24px}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}"]});let r=n;return r})();var Oe=(()=>{let n=class n{constructor(){this.opened=!0}};n.\u0275fac=function(a){return new(a||n)},n.\u0275cmp=m({type:n,selectors:[["sidepanel-static-example"]],decls:76,vars:5,consts:[[1,"example-container"],[1,"main-content"],["variant","small",3,"ngModelChange","ngModel"],[3,"value"],["position","static",1,"my-sidepanel",3,"openedChange","opened"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],[1,"nx-margin-top-0"]],template:function(a,o){a&1&&(e(0,"nx-sidepanel-outer-container",0)(1,"div",1)(2,"nx-radio-toggle",2),x("ngModelChange",function(l){return g(o.opened,l)||(o.opened=l),l}),e(3,"nx-radio-toggle-button",3),i(4,"Open"),t(),e(5,"nx-radio-toggle-button",3),i(6,"Close"),t()(),e(7,"p"),i(8),t(),e(9,"p")(10,"i"),i(11,"Here is some example content that can be scrolled."),t()(),e(12,"p")(13,"i"),i(14,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t()(),e(15,"p")(16,"i"),i(17,"Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus."),t()(),e(18,"p")(19,"i"),i(20,"Vestibulum auctor dapibus neque. Vestibulum auctor dapibus neque."),t()(),e(21,"p")(22,"i"),i(23,"Vivamus vestibulum ntulla nec ante. Vivamus vestibulum ntulla nec ante."),t()(),e(24,"p")(25,"i"),i(26,"Praesent placerat risus quis eros. Praesent placerat risus quis eros."),t()(),e(27,"p")(28,"i"),i(29,"Fusce pellentesque suscipit nibh. Fusce pellentesque suscipit nibh."),t()(),e(30,"p")(31,"i"),i(32,"Integer vitae libero ac risus egestas placerat. Integer vitae libero ac risus egestas placerat."),t()()(),e(33,"nx-sidepanel",4),x("openedChange",function(l){return g(o.opened,l)||(o.opened=l),l}),e(34,"nx-sidepanel-header")(35,"div",5),i(36," Sidepanel "),S(37,"button",6),t()(),e(38,"nx-sidepanel-content")(39,"div",7)(40,"p",8),i(41," Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "),t(),e(42,"p"),i(43,"Aliquam tincidunt mauris eu risus."),t(),e(44,"p"),i(45,"Vestibulum auctor dapibus neque."),t(),e(46,"p"),i(47,"Nunc dignissim risus id metus."),t(),e(48,"p"),i(49,"Cras ornare tristique elit."),t(),e(50,"p"),i(51,"Vivamus vestibulum ntulla nec ante."),t(),e(52,"p"),i(53,"Praesent placerat risus quis eros."),t(),e(54,"p"),i(55,"Fusce pellentesque suscipit nibh."),t(),e(56,"p"),i(57,"Integer vitae libero ac risus egestas placerat."),t(),e(58,"p"),i(59,"Vestibulum commodo felis quis tortor."),t(),e(60,"p"),i(61,"Ut aliquam sollicitudin leo."),t(),e(62,"p"),i(63,"Cras iaculis ultricies nulla."),t(),e(64,"p"),i(65,"Donec quis dui at dolor tempor interdum."),t(),e(66,"p"),i(67,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t(),e(68,"p"),i(69,"Aliquam tincidunt mauris eu risus."),t(),e(70,"p"),i(71,"Vestibulum auctor dapibus neque."),t(),e(72,"p"),i(73,"Nunc dignissim risus id metus."),t(),e(74,"p"),i(75,"Cras ornare tristique elit."),t()()()()()),a&2&&(p(2),c("ngModel",o.opened),p(),u("value",!0),p(2),u("value",!1),p(3),E("Opened: ",o.opened,""),p(25),c("opened",o.opened))},dependencies:[h,C,w,q,_,v,M,b,y],styles:[".example-container[_ngcontent-%COMP%]{height:400px}.main-content[_ngcontent-%COMP%]{padding-right:24px}.my-sidepanel[_ngcontent-%COMP%]{width:240px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 24px}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}"]});let r=n;return r})();var Ne=(()=>{let n=class n{constructor(){this.opened=!0}};n.\u0275fac=function(a){return new(a||n)},n.\u0275cmp=m({type:n,selectors:[["sidepanel-with-tabs-example"]],decls:81,vars:5,consts:[[1,"example-container"],[1,"main-content"],["variant","small",3,"ngModelChange","ngModel"],[3,"value"],["position","static",1,"my-sidepanel",3,"openedChange","opened"],[1,"my-sidepanel-header"],["nxSidepanelCloseButton","","aria-label","Close Sidepanel"],[1,"my-sidepanel-content"],["appearance","expert","mobileAccordion","false"],["label","First tab"],["label","Second tab"],["nxCopytext","normal"]],template:function(a,o){a&1&&(e(0,"nx-sidepanel-outer-container",0)(1,"div",1)(2,"nx-radio-toggle",2),x("ngModelChange",function(l){return g(o.opened,l)||(o.opened=l),l}),e(3,"nx-radio-toggle-button",3),i(4,"Open"),t(),e(5,"nx-radio-toggle-button",3),i(6,"Close"),t()(),e(7,"p"),i(8),t(),e(9,"p")(10,"i"),i(11,"Here is some example content that can be scrolled."),t()(),e(12,"p")(13,"i"),i(14,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),t()(),e(15,"p")(16,"i"),i(17,"Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus. Aliquam tincidunt mauris eu risus."),t()(),e(18,"p")(19,"i"),i(20,"Vestibulum auctor dapibus neque. Vestibulum auctor dapibus neque."),t()(),e(21,"p")(22,"i"),i(23,"Vivamus vestibulum ntulla nec ante. Vivamus vestibulum ntulla nec ante."),t()(),e(24,"p")(25,"i"),i(26,"Praesent placerat risus quis eros. Praesent placerat risus quis eros."),t()(),e(27,"p")(28,"i"),i(29,"Fusce pellentesque suscipit nibh. Fusce pellentesque suscipit nibh."),t()(),e(30,"p")(31,"i"),i(32,"Integer vitae libero ac risus egestas placerat. Integer vitae libero ac risus egestas placerat."),t()()(),e(33,"nx-sidepanel",4),x("openedChange",function(l){return g(o.opened,l)||(o.opened=l),l}),e(34,"nx-sidepanel-header")(35,"div",5),i(36," Sidepanel "),S(37,"button",6),t()(),e(38,"nx-sidepanel-content")(39,"div",7)(40,"nx-tab-group",8)(41,"nx-tab",9)(42,"p"),i(43," Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "),t(),e(44,"p"),i(45,"Aliquam tincidunt mauris eu risus."),t(),e(46,"p"),i(47,"Vestibulum auctor dapibus neque."),t(),e(48,"p"),i(49,"Nunc dignissim risus id metus."),t(),e(50,"p"),i(51,"Cras ornare tristique elit."),t(),e(52,"p"),i(53,"Vivamus vestibulum ntulla nec ante."),t(),e(54,"p"),i(55,"Praesent placerat risus quis eros."),t(),e(56,"p"),i(57,"Fusce pellentesque suscipit nibh."),t(),e(58,"p"),i(59,"Integer vitae libero ac risus egestas placerat."),t(),e(60,"p"),i(61,"Vestibulum commodo felis quis tortor."),t(),e(62,"p"),i(63,"Ut aliquam sollicitudin leo."),t(),e(64,"p"),i(65,"Cras iaculis ultricies nulla."),t(),e(66,"p"),i(67,"Donec quis dui at dolor tempor interdum."),t(),e(68,"p"),i(69," Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "),t(),e(70,"p"),i(71,"Aliquam tincidunt mauris eu risus."),t(),e(72,"p"),i(73,"Vestibulum auctor dapibus neque."),t(),e(74,"p"),i(75,"Nunc dignissim risus id metus."),t(),e(76,"p"),i(77,"Cras ornare tristique elit."),t()(),e(78,"nx-tab",10)(79,"p",11),i(80," Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mo "),t()()()()()()()),a&2&&(p(2),c("ngModel",o.opened),p(),u("value",!0),p(2),u("value",!1),p(3),E("Opened: ",o.opened,""),p(25),c("opened",o.opened))},dependencies:[h,C,w,q,_,v,M,b,y,_e,Ee],styles:[".example-container[_ngcontent-%COMP%]{height:400px}.main-content[_ngcontent-%COMP%]{padding-right:24px}.my-sidepanel[_ngcontent-%COMP%]{width:384px}.my-sidepanel-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:32px 32px 0}.my-sidepanel-content[_ngcontent-%COMP%]{padding:0 32px 32px}.my-sidepanel[_ngcontent-%COMP%]     nx-tab-header{position:sticky;top:0;padding-top:24px;background:var(--sidepanel-background-color)}"]});let r=n;return r})();var Vt=(()=>{let n=class n{static components(){return{"sidepanel-floating":qe,"sidepanel-static":Oe,"sidepanel-light":Pe,"sidepanel-with-tabs":Ne,"sidepanel-dark":Me,"sidepanel-focus":we}}};n.\u0275fac=function(a){return new(a||n)},n.\u0275mod=z({type:n}),n.\u0275inj=Q({imports:[ve,ye,ue,U,be]});let r=n;return r})();export{Vt as SidepanelExamplesModule};
