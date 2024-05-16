import{c as G,e as V}from"./chunk-WBPLCJVU.js";import{x as B}from"./chunk-KTTWGBFS.js";import{m as P}from"./chunk-I2GY6XMW.js";import{a as C}from"./chunk-VTTX4ZNP.js";import{B as J,o as Z}from"./chunk-GHZ7IFWX.js";import{$b as T,Gc as k,Ia as p,Ja as u,Nb as _,Ob as z,Pb as c,Vb as g,Wb as f,Wc as S,Xb as a,ec as w,gc as l,lb as b,mb as v,na as x,nc as D,oc as L,pc as j,qc as A,tb as d,ub as h,ya as s,za as y}from"./chunk-O56WLCF2.js";var W=["playButton"];function Q(i,e){if(i&1){let o=T();g(0,"div")(1,"button",5,0),w("click",function(){p(o);let n=l();return u(n.select())})("keydown.enter",function(){p(o);let n=l();return u(n.select())}),a(3,"nx-icon",6),f(),g(4,"img",7),w("click",function(){p(o);let n=l();return u(n.select())})("keydown.enter",function(){p(o);let n=l();return u(n.select())}),f()()}if(i&2){let o=l();d(),z("aria-label",o.playButtonAriaLabel),d(3),c("src",o.imgSrc,b)("alt",o.altText)}}function Y(i,e){if(i&1&&a(0,"iframe",9),i&2){let o=l(2);c("src",o.videoSrc,v)}}function U(i,e){if(i&1&&a(0,"iframe",10),i&2){let o=l(2);c("src",o.videoSrc,v)}}function X(i,e){if(i&1&&(g(0,"div"),_(1,Y,1,1,"iframe",8)(2,U,1,1,"ng-template",null,1,k),f()),i&2){let o=A(3),t=l();d(),c("ngIf",t.allowFullScreen)("ngIfElse",o)}}var m=(()=>{let e=class e{set videoId(t){this._videoId!==t&&(this._videoId=t,this._cdr.markForCheck())}get videoId(){return this._videoId}set altText(t){this._altText!==t&&(this._altText=t,this._cdr.markForCheck())}get altText(){return this._altText}set playButtonAriaLabel(t){this._playButtonAriaLabel!==t&&(this._playButtonAriaLabel=t,this._cdr.markForCheck())}get playButtonAriaLabel(){let t=this.altText?`${this.altText} - Play Video`:"Play Video";return this._playButtonAriaLabel?this._playButtonAriaLabel:t}set previewImageSrc(t){this._previewImageSrc!==t&&(this._previewImageSrc=t,this._cdr.markForCheck())}get previewImageSrc(){return this._previewImageSrc}set showPlayerControls(t){this._showPlayerControls=C(t),this._cdr.markForCheck()}get showPlayerControls(){return this._showPlayerControls}set allowFullScreen(t){this._allowFullScreen=C(t),this._cdr.markForCheck()}get allowFullScreen(){return this._allowFullScreen}set interfaceLanguage(t){this._interfaceLanguage!==t&&(this._interfaceLanguage=t,this._cdr.markForCheck())}get interfaceLanguage(){return this._interfaceLanguage}constructor(t,n,r){this.sanitizer=t,this._cdr=n,this._focusMonitor=r,this._videoId=null,this._altText="",this._playButtonAriaLabel="",this._previewImageSrc=null,this._showPlayerControls=!0,this._allowFullScreen=!0,this._interfaceLanguage=null,this.showPlayer=!1}ngAfterViewInit(){this._focusMonitor.monitor(this._playButton)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._playButton)}select(){this.showPlayer=!0,this._cdr.markForCheck()}get videoSrc(){let t=`https://www.youtube.com/embed/${this.videoId}?rel=0&showinfo=0&autoplay=1`;return this.showPlayerControls||(t+="&controls=0"),this.allowFullScreen||(t+="&fs=0"),this.interfaceLanguage&&(t+=`&hl=${this.interfaceLanguage}`),this.sanitizer.bypassSecurityTrustResourceUrl(t)}get imgSrc(){return this.previewImageSrc?this.previewImageSrc:`https://img.youtube.com/vi/${this.videoId}/sddefault.jpg`}};e.\u0275fac=function(n){return new(n||e)(h(P),h(S),h(B))},e.\u0275cmp=s({type:e,selectors:[["nx-video"]],viewQuery:function(n,r){if(n&1&&D(W,5),n&2){let N;L(N=j())&&(r._playButton=N.first)}},inputs:{videoId:"videoId",altText:"altText",playButtonAriaLabel:"playButtonAriaLabel",previewImageSrc:"previewImageSrc",showPlayerControls:"showPlayerControls",allowFullScreen:"allowFullScreen",interfaceLanguage:"interfaceLanguage"},decls:4,vars:2,consts:[["playButton",""],["disallowfullscreen",""],[1,"nx-video"],[1,"nx-video__iframe"],[4,"ngIf"],[1,"nx-video__play-button",3,"click","keydown.enter"],["name","play","size","s","aria-hidden","true",1,"nx-video__high-contrast-icon"],[1,"nx-video__thumbnail",3,"click","keydown.enter","src","alt"],["title","video","class","nx-video__iframe","allowFullscreen","true",3,"src",4,"ngIf","ngIfElse"],["title","video","allowFullscreen","true",1,"nx-video__iframe",3,"src"],["title","video","allowFullscreen","false",1,"nx-video__iframe",3,"src"]],template:function(n,r){n&1&&(g(0,"div",2)(1,"div",3),_(2,Q,5,3,"div",4)(3,X,4,2,"div",4),f()()),n&2&&(d(2),c("ngIf",!r.showPlayer),d(),c("ngIf",r.videoId&&r.showPlayer))},dependencies:[Z,G],styles:[".nx-video[_ngcontent-%COMP%]{position:relative;padding-bottom:56.25%;overflow:hidden;width:100%;height:auto}.nx-video__iframe[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;border:none}.nx-video__thumbnail[_ngcontent-%COMP%]{position:absolute;cursor:pointer;width:100%;top:50%;left:50%;transform:translate(-50%,-50%);opacity:.7}.nx-video__play-button[_ngcontent-%COMP%]{border:none;background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB3aWR0aD0nODhweCcgaGVpZ2h0PSc1NnB4JyB2aWV3Qm94PScwIDAgODggNTYnIHZlcnNpb249JzEuMSc+PHRpdGxlPkF0b20gLyBNZWRpYSAvIFlvdVR1YmUgUGxheWVyIC8gW0Fzc2V0c10gLyBQbGF5IEJ1dHRvbjwvdGl0bGU+PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+PGRlZnM+PHJlY3QgaWQ9J3BhdGgtMScgeD0nMCcgeT0nMCcgd2lkdGg9Jzg4JyBoZWlnaHQ9JzU2JyByeD0nOCcvPjxmaWx0ZXIgeD0nLTQwLjklJyB5PSctNjQuMyUnIHdpZHRoPScxODEuOCUnIGhlaWdodD0nMjI4LjYlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItMic+PGZlT2Zmc2V0IGR4PScwJyBkeT0nMCcgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMScvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzEyJyBpbj0nc2hhZG93T2Zmc2V0T3V0ZXIxJyByZXN1bHQ9J3NoYWRvd0JsdXJPdXRlcjEnLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC41IDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0JsdXJPdXRlcjEnLz48L2ZpbHRlcj48L2RlZnM+PGcgaWQ9J0F0b20tLy1NZWRpYS0vLVlvdVR1YmUtUGxheWVyLS8tW0Fzc2V0c10tLy1QbGF5LUJ1dHRvbicgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+PGcgaWQ9J0JhY2tncm91bmQnIG9wYWNpdHk9JzAuODAxMjM0MTQ5Jz48dXNlIGZpbGw9J2JsYWNrJyBmaWxsLW9wYWNpdHk9JzEnIGZpbHRlcj0ndXJsKCNmaWx0ZXItMiknIHhsaW5rOmhyZWY9JyNwYXRoLTEnLz48dXNlIGZpbGw9JyM0MTQxNDEnIGZpbGwtcnVsZT0nZXZlbm9kZCcgeGxpbms6aHJlZj0nI3BhdGgtMScvPjwvZz48cGF0aCBkPSdNNTQuMjExMTQ1NiwyOC44OTQ0MjcyIEwzMy40NDcyMTM2LDM5LjI3NjM5MzIgQzMyLjk1MzIzNTEsMzkuNTIzMzgyNSAzMi4zNTI1NjIxLDM5LjMyMzE1ODEgMzIuMTA1NTcyOCwzOC44MjkxNzk2IEMzMi4wMzYxNDUxLDM4LjY5MDMyNDIgMzIsMzguNTM3MjExMSAzMiwzOC4zODE5NjYgTDMyLDE3LjYxODAzNCBDMzIsMTcuMDY1NzQ5MiAzMi40NDc3MTUzLDE2LjYxODAzNCAzMywxNi42MTgwMzQgQzMzLjE1NTI0NTEsMTYuNjE4MDM0IDMzLjMwODM1ODIsMTYuNjU0MTc5MSAzMy40NDcyMTM2LDE2LjcyMzYwNjggTDU0LjIxMTE0NTYsMjcuMTA1NTcyOCBDNTQuNzA1MTI0MSwyNy4zNTI1NjIxIDU0LjkwNTM0ODUsMjcuOTUzMjM1MSA1NC42NTgzNTkyLDI4LjQ0NzIxMzYgQzU0LjU2MTU5NTUsMjguNjQwNzQxIDU0LjQwNDY3MywyOC43OTc2NjM1IDU0LjIxMTE0NTYsMjguODk0NDI3MiBaJyBpZD0nVHJpYW5nbGUnIGZpbGw9JyNGRkZGRkYnLz48L2c+PC9zdmc+) center no-repeat;cursor:pointer;position:absolute;width:88px;height:56px;z-index:1;border-radius:4px}.nx-video__play-button[_ngcontent-%COMP%]::-moz-focus-inner{border:0}.nx-video__play-button[_ngcontent-%COMP%]:focus{outline:none}.nx-video__high-contrast-icon[_ngcontent-%COMP%]{display:none}.nx-video__play-button[_ngcontent-%COMP%], .nx-video__play-button[_ngcontent-%COMP%]:before{top:50%;left:50%;transform:translate(-50%,-50%)}@media screen and (forced-colorstive){.nx-video__play-button[_ngcontent-%COMP%]{background:buttonFace;border:1px solid buttonText;color:buttonText}.nx-video__high-contrast-icon[_ngcontent-%COMP%]{display:inline-flex;vertical-align:middle}}.nx-video__play-button.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow)}@media screen and (forced-colors: active),(forced-colors: active){.nx-video__play-button.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}"],changeDetection:0});let i=e;return i})(),F=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=y({type:e}),e.\u0275inj=x({imports:[J,V]});let i=e;return i})();var O=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=s({type:e,selectors:[["video-example"]],decls:1,vars:0,consts:[["videoId","NZM5-1c9D5o","altText","Allianz Classic Add","playButtonAriaLabel","An Allianz commercial video"]],template:function(n,r){n&1&&a(0,"nx-video",0)},dependencies:[m]});let i=e;return i})();var R=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=s({type:e,selectors:[["video-advanced-example"]],decls:1,vars:1,consts:[["videoId","NZM5-1c9D5o","altText","Allianz Classic Add","playButtonAriaLabel","An Allianz commercial video","interfaceLanguage","fr",3,"allowFullScreen"]],template:function(n,r){n&1&&a(0,"nx-video",0),n&2&&c("allowFullScreen",!1)},dependencies:[m]});let i=e;return i})();var E=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=s({type:e,selectors:[["video-custom-example"]],decls:1,vars:0,consts:[["videoId","NZM5-1c9D5o","altText","Allianz Classic Add","playButtonAriaLabel","An Allianz commercial video","previewImageSrc","http://placehold.it/828x600?text=Video"]],template:function(n,r){n&1&&a(0,"nx-video",0)},dependencies:[m]});let i=e;return i})();var de=(()=>{let e=class e{static components(){return{video:O,"video-advanced":R,"video-custom":E}}};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=y({type:e}),e.\u0275inj=x({imports:[F]});let i=e;return i})();export{de as VideoExamplesModule};