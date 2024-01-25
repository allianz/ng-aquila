import{a as m,d as k}from"./chunk-LK5X6SR6.js";import{b as f,e as _}from"./chunk-2BGO346T.js";import{d as F}from"./chunk-UUZACKYZ.js";import{Cb as M,J as p,N as x,Sc as L,Yb as b,ea as v,la as E,ma as w,mb as R,n as c,r as g,ra as d,ub as a,va as H,wa as y,zb as u}from"./chunk-QYP2T7PT.js";var A=k({passive:!0}),X=(()=>{let i=class i{constructor(e,t){this._platform=e,this._ngZone=t,this._monitoredElements=new Map}monitor(e){if(!this._platform.isBrowser)return g;let t=_(e),s=this._monitoredElements.get(t);if(s)return s.subject;let o=new c,r="cdk-text-field-autofilled",l=h=>{h.animationName==="cdk-text-field-autofill-start"&&!t.classList.contains(r)?(t.classList.add(r),this._ngZone.run(()=>o.next({target:h.target,isAutofilled:!0}))):h.animationName==="cdk-text-field-autofill-end"&&t.classList.contains(r)&&(t.classList.remove(r),this._ngZone.run(()=>o.next({target:h.target,isAutofilled:!1})))};return this._ngZone.runOutsideAngular(()=>{t.addEventListener("animationstart",l,A),t.classList.add("cdk-text-field-autofill-monitored")}),this._monitoredElements.set(t,{subject:o,unlisten:()=>{t.removeEventListener("animationstart",l,A)}}),o}stopMonitoring(e){let t=_(e),s=this._monitoredElements.get(t);s&&(s.unlisten(),s.subject.complete(),t.classList.remove("cdk-text-field-autofill-monitored"),t.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(t))}ngOnDestroy(){this._monitoredElements.forEach((e,t)=>this.stopMonitoring(t))}};i.\u0275fac=function(t){return new(t||i)(d(m),d(u))},i.\u0275prov=E({token:i,factory:i.\u0275fac,providedIn:"root"});let n=i;return n})();var Y=(()=>{let i=class i{get minRows(){return this._minRows}set minRows(e){this._minRows=f(e),this._setMinHeight()}get maxRows(){return this._maxRows}set maxRows(e){this._maxRows=f(e),this._setMaxHeight()}get enabled(){return this._enabled}set enabled(e){this._enabled!==e&&((this._enabled=e)?this.resizeToFitContent(!0):this.reset())}get placeholder(){return this._textareaElement.placeholder}set placeholder(e){this._cachedPlaceholderHeight=void 0,e?this._textareaElement.setAttribute("placeholder",e):this._textareaElement.removeAttribute("placeholder"),this._cacheTextareaPlaceholderHeight()}constructor(e,t,s,o){this._elementRef=e,this._platform=t,this._ngZone=s,this._destroyed=new c,this._enabled=!0,this._previousMinRows=-1,this._isViewInited=!1,this._handleFocusEvent=r=>{this._hasFocus=r.type==="focus"},this._document=o,this._textareaElement=this._elementRef.nativeElement}_setMinHeight(){let e=this.minRows&&this._cachedLineHeight?`${this.minRows*this._cachedLineHeight}px`:null;e&&(this._textareaElement.style.minHeight=e)}_setMaxHeight(){let e=this.maxRows&&this._cachedLineHeight?`${this.maxRows*this._cachedLineHeight}px`:null;e&&(this._textareaElement.style.maxHeight=e)}ngAfterViewInit(){this._platform.isBrowser&&(this._initialHeight=this._textareaElement.style.height,this.resizeToFitContent(),this._ngZone.runOutsideAngular(()=>{let e=this._getWindow();p(e,"resize").pipe(x(16),v(this._destroyed)).subscribe(()=>this.resizeToFitContent(!0)),this._textareaElement.addEventListener("focus",this._handleFocusEvent),this._textareaElement.addEventListener("blur",this._handleFocusEvent)}),this._isViewInited=!0,this.resizeToFitContent(!0))}ngOnDestroy(){this._textareaElement.removeEventListener("focus",this._handleFocusEvent),this._textareaElement.removeEventListener("blur",this._handleFocusEvent),this._destroyed.next(),this._destroyed.complete()}_cacheTextareaLineHeight(){if(this._cachedLineHeight)return;let e=this._textareaElement.cloneNode(!1);e.rows=1,e.style.position="absolute",e.style.visibility="hidden",e.style.border="none",e.style.padding="0",e.style.height="",e.style.minHeight="",e.style.maxHeight="",e.style.overflow="hidden",this._textareaElement.parentNode.appendChild(e),this._cachedLineHeight=e.clientHeight,e.remove(),this._setMinHeight(),this._setMaxHeight()}_measureScrollHeight(){let e=this._textareaElement,t=e.style.marginBottom||"",s=this._platform.FIREFOX,o=s&&this._hasFocus,r=s?"cdk-textarea-autosize-measuring-firefox":"cdk-textarea-autosize-measuring";o&&(e.style.marginBottom=`${e.clientHeight}px`),e.classList.add(r);let l=e.scrollHeight-4;return e.classList.remove(r),o&&(e.style.marginBottom=t),l}_cacheTextareaPlaceholderHeight(){if(!this._isViewInited||this._cachedPlaceholderHeight!=null)return;if(!this.placeholder){this._cachedPlaceholderHeight=0;return}let e=this._textareaElement.value;this._textareaElement.value=this._textareaElement.placeholder,this._cachedPlaceholderHeight=this._measureScrollHeight(),this._textareaElement.value=e}ngDoCheck(){this._platform.isBrowser&&this.resizeToFitContent()}resizeToFitContent(e=!1){if(!this._enabled||(this._cacheTextareaLineHeight(),this._cacheTextareaPlaceholderHeight(),!this._cachedLineHeight))return;let t=this._elementRef.nativeElement,s=t.value;if(!e&&this._minRows===this._previousMinRows&&s===this._previousValue)return;let o=this._measureScrollHeight(),r=Math.max(o,this._cachedPlaceholderHeight||0);t.style.height=`${r}px`,this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>this._scrollToCaretPosition(t)):setTimeout(()=>this._scrollToCaretPosition(t))}),this._previousValue=s,this._previousMinRows=this._minRows}reset(){this._initialHeight!==void 0&&(this._textareaElement.style.height=this._initialHeight)}_noopInputHandler(){}_getDocument(){return this._document||document}_getWindow(){return this._getDocument().defaultView||window}_scrollToCaretPosition(e){let{selectionStart:t,selectionEnd:s}=e;!this._destroyed.isStopped&&this._hasFocus&&e.setSelectionRange(t,s)}};i.\u0275fac=function(t){return new(t||i)(a(R),a(m),a(u),a(F,8))},i.\u0275dir=y({type:i,selectors:[["textarea","cdkTextareaAutosize",""]],hostAttrs:["rows","1",1,"cdk-textarea-autosize"],hostBindings:function(t,s){t&1&&b("input",function(){return s._noopInputHandler()})},inputs:{minRows:["cdkAutosizeMinRows","minRows"],maxRows:["cdkAutosizeMaxRows","maxRows"],enabled:["cdkTextareaAutosize","enabled",L],placeholder:"placeholder"},exportAs:["cdkTextareaAutosize"],features:[M]});let n=i;return n})(),G=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=H({type:i}),i.\u0275inj=w({});let n=i;return n})();var I=class{};export{I as a,X as b,Y as c,G as d};