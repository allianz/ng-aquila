import{c as Ke,e as Y}from"./chunk-LJK2GACP.js";import{a as Ue,d as Ve,e as Z,f as $e,g as ce,h as We}from"./chunk-T5NYCE37.js";import{a as Qe}from"./chunk-TGA3OXY4.js";import{d as Le,l as ze,p as Be,z as je}from"./chunk-CCSED5RY.js";import{Aa as De,Ac as A,Ba as ke,Bc as Ae,Db as M,Ec as R,Ga as Se,Gc as D,Ha as ve,Hc as k,Ka as $,La as be,Lb as E,Mb as W,Mc as re,Nb as d,Nc as He,Oa as v,Pb as N,Qb as L,Rb as F,Tc as ae,Wc as le,ba as j,bb as xe,bc as I,dc as Me,ed as q,fd as H,gc as P,ic as Ee,j as Ce,ja as Re,jc as Ne,jd as O,ka as Q,kc as Fe,lc as C,m as B,ma as U,mc as g,nb as Te,nc as oe,o as ne,oc as ie,pa as a,pc as se,qc as T,rc as Ie,v as ge,wb as _,wc as Pe,xb as Oe,yc as b,za as V,zb as w,zc as K}from"./chunk-LG2ZA55B.js";var at=[[["caption"]],[["colgroup"],["col"]],"*"],lt=["caption","colgroup, col","*"];function ct(n,i){n&1&&A(0,2)}function dt(n,i){n&1&&(C(0,"thead",0),T(1,1),g(),C(2,"tbody",0),T(3,2)(4,3),g(),C(5,"tfoot",0),T(6,4),g())}function ut(n,i){n&1&&T(0,1)(1,2)(2,3)(3,4)}var S=new U("CDK_TABLE");var ue=(()=>{class n{template=a(w);constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,selectors:[["","cdkCellDef",""]]})}return n})(),he=(()=>{class n{template=a(w);constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,selectors:[["","cdkHeaderCellDef",""]]})}return n})(),ht=(()=>{class n{template=a(w);constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,selectors:[["","cdkFooterCellDef",""]]})}return n})(),z=(()=>{class n{_table=a(S,{optional:!0});_hasStickyChanged=!1;get name(){return this._name}set name(e){this._setNameInput(e)}_name;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;get stickyEnd(){return this._stickyEnd}set stickyEnd(e){e!==this._stickyEnd&&(this._stickyEnd=e,this._hasStickyChanged=!0)}_stickyEnd=!1;cell;headerCell;footerCell;cssClassFriendlyName;_columnCssClassName;constructor(){}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}_updateColumnCssClassName(){this._columnCssClassName=[`cdk-column-${this.cssClassFriendlyName}`]}_setNameInput(e){e&&(this._name=e,this.cssClassFriendlyName=e.replace(/[^a-z0-9_-]/gi,"-"),this._updateColumnCssClassName())}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,selectors:[["","cdkColumnDef",""]],contentQueries:function(t,o,s){if(t&1&&(R(s,ue,5),R(s,he,5),R(s,ht,5)),t&2){let r;D(r=k())&&(o.cell=r.first),D(r=k())&&(o.headerCell=r.first),D(r=k())&&(o.footerCell=r.first)}},inputs:{name:[0,"cdkColumnDef","name"],sticky:[2,"sticky","sticky",O],stickyEnd:[2,"stickyEnd","stickyEnd",O]},features:[ae([{provide:"MAT_SORT_HEADER_COLUMN_DEF",useExisting:n}]),L]})}return n})(),G=class{constructor(i,e){e.nativeElement.classList.add(...i._columnCssClassName)}},Ge=(()=>{class n extends G{constructor(){super(a(z),a(v))}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,selectors:[["cdk-header-cell"],["th","cdk-header-cell",""]],hostAttrs:["role","columnheader",1,"cdk-header-cell"],features:[N]})}return n})();var Je=(()=>{class n extends G{constructor(){let e=a(z),t=a(v);super(e,t);let o=e._table?._getCellRole();o&&t.nativeElement.setAttribute("role",o)}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,selectors:[["cdk-cell"],["td","cdk-cell",""]],hostAttrs:[1,"cdk-cell"],features:[N]})}return n})(),J=class{tasks=[];endTasks=[]},qe=new U("_COALESCED_STYLE_SCHEDULER"),ft=(()=>{class n{_currentSchedule=null;_ngZone=a(be);constructor(){}schedule(e){this._createScheduleIfNeeded(),this._currentSchedule.tasks.push(e)}scheduleEnd(e){this._createScheduleIfNeeded(),this._currentSchedule.endTasks.push(e)}_createScheduleIfNeeded(){this._currentSchedule||(this._currentSchedule=new J,this._ngZone.runOutsideAngular(()=>queueMicrotask(()=>{for(;this._currentSchedule.tasks.length||this._currentSchedule.endTasks.length;){let e=this._currentSchedule;this._currentSchedule=new J;for(let t of e.tasks)t();for(let t of e.endTasks)t()}this._currentSchedule=null})))}static \u0275fac=function(t){return new(t||n)};static \u0275prov=Re({token:n,factory:n.\u0275fac})}return n})();var fe=(()=>{class n{template=a(w);_differs=a(H);columns;_columnsDiffer;constructor(){}ngOnChanges(e){if(!this._columnsDiffer){let t=e.columns&&e.columns.currentValue||[];this._columnsDiffer=this._differs.find(t).create(),this._columnsDiffer.diff(t)}}getColumnsDiff(){return this._columnsDiffer.diff(this.columns)}extractCellTemplate(e){return this instanceof te?e.headerCell.template:this instanceof et?e.footerCell.template:e.cell.template}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,features:[V]})}return n})(),te=(()=>{class n extends fe{_table=a(S,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;constructor(){super(a(w),a(H))}ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,selectors:[["","cdkHeaderRowDef",""]],inputs:{columns:[0,"cdkHeaderRowDef","columns"],sticky:[2,"cdkHeaderRowDefSticky","sticky",O]},features:[L,N,V]})}return n})(),et=(()=>{class n extends fe{_table=a(S,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;constructor(){super(a(w),a(H))}ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,selectors:[["","cdkFooterRowDef",""]],inputs:{columns:[0,"cdkFooterRowDef","columns"],sticky:[2,"cdkFooterRowDefSticky","sticky",O]},features:[L,N,V]})}return n})(),_e=(()=>{class n extends fe{_table=a(S,{optional:!0});when;constructor(){super(a(w),a(H))}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,selectors:[["","cdkRowDef",""]],inputs:{columns:[0,"cdkRowDefColumns","columns"],when:[0,"cdkRowDefWhen","when"]},features:[N]})}return n})(),ee=(()=>{class n{_viewContainer=a(M);cells;context;static mostRecentCellOutlet=null;constructor(){n.mostRecentCellOutlet=this}ngOnDestroy(){n.mostRecentCellOutlet===this&&(n.mostRecentCellOutlet=null)}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,selectors:[["","cdkCellOutlet",""]]})}return n})(),tt=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=E({type:n,selectors:[["cdk-header-row"],["tr","cdk-header-row",""]],hostAttrs:["role","row",1,"cdk-header-row"],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,o){t&1&&T(0,0)},dependencies:[ee],encapsulation:2})}return n})();var nt=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=E({type:n,selectors:[["cdk-row"],["tr","cdk-row",""]],hostAttrs:["role","row",1,"cdk-row"],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,o){t&1&&T(0,0)},dependencies:[ee],encapsulation:2})}return n})(),_t=(()=>{class n{templateRef=a(w);_contentClassName="cdk-no-data-row";constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,selectors:[["ng-template","cdkNoDataRow",""]]})}return n})(),Ze=["top","bottom","left","right"],de=class{_isNativeHtmlTable;_stickCellCss;direction;_coalescedStyleScheduler;_isBrowser;_needsPositionStickyOnElement;_positionListener;_tableInjector;_elemSizeCache=new WeakMap;_resizeObserver=globalThis?.ResizeObserver?new globalThis.ResizeObserver(i=>this._updateCachedSizes(i)):null;_updatedStickyColumnsParamsToReplay=[];_stickyColumnsReplayTimeout=null;_cachedCellWidths=[];_borderCellCss;_destroyed=!1;constructor(i,e,t,o,s=!0,r=!0,l,c){this._isNativeHtmlTable=i,this._stickCellCss=e,this.direction=t,this._coalescedStyleScheduler=o,this._isBrowser=s,this._needsPositionStickyOnElement=r,this._positionListener=l,this._tableInjector=c,this._borderCellCss={top:`${e}-border-elem-top`,bottom:`${e}-border-elem-bottom`,left:`${e}-border-elem-left`,right:`${e}-border-elem-right`}}clearStickyPositioning(i,e){(e.includes("left")||e.includes("right"))&&this._removeFromStickyColumnReplayQueue(i);let t=[];for(let o of i)o.nodeType===o.ELEMENT_NODE&&t.push(o,...Array.from(o.children));this._afterNextRender({write:()=>{for(let o of t)this._removeStickyStyle(o,e)}})}updateStickyColumns(i,e,t,o=!0,s=!0){if(s&&this._updateStickyColumnReplayQueue({rows:[...i],stickyStartStates:[...e],stickyEndStates:[...t]}),!i.length||!this._isBrowser||!(e.some(p=>p)||t.some(p=>p))){this._positionListener&&(this._positionListener.stickyColumnsUpdated({sizes:[]}),this._positionListener.stickyEndColumnsUpdated({sizes:[]}));return}let r=i[0],l=r.children.length,c=this.direction==="rtl",u=c?"right":"left",f=c?"left":"right",m=e.lastIndexOf(!0),y=t.indexOf(!0),x,ye,pe;this._afterNextRender({earlyRead:()=>{x=this._getCellWidths(r,o),ye=this._getStickyStartColumnPositions(x,e),pe=this._getStickyEndColumnPositions(x,t)},write:()=>{for(let p of i)for(let h=0;h<l;h++){let we=p.children[h];e[h]&&this._addStickyStyle(we,u,ye[h],h===m),t[h]&&this._addStickyStyle(we,f,pe[h],h===y)}this._positionListener&&(this._positionListener.stickyColumnsUpdated({sizes:m===-1?[]:x.slice(0,m+1).map((p,h)=>e[h]?p:null)}),this._positionListener.stickyEndColumnsUpdated({sizes:y===-1?[]:x.slice(y).map((p,h)=>t[h+y]?p:null).reverse()}))}})}stickRows(i,e,t){if(!this._isBrowser)return;let o=t==="bottom"?i.slice().reverse():i,s=t==="bottom"?e.slice().reverse():e,r=[],l=[],c=[];this._afterNextRender({earlyRead:()=>{for(let u=0,f=0;u<o.length;u++){if(!s[u])continue;r[u]=f;let m=o[u];c[u]=this._isNativeHtmlTable?Array.from(m.children):[m];let y=this._retrieveElementSize(m).height;f+=y,l[u]=y}},write:()=>{let u=s.lastIndexOf(!0);for(let f=0;f<o.length;f++){if(!s[f])continue;let m=r[f],y=f===u;for(let x of c[f])this._addStickyStyle(x,t,m,y)}t==="top"?this._positionListener?.stickyHeaderRowsUpdated({sizes:l,offsets:r,elements:c}):this._positionListener?.stickyFooterRowsUpdated({sizes:l,offsets:r,elements:c})}})}updateStickyFooterContainer(i,e){this._isNativeHtmlTable&&this._afterNextRender({write:()=>{let t=i.querySelector("tfoot");t&&(e.some(o=>!o)?this._removeStickyStyle(t,["bottom"]):this._addStickyStyle(t,"bottom",0,!1))}})}destroy(){this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._destroyed=!0}_removeStickyStyle(i,e){for(let o of e)i.style[o]="",i.classList.remove(this._borderCellCss[o]);Ze.some(o=>e.indexOf(o)===-1&&i.style[o])?i.style.zIndex=this._getCalculatedZIndex(i):(i.style.zIndex="",this._needsPositionStickyOnElement&&(i.style.position=""),i.classList.remove(this._stickCellCss))}_addStickyStyle(i,e,t,o){i.classList.add(this._stickCellCss),o&&i.classList.add(this._borderCellCss[e]),i.style[e]=`${t}px`,i.style.zIndex=this._getCalculatedZIndex(i),this._needsPositionStickyOnElement&&(i.style.cssText+="position: -webkit-sticky; position: sticky; ")}_getCalculatedZIndex(i){let e={top:100,bottom:10,left:1,right:1},t=0;for(let o of Ze)i.style[o]&&(t+=e[o]);return t?`${t}`:""}_getCellWidths(i,e=!0){if(!e&&this._cachedCellWidths.length)return this._cachedCellWidths;let t=[],o=i.children;for(let s=0;s<o.length;s++){let r=o[s];t.push(this._retrieveElementSize(r).width)}return this._cachedCellWidths=t,t}_getStickyStartColumnPositions(i,e){let t=[],o=0;for(let s=0;s<i.length;s++)e[s]&&(t[s]=o,o+=i[s]);return t}_getStickyEndColumnPositions(i,e){let t=[],o=0;for(let s=i.length;s>0;s--)e[s]&&(t[s]=o,o+=i[s]);return t}_retrieveElementSize(i){let e=this._elemSizeCache.get(i);if(e)return e;let t=i.getBoundingClientRect(),o={width:t.width,height:t.height};return this._resizeObserver&&(this._elemSizeCache.set(i,o),this._resizeObserver.observe(i,{box:"border-box"})),o}_updateStickyColumnReplayQueue(i){this._removeFromStickyColumnReplayQueue(i.rows),!this._stickyColumnsReplayTimeout&&this._updatedStickyColumnsParamsToReplay.push(i)}_removeFromStickyColumnReplayQueue(i){let e=new Set(i);for(let t of this._updatedStickyColumnsParamsToReplay)t.rows=t.rows.filter(o=>!e.has(o));this._updatedStickyColumnsParamsToReplay=this._updatedStickyColumnsParamsToReplay.filter(t=>!!t.rows.length)}_updateCachedSizes(i){let e=!1;for(let t of i){let o=t.borderBoxSize?.length?{width:t.borderBoxSize[0].inlineSize,height:t.borderBoxSize[0].blockSize}:{width:t.contentRect.width,height:t.contentRect.height};o.width!==this._elemSizeCache.get(t.target)?.width&&mt(t.target)&&(e=!0),this._elemSizeCache.set(t.target,o)}e&&this._updatedStickyColumnsParamsToReplay.length&&(this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._stickyColumnsReplayTimeout=setTimeout(()=>{if(!this._destroyed){for(let t of this._updatedStickyColumnsParamsToReplay)this.updateStickyColumns(t.rows,t.stickyStartStates,t.stickyEndStates,!0,!1);this._updatedStickyColumnsParamsToReplay=[],this._stickyColumnsReplayTimeout=null}},0))}_afterNextRender(i){this._tableInjector?xe(i,{injector:this._tableInjector}):this._coalescedStyleScheduler.schedule(()=>{i.earlyRead?.(),i.write()})}};function mt(n){return["cdk-cell","cdk-header-cell","cdk-footer-cell"].some(i=>n.classList.contains(i))}var Ye=new U("CDK_SPL");var yt=(()=>{class n{viewContainer=a(M);elementRef=a(v);constructor(){let e=a(S);e._rowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,selectors:[["","rowOutlet",""]]})}return n})(),pt=(()=>{class n{viewContainer=a(M);elementRef=a(v);constructor(){let e=a(S);e._headerRowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,selectors:[["","headerRowOutlet",""]]})}return n})(),wt=(()=>{class n{viewContainer=a(M);elementRef=a(v);constructor(){let e=a(S);e._footerRowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,selectors:[["","footerRowOutlet",""]]})}return n})(),Ct=(()=>{class n{viewContainer=a(M);elementRef=a(v);constructor(){let e=a(S);e._noDataRowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||n)};static \u0275dir=d({type:n,selectors:[["","noDataRowOutlet",""]]})}return n})();var ot=(()=>{class n{_differs=a(H);_changeDetectorRef=a(q);_elementRef=a(v);_dir=a(Ue,{optional:!0});_platform=a(Qe);_viewRepeater=a(ce);_coalescedStyleScheduler=a(qe);_viewportRuler=a(Ke);_stickyPositioningListener=a(Ye,{optional:!0,skipSelf:!0});_document=a(Le);_data;_onDestroy=new Ce;_renderRows;_renderChangeSubscription;_columnDefsByName=new Map;_rowDefs;_headerRowDefs;_footerRowDefs;_dataDiffer;_defaultRowDef;_customColumnDefs=new Set;_customRowDefs=new Set;_customHeaderRowDefs=new Set;_customFooterRowDefs=new Set;_customNoDataRow;_headerRowDefChanged=!0;_footerRowDefChanged=!0;_stickyColumnStylesNeedReset=!0;_forceRecalculateCellWidths=!0;_cachedRenderRowsMap=new Map;_isNativeHtmlTable;_stickyStyler;stickyCssClass="cdk-table-sticky";needsPositionStickyOnElement=!0;_isServer;_isShowingNoDataRow=!1;_hasAllOutlets=!1;_hasInitialized=!1;_getCellRole(){if(this._cellRoleInternal===void 0){let e=this._elementRef.nativeElement.getAttribute("role");return e==="grid"||e==="treegrid"?"gridcell":"cell"}return this._cellRoleInternal}_cellRoleInternal=void 0;get trackBy(){return this._trackByFn}set trackBy(e){this._trackByFn=e}_trackByFn;get dataSource(){return this._dataSource}set dataSource(e){this._dataSource!==e&&this._switchDataSource(e)}_dataSource;get multiTemplateDataRows(){return this._multiTemplateDataRows}set multiTemplateDataRows(e){this._multiTemplateDataRows=e,this._rowOutlet&&this._rowOutlet.viewContainer.length&&(this._forceRenderDataRows(),this.updateStickyColumnStyles())}_multiTemplateDataRows=!1;get fixedLayout(){return this._fixedLayout}set fixedLayout(e){this._fixedLayout=e,this._forceRecalculateCellWidths=!0,this._stickyColumnStylesNeedReset=!0}_fixedLayout=!1;contentChanged=new $;viewChange=new B({start:0,end:Number.MAX_VALUE});_rowOutlet;_headerRowOutlet;_footerRowOutlet;_noDataRowOutlet;_contentColumnDefs;_contentRowDefs;_contentHeaderRowDefs;_contentFooterRowDefs;_noDataRow;_injector=a(Se);constructor(){a(new ve("role"),{optional:!0})||this._elementRef.nativeElement.setAttribute("role","table"),this._isServer=!this._platform.isBrowser,this._isNativeHtmlTable=this._elementRef.nativeElement.nodeName==="TABLE"}ngOnInit(){this._setupStickyStyler(),this._dataDiffer=this._differs.find([]).create((e,t)=>this.trackBy?this.trackBy(t.dataIndex,t.data):t),this._viewportRuler.change().pipe(j(this._onDestroy)).subscribe(()=>{this._forceRecalculateCellWidths=!0})}ngAfterContentInit(){this._hasInitialized=!0}ngAfterContentChecked(){this._canRender()&&this._render()}ngOnDestroy(){this._stickyStyler?.destroy(),[this._rowOutlet?.viewContainer,this._headerRowOutlet?.viewContainer,this._footerRowOutlet?.viewContainer,this._cachedRenderRowsMap,this._customColumnDefs,this._customRowDefs,this._customHeaderRowDefs,this._customFooterRowDefs,this._columnDefsByName].forEach(e=>{e?.clear()}),this._headerRowDefs=[],this._footerRowDefs=[],this._defaultRowDef=null,this._onDestroy.next(),this._onDestroy.complete(),Z(this.dataSource)&&this.dataSource.disconnect(this)}renderRows(){this._renderRows=this._getAllRenderRows();let e=this._dataDiffer.diff(this._renderRows);if(!e){this._updateNoDataRow(),this.contentChanged.next();return}let t=this._rowOutlet.viewContainer;this._viewRepeater.applyChanges(e,t,(o,s,r)=>this._getEmbeddedViewArgs(o.item,r),o=>o.item.data,o=>{o.operation===$e.INSERTED&&o.context&&this._renderCellTemplateForItem(o.record.item.rowDef,o.context)}),this._updateRowIndexContext(),e.forEachIdentityChange(o=>{let s=t.get(o.currentIndex);s.context.$implicit=o.item.data}),this._updateNoDataRow(),this.contentChanged.next(),this.updateStickyColumnStyles()}addColumnDef(e){this._customColumnDefs.add(e)}removeColumnDef(e){this._customColumnDefs.delete(e)}addRowDef(e){this._customRowDefs.add(e)}removeRowDef(e){this._customRowDefs.delete(e)}addHeaderRowDef(e){this._customHeaderRowDefs.add(e),this._headerRowDefChanged=!0}removeHeaderRowDef(e){this._customHeaderRowDefs.delete(e),this._headerRowDefChanged=!0}addFooterRowDef(e){this._customFooterRowDefs.add(e),this._footerRowDefChanged=!0}removeFooterRowDef(e){this._customFooterRowDefs.delete(e),this._footerRowDefChanged=!0}setNoDataRow(e){this._customNoDataRow=e}updateStickyHeaderRowStyles(){let e=this._getRenderedRows(this._headerRowOutlet);if(this._isNativeHtmlTable){let o=Xe(this._headerRowOutlet,"thead");o&&(o.style.display=e.length?"":"none")}let t=this._headerRowDefs.map(o=>o.sticky);this._stickyStyler.clearStickyPositioning(e,["top"]),this._stickyStyler.stickRows(e,t,"top"),this._headerRowDefs.forEach(o=>o.resetStickyChanged())}updateStickyFooterRowStyles(){let e=this._getRenderedRows(this._footerRowOutlet);if(this._isNativeHtmlTable){let o=Xe(this._footerRowOutlet,"tfoot");o&&(o.style.display=e.length?"":"none")}let t=this._footerRowDefs.map(o=>o.sticky);this._stickyStyler.clearStickyPositioning(e,["bottom"]),this._stickyStyler.stickRows(e,t,"bottom"),this._stickyStyler.updateStickyFooterContainer(this._elementRef.nativeElement,t),this._footerRowDefs.forEach(o=>o.resetStickyChanged())}updateStickyColumnStyles(){let e=this._getRenderedRows(this._headerRowOutlet),t=this._getRenderedRows(this._rowOutlet),o=this._getRenderedRows(this._footerRowOutlet);(this._isNativeHtmlTable&&!this._fixedLayout||this._stickyColumnStylesNeedReset)&&(this._stickyStyler.clearStickyPositioning([...e,...t,...o],["left","right"]),this._stickyColumnStylesNeedReset=!1),e.forEach((s,r)=>{this._addStickyColumnStyles([s],this._headerRowDefs[r])}),this._rowDefs.forEach(s=>{let r=[];for(let l=0;l<t.length;l++)this._renderRows[l].rowDef===s&&r.push(t[l]);this._addStickyColumnStyles(r,s)}),o.forEach((s,r)=>{this._addStickyColumnStyles([s],this._footerRowDefs[r])}),Array.from(this._columnDefsByName.values()).forEach(s=>s.resetStickyChanged())}_outletAssigned(){!this._hasAllOutlets&&this._rowOutlet&&this._headerRowOutlet&&this._footerRowOutlet&&this._noDataRowOutlet&&(this._hasAllOutlets=!0,this._canRender()&&this._render())}_canRender(){return this._hasAllOutlets&&this._hasInitialized}_render(){this._cacheRowDefs(),this._cacheColumnDefs(),!this._headerRowDefs.length&&!this._footerRowDefs.length&&this._rowDefs.length;let t=this._renderUpdatedColumns()||this._headerRowDefChanged||this._footerRowDefChanged;this._stickyColumnStylesNeedReset=this._stickyColumnStylesNeedReset||t,this._forceRecalculateCellWidths=t,this._headerRowDefChanged&&(this._forceRenderHeaderRows(),this._headerRowDefChanged=!1),this._footerRowDefChanged&&(this._forceRenderFooterRows(),this._footerRowDefChanged=!1),this.dataSource&&this._rowDefs.length>0&&!this._renderChangeSubscription?this._observeRenderChanges():this._stickyColumnStylesNeedReset&&this.updateStickyColumnStyles(),this._checkStickyStates()}_getAllRenderRows(){let e=[],t=this._cachedRenderRowsMap;this._cachedRenderRowsMap=new Map;for(let o=0;o<this._data.length;o++){let s=this._data[o],r=this._getRenderRowsForData(s,o,t.get(s));this._cachedRenderRowsMap.has(s)||this._cachedRenderRowsMap.set(s,new WeakMap);for(let l=0;l<r.length;l++){let c=r[l],u=this._cachedRenderRowsMap.get(c.data);u.has(c.rowDef)?u.get(c.rowDef).push(c):u.set(c.rowDef,[c]),e.push(c)}}return e}_getRenderRowsForData(e,t,o){return this._getRowDefs(e,t).map(r=>{let l=o&&o.has(r)?o.get(r):[];if(l.length){let c=l.shift();return c.dataIndex=t,c}else return{data:e,rowDef:r,dataIndex:t}})}_cacheColumnDefs(){this._columnDefsByName.clear(),X(this._getOwnDefs(this._contentColumnDefs),this._customColumnDefs).forEach(t=>{this._columnDefsByName.has(t.name),this._columnDefsByName.set(t.name,t)})}_cacheRowDefs(){this._headerRowDefs=X(this._getOwnDefs(this._contentHeaderRowDefs),this._customHeaderRowDefs),this._footerRowDefs=X(this._getOwnDefs(this._contentFooterRowDefs),this._customFooterRowDefs),this._rowDefs=X(this._getOwnDefs(this._contentRowDefs),this._customRowDefs);let e=this._rowDefs.filter(t=>!t.when);!this.multiTemplateDataRows&&e.length>1,this._defaultRowDef=e[0]}_renderUpdatedColumns(){let e=(r,l)=>{let c=!!l.getColumnsDiff();return r||c},t=this._rowDefs.reduce(e,!1);t&&this._forceRenderDataRows();let o=this._headerRowDefs.reduce(e,!1);o&&this._forceRenderHeaderRows();let s=this._footerRowDefs.reduce(e,!1);return s&&this._forceRenderFooterRows(),t||o||s}_switchDataSource(e){this._data=[],Z(this.dataSource)&&this.dataSource.disconnect(this),this._renderChangeSubscription&&(this._renderChangeSubscription.unsubscribe(),this._renderChangeSubscription=null),e||(this._dataDiffer&&this._dataDiffer.diff([]),this._rowOutlet&&this._rowOutlet.viewContainer.clear()),this._dataSource=e}_observeRenderChanges(){if(!this.dataSource)return;let e;Z(this.dataSource)?e=this.dataSource.connect(this):ge(this.dataSource)?e=this.dataSource:Array.isArray(this.dataSource)&&(e=ne(this.dataSource)),this._renderChangeSubscription=e.pipe(j(this._onDestroy)).subscribe(t=>{this._data=t||[],this.renderRows()})}_forceRenderHeaderRows(){this._headerRowOutlet.viewContainer.length>0&&this._headerRowOutlet.viewContainer.clear(),this._headerRowDefs.forEach((e,t)=>this._renderRow(this._headerRowOutlet,e,t)),this.updateStickyHeaderRowStyles()}_forceRenderFooterRows(){this._footerRowOutlet.viewContainer.length>0&&this._footerRowOutlet.viewContainer.clear(),this._footerRowDefs.forEach((e,t)=>this._renderRow(this._footerRowOutlet,e,t)),this.updateStickyFooterRowStyles()}_addStickyColumnStyles(e,t){let o=Array.from(t?.columns||[]).map(l=>{let c=this._columnDefsByName.get(l);return c}),s=o.map(l=>l.sticky),r=o.map(l=>l.stickyEnd);this._stickyStyler.updateStickyColumns(e,s,r,!this._fixedLayout||this._forceRecalculateCellWidths)}_getRenderedRows(e){let t=[];for(let o=0;o<e.viewContainer.length;o++){let s=e.viewContainer.get(o);t.push(s.rootNodes[0])}return t}_getRowDefs(e,t){if(this._rowDefs.length==1)return[this._rowDefs[0]];let o=[];if(this.multiTemplateDataRows)o=this._rowDefs.filter(s=>!s.when||s.when(t,e));else{let s=this._rowDefs.find(r=>r.when&&r.when(t,e))||this._defaultRowDef;s&&o.push(s)}return o.length,o}_getEmbeddedViewArgs(e,t){let o=e.rowDef,s={$implicit:e.data};return{templateRef:o.template,context:s,index:t}}_renderRow(e,t,o,s={}){let r=e.viewContainer.createEmbeddedView(t.template,s,o);return this._renderCellTemplateForItem(t,s),r}_renderCellTemplateForItem(e,t){for(let o of this._getCellTemplates(e))ee.mostRecentCellOutlet&&ee.mostRecentCellOutlet._viewContainer.createEmbeddedView(o,t);this._changeDetectorRef.markForCheck()}_updateRowIndexContext(){let e=this._rowOutlet.viewContainer;for(let t=0,o=e.length;t<o;t++){let r=e.get(t).context;r.count=o,r.first=t===0,r.last=t===o-1,r.even=t%2===0,r.odd=!r.even,this.multiTemplateDataRows?(r.dataIndex=this._renderRows[t].dataIndex,r.renderIndex=t):r.index=this._renderRows[t].dataIndex}}_getCellTemplates(e){return!e||!e.columns?[]:Array.from(e.columns,t=>{let o=this._columnDefsByName.get(t);return e.extractCellTemplate(o)})}_forceRenderDataRows(){this._dataDiffer.diff([]),this._rowOutlet.viewContainer.clear(),this.renderRows()}_checkStickyStates(){let e=(t,o)=>t||o.hasStickyChanged();this._headerRowDefs.reduce(e,!1)&&this.updateStickyHeaderRowStyles(),this._footerRowDefs.reduce(e,!1)&&this.updateStickyFooterRowStyles(),Array.from(this._columnDefsByName.values()).reduce(e,!1)&&(this._stickyColumnStylesNeedReset=!0,this.updateStickyColumnStyles())}_setupStickyStyler(){let e=this._dir?this._dir.value:"ltr";this._stickyStyler=new de(this._isNativeHtmlTable,this.stickyCssClass,e,this._coalescedStyleScheduler,this._platform.isBrowser,this.needsPositionStickyOnElement,this._stickyPositioningListener,this._injector),(this._dir?this._dir.change:ne()).pipe(j(this._onDestroy)).subscribe(t=>{this._stickyStyler.direction=t,this.updateStickyColumnStyles()})}_getOwnDefs(e){return e.filter(t=>!t._table||t._table===this)}_updateNoDataRow(){let e=this._customNoDataRow||this._noDataRow;if(!e)return;let t=this._rowOutlet.viewContainer.length===0;if(t===this._isShowingNoDataRow)return;let o=this._noDataRowOutlet.viewContainer;if(t){let s=o.createEmbeddedView(e.templateRef),r=s.rootNodes[0];s.rootNodes.length===1&&r?.nodeType===this._document.ELEMENT_NODE&&(r.setAttribute("role","row"),r.classList.add(e._contentClassName))}else o.clear();this._isShowingNoDataRow=t,this._changeDetectorRef.markForCheck()}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=E({type:n,selectors:[["cdk-table"],["table","cdk-table",""]],contentQueries:function(t,o,s){if(t&1&&(R(s,_t,5),R(s,z,5),R(s,_e,5),R(s,te,5),R(s,et,5)),t&2){let r;D(r=k())&&(o._noDataRow=r.first),D(r=k())&&(o._contentColumnDefs=r),D(r=k())&&(o._contentRowDefs=r),D(r=k())&&(o._contentHeaderRowDefs=r),D(r=k())&&(o._contentFooterRowDefs=r)}},hostAttrs:[1,"cdk-table"],hostVars:2,hostBindings:function(t,o){t&2&&Me("cdk-table-fixed-layout",o.fixedLayout)},inputs:{trackBy:"trackBy",dataSource:"dataSource",multiTemplateDataRows:[2,"multiTemplateDataRows","multiTemplateDataRows",O],fixedLayout:[2,"fixedLayout","fixedLayout",O]},outputs:{contentChanged:"contentChanged"},exportAs:["cdkTable"],features:[ae([{provide:S,useExisting:n},{provide:ce,useClass:We},{provide:qe,useClass:ft},{provide:Ye,useValue:null}]),L],ngContentSelectors:lt,decls:5,vars:2,consts:[["role","rowgroup"],["headerRowOutlet",""],["rowOutlet",""],["noDataRowOutlet",""],["footerRowOutlet",""]],template:function(t,o){t&1&&(K(at),A(0),A(1,1),F(2,ct,1,0)(3,dt,7,0)(4,ut,4,0)),t&2&&(_(2),P(o._isServer?2:-1),_(),P(o._isNativeHtmlTable?3:4))},dependencies:[pt,yt,Ct,wt],styles:[".cdk-table-fixed-layout{table-layout:fixed}"],encapsulation:2})}return n})();function X(n,i){return n.concat(Array.from(i))}function Xe(n,i){let e=i.toUpperCase(),t=n.viewContainer.element.nativeElement;for(;t;){let o=t.nodeType===1?t.nodeName:null;if(o===e)return t;if(o==="TABLE")break;t=t.parentNode}return null}var it=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=W({type:n});static \u0275inj=Q({imports:[Y]})}return n})();var gt=["*"],st=(n,i)=>[n,i];function Rt(n,i){if(n&1&&(C(0,"cdk-header-cell",9)(1,"div",10)(2,"span",11),re(3),g()()()),n&2){let e,t=b().$implicit,o=b(2);I("ngClass",le(3,st,(e=t.headerCellClass)!==null&&e!==void 0?e:"",o.isNumeric(t)?"nx-table__header-cell--number":""))("ngStyle",t.headerCellStyle||null),_(3),He(t.title)}}function Dt(n,i){if(n&1&&oe(0,"cdk-cell",12),n&2){let e,t,o=i.$implicit,s=b().$implicit,r=b(2);I("ngClass",le(3,st,(e=s.cellClass)!==null&&e!==void 0?e:"",r.isNumeric(s)?"nx-table__cell--number":""))("ngStyle",(t=s.cellStyle)!==null&&t!==void 0?t:null)("innerHTML",o[s.key],Te)}}function kt(n,i){if(n&1&&(ie(0,4),F(1,Rt,4,6,"cdk-header-cell",7)(2,Dt,1,6,"cdk-cell",8),se()),n&2){let e=i.$implicit;Ae("cdkColumnDef",e.key)}}function St(n,i){n&1&&oe(0,"cdk-header-row",13)}function vt(n,i){if(n&1){let e=Ie();C(0,"cdk-row",14),Pe("dblclick",function(){let o=De(e).$implicit,s=b(2);return ke(s.handleRowClick(o))}),g()}}function bt(n,i){if(n&1&&(C(0,"div",0)(1,"div",2)(2,"cdk-table",3),Ne(3,kt,3,1,"ng-container",4,Ee),F(5,St,1,0,"cdk-header-row",5)(6,vt,1,0,"cdk-row",6),g()()()),n&2){let e=b();_(2),I("dataSource",e.dataSource),_(),Fe(e.displayedColumns),_(2),I("cdkHeaderRowDef",e.columnKeys),_(),I("cdkRowDefColumns",e.columnKeys)}}function xt(n,i){n&1&&(C(0,"div",1),A(1),g())}var me=class extends Ve{constructor(i){super(),this._datachange=i}connect(){return this._datachange}disconnect(){}},Tt=(()=>{class n{set data(e){if(this._data=e.filter(t=>t),!this._displayedColumns){let t=[],o=[];this._data.forEach(s=>{for(let r in s)t.includes(r)||(t.push(r),o.push({title:r,key:r,type:"string"}))}),this._columnKeys=t,this._displayedColumns=o,this._cdr.markForCheck()}this._dataChange.next(this._data)}get data(){return this._data}set displayedColumns(e){this._displayedColumns=e,this._columnKeys=e?e.map(t=>t.key):[],this._cdr.markForCheck()}get displayedColumns(){return this._displayedColumns}get dataSource(){return this._dataSource}get columnKeys(){return this._columnKeys}constructor(e){this._cdr=e,this._dataChange=new B([]),this._columnKeys=[],this._data=[],this.rowClick=new $}ngOnInit(){this._data||(this._data=[],this._dataChange.next(this._data)),this._dataSource=new me(this._dataChange)}handleRowClick(e){this.rowClick.emit(e)}isNumeric(e){return e.type==="numeric"}static{this.\u0275fac=function(t){return new(t||n)(Oe(q))}}static{this.\u0275cmp=E({type:n,selectors:[["nx-dynamic-table"]],inputs:{data:"data",displayedColumns:"displayedColumns"},outputs:{rowClick:"rowClick"},ngContentSelectors:gt,decls:2,vars:2,consts:[[1,"nx-table__container"],[1,"nx-table__appendix"],[1,"nx-table__scroll"],[1,"nx-table",3,"dataSource"],[3,"cdkColumnDef"],["class","nx-table__header-row",4,"cdkHeaderRowDef"],["class","nx-table__row",3,"dblclick",4,"cdkRowDef","cdkRowDefColumns"],["class","nx-table__header-cell",3,"ngClass","ngStyle",4,"cdkHeaderCellDef"],["class","nx-table__cell",3,"ngClass","ngStyle","innerHTML",4,"cdkCellDef"],[1,"nx-table__header-cell",3,"ngClass","ngStyle"],[1,"nx-table__header-title--block"],[1,"nx-table__header-title"],[1,"nx-table__cell",3,"ngClass","ngStyle","innerHTML"],[1,"nx-table__header-row"],[1,"nx-table__row",3,"dblclick"]],template:function(t,o){t&1&&(K(),F(0,bt,7,3,"div",0)(1,xt,2,0,"div",1)),t&2&&(P(o.data&&o.data.length>0?0:-1),_(),P(o.data.length===0?1:-1))},dependencies:[ot,z,he,Ge,ze,Be,ue,Je,te,tt,_e,nt],styles:[".nx-table[_ngcontent-%COMP%]{font-size:var(--table-cell-font-size);line-height:var(--table-cell-line-height);font-weight:var(--table-cell-font-weight);letter-spacing:var(--table-cell-letter-spacing);color:var(--table-cell-color);text-align:left;width:100%;display:table}[dir=rtl][_nghost-%COMP%]   .nx-table[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-table[_ngcontent-%COMP%]{text-align:right}.nx-table__scroll[_ngcontent-%COMP%]{max-width:100%;overflow:hidden;overflow-x:auto}.nx-table__header-cell[_ngcontent-%COMP%]{font-size:var(--table-header-cell-font-size);line-height:var(--table-header-cell-line-height);font-weight:var(--table-header-cell-font-weight);letter-spacing:var(--table-header-cell-letter-spacing);color:var(--table-header-cell-color);background:var(--table-header-cell-background-color);border-top:1px solid var(--table-cell-border-top-color);border-bottom:2px solid var(--table-header-border-bottom-color);padding:23px 16px 22px;position:relative}.nx-table__header-cell--number[_ngcontent-%COMP%]{display:flex;position:relative}.nx-table__header-cell--number[_ngcontent-%COMP%]   .nx-table__header-title--block[_ngcontent-%COMP%]{justify-content:flex-end}.nx-table__cell--number[_ngcontent-%COMP%], .nx-table__header-cell--number[_ngcontent-%COMP%]{text-align:right}[dir=rtl][_nghost-%COMP%]   .nx-table__cell--number[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-table__cell--number[_ngcontent-%COMP%], [dir=rtl][_nghost-%COMP%]   .nx-table__header-cell--number[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-table__header-cell--number[_ngcontent-%COMP%]{text-align:left}.nx-table__header-row[_ngcontent-%COMP%], .nx-table__row[_ngcontent-%COMP%]{display:table-row;vertical-align:inherit;background-color:transparent}.nx-table__row[_ngcontent-%COMP%]{background:var(--table-row-background-color)}.nx-table__cell[_ngcontent-%COMP%]{border-bottom:1px solid var(--table-header-border-top-color);padding:24px 16px 23px;vertical-align:top}.nx-table__row[_ngcontent-%COMP%]:last-child   .nx-table__cell[_ngcontent-%COMP%]{padding-bottom:22px;border-bottom:2px solid var(--table-header-border-bottom-color)}.nx-table__header-cell[_ngcontent-%COMP%], .nx-table__cell[_ngcontent-%COMP%]{display:table-cell;vertical-align:inherit}"],changeDetection:0})}}return n})(),hn=(()=>{class n{static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275mod=W({type:n})}static{this.\u0275inj=Q({imports:[je,it,Y,Tt]})}}return n})();export{Tt as a,hn as b};
