import{a as U}from"./chunk-K3MRPJ7U.js";import{c as G,e as X}from"./chunk-AGQ4ALMF.js";import{w as Q}from"./chunk-LK5X6SR6.js";import{B as $,l as j,n as R,o as z}from"./chunk-UUZACKYZ.js";import{Aa as x,Ac as A,Db as _,Eb as s,Gb as u,Kb as k,Lb as g,Mb as p,Nb as h,Rb as f,Yb as m,_b as l,ea as N,fc as P,gc as O,hc as C,la as T,ma as I,n as w,qa as S,tb as o,ua as E,ub as M,va as V,wb as D,xc as L,yb as y,yc as F,za as d}from"./chunk-QYP2T7PT.js";var B=["link"];function H(a,r){if(a&1){let t=f();g(0,"button",19,7),m("click",function(){d(t);let i=l().$implicit,e=l(2);return x(e.onPage(i.value))}),P(2),p()}if(a&2){let t=l().$implicit,n=l(2);s("ngClass",n.getPaginationNumberClasses(t)),_("aria-current",t.value===n.page?"page":""),o(2),C(" ",t.label," ")}}function J(a,r){if(a&1&&(g(0,"span"),P(1),p()),a&2){let t=l().$implicit;o(1),C(" ",t.label," ")}}function K(a,r){if(a&1&&(g(0,"li",16),k(1,H,3,3,"button",17)(2,J,2,1,"span",18),p()),a&2){let t=r.$implicit,n=l(2);s("ngClass",n.getPaginationItemClasses(t)),o(1),s("ngIf",t.label!=="..."),o(1),s("ngIf",t.label==="...")}}function W(a,r){if(a&1){let t=f();g(0,"li",20)(1,"button",19,7),m("click",function(){let e=d(t).$implicit,c=l(2);return x(c.onPage(e.value))}),P(3),p()()}if(a&2){let t=r.$implicit,n=l(2);s("ngClass",n.getPaginationItemClasses(t)),o(1),s("ngClass",n.getPaginationNumberClasses(t)),_("aria-current",t.value===n.page?"page":""),o(2),C(" ",t.label," ")}}function Y(a,r){if(a&1){let t=f();g(0,"nav",3)(1,"ul",4)(2,"li",5)(3,"button",6,7),m("click",function(){d(t);let i=l();return x(i.onFirst())}),h(5,"nx-icon",8),p()(),g(6,"li",9)(7,"button",10,7),m("click",function(){d(t);let i=l();return x(i.onPrev())}),h(9,"nx-icon",8),p()(),k(10,K,3,3,"li",11)(11,W,4,4,"li",12),g(12,"li",13)(13,"button",14,7),m("click",function(){d(t);let i=l();return x(i.onNext())}),h(15,"nx-icon",8),p()(),g(16,"li",5)(17,"button",15,7),m("click",function(){d(t);let i=l();return x(i.onLast())}),h(19,"nx-icon",8),p()()()()}if(a&2){let t=l();_("aria-label",t.ariaLabel),o(3),u("is-disabled",t._isPaginationPreviousDisabled()),s("disabled",t._isPaginationPreviousDisabled()),_("aria-label",t.paginationTexts.first),o(2),s("name",t._isRTL?"arrow-last":"arrow-first"),o(2),u("is-disabled",t._isPaginationPreviousDisabled()),s("disabled",t._isPaginationPreviousDisabled()),_("aria-label",t.paginationTexts.previous),o(2),s("name",t._isRTL?"arrow-right":"arrow-left"),o(1),s("ngForOf",t.getPages()),o(1),s("ngForOf",t.getMobilePages()),o(2),u("is-disabled",t._isPaginationNextDisabled()),s("disabled",t._isPaginationNextDisabled()),_("aria-label",t.paginationTexts.next),o(2),s("name",t._isRTL?"arrow-left":"arrow-right"),o(2),u("is-disabled",t._isPaginationNextDisabled()),s("disabled",t._isPaginationNextDisabled()),_("aria-label",t.paginationTexts.last),o(2),s("name",t._isRTL?"arrow-first":"arrow-last")}}function Z(a,r){if(a&1){let t=f();g(0,"nav",21)(1,"button",22,7),m("click",function(){d(t);let i=l();return x(i.onPrev())}),h(3,"nx-icon",8),g(4,"span",23),P(5),p()(),g(6,"div",24)(7,"span",25),P(8),p(),g(9,"span",26),P(10),p(),g(11,"span",27),P(12),p()(),g(13,"button",28,7),m("click",function(){d(t);let i=l();return x(i.onNext())}),g(15,"span",23),P(16),p(),h(17,"nx-icon",8),p()()}if(a&2){let t=l();_("aria-label",t.ariaLabel),o(1),u("is-disabled",t._isPaginationPreviousDisabled()),s("disabled",t._isPaginationPreviousDisabled()),_("aria-label",t.paginationTexts.previous),o(2),s("name",t._isRTL?"arrow-right":"arrow-left"),o(2),C(" ",t.paginationTexts.previous," "),o(3),O(t.page),o(2),C(" ",t.paginationTexts.ofLabel," "),o(2),O(t.totalNumberPages),o(1),u("is-disabled",t._isPaginationNextDisabled()),s("disabled",t._isPaginationNextDisabled()),_("aria-label",t.paginationTexts.next),o(3),C(" ",t.paginationTexts.next," "),o(1),s("name",t._isRTL?"arrow-left":"arrow-right")}}function tt(a,r){if(a&1){let t=f();g(0,"li",5)(1,"button",31,7),m("click",function(){let e=d(t).$implicit,c=l(2);return x(c.onPage(e.value))}),p()()}if(a&2){let t=r.$implicit,n=l(2);o(1),u("is-active",t.value===n.page),_("aria-current",t.value===n.page?"page":"")}}function nt(a,r){if(a&1){let t=f();g(0,"nav",29)(1,"ul",4)(2,"li",9)(3,"button",10,7),m("click",function(){d(t);let i=l();return x(i.onPrev())}),h(5,"nx-icon",8),p()(),k(6,tt,3,3,"li",30),g(7,"li",13)(8,"button",14,7),m("click",function(){d(t);let i=l();return x(i.onNext())}),h(10,"nx-icon",8),p()()()()}if(a&2){let t=l();_("aria-label",t.ariaLabel),o(3),u("is-disabled",t._isPaginationSliderPreviousDisabled()),s("disabled",t._isPaginationSliderPreviousDisabled()),_("aria-label",t.paginationTexts.previous),o(2),s("name",t._isRTL?"arrow-right":"arrow-left"),o(1),s("ngForOf",t.getSlides()),o(2),u("is-disabled",t._isPaginationSliderNextDisabled()),s("disabled",t._isPaginationSliderNextDisabled()),_("aria-label",t.paginationTexts.next),o(2),s("name",t._isRTL?"arrow-left":"arrow-right")}}var it={previous:"Previous",next:"Next",first:"First",last:"Last",ofLabel:"of",ariaLabel:"Please select your page"},et=new S("nx-pagination-texts"),q=(()=>{let r=class r{constructor(){this._pagesMobile=3,this._elipsisText="...",this._classExpanded="expanded-view"}getSlides(n){return Array.from(Array(n).keys()).map(i=>this.createPaginationItem(i+1,i+1))}getPages(n,i){let e=[],c=[],b=[],v=[];return c=this.getStartArray(n,i),b=this.getMiddleArray(n,i),v=this.getEndArray(n,i),e=[...c,...b,...v],e}getMiddleArray(n,i){let e=n<6?4:n-1,c=[];for(;c.length<3&&e>=2&&e<=i-3&&e<=n+1&&e>=n-1;)c.push(this.createPaginationItem(e,e)),e++;return c}getEndArray(n,i){let e=[],c=i<=3?i+1:i<=6?i-(i-4):i-2,b=n<i-4;for(;c<=i;){let v=e.length===0&&b?this.createPaginationItem(this._elipsisText,c,!0):this.createPaginationItem(c,c,!0);e.push(v),c++}return e}getStartArray(n,i){let e=0,c=[],b=3;for(;e<b&&e<i;){let v=e===2&&n>5?this.createPaginationItem(this._elipsisText,e,!0):this.createPaginationItem(e+1,e+1,!0);c.push(v),e++}return c}getMobilePages(n,i){if(i<this._pagesMobile)return Array.from(Array(i).keys()).map(e=>this.createPaginationItem(e+1,e+1));switch(n){case 1:return[1,2,3].map(e=>this.createPaginationItem(e,e));case i:return[i-2,i-1,i].map(e=>this.createPaginationItem(e,e));default:return[n-1,n,n+1].map(e=>this.createPaginationItem(e,e))}}createPaginationItem(n,i,e){return{label:n,value:i,class:e?this._classExpanded:""}}};r.\u0275fac=function(i){return new(i||r)},r.\u0275prov=T({token:r,factory:r.\u0275fac});let a=r;return a})(),Mt=(()=>{let r=class r{set ariaLabel(n){this._ariaLabel=n}get ariaLabel(){return this._ariaLabel||this.paginationTexts.ariaLabel}set page(n){this._page=n,this._cdr.markForCheck()}get page(){return this._page}set count(n){this._count=n,this.totalNumberPages=this.calculateTotalPages(),this._cdr.markForCheck()}get count(){return this._count}set perPage(n){this._perPage=n,this.totalNumberPages=this.calculateTotalPages(),this._cdr.markForCheck()}get perPage(){return this._perPage}set type(n){this._type=n,this._cdr.markForCheck()}get type(){return this._type}constructor(n,i,e,c,b){this._dir=i,this.paginationUtilsService=e,this._cdr=c,this._focusMonitor=b,this.totalNumberPages=0,this._ariaLabel="",this._type="simple",this.goPrev=new y,this.goNext=new y,this.goPage=new y,this._destroyed=new w,this.paginationTexts=n||it,this._dir?.change.pipe(N(this._destroyed)).subscribe(()=>{this._cdr.detectChanges()})}ngOnInit(){this.totalNumberPages=this.calculateTotalPages()}ngAfterContentInit(){this.type==="advanced"&&(!this.paginationTexts.last||!this.paginationTexts.first)&&console.warn("Please define aria labels for the last and first arrows.")}ngAfterViewInit(){this._linkElements.forEach(n=>this._focusMonitor.monitor(n)),this._linkElementsPrevious=this._linkElements,this._linkElements.changes.subscribe(n=>{this._linkElementsPrevious.forEach(i=>this._focusMonitor.stopMonitoring(i)),this._linkElementsPrevious=this._linkElements,this._linkElements.forEach(i=>this._focusMonitor.monitor(i))})}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this._linkElements?.forEach(n=>this._focusMonitor.stopMonitoring(n))}getMin(){return this.totalNumberPages>0?1:0}getMax(){let n=this._perPage*this._page;return n>this._count&&(n=this._count),n}calculateTotalPages(){return Math.ceil(this._count/this._perPage)||0}onPage(n){this.goPage.emit(n)}onPrev(){this._isPaginationPreviousDisabled()||this.goPrev.emit()}onNext(){this._isPaginationNextDisabled()||this.goNext.emit()}onFirst(){this._isPaginationPreviousDisabled()||this.onPage(1)}onLast(){this._isPaginationNextDisabled()||this.onPage(this.totalNumberPages)}lastPage(){return this._perPage*this._page>=this._count}getSlides(){return this.paginationUtilsService.getSlides(this._count)}getPages(){return this.paginationUtilsService.getPages(this._page,this.totalNumberPages)}getMobilePages(){return this.paginationUtilsService.getMobilePages(this._page,this.totalNumberPages)}getPaginationItemClasses(n){return{"is-ellipsis":n.label==="...","nx-pagination__item--expanded-view":n.class==="expanded-view"}}getPaginationNumberClasses(n){return{"is-active":n.value===this.page,"nx-pagination__ellipsis":n.label==="...","nx-pagination__link":n.label!=="..."}}isPaginationVisible(){return this.count>0}isPaginationCompactVisible(){return this.type.includes("simple")&&this.count>0}isPaginationSliderVisible(){return this.type.includes("slider")&&this.count>0}isPaginationContainerVisible(){return this.type.includes("advanced")}_isPaginationPreviousDisabled(){return this.page===this.getMin()}_isPaginationNextDisabled(){return this.page===this.totalNumberPages}_isPaginationSliderPreviousDisabled(){return this.page===1}_isPaginationSliderNextDisabled(){return this.page===this.count}get _isRTL(){return this._dir?.value==="rtl"}};r.\u0275fac=function(i){return new(i||r)(M(et,8),M(U,8),M(q),M(D),M(Q))},r.\u0275cmp=E({type:r,selectors:[["nx-pagination"]],viewQuery:function(i,e){if(i&1&&F(B,5),i&2){let c;L(c=A())&&(e._linkElements=c)}},inputs:{ariaLabel:"ariaLabel",page:"page",count:"count",perPage:"perPage",type:"type"},outputs:{goPrev:"goPrev",goNext:"goNext",goPage:"goPage"},decls:3,vars:3,consts:[["class","nx-pagination",4,"ngIf"],["class","nx-pagination-compact",4,"ngIf"],["class","nx-pagination-slider",4,"ngIf"],[1,"nx-pagination"],[1,"nx-pagination__container"],[1,"nx-pagination__item"],["type","button",1,"nx-pagination__link","nx-pagination__link--first",3,"disabled","click"],["link",""],[1,"nx-pagination__arrow",3,"name"],[1,"nx-pagination__item","nx-pagination__item-previous"],["type","button",1,"nx-pagination__link","nx-pagination__link--previous",3,"disabled","click"],["class","nx-pagination__item nx-pagination__item--desktop",3,"ngClass",4,"ngFor","ngForOf"],["class","nx-pagination__item nx-pagination__item--mobile",3,"ngClass",4,"ngFor","ngForOf"],[1,"nx-pagination__item","nx-pagination__item-next"],["type","button",1,"nx-pagination__link","nx-pagination__link--next",3,"disabled","click"],["type","button",1,"nx-pagination__link","nx-pagination__link--last",3,"disabled","click"],[1,"nx-pagination__item","nx-pagination__item--desktop",3,"ngClass"],["class","nx-pagination--number","type","button",3,"ngClass","click",4,"ngIf"],[4,"ngIf"],["type","button",1,"nx-pagination--number",3,"ngClass","click"],[1,"nx-pagination__item","nx-pagination__item--mobile",3,"ngClass"],[1,"nx-pagination-compact"],["type","button",1,"nx-pagination-compact__previous",3,"disabled","click"],[1,"nx-pagination-compact__direction-label"],[1,"nx-pagination-compact__display"],[1,"nx-pagination-compact__current-page"],[1,"nx-pagination-compact__page-separator"],[1,"nx-pagination-compact__total-pages"],["type","button",1,"nx-pagination-compact__next",3,"disabled","click"],[1,"nx-pagination-slider"],["class","nx-pagination__item",4,"ngFor","ngForOf"],["type","button",1,"nx-pagination--icon",3,"click"]],template:function(i,e){i&1&&k(0,Y,20,23,"nav",0)(1,Z,18,16,"nav",1)(2,nt,11,12,"nav",2),i&2&&(s("ngIf",e.isPaginationVisible()&&e.isPaginationContainerVisible()),o(1),s("ngIf",e.isPaginationCompactVisible()),o(1),s("ngIf",e.isPaginationSliderVisible()))},dependencies:[j,R,z,G],styles:["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   button[_ngcontent-%COMP%]:focus{outline:none}[_nghost-%COMP%]   button[_ngcontent-%COMP%]::-moz-focus-inner{border:0}.nx-pagination__container[_ngcontent-%COMP%]{display:flex;font-size:var(--pagination-font-size);line-height:var(--pagination-line-height);font-weight:var(--pagination-font-weight);letter-spacing:var(--pagination-letter-spacing);padding:0}.nx-pagination__item[_ngcontent-%COMP%]{margin:0 16px;list-style:none;font-weight:var(--pagination-item-font-weight)}.nx-pagination__item[_ngcontent-%COMP%]:first-child{margin:0}.nx-pagination__item[_ngcontent-%COMP%]:last-child{margin:0}.nx-pagination__item.is-ellipsis[_ngcontent-%COMP%]{color:var(--pagination-text-color)}.nx-pagination__item--expanded-view[_ngcontent-%COMP%]{display:block}.nx-pagination__link[_ngcontent-%COMP%]{color:var(--pagination-link-color);padding:0;text-decoration:none;background-color:transparent;border:0;cursor:pointer;font:inherit}.nx-pagination__link.is-active[_ngcontent-%COMP%]{color:var(--pagination-text-color);font-weight:700;cursor:default}@media screen and (forced-colors: active){.nx-pagination__link.is-active[_ngcontent-%COMP%]{border-bottom:4px solid CanvasText}}nx-icon.nx-pagination__arrow[_ngcontent-%COMP%]{font-size:var(--pagination-icon-size)}.nx-pagination-compact[_ngcontent-%COMP%]{display:flex;font-size:var(--pagination-font-size);line-height:var(--pagination-line-height);font-weight:var(--pagination-font-weight);letter-spacing:var(--pagination-letter-spacing);padding:0}.nx-pagination-compact__display[_ngcontent-%COMP%]{color:var(--pagination-text-color);display:flex}.nx-pagination-compact__current-page[_ngcontent-%COMP%]{font-weight:700;margin-right:8px}[dir=rtl][_nghost-%COMP%]   .nx-pagination-compact__current-page[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-pagination-compact__current-page[_ngcontent-%COMP%]{margin-right:initial;margin-left:8px}.nx-pagination-compact__total-pages[_ngcontent-%COMP%]{margin-left:8px}[dir=rtl][_nghost-%COMP%]   .nx-pagination-compact__total-pages[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-pagination-compact__total-pages[_ngcontent-%COMP%]{margin-right:8px;margin-left:initial}.nx-pagination-compact__next[_ngcontent-%COMP%], .nx-pagination-compact__previous[_ngcontent-%COMP%], .nx-pagination__arrow-last[_ngcontent-%COMP%], .nx-pagination__arrow-first[_ngcontent-%COMP%]{color:var(--pagination-link-color);font-weight:var(--pagination-icon-font-weight);text-decoration:none;text-transform:uppercase;display:flex;align-items:center;padding:0;background-color:transparent;cursor:pointer;border:0}.nx-pagination-compact__previous[_ngcontent-%COMP%]{margin-right:32px}[dir=rtl][_nghost-%COMP%]   .nx-pagination-compact__previous[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-pagination-compact__previous[_ngcontent-%COMP%]{margin-right:initial;margin-left:32px}.nx-pagination-compact__next[_ngcontent-%COMP%]{margin-left:32px}[dir=rtl][_nghost-%COMP%]   .nx-pagination-compact__next[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-pagination-compact__next[_ngcontent-%COMP%]{margin-right:32px;margin-left:initial}.nx-pagination-compact__direction-label[_ngcontent-%COMP%]{display:block;font-size:var(--pagination-compact-direction-font-size);line-height:var(--pagination-compact-direction-line-height);font-weight:var(--pagination-compact-direction-font-weight);letter-spacing:var(--pagination-compact-direction-letter-spacing)}.nx-pagination-compact__direction-label[_ngcontent-%COMP%]:first-child{margin-right:8px}[dir=rtl][_nghost-%COMP%]   .nx-pagination-compact__direction-label[_ngcontent-%COMP%]:first-child, [dir=rtl]   [_nghost-%COMP%]   .nx-pagination-compact__direction-label[_ngcontent-%COMP%]:first-child{margin-right:initial;margin-left:8px}.nx-pagination-compact__direction-label[_ngcontent-%COMP%]:last-child{margin-left:8px}[dir=rtl][_nghost-%COMP%]   .nx-pagination-compact__direction-label[_ngcontent-%COMP%]:last-child, [dir=rtl]   [_nghost-%COMP%]   .nx-pagination-compact__direction-label[_ngcontent-%COMP%]:last-child{margin-right:8px;margin-left:initial}.nx-pagination-compact__previous.is-disabled[_ngcontent-%COMP%], .nx-pagination-compact__next.is-disabled[_ngcontent-%COMP%], .nx-pagination__link.is-disabled[_ngcontent-%COMP%]{color:var(--pagination-link-disabled-color);cursor:not-allowed}@media screen and (forced-colors: active){.nx-pagination-compact__previous.is-disabled[_ngcontent-%COMP%], .nx-pagination-compact__next.is-disabled[_ngcontent-%COMP%], .nx-pagination__link.is-disabled[_ngcontent-%COMP%]{color:GrayText}}.nx-pagination-compact__previous.cdk-keyboard-focused[_ngcontent-%COMP%], .nx-pagination-compact__next.cdk-keyboard-focused[_ngcontent-%COMP%], .nx-pagination__link.cdk-keyboard-focused[_ngcontent-%COMP%], .nx-pagination--number.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow);border-radius:4px}@media screen and (forced-colors: active),(forced-colors: active){.nx-pagination-compact__previous.cdk-keyboard-focused[_ngcontent-%COMP%], .nx-pagination-compact__next.cdk-keyboard-focused[_ngcontent-%COMP%], .nx-pagination__link.cdk-keyboard-focused[_ngcontent-%COMP%], .nx-pagination--number.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}.nx-pagination__link--next[_ngcontent-%COMP%], .nx-pagination__link--previous[_ngcontent-%COMP%], .nx-pagination__link--first[_ngcontent-%COMP%], .nx-pagination__link--last[_ngcontent-%COMP%]{display:flex;align-items:center}.nx-pagination__item-next[_ngcontent-%COMP%]{margin-right:8px}[dir=rtl][_nghost-%COMP%]   .nx-pagination__item-next[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-pagination__item-next[_ngcontent-%COMP%]{margin-right:initial;margin-left:8px}.nx-pagination__item-previous[_ngcontent-%COMP%]{margin-left:8px}[dir=rtl][_nghost-%COMP%]   .nx-pagination__item-previous[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-pagination__item-previous[_ngcontent-%COMP%]{margin-right:8px;margin-left:initial}.nx-pagination-compact__direction-label[_ngcontent-%COMP%], .nx-pagination__link--first[_ngcontent-%COMP%], .nx-pagination__link--last[_ngcontent-%COMP%], .nx-pagination__item--desktop[_ngcontent-%COMP%]{display:flex}@media (max-width: 703px){.nx-pagination-compact__direction-label[_ngcontent-%COMP%], .nx-pagination__link--first[_ngcontent-%COMP%], .nx-pagination__link--last[_ngcontent-%COMP%], .nx-pagination__item--desktop[_ngcontent-%COMP%]{display:none}}.nx-pagination__item--mobile[_ngcontent-%COMP%]{display:none}@media (max-width: 703px){.nx-pagination__item--mobile[_ngcontent-%COMP%]{display:block}}.nx-pagination-slider[_ngcontent-%COMP%]   .nx-pagination__item[_ngcontent-%COMP%]{display:flex;align-items:center;margin:0 16px}.nx-pagination-slider[_ngcontent-%COMP%]   .nx-pagination--icon[_ngcontent-%COMP%]{width:var(--pagination-slider-icon-width);height:var(--pagination-slider-icon-height);border:1px solid var(--pagination-slider-icon-border-color);border-radius:50%;padding:0;background:none;cursor:pointer}.nx-pagination-slider[_ngcontent-%COMP%]   .nx-pagination--icon.is-active[_ngcontent-%COMP%]{background-color:var(--pagination-slider-icon-active-color);cursor:auto}"],changeDetection:0});let a=r;return a})(),kt=(()=>{let r=class r{};r.\u0275fac=function(i){return new(i||r)},r.\u0275mod=V({type:r}),r.\u0275inj=I({providers:[q],imports:[$,X]});let a=r;return a})();export{et as a,Mt as b,kt as c};