import{a as I,b as u}from"./chunk-DVD5GRYU.js";import{z as W}from"./chunk-E5X5IINZ.js";import{$b as a,Cb as v,Ec as P,Pb as g,Wb as w,_b as r,ac as M,jc as y,lc as C,mc as x,na as m,nc as E,qb as b,sc as l,tc as c,ub as h,uc as d,vb as f,wc as S,xa as _,xc as L,ya as p}from"./chunk-H7RQIDOF.js";var Q=["element"],X=["scrollable"],k=["indicator"],z=["*"];function B(o,i){if(o&1&&(r(0,"div",4),S(1),a()),o&2){let O=C();h(),L(O.label)}}var D=(()=>{let i=class i{constructor(t){this.zone=t,this._barLength=0,this._position=0,this._startX=0,this._mousedown=!1,this._showBar=!1,this.label="",this._onMousedown=this._onMousedown.bind(this),this._onMousemove=this._onMousemove.bind(this),this._onMouseup=this._onMouseup.bind(this),this._onScroll=this._onScroll.bind(this),console.warn("The SwipeBar component is deprecated. Please use native scroll bars instead.")}ngAfterViewInit(){this._onResize(),this.zone.runOutsideAngular(()=>{this._scrollable.nativeElement.addEventListener("scroll",this._onScroll),this._indicator.nativeElement.addEventListener("mousedown",this._onMousedown)})}_onResize(){if(!this._scrollable)return;let{scrollWidth:t,offsetWidth:e}=this._scrollable.nativeElement;this._showBar=t>e,this._barLength=Math.max(80,e/t*e),this._updateIndicator()}_onScroll(t){if(this._mousedown)return;let e=t.target,{scrollWidth:n,clientWidth:s}=this._scrollable.nativeElement;this._position=Math.floor(e.scrollLeft/(n-s)*(e.offsetWidth-this._barLength)),this._updateIndicator()}_onMousedown(t){this._startX=t.clientX,this._mousedown=!0,document.addEventListener("mousemove",this._onMousemove),document.addEventListener("mouseup",this._onMouseup)}_onMousemove(t){let{offsetWidth:e}=this._scrollable.nativeElement;this._position=Math.max(0,Math.min(e-this._barLength,this._position+t.clientX-this._startX)),this._startX=t.clientX,this._updateScrollablePosition(),this._updateIndicator()}_onMouseup(){document.removeEventListener("mousemove",this._onMousemove),document.removeEventListener("mouseup",this._onMouseup),this._mousedown=!1}_updateScrollablePosition(){requestAnimationFrame(()=>{let{scrollWidth:t,clientWidth:e,offsetWidth:n}=this._scrollable.nativeElement;this._scrollable.nativeElement.scrollLeft=this._position/(n-this._barLength)*(t-e)})}_updateIndicator(){requestAnimationFrame(()=>{this._element.nativeElement.style.display=this._showBar?"block":"none",this._indicator.nativeElement.style.transform=`translateX(${this._position}px)`,this._indicator.nativeElement.style.width=`${this._barLength}px`})}};i.\u0275fac=function(e){return new(e||i)(f(v))},i.\u0275cmp=_({type:i,selectors:[["nx-swipebar"]],viewQuery:function(e,n){if(e&1&&(l(Q,5),l(X,5),l(k,5)),e&2){let s;c(s=d())&&(n._element=s.first),c(s=d())&&(n._scrollable=s.first),c(s=d())&&(n._indicator=s.first)}},hostBindings:function(e,n){e&1&&y("resize",function(){return n._onResize()},!1,b)},inputs:{label:"label"},standalone:!0,features:[P],ngContentSelectors:z,decls:9,vars:1,consts:[["element",""],["indicator",""],["scrollable",""],["aria-hidden","true"],["nxCopytext","",1,"label"],[1,"bar"],[1,"indicator"],[1,"scrollable"]],template:function(e,n){e&1&&(x(),r(0,"div",3,0),g(2,B,2,1,"div",4),r(3,"div",5),M(4,"div",6,1),a()(),r(6,"div",7,2),E(8),a()),e&2&&(h(2),w(n.label?2:-1))},dependencies:[u,I],styles:['[_nghost-%COMP%]{display:block}.label[_ngcontent-%COMP%]{margin-bottom:12px}.scrollable[_ngcontent-%COMP%]{overflow:auto;padding:var(--swipebar-padding);scrollbar-width:none}.scrollable[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.bar[_ngcontent-%COMP%]{background:var(--swipebar-background-color)}.indicator[_ngcontent-%COMP%]{position:relative;height:8px;background:var(--swipebar-color);cursor:grab;transform:translate(0)}.indicator[_ngcontent-%COMP%]:active{cursor:grabbing}.indicator[_ngcontent-%COMP%]:before{content:"";position:absolute;display:block;inset:-8px 0}'],changeDetection:0});let o=i;return o})(),F=(()=>{let i=class i{};i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=p({type:i}),i.\u0275inj=m({imports:[W,u,D]});let o=i;return o})();export{D as a,F as b};
