import{a as w,b as y,c as Ee,d as v,e as _e}from"./chunk-WT5UQVQS.js";import{a as ve,b as we,c as Ae}from"./chunk-567DVWUQ.js";import"./chunk-3EZPF7JY.js";import"./chunk-AA6U2IQ2.js";import"./chunk-O6IY3T7J.js";import{a as ye}from"./chunk-IDRYOLND.js";import{e as k,g as ge}from"./chunk-MIT5HFZC.js";import{b as xe,j as b}from"./chunk-NKY6EMTX.js";import"./chunk-AD6VMPKX.js";import"./chunk-GCLFQC76.js";import"./chunk-EM5ZJKOD.js";import"./chunk-NJOWFJYT.js";import{A as z,B as K,b as V,d as j,g as U,h as pe,l as H,m as le,p as me,s as ce,w as ue,y as q}from"./chunk-OW4W4AHM.js";import{a as he}from"./chunk-TJIIMCPA.js";import{a as J,b as Y,c as Q}from"./chunk-VB3YPRN7.js";import"./chunk-IEJL4JBP.js";import"./chunk-VV4CBK2G.js";import"./chunk-TJAFNFUW.js";import{A as fe}from"./chunk-TWRZY3QZ.js";import"./chunk-RKEBU46N.js";import"./chunk-AOBIEFLW.js";import"./chunk-K5G4FJAD.js";import{b as $,d as X,f as de,g as se,h as Ce}from"./chunk-GBA2XC55.js";import"./chunk-SNZYJIUN.js";import"./chunk-CDWGG7BE.js";import{s as R}from"./chunk-4SPEH3W5.js";import{$c as T,A as M,Ac as G,Ca as A,Da as E,Db as W,Pb as f,Pc as u,Qb as ae,Qc as c,Sc as d,Uc as N,Vc as F,Wc as S,Xc as B,ad as P,fc as m,la as O,ma as re,mc as x,nc as g,oc as h,pc as i,qa as L,qc as r,rc as _,vc as D,xb as p}from"./chunk-K4YNUXTC.js";function Ne(e,C){if(e&1&&(i(0,"nx-autocomplete-option",2),c(1),r()),e&2){let t=C.$implicit;m("value",t),p(),d(" ",t," ")}}var Z=(()=>{class e{constructor(){this.options=`Chimpanzee,Chinchilla,Chipmunk,Coati,Cicada,Clam,
    Clownfish,Cobra,Cockroach,Cod,Condor,Constrictor,Coral,Cougar,Cow,
    Coyote,Coypu,Crab,Crane,Crane fly,Crawdad,Crayfish,Cricket,Crocodile,Crow`.split(",")}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=f({type:e,selectors:[["autocomplete-basic-example"]],decls:5,vars:1,consts:[["auto1","nxAutocomplete"],["type","text",3,"nxAutocomplete"],[3,"value"]],template:function(o,n){if(o&1&&(_(0,"input",1),i(1,"nx-autocomplete",null,0),g(3,Ne,2,2,"nx-autocomplete-option",2,x),r()),o&2){let a=u(2);m("nxAutocomplete",a),p(3),h(n.options)}},dependencies:[v,y,w],encapsulation:2})}}return e})();function Be(e,C){if(e&1&&(i(0,"nx-autocomplete-option",5),c(1),T(2,"lowercase"),r()),e&2){let t=C.$implicit;m("value",t),p(),d(" ",P(2,2,t)," ")}}var De=(()=>{class e{constructor(t){this.client=t,this.WIKIPEDIA_URL="https://en.wikipedia.org/w/api.php"}search(t){let o=n(t,this.WIKIPEDIA_URL);return this.client.jsonp(o,"callback").pipe(M(a=>a[1].map(s=>({value:s}))));function n(a,s){let l=new $().append("action","opensearch").append("search",encodeURIComponent(a)).append("format","json");return`${s}?${l.toString()}`}}static{this.\u0275fac=function(o){return new(o||e)(L(X))}}static{this.\u0275prov=O({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),ee=(()=>{class e{constructor(t){this.wikipediaService=t,this.modelBoundData="asdf",this.testForm=new q().group({autocomplete:[null,j.required]}),this.dynamicBackendOptions=o=>t.search(o).pipe(M(n=>n.map(a=>a.value)))}simpleFilteredOptions(t){return t?"Chimpanzee,Chinchilla,Chipmunk,Coati,Cicada,Clam,Clownfish,Cobra,Cockroach,Cod,Condor,Constrictor,Coral,Cougar,Cow,Coyote,Coypu,Crab,Crane,Crane fly,Crawdad,Crayfish,Cricket,Crocodile,Crow".split(",").filter(n=>n.toLowerCase().includes(t.toLowerCase())):[]}static{this.\u0275fac=function(o){return new(o||e)(W(De))}}static{this.\u0275cmp=f({type:e,selectors:[["autocomplete-data-binding-example"]],features:[B([De])],decls:22,vars:9,consts:[["auto3","nxAutocomplete"],["auto4",""],["auto5","nxAutocomplete"],["label","Template bound"],["nxInput","","type","text","nxAutocompleteDebounce","0",3,"ngModelChange","nxAutocomplete","ngModel"],[3,"value"],[3,"formGroup"],["label","Reactive bound"],["nxInput","","type","text","formControlName","autocomplete",3,"nxAutocomplete","nxAutocompleteItems"],["label","Provide this required field"],["nxInput","","ngModel","","required","",3,"nxAutocomplete","nxAutocompleteItems"],["nxError",""]],template:function(o,n){if(o&1){let a=D();i(0,"nx-formfield",3)(1,"input",4),S("ngModelChange",function(l){return A(a),F(n.modelBoundData,l)||(n.modelBoundData=l),E(l)}),r()(),i(2,"nx-autocomplete",null,0),g(4,Be,3,4,"nx-autocomplete-option",5,x),r(),c(6),i(7,"form",6)(8,"nx-formfield",7),_(9,"input",8)(10,"nx-autocomplete",null,1),r()(),c(12),i(13,"nx-natural-language-form"),c(14," Here is a word "),i(15,"nx-word",9),_(16,"input",10),i(17,"div",11),c(18,"This field is required."),r(),_(19,"nx-autocomplete",null,2),r(),c(21,` with some following copy.
`),r()}if(o&2){let a=u(3),s=u(11),l=u(20);p(),m("nxAutocomplete",a),N("ngModel",n.modelBoundData),p(3),h(n.simpleFilteredOptions(n.modelBoundData)),p(2),d(`
Template bound: `,n.modelBoundData," "),p(),m("formGroup",n.testForm),p(2),m("nxAutocomplete",s)("nxAutocompleteItems",n.dynamicBackendOptions),p(3),d(`
Reactive form: `,n.testForm.controls.autocomplete.value," "),p(4),m("nxAutocomplete",l)("nxAutocompleteItems",n.dynamicBackendOptions)}},dependencies:[b,k,v,z,le,V,U,pe,ue,H,y,w,K,me,ce,we,ve,xe,R],encapsulation:2})}}return e})();var Ie=(()=>{class e{constructor(t){this.client=t,this.WIKIPEDIA_URL="https://en.wikipedia.org/w/api.php"}search(t){let o=n(t,this.WIKIPEDIA_URL);return this.client.jsonp(o,"callback").pipe(M(a=>a[1].map(s=>({value:s}))));function n(a,s){let l=new $().append("action","opensearch").append("search",encodeURIComponent(a)).append("format","json");return`${s}?${l.toString()}`}}static{this.\u0275fac=function(o){return new(o||e)(L(X))}}static{this.\u0275prov=O({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),te=(()=>{class e{constructor(t){this.wikipediaService=t,this.dynamicBackendOptions=o=>t.search(o).pipe(M(n=>n.map(a=>a.value)))}static{this.\u0275fac=function(o){return new(o||e)(W(Ie))}}static{this.\u0275cmp=f({type:e,selectors:[["autocomplete-default-rendering-example"]],features:[B([Ie])],decls:3,vars:2,consts:[["auto2","nxAutocomplete"],["type","text",3,"nxAutocomplete","nxAutocompleteItems"]],template:function(o,n){if(o&1&&_(0,"input",1)(1,"nx-autocomplete",null,0),o&2){let a=u(2);m("nxAutocomplete",a)("nxAutocompleteItems",n.dynamicBackendOptions)}},dependencies:[v,y],encapsulation:2})}}return e})();function Te(e,C){if(e&1&&(i(0,"nx-autocomplete-option",3),c(1),r()),e&2){let t=C.$implicit;m("value",t),p(),d(" ",t," ")}}var oe=(()=>{class e{constructor(){this.options=["Chimpanzee","Chinchilla","Chipmunk","Coati","Cicada","Clam","Clownfish","Cobra","Cockroach","Cod","Condor","Constrictor","Coral","Cougar","Cow","Coyote","Coypu","Crab","Crane","Crane fly","Crawdad","Crayfish","Cricket","Crocodile","Crow"],this.filteredOptions=this.options.slice()}filter(t){this.filteredOptions=this.options.filter(o=>new RegExp(t,"gi").test(o))}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=f({type:e,selectors:[["autocomplete-filtering-example"]],decls:6,vars:1,consts:[["animalInput",""],["auto1","nxAutocomplete"],["type","text",3,"input","nxAutocomplete"],[3,"value"]],template:function(o,n){if(o&1){let a=D();i(0,"input",2,0),G("input",function(){A(a);let l=u(1);return E(n.filter(l.value))}),r(),i(2,"nx-autocomplete",null,1),g(4,Te,2,2,"nx-autocomplete-option",3,x),r()}if(o&2){let a=u(3);m("nxAutocomplete",a),p(4),h(n.filteredOptions)}},dependencies:[v,y,w],encapsulation:2})}}return e})();function Pe(e,C){if(e&1&&(i(0,"nx-autocomplete-option",8),c(1),r()),e&2){let t=C.$implicit;m("value",t),p(),d(" ",t," ")}}var ne=(()=>{class e{constructor(){this.options=["Chimpanzee","Chinchilla","Chipmunk","Coati","Cicada","Clam","Clownfish","Cobra","Cockroach","Cod","Condor","Constrictor","Coral","Cougar","Cow","Coyote","Coypu","Crab","Crane","Crane fly","Crawdad","Crayfish","Cricket","Crocodile","Crow"],this.filteredOptions=this.options.slice()}filter(t){this.filteredOptions=this.options.filter(o=>new RegExp(t,"gi").test(o))}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=f({type:e,selectors:[["autocomplete-outline-example"]],decls:12,vars:1,consts:[["animalInput",""],["animal1","nxAutocomplete"],["nxLayout","grid"],["nxRow",""],["nxCol","12"],["nxHeadline","subsection-xsmall",1,"nx-margin-bottom-m"],["label","Animals","appearance","outline","floatLabel","always"],["nxInput","","type","text",3,"input","nxAutocomplete"],[3,"value"]],template:function(o,n){if(o&1){let a=D();i(0,"div",2)(1,"div",3)(2,"div",4)(3,"h4",5),c(4," Autocomplete with appearance outline "),r(),i(5,"nx-formfield",6)(6,"input",7,0),G("input",function(){A(a);let l=u(7);return E(n.filter(l.value))}),r(),i(8,"nx-autocomplete",null,1),g(10,Pe,2,2,"nx-autocomplete-option",8,x),r()()()()()}if(o&2){let a=u(9);p(6),m("nxAutocomplete",a),p(4),h(n.filteredOptions)}},dependencies:[J,Y,Q,he,b,k,v,y,w],encapsulation:2})}}return e})();function be(e,C){if(e&1&&(i(0,"nx-autocomplete-option",8),c(1),T(2,"lowercase"),r()),e&2){let t=C.$implicit;m("value",t),p(),d(" ",P(2,2,t)," ")}}function ke(e,C){if(e&1&&(i(0,"nx-autocomplete-option",8),c(1),T(2,"lowercase"),r()),e&2){let t=C.$implicit;m("value",t),p(),d(" ",P(2,2,t)," ")}}function Oe(e,C){if(e&1&&(i(0,"nx-autocomplete-option",8),c(1),T(2,"lowercase"),r()),e&2){let t=C.$implicit;m("value",t),p(),d(" ",P(2,2,t)," ")}}var Me=(()=>{class e{constructor(){this.modelBoundData="a",this.modelBoundData2="c",this.modelPanelGrow=!0,this.modelPanelMaxWidth=400,this.testForm=new q().group({autocomplete:[null,j.required]})}simpleFilteredOptions(t){return t?["apple banana cherry grape strawberry watermelon pineapple mango","audi bmw mercedes chevrolet ford toyota honda nissan volkswagen","cat dog bear elephant fish bee hippo kangaroo lion tiger"].filter(n=>n.toLowerCase().includes(t.toLowerCase())):[]}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=f({type:e,selectors:[["autocomplete-panel-grow-example"]],decls:31,vars:11,consts:[["auto0","nxAutocomplete"],["auto1","nxAutocomplete"],["auto2","nxAutocomplete"],["nxLayout","grid"],["nxRow",""],["nxCol","3"],["label","Default Panel grow Example"],["nxInput","","type","text",3,"ngModelChange","nxAutocomplete","ngModel"],[3,"value"],["nxCol","9"],["label","Panel Grow Example"],["nxInput","","type","text",3,"ngModelChange","nxAutocomplete","panelGrow","ngModel"],["label","Panel Max Width Example"],["nxInput","","type","text",3,"ngModelChange","nxAutocomplete","panelMaxWidth","panelGrow","ngModel"]],template:function(o,n){if(o&1){let a=D();i(0,"div",3)(1,"div",4)(2,"div",5)(3,"nx-formfield",6)(4,"input",7),S("ngModelChange",function(l){return A(a),F(n.modelBoundData,l)||(n.modelBoundData=l),E(l)}),r()(),i(5,"nx-autocomplete",null,0),g(7,be,3,4,"nx-autocomplete-option",8,x),r()(),i(9,"div",9),c(10,"Default ( panelGrow = false )"),r()(),i(11,"div",4)(12,"div",5)(13,"nx-formfield",10)(14,"input",11),S("ngModelChange",function(l){return A(a),F(n.modelBoundData,l)||(n.modelBoundData=l),E(l)}),r()(),i(15,"nx-autocomplete",null,1),g(17,ke,3,4,"nx-autocomplete-option",8,x),r()(),i(19,"div",9),c(20),r()(),i(21,"div",4)(22,"div",5)(23,"nx-formfield",12)(24,"input",13),S("ngModelChange",function(l){return A(a),F(n.modelBoundData2,l)||(n.modelBoundData2=l),E(l)}),r()(),i(25,"nx-autocomplete",null,2),g(27,Oe,3,4,"nx-autocomplete-option",8,x),r()(),i(29,"div",9),c(30),r()()()}if(o&2){let a=u(6),s=u(16),l=u(26);p(4),m("nxAutocomplete",a),N("ngModel",n.modelBoundData),p(3),h(n.simpleFilteredOptions(n.modelBoundData)),p(7),m("nxAutocomplete",s)("panelGrow",!0),N("ngModel",n.modelBoundData),p(3),h(n.simpleFilteredOptions(n.modelBoundData)),p(3),d("Panel Grow: ",n.modelPanelGrow,""),p(4),m("nxAutocomplete",l)("panelMaxWidth",n.modelPanelMaxWidth)("panelGrow",!0),N("ngModel",n.modelBoundData2),p(3),h(n.simpleFilteredOptions(n.modelBoundData2)),p(3),d(" Pabel Grow = true, Panel Max Width: ",n.modelPanelMaxWidth," ")}},dependencies:[b,k,v,z,V,U,H,y,w,K,R,J,Y,Q],encapsulation:2})}}return e})();function Le(e,C){if(e&1&&(i(0,"nx-autocomplete-option",2),c(1),r()),e&2){let t=C.$implicit;m("value",t),p(),d(" ",t," ")}}var We="Chimpanzee,Chinchilla,Chipmunk,Coati,Cicada,Clam,Clownfish,Cobra,Cockroach,Cod,Condor,Constrictor,Coral,Cougar,Cow,Coyote,Coypu,Crab,Crane,Crane fly,Crawdad,Crayfish,Cricket,Crocodile,Crow";function Ge(e){return()=>e.scrollStrategies.close()}var ie=(()=>{class e{constructor(){this.options=We.split(",")}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=f({type:e,selectors:[["autocomplete-scroll-strategy-provider-example"]],features:[B([{provide:Ee,useFactory:Ge,deps:[fe]}])],decls:5,vars:1,consts:[["auto","nxAutocomplete"],["type","text",3,"nxAutocomplete"],[3,"value"]],template:function(o,n){if(o&1&&(_(0,"input",1),i(1,"nx-autocomplete",null,0),g(3,Le,2,2,"nx-autocomplete-option",2,x),r()),o&2){let a=u(2);m("nxAutocomplete",a),p(3),h(n.options)}},dependencies:[v,y,w],encapsulation:2})}}return e})();var Re=[Z,ee,te,oe,ne,ie],Pt=(()=>{class e{static components(){return{"autocomplete-basic":Z,"autocomplete-data-binding":ee,"autocomplete-default-rendering":te,"autocomplete-filtering":oe,"autocomplete-outline":ne,"autocomplete-scroll-strategy-provider":ie,"autocomplete-panel-grow":Me}}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275mod=ae({type:e})}static{this.\u0275inj=re({providers:[de(se(),Ce())],imports:[_e,ge,Ae,ye,Re]})}}return e})();export{Pt as AutocompleteExamplesModule};
