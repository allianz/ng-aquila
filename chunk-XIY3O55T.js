import{a as w,b as g,c as xe,d as h,e as ge}from"./chunk-BHV2GVA4.js";import{a as de,b as fe,c as Ce}from"./chunk-TBJROAKI.js";import"./chunk-YTCTFNBM.js";import"./chunk-L4YGPXWT.js";import"./chunk-HB4J5NB4.js";import{a as ue}from"./chunk-JVFBSPNC.js";import{f as P,h as ce}from"./chunk-TCGB2MEV.js";import{b as ae,j as L}from"./chunk-BQY6EDXJ.js";import"./chunk-FYGJWQIJ.js";import"./chunk-5V76OGMQ.js";import"./chunk-GMJ3GKHW.js";import{b as X,d as J,f as Y,g as Q,k as Z,l as ee,o as te,r as oe,v as ie,x as ne}from"./chunk-MNAWWTKB.js";import{a as se}from"./chunk-M5KLUQHQ.js";import{a as pe,b as le,c as me}from"./chunk-GWBFL4JU.js";import"./chunk-4FA6CNRT.js";import"./chunk-BUOL5UUF.js";import"./chunk-JQRF2ONG.js";import"./chunk-AD2FNL5U.js";import{p as re}from"./chunk-MQ3MCZLV.js";import"./chunk-77EAOUPF.js";import"./chunk-LVQ7DULK.js";import"./chunk-WBPLCJVU.js";import"./chunk-KTTWGBFS.js";import{b as k,d as B,f as G,g as K}from"./chunk-I2GY6XMW.js";import"./chunk-VTTX4ZNP.js";import{n as A,u as z}from"./chunk-GHZ7IFWX.js";import{$b as E,B as F,Dc as W,Ec as q,Ia as N,Ja as I,Nb as y,Pb as a,Vb as p,Wb as l,Xb as v,ec as T,ma as b,na as j,qc as c,ra as S,rc as s,tb as m,tc as x,ub as M,vc as H,wc as U,xc as $,ya as C,yc as _,za as V}from"./chunk-O56WLCF2.js";function Ee(t,e){if(t&1&&(p(0,"nx-autocomplete-option",3),s(1),l()),t&2){let u=e.$implicit;a("value",u),m(),x(" ",u," ")}}var he=(()=>{let e=class e{constructor(){this.options=`Chimpanzee,Chinchilla,Chipmunk,Coati,Cicada,Clam,
    Clownfish,Cobra,Cockroach,Cod,Condor,Constrictor,Coral,Cougar,Cow,
    Coyote,Coypu,Crab,Crane,Crane fly,Crawdad,Crayfish,Cricket,Crocodile,Crow`.split(",")}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=C({type:e,selectors:[["autocomplete-basic-example"]],decls:4,vars:2,consts:[["auto1","nxAutocomplete"],["type","text",3,"nxAutocomplete"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(o,n){if(o&1&&(v(0,"input",1),p(1,"nx-autocomplete",null,0),y(3,Ee,2,2,"nx-autocomplete-option",2),l()),o&2){let r=c(2);a("nxAutocomplete",r),m(3),a("ngForOf",n.options)}},dependencies:[g,w,h,A]});let t=e;return t})();function be(t,e){if(t&1&&(p(0,"nx-autocomplete-option",12),s(1),W(2,"lowercase"),l()),t&2){let u=e.$implicit;a("value",u),m(),x(" ",q(2,2,u)," ")}}var ye=(()=>{let e=class e{constructor(i){this.client=i,this.WIKIPEDIA_URL="https://en.wikipedia.org/w/api.php"}search(i){let o=n(i,this.WIKIPEDIA_URL);return this.client.jsonp(o,"callback").pipe(F(r=>r[1].map(f=>({value:f}))));function n(r,f){let d=new k().append("action","opensearch").append("search",encodeURIComponent(r)).append("format","json");return`${f}?${d.toString()}`}}};e.\u0275fac=function(o){return new(o||e)(S(B))},e.\u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})(),ve=(()=>{let e=class e{constructor(i){this.wikipediaService=i,this.modelBoundData="asdf",this.testForm=new ne().group({autocomplete:[null,J.required]}),this.dynamicBackendOptions=o=>i.search(o).pipe(F(n=>n.map(r=>r.value)))}simpleFilteredOptions(i){return i?"Chimpanzee,Chinchilla,Chipmunk,Coati,Cicada,Clam,Clownfish,Cobra,Cockroach,Cod,Condor,Constrictor,Coral,Cougar,Cow,Coyote,Coypu,Crab,Crane,Crane fly,Crawdad,Crayfish,Cricket,Crocodile,Crow".split(",").filter(n=>n.toLowerCase().includes(i.toLowerCase())):[]}};e.\u0275fac=function(o){return new(o||e)(M(ye))},e.\u0275cmp=C({type:e,selectors:[["autocomplete-data-binding-example"]],features:[_([ye])],decls:21,vars:10,consts:[["auto3","nxAutocomplete"],["auto4",""],["auto5","nxAutocomplete"],["label","Template bound"],["nxInput","","type","text","nxAutocompleteDebounce","0",3,"ngModelChange","nxAutocomplete","ngModel"],[3,"value",4,"ngFor","ngForOf"],[3,"formGroup"],["label","Reactive bound"],["nxInput","","type","text","formControlName","autocomplete",3,"nxAutocomplete","nxAutocompleteItems"],["label","Provide this required field"],["nxInput","","ngModel","","required","",3,"nxAutocomplete","nxAutocompleteItems"],["nxError",""],[3,"value"]],template:function(o,n){if(o&1){let r=E();p(0,"nx-formfield",3)(1,"input",4),$("ngModelChange",function(d){return N(r),U(n.modelBoundData,d)||(n.modelBoundData=d),I(d)}),l()(),p(2,"nx-autocomplete",null,0),y(4,be,3,4,"nx-autocomplete-option",5),l(),s(5),p(6,"form",6)(7,"nx-formfield",7),v(8,"input",8)(9,"nx-autocomplete",null,1),l()(),s(11),p(12,"nx-natural-language-form"),s(13," Here is a word "),p(14,"nx-word",9),v(15,"input",10),p(16,"div",11),s(17,"This field is required."),l(),v(18,"nx-autocomplete",null,2),l(),s(20,` with some following copy.
`),l()}if(o&2){let r=c(3),f=c(10),d=c(19);m(),a("nxAutocomplete",r),H("ngModel",n.modelBoundData),m(3),a("ngForOf",n.simpleFilteredOptions(n.modelBoundData)),m(),x(`
Template bound: `,n.modelBoundData," "),m(),a("formGroup",n.testForm),m(2),a("nxAutocomplete",f)("nxAutocompleteItems",n.dynamicBackendOptions),m(3),x(`
Reactive form: `,n.testForm.controls.autocomplete.value," "),m(4),a("nxAutocomplete",d)("nxAutocompleteItems",n.dynamicBackendOptions)}},dependencies:[g,w,h,L,ae,P,fe,de,A,ee,X,Y,Q,ie,Z,te,oe,z]});let t=e;return t})();var Ae=(()=>{let e=class e{constructor(i){this.client=i,this.WIKIPEDIA_URL="https://en.wikipedia.org/w/api.php"}search(i){let o=n(i,this.WIKIPEDIA_URL);return this.client.jsonp(o,"callback").pipe(F(r=>r[1].map(f=>({value:f}))));function n(r,f){let d=new k().append("action","opensearch").append("search",encodeURIComponent(r)).append("format","json");return`${f}?${d.toString()}`}}};e.\u0275fac=function(o){return new(o||e)(S(B))},e.\u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})(),we=(()=>{let e=class e{constructor(i){this.wikipediaService=i,this.dynamicBackendOptions=o=>i.search(o).pipe(F(n=>n.map(r=>r.value)))}};e.\u0275fac=function(o){return new(o||e)(M(Ae))},e.\u0275cmp=C({type:e,selectors:[["autocomplete-default-rendering-example"]],features:[_([Ae])],decls:3,vars:2,consts:[["auto2","nxAutocomplete"],["type","text",3,"nxAutocomplete","nxAutocompleteItems"]],template:function(o,n){if(o&1&&v(0,"input",1)(1,"nx-autocomplete",null,0),o&2){let r=c(2);a("nxAutocomplete",r)("nxAutocompleteItems",n.dynamicBackendOptions)}},dependencies:[g,h]});let t=e;return t})();function Se(t,e){if(t&1&&(p(0,"nx-autocomplete-option",4),s(1),l()),t&2){let u=e.$implicit;a("value",u),m(),x(" ",u," ")}}var Fe=(()=>{let e=class e{constructor(){this.options=["Chimpanzee","Chinchilla","Chipmunk","Coati","Cicada","Clam","Clownfish","Cobra","Cockroach","Cod","Condor","Constrictor","Coral","Cougar","Cow","Coyote","Coypu","Crab","Crane","Crane fly","Crawdad","Crayfish","Cricket","Crocodile","Crow"],this.filteredOptions=this.options.slice()}filter(i){this.filteredOptions=this.options.filter(o=>new RegExp(i,"gi").test(o))}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=C({type:e,selectors:[["autocomplete-filtering-example"]],decls:5,vars:2,consts:[["animalInput",""],["auto1","nxAutocomplete"],["type","text",3,"input","nxAutocomplete"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(o,n){if(o&1){let r=E();p(0,"input",2,0),T("input",function(){N(r);let d=c(1);return I(n.filter(d.value))}),l(),p(2,"nx-autocomplete",null,1),y(4,Se,2,2,"nx-autocomplete-option",3),l()}if(o&2){let r=c(3);a("nxAutocomplete",r),m(4),a("ngForOf",n.filteredOptions)}},dependencies:[g,w,h,A]});let t=e;return t})();function Me(t,e){if(t&1&&(p(0,"nx-autocomplete-option",9),s(1),l()),t&2){let u=e.$implicit;a("value",u),m(),x(" ",u," ")}}var Ne=(()=>{let e=class e{constructor(){this.options=["Chimpanzee","Chinchilla","Chipmunk","Coati","Cicada","Clam","Clownfish","Cobra","Cockroach","Cod","Condor","Constrictor","Coral","Cougar","Cow","Coyote","Coypu","Crab","Crane","Crane fly","Crawdad","Crayfish","Cricket","Crocodile","Crow"],this.filteredOptions=this.options.slice()}filter(i){this.filteredOptions=this.options.filter(o=>new RegExp(i,"gi").test(o))}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=C({type:e,selectors:[["autocomplete-outline-example"]],decls:11,vars:2,consts:[["animalInput",""],["animal1","nxAutocomplete"],["nxLayout","grid"],["nxRow",""],["nxCol","12"],["nxHeadline","subsection-xsmall",1,"nx-margin-bottom-m"],["label","Animals","appearance","outline","floatLabel","always"],["nxInput","","type","text",3,"input","nxAutocomplete"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(o,n){if(o&1){let r=E();p(0,"div",2)(1,"div",3)(2,"div",4)(3,"h4",5),s(4," Autocomplete with appearance outline "),l(),p(5,"nx-formfield",6)(6,"input",7,0),T("input",function(){N(r);let d=c(7);return I(n.filter(d.value))}),l(),p(8,"nx-autocomplete",null,1),y(10,Me,2,2,"nx-autocomplete-option",8),l()()()()()}if(o&2){let r=c(9);m(6),a("nxAutocomplete",r),m(4),a("ngForOf",n.filteredOptions)}},dependencies:[g,w,h,L,P,A,se,pe,me,le]});let t=e;return t})();function Te(t,e){if(t&1&&(p(0,"nx-autocomplete-option",3),s(1),l()),t&2){let u=e.$implicit;a("value",u),m(),x(" ",u," ")}}var ke="Chimpanzee,Chinchilla,Chipmunk,Coati,Cicada,Clam,Clownfish,Cobra,Cockroach,Cod,Condor,Constrictor,Coral,Cougar,Cow,Coyote,Coypu,Crab,Crane,Crane fly,Crawdad,Crayfish,Cricket,Crocodile,Crow";function Be(t){return()=>t.scrollStrategies.close({threshold:100})}var Ie=(()=>{let e=class e{constructor(){this.options=ke.split(",")}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=C({type:e,selectors:[["autocomplete-scroll-strategy-provider-example"]],features:[_([{provide:xe,useFactory:Be,deps:[re]}])],decls:4,vars:2,consts:[["auto","nxAutocomplete"],["type","text",3,"nxAutocomplete"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(o,n){if(o&1&&(v(0,"input",1),p(1,"nx-autocomplete",null,0),y(3,Te,2,2,"nx-autocomplete-option",2),l()),o&2){let r=c(2);a("nxAutocomplete",r),m(3),a("ngForOf",n.options)}},dependencies:[g,w,h,A]});let t=e;return t})();var ct=(()=>{let e=class e{static components(){return{"autocomplete-basic":he,"autocomplete-data-binding":ve,"autocomplete-default-rendering":we,"autocomplete-filtering":Fe,"autocomplete-outline":Ne,"autocomplete-scroll-strategy-provider":Ie}}};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=V({type:e}),e.\u0275inj=j({imports:[ge,ce,Ce,ue,K,G]});let t=e;return t})();export{ct as AutocompleteExamplesModule};