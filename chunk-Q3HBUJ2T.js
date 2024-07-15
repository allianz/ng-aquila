import{A as dt,C as se,E as oe,a as ne,b as at,c as ct,d as E,k as re,z as lt}from"./chunk-E5X5IINZ.js";import{B as V,Ba as Te,Cb as A,D as Be,Da as Ge,Ea as Xe,Fa as Je,M as ze,Nc as rt,Oc as ee,P as Ve,Pa as Ee,Pc as te,Qc as be,Sa as we,V as me,Va as Ke,Wa as H,Xa as We,Ya as L,_a as Re,a as z,b as _e,bb as x,bd as st,cb as j,cd as ot,da as $e,db as Ze,dd as it,eb as qe,fb as Ye,gb as Qe,hb as He,ia as M,ib as et,j as pe,ja as P,jb as tt,kb as k,m as Q,ma as m,na as ge,pa as R,ra as d,s as ye,sa as v,tb as G,wa as $,ya as ve,zb as nt}from"./chunk-H7RQIDOF.js";var J=class{},ae=class{},O=class r{constructor(e){this.normalizedNames=new Map,this.lazyUpdate=null,e?typeof e=="string"?this.lazyInit=()=>{this.headers=new Map,e.split(`
`).forEach(s=>{let t=s.indexOf(":");if(t>0){let n=s.slice(0,t),o=n.toLowerCase(),a=s.slice(t+1).trim();this.maybeSetNormalizedName(n,o),this.headers.has(o)?this.headers.get(o).push(a):this.headers.set(o,[a])}})}:typeof Headers<"u"&&e instanceof Headers?(this.headers=new Map,e.forEach((s,t)=>{this.setHeaderEntries(t,s)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(e).forEach(([s,t])=>{this.setHeaderEntries(s,t)})}:this.headers=new Map}has(e){return this.init(),this.headers.has(e.toLowerCase())}get(e){this.init();let s=this.headers.get(e.toLowerCase());return s&&s.length>0?s[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(e){return this.init(),this.headers.get(e.toLowerCase())||null}append(e,s){return this.clone({name:e,value:s,op:"a"})}set(e,s){return this.clone({name:e,value:s,op:"s"})}delete(e,s){return this.clone({name:e,value:s,op:"d"})}maybeSetNormalizedName(e,s){this.normalizedNames.has(s)||this.normalizedNames.set(s,e)}init(){this.lazyInit&&(this.lazyInit instanceof r?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(e=>this.applyUpdate(e)),this.lazyUpdate=null))}copyFrom(e){e.init(),Array.from(e.headers.keys()).forEach(s=>{this.headers.set(s,e.headers.get(s)),this.normalizedNames.set(s,e.normalizedNames.get(s))})}clone(e){let s=new r;return s.lazyInit=this.lazyInit&&this.lazyInit instanceof r?this.lazyInit:this,s.lazyUpdate=(this.lazyUpdate||[]).concat([e]),s}applyUpdate(e){let s=e.name.toLowerCase();switch(e.op){case"a":case"s":let t=e.value;if(typeof t=="string"&&(t=[t]),t.length===0)return;this.maybeSetNormalizedName(e.name,s);let n=(e.op==="a"?this.headers.get(s):void 0)||[];n.push(...t),this.headers.set(s,n);break;case"d":let o=e.value;if(!o)this.headers.delete(s),this.normalizedNames.delete(s);else{let a=this.headers.get(s);if(!a)return;a=a.filter(i=>o.indexOf(i)===-1),a.length===0?(this.headers.delete(s),this.normalizedNames.delete(s)):this.headers.set(s,a)}break}}setHeaderEntries(e,s){let t=(Array.isArray(s)?s:[s]).map(o=>o.toString()),n=e.toLowerCase();this.headers.set(n,t),this.maybeSetNormalizedName(e,n)}forEach(e){this.init(),Array.from(this.normalizedNames.keys()).forEach(s=>e(this.normalizedNames.get(s),this.headers.get(s)))}};var Ae=class{encodeKey(e){return ut(e)}encodeValue(e){return ut(e)}decodeKey(e){return decodeURIComponent(e)}decodeValue(e){return decodeURIComponent(e)}};function jt(r,e){let s=new Map;return r.length>0&&r.replace(/^\?/,"").split("&").forEach(n=>{let o=n.indexOf("="),[a,i]=o==-1?[e.decodeKey(n),""]:[e.decodeKey(n.slice(0,o)),e.decodeValue(n.slice(o+1))],l=s.get(a)||[];l.push(i),s.set(a,l)}),s}var Ft=/%(\d[a-f0-9])/gi,Ut={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function ut(r){return encodeURIComponent(r).replace(Ft,(e,s)=>Ut[s]??e)}function ie(r){return`${r}`}var I=class r{constructor(e={}){if(this.updates=null,this.cloneFrom=null,this.encoder=e.encoder||new Ae,e.fromString){if(e.fromObject)throw new Error("Cannot specify both fromString and fromObject.");this.map=jt(e.fromString,this.encoder)}else e.fromObject?(this.map=new Map,Object.keys(e.fromObject).forEach(s=>{let t=e.fromObject[s],n=Array.isArray(t)?t.map(ie):[ie(t)];this.map.set(s,n)})):this.map=null}has(e){return this.init(),this.map.has(e)}get(e){this.init();let s=this.map.get(e);return s?s[0]:null}getAll(e){return this.init(),this.map.get(e)||null}keys(){return this.init(),Array.from(this.map.keys())}append(e,s){return this.clone({param:e,value:s,op:"a"})}appendAll(e){let s=[];return Object.keys(e).forEach(t=>{let n=e[t];Array.isArray(n)?n.forEach(o=>{s.push({param:t,value:o,op:"a"})}):s.push({param:t,value:n,op:"a"})}),this.clone(s)}set(e,s){return this.clone({param:e,value:s,op:"s"})}delete(e,s){return this.clone({param:e,value:s,op:"d"})}toString(){return this.init(),this.keys().map(e=>{let s=this.encoder.encodeKey(e);return this.map.get(e).map(t=>s+"="+this.encoder.encodeValue(t)).join("&")}).filter(e=>e!=="").join("&")}clone(e){let s=new r({encoder:this.encoder});return s.cloneFrom=this.cloneFrom||this,s.updates=(this.updates||[]).concat(e),s}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(e=>this.map.set(e,this.cloneFrom.map.get(e))),this.updates.forEach(e=>{switch(e.op){case"a":case"s":let s=(e.op==="a"?this.map.get(e.param):void 0)||[];s.push(ie(e.value)),this.map.set(e.param,s);break;case"d":if(e.value!==void 0){let t=this.map.get(e.param)||[],n=t.indexOf(ie(e.value));n!==-1&&t.splice(n,1),t.length>0?this.map.set(e.param,t):this.map.delete(e.param)}else{this.map.delete(e.param);break}}}),this.cloneFrom=this.updates=null)}};var De=class{constructor(){this.map=new Map}set(e,s){return this.map.set(e,s),this}get(e){return this.map.has(e)||this.map.set(e,e.defaultValue()),this.map.get(e)}delete(e){return this.map.delete(e),this}has(e){return this.map.has(e)}keys(){return this.map.keys()}};function _t(r){switch(r){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function ht(r){return typeof ArrayBuffer<"u"&&r instanceof ArrayBuffer}function ft(r){return typeof Blob<"u"&&r instanceof Blob}function pt(r){return typeof FormData<"u"&&r instanceof FormData}function Bt(r){return typeof URLSearchParams<"u"&&r instanceof URLSearchParams}var X=class r{constructor(e,s,t,n){this.url=s,this.body=null,this.reportProgress=!1,this.withCredentials=!1,this.responseType="json",this.method=e.toUpperCase();let o;if(_t(this.method)||n?(this.body=t!==void 0?t:null,o=n):o=t,o&&(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),this.transferCache=o.transferCache),this.headers??=new O,this.context??=new De,!this.params)this.params=new I,this.urlWithParams=s;else{let a=this.params.toString();if(a.length===0)this.urlWithParams=s;else{let i=s.indexOf("?"),l=i===-1?"?":i<s.length-1?"&":"";this.urlWithParams=s+l+a}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||ht(this.body)||ft(this.body)||pt(this.body)||Bt(this.body)?this.body:this.body instanceof I?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||pt(this.body)?null:ft(this.body)?this.body.type||null:ht(this.body)?null:typeof this.body=="string"?"text/plain":this.body instanceof I?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?"application/json":null}clone(e={}){let s=e.method||this.method,t=e.url||this.url,n=e.responseType||this.responseType,o=e.transferCache??this.transferCache,a=e.body!==void 0?e.body:this.body,i=e.withCredentials??this.withCredentials,l=e.reportProgress??this.reportProgress,c=e.headers||this.headers,u=e.params||this.params,h=e.context??this.context;return e.setHeaders!==void 0&&(c=Object.keys(e.setHeaders).reduce((y,T)=>y.set(T,e.setHeaders[T]),c)),e.setParams&&(u=Object.keys(e.setParams).reduce((y,T)=>y.set(T,e.setParams[T]),u)),new r(s,t,a,{params:u,headers:c,context:h,reportProgress:l,responseType:n,withCredentials:i,transferCache:o})}},D=function(r){return r[r.Sent=0]="Sent",r[r.UploadProgress=1]="UploadProgress",r[r.ResponseHeader=2]="ResponseHeader",r[r.DownloadProgress=3]="DownloadProgress",r[r.Response=4]="Response",r[r.User=5]="User",r}(D||{}),K=class{constructor(e,s=200,t="OK"){this.headers=e.headers||new O,this.status=e.status!==void 0?e.status:s,this.statusText=e.statusText||t,this.url=e.url||null,this.ok=this.status>=200&&this.status<300}},ce=class r extends K{constructor(e={}){super(e),this.type=D.ResponseHeader}clone(e={}){return new r({headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},F=class r extends K{constructor(e={}){super(e),this.type=D.Response,this.body=e.body!==void 0?e.body:null}clone(e={}){return new r({body:e.body!==void 0?e.body:this.body,headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},b=class extends K{constructor(e){super(e,0,"Unknown Error"),this.name="HttpErrorResponse",this.ok=!1,this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${e.url||"(unknown url)"}`:this.message=`Http failure response for ${e.url||"(unknown url)"}: ${e.status} ${e.statusText}`,this.error=e.error||null}},Pe=200,zt=204;function Me(r,e){return{body:e,headers:r.headers,context:r.context,observe:r.observe,params:r.params,reportProgress:r.reportProgress,responseType:r.responseType,withCredentials:r.withCredentials,transferCache:r.transferCache}}var Vt=(()=>{let e=class e{constructor(t){this.handler=t}request(t,n,o={}){let a;if(t instanceof X)a=t;else{let c;o.headers instanceof O?c=o.headers:c=new O(o.headers);let u;o.params&&(o.params instanceof I?u=o.params:u=new I({fromObject:o.params})),a=new X(t,n,o.body!==void 0?o.body:null,{headers:c,context:o.context,params:u,reportProgress:o.reportProgress,responseType:o.responseType||"json",withCredentials:o.withCredentials,transferCache:o.transferCache})}let i=ye(a).pipe(Ve(c=>this.handler.handle(c)));if(t instanceof X||o.observe==="events")return i;let l=i.pipe(ze(c=>c instanceof F));switch(o.observe||"body"){case"body":switch(a.responseType){case"arraybuffer":return l.pipe(V(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new Error("Response is not an ArrayBuffer.");return c.body}));case"blob":return l.pipe(V(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new Error("Response is not a Blob.");return c.body}));case"text":return l.pipe(V(c=>{if(c.body!==null&&typeof c.body!="string")throw new Error("Response is not a string.");return c.body}));case"json":default:return l.pipe(V(c=>c.body))}case"response":return l;default:throw new Error(`Unreachable: unhandled observe type ${o.observe}}`)}}delete(t,n={}){return this.request("DELETE",t,n)}get(t,n={}){return this.request("GET",t,n)}head(t,n={}){return this.request("HEAD",t,n)}jsonp(t,n){return this.request("JSONP",t,{params:new I().append(n,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,n={}){return this.request("OPTIONS",t,n)}patch(t,n,o={}){return this.request("PATCH",t,Me(o,n))}post(t,n,o={}){return this.request("POST",t,Me(o,n))}put(t,n,o={}){return this.request("PUT",t,Me(o,n))}};e.\u0275fac=function(n){return new(n||e)(d(J))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let r=e;return r})(),$t=/^\)\]\}',?\n/,Gt="X-Request-URL";function yt(r){if(r.url)return r.url;let e=Gt.toLocaleLowerCase();return r.headers.get(e)}var Xt=(()=>{let e=class e{constructor(){this.fetchImpl=v(Oe,{optional:!0})?.fetch??fetch.bind(globalThis),this.ngZone=v(A)}handle(t){return new Q(n=>{let o=new AbortController;return this.doRequest(t,o.signal,n).then(Ne,a=>n.error(new b({error:a}))),()=>o.abort()})}doRequest(t,n,o){return pe(this,null,function*(){let a=this.createRequestInit(t),i;try{let w=this.fetchImpl(t.urlWithParams,z({signal:n},a));Jt(w),o.next({type:D.Sent}),i=yield w}catch(w){o.error(new b({error:w,status:w.status??0,statusText:w.statusText,url:t.urlWithParams,headers:w.headers}));return}let l=new O(i.headers),c=i.statusText,u=yt(i)??t.urlWithParams,h=i.status,y=null;if(t.reportProgress&&o.next(new ce({headers:l,status:h,statusText:c,url:u})),i.body){let w=i.headers.get("content-length"),U=[],f=i.body.getReader(),p=0,N,C,g=typeof Zone<"u"&&Zone.current;yield this.ngZone.runOutsideAngular(()=>pe(this,null,function*(){for(;;){let{done:S,value:B}=yield f.read();if(S)break;if(U.push(B),p+=B.length,t.reportProgress){C=t.responseType==="text"?(C??"")+(N??=new TextDecoder).decode(B,{stream:!0}):void 0;let Ue=()=>o.next({type:D.DownloadProgress,total:w?+w:void 0,loaded:p,partialText:C});g?g.run(Ue):Ue()}}}));let _=this.concatChunks(U,p);try{let S=i.headers.get("Content-Type")??"";y=this.parseBody(t,_,S)}catch(S){o.error(new b({error:S,headers:new O(i.headers),status:i.status,statusText:i.statusText,url:yt(i)??t.urlWithParams}));return}}h===0&&(h=y?Pe:0),h>=200&&h<300?(o.next(new F({body:y,headers:l,status:h,statusText:c,url:u})),o.complete()):o.error(new b({error:y,headers:l,status:h,statusText:c,url:u}))})}parseBody(t,n,o){switch(t.responseType){case"json":let a=new TextDecoder().decode(n).replace($t,"");return a===""?null:JSON.parse(a);case"text":return new TextDecoder().decode(n);case"blob":return new Blob([n],{type:o});case"arraybuffer":return n.buffer}}createRequestInit(t){let n={},o=t.withCredentials?"include":void 0;if(t.headers.forEach((a,i)=>n[a]=i.join(",")),n.Accept??="application/json, text/plain, */*",!n["Content-Type"]){let a=t.detectContentTypeHeader();a!==null&&(n["Content-Type"]=a)}return{body:t.serializeBody(),method:t.method,headers:n,credentials:o}}concatChunks(t,n){let o=new Uint8Array(n),a=0;for(let i of t)o.set(i,a),a+=i.length;return o}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=m({token:e,factory:e.\u0275fac});let r=e;return r})(),Oe=class{};function Ne(){}function Jt(r){r.then(Ne,Ne)}function Et(r,e){return e(r)}function Kt(r,e){return(s,t)=>e.intercept(s,{handle:n=>r(n,t)})}function Wt(r,e,s){return(t,n)=>Je(s,()=>e(t,o=>r(o,n)))}var Zt=new R(""),ue=new R(""),qt=new R(""),wt=new R("",{providedIn:"root",factory:()=>!0});function Yt(){let r=null;return(e,s)=>{r===null&&(r=(v(Zt,{optional:!0})??[]).reduceRight(Kt,Et));let t=v(we);if(v(wt)){let o=t.add();return r(e,s).pipe(me(()=>t.remove(o)))}else return r(e,s)}}var mt=(()=>{let e=class e extends J{constructor(t,n){super(),this.backend=t,this.injector=n,this.chain=null,this.pendingTasks=v(we),this.contributeToStability=v(wt)}handle(t){if(this.chain===null){let n=Array.from(new Set([...this.injector.get(ue),...this.injector.get(qt,[])]));this.chain=n.reduceRight((o,a)=>Wt(o,a,this.injector),Et)}if(this.contributeToStability){let n=this.pendingTasks.add();return this.chain(t,o=>this.backend.handle(o)).pipe(me(()=>this.pendingTasks.remove(n)))}else return this.chain(t,n=>this.backend.handle(n))}};e.\u0275fac=function(n){return new(n||e)(d(ae),d(Xe))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let r=e;return r})(),Qt=0,gt,Ht="JSONP injected script did not invoke callback.",en="JSONP requests must use JSONP request method.",tn="JSONP requests must use Json response type.",nn="JSONP requests do not support headers.",le=class{};function rn(){return typeof window=="object"?window:{}}var Rt=(()=>{let e=class e{constructor(t,n){this.callbackMap=t,this.document=n,this.resolvedPromise=Promise.resolve()}nextCallback(){return`ng_jsonp_callback_${Qt++}`}handle(t){if(t.method!=="JSONP")throw new Error(en);if(t.responseType!=="json")throw new Error(tn);if(t.headers.keys().length>0)throw new Error(nn);return new Q(n=>{let o=this.nextCallback(),a=t.urlWithParams.replace(/=JSONP_CALLBACK(&|$)/,`=${o}$1`),i=this.document.createElement("script");i.src=a;let l=null,c=!1;this.callbackMap[o]=T=>{delete this.callbackMap[o],l=T,c=!0};let u=()=>{i.parentNode&&i.parentNode.removeChild(i),delete this.callbackMap[o]},h=T=>{this.resolvedPromise.then(()=>{if(u(),!c){n.error(new b({url:a,status:0,statusText:"JSONP Error",error:new Error(Ht)}));return}n.next(new F({body:l,status:Pe,statusText:"OK",url:a})),n.complete()})},y=T=>{u(),n.error(new b({error:T,status:0,statusText:"JSONP Error",url:a}))};return i.addEventListener("load",h),i.addEventListener("error",y),this.document.body.appendChild(i),n.next({type:D.Sent}),()=>{c||this.removeListeners(i),u()}})}removeListeners(t){gt??=this.document.implementation.createHTMLDocument(),gt.adoptNode(t)}};e.\u0275fac=function(n){return new(n||e)(d(le),d(E))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let r=e;return r})();function sn(r,e){return r.method==="JSONP"?v(Rt).handle(r):e(r)}var on=/^\)\]\}',?\n/;function an(r){return"responseURL"in r&&r.responseURL?r.responseURL:/^X-Request-URL:/m.test(r.getAllResponseHeaders())?r.getResponseHeader("X-Request-URL"):null}var vt=(()=>{let e=class e{constructor(t){this.xhrFactory=t}handle(t){if(t.method==="JSONP")throw new M(-2800,!1);let n=this.xhrFactory;return(n.\u0275loadImpl?Be(n.\u0275loadImpl()):ye(null)).pipe($e(()=>new Q(a=>{let i=n.build();if(i.open(t.method,t.urlWithParams),t.withCredentials&&(i.withCredentials=!0),t.headers.forEach((f,p)=>i.setRequestHeader(f,p.join(","))),t.headers.has("Accept")||i.setRequestHeader("Accept","application/json, text/plain, */*"),!t.headers.has("Content-Type")){let f=t.detectContentTypeHeader();f!==null&&i.setRequestHeader("Content-Type",f)}if(t.responseType){let f=t.responseType.toLowerCase();i.responseType=f!=="json"?f:"text"}let l=t.serializeBody(),c=null,u=()=>{if(c!==null)return c;let f=i.statusText||"OK",p=new O(i.getAllResponseHeaders()),N=an(i)||t.url;return c=new ce({headers:p,status:i.status,statusText:f,url:N}),c},h=()=>{let{headers:f,status:p,statusText:N,url:C}=u(),g=null;p!==zt&&(g=typeof i.response>"u"?i.responseText:i.response),p===0&&(p=g?Pe:0);let _=p>=200&&p<300;if(t.responseType==="json"&&typeof g=="string"){let S=g;g=g.replace(on,"");try{g=g!==""?JSON.parse(g):null}catch(B){g=S,_&&(_=!1,g={error:B,text:g})}}_?(a.next(new F({body:g,headers:f,status:p,statusText:N,url:C||void 0})),a.complete()):a.error(new b({error:g,headers:f,status:p,statusText:N,url:C||void 0}))},y=f=>{let{url:p}=u(),N=new b({error:f,status:i.status||0,statusText:i.statusText||"Unknown Error",url:p||void 0});a.error(N)},T=!1,w=f=>{T||(a.next(u()),T=!0);let p={type:D.DownloadProgress,loaded:f.loaded};f.lengthComputable&&(p.total=f.total),t.responseType==="text"&&i.responseText&&(p.partialText=i.responseText),a.next(p)},U=f=>{let p={type:D.UploadProgress,loaded:f.loaded};f.lengthComputable&&(p.total=f.total),a.next(p)};return i.addEventListener("load",h),i.addEventListener("error",y),i.addEventListener("timeout",y),i.addEventListener("abort",y),t.reportProgress&&(i.addEventListener("progress",w),l!==null&&i.upload&&i.upload.addEventListener("progress",U)),i.send(l),a.next({type:D.Sent}),()=>{i.removeEventListener("error",y),i.removeEventListener("abort",y),i.removeEventListener("load",h),i.removeEventListener("timeout",y),t.reportProgress&&(i.removeEventListener("progress",w),l!==null&&i.upload&&i.upload.removeEventListener("progress",U)),i.readyState!==i.DONE&&i.abort()}})))}};e.\u0275fac=function(n){return new(n||e)(d(oe))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let r=e;return r})(),bt=new R(""),cn="XSRF-TOKEN",ln=new R("",{providedIn:"root",factory:()=>cn}),dn="X-XSRF-TOKEN",un=new R("",{providedIn:"root",factory:()=>dn}),de=class{},hn=(()=>{let e=class e{constructor(t,n,o){this.doc=t,this.platform=n,this.cookieName=o,this.lastCookieString="",this.lastToken=null,this.parseCount=0}getToken(){if(this.platform==="server")return null;let t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=re(t,this.cookieName),this.lastCookieString=t),this.lastToken}};e.\u0275fac=function(n){return new(n||e)(d(E),d(L),d(ln))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let r=e;return r})();function fn(r,e){let s=r.url.toLowerCase();if(!v(bt)||r.method==="GET"||r.method==="HEAD"||s.startsWith("http://")||s.startsWith("https://"))return e(r);let t=v(de).getToken(),n=v(un);return t!=null&&!r.headers.has(n)&&(r=r.clone({headers:r.headers.set(n,t)})),e(r)}var Ie=function(r){return r[r.Interceptors=0]="Interceptors",r[r.LegacyInterceptors=1]="LegacyInterceptors",r[r.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",r[r.NoXsrfProtection=3]="NoXsrfProtection",r[r.JsonpSupport=4]="JsonpSupport",r[r.RequestsMadeViaParent=5]="RequestsMadeViaParent",r[r.Fetch=6]="Fetch",r}(Ie||{});function Mt(r,e){return{\u0275kind:r,\u0275providers:e}}function tr(...r){let e=[Vt,vt,mt,{provide:J,useExisting:mt},{provide:ae,useFactory:()=>v(Xt,{optional:!0})??v(vt)},{provide:ue,useValue:fn,multi:!0},{provide:bt,useValue:!0},{provide:de,useClass:hn}];for(let s of r)e.push(...s.\u0275providers);return Te(e)}var Tt=new R("");function nr(){return Mt(Ie.LegacyInterceptors,[{provide:Tt,useFactory:Yt},{provide:ue,useExisting:Tt,multi:!0}])}function rr(){return Mt(Ie.JsonpSupport,[Rt,{provide:le,useFactory:rn},{provide:ue,useValue:sn,multi:!0}])}var ke=class extends ct{constructor(){super(...arguments),this.supportsDOMEvents=!0}},Ce=class r extends ke{static makeCurrent(){at(new r)}onAndCancel(e,s,t){return e.addEventListener(s,t),()=>{e.removeEventListener(s,t)}}dispatchEvent(e,s){e.dispatchEvent(s)}remove(e){e.parentNode&&e.parentNode.removeChild(e)}createElement(e,s){return s=s||this.getDefaultDocument(),s.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,s){return s==="window"?window:s==="document"?e:s==="body"?e.body:null}getBaseHref(e){let s=yn();return s==null?null:mn(s)}resetBaseElement(){W=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return re(document.cookie,e)}},W=null;function yn(){return W=W||document.querySelector("base"),W?W.getAttribute("href"):null}function mn(r){return new URL(r,document.baseURI).pathname}var xe=class{addToWindow(e){P.getAngularTestability=(t,n=!0)=>{let o=e.findTestabilityInTree(t,n);if(o==null)throw new M(5103,!1);return o},P.getAllAngularTestabilities=()=>e.getAllTestabilities(),P.getAllAngularRootElements=()=>e.getAllRootElements();let s=t=>{let n=P.getAllAngularTestabilities(),o=n.length,a=function(){o--,o==0&&t()};n.forEach(i=>{i.whenStable(a)})};P.frameworkStabilizers||(P.frameworkStabilizers=[]),P.frameworkStabilizers.push(s)}findTestabilityInTree(e,s,t){if(s==null)return null;let n=e.getTestability(s);return n??(t?ne().isShadowRoot(s)?this.findTestabilityInTree(e,s.host,!0):this.findTestabilityInTree(e,s.parentElement,!0):null)}},gn=(()=>{let e=class e{build(){return new XMLHttpRequest}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=m({token:e,factory:e.\u0275fac});let r=e;return r})(),he=new R(""),Nt=(()=>{let e=class e{constructor(t,n){this._zone=n,this._eventNameToPlugin=new Map,t.forEach(o=>{o.manager=this}),this._plugins=t.slice().reverse()}addEventListener(t,n,o){return this._findPluginFor(n).addEventListener(t,n,o)}getZone(){return this._zone}_findPluginFor(t){let n=this._eventNameToPlugin.get(t);if(n)return n;if(n=this._plugins.find(a=>a.supports(t)),!n)throw new M(5101,!1);return this._eventNameToPlugin.set(t,n),n}};e.\u0275fac=function(n){return new(n||e)(d(he),d(A))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let r=e;return r})(),Z=class{constructor(e){this._doc=e}},Se="ng-app-id",Pt=(()=>{let e=class e{constructor(t,n,o,a={}){this.doc=t,this.appId=n,this.nonce=o,this.platformId=a,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=se(a),this.resetHostNodes()}addStyles(t){for(let n of t)this.changeUsageCount(n,1)===1&&this.onStyleAdded(n)}removeStyles(t){for(let n of t)this.changeUsageCount(n,-1)<=0&&this.onStyleRemoved(n)}ngOnDestroy(){let t=this.styleNodesInDOM;t&&(t.forEach(n=>n.remove()),t.clear());for(let n of this.getAllStyles())this.onStyleRemoved(n);this.resetHostNodes()}addHost(t){this.hostNodes.add(t);for(let n of this.getAllStyles())this.addStyleToHost(t,n)}removeHost(t){this.hostNodes.delete(t)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(t){for(let n of this.hostNodes)this.addStyleToHost(n,t)}onStyleRemoved(t){let n=this.styleRef;n.get(t)?.elements?.forEach(o=>o.remove()),n.delete(t)}collectServerRenderedStyles(){let t=this.doc.head?.querySelectorAll(`style[${Se}="${this.appId}"]`);if(t?.length){let n=new Map;return t.forEach(o=>{o.textContent!=null&&n.set(o.textContent,o)}),n}return null}changeUsageCount(t,n){let o=this.styleRef;if(o.has(t)){let a=o.get(t);return a.usage+=n,a.usage}return o.set(t,{usage:n,elements:[]}),n}getStyleElement(t,n){let o=this.styleNodesInDOM,a=o?.get(n);if(a?.parentNode===t)return o.delete(n),a.removeAttribute(Se),a;{let i=this.doc.createElement("style");return this.nonce&&i.setAttribute("nonce",this.nonce),i.textContent=n,this.platformIsServer&&i.setAttribute(Se,this.appId),t.appendChild(i),i}}addStyleToHost(t,n){let o=this.getStyleElement(t,n),a=this.styleRef,i=a.get(n)?.elements;i?i.push(o):a.set(n,{elements:[o],usage:1})}resetHostNodes(){let t=this.hostNodes;t.clear(),t.add(this.doc.head)}};e.\u0275fac=function(n){return new(n||e)(d(E),d(H),d(Re,8),d(L))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let r=e;return r})(),Le={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Fe=/%COMP%/g,It="%COMP%",vn=`_nghost-${It}`,Tn=`_ngcontent-${It}`,En=!0,wn=new R("",{providedIn:"root",factory:()=>En});function Rn(r){return Tn.replace(Fe,r)}function bn(r){return vn.replace(Fe,r)}function St(r,e){return e.map(s=>s.replace(Fe,r))}var At=(()=>{let e=class e{constructor(t,n,o,a,i,l,c,u=null){this.eventManager=t,this.sharedStylesHost=n,this.appId=o,this.removeStylesOnCompDestroy=a,this.doc=i,this.platformId=l,this.ngZone=c,this.nonce=u,this.rendererByCompId=new Map,this.platformIsServer=se(l),this.defaultRenderer=new q(t,i,c,this.platformIsServer)}createRenderer(t,n){if(!t||!n)return this.defaultRenderer;this.platformIsServer&&n.encapsulation===$.ShadowDom&&(n=_e(z({},n),{encapsulation:$.Emulated}));let o=this.getOrCreateRenderer(t,n);return o instanceof fe?o.applyToHost(t):o instanceof Y&&o.applyStyles(),o}getOrCreateRenderer(t,n){let o=this.rendererByCompId,a=o.get(n.id);if(!a){let i=this.doc,l=this.ngZone,c=this.eventManager,u=this.sharedStylesHost,h=this.removeStylesOnCompDestroy,y=this.platformIsServer;switch(n.encapsulation){case $.Emulated:a=new fe(c,u,n,this.appId,h,i,l,y);break;case $.ShadowDom:return new je(c,u,t,n,i,l,this.nonce,y);default:a=new Y(c,u,n,h,i,l,y);break}o.set(n.id,a)}return a}ngOnDestroy(){this.rendererByCompId.clear()}};e.\u0275fac=function(n){return new(n||e)(d(Nt),d(Pt),d(H),d(wn),d(E),d(L),d(A),d(Re))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let r=e;return r})(),q=class{constructor(e,s,t,n){this.eventManager=e,this.doc=s,this.ngZone=t,this.platformIsServer=n,this.data=Object.create(null),this.throwOnSyntheticProps=!0,this.destroyNode=null}destroy(){}createElement(e,s){return s?this.doc.createElementNS(Le[s]||s,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,s){(Dt(e)?e.content:e).appendChild(s)}insertBefore(e,s,t){e&&(Dt(e)?e.content:e).insertBefore(s,t)}removeChild(e,s){e&&e.removeChild(s)}selectRootElement(e,s){let t=typeof e=="string"?this.doc.querySelector(e):e;if(!t)throw new M(-5104,!1);return s||(t.textContent=""),t}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,s,t,n){if(n){s=n+":"+s;let o=Le[n];o?e.setAttributeNS(o,s,t):e.setAttribute(s,t)}else e.setAttribute(s,t)}removeAttribute(e,s,t){if(t){let n=Le[t];n?e.removeAttributeNS(n,s):e.removeAttribute(`${t}:${s}`)}else e.removeAttribute(s)}addClass(e,s){e.classList.add(s)}removeClass(e,s){e.classList.remove(s)}setStyle(e,s,t,n){n&(G.DashCase|G.Important)?e.style.setProperty(s,t,n&G.Important?"important":""):e.style[s]=t}removeStyle(e,s,t){t&G.DashCase?e.style.removeProperty(s):e.style[s]=""}setProperty(e,s,t){e!=null&&(e[s]=t)}setValue(e,s){e.nodeValue=s}listen(e,s,t){if(typeof e=="string"&&(e=ne().getGlobalEventTarget(this.doc,e),!e))throw new Error(`Unsupported event target ${e} for event ${s}`);return this.eventManager.addEventListener(e,s,this.decoratePreventDefault(t))}decoratePreventDefault(e){return s=>{if(s==="__ngUnwrap__")return e;(this.platformIsServer?this.ngZone.runGuarded(()=>e(s)):e(s))===!1&&s.preventDefault()}}};function Dt(r){return r.tagName==="TEMPLATE"&&r.content!==void 0}var je=class extends q{constructor(e,s,t,n,o,a,i,l){super(e,o,a,l),this.sharedStylesHost=s,this.hostEl=t,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let c=St(n.id,n.styles);for(let u of c){let h=document.createElement("style");i&&h.setAttribute("nonce",i),h.textContent=u,this.shadowRoot.appendChild(h)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,s){return super.appendChild(this.nodeOrShadowRoot(e),s)}insertBefore(e,s,t){return super.insertBefore(this.nodeOrShadowRoot(e),s,t)}removeChild(e,s){return super.removeChild(this.nodeOrShadowRoot(e),s)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},Y=class extends q{constructor(e,s,t,n,o,a,i,l){super(e,o,a,i),this.sharedStylesHost=s,this.removeStylesOnCompDestroy=n,this.styles=l?St(l,t.styles):t.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles)}},fe=class extends Y{constructor(e,s,t,n,o,a,i,l){let c=n+"-"+t.id;super(e,s,t,o,a,i,l,c),this.contentAttr=Rn(c),this.hostAttr=bn(c)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,s){let t=super.createElement(e,s);return super.setAttribute(t,this.contentAttr,""),t}},Mn=(()=>{let e=class e extends Z{constructor(t){super(t)}supports(t){return!0}addEventListener(t,n,o){return t.addEventListener(n,o,!1),()=>this.removeEventListener(t,n,o)}removeEventListener(t,n,o){return t.removeEventListener(n,o)}};e.\u0275fac=function(n){return new(n||e)(d(E))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let r=e;return r})(),An=(()=>{let e=class e extends Z{constructor(t){super(t),this.delegate=v(it,{optional:!0})}supports(t){return this.delegate?this.delegate.supports(t):!1}addEventListener(t,n,o){return this.delegate.addEventListener(t,n,o)}removeEventListener(t,n,o){return this.delegate.removeEventListener(t,n,o)}};e.\u0275fac=function(n){return new(n||e)(d(E))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let r=e;return r})(),Ot=["alt","control","meta","shift"],Dn={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},On={alt:r=>r.altKey,control:r=>r.ctrlKey,meta:r=>r.metaKey,shift:r=>r.shiftKey},Nn=(()=>{let e=class e extends Z{constructor(t){super(t)}supports(t){return e.parseEventName(t)!=null}addEventListener(t,n,o){let a=e.parseEventName(n),i=e.eventCallback(a.fullKey,o,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>ne().onAndCancel(t,a.domEventName,i))}static parseEventName(t){let n=t.toLowerCase().split("."),o=n.shift();if(n.length===0||!(o==="keydown"||o==="keyup"))return null;let a=e._normalizeKey(n.pop()),i="",l=n.indexOf("code");if(l>-1&&(n.splice(l,1),i="code."),Ot.forEach(u=>{let h=n.indexOf(u);h>-1&&(n.splice(h,1),i+=u+".")}),i+=a,n.length!=0||a.length===0)return null;let c={};return c.domEventName=o,c.fullKey=i,c}static matchEventFullKeyCode(t,n){let o=Dn[t.key]||t.key,a="";return n.indexOf("code.")>-1&&(o=t.code,a="code."),o==null||!o?!1:(o=o.toLowerCase(),o===" "?o="space":o==="."&&(o="dot"),Ot.forEach(i=>{if(i!==o){let l=On[i];l(t)&&(a+=i+".")}}),a+=o,a===n)}static eventCallback(t,n,o){return a=>{e.matchEventFullKeyCode(a,t)&&o.runGuarded(()=>n(a))}}static _normalizeKey(t){return t==="esc"?"escape":t}};e.\u0275fac=function(n){return new(n||e)(d(E))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let r=e;return r})();function Rr(r,e){return ot(z({rootComponent:r},Pn(e)))}function Pn(r){return{appProviders:[...Lt,...r?.providers??[]],platformProviders:kn}}function In(){Ce.makeCurrent()}function Sn(){return new Ee}function Ln(){return Ke(document),document}var kn=[{provide:L,useValue:dt},{provide:We,useValue:In,multi:!0},{provide:E,useFactory:Ln,deps:[]}];var Cn=new R(""),xn=[{provide:ee,useClass:xe,deps:[]},{provide:rt,useClass:te,deps:[A,be,ee]},{provide:te,useClass:te,deps:[A,be,ee]}],Lt=[{provide:Ge,useValue:"root"},{provide:Ee,useFactory:Sn,deps:[]},{provide:he,useClass:Mn,multi:!0,deps:[E,A,L]},{provide:he,useClass:Nn,multi:!0,deps:[E]},{provide:he,useClass:An,multi:!0},At,Pt,Nt,{provide:nt,useExisting:At},{provide:oe,useClass:gn,deps:[]},[]],br=(()=>{let e=class e{constructor(t){}static withServerTransition(t){return{ngModule:e,providers:[{provide:H,useValue:t.appId}]}}};e.\u0275fac=function(n){return new(n||e)(d(Cn,12))},e.\u0275mod=ve({type:e}),e.\u0275inj=ge({providers:[...Lt,...xn],imports:[lt,st]});let r=e;return r})();var Mr=(()=>{let e=class e{constructor(t){this._doc=t}getTitle(){return this._doc.title}setTitle(t){this._doc.title=t||""}};e.\u0275fac=function(n){return new(n||e)(d(E))},e.\u0275prov=m({token:e,factory:e.\u0275fac,providedIn:"root"});let r=e;return r})();var jn=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=m({token:e,factory:function(n){let o=null;return n?o=new(n||e):o=d(Fn),o},providedIn:"root"});let r=e;return r})(),Fn=(()=>{let e=class e extends jn{constructor(t){super(),this._doc=t}sanitize(t,n){if(n==null)return null;switch(t){case k.NONE:return n;case k.HTML:return j(n,"HTML")?x(n):tt(this._doc,String(n)).toString();case k.STYLE:return j(n,"Style")?x(n):n;case k.SCRIPT:if(j(n,"Script"))return x(n);throw new M(5200,!1);case k.URL:return j(n,"URL")?x(n):et(String(n));case k.RESOURCE_URL:if(j(n,"ResourceURL"))return x(n);throw new M(5201,!1);default:throw new M(5202,!1)}}bypassSecurityTrustHtml(t){return Ze(t)}bypassSecurityTrustStyle(t){return qe(t)}bypassSecurityTrustScript(t){return Ye(t)}bypassSecurityTrustUrl(t){return Qe(t)}bypassSecurityTrustResourceUrl(t){return He(t)}};e.\u0275fac=function(n){return new(n||e)(d(E))},e.\u0275prov=m({token:e,factory:e.\u0275fac,providedIn:"root"});let r=e;return r})();export{O as a,I as b,F as c,Vt as d,Zt as e,tr as f,nr as g,rr as h,Nt as i,At as j,Rr as k,br as l,Mr as m,jn as n};
