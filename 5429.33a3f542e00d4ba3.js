"use strict";(self.webpackChunkopensource_documentation=self.webpackChunkopensource_documentation||[]).push([[5429],{5429:(Q,u,s)=>{s.r(u),s.d(u,{DatefieldExamplesModule:()=>ee});var r=s(1867),c=s(3412),m=s(3102),h=s(984),g=s(2465),D=s(9508),e=s(5e3),p=s(3252),l=s(3075);let _=(()=>{class t{constructor(){this.currentDate=null}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-basic-example"]],decls:9,vars:3,consts:[["nxLabel","Birthday"],["nxDatefield","","nxInput","",3,"nxDatepicker","ngModel","ngModelChange"],["nxFormfieldHint",""],["nxContext","info","nxFormfieldNote",""],["nxFormfieldSuffix","",3,"for"],["myDatepicker",""]],template:function(n,a){if(1&n&&(e.TgZ(0,"nx-formfield",0)(1,"input",1),e.NdJ("ngModelChange",function(d){return a.currentDate=d}),e.qZA(),e.TgZ(2,"span",2),e._uU(3,"MM/DD/YYYY"),e.qZA(),e.TgZ(4,"nx-message",3),e._uU(5," Provide your birthday date. Match the format or use the date picker. "),e.qZA(),e._UZ(6,"nx-datepicker-toggle",4)(7,"nx-datepicker",null,5),e.qZA()),2&n){const o=e.MAs(8);e.xp6(1),e.Q6J("nxDatepicker",o)("ngModel",a.currentDate),e.xp6(5),e.Q6J("for",o)}},directives:[p.VM,r.tE,c.aP,l.Fj,l.JJ,l.On,p.BE,m.wM,p.XO,r.uh,p.J2,r.Uu],styles:[""]}),t})(),M=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-disabled-example"]],decls:7,vars:2,consts:[["nxLabel","Date of damage"],["disabled","","nxDatefield","","nxInput","",3,"nxDatepicker"],["nxFormfieldHint",""],["nxFormfieldSuffix","",3,"for"],["picker1",""]],template:function(n,a){if(1&n&&(e.TgZ(0,"nx-formfield",0),e._UZ(1,"input",1),e.TgZ(2,"span",2),e._uU(3,"MM/DD/YYYY"),e.qZA(),e._UZ(4,"nx-datepicker-toggle",3)(5,"nx-datepicker",null,4),e.qZA()),2&n){const o=e.MAs(6);e.xp6(1),e.Q6J("nxDatepicker",o),e.xp6(3),e.Q6J("for",o)}},directives:[p.VM,r.tE,c.aP,p.BE,r.uh,p.J2,r.Uu],styles:[""]}),t})();var C=s(9808),Z=s(4204);function j(t,i){1&t&&(e.TgZ(0,"nx-error",7),e._uU(1," That's not the 6th of a month. "),e.qZA())}let v=(()=>{class t{constructor(){this.onlyDaysWith6=n=>6===(null==n?void 0:n.date())}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-filter-example"]],decls:9,vars:4,consts:[["nxLabel","Date of damage"],["ngModel","","nxDatefield","","nxInput","",3,"nxDatefieldFilter","nxDatepicker"],["dateFilterModel","ngModel"],["nxFormfieldHint",""],["nxFormfieldSuffix","",3,"for"],["picker3",""],["nxFormfieldError","",4,"ngIf"],["nxFormfieldError",""]],template:function(n,a){if(1&n&&(e.TgZ(0,"nx-formfield",0),e._UZ(1,"input",1,2),e.TgZ(3,"span",3),e._uU(4,"MM/DD/YYYY"),e.qZA(),e._UZ(5,"nx-datepicker-toggle",4)(6,"nx-datepicker",null,5),e.YNc(8,j,2,0,"nx-error",6),e.qZA()),2&n){const o=e.MAs(2),d=e.MAs(7);e.xp6(1),e.Q6J("nxDatefieldFilter",a.onlyDaysWith6)("nxDatepicker",d),e.xp6(4),e.Q6J("for",d),e.xp6(3),e.Q6J("ngIf",o.errors&&o.errors.nxDatefieldFilter)}},directives:[p.VM,l.Fj,r.tE,c.aP,l.JJ,l.On,p.BE,r.uh,p.J2,r.Uu,C.O5,Z.vV,p.Sr],styles:[""]}),t})();var x=s(5439);const O={parse:{dateInput:"LL"},display:{dateInput:"LL",monthYearLabel:"MMM YYYY",dateA11yLabel:"LL",monthYearA11yLabel:"MMMM YYYY"}};let T=(()=>{class t{constructor(){this.inputString=x()}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-format-injection-example"]],features:[e._Bn([{provide:r.Ad,useValue:O}])],decls:5,vars:3,consts:[["nxLabel","Birthday"],["nxDatefield","","nxInput","",3,"ngModel","nxDatepicker","ngModelChange"],["nxFormfieldSuffix","",3,"for"],["birthdayDatepicker",""]],template:function(n,a){if(1&n&&(e.TgZ(0,"nx-formfield",0)(1,"input",1),e.NdJ("ngModelChange",function(d){return a.inputString=d}),e.qZA(),e._UZ(2,"nx-datepicker-toggle",2)(3,"nx-datepicker",null,3),e.qZA()),2&n){const o=e.MAs(4);e.xp6(1),e.Q6J("ngModel",a.inputString)("nxDatepicker",o),e.xp6(1),e.Q6J("for",o)}},directives:[p.VM,r.tE,c.aP,l.Fj,l.JJ,l.On,r.uh,p.J2,r.Uu],styles:[""]}),t})();const B=function(){return["MM/DD/YYYY","MM--DD--\x3eYYYY"]};let y=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-formatting-example"]],decls:8,vars:4,consts:[["nxLabel","Date of damage"],["nxDisplayFormat","MM--DD--\x3eYYYY","ngModel","","nxDatefield","","nxInput","",3,"nxParseFormat","nxDatepicker"],["formatDatefield","nxDatefield"],["nxFormfieldHint",""],["nxFormfieldSuffix","",3,"for"],["myDatepicker",""]],template:function(n,a){if(1&n&&(e.TgZ(0,"nx-formfield",0),e._UZ(1,"input",1,2),e.TgZ(3,"span",3),e._uU(4," MM/DD/YYYY "),e.qZA(),e._UZ(5,"nx-datepicker-toggle",4)(6,"nx-datepicker",null,5),e.qZA()),2&n){const o=e.MAs(7);e.xp6(1),e.Q6J("nxParseFormat",e.DdM(3,B))("nxDatepicker",o),e.xp6(4),e.Q6J("for",o)}},directives:[p.VM,l.Fj,r.tE,c.aP,l.JJ,l.On,p.BE,r.uh,p.J2,r.Uu],styles:[""]}),t})();var f=s(7146),E=s(5552);const N={toggleIconTabindex:-1};let J=(()=>{class t{constructor(){this.date1=null}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-injection-token-example"]],features:[e._Bn([{provide:r.mv,useValue:N}])],decls:12,vars:3,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","6"],["nxHeadline","subsection-xsmall"],["nxLabel","Date"],["nxDatefield","","nxInput","",3,"nxDatepicker","ngModel","ngModelChange"],["nxFormfieldHint",""],["nxFormfieldSuffix","",3,"for"],["myDatepicker1",""]],template:function(n,a){if(1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h4",3),e._uU(4,"No focus on toggle (default)"),e.qZA(),e.TgZ(5,"nx-formfield",4)(6,"input",5),e.NdJ("ngModelChange",function(d){return a.date1=d}),e.qZA(),e.TgZ(7,"span",6),e._uU(8,"MM/DD/YYYY"),e.qZA(),e._UZ(9,"nx-datepicker-toggle",7)(10,"nx-datepicker",null,8),e.qZA()()()()),2&n){const o=e.MAs(11);e.xp6(6),e.Q6J("nxDatepicker",o)("ngModel",a.date1),e.xp6(3),e.Q6J("for",o)}},directives:[f.RH,f.yI,f.s7,E.s,p.VM,r.tE,c.aP,l.Fj,l.JJ,l.On,p.BE,r.uh,p.J2,r.Uu],styles:[""]}),t})(),F=(()=>{class t{constructor(){this.inputString="2020-01-01"}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-iso-example"]],decls:6,vars:2,consts:[["nxLabel","Birthday"],["nxDatefield","","nxInput","",3,"ngModel"],["nxFormfieldHint",""],["nxLabel","Insert ISO string"],["nxInput","",3,"ngModel","ngModelChange"]],template:function(n,a){1&n&&(e.TgZ(0,"nx-formfield",0),e._UZ(1,"input",1),e.TgZ(2,"span",2),e._uU(3,"MM/DD/YYYY"),e.qZA()(),e.TgZ(4,"nx-formfield",3)(5,"input",4),e.NdJ("ngModelChange",function(d){return a.inputString=d}),e.qZA()()),2&n&&(e.xp6(1),e.Q6J("ngModel",a.inputString),e.xp6(4),e.Q6J("ngModel",a.inputString))},directives:[p.VM,r.tE,c.aP,l.Fj,l.JJ,l.On,p.BE],styles:[""]}),t})(),A=(()=>{class t{constructor(n,a){this.nxDateAdapter=n,this.nxDateLocale=a,this.currentDate=null,this.currentLocale=a,this.nxDateAdapter.localeChanges.subscribe(o=>{this.currentLocale=o})}changeLocal(n){this.nxDateAdapter.setLocale(n)}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(r.dr),e.Y36(r.QL))},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-localize-date-example"]],decls:17,vars:4,consts:[["nxContext","info",1,"nx-margin-bottom-xs"],["name","currentLocale",3,"ngModel","ngModelChange"],["value","de-DE"],["value","en-US"],["value","ar-EG"],["value","ja"],["nxLabel","Date of damage"],["nxDatefield","","nxInput","",3,"nxDatepicker","ngModel","ngModelChange"],["nxFormfieldSuffix","",3,"for"],["myDatepicker",""]],template:function(n,a){if(1&n&&(e.TgZ(0,"nx-message",0),e._uU(1," Try changing the locale and look how the Datefield display format and parsing and the labels in the Datepicker calendar are changing."),e._UZ(2,"br"),e.TgZ(3,"select",1),e.NdJ("ngModelChange",function(d){return a.currentLocale=d})("ngModelChange",function(d){return a.changeLocal(d)}),e.TgZ(4,"option",2),e._uU(5,"de-DE"),e.qZA(),e.TgZ(6,"option",3),e._uU(7,"en-US"),e.qZA(),e.TgZ(8,"option",4),e._uU(9,"ar-EG"),e.qZA(),e.TgZ(10,"option",5),e._uU(11,"ja"),e.qZA()()(),e.TgZ(12,"nx-formfield",6)(13,"input",7),e.NdJ("ngModelChange",function(d){return a.currentDate=d}),e.qZA(),e._UZ(14,"nx-datepicker-toggle",8)(15,"nx-datepicker",null,9),e.qZA()),2&n){const o=e.MAs(16);e.xp6(3),e.Q6J("ngModel",a.currentLocale),e.xp6(10),e.Q6J("nxDatepicker",o)("ngModel",a.currentDate),e.xp6(1),e.Q6J("for",o)}},directives:[m.wM,l.EJ,l.JJ,l.On,l.YN,l.Kr,p.VM,r.tE,c.aP,l.Fj,r.uh,p.J2,r.Uu],styles:[""]}),t})(),R=(()=>{class t extends r.YW{constructor(){super(...arguments),this.calendarLabel="My Calendar",this.openCalendarLabel="Open my calendar",this.prevMonthLabel="My previous month",this.nextMonthLabel="My next month",this.prevYearLabel="My previous year",this.nextYearLabel="My next year",this.prevMultiYearLabel="My previous 20 years",this.nextMultiYearLabel="My next 20 years",this.switchToMonthViewLabel="Choose a special date",this.switchToMultiYearViewLabel="Choose button"}}return t.\u0275fac=function(){let i;return function(a){return(i||(i=e.n5z(t)))(a||t)}}(),t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac}),t})(),Y=(()=>{class t{constructor(){this.currentDate=null}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-localize-texts-example"]],features:[e._Bn([{provide:r.YW,useClass:R}])],decls:5,vars:3,consts:[["nxLabel","Date of damage"],["nxDatefield","","nxInput","",3,"nxDatepicker","ngModel","ngModelChange"],["nxFormfieldSuffix","",3,"for"],["myDatepicker",""]],template:function(n,a){if(1&n&&(e.TgZ(0,"nx-formfield",0)(1,"input",1),e.NdJ("ngModelChange",function(d){return a.currentDate=d}),e.qZA(),e._UZ(2,"nx-datepicker-toggle",2)(3,"nx-datepicker",null,3),e.qZA()),2&n){const o=e.MAs(4);e.xp6(1),e.Q6J("nxDatepicker",o)("ngModel",a.currentDate),e.xp6(1),e.Q6J("for",o)}},directives:[p.VM,r.tE,c.aP,l.Fj,l.JJ,l.On,r.uh,p.J2,r.Uu],styles:[""]}),t})();var w=s(9823);let k=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-manual-example"]],decls:6,vars:1,consts:[["nxLabel","Date of damage"],["nxInput","","nxDatefield","","ngModel","",3,"nxDatepicker"],["picker2",""],["nxButton","primary small","type","button",3,"click"]],template:function(n,a){if(1&n){const o=e.EpF();e.TgZ(0,"nx-formfield",0),e._UZ(1,"input",1)(2,"nx-datepicker",null,2),e.qZA(),e.TgZ(4,"button",3),e.NdJ("click",function(){return e.CHM(o),e.MAs(3).open()}),e._uU(5,"open / close"),e.qZA()}if(2&n){const o=e.MAs(3);e.xp6(1),e.Q6J("nxDatepicker",o)}},directives:[p.VM,c.aP,r.tE,l.Fj,l.JJ,l.On,r.Uu,w.XV],styles:[""]}),t})();function V(t,i){1&t&&(e.TgZ(0,"nx-error",7),e._uU(1," The date is too far in the future "),e.qZA())}function X(t,i){1&t&&(e.TgZ(0,"nx-error",7),e._uU(1," The date is too far in the past "),e.qZA())}function H(t,i){1&t&&(e.TgZ(0,"nx-error",7),e._uU(1," That's not a date "),e.qZA())}let U=(()=>{class t{constructor(){this.minDate=x([2010,1,1]),this.maxDate=x([2020,1,1])}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-min-max-example"]],decls:11,vars:7,consts:[["nxLabel","Date of damage"],["ngModel","","nxDatefield","","nxInput","",3,"nxMin","nxMax","nxDatepicker"],["dateMinMaxModel","ngModel"],["nxFormfieldHint",""],["nxFormfieldSuffix","",3,"for"],["picker2",""],["nxFormfieldError","",4,"ngIf"],["nxFormfieldError",""]],template:function(n,a){if(1&n&&(e.TgZ(0,"nx-formfield",0),e._UZ(1,"input",1,2),e.TgZ(3,"span",3),e._uU(4,"MM/DD/YYYY"),e.qZA(),e._UZ(5,"nx-datepicker-toggle",4)(6,"nx-datepicker",null,5),e.YNc(8,V,2,0,"nx-error",6),e.YNc(9,X,2,0,"nx-error",6),e.YNc(10,H,2,0,"nx-error",6),e.qZA()),2&n){const o=e.MAs(2),d=e.MAs(7);e.xp6(1),e.Q6J("nxMin",a.minDate)("nxMax",a.maxDate)("nxDatepicker",d),e.xp6(4),e.Q6J("for",d),e.xp6(3),e.Q6J("ngIf",o.errors&&o.errors.nxDatefieldMax),e.xp6(1),e.Q6J("ngIf",o.errors&&o.errors.nxDatefieldMin),e.xp6(1),e.Q6J("ngIf",o.errors&&o.errors.nxDatefieldParse)}},directives:[p.VM,l.Fj,r.tE,c.aP,l.JJ,l.On,p.BE,r.uh,p.J2,r.Uu,C.O5,Z.vV,p.Sr],styles:[""]}),t})();function z(t,i){if(1&t&&(e.TgZ(0,"div",1)(1,"div",14),e._uU(2),e._UZ(3,"br"),e._uU(4),e._UZ(5,"br"),e._uU(6),e._UZ(7,"br"),e.qZA()()),2&t){const n=e.oxw(),a=e.MAs(9);e.xp6(2),e.hij(" Current Locale: ",n.currentLocale," "),e.xp6(2),e.hij(" Formatted value: ",a.currentFormattedDate," "),e.xp6(2),e.hij(" Moment Object: ",a.value," ")}}function W(t,i){if(1&t&&(e.TgZ(0,"div",1)(1,"div",14),e._uU(2),e._UZ(3,"br"),e._uU(4),e._UZ(5,"br"),e._uU(6),e._UZ(7,"br"),e.qZA()()),2&t){const n=e.oxw(),a=e.MAs(22);e.xp6(2),e.hij(" Current Locale: ",n.currentLocale," "),e.xp6(2),e.hij(" Formatted value: ",a.currentFormattedDate,""),e.xp6(2),e.hij(" Moment Object: ",a.value," ")}}let L=(()=>{class t{constructor(n,a){this.nxDateAdapter=n,this.nxDateLocale=a,this.strictDate=x(),this.nonStrictDate=x(),this.openedStrict=!1,this.openedNonStrict=!1,this.parseFormat="MM/DD/YYYY",this.currentLocale=a,this.nxDateAdapter.localeChanges.subscribe(o=>{this.currentLocale=o})}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(r.dr),e.Y36(r.QL))},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-parsing-example"]],decls:31,vars:9,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12"],["nxHeadline","subsection-xsmall"],["nxCol","6"],["nxLabel","Date of damage"],["nxDatefield","","nxInput","","nxStrict","true",3,"nxParseFormat","ngModel","ngModelChange"],["strictDatefield","nxDatefield"],[1,"debug-switcher",3,"checked","checkedChange"],["nxRow","",4,"ngIf"],["nxDatefield","","nxInput","","nxStrict","false",3,"nxParseFormat","ngModel","ngModelChange"],["nonStrictDatefield","nxDatefield"],["nxLabel","Parse Pattern"],["nxInput","",3,"ngModel","ngModelChange"],["nxCol","12",1,"debug-container"]],template:function(n,a){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h6",3),e._uU(4,"Strict parsing:"),e.qZA()()(),e.TgZ(5,"div",1)(6,"div",4)(7,"nx-formfield",5)(8,"input",6,7),e.NdJ("ngModelChange",function(d){return a.strictDate=d}),e.qZA()()(),e.TgZ(10,"div",4)(11,"nx-switcher",8),e.NdJ("checkedChange",function(d){return a.openedStrict=d}),e._uU(12,"Debug date"),e.qZA()()(),e.YNc(13,z,8,3,"div",9),e.TgZ(14,"div",1)(15,"div",2)(16,"h6",3),e._uU(17,"Non-strict parsing:"),e.qZA()()(),e.TgZ(18,"div",1)(19,"div",4)(20,"nx-formfield",5)(21,"input",10,11),e.NdJ("ngModelChange",function(d){return a.nonStrictDate=d}),e.qZA()()(),e.TgZ(23,"div",4)(24,"nx-switcher",8),e.NdJ("checkedChange",function(d){return a.openedNonStrict=d}),e._uU(25,"Debug date"),e.qZA()()(),e.YNc(26,W,8,3,"div",9),e.TgZ(27,"div",1)(28,"div",2)(29,"nx-formfield",12)(30,"input",13),e.NdJ("ngModelChange",function(d){return a.parseFormat=d}),e.qZA()()()()()),2&n&&(e.xp6(8),e.Q6J("nxParseFormat",a.parseFormat)("ngModel",a.strictDate),e.xp6(3),e.Q6J("checked",a.openedStrict),e.xp6(2),e.Q6J("ngIf",a.openedStrict),e.xp6(8),e.Q6J("nxParseFormat",a.parseFormat)("ngModel",a.nonStrictDate),e.xp6(3),e.Q6J("checked",a.openedNonStrict),e.xp6(2),e.Q6J("ngIf",a.openedNonStrict),e.xp6(4),e.Q6J("ngModel",a.parseFormat))},directives:[f.RH,f.yI,f.s7,E.s,p.VM,r.tE,c.aP,l.Fj,l.JJ,l.On,g.A,C.O5],styles:[".debug-container[_ngcontent-%COMP%]{margin-bottom:24px}.debug-switcher[_ngcontent-%COMP%]{margin-top:20px}"]}),t})();const K=["endDatepicker"];let I=(()=>{class t{constructor(){this.startDate=null,this.endDate=null}updateEndDatepicker(){this.endDate=this.startDate,setTimeout(()=>this.endDatepicker.open())}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-range-example"]],viewQuery:function(n,a){if(1&n&&e.Gf(K,7),2&n){let o;e.iGM(o=e.CRH())&&(a.endDatepicker=o.first)}},decls:18,vars:6,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","6"],["nxLabel","Start date"],["nxDatefield","","nxInput","",3,"nxDatepicker","ngModel","ngModelChange","dateChange"],["nxFormfieldHint",""],["nxFormfieldSuffix","",3,"for"],["startDatepicker",""],["nxLabel","End date"],["nxDatefield","","nxInput","",3,"nxDatepicker","ngModel","ngModelChange"],["endDatepicker",""]],template:function(n,a){if(1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"input",4),e.NdJ("ngModelChange",function(d){return a.startDate=d})("dateChange",function(){return a.updateEndDatepicker()}),e.qZA(),e.TgZ(5,"span",5),e._uU(6,"MM/DD/YYYY"),e.qZA(),e._UZ(7,"nx-datepicker-toggle",6)(8,"nx-datepicker",null,7),e.qZA()(),e.TgZ(10,"div",2)(11,"nx-formfield",8)(12,"input",9),e.NdJ("ngModelChange",function(d){return a.endDate=d}),e.qZA(),e.TgZ(13,"span",5),e._uU(14,"MM/DD/YYYY"),e.qZA(),e._UZ(15,"nx-datepicker-toggle",6)(16,"nx-datepicker",null,10),e.qZA()()()()),2&n){const o=e.MAs(9),d=e.MAs(17);e.xp6(4),e.Q6J("nxDatepicker",o)("ngModel",a.startDate),e.xp6(3),e.Q6J("for",o),e.xp6(5),e.Q6J("nxDatepicker",d)("ngModel",a.endDate),e.xp6(3),e.Q6J("for",d)}},directives:[f.RH,f.yI,f.s7,p.VM,r.tE,c.aP,l.Fj,l.JJ,l.On,p.BE,r.uh,p.J2,r.Uu],styles:[""]}),t})(),S=(()=>{class t{constructor(){this.testForm=new l.cw({date:new l.NI("",{validators:l.kI.required})})}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-reactive-example"]],decls:8,vars:3,consts:[[3,"formGroup"],["nxLabel","Birthday"],["nxDatefield","","nxInput","","formControlName","date",3,"nxDatepicker"],["nxFormfieldHint",""],["nxFormfieldSuffix","",3,"for"],["myDatepicker",""]],template:function(n,a){if(1&n&&(e.TgZ(0,"form",0)(1,"nx-formfield",1),e._UZ(2,"input",2),e.TgZ(3,"span",3),e._uU(4,"MM/DD/YYYY"),e.qZA(),e._UZ(5,"nx-datepicker-toggle",4)(6,"nx-datepicker",null,5),e.qZA()()),2&n){const o=e.MAs(7);e.Q6J("formGroup",a.testForm),e.xp6(2),e.Q6J("nxDatepicker",o),e.xp6(3),e.Q6J("for",o)}},directives:[l._Y,l.JL,l.sg,p.VM,r.tE,c.aP,l.Fj,l.JJ,l.u,p.BE,r.uh,p.J2,r.Uu],styles:[""]}),t})();var G=s(1314);function $(t){return()=>t.scrollStrategies.close({threshold:100})}let P=(()=>{class t{constructor(){this.currentDate=null}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-scroll-strategy-provider-example"]],features:[e._Bn([{provide:r.AF,useFactory:$,deps:[G.aV]}])],decls:8,vars:3,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","6"],["nxLabel","Birthday"],["nxDatefield","","nxInput","",3,"nxDatepicker","ngModel","ngModelChange"],["nxFormfieldSuffix","",3,"for"],["myDatepicker",""]],template:function(n,a){if(1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"input",4),e.NdJ("ngModelChange",function(d){return a.currentDate=d}),e.qZA(),e._UZ(5,"nx-datepicker-toggle",5)(6,"nx-datepicker",null,6),e.qZA()()()()),2&n){const o=e.MAs(7);e.xp6(4),e.Q6J("nxDatepicker",o)("ngModel",a.currentDate),e.xp6(1),e.Q6J("for",o)}},directives:[f.RH,f.yI,f.s7,p.VM,r.tE,c.aP,l.Fj,l.JJ,l.On,r.uh,p.J2,r.Uu],styles:[""]}),t})(),b=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-startview-example"]],decls:5,vars:2,consts:[["nxLabel","Date of damage"],["nxInput","","nxDatefield","","ngModel","",3,"nxDatepicker"],["nxFormfieldSuffix","",3,"for"],["startView","year"],["picker1",""]],template:function(n,a){if(1&n&&(e.TgZ(0,"nx-formfield",0),e._UZ(1,"input",1)(2,"nx-datepicker-toggle",2)(3,"nx-datepicker",3,4),e.qZA()),2&n){const o=e.MAs(4);e.xp6(1),e.Q6J("nxDatepicker",o),e.xp6(1),e.Q6J("for",o)}},directives:[p.VM,c.aP,r.tE,l.Fj,l.JJ,l.On,r.uh,p.J2,r.Uu],styles:[""]}),t})(),q=(()=>{class t{constructor(){this.date1=null,this.date2=null}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["datefield-toggle-focus-example"]],decls:22,vars:6,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","6"],["nxHeadline","subsection-xsmall"],["nxLabel","Date"],["nxDatefield","","nxInput","",3,"nxDatepicker","ngModel","ngModelChange"],["nxFormfieldHint",""],["nxFormfieldSuffix","",3,"for"],["myDatepicker1",""],["tabindex","-1","nxFormfieldSuffix","",3,"for"],["myDatepicker2",""]],template:function(n,a){if(1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h4",3),e._uU(4,"With focus on toggle (default)"),e.qZA(),e.TgZ(5,"nx-formfield",4)(6,"input",5),e.NdJ("ngModelChange",function(d){return a.date1=d}),e.qZA(),e.TgZ(7,"span",6),e._uU(8,"MM/DD/YYYY"),e.qZA(),e._UZ(9,"nx-datepicker-toggle",7)(10,"nx-datepicker",null,8),e.qZA()(),e.TgZ(12,"div",2)(13,"h4",3),e._uU(14,"Without focus on toggle"),e.qZA(),e.TgZ(15,"nx-formfield",4)(16,"input",5),e.NdJ("ngModelChange",function(d){return a.date2=d}),e.qZA(),e.TgZ(17,"span",6),e._uU(18,"MM/DD/YYYY"),e.qZA(),e._UZ(19,"nx-datepicker-toggle",9)(20,"nx-datepicker",null,10),e.qZA()()()()),2&n){const o=e.MAs(11),d=e.MAs(21);e.xp6(6),e.Q6J("nxDatepicker",o)("ngModel",a.date1),e.xp6(3),e.Q6J("for",o),e.xp6(7),e.Q6J("nxDatepicker",d)("ngModel",a.date2),e.xp6(3),e.Q6J("for",d)}},directives:[f.RH,f.yI,f.s7,E.s,p.VM,r.tE,c.aP,l.Fj,l.JJ,l.On,p.BE,r.uh,p.J2,r.Uu],styles:[""]}),t})(),ee=(()=>{class t{static components(){return{"datefield-basic":_,"datefield-disabled":M,"datefield-filter":v,"datefield-format-injection":T,"datefield-formatting":y,"datefield-injection-token":J,"datefield-iso":F,"datefield-localize-date":A,"datefield-localize-texts":Y,"datefield-manual":k,"datefield-min-max":U,"datefield-parsing":L,"datefield-range":I,"datefield-reactive":S,"datefield-startview":b,"datefield-toggle-focus":q,"datefield-scroll-strategy-provider":P}}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[r.iS,h.W8,c.ZI,g.g,m.Ee,D.f]]}),t})()},9508:(Q,u,s)=>{s.d(u,{f:()=>p});var r=s(7146),c=s(303),m=s(5552),h=s(9823),g=s(9808),D=s(3075),e=s(5e3);let p=(()=>{class l{}return l.\u0275fac=function(M){return new(M||l)},l.\u0275mod=e.oAB({type:l}),l.\u0275inj=e.cJS({imports:[[],g.ez,D.u5,D.UX,h.ru,m.X,c.K,r.TW]}),l})()}}]);