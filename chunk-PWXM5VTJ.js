import{a as re,b as p,c as ae}from"./chunk-ET6T2QN2.js";import"./chunk-OU4XFSTW.js";import{c as ie,f as ne,g as oe}from"./chunk-L4YGPXWT.js";import{a as te}from"./chunk-JVFBSPNC.js";import{f as V,h as ee}from"./chunk-TCGB2MEV.js";import{j as T}from"./chunk-BQY6EDXJ.js";import"./chunk-FYGJWQIJ.js";import"./chunk-5V76OGMQ.js";import"./chunk-GMJ3GKHW.js";import{b as w,d as z,f as y,g as D,i as J,k as M,l as N,m as X,o as H,r as K,x as Q}from"./chunk-MNAWWTKB.js";import"./chunk-M5KLUQHQ.js";import{a as b,b as F,c as W}from"./chunk-GWBFL4JU.js";import"./chunk-4FA6CNRT.js";import"./chunk-BUOL5UUF.js";import"./chunk-JQRF2ONG.js";import{i as U}from"./chunk-AD2FNL5U.js";import"./chunk-MQ3MCZLV.js";import"./chunk-77EAOUPF.js";import"./chunk-LVQ7DULK.js";import{c as Z,e as $}from"./chunk-WBPLCJVU.js";import"./chunk-KTTWGBFS.js";import"./chunk-I2GY6XMW.js";import"./chunk-VTTX4ZNP.js";import{x as q}from"./chunk-GHZ7IFWX.js";import{$b as Y,Dc as L,Ec as k,Ia as B,Ja as R,Pb as d,Vb as a,Wb as l,Xb as u,ec as j,na as A,qc as G,rc as x,tb as s,tc as C,ub as O,vc as c,wc as f,xc as g,ya as m,za as P}from"./chunk-O56WLCF2.js";var le=(()=>{let e=class e{constructor(){this.popoverMaxWidth="400px",this.sliderDemoValue=40,this.step=8,this.interval=1,this.min=0,this.max=100,this.longTicks=[16,32,48,64,80,96]}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=m({type:e,selectors:[["slider-appendix-example"]],decls:8,vars:9,consts:[["sliderAppendixExample",""],["label","Slider with appendix",3,"valueChange","min","max","step","tickInterval","value","longTicks"],["nxSliderAppendix","","nxPlainButton","","nxPopoverDirection","top","aria-label","More information",3,"nxPopoverTriggerFor","nxPopoverMaxWidth"],["name","info-circle-o","aria-hidden","true"],[1,"nx-margin-top-s"]],template:function(i,t){if(i&1){let v=Y();a(0,"nx-slider",1),g("valueChange",function(_){return B(v),f(t.sliderDemoValue,_)||(t.sliderDemoValue=_),R(_)}),a(1,"button",2),u(2,"nx-icon",3),l()(),a(3,"div",4),x(4),l(),a(5,"nx-popover",null,0),x(7,` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, nostrum. Obcaecati cupiditate numquam, fugit illo incidunt molestiae ipsam perferendis officia accusamus. Enim magnam recusandae velit accusamus ipsa. Nemo, eius exercitationem?
`),l()}if(i&2){let v=G(6);d("min",t.min)("max",t.max)("step",t.step)("tickInterval",t.interval),c("value",t.sliderDemoValue),d("longTicks",t.longTicks),s(),d("nxPopoverTriggerFor",v)("nxPopoverMaxWidth",t.popoverMaxWidth),s(3),C("Slider value: ",t.sliderDemoValue,"")}},dependencies:[p,re,U,ne,ie,Z]});let n=e;return n})();var me=(()=>{let e=class e{constructor(){this.sliderDemoValue=42,this.step=.1}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=m({type:e,selectors:[["slider-basic-example"]],decls:2,vars:5,consts:[["label","Slider Test Label",3,"valueChange","min","max","step","value"]],template:function(i,t){i&1&&(a(0,"nx-slider",0),g("valueChange",function(o){return f(t.sliderDemoValue,o)||(t.sliderDemoValue=o),o}),l(),x(1)),i&2&&(d("min",10)("max",110)("step",2),c("value",t.sliderDemoValue),s(),C(`
Slider value: `,t.sliderDemoValue,`
`))},dependencies:[p]});let n=e;return n})();var se=(()=>{let e=class e{constructor(){this.step=.1,this.floatSliderDemoValue=1}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=m({type:e,selectors:[["slider-decimal-example"]],decls:4,vars:6,consts:[[3,"valueChange","min","max","step","value"],["label","Stepsize"],["nxInput","",3,"ngModelChange","ngModel"]],template:function(i,t){i&1&&(a(0,"nx-slider",0),g("valueChange",function(o){return f(t.floatSliderDemoValue,o)||(t.floatSliderDemoValue=o),o}),l(),x(1),a(2,"nx-formfield",1)(3,"input",2),g("ngModelChange",function(o){return f(t.step,o)||(t.step=o),o}),l()()),i&2&&(d("min",0)("max",10)("step",t.step),c("value",t.floatSliderDemoValue),s(),C(`
Slider value: `,t.floatSliderDemoValue,`
`),s(2),c("ngModel",t.step))},dependencies:[p,T,V,w,y,M]});let n=e;return n})();var pe=(()=>{let e=class e{constructor(){this.sliderDemoValue=42,this.step=.1}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=m({type:e,selectors:[["slider-default-example"]],decls:1,vars:0,consts:[["label","Another Slider Test Label"]],template:function(i,t){i&1&&u(0,"nx-slider",0)},dependencies:[p]});let n=e;return n})();var de=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=m({type:e,selectors:[["slider-disabled-example"]],decls:1,vars:1,consts:[["label","This slider is disabled",3,"disabled"]],template:function(i,t){i&1&&u(0,"nx-slider",0),i&2&&d("disabled",!0)},dependencies:[p]});let n=e;return n})();var ue=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=m({type:e,selectors:[["slider-inverted-example"]],decls:1,vars:1,consts:[["label","This slider is inverted",3,"inverted"]],template:function(i,t){i&1&&u(0,"nx-slider",0),i&2&&d("inverted",!0)},dependencies:[p]});let n=e;return n})();var ce=(()=>{let e=class e{constructor(){this.euroSliderDemoValue=0,this.euroValueFormatter=r=>`${Number(r).toFixed(2)} \u20AC`,this.minEuroFormatter=r=>`min. ${r} \u20AC`,this.maxEuroFormatter=r=>`max. ${r} \u20AC`}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=m({type:e,selectors:[["slider-label-example"]],decls:2,vars:8,consts:[[3,"valueChange","min","max","step","labelMinFormatter","labelMaxFormatter","valueFormatter","value"]],template:function(i,t){i&1&&(a(0,"nx-slider",0),g("valueChange",function(o){return f(t.euroSliderDemoValue,o)||(t.euroSliderDemoValue=o),o}),l(),x(1)),i&2&&(d("min",0)("max",10)("step",.1)("labelMinFormatter",t.minEuroFormatter)("labelMaxFormatter",t.maxEuroFormatter)("valueFormatter",t.euroValueFormatter),c("value",t.euroSliderDemoValue),s(),C(`
Slider value: `,t.euroSliderDemoValue,`
`))},dependencies:[p]});let n=e;return n})();var fe=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=m({type:e,selectors:[["slider-labels-example"]],decls:1,vars:1,consts:[["label","The Min/Max labels are not shown.",3,"hideLabels"]],template:function(i,t){i&1&&u(0,"nx-slider",0),i&2&&d("hideLabels",!0)},dependencies:[p]});let n=e;return n})();var ge=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=m({type:e,selectors:[["slider-negative-example"]],decls:2,vars:3,consts:[[1,"docs-inverse-container"],["negative","true","label","Negative slider","value","13",3,"max","min","step"]],template:function(i,t){i&1&&(a(0,"div",0),u(1,"nx-slider",1),l()),i&2&&(s(),d("max",110)("min",10)("step",2))},dependencies:[p]});let n=e;return n})();var xe=(()=>{let e=class e{constructor(r){this.fb=r,this.testForm=this.fb.group({sliderTestReactive:[10,z.required]})}};e.\u0275fac=function(i){return new(i||e)(O(Q))},e.\u0275cmp=m({type:e,selectors:[["slider-reactive-example"]],decls:8,vars:7,consts:[[3,"formGroup"],["label","Please choose a number","name","reactiveTest","formControlName","sliderTestReactive"]],template:function(i,t){i&1&&(a(0,"form",0),u(1,"nx-slider",1),a(2,"p"),x(3),L(4,"json"),l(),a(5,"p"),x(6),L(7,"json"),l()()),i&2&&(d("formGroup",t.testForm),s(3),C("Form value: ",k(4,3,t.testForm.value),""),s(3),C("Form status: ",k(7,5,t.testForm.status),""))},dependencies:[p,N,y,D,H,K,q]});let n=e;return n})();var ve=(()=>{let e=class e{constructor(){this.templateModel=42}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=m({type:e,selectors:[["slider-template-example"]],decls:3,vars:2,consts:[["name","templateTest",3,"ngModelChange","ngModel"]],template:function(i,t){i&1&&(a(0,"form")(1,"nx-slider",0),g("ngModelChange",function(o){return f(t.templateModel,o)||(t.templateModel=o),o}),l(),x(2),l()),i&2&&(s(),c("ngModel",t.templateModel),s(),C(" Model Value: ",t.templateModel,`
`))},dependencies:[p,N,y,D,M,J]});let n=e;return n})();var E=function(n){return n[n.NEVER=0]="NEVER",n[n.RARELY=1]="RARELY",n[n.SOMETIMES=2]="SOMETIMES",n[n.OFTEN=3]="OFTEN",n[n.ALWAYS=4]="ALWAYS",n}(E||{}),Ce=(()=>{let e=class e{constructor(){this.fruitPreferenceFormatter=r=>{switch(r){case E.NEVER:return"I never prefer apples";case E.RARELY:return"rarely";case E.SOMETIMES:return"sometimes";case E.OFTEN:return"often";case E.ALWAYS:return"I always prefer apples"}},this.minFruitPreferenceFormatter=()=>"never",this.maxFruitPreferenceFormatter=()=>"always"}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=m({type:e,selectors:[["slider-textual-example"]],decls:4,vars:5,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12"],["label","Do you prefer apples over oranges?",3,"min","max","labelMinFormatter","labelMaxFormatter","valueFormatter"]],template:function(i,t){i&1&&(a(0,"div",0)(1,"div",1)(2,"div",2),u(3,"nx-slider",3),l()()()),i&2&&(s(3),d("min",0)("max",4)("labelMinFormatter",t.minFruitPreferenceFormatter)("labelMaxFormatter",t.maxFruitPreferenceFormatter)("valueFormatter",t.fruitPreferenceFormatter))},dependencies:[p,b,W,F]});let n=e;return n})();var he=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=m({type:e,selectors:[["slider-thumb-example"]],decls:1,vars:1,consts:[["label","The thumb label is not shown.",3,"thumbLabel"]],template:function(i,t){i&1&&u(0,"nx-slider",0),i&2&&d("thumbLabel",!1)},dependencies:[p]});let n=e;return n})();var Se=(()=>{let e=class e{constructor(){this.sliderDemoValue=40,this.step=8,this.interval=1,this.min=0,this.max=100,this.longTicksString="16,32,48,64,80,96",this.longTicks=[16,32,48,64,80,96]}toArray(){this.longTicks=this.longTicksString.split(",").reduce((r,i)=>{let t=parseInt(i,10);return isNaN(t)||r.push(t),r},[])}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=m({type:e,selectors:[["slider-tick-example"]],decls:22,vars:12,consts:[["nxLayout","grid"],["nxRow","",1,"nx-margin-top-s"],["nxCol","12,6,6,6,3"],["label","Min"],["nxInput","","type","number",3,"ngModelChange","ngModel"],["label","Max"],["label","Step"],["label","TickInterval"],["nxRow","","rowAlignItems","center",1,"nx-margin-top-s"],["nxCol","12"],["label","Long ticks (Array of value which will render as long tick)"],["nxInput","","type","text",3,"ngModelChange","ngModel"],["label","Slider with ticks",3,"valueChange","min","max","step","tickInterval","value","longTicks"],[1,"nx-margin-top-s"]],template:function(i,t){i&1&&(x(0,`Configure slider
`),a(1,"div",0)(2,"div",1)(3,"div",2)(4,"nx-formfield",3)(5,"input",4),g("ngModelChange",function(o){return f(t.min,o)||(t.min=o),o}),l()()(),a(6,"div",2)(7,"nx-formfield",5)(8,"input",4),g("ngModelChange",function(o){return f(t.max,o)||(t.max=o),o}),l()()(),a(9,"div",2)(10,"nx-formfield",6)(11,"input",4),g("ngModelChange",function(o){return f(t.step,o)||(t.step=o),o}),l()()(),a(12,"div",2)(13,"nx-formfield",7)(14,"input",4),g("ngModelChange",function(o){return f(t.interval,o)||(t.interval=o),o}),l()()()(),a(15,"div",8)(16,"div",9)(17,"nx-formfield",10)(18,"input",11),g("ngModelChange",function(o){return f(t.longTicksString,o)||(t.longTicksString=o),o}),j("ngModelChange",function(){return t.toArray()}),l()()()()(),a(19,"nx-slider",12),g("valueChange",function(o){return f(t.sliderDemoValue,o)||(t.sliderDemoValue=o),o}),l(),a(20,"div",13),x(21),l()),i&2&&(s(5),c("ngModel",t.min),s(3),c("ngModel",t.max),s(3),c("ngModel",t.step),s(3),c("ngModel",t.interval),s(4),c("ngModel",t.longTicksString),s(),d("min",t.min)("max",t.max)("step",t.step)("tickInterval",t.interval),c("value",t.sliderDemoValue),d("longTicks",t.longTicks),s(2),C("Slider value: ",t.sliderDemoValue,""))},dependencies:[p,T,V,w,X,y,M,b,W,F]});let n=e;return n})();var mt=(()=>{let e=class e{static components(){return{"slider-appendix":le,"slider-tick":Se,"slider-basic":me,"slider-decimal":se,"slider-default":pe,"slider-disabled":de,"slider-inverted":ue,"slider-label":ce,"slider-negative":ge,"slider-reactive":xe,"slider-template":ve,"slider-textual":Ce,"slider-thumb":he,"slider-labels":fe}}};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=P({type:e}),e.\u0275inj=A({imports:[ae,ee,te,oe,$]});let n=e;return n})();export{mt as SliderExamplesModule};
