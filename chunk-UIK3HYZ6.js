import{c as R,d as z,g as u,h as P,i as H}from"./chunk-VV4CBK2G.js";import{g as pn,k as xn,l as dn}from"./chunk-LJK2GACP.js";import{j as A}from"./chunk-T5NYCE37.js";import{c as cn,e as L}from"./chunk-V5XCZUGO.js";import{q as rn,t as U}from"./chunk-2EQ73B6L.js";import{a as B}from"./chunk-APNBV455.js";import{l as V,z as w}from"./chunk-CCSED5RY.js";import{$ as X,Ac as _,Db as nn,Ea as W,Ec as on,Gc as an,H as Q,Hc as sn,I as D,Ka as g,Lb as k,Mb as m,Nb as l,Oa as J,Pb as E,Q as Y,Qb as d,Ra as I,Rb as en,Tc as v,Vc as j,ac as S,ba as K,bc as c,dc as b,ed as C,g as G,j as p,jd as r,ka as O,lc as y,ld as ln,ma as M,mc as T,nc as tn,pa as x,wb as h,wc as N,xb as i,za as f,zb as Z,zc as F}from"./chunk-LG2ZA55B.js";var q=new M("CdkAccordion"),gn=(()=>{class e{_stateChanges=new p;_openCloseAllActions=new p;id=x(U).getId("cdk-accordion-");multi=!1;openAll(){this.multi&&this._openCloseAllActions.next(!0)}closeAll(){this._openCloseAllActions.next(!1)}ngOnChanges(n){this._stateChanges.next(n)}ngOnDestroy(){this._stateChanges.complete(),this._openCloseAllActions.complete()}static \u0275fac=function(t){return new(t||e)};static \u0275dir=l({type:e,selectors:[["cdk-accordion"],["","cdkAccordion",""]],inputs:{multi:[2,"multi","multi",r]},exportAs:["cdkAccordion"],features:[v([{provide:q,useExisting:e}]),d,f]})}return e})(),hn=(()=>{class e{accordion=x(q,{optional:!0,skipSelf:!0});_changeDetectorRef=x(C);_expansionDispatcher=x(A);_openCloseAllSubscription=G.EMPTY;closed=new g;opened=new g;destroyed=new g;expandedChange=new g;id=x(U).getId("cdk-accordion-child-");get expanded(){return this._expanded}set expanded(n){if(this._expanded!==n){if(this._expanded=n,this.expandedChange.emit(n),n){this.opened.emit();let t=this.accordion?this.accordion.id:this.id;this._expansionDispatcher.notify(this.id,t)}else this.closed.emit();this._changeDetectorRef.markForCheck()}}_expanded=!1;disabled=!1;_removeUniqueSelectionListener=()=>{};constructor(){}ngOnInit(){this._removeUniqueSelectionListener=this._expansionDispatcher.listen((n,t)=>{this.accordion&&!this.accordion.multi&&this.accordion.id===t&&this.id!==n&&(this.expanded=!1)}),this.accordion&&(this._openCloseAllSubscription=this._subscribeToOpenCloseAllActions())}ngOnDestroy(){this.opened.complete(),this.closed.complete(),this.destroyed.emit(),this.destroyed.complete(),this._removeUniqueSelectionListener(),this._openCloseAllSubscription.unsubscribe()}toggle(){this.disabled||(this.expanded=!this.expanded)}close(){this.disabled||(this.expanded=!1)}open(){this.disabled||(this.expanded=!0)}_subscribeToOpenCloseAllActions(){return this.accordion._openCloseAllActions.subscribe(n=>{this.disabled||(this.expanded=n)})}static \u0275fac=function(t){return new(t||e)};static \u0275dir=l({type:e,selectors:[["cdk-accordion-item"],["","cdkAccordionItem",""]],inputs:{expanded:[2,"expanded","expanded",r],disabled:[2,"disabled","disabled",r]},outputs:{closed:"closed",opened:"opened",destroyed:"destroyed",expandedChange:"expandedChange"},exportAs:["cdkAccordionItem"],features:[v([{provide:q,useValue:void 0}]),d]})}return e})(),Hn=(()=>{class e{static \u0275fac=function(t){return new(t||e)};static \u0275mod=m({type:e});static \u0275inj=O({})}return e})();var On=[[["nx-expansion-panel-header"]],"*"],Mn=["nx-expansion-panel-header","*"],fn=e=>({"nx-expansion-panel__body":!0,"flush-alignment":e});function mn(e,En){}var bn=[[["nx-expansion-panel-title"]],[["nx-expansion-panel-description"]]],yn=["nx-expansion-panel-title","nx-expansion-panel-description"],wn=e=>({"nx-expansion-panel__header-content":!0,"flush-aligned":e}),_n="regular",vn=(()=>{class e extends gn{constructor(){super(...arguments),this._style="regular",this.flushAlignmentSignal=I(!1)}set style(n){n=n||_n;let[t]=n.match(/regular|light|extra-light/)||[_n];this._style=t}get style(){return this._style}set negative(n){this._negative=B(n)}get negative(){return!!this._negative}set flushAlignment(n){this.flushAlignmentSignal.set(n)}get flushAlignment(){return this.flushAlignmentSignal()}static{this.\u0275fac=(()=>{let n;return function(o){return(n||(n=W(e)))(o||e)}})()}static{this.\u0275dir=l({type:e,selectors:[["nx-accordion"]],hostAttrs:["role","presentation"],hostVars:2,hostBindings:function(t,o){t&2&&b("nx-accordion",!0)},inputs:{style:[0,"variant","style"],negative:"negative",flushAlignment:[2,"flushAlignment","flushAlignment",r]},features:[d,E]})}}return e})(),Cn={bodyExpansion:R("bodyExpansion",[P("closed",u({height:"0px",visibility:"hidden"})),P("open",u({height:"*",visibility:"visible"})),H("open <=> closed",z(".5s cubic-bezier(0.86, 0, 0.07, 1)"))]),indicatorRotate:R("indicatorRotate",[P("closed",u({transform:"rotate(0deg)"})),P("open",u({transform:"rotate(180deg)"})),H("open <=> closed",z(".3s ease"))])},An=(()=>{class e{constructor(n){this._template=n}static{this.\u0275fac=function(t){return new(t||e)(i(Z))}}static{this.\u0275dir=l({type:e,selectors:[["","nxExpansionPanelBody",""]]})}}return e})(),Dn=0,$="regular",In=new M("EXPANSION_PANEL_DEFAULT_OPTIONS",{factory:()=>({scrollIntoViewActive:!1,scrollIntoViewOptions:{behavior:"smooth"}})}),un=(()=>{class e extends hn{set negative(n){this._negative=B(n)}get negative(){return this._negative}set style(n){n=n||$;let[t]=n.match(/regular|light|extra-light/)||[$];this._style=t,this._accordionStyle=t}get style(){return this._style}set flushAlignment(n){this._flushAlignment.set(n)}get flushAlignment(){return this.isFlushAligned()}get portal(){return this._portal}constructor(n,t,o,s,a){super(n,t,o),this.accordion=n,this._viewContainerRef=s,this._defaultOptions=a,this._negative=null,this._accordionStyle=$,this._style=null,this._flushAlignment=I(!1),this.isFlushAligned=ln(()=>this.accordion?.flushAlignmentSignal()||this._flushAlignment()),this.scrollIntoViewActive=this._defaultOptions?.scrollIntoViewActive,this.scrollIntoViewOptions=this._defaultOptions?.scrollIntoViewOptions,this._headerId=`nx-expansion-panel-header-${Dn++}`,this._inputChanges=new p}ngAfterContentInit(){this.lazyContent&&this.opened.pipe(X(null),D(()=>this.expanded&&!this._portal),Y(1)).subscribe(()=>{this._portal=new pn(this.lazyContent._template,this._viewContainerRef)}),this.accordion&&(this.style===null&&this.accordion.style!==null&&(this.style=this.accordion.style),this.negative===null&&this.accordion.negative!==null&&(this.negative=this.accordion.negative))}ngOnChanges(n){this._inputChanges.next(n)}ngOnDestroy(){super.ngOnDestroy(),this._inputChanges.complete()}getOpenState(){return this.expanded?"open":"closed"}bodyExpansionDone(n){n.fromState==="closed"&&n.toState==="open"&&n.element.scrollIntoView(this.scrollIntoViewOptions)}static{this.\u0275fac=function(t){return new(t||e)(i(vn,12),i(C),i(A),i(nn),i(In,8))}}static{this.\u0275cmp=k({type:e,selectors:[["nx-expansion-panel"]],contentQueries:function(t,o,s){if(t&1&&on(s,An,5),t&2){let a;an(a=sn())&&(o.lazyContent=a.first)}},hostVars:12,hostBindings:function(t,o){t&2&&b("nx-expanded",o.expanded)("nx-expansion-panel--light",o._accordionStyle==="light")("nx-expansion-panel--regular",o._accordionStyle==="regular")("nx-expansion-panel--extra-light",o._accordionStyle==="extra-light")("nx-expansion-panel--negative",o.negative)("is-disabled",o.disabled)},inputs:{negative:"negative",style:[0,"variant","style"],flushAlignment:[2,"flushAlignment","flushAlignment",r],scrollIntoViewActive:"scrollIntoViewActive",scrollIntoViewOptions:"scrollIntoViewOptions"},exportAs:["NxExpansionPanelComponent"],features:[v([{provide:vn,useValue:void 0}]),d,E,f],ngContentSelectors:Mn,decls:5,vars:7,consts:[["role","region",1,"nx-expansion-panel__content",3,"id"],[1,"nx-expansion-panel__body",3,"ngClass"],[3,"cdkPortalOutlet"]],template:function(t,o){t&1&&(F(On),_(0),y(1,"div",0),N("@bodyExpansion.done",function(a){return o.scrollIntoViewActive&&o.bodyExpansionDone(a)}),y(2,"div",1),_(3,1),en(4,mn,0,0,"ng-template",2),T()()),t&2&&(h(),c("@bodyExpansion",o.getOpenState())("id",o.id),S("aria-labelledby",o._headerId),h(),c("ngClass",j(5,fn,o.flushAlignment)),h(2),c("cdkPortalOutlet",o.portal))},dependencies:[xn,w,V],styles:["[_nghost-%COMP%]{display:block}.nx-expansion-panel--negative[_nghost-%COMP%]     div.nx-expansion-panel__body *{color:var(--negative)}.nx-expansion-panel__content[_ngcontent-%COMP%]{overflow:hidden;display:block}.nx-expansion-panel__body[_ngcontent-%COMP%]{padding:var(--accordion-regular-body-padding);font-size:var(--accordion-body-font-size);line-height:var(--accordion-body-line-height);font-weight:var(--accordion-body-font-weight);letter-spacing:var(--accordion-body-letter-spacing)}.nx-expansion-panel__body.flush-alignment[_ngcontent-%COMP%]{padding-left:0;padding-right:0}@media (max-width: 703px){.nx-expansion-panel__body[_ngcontent-%COMP%]{padding:var(--accordion-regular-mobile-body-padding)}}.nx-expansion-panel--regular[_nghost-%COMP%]:not(:first-child){margin-top:var(--accordion-regular-header-top-margin)}.nx-expansion-panel--regular[_nghost-%COMP%]     .nx-expansion-panel__header-content{box-shadow:inset 0 1px 0 0 var(--accordion-regular-border-color)}.nx-expansion-panel--regular[_nghost-%COMP%]:last-child, .nx-expansion-panel--regular[_nghost-%COMP%]:only-child{box-shadow:0 1px 0 0 var(--accordion-regular-border-color)}@media (max-width: 703px){.nx-expansion-panel--regular[_nghost-%COMP%]:not(:first-child){margin-top:0}.nx-expansion-panel--regular[_nghost-%COMP%]     .nx-expansion-panel__header-content{box-shadow:inset 0 1px 0 0 var(--accordion-regular-mobile-border-color)}.nx-expansion-panel--regular[_nghost-%COMP%]:last-child     .nx-expansion-panel__header-content, .nx-expansion-panel--regular[_nghost-%COMP%]:only-child     .nx-expansion-panel__header-content{box-shadow:inset 0 1px 0 0 var(--accordion-regular-mobile-border-color),inset 0 -1px 0 0 var(--accordion-regular-mobile-separator-color)}.nx-expansion-panel--regular.nx-expanded[_nghost-%COMP%]     .nx-expansion-panel__header-content{box-shadow:inset 0 1px 0 0 var(--accordion-regular-mobile-border-color),inset 0 -1px 0 0 var(--accordion-regular-mobile-separator-color)}}.nx-expansion-panel--light[_nghost-%COMP%]   .nx-expansion-panel__body[_ngcontent-%COMP%]{padding:var(--accordion-light-body-padding)}.nx-expansion-panel--light[_nghost-%COMP%]   .nx-expansion-panel__body.flush-alignment[_ngcontent-%COMP%]{padding-left:0;padding-right:0}@media (max-width: 703px){.nx-expansion-panel--light[_nghost-%COMP%]   .nx-expansion-panel__body[_ngcontent-%COMP%]{padding:var(--accordion-light-mobile-body-padding)}}.nx-expansion-panel--light[_nghost-%COMP%]:not(.nx-expansion-panel--negative)     .nx-expansion-panel__header-content{box-shadow:inset 0 1px 0 0 var(--accordion-light-border-color)}.nx-expansion-panel--light[_nghost-%COMP%]:not(.nx-expansion-panel--negative):last-child, .nx-expansion-panel--light[_nghost-%COMP%]:not(.nx-expansion-panel--negative):only-child{box-shadow:0 1px 0 0 var(--accordion-light-border-color)}@media (max-width: 703px){.nx-expansion-panel--regular.nx-expansion-panel--negative[_nghost-%COMP%]     .nx-expansion-panel__header-content{box-shadow:inset 0 1px 0 0 var(--negative-01)}.nx-expansion-panel--regular.nx-expansion-panel--negative[_nghost-%COMP%]:last-child     .nx-expansion-panel__header-content, .nx-expansion-panel--regular.nx-expansion-panel--negative[_nghost-%COMP%]:only-child     .nx-expansion-panel__header-content{box-shadow:inset 0 1px 0 0 var(--negative-01),inset 0 -1px 0 0 var(--negative-01)}.nx-expansion-panel--regular.nx-expansion-panel--negative.nx-expanded[_nghost-%COMP%]     .nx-expansion-panel__header-content{box-shadow:inset 0 1px 0 0 var(--negative-01),inset 0 -1px 0 0 var(--negative-01)}}.nx-expansion-panel--light.nx-expansion-panel--negative[_nghost-%COMP%]{color:var(--negative)}.nx-expansion-panel--light.nx-expansion-panel--negative[_nghost-%COMP%]     .nx-expansion-panel__header-content{box-shadow:inset 0 1px 0 0 var(--negative)}.nx-expansion-panel--light.nx-expansion-panel--negative[_nghost-%COMP%]:last-child, .nx-expansion-panel--light.nx-expansion-panel--negative[_nghost-%COMP%]:only-child{box-shadow:0 1px 0 0 var(--negative)}.nx-expansion-panel--extra-light[_nghost-%COMP%]:not(:first-child){margin-top:var(--accordion-extra-light-header-top-margin)}.nx-expansion-panel--extra-light[_nghost-%COMP%]   .nx-expansion-panel__body[_ngcontent-%COMP%]{padding:var(--accordion-extra-light-body-padding)}@media screen and (forced-colors: active){[_nghost-%COMP%]{border-color:CanvasText}[_nghost-%COMP%]     .nx-expansion-panel__header-content{color:buttonText}.nx-expansion-panel--regular[_nghost-%COMP%]     .nx-expansion-panel__header-content{border:1px solid buttonText}.is-disabled[_nghost-%COMP%]     .nx-expansion-panel__header-content{border-color:GrayText}.nx-expansion-panel--light.nx-expansion-panel--negative[_nghost-%COMP%]     .nx-expansion-panel__header-content, .nx-expansion-panel--light[_nghost-%COMP%]:not(.nx-expansion-panel--negative)     .nx-expansion-panel__header-content{box-shadow:inset 0 1px 0 0 CanvasText}.nx-expansion-panel--light.nx-expansion-panel--negative[_nghost-%COMP%]:last-child, .nx-expansion-panel--light.nx-expansion-panel--negative[_nghost-%COMP%]:only-child, .nx-expansion-panel--light[_nghost-%COMP%]:not(.nx-expansion-panel--negative):last-child, .nx-expansion-panel--light[_nghost-%COMP%]:not(.nx-expansion-panel--negative):only-child{box-shadow:0 1px 0 0 CanvasText;border-bottom:1px solid CanvasText}}"],data:{animation:[Cn.bodyExpansion]},changeDetection:0})}}return e})(),kn=(()=>{class e{constructor(n,t,o,s){this.panel=n,this._cdr=t,this._elementRef=o,this._focusMonitor=s,this._destroyed=new p,Q(n.opened,n.closed,n._inputChanges.pipe(D(a=>!!(a.hideToggle||a.disabled)))).pipe(K(this._destroyed)).subscribe(()=>this._cdr.markForCheck())}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this._focusMonitor.stopMonitoring(this._elementRef)}isExpanded(){return this.panel.expanded}getOpenState(){return this.panel.getOpenState()}_getPanelId(){return this.panel.id}toggle(){this.panel.toggle()}keydown(n){switch(n.keyCode){case 32:case 13:n.preventDefault(),this.toggle();break;default:}}static{this.\u0275fac=function(t){return new(t||e)(i(un,1),i(C),i(J),i(rn))}}static{this.\u0275cmp=k({type:e,selectors:[["nx-expansion-panel-header"]],hostAttrs:["role","button",1,"nx-expansion-panel__header"],hostVars:9,hostBindings:function(t,o){t&1&&N("keydown",function(a){return o.keydown(a)})("click",function(){return o.toggle()}),t&2&&(S("id",o.panel._headerId)("tabindex",o.panel.disabled?-1:0)("aria-controls",o._getPanelId())("aria-expanded",o.isExpanded())("aria-disabled",o.panel.disabled),b("nx-expanded",o.isExpanded())("is-disabled",o.panel.disabled))},ngContentSelectors:yn,decls:4,vars:4,consts:[[3,"ngClass"],["name","chevron-down","aria-hidden","true",1,"nx-expansion-panel__chevron"]],template:function(t,o){t&1&&(F(bn),y(0,"div",0),_(1),_(2,1),tn(3,"nx-icon",1),T()),t&2&&(c("ngClass",j(2,wn,o.panel.flushAlignment)),h(3),c("@indicatorRotate",o.getOpenState()))},dependencies:[L,cn,w,V],styles:["[_nghost-%COMP%]:focus{outline:none}.nx-expansion-panel__header-content[_ngcontent-%COMP%]{width:100%;cursor:pointer;align-items:center;display:flex;justify-content:space-between;position:relative;outline:none;border:none;padding:var(--accordion-regular-header-padding);color:var(--accordion-regular-header-text-color);background:var(--accordion-regular-header-background-color)}.nx-expansion-panel__header-content.flush-aligned[_ngcontent-%COMP%]{padding-left:0;padding-right:0}@media (max-width: 703px){.nx-expansion-panel__header-content[_ngcontent-%COMP%]{padding:var(--accordion-regular-mobile-header-padding)}}.nx-expansion-panel--regular[_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover, .nx-expansion-panel--regular   [_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover{color:var(--accordion-regular-header-hover-text-color)}.nx-expansion-panel--regular[_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--regular   [_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover   .nx-expansion-panel__chevron[_ngcontent-%COMP%]{color:var(--accordion-regular-hover-chevron-color)}  .nx-expansion-panel__header-title{font-size:var(--accordion-regular-font-size);line-height:var(--accordion-regular-line-height);font-weight:var(--accordion-regular-font-weight);letter-spacing:var(--accordion-regular-letter-spacing);text-align:left;margin-right:32px}@media (max-width: 703px){  .nx-expansion-panel__header-title{font-size:var(--accordion-regular-mobile-font-size);line-height:var(--accordion-regular-mobile-line-height);font-weight:var(--accordion-regular-mobile-font-weight);letter-spacing:var(--accordion-regular-mobile-letter-spacing);margin-right:16px}}[dir=rtl][_nghost-%COMP%]     .nx-expansion-panel__header-title, [dir=rtl]   [_nghost-%COMP%]     .nx-expansion-panel__header-title{text-align:right;margin-right:initial;margin-left:32px}@media (max-width: 703px){[dir=rtl][_nghost-%COMP%]     .nx-expansion-panel__header-title, [dir=rtl]   [_nghost-%COMP%]     .nx-expansion-panel__header-title{margin-right:initial;margin-left:16px}}[_nghost-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%]{pointer-events:none;font-size:var(--accordion-chevron-size)}[_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__chevron[_ngcontent-%COMP%]{color:var(--accordion-regular-chevron-color)}.nx-expansion-panel--light[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--light   [_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]{padding:var(--accordion-light-header-padding);margin-top:0;background:transparent}.nx-expansion-panel--light[_nghost-%COMP%]   .nx-expansion-panel__header-content.flush-aligned[_ngcontent-%COMP%], .nx-expansion-panel--light   [_nghost-%COMP%]   .nx-expansion-panel__header-content.flush-aligned[_ngcontent-%COMP%]{padding-left:0;padding-right:0}@media (max-width: 703px){.nx-expansion-panel--light[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--light   [_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]{padding:var(--accordion-light-mobile-header-padding)}}.nx-expansion-panel--light[_nghost-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--light   [_nghost-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%]{color:var(--accordion-light-chevron-color)}.nx-expansion-panel--light[_nghost-%COMP%]     .nx-expansion-panel__header-title, .nx-expansion-panel--light   [_nghost-%COMP%]     .nx-expansion-panel__header-title{font-size:var(--accordion-light-font-size);line-height:var(--accordion-light-line-height);font-weight:var(--accordion-light-font-weight);letter-spacing:var(--accordion-light-letter-spacing)}@media (max-width: 703px){.nx-expansion-panel--light[_nghost-%COMP%]     .nx-expansion-panel__header-title, .nx-expansion-panel--light   [_nghost-%COMP%]     .nx-expansion-panel__header-title{font-size:var(--accordion-light-mobile-font-size);line-height:var(--accordion-light-mobile-line-height);font-weight:var(--accordion-light-mobile-font-weight);letter-spacing:var(--accordion-light-mobile-letter-spacing)}}.nx-expansion-panel--light:not(.nx-expansion-panel--negative)[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--light:not(.nx-expansion-panel--negative)   [_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]{color:var(--accordion-light-header-text-color)}.nx-expansion-panel--light:not(.nx-expansion-panel--negative)[_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover, .nx-expansion-panel--light:not(.nx-expansion-panel--negative)   [_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover{color:var(--accordion-light-header-hover-text-color)}.nx-expansion-panel--light:not(.nx-expansion-panel--negative)[_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--light:not(.nx-expansion-panel--negative)   [_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover   .nx-expansion-panel__chevron[_ngcontent-%COMP%]{color:var(--accordion-light-hover-chevron-color)}.nx-expansion-panel--light.nx-expansion-panel--negative[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--light.nx-expansion-panel--negative   [_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]{color:var(--negative)}.nx-expansion-panel--light.nx-expansion-panel--negative[_nghost-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--light.nx-expansion-panel--negative   [_nghost-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%]{color:var(--negative)}.nx-expansion-panel--extra-light[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--extra-light   [_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]{padding:0;margin-top:0;background:transparent;justify-content:flex-start;width:max-content;max-width:100%;color:var(--accordion-extra-light-header-text-color);border-radius:4px}.nx-expansion-panel--extra-light[_nghost-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--extra-light   [_nghost-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%]{color:var(--accordion-extra-light-chevron-color)}.nx-expansion-panel--extra-light[_nghost-%COMP%]     .nx-expansion-panel__header-title, .nx-expansion-panel--extra-light   [_nghost-%COMP%]     .nx-expansion-panel__header-title{font-size:var(--accordion-extra-light-font-size);line-height:var(--accordion-extra-light-line-height);font-weight:var(--accordion-extra-light-font-weight);letter-spacing:var(--accordion-extra-light-letter-spacing);margin-right:8px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}[dir=rtl]   .nx-expansion-panel--extra-light[_nghost-%COMP%]     .nx-expansion-panel__header-title, [dir=rtl]   .nx-expansion-panel--extra-light   [_nghost-%COMP%]     .nx-expansion-panel__header-title{margin-left:8px;margin-right:0}.nx-expansion-panel--extra-light.nx-expansion-panel--negative[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--extra-light.nx-expansion-panel--negative   [_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]{color:var(--negative)}.nx-expansion-panel--extra-light.nx-expansion-panel--negative[_nghost-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--extra-light.nx-expansion-panel--negative   [_nghost-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%]{color:var(--negative)}.nx-expansion-panel--extra-light.nx-expansion-panel--negative.is-disabled[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--extra-light.nx-expansion-panel--negative   .is-disabled[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]{color:var(--negative-dimmed)}.nx-expansion-panel--extra-light.nx-expansion-panel--negative.is-disabled[_nghost-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--extra-light.nx-expansion-panel--negative   .is-disabled[_nghost-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%]{color:var(--negative-dimmed)}.is-disabled.is-disabled[_nghost-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .is-disabled.is-disabled[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]{cursor:not-allowed;color:var(--accordion-disabled-color)}.cdk-keyboard-focused[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow);z-index:1}@media screen and (forced-colors: active),(forced-colors: active){.cdk-keyboard-focused[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}@media screen and (forced-colors: active){[_nghost-%COMP%]{forced-colors-adjust:none}.nx-expansion-panel--regular[_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--regular   [_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--regular[_nghost-%COMP%]:not(.is-disabled):not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover, .nx-expansion-panel--regular   [_nghost-%COMP%]:not(.is-disabled):not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover, .nx-expansion-panel--light:not(.nx-expansion-panel--negative)[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--light:not(.nx-expansion-panel--negative)   [_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--light:not(.nx-expansion-panel--negative)[_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover, .nx-expansion-panel--light:not(.nx-expansion-panel--negative)   [_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover, .nx-expansion-panel--light.nx-expansion-panel--negative[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--light.nx-expansion-panel--negative   [_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--light.nx-expansion-panel--negative[_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover, .nx-expansion-panel--light.nx-expansion-panel--negative   [_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover, .nx-expansion-panel--extra-light[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--extra-light   [_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--extra-light[_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover, .nx-expansion-panel--extra-light   [_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover, .nx-expansion-panel--extra-light.nx-expansion-panel--negative[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--extra-light.nx-expansion-panel--negative   [_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%], .nx-expansion-panel--extra-light.nx-expansion-panel--negative[_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover, .nx-expansion-panel--extra-light.nx-expansion-panel--negative   [_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover{color:buttonText;background-color:buttonFace}.nx-expansion-panel--regular[_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--regular   [_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--regular[_nghost-%COMP%]:not(.is-disabled):not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--regular   [_nghost-%COMP%]:not(.is-disabled):not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--light:not(.nx-expansion-panel--negative)[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--light:not(.nx-expansion-panel--negative)   [_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--light:not(.nx-expansion-panel--negative)[_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--light:not(.nx-expansion-panel--negative)   [_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--light.nx-expansion-panel--negative[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--light.nx-expansion-panel--negative   [_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--light.nx-expansion-panel--negative[_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--light.nx-expansion-panel--negative   [_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--extra-light[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--extra-light   [_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--extra-light[_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--extra-light   [_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--extra-light.nx-expansion-panel--negative[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--extra-light.nx-expansion-panel--negative   [_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--extra-light.nx-expansion-panel--negative[_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover   .nx-expansion-panel__chevron[_ngcontent-%COMP%], .nx-expansion-panel--extra-light.nx-expansion-panel--negative   [_nghost-%COMP%]:not(.is-disabled)   .nx-expansion-panel__header-content[_ngcontent-%COMP%]:hover   .nx-expansion-panel__chevron[_ngcontent-%COMP%]{color:buttonText}.is-disabled.is-disabled[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]{color:GrayText!important;background-color:buttonFace}.is-disabled.is-disabled[_nghost-%COMP%]   .nx-expansion-panel__header-content[_ngcontent-%COMP%]   .nx-expansion-panel__chevron[_ngcontent-%COMP%]{color:GrayText!important}}"],data:{animation:[Cn.indicatorRotate]},changeDetection:0})}}return e})();var ge=(()=>{class e{static{this.\u0275fac=function(t){return new(t||e)}}static{this.\u0275dir=l({type:e,selectors:[["nx-expansion-panel-title"]],hostAttrs:[1,"nx-expansion-panel__header-title"]})}}return e})(),he=(()=>{class e{static{this.\u0275fac=function(t){return new(t||e)}}static{this.\u0275mod=m({type:e})}static{this.\u0275inj=O({imports:[w,dn,L,un,kn]})}}return e})();export{Hn as a,vn as b,An as c,un as d,kn as e,ge as f,he as g};
