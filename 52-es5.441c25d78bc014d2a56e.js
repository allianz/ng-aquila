!function(){function n(n,e){for(var o=0;o<e.length;o++){var t=e[o];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}function e(e,o,t){return o&&n(e.prototype,o),t&&n(e,t),e}function o(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{hNRs:function(n,t,i){"use strict";i.r(t),i.d(t,"DropdownExamplesModule",function(){return sn});var r=i("hbct"),d=i("HMmR"),a=i("fXoL"),b=i("aQnR"),l=i("BQ2b"),c=i("5/jY"),x=i("HXSb"),u=i("0KkY"),p=i("3Pt+"),s=i("VR/c"),m=i("ofXK"),V=i("eKOL");function f(n,e){if(1&n&&(a.Wb(0,"span"),a.Jc(1),a.Vb()),2&n){var o=a.hc();a.Eb(1),a.Kc(null==o.customLabelDropdownValue?null:o.customLabelDropdownValue.prefix)}}function w(n,e){if(1&n&&(a.Wb(0,"nx-dropdown-item",7),a.Jc(1),a.Vb()),2&n){var o=e.$implicit;a.nc("nxValue",o),a.Eb(1),a.Mc(" ",o.prefix," (",o.countryId,") ")}}var W,v,g=((v=function n(){o(this,n),this.telPrefixDemoData=[{prefix:"+1",countryId:"United States of America"},{prefix:"+49",countryId:"Germany"},{prefix:"+41",countryId:"Switzerland"}]}).\u0275fac=function(n){return new(n||v)},v.\u0275cmp=a.Kb({type:v,selectors:[["dropdown-custom-label-example"]],decls:7,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 4"],["nxLabel","Country Code"],[3,"ngModel","ngModelChange"],["nxClosedLabel",""],[3,"nxValue",4,"ngFor","ngForOf"],[3,"nxValue"]],template:function(n,e){1&n&&(a.Wb(0,"div",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"nx-formfield",3),a.Wb(4,"nx-dropdown",4),a.dc("ngModelChange",function(n){return e.customLabelDropdownValue=n}),a.Hc(5,f,2,1,"ng-template",5),a.Hc(6,w,2,3,"nx-dropdown-item",6),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()),2&n&&(a.Eb(4),a.nc("ngModel",e.customLabelDropdownValue),a.Eb(2),a.nc("ngForOf",e.telPrefixDemoData))},directives:[b.a,l.a,c.a,x.b,u.a,p.p,p.s,s.a,m.p,V.a],styles:[""]}),v),y=((W=function n(){o(this,n)}).\u0275fac=function(n){return new(n||W)},W.\u0275cmp=a.Kb({type:W,selectors:[["dropdown-disabled-items-example"]],decls:31,vars:1,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 4"],["nxLabel","Disabled dropdown"],["nxDisabled","true"],["nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],["nxLabel","With disabled item"],["disabled","true","nxValue","BMW"],["nxLabel","With disabled multi item"],[3,"nxIsMultiselect"]],template:function(n,e){1&n&&(a.Wb(0,"div",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"nx-formfield",3),a.Wb(4,"nx-dropdown",4),a.Wb(5,"nx-dropdown-item",5),a.Jc(6,"B"),a.Vb(),a.Wb(7,"nx-dropdown-item",6),a.Jc(8,"A"),a.Vb(),a.Wb(9,"nx-dropdown-item",7),a.Jc(10,"V"),a.Vb(),a.Wb(11,"nx-dropdown-item",8),a.Jc(12,"M"),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Wb(13,"div",2),a.Wb(14,"nx-formfield",9),a.Wb(15,"nx-dropdown"),a.Wb(16,"nx-dropdown-item",10),a.Jc(17,"B"),a.Vb(),a.Wb(18,"nx-dropdown-item",6),a.Jc(19,"A"),a.Vb(),a.Wb(20,"nx-dropdown-item",7),a.Jc(21,"V"),a.Vb(),a.Wb(22,"nx-dropdown-item",8),a.Jc(23,"M"),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Wb(24,"div",2),a.Wb(25,"nx-formfield",11),a.Wb(26,"nx-dropdown",12),a.Rb(27,"nx-dropdown-item",10),a.Rb(28,"nx-dropdown-item",6),a.Rb(29,"nx-dropdown-item",7),a.Rb(30,"nx-dropdown-item",8),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()),2&n&&(a.Eb(26),a.nc("nxIsMultiselect",!0))},directives:[b.a,l.a,c.a,x.b,u.a,V.a],styles:[""]}),W);function h(n,e){1&n&&a.Rb(0,"nx-dropdown-item",6),2&n&&a.nc("nxValue",e.$implicit)}var M,F=((M=function n(){o(this,n),this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}).\u0275fac=function(n){return new(n||M)},M.\u0275cmp=a.Kb({type:M,selectors:[["dropdown-filter-example"]],decls:6,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["nxLabel","Car brand"],["nxFilterPlaceholder","Type to search car",3,"nxShowFilter"],[3,"nxValue",4,"ngFor","ngForOf"],[3,"nxValue"]],template:function(n,e){1&n&&(a.Wb(0,"div",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"nx-formfield",3),a.Wb(4,"nx-dropdown",4),a.Hc(5,h,1,1,"nx-dropdown-item",5),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()),2&n&&(a.Eb(4),a.nc("nxShowFilter",!0),a.Eb(1),a.nc("ngForOf",e.demoData))},directives:[b.a,l.a,c.a,x.b,u.a,m.p,V.a],styles:[""]}),M);function R(n,e){1&n&&a.Rb(0,"nx-dropdown-item",6),2&n&&a.nc("nxValue",e.$implicit)}var C,L,B=((C=function(){function n(){o(this,n),this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}return e(n,[{key:"myFilter",value:function(n,e){return null!==e.match(new RegExp("^"+n,"g"))}}]),n}()).\u0275fac=function(n){return new(n||C)},C.\u0275cmp=a.Kb({type:C,selectors:[["dropdown-filter-custom-example"]],decls:6,vars:3,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["nxLabel","Car brand"],["nxFilterPlaceholder","Type to search car",3,"nxShowFilter","filterFn"],[3,"nxValue",4,"ngFor","ngForOf"],[3,"nxValue"]],template:function(n,e){1&n&&(a.Wb(0,"div",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"nx-formfield",3),a.Wb(4,"nx-dropdown",4),a.Hc(5,R,1,1,"nx-dropdown-item",5),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()),2&n&&(a.Eb(4),a.nc("nxShowFilter",!0)("filterFn",e.myFilter),a.Eb(1),a.nc("ngForOf",e.demoData))},directives:[b.a,l.a,c.a,x.b,u.a,m.p,V.a],styles:[""]}),C),E=i("XGKT"),O=((L=function n(){o(this,n),this.testBind="Catfish"}).\u0275fac=function(n){return new(n||L)},L.\u0275cmp=a.Kb({type:L,selectors:[["dropdown-group-example"]],decls:13,vars:1,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["nxLabel","Animals"],[3,"nxValue","nxValueChange"],["nxLabel","Birds"],["disabled","true","nxValue","Parrot"],["nxValue","Pidgin"],["nxValue","Swallow"],["nxLabel","Fish"],["nxValue","Salmon"],["nxValue","Mackerel"],["nxValue","Catfish"]],template:function(n,e){1&n&&(a.Wb(0,"div",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"nx-formfield",3),a.Wb(4,"nx-dropdown",4),a.dc("nxValueChange",function(n){return e.testBind=n}),a.Wb(5,"nx-dropdown-group",5),a.Rb(6,"nx-dropdown-item",6),a.Rb(7,"nx-dropdown-item",7),a.Rb(8,"nx-dropdown-item",8),a.Vb(),a.Wb(9,"nx-dropdown-group",9),a.Rb(10,"nx-dropdown-item",10),a.Rb(11,"nx-dropdown-item",11),a.Rb(12,"nx-dropdown-item",12),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()),2&n&&(a.Eb(4),a.nc("nxValue",e.testBind))},directives:[b.a,l.a,c.a,x.b,u.a,E.a,V.a],styles:[""]}),L);function J(n,e){1&n&&a.Rb(0,"nx-dropdown-item",12),2&n&&a.nc("nxValue",e.$implicit)}var D,T,A=((T=function(){function n(){o(this,n),this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}return e(n,[{key:"toText",value:function(n){return n?n.toUpperCase():null}},{key:"toTextMulti",value:function(n){return n?Array.isArray(n)?n.map(function(n){return n.toUpperCase()}).join(", "):n.toUpperCase():""}},{key:"myFilter",value:function(n,e){return null!==e.match(new RegExp("^"+n,"g"))}}]),n}()).\u0275fac=function(n){return new(n||T)},T.\u0275cmp=a.Kb({type:T,selectors:[["dropdown-multi-select-example"]],decls:24,vars:5,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 4"],["nxLabel","Car brand"],[3,"nxValueFormatter","nxIsMultiselect"],[3,"nxValue",4,"ngFor","ngForOf"],[3,"nxIsMultiselect"],["disabled","true","nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],["nxValue","BMW"],[3,"nxValue"]],template:function(n,e){1&n&&(a.Wb(0,"div",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"nx-formfield",3),a.Wb(4,"nx-dropdown",4),a.Hc(5,J,1,1,"nx-dropdown-item",5),a.Vb(),a.Vb(),a.Vb(),a.Wb(6,"div",2),a.Wb(7,"nx-formfield",3),a.Wb(8,"nx-dropdown",6),a.Wb(9,"nx-dropdown-item",7),a.Jc(10,"B"),a.Vb(),a.Wb(11,"nx-dropdown-item",8),a.Jc(12,"A"),a.Vb(),a.Wb(13,"nx-dropdown-item",9),a.Jc(14,"V"),a.Vb(),a.Wb(15,"nx-dropdown-item",10),a.Jc(16,"M"),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Wb(17,"div",2),a.Wb(18,"nx-formfield",3),a.Wb(19,"nx-dropdown",6),a.Rb(20,"nx-dropdown-item",11),a.Rb(21,"nx-dropdown-item",8),a.Rb(22,"nx-dropdown-item",9),a.Rb(23,"nx-dropdown-item",10),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()),2&n&&(a.Eb(4),a.nc("nxValueFormatter",e.toTextMulti)("nxIsMultiselect",!0),a.Eb(1),a.nc("ngForOf",e.demoData),a.Eb(3),a.nc("nxIsMultiselect",!0),a.Eb(11),a.nc("nxIsMultiselect",!0))},directives:[b.a,l.a,c.a,x.b,u.a,m.p,V.a],styles:[""]}),T),P=((D=function n(){o(this,n)}).\u0275fac=function(n){return new(n||D)},D.\u0275cmp=a.Kb({type:D,selectors:[["dropdown-negative-example"]],decls:17,vars:1,consts:[[1,"docs-inverse-container"],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["nxLabel","Car brand","nxStyle","negative"],["nxStyle","negative"],["nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],["nxStyle","negative",3,"nxDisabled"]],template:function(n,e){1&n&&(a.Wb(0,"div",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"div",3),a.Wb(4,"nx-formfield",4),a.Wb(5,"nx-dropdown",5),a.Rb(6,"nx-dropdown-item",6),a.Rb(7,"nx-dropdown-item",7),a.Rb(8,"nx-dropdown-item",8),a.Rb(9,"nx-dropdown-item",9),a.Vb(),a.Vb(),a.Vb(),a.Wb(10,"div",3),a.Wb(11,"nx-formfield",4),a.Wb(12,"nx-dropdown",10),a.Rb(13,"nx-dropdown-item",6),a.Rb(14,"nx-dropdown-item",7),a.Rb(15,"nx-dropdown-item",8),a.Rb(16,"nx-dropdown-item",9),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()),2&n&&(a.Eb(12),a.nc("nxDisabled",!0))},directives:[b.a,l.a,c.a,x.b,u.a,V.a],styles:[""]}),D),K=i("eC/v");function k(n,e){1&n&&a.Rb(0,"nx-dropdown-item",12),2&n&&a.nc("nxValue",e.$implicit)}function H(n,e){1&n&&a.Rb(0,"nx-dropdown-item",12),2&n&&a.nc("nxValue",e.$implicit)}function S(n,e){1&n&&a.Rb(0,"nx-dropdown-item",12),2&n&&a.nc("nxValue",e.$implicit)}function I(n,e){1&n&&a.Rb(0,"nx-dropdown-item",12),2&n&&a.nc("nxValue",e.$implicit)}function $(n,e){if(1&n&&(a.Wb(0,"nx-dropdown-group",13),a.Hc(1,I,1,1,"nx-dropdown-item",5),a.Vb()),2&n){var o=e.$implicit;a.nc("nxLabel",o.label),a.Eb(1),a.nc("ngForOf",o.items)}}var j,U=((j=function n(){o(this,n),this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"],this.demoGroupData=[{label:"Birds",items:["Parrot","Pidgin","Swallow"]},{label:"Fish",items:["Salmon","Mackerel","Catfish"]}],this.testBind="Catfish"}).\u0275fac=function(n){return new(n||j)},j.\u0275cmp=a.Kb({type:j,selectors:[["dropdown-outline-example"]],features:[a.Db([{provide:r.a,useValue:{appearance:"outline",nxFloatLabel:"always"}}])],decls:27,vars:7,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 6"],["nxHeadline","subsection-xsmall"],["nxLabel","Car brand"],[3,"nxValue",4,"ngFor","ngForOf"],[3,"nxIsMultiselect"],["nxCol","12,12,6"],["nxFilterPlaceholder","Type to search car",3,"nxShowFilter"],["nxLabel","Animals"],[3,"nxValue","nxValueChange"],[3,"nxLabel",4,"ngFor","ngForOf"],[3,"nxValue"],[3,"nxLabel"]],template:function(n,e){1&n&&(a.Wb(0,"div",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"h4",3),a.Jc(4,"Standard dropdown"),a.Vb(),a.Wb(5,"nx-formfield",4),a.Wb(6,"nx-dropdown"),a.Hc(7,k,1,1,"nx-dropdown-item",5),a.Vb(),a.Vb(),a.Vb(),a.Wb(8,"div",2),a.Wb(9,"h4",3),a.Jc(10,"Multi select dropdown"),a.Vb(),a.Wb(11,"nx-formfield",4),a.Wb(12,"nx-dropdown",6),a.Hc(13,H,1,1,"nx-dropdown-item",5),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Wb(14,"div",1),a.Wb(15,"div",7),a.Wb(16,"h4",3),a.Jc(17,"Filter dropdown"),a.Vb(),a.Wb(18,"nx-formfield",4),a.Wb(19,"nx-dropdown",8),a.Hc(20,S,1,1,"nx-dropdown-item",5),a.Vb(),a.Vb(),a.Vb(),a.Wb(21,"div",7),a.Wb(22,"h4",3),a.Jc(23,"Group dropdown"),a.Vb(),a.Wb(24,"nx-formfield",9),a.Wb(25,"nx-dropdown",10),a.dc("nxValueChange",function(n){return e.testBind=n}),a.Hc(26,$,2,2,"nx-dropdown-group",11),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()),2&n&&(a.Eb(7),a.nc("ngForOf",e.demoData),a.Eb(5),a.nc("nxIsMultiselect",!0),a.Eb(1),a.nc("ngForOf",e.demoData),a.Eb(6),a.nc("nxShowFilter",!0),a.Eb(1),a.nc("ngForOf",e.demoData),a.Eb(5),a.nc("nxValue",e.testBind),a.Eb(1),a.nc("ngForOf",e.demoGroupData))},directives:[b.a,l.a,c.a,K.a,x.b,u.a,m.p,V.a,E.a],styles:["[_nghost-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:12px}"]}),j);function X(n,e){1&n&&a.Rb(0,"nx-dropdown-item",7),2&n&&a.nc("nxValue",e.$implicit)}function _(n,e){1&n&&a.Rb(0,"nx-dropdown-item",7),2&n&&a.nc("nxValue",e.$implicit)}var q,G,N=((q=function n(){o(this,n),this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}).\u0275fac=function(n){return new(n||q)},q.\u0275cmp=a.Kb({type:q,selectors:[["dropdown-placeholder-example"]],decls:10,vars:2,consts:[["nxLayout","grid"],["nxRow","",2,"align-items","flex-end"],["nxCol","12, 12, 6"],["nxLabel","Car brand"],["placeholder","Choose a car brand"],[3,"nxValue",4,"ngFor","ngForOf"],["nxLabel","Car brand","appearance","outline"],[3,"nxValue"]],template:function(n,e){1&n&&(a.Wb(0,"div",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"nx-formfield",3),a.Wb(4,"nx-dropdown",4),a.Hc(5,X,1,1,"nx-dropdown-item",5),a.Vb(),a.Vb(),a.Vb(),a.Wb(6,"div",2),a.Wb(7,"nx-formfield",6),a.Wb(8,"nx-dropdown",4),a.Hc(9,_,1,1,"nx-dropdown-item",5),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()),2&n&&(a.Eb(5),a.nc("ngForOf",e.demoData),a.Eb(4),a.nc("ngForOf",e.demoData))},directives:[b.a,l.a,c.a,x.b,u.a,m.p,V.a],styles:[""]}),q),z=i("aXeq"),Q=i("v44Z"),Y=i("xR9B"),Z=i("LTpZ"),nn=((G=function(){function n(){o(this,n),this.form=(new p.d).group({dropdown:["BMW",p.y.required]})}return e(n,[{key:"patch",value:function(n){this.form.patchValue({dropdown:n})}}]),n}()).\u0275fac=function(n){return new(n||G)},G.\u0275cmp=a.Kb({type:G,selectors:[["dropdown-reactive-example"]],decls:31,vars:7,consts:[[3,"formGroup"],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["nxLabel","Car brand"],["formControlName","dropdown"],["nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],["nxFormfieldError",""],["nxContext","info","nxFormfieldNote",""],["nxCol","12"],[1,"nx-margin-y-0"],[1,"nx-margin-top-0"],[1,"update-container"],["type","text"],["reactiveInput",""],["nxButton","primary small","type","button",1,"nx-margin-bottom-0",3,"click"]],template:function(n,e){if(1&n){var o=a.Xb();a.Wb(0,"form",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"div",3),a.Wb(4,"nx-formfield",4),a.Wb(5,"nx-dropdown",5),a.Wb(6,"nx-dropdown-item"),a.Jc(7,"CLEAR VALUE"),a.Vb(),a.Rb(8,"nx-dropdown-item",6),a.Rb(9,"nx-dropdown-item",7),a.Rb(10,"nx-dropdown-item",8),a.Rb(11,"nx-dropdown-item",9),a.Vb(),a.Wb(12,"nx-error",10),a.Jc(13," Please select a value "),a.Vb(),a.Wb(14,"nx-message",11),a.Jc(15," This field is required "),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Wb(16,"div",2),a.Wb(17,"div",12),a.Wb(18,"p",13),a.Jc(19),a.ic(20,"json"),a.Vb(),a.Wb(21,"p",13),a.Jc(22),a.ic(23,"json"),a.Vb(),a.Wb(24,"p",14),a.Jc(25,"Try to set the value to BMW, Audi, Volvo or Mini."),a.Vb(),a.Wb(26,"div",15),a.Rb(27,"input",16,17),a.Wb(29,"button",18),a.dc("click",function(){a.yc(o);var n=a.uc(28);return e.patch(n.value)}),a.Jc(30," Update "),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()}2&n&&(a.nc("formGroup",e.form),a.Eb(19),a.Lc("Form value: ",a.jc(20,3,e.form.value),""),a.Eb(3),a.Lc("Form status: ",a.jc(23,5,e.form.status),""))},directives:[p.z,p.q,p.i,b.a,l.a,c.a,x.b,u.a,p.p,p.g,V.a,z.b,Q.a,Y.a,Z.a],pipes:[m.h],styles:["button[_ngcontent-%COMP%]{margin-left:4px}.update-container[_ngcontent-%COMP%]{display:flex}"]}),G);function en(n,e){1&n&&a.Rb(0,"nx-dropdown-item",10),2&n&&a.nc("nxValue",e.$implicit)}var on,tn,rn=((tn=function(){function n(){o(this,n),this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}return e(n,[{key:"toText",value:function(n){return n?n.toUpperCase():null}}]),n}()).\u0275fac=function(n){return new(n||tn)},tn.\u0275cmp=a.Kb({type:tn,selectors:[["dropdown-rendering-items-example"]],decls:24,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 4"],["nxLabel","Car brand"],[3,"nxValueFormatter"],[3,"nxValue",4,"ngFor","ngForOf"],["nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],[3,"nxValue"]],template:function(n,e){1&n&&(a.Wb(0,"div",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"nx-formfield",3),a.Wb(4,"nx-dropdown",4),a.Hc(5,en,1,1,"nx-dropdown-item",5),a.Vb(),a.Vb(),a.Vb(),a.Wb(6,"div",2),a.Wb(7,"nx-formfield",3),a.Wb(8,"nx-dropdown"),a.Wb(9,"nx-dropdown-item",6),a.Jc(10,"B"),a.Vb(),a.Wb(11,"nx-dropdown-item",7),a.Jc(12,"A"),a.Vb(),a.Wb(13,"nx-dropdown-item",8),a.Jc(14,"V"),a.Vb(),a.Wb(15,"nx-dropdown-item",9),a.Jc(16,"M"),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Wb(17,"div",2),a.Wb(18,"nx-formfield",3),a.Wb(19,"nx-dropdown"),a.Rb(20,"nx-dropdown-item",6),a.Rb(21,"nx-dropdown-item",7),a.Rb(22,"nx-dropdown-item",8),a.Rb(23,"nx-dropdown-item",9),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()),2&n&&(a.Eb(4),a.nc("nxValueFormatter",e.toText),a.Eb(1),a.nc("ngForOf",e.demoData))},directives:[b.a,l.a,c.a,x.b,u.a,m.p,V.a],styles:[""]}),tn),dn=((on=function n(){o(this,n),this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"],this.simpleBinding="Audi"}).\u0275fac=function(n){return new(n||on)},on.\u0275cmp=a.Kb({type:on,selectors:[["dropdown-simple-binding-example"]],decls:21,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["nxLabel","Car brand"],[3,"nxValue","nxValueChange"],["simpleDropdown",""],["nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],["nxCol","12"],[1,"nx-margin-y-0"],[1,"nx-margin-top-0"],[1,"update-container"],["type","text"],["simpleInput",""],["nxButton","primary small","type","button",1,"nx-margin-bottom-0",3,"click"]],template:function(n,e){if(1&n){var o=a.Xb();a.Wb(0,"div",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"nx-formfield",3),a.Wb(4,"nx-dropdown",4,5),a.dc("nxValueChange",function(n){return e.simpleBinding=n}),a.Rb(6,"nx-dropdown-item",6),a.Rb(7,"nx-dropdown-item",7),a.Rb(8,"nx-dropdown-item",8),a.Rb(9,"nx-dropdown-item",9),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Wb(10,"div",1),a.Wb(11,"div",10),a.Wb(12,"p",11),a.Jc(13),a.Vb(),a.Wb(14,"p",12),a.Jc(15,"Try to set the value to BMW, Audi, Volvo or Mini."),a.Vb(),a.Wb(16,"div",13),a.Rb(17,"input",14,15),a.Wb(19,"button",16),a.dc("click",function(){a.yc(o);var n=a.uc(18);return e.simpleBinding=n.value}),a.Jc(20," Update "),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()}if(2&n){var t=a.uc(5);a.Eb(4),a.nc("nxValue",e.simpleBinding),a.Eb(9),a.Lc("Model value is: ",t.value,"")}},directives:[b.a,l.a,c.a,x.b,u.a,V.a,Z.a],styles:["button[_ngcontent-%COMP%]{margin-left:4px}.update-container[_ngcontent-%COMP%]{display:flex}"]}),on);function an(n,e){1&n&&a.Rb(0,"nx-dropdown-item",11),2&n&&a.nc("nxValue",e.$implicit)}var bn,ln,cn,xn=((ln=function(){function n(){o(this,n),this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}return e(n,[{key:"toText",value:function(n){return n?n.toUpperCase():null}}]),n}()).\u0275fac=function(n){return new(n||ln)},ln.\u0275cmp=a.Kb({type:ln,selectors:[["dropdown-standard-example"]],decls:13,vars:3,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 6"],["nxLabel","Car brand"],[3,"nxValueFormatter"],[3,"nxValue",4,"ngFor","ngForOf"],[3,"nxDisabled"],["nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],[3,"nxValue"]],template:function(n,e){1&n&&(a.Wb(0,"div",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"nx-formfield",3),a.Wb(4,"nx-dropdown",4),a.Hc(5,an,1,1,"nx-dropdown-item",5),a.Vb(),a.Vb(),a.Vb(),a.Wb(6,"div",2),a.Wb(7,"nx-formfield",3),a.Wb(8,"nx-dropdown",6),a.Rb(9,"nx-dropdown-item",7),a.Rb(10,"nx-dropdown-item",8),a.Rb(11,"nx-dropdown-item",9),a.Rb(12,"nx-dropdown-item",10),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()),2&n&&(a.Eb(4),a.nc("nxValueFormatter",e.toText),a.Eb(1),a.nc("ngForOf",e.demoData),a.Eb(3),a.nc("nxDisabled",!0))},directives:[b.a,l.a,c.a,x.b,u.a,m.p,V.a],styles:[""]}),ln),un=((bn=function n(){o(this,n),this.ngModelBinding="Mini"}).\u0275fac=function(n){return new(n||bn)},bn.\u0275cmp=a.Kb({type:bn,selectors:[["dropdown-template-driven-example"]],decls:25,vars:5,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["nxLabel","Car brand"],["name","test",3,"ngModel","ngModelChange"],["ngModelDropdown",""],["nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],[1,"nx-margin-y-0"],["nxCol","12"],[1,"nx-margin-top-0","nx-margin-bottom-xs"],[1,"update-container"],["type","text"],["templateInput",""],["nxButton","primary small","type","button",1,"nx-margin-bottom-0",3,"click"]],template:function(n,e){if(1&n){var o=a.Xb();a.Wb(0,"div",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"form"),a.Wb(4,"nx-formfield",3),a.Wb(5,"nx-dropdown",4,5),a.dc("ngModelChange",function(n){return e.ngModelBinding=n}),a.Rb(7,"nx-dropdown-item",6),a.Rb(8,"nx-dropdown-item",7),a.Rb(9,"nx-dropdown-item",8),a.Rb(10,"nx-dropdown-item",9),a.Vb(),a.Vb(),a.Vb(),a.Wb(11,"p",10),a.Jc(12),a.Vb(),a.Wb(13,"p",10),a.Jc(14),a.ic(15,"json"),a.Vb(),a.Vb(),a.Vb(),a.Wb(16,"div",1),a.Wb(17,"div",11),a.Wb(18,"p",12),a.Jc(19,"Try to set the value to BMW, Audi, Volvo or Mini."),a.Vb(),a.Wb(20,"div",13),a.Rb(21,"input",14,15),a.Wb(23,"button",16),a.dc("click",function(){a.yc(o);var n=a.uc(22);return e.ngModelBinding=n.value}),a.Jc(24," Update "),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()}if(2&n){var t=a.uc(6);a.Eb(5),a.nc("ngModel",e.ngModelBinding),a.Eb(7),a.Lc("Current Value: ",t.value,""),a.Eb(2),a.Lc("Model: ",a.jc(15,3,e.ngModelBinding),"")}},directives:[b.a,l.a,c.a,p.z,p.q,p.r,x.b,u.a,p.p,p.s,V.a,Z.a],pipes:[m.h],styles:["button[_ngcontent-%COMP%]{margin-left:4px}.update-container[_ngcontent-%COMP%]{display:flex}"]}),bn),pn=i("ierq"),sn=((cn=function(){function n(){o(this,n)}return e(n,null,[{key:"components",value:function(){return{"dropdown-custom-label":g,"dropdown-disabled-items":y,"dropdown-filter":F,"dropdown-filter-custom":B,"dropdown-group":O,"dropdown-multi-select":A,"dropdown-negative":P,"dropdown-outline":U,"dropdown-placeholder":N,"dropdown-reactive":nn,"dropdown-rendering-items":rn,"dropdown-simple-binding":dn,"dropdown-standard":xn,"dropdown-template-driven":un}}}]),n}()).\u0275fac=function(n){return new(n||cn)},cn.\u0275mod=a.Ob({type:cn}),cn.\u0275inj=a.Nb({imports:[[d.b,r.e,pn.a]]}),cn)},ierq:function(n,e,t){"use strict";t.d(e,"a",function(){return x});var i=t("tgBs"),r=t("/sJ9"),d=t("eV8M"),a=t("gkbm"),b=t("ofXK"),l=t("3Pt+"),c=t("fXoL"),x=function(){var n=function n(){o(this,n)};return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=c.Ob({type:n}),n.\u0275inj=c.Nb({imports:[[],b.c,l.k,l.v,a.b,d.a,r.a,i.a]}),n}()}}])}();