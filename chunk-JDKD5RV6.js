import{a as A,b as f,c as Ee,d as x,e as Ie}from"./chunk-AGQKZCF6.js";import{a as ve,b as Ae,c as we}from"./chunk-QAVBUGNQ.js";import"./chunk-VBASNWS4.js";import"./chunk-KZQN4PNA.js";import"./chunk-TQSWTGBO.js";import{a as ge}from"./chunk-65GLPSAG.js";import{b as de,j as O,p as R,r as he}from"./chunk-5K6RWGRM.js";import"./chunk-SP5DAN74.js";import"./chunk-GCLFQC76.js";import"./chunk-RTSM2X3X.js";import"./chunk-KTZ2MV5R.js";import{A as pe,B as le,b as Y,d as Q,g as Z,h as ee,l as te,m as oe,p as ne,s as ie,w as re,y as ae}from"./chunk-3CXM22DE.js";import{a as ye}from"./chunk-DZRQJYOJ.js";import{a as Ce,b as fe,c as xe}from"./chunk-KSMSSQIV.js";import"./chunk-INHV2N6H.js";import"./chunk-VV4CBK2G.js";import"./chunk-VPHHQYPB.js";import"./chunk-63LXIO5M.js";import"./chunk-J2PQRSHM.js";import{p as se}from"./chunk-LJK2GACP.js";import"./chunk-T5NYCE37.js";import"./chunk-YHRSJ234.js";import"./chunk-V5XCZUGO.js";import"./chunk-2EQ73B6L.js";import{b as M,d as B,f as me,g as ce,h as ue}from"./chunk-G3FDH6OQ.js";import"./chunk-TGA3OXY4.js";import"./chunk-APNBV455.js";import{s as J}from"./chunk-CCSED5RY.js";import{Aa as I,Ba as _,Lb as d,Lc as m,Mb as $,Mc as c,Oc as C,Qc as q,Rc as z,Sc as G,Tc as N,Xc as K,Yc as X,bc as l,ic as h,ja as S,jc as y,ka as W,kc as g,lc as r,mc as a,nc as v,oa as T,rc as D,wb as p,wc as k,x as E,xb as b}from"./chunk-LG2ZA55B.js";function Ne(e,w){if(e&1&&(r(0,"nx-autocomplete-option",2),c(1),a()),e&2){let t=w.$implicit;l("value",t),p(),C(" ",t," ")}}var P=(()=>{class e{constructor(){this.options=`Chimpanzee,Chinchilla,Chipmunk,Coati,Cicada,Clam,
    Clownfish,Cobra,Cockroach,Cod,Condor,Constrictor,Coral,Cougar,Cow,
    Coyote,Coypu,Crab,Crane,Crane fly,Crawdad,Crayfish,Cricket,Crocodile,Crow`.split(",")}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=d({type:e,selectors:[["autocomplete-basic-example"]],decls:5,vars:1,consts:[["auto1","nxAutocomplete"],["type","text",3,"nxAutocomplete"],[3,"value"]],template:function(o,n){if(o&1&&(v(0,"input",1),r(1,"nx-autocomplete",null,0),y(3,Ne,2,2,"nx-autocomplete-option",2,h),a()),o&2){let i=m(2);l("nxAutocomplete",i),p(3),g(n.options)}},dependencies:[x,f,A],encapsulation:2})}}return e})();function Se(e,w){if(e&1&&(r(0,"nx-autocomplete-option",5),c(1),K(2,"lowercase"),a()),e&2){let t=w.$implicit;l("value",t),p(),C(" ",X(2,2,t)," ")}}var _e=(()=>{class e{constructor(t){this.client=t,this.WIKIPEDIA_URL="https://en.wikipedia.org/w/api.php"}search(t){let o=n(t,this.WIKIPEDIA_URL);return this.client.jsonp(o,"callback").pipe(E(i=>i[1].map(s=>({value:s}))));function n(i,s){let u=new M().append("action","opensearch").append("search",encodeURIComponent(i)).append("format","json");return`${s}?${u.toString()}`}}static{this.\u0275fac=function(o){return new(o||e)(T(B))}}static{this.\u0275prov=S({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),L=(()=>{class e{constructor(t){this.wikipediaService=t,this.modelBoundData="asdf",this.testForm=new ae().group({autocomplete:[null,Q.required]}),this.dynamicBackendOptions=o=>t.search(o).pipe(E(n=>n.map(i=>i.value)))}simpleFilteredOptions(t){return t?"Chimpanzee,Chinchilla,Chipmunk,Coati,Cicada,Clam,Clownfish,Cobra,Cockroach,Cod,Condor,Constrictor,Coral,Cougar,Cow,Coyote,Coypu,Crab,Crane,Crane fly,Crawdad,Crayfish,Cricket,Crocodile,Crow".split(",").filter(n=>n.toLowerCase().includes(t.toLowerCase())):[]}static{this.\u0275fac=function(o){return new(o||e)(b(_e))}}static{this.\u0275cmp=d({type:e,selectors:[["autocomplete-data-binding-example"]],features:[N([_e])],decls:22,vars:9,consts:[["auto3","nxAutocomplete"],["auto4",""],["auto5","nxAutocomplete"],["label","Template bound"],["nxInput","","type","text","nxAutocompleteDebounce","0",3,"ngModelChange","nxAutocomplete","ngModel"],[3,"value"],[3,"formGroup"],["label","Reactive bound"],["nxInput","","type","text","formControlName","autocomplete",3,"nxAutocomplete","nxAutocompleteItems"],["label","Provide this required field"],["nxInput","","ngModel","","required","",3,"nxAutocomplete","nxAutocompleteItems"],["nxError",""]],template:function(o,n){if(o&1){let i=D();r(0,"nx-formfield",3)(1,"input",4),G("ngModelChange",function(u){return I(i),z(n.modelBoundData,u)||(n.modelBoundData=u),_(u)}),a()(),r(2,"nx-autocomplete",null,0),y(4,Se,3,4,"nx-autocomplete-option",5,h),a(),c(6),r(7,"form",6)(8,"nx-formfield",7),v(9,"input",8)(10,"nx-autocomplete",null,1),a()(),c(12),r(13,"nx-natural-language-form"),c(14," Here is a word "),r(15,"nx-word",9),v(16,"input",10),r(17,"div",11),c(18,"This field is required."),a(),v(19,"nx-autocomplete",null,2),a(),c(21,` with some following copy.
`),a()}if(o&2){let i=m(3),s=m(11),u=m(20);p(),l("nxAutocomplete",i),q("ngModel",n.modelBoundData),p(3),g(n.simpleFilteredOptions(n.modelBoundData)),p(2),C(`
Template bound: `,n.modelBoundData," "),p(),l("formGroup",n.testForm),p(2),l("nxAutocomplete",s)("nxAutocompleteItems",n.dynamicBackendOptions),p(3),C(`
Reactive form: `,n.testForm.controls.autocomplete.value," "),p(4),l("nxAutocomplete",u)("nxAutocompleteItems",n.dynamicBackendOptions)}},dependencies:[O,R,x,pe,oe,Y,Z,ee,re,te,f,A,le,ne,ie,Ae,ve,de,J],encapsulation:2})}}return e})();var De=(()=>{class e{constructor(t){this.client=t,this.WIKIPEDIA_URL="https://en.wikipedia.org/w/api.php"}search(t){let o=n(t,this.WIKIPEDIA_URL);return this.client.jsonp(o,"callback").pipe(E(i=>i[1].map(s=>({value:s}))));function n(i,s){let u=new M().append("action","opensearch").append("search",encodeURIComponent(i)).append("format","json");return`${s}?${u.toString()}`}}static{this.\u0275fac=function(o){return new(o||e)(T(B))}}static{this.\u0275prov=S({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),j=(()=>{class e{constructor(t){this.wikipediaService=t,this.dynamicBackendOptions=o=>t.search(o).pipe(E(n=>n.map(i=>i.value)))}static{this.\u0275fac=function(o){return new(o||e)(b(De))}}static{this.\u0275cmp=d({type:e,selectors:[["autocomplete-default-rendering-example"]],features:[N([De])],decls:3,vars:2,consts:[["auto2","nxAutocomplete"],["type","text",3,"nxAutocomplete","nxAutocompleteItems"]],template:function(o,n){if(o&1&&v(0,"input",1)(1,"nx-autocomplete",null,0),o&2){let i=m(2);l("nxAutocomplete",i)("nxAutocompleteItems",n.dynamicBackendOptions)}},dependencies:[x,f],encapsulation:2})}}return e})();function Te(e,w){if(e&1&&(r(0,"nx-autocomplete-option",3),c(1),a()),e&2){let t=w.$implicit;l("value",t),p(),C(" ",t," ")}}var V=(()=>{class e{constructor(){this.options=["Chimpanzee","Chinchilla","Chipmunk","Coati","Cicada","Clam","Clownfish","Cobra","Cockroach","Cod","Condor","Constrictor","Coral","Cougar","Cow","Coyote","Coypu","Crab","Crane","Crane fly","Crawdad","Crayfish","Cricket","Crocodile","Crow"],this.filteredOptions=this.options.slice()}filter(t){this.filteredOptions=this.options.filter(o=>new RegExp(t,"gi").test(o))}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=d({type:e,selectors:[["autocomplete-filtering-example"]],decls:6,vars:1,consts:[["animalInput",""],["auto1","nxAutocomplete"],["type","text",3,"input","nxAutocomplete"],[3,"value"]],template:function(o,n){if(o&1){let i=D();r(0,"input",2,0),k("input",function(){I(i);let u=m(1);return _(n.filter(u.value))}),a(),r(2,"nx-autocomplete",null,1),y(4,Te,2,2,"nx-autocomplete-option",3,h),a()}if(o&2){let i=m(3);l("nxAutocomplete",i),p(4),g(n.filteredOptions)}},dependencies:[x,f,A],encapsulation:2})}}return e})();function be(e,w){if(e&1&&(r(0,"nx-autocomplete-option",8),c(1),a()),e&2){let t=w.$implicit;l("value",t),p(),C(" ",t," ")}}var U=(()=>{class e{constructor(){this.options=["Chimpanzee","Chinchilla","Chipmunk","Coati","Cicada","Clam","Clownfish","Cobra","Cockroach","Cod","Condor","Constrictor","Coral","Cougar","Cow","Coyote","Coypu","Crab","Crane","Crane fly","Crawdad","Crayfish","Cricket","Crocodile","Crow"],this.filteredOptions=this.options.slice()}filter(t){this.filteredOptions=this.options.filter(o=>new RegExp(t,"gi").test(o))}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=d({type:e,selectors:[["autocomplete-outline-example"]],decls:12,vars:1,consts:[["animalInput",""],["animal1","nxAutocomplete"],["nxLayout","grid"],["nxRow",""],["nxCol","12"],["nxHeadline","subsection-xsmall",1,"nx-margin-bottom-m"],["label","Animals","appearance","outline","floatLabel","always"],["nxInput","","type","text",3,"input","nxAutocomplete"],[3,"value"]],template:function(o,n){if(o&1){let i=D();r(0,"div",2)(1,"div",3)(2,"div",4)(3,"h4",5),c(4," Autocomplete with appearance outline "),a(),r(5,"nx-formfield",6)(6,"input",7,0),k("input",function(){I(i);let u=m(7);return _(n.filter(u.value))}),a(),r(8,"nx-autocomplete",null,1),y(10,be,2,2,"nx-autocomplete-option",8,h),a()()()()()}if(o&2){let i=m(9);p(6),l("nxAutocomplete",i),p(4),g(n.filteredOptions)}},dependencies:[Ce,fe,xe,ye,O,R,x,f,A],encapsulation:2})}}return e})();function ke(e,w){if(e&1&&(r(0,"nx-autocomplete-option",2),c(1),a()),e&2){let t=w.$implicit;l("value",t),p(),C(" ",t," ")}}var Me="Chimpanzee,Chinchilla,Chipmunk,Coati,Cicada,Clam,Clownfish,Cobra,Cockroach,Cod,Condor,Constrictor,Coral,Cougar,Cow,Coyote,Coypu,Crab,Crane,Crane fly,Crawdad,Crayfish,Cricket,Crocodile,Crow";function Be(e){return()=>e.scrollStrategies.close()}var H=(()=>{class e{constructor(){this.options=Me.split(",")}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=d({type:e,selectors:[["autocomplete-scroll-strategy-provider-example"]],features:[N([{provide:Ee,useFactory:Be,deps:[se]}])],decls:5,vars:1,consts:[["auto","nxAutocomplete"],["type","text",3,"nxAutocomplete"],[3,"value"]],template:function(o,n){if(o&1&&(v(0,"input",1),r(1,"nx-autocomplete",null,0),y(3,ke,2,2,"nx-autocomplete-option",2,h),a()),o&2){let i=m(2);l("nxAutocomplete",i),p(3),g(n.options)}},dependencies:[x,f,A],encapsulation:2})}}return e})();var Oe=[P,L,j,V,U,H],vt=(()=>{class e{static components(){return{"autocomplete-basic":P,"autocomplete-data-binding":L,"autocomplete-default-rendering":j,"autocomplete-filtering":V,"autocomplete-outline":U,"autocomplete-scroll-strategy-provider":H}}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275mod=$({type:e})}static{this.\u0275inj=W({providers:[me(ce(),ue())],imports:[Ie,he,we,ge,Oe]})}}return e})();export{vt as AutocompleteExamplesModule};