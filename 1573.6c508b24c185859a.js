"use strict";(self.webpackChunkopensource_documentation=self.webpackChunkopensource_documentation||[]).push([[1573],{1573:(U,f,i)=>{i.r(f),i.d(f,{PageExamplesModule:()=>B});var d=i(3144),x=i(6496),m=i(7504),g=i(3454),k=i(1692),e=i(2223),u=i(4755),C=i(4400),p=i(2658),l=i(6078);function E(t,o){if(1&t){const n=e.EpF();e.TgZ(0,"div",5)(1,"button",6),e.NdJ("click",function(){e.CHM(n);const c=e.oxw();return e.KtG(c.onButtonClick())}),e._uU(2),e.qZA()()}if(2&t){const n=e.oxw();e.Q6J("nxCol",n.buttonLayout),e.xp6(2),e.Oqu(n.buttonLabel)}}const b=["*"];let _=(()=>{class t{set buttonLabel(n){this._buttonLabel!==n&&(this._buttonLabel=n,this._cdr.markForCheck())}get buttonLabel(){return this._buttonLabel}set hideSearchButton(n){this._hideSearchButton=(0,k.Ig)(n),this._cdr.markForCheck()}get hideSearchButton(){return this._hideSearchButton}set buttonLayout(n){this._buttonLayout!==n&&(this._buttonLayout=n,this._cdr.markForCheck())}get buttonLayout(){return this._buttonLayout}set contentLayout(n){this._contentLayout!==n&&(this._contentLayout=n,this._cdr.markForCheck())}get contentLayout(){return this._contentLayout?this._contentLayout:this.hideSearchButton?"12":"12,12,12,10"}constructor(n){this._cdr=n,this._buttonLabel=null,this._hideSearchButton=!1,this._buttonLayout="12,12,12,2",this._contentLayout=null,this.buttonClick=new e.vpe}onButtonClick(){this.buttonClick.emit()}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(e.sBO))},t.\u0275cmp=e.Xpm({type:t,selectors:[["nx-page-search"]],hostVars:1,hostBindings:function(n,a){2&n&&e.uIk("role","search")},inputs:{buttonLabel:"buttonLabel",hideSearchButton:"hideSearchButton",buttonLayout:"buttonLayout",contentLayout:"contentLayout"},outputs:{buttonClick:"buttonClick"},ngContentSelectors:b,decls:6,vars:2,consts:[[1,"nx-pagesearch"],["nxLayout","grid"],["nxRow",""],[1,"nx-pagesearch--content",3,"nxCol"],["class","nx-pagesearch__actions",3,"nxCol",4,"ngIf"],[1,"nx-pagesearch__actions",3,"nxCol"],["nxButton","primary medium","type","button",3,"click"]],template:function(n,a){1&n&&(e.F$t(),e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),e.Hsn(4),e.qZA(),e.YNc(5,E,3,2,"div",4),e.qZA()()()),2&n&&(e.xp6(3),e.Q6J("nxCol",a.contentLayout),e.xp6(2),e.Q6J("ngIf",!a.hideSearchButton))},dependencies:[u.O5,C.XV,p.RH,p.yI,p.s7],styles:[".nx-pagesearch[_ngcontent-%COMP%]{padding:32px 0;background:var(--page-search-background-color);box-shadow:var(--page-search-box-shadow)}.nx-pagesearch[_ngcontent-%COMP%]     .nx-formfield__wrapper{padding-bottom:0}.nx-pagesearch[_ngcontent-%COMP%]     .has-outline .nx-formfield__wrapper{padding-top:4px}.nx-pagesearch[_ngcontent-%COMP%]     .c-input{height:auto;font-size:var(--page-search-font-size);line-height:var(--page-search-line-height);font-weight:var(--page-search-font-weight);letter-spacing:var(--page-search-letter-spacing)}.nx-pagesearch[_ngcontent-%COMP%]     .c-input.is-filled{font-weight:600}.nx-pagesearch[_ngcontent-%COMP%]     .c-input::placeholder{font-weight:300}.nx-pagesearch[_ngcontent-%COMP%]     .nx-formfield__input-container{align-items:center}.nx-pagesearch[_ngcontent-%COMP%]     .nx-formfield__prefix, .nx-pagesearch[_ngcontent-%COMP%]     .nx-formfield__suffix{color:var(--page-search-icon-color)}.nx-pagesearch[_ngcontent-%COMP%]     .nx-formfield__suffix{cursor:pointer}.nx-pagesearch[_ngcontent-%COMP%]     button{margin:0}.nx-pagesearch[_ngcontent-%COMP%]     .nx-icon--auto{font-size:24px}.nx-pagesearch[_ngcontent-%COMP%]   .nx-pagesearch__actions[_ngcontent-%COMP%]{display:flex;align-items:center;margin-top:0}@media (max-width: 991px){.nx-pagesearch[_ngcontent-%COMP%]   .nx-pagesearch__actions[_ngcontent-%COMP%]{margin-top:16px}}"],changeDetection:0}),t})(),Z=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[u.ez,x._R,l._0,C.ru,p.TW]}),t})();var A=i(9508),S=i(4850),s=i(9401);function L(t,o){if(1&t){const n=e.EpF();e.TgZ(0,"span",9),e.NdJ("click",function(){e.CHM(n);const c=e.oxw();return e.KtG(c.searchTerm1="")}),e._UZ(1,"nx-icon",10),e.qZA()}}function I(t,o){if(1&t){const n=e.EpF();e.TgZ(0,"span",9),e.NdJ("click",function(){e.CHM(n);const c=e.oxw();return e.KtG(c.searchTerm2="")}),e._UZ(1,"nx-icon",10),e.qZA()}}let P=(()=>{class t{constructor(n){this.client=n,this.WIKIPEDIA_URL="https://en.wikipedia.org/w/api.php"}search(n){const a=function c(r,h){return`${h}?${(new d.LE).append("action","opensearch").append("search",encodeURIComponent(r)).append("format","json").toString()}`}(n,this.WIKIPEDIA_URL);return this.client.jsonp(a,"callback").pipe((0,S.U)(r=>r[1].map(h=>({value:h}))))}}return t.\u0275fac=function(n){return new(n||t)(e.LFG(d.eN))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),T=(()=>{class t{constructor(n){this.wikipediaService=n,this.searchTerm1="",this.searchTerm2="",this.searchFunction=a=>n.search(a).pipe((0,S.U)(c=>c.map(r=>r.value)))}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(P))},t.\u0275cmp=e.Xpm({type:t,selectors:[["page-search-autocomplete-example"]],features:[e._Bn([P])],decls:18,vars:8,consts:[["buttonLabel","Search","buttonLayout","12,12,12,4","contentLayout","12,12,12,8","aria-label","Search autocomplete example"],["nxRow",""],["nxCol","12,12,6,6"],["nxInput","","type","search",3,"nxAutocomplete","nxAutocompleteItems","ngModel","ngModelChange"],["auto1","nxAutocomplete"],["nxFormfieldPrefix",""],["name","search","size","s"],["nxFormfieldSuffix","","aria-hidden","true",3,"click",4,"ngIf"],["auto2","nxAutocomplete"],["nxFormfieldSuffix","","aria-hidden","true",3,"click"],["name","close","size","s"]],template:function(n,a){if(1&n&&(e.TgZ(0,"nx-page-search",0)(1,"div",1)(2,"div",2)(3,"nx-formfield")(4,"input",3),e.NdJ("ngModelChange",function(r){return a.searchTerm1=r}),e.qZA(),e._UZ(5,"nx-autocomplete",null,4),e.TgZ(7,"span",5),e._UZ(8,"nx-icon",6),e.qZA(),e.YNc(9,L,2,0,"span",7),e.qZA()(),e.TgZ(10,"div",2)(11,"nx-formfield")(12,"input",3),e.NdJ("ngModelChange",function(r){return a.searchTerm2=r}),e.qZA(),e._UZ(13,"nx-autocomplete",null,8),e.TgZ(15,"span",5),e._UZ(16,"nx-icon",6),e.qZA(),e.YNc(17,I,2,0,"span",7),e.qZA()()()()),2&n){const c=e.MAs(6),r=e.MAs(14);e.xp6(4),e.Q6J("nxAutocomplete",c)("nxAutocompleteItems",a.searchFunction)("ngModel",a.searchTerm1),e.xp6(5),e.Q6J("ngIf",a.searchTerm1),e.xp6(3),e.Q6J("nxAutocomplete",r)("nxAutocompleteItems",a.searchFunction)("ngModel",a.searchTerm2),e.xp6(5),e.Q6J("ngIf",a.searchTerm2)}},dependencies:[_,l.VM,l.W7,l.J2,g.aP,x.EU,x.Kl,m.O8,u.O5,s.Fj,s.JJ,s.On,p.yI,p.s7]}),t})();function J(t,o){if(1&t){const n=e.EpF();e.TgZ(0,"span",7),e.NdJ("click",function(){e.CHM(n);const c=e.oxw();return e.KtG(c.searchTerm="")}),e._UZ(1,"nx-icon",8),e.qZA()}}function F(t,o){if(1&t&&(e.TgZ(0,"div"),e._uU(1),e.qZA()),2&t){const n=o.$implicit;e.xp6(1),e.hij("Value at click: ",n,"")}}let M=(()=>{class t{constructor(){this.valuesByClick=[],this.searchTerm=""}onButtonClick(n){this.valuesByClick.push(n)}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["page-search-click-example"]],decls:9,vars:3,consts:[["buttonLabel","Search","buttonLayout","12,12,12,4","contentLayout","12,12,12,8","aria-label","Search click example",3,"buttonClick"],["nxRow",""],["nxCol","12"],["nxInput","","placeholder","Enter Keyword","type","search",3,"ngModel","ngModelChange"],["clickExampleInput",""],["nxFormfieldSuffix","","aria-hidden","true",3,"click",4,"ngIf"],[4,"ngFor","ngForOf"],["nxFormfieldSuffix","","aria-hidden","true",3,"click"],["name","close","size","s"]],template:function(n,a){if(1&n){const c=e.EpF();e.TgZ(0,"nx-page-search",0),e.NdJ("buttonClick",function(){e.CHM(c);const h=e.MAs(5);return e.KtG(a.onButtonClick(h.value))}),e.TgZ(1,"div",1)(2,"div",2)(3,"nx-formfield")(4,"input",3,4),e.NdJ("ngModelChange",function(h){return a.searchTerm=h}),e.qZA(),e.YNc(6,J,2,0,"span",5),e.qZA()()()(),e._UZ(7,"br"),e.YNc(8,F,2,1,"div",6)}2&n&&(e.xp6(4),e.Q6J("ngModel",a.searchTerm),e.xp6(2),e.Q6J("ngIf",a.searchTerm),e.xp6(2),e.Q6J("ngForOf",a.valuesByClick))},dependencies:[_,l.VM,l.J2,g.aP,m.O8,u.sg,u.O5,s.Fj,s.JJ,s.On,p.yI,p.s7]}),t})();function O(t,o){if(1&t){const n=e.EpF();e.TgZ(0,"span",5),e.NdJ("click",function(){e.CHM(n);const c=e.oxw();return e.KtG(c.searchTerm="")}),e._UZ(1,"nx-icon",6),e.qZA()}}let y=(()=>{class t{constructor(){this.searchTerm=""}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["page-search-hidden-example"]],decls:6,vars:3,consts:[["buttonLabel","Search","aria-label","Search hidden example",3,"hideSearchButton"],["nxRow",""],["nxCol","12"],["nxInput","","placeholder","Enter Keyword","type","search",3,"ngModel","ngModelChange"],["nxFormfieldSuffix","","aria-hidden","true",3,"click",4,"ngIf"],["nxFormfieldSuffix","","aria-hidden","true",3,"click"],["name","close","size","s"]],template:function(n,a){1&n&&(e.TgZ(0,"nx-page-search",0)(1,"div",1)(2,"div",2)(3,"nx-formfield")(4,"input",3),e.NdJ("ngModelChange",function(r){return a.searchTerm=r}),e.qZA(),e.YNc(5,O,2,0,"span",4),e.qZA()()()()),2&n&&(e.Q6J("hideSearchButton",!0),e.xp6(4),e.Q6J("ngModel",a.searchTerm),e.xp6(1),e.Q6J("ngIf",a.searchTerm))},dependencies:[_,l.VM,l.J2,g.aP,m.O8,u.O5,s.Fj,s.JJ,s.On,p.yI,p.s7]}),t})();function N(t,o){if(1&t){const n=e.EpF();e.TgZ(0,"span",5),e.NdJ("click",function(){e.CHM(n);const c=e.oxw();return e.KtG(c.searchTerm="")}),e._UZ(1,"nx-icon",6),e.qZA()}}let v=(()=>{class t{constructor(){this.searchTerm=""}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["page-search-input-example"]],decls:6,vars:2,consts:[["buttonLabel","Search","buttonLayout","12,12,12,4","contentLayout","12,12,12,8","aria-label","Search input example"],["nxRow",""],["nxCol","12"],["nxInput","","placeholder","Enter Keyword","type","search",3,"ngModel","ngModelChange"],["nxFormfieldSuffix","","aria-hidden","true",3,"click",4,"ngIf"],["nxFormfieldSuffix","","aria-hidden","true",3,"click"],["name","close","size","s"]],template:function(n,a){1&n&&(e.TgZ(0,"nx-page-search",0)(1,"div",1)(2,"div",2)(3,"nx-formfield")(4,"input",3),e.NdJ("ngModelChange",function(r){return a.searchTerm=r}),e.qZA(),e.YNc(5,N,2,0,"span",4),e.qZA()()()()),2&n&&(e.xp6(4),e.Q6J("ngModel",a.searchTerm),e.xp6(1),e.Q6J("ngIf",a.searchTerm))},dependencies:[_,l.VM,l.J2,g.aP,m.O8,u.O5,s.Fj,s.JJ,s.On,p.yI,p.s7]}),t})(),B=(()=>{class t{static components(){return{"page-search-autocomplete":T,"page-search-click":M,"page-search-hidden":y,"page-search-input":v}}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[Z,g.ZI,x._R,m.cf,A.f,d.Ed,d.JF]}),t})()}}]);