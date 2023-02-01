var MultiColumnPlugin=function(t,r,e){"use strict";var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},o=function(t){return t&&t.Math==Math&&t},a=o("object"==typeof globalThis&&globalThis)||o("object"==typeof window&&window)||o("object"==typeof self&&self)||o("object"==typeof n&&n)||function(){return this}()||Function("return this")(),i={},c=function(t){try{return!!t()}catch(t){return!0}},u=!c((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),s=!c((function(){var t=function(){}.bind();return"function"!=typeof t||t.hasOwnProperty("prototype")})),f=s,l=Function.prototype.call,p=f?l.bind(l):function(){return l.apply(l,arguments)},y={},d={}.propertyIsEnumerable,g=Object.getOwnPropertyDescriptor,h=g&&!d.call({1:2},1);y.f=h?function(t){var r=g(this,t);return!!r&&r.enumerable}:d;var v,m,b=function(t,r){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:r}},E=s,w=Function.prototype,A=w.call,O=E&&w.bind.bind(A,A),T=E?O:function(t){return function(){return A.apply(t,arguments)}},R=T,S=R({}.toString),I=R("".slice),D=function(t){return I(S(t),8,-1)},k=c,C=D,_=Object,j=T("".split),M=k((function(){return!_("z").propertyIsEnumerable(0)}))?function(t){return"String"==C(t)?j(t,""):_(t)}:_,x=function(t){return null==t},P=x,F=TypeError,L=function(t){if(P(t))throw F("Can't call method on "+t);return t},U=M,N=L,B=function(t){return U(N(t))},V="object"==typeof document&&document.all,z={all:V,IS_HTMLDDA:void 0===V&&void 0!==V},H=z.all,W=z.IS_HTMLDDA?function(t){return"function"==typeof t||t===H}:function(t){return"function"==typeof t},G=W,Y=z.all,Q=z.IS_HTMLDDA?function(t){return"object"==typeof t?null!==t:G(t)||t===Y}:function(t){return"object"==typeof t?null!==t:G(t)},X=a,q=W,K=function(t){return q(t)?t:void 0},Z=function(t,r){return arguments.length<2?K(X[t]):X[t]&&X[t][r]},$=T({}.isPrototypeOf),J="undefined"!=typeof navigator&&String(navigator.userAgent)||"",tt=a,rt=J,et=tt.process,nt=tt.Deno,ot=et&&et.versions||nt&&nt.version,at=ot&&ot.v8;at&&(m=(v=at.split("."))[0]>0&&v[0]<4?1:+(v[0]+v[1])),!m&&rt&&(!(v=rt.match(/Edge\/(\d+)/))||v[1]>=74)&&(v=rt.match(/Chrome\/(\d+)/))&&(m=+v[1]);var it=m,ct=it,ut=c,st=!!Object.getOwnPropertySymbols&&!ut((function(){var t=Symbol();return!String(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&ct&&ct<41})),ft=st&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,lt=Z,pt=W,yt=$,dt=Object,gt=ft?function(t){return"symbol"==typeof t}:function(t){var r=lt("Symbol");return pt(r)&&yt(r.prototype,dt(t))},ht=String,vt=function(t){try{return ht(t)}catch(t){return"Object"}},mt=W,bt=vt,Et=TypeError,wt=function(t){if(mt(t))return t;throw Et(bt(t)+" is not a function")},At=wt,Ot=x,Tt=function(t,r){var e=t[r];return Ot(e)?void 0:At(e)},Rt=p,St=W,It=Q,Dt=TypeError,kt={},Ct={get exports(){return kt},set exports(t){kt=t}},_t=a,jt=Object.defineProperty,Mt=function(t,r){try{jt(_t,t,{value:r,configurable:!0,writable:!0})}catch(e){_t[t]=r}return r},xt=Mt,Pt="__core-js_shared__",Ft=a[Pt]||xt(Pt,{}),Lt=Ft;(Ct.exports=function(t,r){return Lt[t]||(Lt[t]=void 0!==r?r:{})})("versions",[]).push({version:"3.27.2",mode:"global",copyright:"© 2014-2023 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.27.2/LICENSE",source:"https://github.com/zloirock/core-js"});var Ut=L,Nt=Object,Bt=function(t){return Nt(Ut(t))},Vt=Bt,zt=T({}.hasOwnProperty),Ht=Object.hasOwn||function(t,r){return zt(Vt(t),r)},Wt=T,Gt=0,Yt=Math.random(),Qt=Wt(1..toString),Xt=function(t){return"Symbol("+(void 0===t?"":t)+")_"+Qt(++Gt+Yt,36)},qt=kt,Kt=Ht,Zt=Xt,$t=st,Jt=ft,tr=a.Symbol,rr=qt("wks"),er=Jt?tr.for||tr:tr&&tr.withoutSetter||Zt,nr=function(t){return Kt(rr,t)||(rr[t]=$t&&Kt(tr,t)?tr[t]:er("Symbol."+t)),rr[t]},or=p,ar=Q,ir=gt,cr=Tt,ur=function(t,r){var e,n;if("string"===r&&St(e=t.toString)&&!It(n=Rt(e,t)))return n;if(St(e=t.valueOf)&&!It(n=Rt(e,t)))return n;if("string"!==r&&St(e=t.toString)&&!It(n=Rt(e,t)))return n;throw Dt("Can't convert object to primitive value")},sr=TypeError,fr=nr("toPrimitive"),lr=function(t,r){if(!ar(t)||ir(t))return t;var e,n=cr(t,fr);if(n){if(void 0===r&&(r="default"),e=or(n,t,r),!ar(e)||ir(e))return e;throw sr("Can't convert object to primitive value")}return void 0===r&&(r="number"),ur(t,r)},pr=gt,yr=function(t){var r=lr(t,"string");return pr(r)?r:r+""},dr=Q,gr=a.document,hr=dr(gr)&&dr(gr.createElement),vr=function(t){return hr?gr.createElement(t):{}},mr=vr,br=!u&&!c((function(){return 7!=Object.defineProperty(mr("div"),"a",{get:function(){return 7}}).a})),Er=u,wr=p,Ar=y,Or=b,Tr=B,Rr=yr,Sr=Ht,Ir=br,Dr=Object.getOwnPropertyDescriptor;i.f=Er?Dr:function(t,r){if(t=Tr(t),r=Rr(r),Ir)try{return Dr(t,r)}catch(t){}if(Sr(t,r))return Or(!wr(Ar.f,t,r),t[r])};var kr={},Cr=u&&c((function(){return 42!=Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype})),_r=Q,jr=String,Mr=TypeError,xr=function(t){if(_r(t))return t;throw Mr(jr(t)+" is not an object")},Pr=u,Fr=br,Lr=Cr,Ur=xr,Nr=yr,Br=TypeError,Vr=Object.defineProperty,zr=Object.getOwnPropertyDescriptor,Hr="enumerable",Wr="configurable",Gr="writable";kr.f=Pr?Lr?function(t,r,e){if(Ur(t),r=Nr(r),Ur(e),"function"==typeof t&&"prototype"===r&&"value"in e&&Gr in e&&!e[Gr]){var n=zr(t,r);n&&n[Gr]&&(t[r]=e.value,e={configurable:Wr in e?e[Wr]:n[Wr],enumerable:Hr in e?e[Hr]:n[Hr],writable:!1})}return Vr(t,r,e)}:Vr:function(t,r,e){if(Ur(t),r=Nr(r),Ur(e),Fr)try{return Vr(t,r,e)}catch(t){}if("get"in e||"set"in e)throw Br("Accessors not supported");return"value"in e&&(t[r]=e.value),t};var Yr=kr,Qr=b,Xr=u?function(t,r,e){return Yr.f(t,r,Qr(1,e))}:function(t,r,e){return t[r]=e,t},qr={},Kr={get exports(){return qr},set exports(t){qr=t}},Zr=u,$r=Ht,Jr=Function.prototype,te=Zr&&Object.getOwnPropertyDescriptor,re=$r(Jr,"name"),ee={EXISTS:re,PROPER:re&&"something"===function(){}.name,CONFIGURABLE:re&&(!Zr||Zr&&te(Jr,"name").configurable)},ne=W,oe=Ft,ae=T(Function.toString);ne(oe.inspectSource)||(oe.inspectSource=function(t){return ae(t)});var ie,ce,ue,se=oe.inspectSource,fe=W,le=a.WeakMap,pe=fe(le)&&/native code/.test(String(le)),ye=Xt,de=kt("keys"),ge=function(t){return de[t]||(de[t]=ye(t))},he={},ve=pe,me=a,be=Q,Ee=Xr,we=Ht,Ae=Ft,Oe=ge,Te=he,Re="Object already initialized",Se=me.TypeError,Ie=me.WeakMap;if(ve||Ae.state){var De=Ae.state||(Ae.state=new Ie);De.get=De.get,De.has=De.has,De.set=De.set,ie=function(t,r){if(De.has(t))throw Se(Re);return r.facade=t,De.set(t,r),r},ce=function(t){return De.get(t)||{}},ue=function(t){return De.has(t)}}else{var ke=Oe("state");Te[ke]=!0,ie=function(t,r){if(we(t,ke))throw Se(Re);return r.facade=t,Ee(t,ke,r),r},ce=function(t){return we(t,ke)?t[ke]:{}},ue=function(t){return we(t,ke)}}var Ce={set:ie,get:ce,has:ue,enforce:function(t){return ue(t)?ce(t):ie(t,{})},getterFor:function(t){return function(r){var e;if(!be(r)||(e=ce(r)).type!==t)throw Se("Incompatible receiver, "+t+" required");return e}}},_e=T,je=c,Me=W,xe=Ht,Pe=u,Fe=ee.CONFIGURABLE,Le=se,Ue=Ce.enforce,Ne=Ce.get,Be=String,Ve=Object.defineProperty,ze=_e("".slice),He=_e("".replace),We=_e([].join),Ge=Pe&&!je((function(){return 8!==Ve((function(){}),"length",{value:8}).length})),Ye=String(String).split("String"),Qe=Kr.exports=function(t,r,e){"Symbol("===ze(Be(r),0,7)&&(r="["+He(Be(r),/^Symbol\(([^)]*)\)/,"$1")+"]"),e&&e.getter&&(r="get "+r),e&&e.setter&&(r="set "+r),(!xe(t,"name")||Fe&&t.name!==r)&&(Pe?Ve(t,"name",{value:r,configurable:!0}):t.name=r),Ge&&e&&xe(e,"arity")&&t.length!==e.arity&&Ve(t,"length",{value:e.arity});try{e&&xe(e,"constructor")&&e.constructor?Pe&&Ve(t,"prototype",{writable:!1}):t.prototype&&(t.prototype=void 0)}catch(t){}var n=Ue(t);return xe(n,"source")||(n.source=We(Ye,"string"==typeof r?r:"")),t};Function.prototype.toString=Qe((function(){return Me(this)&&Ne(this).source||Le(this)}),"toString");var Xe=W,qe=kr,Ke=qr,Ze=Mt,$e=function(t,r,e,n){n||(n={});var o=n.enumerable,a=void 0!==n.name?n.name:r;if(Xe(e)&&Ke(e,a,n),n.global)o?t[r]=e:Ze(r,e);else{try{n.unsafe?t[r]&&(o=!0):delete t[r]}catch(t){}o?t[r]=e:qe.f(t,r,{value:e,enumerable:!1,configurable:!n.nonConfigurable,writable:!n.nonWritable})}return t},Je={},tn=Math.ceil,rn=Math.floor,en=Math.trunc||function(t){var r=+t;return(r>0?rn:tn)(r)},nn=function(t){var r=+t;return r!=r||0===r?0:en(r)},on=nn,an=Math.max,cn=Math.min,un=nn,sn=Math.min,fn=function(t){return t>0?sn(un(t),9007199254740991):0},ln=function(t){return fn(t.length)},pn=B,yn=function(t,r){var e=on(t);return e<0?an(e+r,0):cn(e,r)},dn=ln,gn=function(t){return function(r,e,n){var o,a=pn(r),i=dn(a),c=yn(n,i);if(t&&e!=e){for(;i>c;)if((o=a[c++])!=o)return!0}else for(;i>c;c++)if((t||c in a)&&a[c]===e)return t||c||0;return!t&&-1}},hn={includes:gn(!0),indexOf:gn(!1)},vn=Ht,mn=B,bn=hn.indexOf,En=he,wn=T([].push),An=function(t,r){var e,n=mn(t),o=0,a=[];for(e in n)!vn(En,e)&&vn(n,e)&&wn(a,e);for(;r.length>o;)vn(n,e=r[o++])&&(~bn(a,e)||wn(a,e));return a},On=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],Tn=An,Rn=On.concat("length","prototype");Je.f=Object.getOwnPropertyNames||function(t){return Tn(t,Rn)};var Sn={};Sn.f=Object.getOwnPropertySymbols;var In=Z,Dn=Je,kn=Sn,Cn=xr,_n=T([].concat),jn=In("Reflect","ownKeys")||function(t){var r=Dn.f(Cn(t)),e=kn.f;return e?_n(r,e(t)):r},Mn=Ht,xn=jn,Pn=i,Fn=kr,Ln=function(t,r,e){for(var n=xn(r),o=Fn.f,a=Pn.f,i=0;i<n.length;i++){var c=n[i];Mn(t,c)||e&&Mn(e,c)||o(t,c,a(r,c))}},Un=c,Nn=W,Bn=/#|\.prototype\./,Vn=function(t,r){var e=Hn[zn(t)];return e==Gn||e!=Wn&&(Nn(r)?Un(r):!!r)},zn=Vn.normalize=function(t){return String(t).replace(Bn,".").toLowerCase()},Hn=Vn.data={},Wn=Vn.NATIVE="N",Gn=Vn.POLYFILL="P",Yn=Vn,Qn=a,Xn=i.f,qn=Xr,Kn=$e,Zn=Mt,$n=Ln,Jn=Yn,to=function(t,r){var e,n,o,a,i,c=t.target,u=t.global,s=t.stat;if(e=u?Qn:s?Qn[c]||Zn(c,{}):(Qn[c]||{}).prototype)for(n in r){if(a=r[n],o=t.dontCallGetSet?(i=Xn(e,n))&&i.value:e[n],!Jn(u?n:c+(s?".":"#")+n,t.forced)&&void 0!==o){if(typeof a==typeof o)continue;$n(a,o)}(t.sham||o&&o.sham)&&qn(a,"sham",!0),Kn(e,n,a,t)}},ro=s,eo=Function.prototype,no=eo.apply,oo=eo.call,ao="object"==typeof Reflect&&Reflect.apply||(ro?oo.bind(no):function(){return oo.apply(no,arguments)}),io=W,co=String,uo=TypeError,so=T,fo=xr,lo=function(t){if("object"==typeof t||io(t))return t;throw uo("Can't set "+co(t)+" as a prototype")},po=Object.setPrototypeOf||("__proto__"in{}?function(){var t,r=!1,e={};try{(t=so(Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set))(e,[]),r=e instanceof Array}catch(t){}return function(e,n){return fo(e),lo(n),r?t(e,n):e.__proto__=n,e}}():void 0),yo=kr.f,go=W,ho=Q,vo=po,mo=function(t,r,e){var n,o;return vo&&go(n=r.constructor)&&n!==e&&ho(o=n.prototype)&&o!==e.prototype&&vo(t,o),t},bo={};bo[nr("toStringTag")]="z";var Eo="[object z]"===String(bo),wo=W,Ao=D,Oo=nr("toStringTag"),To=Object,Ro="Arguments"==Ao(function(){return arguments}()),So=Eo?Ao:function(t){var r,e,n;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=function(t,r){try{return t[r]}catch(t){}}(r=To(t),Oo))?e:Ro?Ao(r):"Object"==(n=Ao(r))&&wo(r.callee)?"Arguments":n},Io=So,Do=String,ko=function(t){if("Symbol"===Io(t))throw TypeError("Cannot convert a Symbol value to a string");return Do(t)},Co=ko,_o=function(t,r){return void 0===t?arguments.length<2?"":r:Co(t)},jo=Q,Mo=Xr,xo=Error,Po=T("".replace),Fo=String(xo("zxcasd").stack),Lo=/\n\s*at [^:]*:[^\n]*/,Uo=Lo.test(Fo),No=function(t,r){if(Uo&&"string"==typeof t&&!xo.prepareStackTrace)for(;r--;)t=Po(t,Lo,"");return t},Bo=b,Vo=!c((function(){var t=Error("a");return!("stack"in t)||(Object.defineProperty(t,"stack",Bo(1,7)),7!==t.stack)})),zo=Xr,Ho=No,Wo=Vo,Go=Error.captureStackTrace,Yo=Z,Qo=Ht,Xo=Xr,qo=$,Ko=po,Zo=Ln,$o=function(t,r,e){e in t||yo(t,e,{configurable:!0,get:function(){return r[e]},set:function(t){r[e]=t}})},Jo=mo,ta=_o,ra=function(t,r){jo(r)&&"cause"in r&&Mo(t,"cause",r.cause)},ea=function(t,r,e,n){Wo&&(Go?Go(t,r):zo(t,"stack",Ho(e,n)))},na=u,oa=function(t,r,e,n){var o="stackTraceLimit",a=n?2:1,i=t.split("."),c=i[i.length-1],u=Yo.apply(null,i);if(u){var s=u.prototype;if(Qo(s,"cause")&&delete s.cause,!e)return u;var f=Yo("Error"),l=r((function(t,r){var e=ta(n?r:t,void 0),o=n?new u(t):new u;return void 0!==e&&Xo(o,"message",e),ea(o,l,o.stack,2),this&&qo(s,this)&&Jo(o,this,l),arguments.length>a&&ra(o,arguments[a]),o}));l.prototype=s,"Error"!==c?Ko?Ko(l,f):Zo(l,f,{name:!0}):na&&o in u&&($o(l,u,o),$o(l,u,"prepareStackTrace")),Zo(l,u);try{s.name!==c&&Xo(s,"name",c),s.constructor=l}catch(t){}return l}},aa=to,ia=ao,ca=oa,ua="WebAssembly",sa=a[ua],fa=7!==Error("e",{cause:7}).cause,la=function(t,r){var e={};e[t]=ca(t,r,fa),aa({global:!0,constructor:!0,arity:1,forced:fa},e)},pa=function(t,r){if(sa&&sa[t]){var e={};e[t]=ca(ua+"."+t,r,fa),aa({target:ua,stat:!0,constructor:!0,arity:1,forced:fa},e)}};la("Error",(function(t){return function(r){return ia(t,this,arguments)}})),la("EvalError",(function(t){return function(r){return ia(t,this,arguments)}})),la("RangeError",(function(t){return function(r){return ia(t,this,arguments)}})),la("ReferenceError",(function(t){return function(r){return ia(t,this,arguments)}})),la("SyntaxError",(function(t){return function(r){return ia(t,this,arguments)}})),la("TypeError",(function(t){return function(r){return ia(t,this,arguments)}})),la("URIError",(function(t){return function(r){return ia(t,this,arguments)}})),pa("CompileError",(function(t){return function(r){return ia(t,this,arguments)}})),pa("LinkError",(function(t){return function(r){return ia(t,this,arguments)}})),pa("RuntimeError",(function(t){return function(r){return ia(t,this,arguments)}}));var ya=to,da=ao,ga=c,ha=oa,va="AggregateError",ma=Z(va),ba=!ga((function(){return 1!==ma([1]).errors[0]}))&&ga((function(){return 7!==ma([1],va,{cause:7}).cause}));ya({global:!0,constructor:!0,arity:2,forced:ba},{AggregateError:ha(va,(function(t){return function(r,e){return da(t,this,arguments)}}),ba,!0)});var Ea={},wa=An,Aa=On,Oa=Object.keys||function(t){return wa(t,Aa)},Ta=u,Ra=Cr,Sa=kr,Ia=xr,Da=B,ka=Oa;Ea.f=Ta&&!Ra?Object.defineProperties:function(t,r){Ia(t);for(var e,n=Da(r),o=ka(r),a=o.length,i=0;a>i;)Sa.f(t,e=o[i++],n[e]);return t};var Ca,_a=Z("document","documentElement"),ja=xr,Ma=Ea,xa=On,Pa=he,Fa=_a,La=vr,Ua="prototype",Na="script",Ba=ge("IE_PROTO"),Va=function(){},za=function(t){return"<"+Na+">"+t+"</"+Na+">"},Ha=function(t){t.write(za("")),t.close();var r=t.parentWindow.Object;return t=null,r},Wa=function(){try{Ca=new ActiveXObject("htmlfile")}catch(t){}var t,r,e;Wa="undefined"!=typeof document?document.domain&&Ca?Ha(Ca):(r=La("iframe"),e="java"+Na+":",r.style.display="none",Fa.appendChild(r),r.src=String(e),(t=r.contentWindow.document).open(),t.write(za("document.F=Object")),t.close(),t.F):Ha(Ca);for(var n=xa.length;n--;)delete Wa[Ua][xa[n]];return Wa()};Pa[Ba]=!0;var Ga=nr,Ya=Object.create||function(t,r){var e;return null!==t?(Va[Ua]=ja(t),e=new Va,Va[Ua]=null,e[Ba]=t):e=Wa(),void 0===r?e:Ma.f(e,r)},Qa=kr.f,Xa=Ga("unscopables"),qa=Array.prototype;null==qa[Xa]&&Qa(qa,Xa,{configurable:!0,value:Ya(null)});var Ka=function(t){qa[Xa][t]=!0},Za=Bt,$a=ln,Ja=nn,ti=Ka;to({target:"Array",proto:!0},{at:function(t){var r=Za(this),e=$a(r),n=Ja(t),o=n>=0?n:e+n;return o<0||o>=e?void 0:r[o]}}),ti("at");var ri=D,ei=T,ni=function(t){if("Function"===ri(t))return ei(t)},oi=wt,ai=s,ii=ni(ni.bind),ci=function(t,r){return oi(t),void 0===r?t:ai?ii(t,r):function(){return t.apply(r,arguments)}},ui=ci,si=M,fi=Bt,li=ln,pi=function(t){var r=1==t;return function(e,n,o){for(var a,i=fi(e),c=si(i),u=ui(n,o),s=li(c);s-- >0;)if(u(a=c[s],s,i))switch(t){case 0:return a;case 1:return s}return r?-1:void 0}},yi={findLast:pi(0),findLastIndex:pi(1)},di=yi.findLast,gi=Ka;to({target:"Array",proto:!0},{findLast:function(t){return di(this,t,arguments.length>1?arguments[1]:void 0)}}),gi("findLast");var hi=yi.findLastIndex,vi=Ka;to({target:"Array",proto:!0},{findLastIndex:function(t){return hi(this,t,arguments.length>1?arguments[1]:void 0)}}),vi("findLastIndex");var mi=D,bi=u,Ei=Array.isArray||function(t){return"Array"==mi(t)},wi=TypeError,Ai=Object.getOwnPropertyDescriptor,Oi=bi&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(t){return t instanceof TypeError}}()?function(t,r){if(Ei(t)&&!Ai(t,"length").writable)throw wi("Cannot set read only .length");return t.length=r}:function(t,r){return t.length=r},Ti=TypeError,Ri=function(t){if(t>9007199254740991)throw Ti("Maximum allowed index exceeded");return t},Si=Bt,Ii=ln,Di=Oi,ki=Ri;to({target:"Array",proto:!0,arity:1,forced:c((function(){return 4294967297!==[].push.call({length:4294967296},1)}))||!function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(t){return t instanceof TypeError}}()},{push:function(t){var r=Si(this),e=Ii(r),n=arguments.length;ki(e+n);for(var o=0;o<n;o++)r[e]=arguments[o],e++;return Di(r,e),e}});var Ci=vt,_i=TypeError,ji=Bt,Mi=ln,xi=Oi,Pi=function(t,r){if(!delete t[r])throw _i("Cannot delete property "+Ci(r)+" of "+Ci(t))},Fi=Ri;to({target:"Array",proto:!0,arity:1,forced:1!==[].unshift(0)||!function(){try{Object.defineProperty([],"length",{writable:!1}).unshift()}catch(t){return t instanceof TypeError}}()},{unshift:function(t){var r=ji(this),e=Mi(r),n=arguments.length;if(n){Fi(e+n);for(var o=e;o--;){var a=o+n;o in r?r[a]=r[o]:Pi(r,a)}for(var i=0;i<n;i++)r[i]=arguments[i]}return xi(r,e+n)}}),to({target:"Object",stat:!0},{hasOwn:Ht});var Li=qr,Ui=kr,Ni=xr,Bi=function(){var t=Ni(this),r="";return t.hasIndices&&(r+="d"),t.global&&(r+="g"),t.ignoreCase&&(r+="i"),t.multiline&&(r+="m"),t.dotAll&&(r+="s"),t.unicode&&(r+="u"),t.unicodeSets&&(r+="v"),t.sticky&&(r+="y"),r},Vi=u,zi=function(t,r,e){return e.get&&Li(e.get,r,{getter:!0}),e.set&&Li(e.set,r,{setter:!0}),Ui.f(t,r,e)},Hi=Bi,Wi=c,Gi=a.RegExp,Yi=Gi.prototype,Qi=Vi&&Wi((function(){var t=!0;try{Gi(".","d")}catch(r){t=!1}var r={},e="",n=t?"dgimsy":"gimsy",o=function(t,n){Object.defineProperty(r,t,{get:function(){return e+=n,!0}})},a={dotAll:"s",global:"g",ignoreCase:"i",multiline:"m",sticky:"y"};for(var i in t&&(a.hasIndices="d"),a)o(i,a[i]);return Object.getOwnPropertyDescriptor(Yi,"flags").get.call(r)!==n||e!==n}));Qi&&zi(Yi,"flags",{configurable:!0,get:Hi});var Xi=to,qi=L,Ki=nn,Zi=ko,$i=c,Ji=T("".charAt);Xi({target:"String",proto:!0,forced:$i((function(){return"\ud842"!=="𠮷".at(-2)}))},{at:function(t){var r=Zi(qi(this)),e=r.length,n=Ki(t),o=n>=0?n:e+n;return o<0||o>=e?void 0:Ji(r,o)}});var tc,rc,ec,nc="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView,oc=!c((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype})),ac=Ht,ic=W,cc=Bt,uc=oc,sc=ge("IE_PROTO"),fc=Object,lc=fc.prototype,pc=uc?fc.getPrototypeOf:function(t){var r=cc(t);if(ac(r,sc))return r[sc];var e=r.constructor;return ic(e)&&r instanceof e?e.prototype:r instanceof fc?lc:null},yc=nc,dc=u,gc=a,hc=W,vc=Q,mc=Ht,bc=So,Ec=vt,wc=Xr,Ac=$e,Oc=kr.f,Tc=$,Rc=pc,Sc=po,Ic=nr,Dc=Xt,kc=Ce.enforce,Cc=Ce.get,_c=gc.Int8Array,jc=_c&&_c.prototype,Mc=gc.Uint8ClampedArray,xc=Mc&&Mc.prototype,Pc=_c&&Rc(_c),Fc=jc&&Rc(jc),Lc=Object.prototype,Uc=gc.TypeError,Nc=Ic("toStringTag"),Bc=Dc("TYPED_ARRAY_TAG"),Vc="TypedArrayConstructor",zc=yc&&!!Sc&&"Opera"!==bc(gc.opera),Hc=!1,Wc={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8},Gc={BigInt64Array:8,BigUint64Array:8},Yc=function(t){var r=Rc(t);if(vc(r)){var e=Cc(r);return e&&mc(e,Vc)?e[Vc]:Yc(r)}},Qc=function(t){if(!vc(t))return!1;var r=bc(t);return mc(Wc,r)||mc(Gc,r)};for(tc in Wc)(ec=(rc=gc[tc])&&rc.prototype)?kc(ec)[Vc]=rc:zc=!1;for(tc in Gc)(ec=(rc=gc[tc])&&rc.prototype)&&(kc(ec)[Vc]=rc);if((!zc||!hc(Pc)||Pc===Function.prototype)&&(Pc=function(){throw Uc("Incorrect invocation")},zc))for(tc in Wc)gc[tc]&&Sc(gc[tc],Pc);if((!zc||!Fc||Fc===Lc)&&(Fc=Pc.prototype,zc))for(tc in Wc)gc[tc]&&Sc(gc[tc].prototype,Fc);if(zc&&Rc(xc)!==Fc&&Sc(xc,Fc),dc&&!mc(Fc,Nc))for(tc in Hc=!0,Oc(Fc,Nc,{get:function(){return vc(this)?this[Bc]:void 0}}),Wc)gc[tc]&&wc(gc[tc],Bc,tc);var Xc={NATIVE_ARRAY_BUFFER_VIEWS:zc,TYPED_ARRAY_TAG:Hc&&Bc,aTypedArray:function(t){if(Qc(t))return t;throw Uc("Target is not a typed array")},aTypedArrayConstructor:function(t){if(hc(t)&&(!Sc||Tc(Pc,t)))return t;throw Uc(Ec(t)+" is not a typed array constructor")},exportTypedArrayMethod:function(t,r,e,n){if(dc){if(e)for(var o in Wc){var a=gc[o];if(a&&mc(a.prototype,t))try{delete a.prototype[t]}catch(e){try{a.prototype[t]=r}catch(t){}}}Fc[t]&&!e||Ac(Fc,t,e?r:zc&&jc[t]||r,n)}},exportTypedArrayStaticMethod:function(t,r,e){var n,o;if(dc){if(Sc){if(e)for(n in Wc)if((o=gc[n])&&mc(o,t))try{delete o[t]}catch(t){}if(Pc[t]&&!e)return;try{return Ac(Pc,t,e?r:zc&&Pc[t]||r)}catch(t){}}for(n in Wc)!(o=gc[n])||o[t]&&!e||Ac(o,t,r)}},getTypedArrayConstructor:Yc,isView:function(t){if(!vc(t))return!1;var r=bc(t);return"DataView"===r||mc(Wc,r)||mc(Gc,r)},isTypedArray:Qc,TypedArray:Pc,TypedArrayPrototype:Fc},qc=ln,Kc=nn,Zc=Xc.aTypedArray;(0,Xc.exportTypedArrayMethod)("at",(function(t){var r=Zc(this),e=qc(r),n=Kc(t),o=n>=0?n:e+n;return o<0||o>=e?void 0:r[o]}));var $c=yi.findLast,Jc=Xc.aTypedArray;(0,Xc.exportTypedArrayMethod)("findLast",(function(t){return $c(Jc(this),t,arguments.length>1?arguments[1]:void 0)}));var tu=yi.findLastIndex,ru=Xc.aTypedArray;(0,Xc.exportTypedArrayMethod)("findLastIndex",(function(t){return tu(ru(this),t,arguments.length>1?arguments[1]:void 0)}));var eu=$,nu=TypeError,ou=to,au=a,iu=Z,cu=b,uu=kr.f,su=Ht,fu=function(t,r){if(eu(r,t))return t;throw nu("Incorrect invocation")},lu=mo,pu=_o,yu={IndexSizeError:{s:"INDEX_SIZE_ERR",c:1,m:1},DOMStringSizeError:{s:"DOMSTRING_SIZE_ERR",c:2,m:0},HierarchyRequestError:{s:"HIERARCHY_REQUEST_ERR",c:3,m:1},WrongDocumentError:{s:"WRONG_DOCUMENT_ERR",c:4,m:1},InvalidCharacterError:{s:"INVALID_CHARACTER_ERR",c:5,m:1},NoDataAllowedError:{s:"NO_DATA_ALLOWED_ERR",c:6,m:0},NoModificationAllowedError:{s:"NO_MODIFICATION_ALLOWED_ERR",c:7,m:1},NotFoundError:{s:"NOT_FOUND_ERR",c:8,m:1},NotSupportedError:{s:"NOT_SUPPORTED_ERR",c:9,m:1},InUseAttributeError:{s:"INUSE_ATTRIBUTE_ERR",c:10,m:1},InvalidStateError:{s:"INVALID_STATE_ERR",c:11,m:1},SyntaxError:{s:"SYNTAX_ERR",c:12,m:1},InvalidModificationError:{s:"INVALID_MODIFICATION_ERR",c:13,m:1},NamespaceError:{s:"NAMESPACE_ERR",c:14,m:1},InvalidAccessError:{s:"INVALID_ACCESS_ERR",c:15,m:1},ValidationError:{s:"VALIDATION_ERR",c:16,m:0},TypeMismatchError:{s:"TYPE_MISMATCH_ERR",c:17,m:1},SecurityError:{s:"SECURITY_ERR",c:18,m:1},NetworkError:{s:"NETWORK_ERR",c:19,m:1},AbortError:{s:"ABORT_ERR",c:20,m:1},URLMismatchError:{s:"URL_MISMATCH_ERR",c:21,m:1},QuotaExceededError:{s:"QUOTA_EXCEEDED_ERR",c:22,m:1},TimeoutError:{s:"TIMEOUT_ERR",c:23,m:1},InvalidNodeTypeError:{s:"INVALID_NODE_TYPE_ERR",c:24,m:1},DataCloneError:{s:"DATA_CLONE_ERR",c:25,m:1}},du=No,gu=u,hu="DOMException",vu=iu("Error"),mu=iu(hu),bu=function(){fu(this,Eu);var t=arguments.length,r=pu(t<1?void 0:arguments[0]),e=pu(t<2?void 0:arguments[1],"Error"),n=new mu(r,e),o=vu(r);return o.name=hu,uu(n,"stack",cu(1,du(o.stack,1))),lu(n,this,bu),n},Eu=bu.prototype=mu.prototype,wu="stack"in vu(hu),Au="stack"in new mu(1,2),Ou=mu&&gu&&Object.getOwnPropertyDescriptor(au,hu),Tu=!(!Ou||Ou.writable&&Ou.configurable),Ru=wu&&!Tu&&!Au;ou({global:!0,constructor:!0,forced:Ru},{DOMException:Ru?bu:mu});var Su=iu(hu),Iu=Su.prototype;if(Iu.constructor!==Su)for(var Du in uu(Iu,"constructor",cu(1,Su)),yu)if(su(yu,Du)){var ku=yu[Du],Cu=ku.s;su(Su,Cu)||uu(Su,Cu,cu(6,ku.c))}var _u,ju,Mu,xu,Pu=T([].slice),Fu=TypeError,Lu=function(t,r){if(t<r)throw Fu("Not enough arguments");return t},Uu=/(?:ipad|iphone|ipod).*applewebkit/i.test(J),Nu="undefined"!=typeof process&&"process"==D(process),Bu=a,Vu=ao,zu=ci,Hu=W,Wu=Ht,Gu=c,Yu=_a,Qu=Pu,Xu=vr,qu=Lu,Ku=Uu,Zu=Nu,$u=Bu.setImmediate,Ju=Bu.clearImmediate,ts=Bu.process,rs=Bu.Dispatch,es=Bu.Function,ns=Bu.MessageChannel,os=Bu.String,as=0,is={},cs="onreadystatechange";Gu((function(){_u=Bu.location}));var us=function(t){if(Wu(is,t)){var r=is[t];delete is[t],r()}},ss=function(t){return function(){us(t)}},fs=function(t){us(t.data)},ls=function(t){Bu.postMessage(os(t),_u.protocol+"//"+_u.host)};$u&&Ju||($u=function(t){qu(arguments.length,1);var r=Hu(t)?t:es(t),e=Qu(arguments,1);return is[++as]=function(){Vu(r,void 0,e)},ju(as),as},Ju=function(t){delete is[t]},Zu?ju=function(t){ts.nextTick(ss(t))}:rs&&rs.now?ju=function(t){rs.now(ss(t))}:ns&&!Ku?(xu=(Mu=new ns).port2,Mu.port1.onmessage=fs,ju=zu(xu.postMessage,xu)):Bu.addEventListener&&Hu(Bu.postMessage)&&!Bu.importScripts&&_u&&"file:"!==_u.protocol&&!Gu(ls)?(ju=ls,Bu.addEventListener("message",fs,!1)):ju=cs in Xu("script")?function(t){Yu.appendChild(Xu("script"))[cs]=function(){Yu.removeChild(this),us(t)}}:function(t){setTimeout(ss(t),0)});var ps={set:$u,clear:Ju},ys=ps.clear;to({global:!0,bind:!0,enumerable:!0,forced:a.clearImmediate!==ys},{clearImmediate:ys});var ds="function"==typeof Bun&&Bun&&"string"==typeof Bun.version,gs=a,hs=ao,vs=W,ms=ds,bs=J,Es=Pu,ws=Lu,As=gs.Function,Os=/MSIE .\./.test(bs)||ms&&function(){var t=gs.Bun.version.split(".");return t.length<3||0==t[0]&&(t[1]<3||3==t[1]&&0==t[2])}(),Ts=to,Rs=a,Ss=ps.set,Is=function(t,r){var e=r?2:1;return Os?function(n,o){var a=ws(arguments.length,1)>e,i=vs(n)?n:As(n),c=a?Es(arguments,e):[],u=a?function(){hs(i,this,c)}:i;return r?t(u,o):t(u)}:t},Ds=Rs.setImmediate?Is(Ss,!1):Ss;Ts({global:!0,bind:!0,enumerable:!0,forced:Rs.setImmediate!==Ds},{setImmediate:Ds});var ks=T,Cs=c,_s=W,js=So,Ms=se,xs=function(){},Ps=[],Fs=Z("Reflect","construct"),Ls=/^\s*(?:class|function)\b/,Us=ks(Ls.exec),Ns=!Ls.exec(xs),Bs=function(t){if(!_s(t))return!1;try{return Fs(xs,Ps,t),!0}catch(t){return!1}},Vs=function(t){if(!_s(t))return!1;switch(js(t)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return Ns||!!Us(Ls,Ms(t))}catch(t){return!0}};Vs.sham=!0;var zs,Hs=!Fs||Cs((function(){var t;return Bs(Bs.call)||!Bs(Object)||!Bs((function(){t=!0}))||t}))?Vs:Bs,Ws={},Gs=Ws,Ys=nr("iterator"),Qs=Array.prototype,Xs=So,qs=Tt,Ks=x,Zs=Ws,$s=nr("iterator"),Js=function(t){if(!Ks(t))return qs(t,$s)||qs(t,"@@iterator")||Zs[Xs(t)]},tf=p,rf=wt,ef=xr,nf=vt,of=Js,af=TypeError,cf=p,uf=xr,sf=Tt,ff=ci,lf=p,pf=xr,yf=vt,df=function(t){return void 0!==t&&(Gs.Array===t||Qs[Ys]===t)},gf=ln,hf=$,vf=function(t,r){var e=arguments.length<2?of(t):r;if(rf(e))return ef(tf(e,t));throw af(nf(t)+" is not iterable")},mf=Js,bf=function(t,r,e){var n,o;uf(t);try{if(!(n=sf(t,"return"))){if("throw"===r)throw e;return e}n=cf(n,t)}catch(t){o=!0,n=t}if("throw"===r)throw e;if(o)throw n;return uf(n),e},Ef=TypeError,wf=function(t,r){this.stopped=t,this.result=r},Af=wf.prototype,Of=yr,Tf=kr,Rf=b,Sf=p,If=Ht,Df=$,kf=Bi,Cf=RegExp.prototype,_f=T,jf=Map.prototype,Mf={Map:Map,set:_f(jf.set),get:_f(jf.get),has:_f(jf.has),remove:_f(jf.delete),proto:jf},xf=T,Pf=Set.prototype,Ff={Set:Set,add:xf(Pf.add),has:xf(Pf.has),remove:xf(Pf.delete),proto:Pf,$has:Pf.has,$keys:Pf.keys},Lf="object"==typeof Deno&&Deno&&"object"==typeof Deno.version,Uf=!Lf&&!Nu&&"object"==typeof window&&"object"==typeof document,Nf=to,Bf=a,Vf=Z,zf=T,Hf=c,Wf=Xt,Gf=W,Yf=Hs,Qf=x,Xf=Q,qf=gt,Kf=function(t,r,e){var n,o,a,i,c,u,s,f=e&&e.that,l=!(!e||!e.AS_ENTRIES),p=!(!e||!e.IS_RECORD),y=!(!e||!e.IS_ITERATOR),d=!(!e||!e.INTERRUPTED),g=ff(r,f),h=function(t){return n&&bf(n,"normal",t),new wf(!0,t)},v=function(t){return l?(pf(t),d?g(t[0],t[1],h):g(t[0],t[1])):d?g(t,h):g(t)};if(p)n=t.iterator;else if(y)n=t;else{if(!(o=mf(t)))throw Ef(yf(t)+" is not iterable");if(df(o)){for(a=0,i=gf(t);i>a;a++)if((c=v(t[a]))&&hf(Af,c))return c;return new wf(!1)}n=vf(t,o)}for(u=p?t.next:n.next;!(s=lf(u,n)).done;){try{c=v(s.value)}catch(t){bf(n,"throw",t)}if("object"==typeof c&&c&&hf(Af,c))return c}return new wf(!1)},Zf=xr,$f=So,Jf=Ht,tl=function(t,r,e){var n=Of(r);n in t?Tf.f(t,n,Rf(0,e)):t[n]=e},rl=Xr,el=ln,nl=Lu,ol=function(t){var r=t.flags;return void 0!==r||"flags"in Cf||If(t,"flags")||!Df(Cf,t)?r:Sf(kf,t)},al=Mf,il=Ff,cl=Vo,ul=it,sl=Uf,fl=Lf,ll=Nu,pl=Bf.Object,yl=Bf.Array,dl=Bf.Date,gl=Bf.Error,hl=Bf.EvalError,vl=Bf.RangeError,ml=Bf.ReferenceError,bl=Bf.SyntaxError,El=Bf.TypeError,wl=Bf.URIError,Al=Bf.PerformanceMark,Ol=Bf.WebAssembly,Tl=Ol&&Ol.CompileError||gl,Rl=Ol&&Ol.LinkError||gl,Sl=Ol&&Ol.RuntimeError||gl,Il=Vf("DOMException"),Dl=al.Map,kl=al.has,Cl=al.get,_l=al.set,jl=il.Set,Ml=il.add,xl=Vf("Object","keys"),Pl=zf([].push),Fl=zf((!0).valueOf),Ll=zf(1..valueOf),Ul=zf("".valueOf),Nl=zf(dl.prototype.getTime),Bl=Wf("structuredClone"),Vl="DataCloneError",zl="Transferring",Hl=function(t){return!Hf((function(){var r=new Bf.Set([7]),e=t(r),n=t(pl(7));return e==r||!e.has(7)||"object"!=typeof n||7!=n}))&&t},Wl=function(t,r){return!Hf((function(){var e=new r,n=t({a:e,b:e});return!(n&&n.a===n.b&&n.a instanceof r&&n.a.stack===e.stack)}))},Gl=Bf.structuredClone,Yl=!Wl(Gl,gl)||!Wl(Gl,Il)||(zs=Gl,!!Hf((function(){var t=zs(new Bf.AggregateError([1],Bl,{cause:3}));return"AggregateError"!=t.name||1!=t.errors[0]||t.message!=Bl||3!=t.cause}))),Ql=!Gl&&Hl((function(t){return new Al(Bl,{detail:t}).detail})),Xl=Hl(Gl)||Ql,ql=function(t){throw new Il("Uncloneable type: "+t,Vl)},Kl=function(t,r){throw new Il((r||"Cloning")+" of "+t+" cannot be properly polyfilled in this engine",Vl)},Zl=function(t,r){if(qf(t)&&ql("Symbol"),!Xf(t))return t;if(r){if(kl(r,t))return Cl(r,t)}else r=new Dl;var e,n,o,a,i,c,u,s,f,l,p=$f(t),y=!1;switch(p){case"Array":o=yl(el(t)),y=!0;break;case"Object":o={},y=!0;break;case"Map":o=new Dl,y=!0;break;case"Set":o=new jl,y=!0;break;case"RegExp":o=new RegExp(t.source,ol(t));break;case"Error":switch(n=t.name){case"AggregateError":o=Vf("AggregateError")([]);break;case"EvalError":o=hl();break;case"RangeError":o=vl();break;case"ReferenceError":o=ml();break;case"SyntaxError":o=bl();break;case"TypeError":o=El();break;case"URIError":o=wl();break;case"CompileError":o=Tl();break;case"LinkError":o=Rl();break;case"RuntimeError":o=Sl();break;default:o=gl()}y=!0;break;case"DOMException":o=new Il(t.message,t.name),y=!0;break;case"DataView":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"BigInt64Array":case"BigUint64Array":e=Bf[p],Xf(e)||Kl(p),o=new e(Zl(t.buffer,r),t.byteOffset,"DataView"===p?t.byteLength:t.length);break;case"DOMQuad":try{o=new DOMQuad(Zl(t.p1,r),Zl(t.p2,r),Zl(t.p3,r),Zl(t.p4,r))}catch(r){Xl?o=Xl(t):Kl(p)}break;case"FileList":if(a=function(){var t;try{t=new Bf.DataTransfer}catch(r){try{t=new Bf.ClipboardEvent("").clipboardData}catch(t){}}return t&&t.items&&t.files?t:null}()){for(i=0,c=el(t);i<c;i++)a.items.add(Zl(t[i],r));o=a.files}else Xl?o=Xl(t):Kl(p);break;case"ImageData":try{o=new ImageData(Zl(t.data,r),t.width,t.height,{colorSpace:t.colorSpace})}catch(r){Xl?o=Xl(t):Kl(p)}break;default:if(Xl)o=Xl(t);else switch(p){case"BigInt":o=pl(t.valueOf());break;case"Boolean":o=pl(Fl(t));break;case"Number":o=pl(Ll(t));break;case"String":o=pl(Ul(t));break;case"Date":o=new dl(Nl(t));break;case"ArrayBuffer":(e=Bf.DataView)||"function"==typeof t.slice||Kl(p);try{if("function"==typeof t.slice)o=t.slice(0);else for(c=t.byteLength,o=new ArrayBuffer(c),f=new e(t),l=new e(o),i=0;i<c;i++)l.setUint8(i,f.getUint8(i))}catch(t){throw new Il("ArrayBuffer is detached",Vl)}break;case"SharedArrayBuffer":o=t;break;case"Blob":try{o=t.slice(0,t.size,t.type)}catch(t){Kl(p)}break;case"DOMPoint":case"DOMPointReadOnly":e=Bf[p];try{o=e.fromPoint?e.fromPoint(t):new e(t.x,t.y,t.z,t.w)}catch(t){Kl(p)}break;case"DOMRect":case"DOMRectReadOnly":e=Bf[p];try{o=e.fromRect?e.fromRect(t):new e(t.x,t.y,t.width,t.height)}catch(t){Kl(p)}break;case"DOMMatrix":case"DOMMatrixReadOnly":e=Bf[p];try{o=e.fromMatrix?e.fromMatrix(t):new e(t)}catch(t){Kl(p)}break;case"AudioData":case"VideoFrame":Gf(t.clone)||Kl(p);try{o=t.clone()}catch(t){ql(p)}break;case"File":try{o=new File([t],t.name,t)}catch(t){Kl(p)}break;case"CropTarget":case"CryptoKey":case"FileSystemDirectoryHandle":case"FileSystemFileHandle":case"FileSystemHandle":case"GPUCompilationInfo":case"GPUCompilationMessage":case"ImageBitmap":case"RTCCertificate":case"WebAssembly.Module":Kl(p);default:ql(p)}}if(_l(r,t,o),y)switch(p){case"Array":case"Object":for(u=xl(t),i=0,c=el(u);i<c;i++)s=u[i],tl(o,s,Zl(t[s],r));break;case"Map":t.forEach((function(t,e){_l(o,Zl(e,r),Zl(t,r))}));break;case"Set":t.forEach((function(t){Ml(o,Zl(t,r))}));break;case"Error":rl(o,"message",Zl(t.message,r)),Jf(t,"cause")&&rl(o,"cause",Zl(t.cause,r)),"AggregateError"==n&&(o.errors=Zl(t.errors,r));case"DOMException":cl&&rl(o,"stack",Zl(t.stack,r))}return o},$l=Gl&&!Hf((function(){if(fl&&ul>92||ll&&ul>94||sl&&ul>97)return!1;var t=new ArrayBuffer(8),r=Gl(t,{transfer:[t]});return 0!=t.byteLength||8!=r.byteLength})),Jl=function(t,r){if(!Xf(t))throw El("Transfer option cannot be converted to a sequence");var e=[];Kf(t,(function(t){Pl(e,Zf(t))}));var n,o,a,i,c,u,s=0,f=el(e);if($l)for(i=Gl(e,{transfer:e});s<f;)_l(r,e[s],i[s++]);else for(;s<f;){if(n=e[s++],kl(r,n))throw new Il("Duplicate transferable",Vl);switch(o=$f(n)){case"ImageBitmap":a=Bf.OffscreenCanvas,Yf(a)||Kl(o,zl);try{(u=new a(n.width,n.height)).getContext("bitmaprenderer").transferFromImageBitmap(n),c=u.transferToImageBitmap()}catch(t){}break;case"AudioData":case"VideoFrame":Gf(n.clone)&&Gf(n.close)||Kl(o,zl);try{c=n.clone(),n.close()}catch(t){}break;case"ArrayBuffer":case"MediaSourceHandle":case"MessagePort":case"OffscreenCanvas":case"ReadableStream":case"TransformStream":case"WritableStream":Kl(o,zl)}if(void 0===c)throw new Il("This object cannot be transferred: "+o,Vl);_l(r,n,c)}};Nf({global:!0,enumerable:!0,sham:!$l,forced:Yl},{structuredClone:function(t){var r,e=nl(arguments.length,1)>1&&!Qf(arguments[1])?Zf(arguments[1]):void 0,n=e?e.transfer:void 0;return void 0!==n&&(r=new Dl,Jl(n,r)),Zl(t,r)}});const tp=r.createFormatter({day:"2-digit",omitCommas:!0,weekday:"short"}),rp=r.createFormatter({hour:"numeric",minute:"2-digit",omitZeroMinute:!0,meridiem:"narrow"});function ep(t){const e=np(),n=r.getDateMeta(t.instance.range.start,e);return Object.assign(n,{seg:{isStart:t.instance.range.start>=e.start,isEnd:t.instance.range.end<=e.end,eventRange:t}})}function np(t,r){const e=new Date(t||Date.now());r&&e.setUTCDate(e.getUTCDate()+r),e.setUTCHours(0,0,0,0);const n=new Date(e);return n.setUTCDate(n.getUTCDate()+1),{start:e,end:n}}function op(t){const{children:n,context:o,date:a,events:i}=t,c=r.getDateMeta(a,np());return e.h("td",{class:r.getDayClassNames(c,o.theme).concat(["fc-events"]).join(" ")},i.map((t=>e.h(ip,{context:o,event:t}))),n)}function ap(t){const{events:n}=t;if(0===n.length)return;const o=ep(n[0]);return e.h(r.BgEvent,o)}function ip(t){const{event:n}=t,o=ep(n);return e.h(r.StandardEvent,Object.assign(o,{defaultTimeFormat:rp,elClasses:["fc-h-event"],isDragging:!1,isResizing:!1,isDateSelecting:!1,isSelected:!1}))}class cp extends r.BaseComponent{render(t,n,o){const a=o.viewApi.getOption("dayHeaders"),i=o.viewApi.getOption("dayHeaderFormat")||tp,c=np(),u=Object.values(o.calendarApi.getCurrentData().eventSources).filter((t=>"background"!=t?.ui.display)),s=a?[e.h("col",{class:"fc-day-col"})]:[];u.forEach((()=>s.push(e.h("col",{}))));const f=(a?[null]:[]).concat(u).map((t=>e.h("th",{class:"fc-col-header-cell fc-day",role:"columnheader"},e.h("div",{class:"fc-scrollgrid-sync-inner"},t?.extendedProps.name||"")))),l=[],p=new Date(t.dateProfile.renderRange.start);for(;p.getTime()<t.dateProfile.renderRange.end.getTime();){const n=np(p),s=r.sliceEventStore(t.eventStore,t.eventUiBases,n,t.nextDayThreshold);l.push(e.h("tr",{class:"fc-multicol-row"},a&&e.h(r.TableDateCell,{dayHeaderFormat:i,date:n.start,dateProfile:t.dateProfile,todayRange:c,colCnt:1,extraRenderProps:{class:"extra"}}),u.map((t=>e.h(op,{context:o,date:n.start,events:s.fg.filter((r=>r.def.sourceId==t.sourceId))},e.h(ap,{events:s.bg})))))),p.setUTCDate(p.getUTCDate()+1)}return[e.h("style",{},".fc-multicol{border-collapse:collapse!important;}.fc-multicol .fc-day-col{width:75px;}.fc-multicol .fc-day-today{background-color:var(--fc-today-bg-color);}.fc-multicol th{overflow:hidden;padding:2px 4px;}.fc-multicol .fc-events{padding:2px;position:relative;}.fc-multicol .fc-event.fc-bg-event{border:none;margin:0;z-index:-1;}.fc-multicol .fc-h-event{border-radius:3px;display:block;font-size:var(--fc-small-font-size);margin:1px 0 2px 0;overflow:hidden;padding:1px 2px;}.fc-multicol .fc-event-meta{float:right;}.fc-multicol .fc-event-time{display:inline-block;margin-right:3px;overflow:unset;}.fc-multicol .fc-event-location{display:inline-block;}"),e.h("table",{class:"fc-scrollgrid fc-multicol"},e.h("colgroup",{},s),e.h("thead",{},e.h("tr",{},f)),e.h("tbody",{},l))]}}return t.createPlugin({name:"MultiColumnView",initialView:"multiCol",views:{multiCol:{component:cp,dateAlignment:"week",duration:{weeks:4}}}})}(FullCalendar,FullCalendar.Internal,FullCalendar.Preact);//# sourceMappingURL=multicol.js.map
