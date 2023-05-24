"use strict";(self.webpackChunkopensource_documentation=self.webpackChunkopensource_documentation||[]).push([[8592],{894:(v,p,a)=>{a.d(p,{Yx:()=>x,aY:()=>M,iM:()=>C});var r=a(1692),t=a(2223),u=a(8929),m=a(1059),h=a(2198),d=a(7625),i=a(2555),e=a(7504);const o=["nxBreadcrumbItem",""],s=["*"],g=["nxBreadcrumb",""];let x=(()=>{class c{constructor(n,_,b){this._renderer=n,this._elemRef=_,this._focusMonitor=b,this._focusMonitor.monitor(this._elemRef)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elemRef)}setAsLast(){this._renderer.setAttribute(this._elemRef.nativeElement,"aria-current","page")}resetAriaLabel(){this._renderer.removeAttribute(this._elemRef.nativeElement,"aria-current")}_onIconClick(n){n.stopPropagation(),n.preventDefault()}}return c.\u0275fac=function(n){return new(n||c)(t.Y36(t.Qsj),t.Y36(t.SBq),t.Y36(i.tE))},c.\u0275cmp=t.Xpm({type:c,selectors:[["a","nxBreadcrumbItem",""]],hostAttrs:[1,"nx-breadcrumb-item"],attrs:o,ngContentSelectors:s,decls:3,vars:0,consts:[[1,"nx-breadcrumb-item__text"],["aria-hidden","true","name","chevron-right",1,"nx-breadcrumb-item__chevron",3,"click"]],template:function(n,_){1&n&&(t.F$t(),t.TgZ(0,"span",0),t.Hsn(1),t.qZA(),t.TgZ(2,"nx-icon",1),t.NdJ("click",function(f){return _._onIconClick(f)}),t.qZA())},dependencies:[e.O8],styles:["[_nghost-%COMP%]{text-decoration:none;display:flex;align-items:center;cursor:auto;color:var(--breadcrumb-color);font-size:var(--breadcrumb-font-size);line-height:var(--breadcrumb-line-height);font-weight:var(--breadcrumb-font-weight);letter-spacing:var(--breadcrumb-letter-spacing)}.nx-breadcrumb-item__chevron[_ngcontent-%COMP%]{margin-left:4px}[dir=rtl][_nghost-%COMP%]   .nx-breadcrumb-item__chevron[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-breadcrumb-item__chevron[_ngcontent-%COMP%]{margin-left:initial;margin-right:4px;transform:rotate(180deg)}.nx-breadcrumb-item__text[_ngcontent-%COMP%]{cursor:pointer}.cdk-keyboard-focused[_nghost-%COMP%]   .nx-breadcrumb-item__text[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow);border-radius:4px}@media screen and (forced-colors: active),(forced-colors: active){.cdk-keyboard-focused[_nghost-%COMP%]   .nx-breadcrumb-item__text[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}"],changeDetection:0}),c})(),M=(()=>{class c{set appearance(n){this._appeareance=n,this._cdr.markForCheck()}get appearance(){return this._appeareance}set negative(n){this._negative=(0,r.Ig)(n),this._cdr.markForCheck()}get negative(){return this._negative}constructor(n){this._cdr=n,this._appeareance="default",this._negative=!1,this._destroyed=new u.xQ}ngAfterContentInit(){0===this.breadcrumbItems.length&&console.warn("A breadcrumb needs NxBreadcrumbItemComponent children wrapped in <li>!"),this.breadcrumbItems.changes.pipe((0,m.O)(this.breadcrumbItems),(0,h.h)(n=>0!==n.length),(0,d.R)(this._destroyed)).subscribe(n=>{this.breadcrumbItems.forEach(_=>_.resetAriaLabel()),this.breadcrumbItems.last.setAsLast()})}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}}return c.\u0275fac=function(n){return new(n||c)(t.Y36(t.sBO))},c.\u0275cmp=t.Xpm({type:c,selectors:[["ol","nxBreadcrumb",""]],contentQueries:function(n,_,b){if(1&n&&t.Suo(b,x,5),2&n){let f;t.iGM(f=t.CRH())&&(_.breadcrumbItems=f)}},hostVars:4,hostBindings:function(n,_){2&n&&t.ekj("is-negative",_.negative)("is-link","link"===_.appearance)},inputs:{appearance:"appearance",negative:"negative"},attrs:g,ngContentSelectors:s,decls:1,vars:0,template:function(n,_){1&n&&(t.F$t(),t.Hsn(0))},styles:["[_nghost-%COMP%]{display:flex;list-style:none;height:24px;padding:0}.is-link[_nghost-%COMP%]     .nx-breadcrumb-item{color:var(--breadcrumb-link-color)}.is-link[_nghost-%COMP%]     .nx-breadcrumb-item__text:hover{color:var(--breadcrumb-link-hover-color)}.is-link[_nghost-%COMP%]     .nx-breadcrumb-item__text:active{color:var(--breadcrumb-link-active-color)}  li:last-child .nx-breadcrumb-item{font-weight:600;cursor:auto}  li:last-child .nx-breadcrumb-item__chevron{display:none}  li+li .nx-breadcrumb-item{margin-left:4px}[dir=rtl][_nghost-%COMP%]     li+li .nx-breadcrumb-item, [dir=rtl]   [_nghost-%COMP%]     li+li .nx-breadcrumb-item{margin-left:initial;margin-right:4px}.is-negative[_nghost-%COMP%]     .nx-breadcrumb-item{color:var(--negative)}@media screen and (forced-colors: active){  .nx-breadcrumb-item__chevron{color:CanvasText}}"],changeDetection:0}),c})(),C=(()=>{class c{}return c.\u0275fac=function(n){return new(n||c)},c.\u0275mod=t.oAB({type:c}),c.\u0275inj=t.cJS({imports:[e.cf]}),c})()},3472:(v,p,a)=>{a.d(p,{Yc:()=>i,lR:()=>h});var r=a(2223);const t=["nxFigure",""],u=["*"],m="auto";let h=(()=>{class e{constructor(){this.rounded=!1,this.size=m}set classNames(s){if(this._classNames===s)return;this._classNames=s;const[x=null]=this._classNames?.match(/^(auto|1by1|1dot8by1|1dot2by1|1by1dot1|2dot6by1)$/)||[m];this.size=x,this.rounded=!!this._classNames?.match(/rounded/)}get classNames(){return this._classNames}}return e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=r.Xpm({type:e,selectors:[["figure","nxFigure",""]],hostVars:16,hostBindings:function(s,g){2&s&&r.ekj("nx-image",!0)("nx-image--auto","auto"===g.size&&!g.rounded)("nx-image--1by1","1by1"===g.size)("nx-image--1dot8by1","1dot8by1"===g.size)("nx-image--1dot2by1","1dot2by1"===g.size)("nx-image--1by1dot1","1by1dot1"===g.size)("nx-image--2dot6by1","2dot6by1"===g.size)("nx-image--rounded",g.rounded)},inputs:{classNames:["nxFigure","classNames"]},attrs:t,ngContentSelectors:u,decls:1,vars:0,template:function(s,g){1&s&&(r.F$t(),r.Hsn(0))},styles:['[_nghost-%COMP%]{display:block;position:relative;line-height:0}[_nghost-%COMP%]     img{display:block;font-family:"object-fit: cover;";object-fit:cover;height:100%;width:100%}.nx-image--auto[_nghost-%COMP%]     img{height:auto}[_nghost-%COMP%]:not(.nx-image--auto)     img{position:absolute;top:0;left:0}[dir=rtl]   [_nghost-%COMP%]:not(.nx-image--auto)     img{right:0;left:auto}.nx-image--rounded[_nghost-%COMP%]{padding-top:100%}.nx-image--rounded[_nghost-%COMP%]     img{border-radius:50%;inset:0;position:absolute}.nx-image--1by1[_nghost-%COMP%]{padding-top:100%}.nx-image--1dot8by1[_nghost-%COMP%]{padding-top:55.5555555556%}.nx-image--1dot2by1[_nghost-%COMP%]{padding-top:83.3333333333%}.nx-image--1by1dot1[_nghost-%COMP%]{padding-top:110%}.nx-image--2dot6by1[_nghost-%COMP%]{padding-top:38.4615384615%}.nx-image--1by1dot4[_nghost-%COMP%]{padding-top:140%}'],changeDetection:0}),e})(),i=(()=>{class e{}return e.\u0275fac=function(s){return new(s||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({}),e})()},1129:(v,p,a)=>{a.d(p,{I:()=>m,e:()=>h});var r=a(2223),t=a(4755);const u=["*"];let m=(()=>{class d{constructor(){this._position=[]}set position(e){this._position=e.split(" ")}get position(){return this._position.join(" ")}_hasPosition(e){return this._position.includes(e)}}return d.\u0275fac=function(e){return new(e||d)},d.\u0275cmp=r.Xpm({type:d,selectors:[["nx-indicator"]],hostVars:10,hostBindings:function(e,o){2&e&&r.ekj("nx-indicator",!0)("nx-indicator--over-text",o._hasPosition("over-text"))("nx-indicator--over-icon",o._hasPosition("over-icon"))("nx-indicator--after-text",o._hasPosition("after-text"))("nx-indicator--with-overlap",o._hasPosition("with-overlap"))},inputs:{position:"position"},ngContentSelectors:u,decls:1,vars:0,template:function(e,o){1&e&&(r.F$t(),r.Hsn(0))},styles:["[_nghost-%COMP%]{display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;border-radius:12px;padding-left:3px;padding-right:3px;height:16px;font-size:var(--indicator-font-size);line-height:var(--indicator-line-height);font-weight:var(--indicator-font-weight);letter-spacing:var(--indicator-letter-spacing);color:var(--indicator-color);background-color:var(--indicator-background-color);border:1px solid var(--indicator-border-color)}[_nghost-%COMP%]:empty{height:10px;width:10px}[_nghost-%COMP%]:not(:empty){min-width:16px}@media screen and (forced-colors: active){[_nghost-%COMP%]{border:1px solid CanvasText;color:CanvasText;background-color:Canvas}}.nx-indicator--over-text[_nghost-%COMP%]{position:absolute;top:0;left:100%}.nx-indicator--over-text[_nghost-%COMP%]:not(:empty){top:-4px}[dir=rtl]   .nx-indicator--over-text[_nghost-%COMP%]{left:auto;right:100%}.nx-indicator--with-overlap[_nghost-%COMP%]{position:absolute}.nx-indicator--with-overlap[_nghost-%COMP%]:not(:empty){left:calc(100% - 4px)}[dir=rtl]   .nx-indicator--with-overlap[_nghost-%COMP%]:not(:empty){left:auto;right:calc(100% - 4px)}.nx-indicator--after-text[_nghost-%COMP%]{vertical-align:top;margin-left:4px}[dir=rtl]   .nx-indicator--after-text[_nghost-%COMP%]{margin-left:initial;margin-right:4px}.nx-indicator--over-icon[_nghost-%COMP%]{position:absolute;left:50%;bottom:50%}.nx-indicator--over-icon[_nghost-%COMP%]:empty{left:calc(50% + 2px);bottom:calc(50% + 2px)}[dir=rtl]   .nx-indicator--over-icon[_nghost-%COMP%]{left:auto;right:50%}[dir=rtl]   .nx-indicator--over-icon[_nghost-%COMP%]:empty{left:auto;right:calc(50% + 2px)}_:-ms-fullscreen.nx-indicator--over-icon[_nghost-%COMP%], _:-ms-fullscreen   .nx-indicator--over-icon[_nghost-%COMP%], :root.nx-indicator--over-icon[_nghost-%COMP%], :root   .nx-indicator--over-icon[_nghost-%COMP%], _:-ms-fullscreen.nx-indicator--over-text[_nghost-%COMP%], _:-ms-fullscreen   .nx-indicator--over-text[_nghost-%COMP%], :root.nx-indicator--over-text[_nghost-%COMP%], :root   .nx-indicator--over-text[_nghost-%COMP%]{display:block;padding-top:1px;text-align:center}"],changeDetection:0}),d})(),h=(()=>{class d{}return d.\u0275fac=function(e){return new(e||d)},d.\u0275mod=r.oAB({type:d}),d.\u0275inj=r.cJS({imports:[t.ez]}),d})()},2820:(v,p,a)=>{a.d(p,{O:()=>d,j:()=>h});var r=a(2223),t=a(5168),u=a(4755);let m=0,h=(()=>{class i{constructor(){this.progressbarId="nx-progress-bar-"+m++,this._value=0}set value(o){this._value=(0,t.uZ)(o||0)}get value(){return this._value}_primaryTransform(){return{transform:`scaleX(${this.value})`}}}return i.\u0275fac=function(o){return new(o||i)},i.\u0275cmp=r.Xpm({type:i,selectors:[["nx-progressbar"]],hostVars:1,hostBindings:function(o,s){2&o&&r.uIk("aria-valuenow",s.value)},inputs:{value:"value"},decls:2,vars:1,consts:[[1,"nx-progress__track"],[1,"nx-progress__indicator",3,"ngStyle"]],template:function(o,s){1&o&&(r.TgZ(0,"div",0),r._UZ(1,"div",1),r.qZA()),2&o&&(r.xp6(1),r.Q6J("ngStyle",s._primaryTransform()))},dependencies:[u.PC],styles:['[_nghost-%COMP%]{display:block;height:4px;overflow:hidden;position:relative;width:100%}.nx-progress__track[_ngcontent-%COMP%]{background-color:var(--progressbar-background-color);height:100%}.nx-progress__indicator[_ngcontent-%COMP%]{transform-origin:top left;height:100%;position:absolute;width:100%}[dir=rtl][_nghost-%COMP%]   .nx-progress__indicator[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-progress__indicator[_ngcontent-%COMP%]{transform-origin:top right}.nx-progress__indicator[_ngcontent-%COMP%]:after{height:100%;position:absolute;width:100%;animation:none;content:"";display:inline-block;left:0;background-color:var(--progressbar-indicator-color)}[dir=rtl][_nghost-%COMP%]   .nx-progress__indicator[_ngcontent-%COMP%]:after, [dir=rtl]   [_nghost-%COMP%]   .nx-progress__indicator[_ngcontent-%COMP%]:after{right:0;left:auto}@media screen and (forced-colors: active){[_nghost-%COMP%]{height:8px}.nx-progress__track[_ngcontent-%COMP%]{border:1px solid windowFrame;border-radius:2px}.nx-progress__indicator[_ngcontent-%COMP%]{border-right:1px solid windowFrame}[dir=rtl][_ngcontent-%COMP%]   .nx-progress__indicator[_ngcontent-%COMP%]{border-right:none;border-left:1px solid windowFrame}.nx-progress__indicator[_ngcontent-%COMP%]:after{background:highlight}}'],changeDetection:0}),i})(),d=(()=>{class i{}return i.\u0275fac=function(o){return new(o||i)},i.\u0275mod=r.oAB({type:i}),i.\u0275inj=r.cJS({imports:[u.ez]}),i})()}}]);