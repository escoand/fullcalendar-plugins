var MultiColumnPlugin=function(e,r,t){"use strict";var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},o=function(e){return e&&e.Math===Math&&e},a=o("object"==typeof globalThis&&globalThis)||o("object"==typeof window&&window)||o("object"==typeof self&&self)||o("object"==typeof n&&n)||o("object"==typeof n&&n)||function(){return this}()||Function("return this")(),i={},c=function(e){try{return!!e()}catch(e){return!0}},u=!c((function(){return 7!==Object.defineProperty({},1,{get:function(){return 7}})[1]})),s=!c((function(){var e=function(){}.bind();return"function"!=typeof e||e.hasOwnProperty("prototype")})),f=s,l=Function.prototype.call,p=f?l.bind(l):function(){return l.apply(l,arguments)},y={},d={}.propertyIsEnumerable,h=Object.getOwnPropertyDescriptor,g=h&&!d.call({1:2},1);y.f=g?function(e){var r=h(this,e);return!!r&&r.enumerable}:d;var v,m,b=function(e,r){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:r}},w=s,E=Function.prototype,A=E.call,O=w&&E.bind.bind(A,A),R=w?O:function(e){return function(){return A.apply(e,arguments)}},S=R,T=S({}.toString),I=S("".slice),C=function(e){return I(T(e),8,-1)},D=c,j=C,P=Object,M=R("".split),_=D((function(){return!P("z").propertyIsEnumerable(0)}))?function(e){return"String"===j(e)?M(e,""):P(e)}:P,k=function(e){return null==e},x=k,U=TypeError,F=function(e){if(x(e))throw new U("Can't call method on "+e);return e},L=_,B=F,N=function(e){return L(B(e))},z="object"==typeof document&&document.all,V=void 0===z&&void 0!==z?function(e){return"function"==typeof e||e===z}:function(e){return"function"==typeof e},W=V,H=function(e){return"object"==typeof e?null!==e:W(e)},G=a,Y=V,Q=function(e,r){return arguments.length<2?(t=G[e],Y(t)?t:void 0):G[e]&&G[e][r];var t},X=R({}.isPrototypeOf),q="undefined"!=typeof navigator&&String(navigator.userAgent)||"",K=a,Z=q,$=K.process,J=K.Deno,ee=$&&$.versions||J&&J.version,re=ee&&ee.v8;re&&(m=(v=re.split("."))[0]>0&&v[0]<4?1:+(v[0]+v[1])),!m&&Z&&(!(v=Z.match(/Edge\/(\d+)/))||v[1]>=74)&&(v=Z.match(/Chrome\/(\d+)/))&&(m=+v[1]);var te=m,ne=te,oe=c,ae=a.String,ie=!!Object.getOwnPropertySymbols&&!oe((function(){var e=Symbol("symbol detection");return!ae(e)||!(Object(e)instanceof Symbol)||!Symbol.sham&&ne&&ne<41})),ce=ie&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,ue=Q,se=V,fe=X,le=Object,pe=ce?function(e){return"symbol"==typeof e}:function(e){var r=ue("Symbol");return se(r)&&fe(r.prototype,le(e))},ye=String,de=function(e){try{return ye(e)}catch(e){return"Object"}},he=V,ge=de,ve=TypeError,me=function(e){if(he(e))return e;throw new ve(ge(e)+" is not a function")},be=me,we=k,Ee=function(e,r){var t=e[r];return we(t)?void 0:be(t)},Ae=p,Oe=V,Re=H,Se=TypeError,Te={exports:{}},Ie=a,Ce=Object.defineProperty,De=function(e,r){try{Ce(Ie,e,{value:r,configurable:!0,writable:!0})}catch(t){Ie[e]=r}return r},je=De,Pe="__core-js_shared__",Me=a[Pe]||je(Pe,{}),_e=Me;(Te.exports=function(e,r){return _e[e]||(_e[e]=void 0!==r?r:{})})("versions",[]).push({version:"3.35.1",mode:"global",copyright:"© 2014-2024 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.35.1/LICENSE",source:"https://github.com/zloirock/core-js"});var ke=Te.exports,xe=F,Ue=Object,Fe=function(e){return Ue(xe(e))},Le=Fe,Be=R({}.hasOwnProperty),Ne=Object.hasOwn||function(e,r){return Be(Le(e),r)},ze=R,Ve=0,We=Math.random(),He=ze(1..toString),Ge=function(e){return"Symbol("+(void 0===e?"":e)+")_"+He(++Ve+We,36)},Ye=ke,Qe=Ne,Xe=Ge,qe=ie,Ke=ce,Ze=a.Symbol,$e=Ye("wks"),Je=Ke?Ze.for||Ze:Ze&&Ze.withoutSetter||Xe,er=function(e){return Qe($e,e)||($e[e]=qe&&Qe(Ze,e)?Ze[e]:Je("Symbol."+e)),$e[e]},rr=p,tr=H,nr=pe,or=Ee,ar=function(e,r){var t,n;if("string"===r&&Oe(t=e.toString)&&!Re(n=Ae(t,e)))return n;if(Oe(t=e.valueOf)&&!Re(n=Ae(t,e)))return n;if("string"!==r&&Oe(t=e.toString)&&!Re(n=Ae(t,e)))return n;throw new Se("Can't convert object to primitive value")},ir=TypeError,cr=er("toPrimitive"),ur=function(e,r){if(!tr(e)||nr(e))return e;var t,n=or(e,cr);if(n){if(void 0===r&&(r="default"),t=rr(n,e,r),!tr(t)||nr(t))return t;throw new ir("Can't convert object to primitive value")}return void 0===r&&(r="number"),ar(e,r)},sr=ur,fr=pe,lr=function(e){var r=sr(e,"string");return fr(r)?r:r+""},pr=H,yr=a.document,dr=pr(yr)&&pr(yr.createElement),hr=function(e){return dr?yr.createElement(e):{}},gr=hr,vr=!u&&!c((function(){return 7!==Object.defineProperty(gr("div"),"a",{get:function(){return 7}}).a})),mr=u,br=p,wr=y,Er=b,Ar=N,Or=lr,Rr=Ne,Sr=vr,Tr=Object.getOwnPropertyDescriptor;i.f=mr?Tr:function(e,r){if(e=Ar(e),r=Or(r),Sr)try{return Tr(e,r)}catch(e){}if(Rr(e,r))return Er(!br(wr.f,e,r),e[r])};var Ir={},Cr=u&&c((function(){return 42!==Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype})),Dr=H,jr=String,Pr=TypeError,Mr=function(e){if(Dr(e))return e;throw new Pr(jr(e)+" is not an object")},_r=u,kr=vr,xr=Cr,Ur=Mr,Fr=lr,Lr=TypeError,Br=Object.defineProperty,Nr=Object.getOwnPropertyDescriptor,zr="enumerable",Vr="configurable",Wr="writable";Ir.f=_r?xr?function(e,r,t){if(Ur(e),r=Fr(r),Ur(t),"function"==typeof e&&"prototype"===r&&"value"in t&&Wr in t&&!t[Wr]){var n=Nr(e,r);n&&n[Wr]&&(e[r]=t.value,t={configurable:Vr in t?t[Vr]:n[Vr],enumerable:zr in t?t[zr]:n[zr],writable:!1})}return Br(e,r,t)}:Br:function(e,r,t){if(Ur(e),r=Fr(r),Ur(t),kr)try{return Br(e,r,t)}catch(e){}if("get"in t||"set"in t)throw new Lr("Accessors not supported");return"value"in t&&(e[r]=t.value),e};var Hr=Ir,Gr=b,Yr=u?function(e,r,t){return Hr.f(e,r,Gr(1,t))}:function(e,r,t){return e[r]=t,e},Qr={exports:{}},Xr=u,qr=Ne,Kr=Function.prototype,Zr=Xr&&Object.getOwnPropertyDescriptor,$r=qr(Kr,"name"),Jr={EXISTS:$r,PROPER:$r&&"something"===function(){}.name,CONFIGURABLE:$r&&(!Xr||Xr&&Zr(Kr,"name").configurable)},et=V,rt=Me,tt=R(Function.toString);et(rt.inspectSource)||(rt.inspectSource=function(e){return tt(e)});var nt,ot,at,it=rt.inspectSource,ct=V,ut=a.WeakMap,st=ct(ut)&&/native code/.test(String(ut)),ft=Ge,lt=ke("keys"),pt=function(e){return lt[e]||(lt[e]=ft(e))},yt={},dt=st,ht=a,gt=H,vt=Yr,mt=Ne,bt=Me,wt=pt,Et=yt,At="Object already initialized",Ot=ht.TypeError,Rt=ht.WeakMap;if(dt||bt.state){var St=bt.state||(bt.state=new Rt);St.get=St.get,St.has=St.has,St.set=St.set,nt=function(e,r){if(St.has(e))throw new Ot(At);return r.facade=e,St.set(e,r),r},ot=function(e){return St.get(e)||{}},at=function(e){return St.has(e)}}else{var Tt=wt("state");Et[Tt]=!0,nt=function(e,r){if(mt(e,Tt))throw new Ot(At);return r.facade=e,vt(e,Tt,r),r},ot=function(e){return mt(e,Tt)?e[Tt]:{}},at=function(e){return mt(e,Tt)}}var It={set:nt,get:ot,has:at,enforce:function(e){return at(e)?ot(e):nt(e,{})},getterFor:function(e){return function(r){var t;if(!gt(r)||(t=ot(r)).type!==e)throw new Ot("Incompatible receiver, "+e+" required");return t}}},Ct=R,Dt=c,jt=V,Pt=Ne,Mt=u,_t=Jr.CONFIGURABLE,kt=it,xt=It.enforce,Ut=It.get,Ft=String,Lt=Object.defineProperty,Bt=Ct("".slice),Nt=Ct("".replace),zt=Ct([].join),Vt=Mt&&!Dt((function(){return 8!==Lt((function(){}),"length",{value:8}).length})),Wt=String(String).split("String"),Ht=Qr.exports=function(e,r,t){"Symbol("===Bt(Ft(r),0,7)&&(r="["+Nt(Ft(r),/^Symbol\(([^)]*)\).*$/,"$1")+"]"),t&&t.getter&&(r="get "+r),t&&t.setter&&(r="set "+r),(!Pt(e,"name")||_t&&e.name!==r)&&(Mt?Lt(e,"name",{value:r,configurable:!0}):e.name=r),Vt&&t&&Pt(t,"arity")&&e.length!==t.arity&&Lt(e,"length",{value:t.arity});try{t&&Pt(t,"constructor")&&t.constructor?Mt&&Lt(e,"prototype",{writable:!1}):e.prototype&&(e.prototype=void 0)}catch(e){}var n=xt(e);return Pt(n,"source")||(n.source=zt(Wt,"string"==typeof r?r:"")),e};Function.prototype.toString=Ht((function(){return jt(this)&&Ut(this).source||kt(this)}),"toString");var Gt=Qr.exports,Yt=V,Qt=Ir,Xt=Gt,qt=De,Kt=function(e,r,t,n){n||(n={});var o=n.enumerable,a=void 0!==n.name?n.name:r;if(Yt(t)&&Xt(t,a,n),n.global)o?e[r]=t:qt(r,t);else{try{n.unsafe?e[r]&&(o=!0):delete e[r]}catch(e){}o?e[r]=t:Qt.f(e,r,{value:t,enumerable:!1,configurable:!n.nonConfigurable,writable:!n.nonWritable})}return e},Zt={},$t=Math.ceil,Jt=Math.floor,en=Math.trunc||function(e){var r=+e;return(r>0?Jt:$t)(r)},rn=function(e){var r=+e;return r!=r||0===r?0:en(r)},tn=rn,nn=Math.max,on=Math.min,an=function(e,r){var t=tn(e);return t<0?nn(t+r,0):on(t,r)},cn=rn,un=Math.min,sn=function(e){var r=cn(e);return r>0?un(r,9007199254740991):0},fn=function(e){return sn(e.length)},ln=N,pn=an,yn=fn,dn=function(e){return function(r,t,n){var o,a=ln(r),i=yn(a),c=pn(n,i);if(e&&t!=t){for(;i>c;)if((o=a[c++])!=o)return!0}else for(;i>c;c++)if((e||c in a)&&a[c]===t)return e||c||0;return!e&&-1}},hn={includes:dn(!0),indexOf:dn(!1)},gn=Ne,vn=N,mn=hn.indexOf,bn=yt,wn=R([].push),En=function(e,r){var t,n=vn(e),o=0,a=[];for(t in n)!gn(bn,t)&&gn(n,t)&&wn(a,t);for(;r.length>o;)gn(n,t=r[o++])&&(~mn(a,t)||wn(a,t));return a},An=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],On=En,Rn=An.concat("length","prototype");Zt.f=Object.getOwnPropertyNames||function(e){return On(e,Rn)};var Sn={};Sn.f=Object.getOwnPropertySymbols;var Tn=Q,In=Zt,Cn=Sn,Dn=Mr,jn=R([].concat),Pn=Tn("Reflect","ownKeys")||function(e){var r=In.f(Dn(e)),t=Cn.f;return t?jn(r,t(e)):r},Mn=Ne,_n=Pn,kn=i,xn=Ir,Un=c,Fn=V,Ln=/#|\.prototype\./,Bn=function(e,r){var t=zn[Nn(e)];return t===Wn||t!==Vn&&(Fn(r)?Un(r):!!r)},Nn=Bn.normalize=function(e){return String(e).replace(Ln,".").toLowerCase()},zn=Bn.data={},Vn=Bn.NATIVE="N",Wn=Bn.POLYFILL="P",Hn=Bn,Gn=a,Yn=i.f,Qn=Yr,Xn=Kt,qn=De,Kn=function(e,r,t){for(var n=_n(r),o=xn.f,a=kn.f,i=0;i<n.length;i++){var c=n[i];Mn(e,c)||t&&Mn(t,c)||o(e,c,a(r,c))}},Zn=Hn,$n=function(e,r){var t,n,o,a,i,c=e.target,u=e.global,s=e.stat;if(t=u?Gn:s?Gn[c]||qn(c,{}):Gn[c]&&Gn[c].prototype)for(n in r){if(a=r[n],o=e.dontCallGetSet?(i=Yn(t,n))&&i.value:t[n],!Zn(u?n:c+(s?".":"#")+n,e.forced)&&void 0!==o){if(typeof a==typeof o)continue;Kn(a,o)}(e.sham||o&&o.sham)&&Qn(a,"sham",!0),Xn(t,n,a,e)}},Jn=C,eo=u,ro=Array.isArray||function(e){return"Array"===Jn(e)},to=TypeError,no=Object.getOwnPropertyDescriptor,oo=eo&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(e){return e instanceof TypeError}}()?function(e,r){if(ro(e)&&!no(e,"length").writable)throw new to("Cannot set read only .length");return e.length=r}:function(e,r){return e.length=r},ao=TypeError,io=function(e){if(e>9007199254740991)throw ao("Maximum allowed index exceeded");return e},co=Fe,uo=fn,so=oo,fo=io;$n({target:"Array",proto:!0,arity:1,forced:c((function(){return 4294967297!==[].push.call({length:4294967296},1)}))||!function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(e){return e instanceof TypeError}}()},{push:function(e){var r=co(this),t=uo(r),n=arguments.length;fo(t+n);for(var o=0;o<n;o++)r[t]=arguments[o],t++;return so(r,t),t}});var lo=fn,po=function(e,r){for(var t=lo(e),n=new r(t),o=0;o<t;o++)n[o]=e[t-o-1];return n},yo={},ho=En,go=An,vo=Object.keys||function(e){return ho(e,go)},mo=u,bo=Cr,wo=Ir,Eo=Mr,Ao=N,Oo=vo;yo.f=mo&&!bo?Object.defineProperties:function(e,r){Eo(e);for(var t,n=Ao(r),o=Oo(r),a=o.length,i=0;a>i;)wo.f(e,t=o[i++],n[t]);return e};var Ro,So=Q("document","documentElement"),To=Mr,Io=yo,Co=An,Do=yt,jo=So,Po=hr,Mo="prototype",_o="script",ko=pt("IE_PROTO"),xo=function(){},Uo=function(e){return"<"+_o+">"+e+"</"+_o+">"},Fo=function(e){e.write(Uo("")),e.close();var r=e.parentWindow.Object;return e=null,r},Lo=function(){try{Ro=new ActiveXObject("htmlfile")}catch(e){}var e,r,t;Lo="undefined"!=typeof document?document.domain&&Ro?Fo(Ro):(r=Po("iframe"),t="java"+_o+":",r.style.display="none",jo.appendChild(r),r.src=String(t),(e=r.contentWindow.document).open(),e.write(Uo("document.F=Object")),e.close(),e.F):Fo(Ro);for(var n=Co.length;n--;)delete Lo[Mo][Co[n]];return Lo()};Do[ko]=!0;var Bo=er,No=Object.create||function(e,r){var t;return null!==e?(xo[Mo]=To(e),t=new xo,xo[Mo]=null,t[ko]=e):t=Lo(),void 0===r?t:Io.f(t,r)},zo=Ir.f,Vo=Bo("unscopables"),Wo=Array.prototype;void 0===Wo[Vo]&&zo(Wo,Vo,{configurable:!0,value:No(null)});var Ho=function(e){Wo[Vo][e]=!0},Go=po,Yo=N,Qo=Ho,Xo=Array;$n({target:"Array",proto:!0},{toReversed:function(){return Go(Yo(this),Xo)}}),Qo("toReversed");var qo=fn,Ko=function(e,r,t){for(var n=0,o=arguments.length>2?t:qo(r),a=new e(o);o>n;)a[n]=r[n++];return a},Zo=a,$o=$n,Jo=me,ea=N,ra=Ko,ta=function(e,r){var t=Zo[e],n=t&&t.prototype;return n&&n[r]},na=Ho,oa=Array,aa=R(ta("Array","sort"));$o({target:"Array",proto:!0},{toSorted:function(e){void 0!==e&&Jo(e);var r=ea(this),t=ra(oa,r);return aa(t,e)}}),na("toSorted");var ia=$n,ca=Ho,ua=io,sa=fn,fa=an,la=N,pa=rn,ya=Array,da=Math.max,ha=Math.min;ia({target:"Array",proto:!0},{toSpliced:function(e,r){var t,n,o,a,i=la(this),c=sa(i),u=fa(e,c),s=arguments.length,f=0;for(0===s?t=n=0:1===s?(t=0,n=c-u):(t=s-2,n=ha(da(pa(r),0),c-u)),o=ua(c+t-n),a=ya(o);f<u;f++)a[f]=i[f];for(;f<u+t;f++)a[f]=arguments[f-u+2];for(;f<o;f++)a[f]=i[f+n-t];return a}}),ca("toSpliced");var ga=de,va=TypeError,ma=Fe,ba=fn,wa=oo,Ea=function(e,r){if(!delete e[r])throw new va("Cannot delete property "+ga(r)+" of "+ga(e))},Aa=io;$n({target:"Array",proto:!0,arity:1,forced:1!==[].unshift(0)||!function(){try{Object.defineProperty([],"length",{writable:!1}).unshift()}catch(e){return e instanceof TypeError}}()},{unshift:function(e){var r=ma(this),t=ba(r),n=arguments.length;if(n){Aa(t+n);for(var o=t;o--;){var a=o+n;o in r?r[a]=r[o]:Ea(r,a)}for(var i=0;i<n;i++)r[i]=arguments[i]}return wa(r,t+n)}});var Oa=fn,Ra=rn,Sa=RangeError,Ta=function(e,r,t,n){var o=Oa(e),a=Ra(t),i=a<0?o+a:a;if(i>=o||i<0)throw new Sa("Incorrect index");for(var c=new r(o),u=0;u<o;u++)c[u]=u===i?n:e[u];return c},Ia=Ta,Ca=N,Da=Array;$n({target:"Array",proto:!0},{with:function(e,r){return Ia(Ca(this),Da,e,r)}});var ja=C,Pa=R,Ma=function(e){if("Function"===ja(e))return Pa(e)},_a=me,ka=s,xa=Ma(Ma.bind),Ua=function(e,r){return _a(e),void 0===r?e:ka?xa(e,r):function(){return e.apply(r,arguments)}},Fa={},La=Fa,Ba=er("iterator"),Na=Array.prototype,za={};za[er("toStringTag")]="z";var Va="[object z]"===String(za),Wa=V,Ha=C,Ga=er("toStringTag"),Ya=Object,Qa="Arguments"===Ha(function(){return arguments}()),Xa=Va?Ha:function(e){var r,t,n;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(t=function(e,r){try{return e[r]}catch(e){}}(r=Ya(e),Ga))?t:Qa?Ha(r):"Object"===(n=Ha(r))&&Wa(r.callee)?"Arguments":n},qa=Xa,Ka=Ee,Za=k,$a=Fa,Ja=er("iterator"),ei=function(e){if(!Za(e))return Ka(e,Ja)||Ka(e,"@@iterator")||$a[qa(e)]},ri=p,ti=me,ni=Mr,oi=de,ai=ei,ii=TypeError,ci=p,ui=Mr,si=Ee,fi=Ua,li=p,pi=Mr,yi=de,di=function(e){return void 0!==e&&(La.Array===e||Na[Ba]===e)},hi=fn,gi=X,vi=function(e,r){var t=arguments.length<2?ai(e):r;if(ti(t))return ni(ri(t,e));throw new ii(oi(e)+" is not iterable")},mi=ei,bi=function(e,r,t){var n,o;ui(e);try{if(!(n=si(e,"return"))){if("throw"===r)throw t;return t}n=ci(n,e)}catch(e){o=!0,n=e}if("throw"===r)throw t;if(o)throw n;return ui(n),t},wi=TypeError,Ei=function(e,r){this.stopped=e,this.result=r},Ai=Ei.prototype,Oi=function(e,r,t){var n,o,a,i,c,u,s,f=t&&t.that,l=!(!t||!t.AS_ENTRIES),p=!(!t||!t.IS_RECORD),y=!(!t||!t.IS_ITERATOR),d=!(!t||!t.INTERRUPTED),h=fi(r,f),g=function(e){return n&&bi(n,"normal",e),new Ei(!0,e)},v=function(e){return l?(pi(e),d?h(e[0],e[1],g):h(e[0],e[1])):d?h(e,g):h(e)};if(p)n=e.iterator;else if(y)n=e;else{if(!(o=mi(e)))throw new wi(yi(e)+" is not iterable");if(di(o)){for(a=0,i=hi(e);i>a;a++)if((c=v(e[a]))&&gi(Ai,c))return c;return new Ei(!1)}n=vi(e,o)}for(u=p?e.next:n.next;!(s=li(u,n)).done;){try{c=v(s.value)}catch(e){bi(n,"throw",e)}if("object"==typeof c&&c&&gi(Ai,c))return c}return new Ei(!1)},Ri=R,Si=Map.prototype,Ti={Map:Map,set:Ri(Si.set),get:Ri(Si.get),has:Ri(Si.has),remove:Ri(Si.delete),proto:Si},Ii=$n,Ci=me,Di=F,ji=Oi,Pi=Ti.Map,Mi=Ti.has,_i=Ti.get,ki=Ti.set,xi=R([].push);Ii({target:"Map",stat:!0,forced:false},{groupBy:function(e,r){Di(e),Ci(r);var t=new Pi,n=0;return ji(e,(function(e){var o=r(e,n++);Mi(t,o)?xi(_i(t,o),e):ki(t,o,[e])})),t}});var Ui=$n,Fi=R,Li=me,Bi=F,Ni=lr,zi=Oi,Vi=Q("Object","create"),Wi=Fi([].push);Ui({target:"Object",stat:!0},{groupBy:function(e,r){Bi(e),Li(r);var t=Vi(null),n=0;return zi(e,(function(e){var o=Ni(r(e,n++));o in t?Wi(t[o],e):t[o]=[e]})),t}});var Hi={},Gi=me,Yi=TypeError,Qi=function(e){var r,t;this.promise=new e((function(e,n){if(void 0!==r||void 0!==t)throw new Yi("Bad Promise constructor");r=e,t=n})),this.resolve=Gi(r),this.reject=Gi(t)};Hi.f=function(e){return new Qi(e)};var Xi=Hi;$n({target:"Promise",stat:!0},{withResolvers:function(){var e=Xi.f(this);return{promise:e.promise,resolve:e.resolve,reject:e.reject}}});var qi=Gt,Ki=Ir,Zi=function(e,r,t){return t.get&&qi(t.get,r,{getter:!0}),t.set&&qi(t.set,r,{setter:!0}),Ki.f(e,r,t)},$i=Mr,Ji=function(){var e=$i(this),r="";return e.hasIndices&&(r+="d"),e.global&&(r+="g"),e.ignoreCase&&(r+="i"),e.multiline&&(r+="m"),e.dotAll&&(r+="s"),e.unicode&&(r+="u"),e.unicodeSets&&(r+="v"),e.sticky&&(r+="y"),r},ec=u,rc=Zi,tc=Ji,nc=c,oc=a.RegExp,ac=oc.prototype,ic=ec&&nc((function(){var e=!0;try{oc(".","d")}catch(r){e=!1}var r={},t="",n=e?"dgimsy":"gimsy",o=function(e,n){Object.defineProperty(r,e,{get:function(){return t+=n,!0}})},a={dotAll:"s",global:"g",ignoreCase:"i",multiline:"m",sticky:"y"};for(var i in e&&(a.hasIndices="d"),a)o(i,a[i]);return Object.getOwnPropertyDescriptor(ac,"flags").get.call(r)!==n||t!==n}));ic&&rc(ac,"flags",{configurable:!0,get:tc});var cc=Xa,uc=String,sc=function(e){if("Symbol"===cc(e))throw new TypeError("Cannot convert a Symbol value to a string");return uc(e)},fc=$n,lc=F,pc=sc,yc=R("".charCodeAt);fc({target:"String",proto:!0},{isWellFormed:function(){for(var e=pc(lc(this)),r=e.length,t=0;t<r;t++){var n=yc(e,t);if(55296==(63488&n)&&(n>=56320||++t>=r||56320!=(64512&yc(e,t))))return!1}return!0}});var dc=$n,hc=p,gc=R,vc=F,mc=sc,bc=c,wc=Array,Ec=gc("".charAt),Ac=gc("".charCodeAt),Oc=gc([].join),Rc="".toWellFormed,Sc=Rc&&bc((function(){return"1"!==hc(Rc,1)}));dc({target:"String",proto:!0,forced:Sc},{toWellFormed:function(){var e=mc(vc(this));if(Sc)return hc(Rc,e);for(var r=e.length,t=wc(r),n=0;n<r;n++){var o=Ac(e,n);55296!=(63488&o)?t[n]=Ec(e,n):o>=56320||n+1>=r||56320!=(64512&Ac(e,n+1))?t[n]="�":(t[n]=Ec(e,n),t[++n]=Ec(e,n))}return Oc(t,"")}});var Tc,Ic,Cc,Dc="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView,jc=!c((function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype})),Pc=Ne,Mc=V,_c=Fe,kc=jc,xc=pt("IE_PROTO"),Uc=Object,Fc=Uc.prototype,Lc=kc?Uc.getPrototypeOf:function(e){var r=_c(e);if(Pc(r,xc))return r[xc];var t=r.constructor;return Mc(t)&&r instanceof t?t.prototype:r instanceof Uc?Fc:null},Bc=R,Nc=me,zc=H,Vc=function(e){return zc(e)||null===e},Wc=String,Hc=TypeError,Gc=function(e,r,t){try{return Bc(Nc(Object.getOwnPropertyDescriptor(e,r)[t]))}catch(e){}},Yc=Mr,Qc=function(e){if(Vc(e))return e;throw new Hc("Can't set "+Wc(e)+" as a prototype")},Xc=Object.setPrototypeOf||("__proto__"in{}?function(){var e,r=!1,t={};try{(e=Gc(Object.prototype,"__proto__","set"))(t,[]),r=t instanceof Array}catch(e){}return function(t,n){return Yc(t),Qc(n),r?e(t,n):t.__proto__=n,t}}():void 0),qc=Dc,Kc=u,Zc=a,$c=V,Jc=H,eu=Ne,ru=Xa,tu=de,nu=Yr,ou=Kt,au=Zi,iu=X,cu=Lc,uu=Xc,su=er,fu=Ge,lu=It.enforce,pu=It.get,yu=Zc.Int8Array,du=yu&&yu.prototype,hu=Zc.Uint8ClampedArray,gu=hu&&hu.prototype,vu=yu&&cu(yu),mu=du&&cu(du),bu=Object.prototype,wu=Zc.TypeError,Eu=su("toStringTag"),Au=fu("TYPED_ARRAY_TAG"),Ou="TypedArrayConstructor",Ru=qc&&!!uu&&"Opera"!==ru(Zc.opera),Su=!1,Tu={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8},Iu={BigInt64Array:8,BigUint64Array:8},Cu=function(e){var r=cu(e);if(Jc(r)){var t=pu(r);return t&&eu(t,Ou)?t[Ou]:Cu(r)}},Du=function(e){if(!Jc(e))return!1;var r=ru(e);return eu(Tu,r)||eu(Iu,r)};for(Tc in Tu)(Cc=(Ic=Zc[Tc])&&Ic.prototype)?lu(Cc)[Ou]=Ic:Ru=!1;for(Tc in Iu)(Cc=(Ic=Zc[Tc])&&Ic.prototype)&&(lu(Cc)[Ou]=Ic);if((!Ru||!$c(vu)||vu===Function.prototype)&&(vu=function(){throw new wu("Incorrect invocation")},Ru))for(Tc in Tu)Zc[Tc]&&uu(Zc[Tc],vu);if((!Ru||!mu||mu===bu)&&(mu=vu.prototype,Ru))for(Tc in Tu)Zc[Tc]&&uu(Zc[Tc].prototype,mu);if(Ru&&cu(gu)!==mu&&uu(gu,mu),Kc&&!eu(mu,Eu))for(Tc in Su=!0,au(mu,Eu,{configurable:!0,get:function(){return Jc(this)?this[Au]:void 0}}),Tu)Zc[Tc]&&nu(Zc[Tc],Au,Tc);var ju={NATIVE_ARRAY_BUFFER_VIEWS:Ru,TYPED_ARRAY_TAG:Su&&Au,aTypedArray:function(e){if(Du(e))return e;throw new wu("Target is not a typed array")},aTypedArrayConstructor:function(e){if($c(e)&&(!uu||iu(vu,e)))return e;throw new wu(tu(e)+" is not a typed array constructor")},exportTypedArrayMethod:function(e,r,t,n){if(Kc){if(t)for(var o in Tu){var a=Zc[o];if(a&&eu(a.prototype,e))try{delete a.prototype[e]}catch(t){try{a.prototype[e]=r}catch(e){}}}mu[e]&&!t||ou(mu,e,t?r:Ru&&du[e]||r,n)}},exportTypedArrayStaticMethod:function(e,r,t){var n,o;if(Kc){if(uu){if(t)for(n in Tu)if((o=Zc[n])&&eu(o,e))try{delete o[e]}catch(e){}if(vu[e]&&!t)return;try{return ou(vu,e,t?r:Ru&&vu[e]||r)}catch(e){}}for(n in Tu)!(o=Zc[n])||o[e]&&!t||ou(o,e,r)}},getTypedArrayConstructor:Cu,isView:function(e){if(!Jc(e))return!1;var r=ru(e);return"DataView"===r||eu(Tu,r)||eu(Iu,r)},isTypedArray:Du,TypedArray:vu,TypedArrayPrototype:mu},Pu=po,Mu=ju.aTypedArray,_u=ju.getTypedArrayConstructor;(0,ju.exportTypedArrayMethod)("toReversed",(function(){return Pu(Mu(this),_u(this))}));var ku=me,xu=Ko,Uu=ju.aTypedArray,Fu=ju.getTypedArrayConstructor,Lu=ju.exportTypedArrayMethod,Bu=R(ju.TypedArrayPrototype.sort);Lu("toSorted",(function(e){void 0!==e&&ku(e);var r=Uu(this),t=xu(Fu(r),r);return Bu(t,e)}));var Nu=Xa,zu=ur,Vu=TypeError,Wu=Ta,Hu=function(e){var r=Nu(e);return"BigInt64Array"===r||"BigUint64Array"===r},Gu=rn,Yu=function(e){var r=zu(e,"number");if("number"==typeof r)throw new Vu("Can't convert number to bigint");return BigInt(r)},Qu=ju.aTypedArray,Xu=ju.getTypedArrayConstructor,qu=ju.exportTypedArrayMethod,Ku=!!function(){try{new Int8Array(1).with(2,{valueOf:function(){throw 8}})}catch(e){return 8===e}}();qu("with",{with:function(e,r){var t=Qu(this),n=Gu(e),o=Hu(t)?Yu(r):+r;return Wu(t,Xu(t),n,o)}}.with,!Ku);var Zu=X,$u=TypeError,Ju=V,es=H,rs=Xc,ts=sc,ns=Error,os=R("".replace),as=String(new ns("zxcasd").stack),is=/\n\s*at [^:]*:[^\n]*/,cs=is.test(as),us=$n,ss=a,fs=Q,ls=b,ps=Ir.f,ys=Ne,ds=function(e,r){if(Zu(r,e))return e;throw new $u("Incorrect invocation")},hs=function(e,r,t){var n,o;return rs&&Ju(n=r.constructor)&&n!==t&&es(o=n.prototype)&&o!==t.prototype&&rs(e,o),e},gs=function(e,r){return void 0===e?arguments.length<2?"":r:ts(e)},vs={IndexSizeError:{s:"INDEX_SIZE_ERR",c:1,m:1},DOMStringSizeError:{s:"DOMSTRING_SIZE_ERR",c:2,m:0},HierarchyRequestError:{s:"HIERARCHY_REQUEST_ERR",c:3,m:1},WrongDocumentError:{s:"WRONG_DOCUMENT_ERR",c:4,m:1},InvalidCharacterError:{s:"INVALID_CHARACTER_ERR",c:5,m:1},NoDataAllowedError:{s:"NO_DATA_ALLOWED_ERR",c:6,m:0},NoModificationAllowedError:{s:"NO_MODIFICATION_ALLOWED_ERR",c:7,m:1},NotFoundError:{s:"NOT_FOUND_ERR",c:8,m:1},NotSupportedError:{s:"NOT_SUPPORTED_ERR",c:9,m:1},InUseAttributeError:{s:"INUSE_ATTRIBUTE_ERR",c:10,m:1},InvalidStateError:{s:"INVALID_STATE_ERR",c:11,m:1},SyntaxError:{s:"SYNTAX_ERR",c:12,m:1},InvalidModificationError:{s:"INVALID_MODIFICATION_ERR",c:13,m:1},NamespaceError:{s:"NAMESPACE_ERR",c:14,m:1},InvalidAccessError:{s:"INVALID_ACCESS_ERR",c:15,m:1},ValidationError:{s:"VALIDATION_ERR",c:16,m:0},TypeMismatchError:{s:"TYPE_MISMATCH_ERR",c:17,m:1},SecurityError:{s:"SECURITY_ERR",c:18,m:1},NetworkError:{s:"NETWORK_ERR",c:19,m:1},AbortError:{s:"ABORT_ERR",c:20,m:1},URLMismatchError:{s:"URL_MISMATCH_ERR",c:21,m:1},QuotaExceededError:{s:"QUOTA_EXCEEDED_ERR",c:22,m:1},TimeoutError:{s:"TIMEOUT_ERR",c:23,m:1},InvalidNodeTypeError:{s:"INVALID_NODE_TYPE_ERR",c:24,m:1},DataCloneError:{s:"DATA_CLONE_ERR",c:25,m:1}},ms=function(e,r){if(cs&&"string"==typeof e&&!ns.prepareStackTrace)for(;r--;)e=os(e,is,"");return e},bs=u,ws="DOMException",Es=fs("Error"),As=fs(ws),Os=function(){ds(this,Rs);var e=arguments.length,r=gs(e<1?void 0:arguments[0]),t=gs(e<2?void 0:arguments[1],"Error"),n=new As(r,t),o=new Es(r);return o.name=ws,ps(n,"stack",ls(1,ms(o.stack,1))),hs(n,this,Os),n},Rs=Os.prototype=As.prototype,Ss="stack"in new Es(ws),Ts="stack"in new As(1,2),Is=As&&bs&&Object.getOwnPropertyDescriptor(ss,ws),Cs=!(!Is||Is.writable&&Is.configurable),Ds=Ss&&!Cs&&!Ts;us({global:!0,constructor:!0,forced:Ds},{DOMException:Ds?Os:As});var js=fs(ws),Ps=js.prototype;if(Ps.constructor!==js)for(var Ms in ps(Ps,"constructor",ls(1,js)),vs)if(ys(vs,Ms)){var _s=vs[Ms],ks=_s.s;ys(js,ks)||ps(js,ks,ls(6,_s.c))}var xs,Us,Fs,Ls,Bs=s,Ns=Function.prototype,zs=Ns.apply,Vs=Ns.call,Ws="object"==typeof Reflect&&Reflect.apply||(Bs?Vs.bind(zs):function(){return Vs.apply(zs,arguments)}),Hs=R([].slice),Gs=TypeError,Ys=function(e,r){if(e<r)throw new Gs("Not enough arguments");return e},Qs=/(?:ipad|iphone|ipod).*applewebkit/i.test(q),Xs="process"===C(a.process),qs=a,Ks=Ws,Zs=Ua,$s=V,Js=Ne,ef=c,rf=So,tf=Hs,nf=hr,of=Ys,af=Qs,cf=Xs,uf=qs.setImmediate,sf=qs.clearImmediate,ff=qs.process,lf=qs.Dispatch,pf=qs.Function,yf=qs.MessageChannel,df=qs.String,hf=0,gf={},vf="onreadystatechange";ef((function(){xs=qs.location}));var mf=function(e){if(Js(gf,e)){var r=gf[e];delete gf[e],r()}},bf=function(e){return function(){mf(e)}},wf=function(e){mf(e.data)},Ef=function(e){qs.postMessage(df(e),xs.protocol+"//"+xs.host)};uf&&sf||(uf=function(e){of(arguments.length,1);var r=$s(e)?e:pf(e),t=tf(arguments,1);return gf[++hf]=function(){Ks(r,void 0,t)},Us(hf),hf},sf=function(e){delete gf[e]},cf?Us=function(e){ff.nextTick(bf(e))}:lf&&lf.now?Us=function(e){lf.now(bf(e))}:yf&&!af?(Ls=(Fs=new yf).port2,Fs.port1.onmessage=wf,Us=Zs(Ls.postMessage,Ls)):qs.addEventListener&&$s(qs.postMessage)&&!qs.importScripts&&xs&&"file:"!==xs.protocol&&!ef(Ef)?(Us=Ef,qs.addEventListener("message",wf,!1)):Us=vf in nf("script")?function(e){rf.appendChild(nf("script"))[vf]=function(){rf.removeChild(this),mf(e)}}:function(e){setTimeout(bf(e),0)});var Af={set:uf,clear:sf},Of=Af.clear;$n({global:!0,bind:!0,enumerable:!0,forced:a.clearImmediate!==Of},{clearImmediate:Of});var Rf="function"==typeof Bun&&Bun&&"string"==typeof Bun.version,Sf=a,Tf=Ws,If=V,Cf=Rf,Df=q,jf=Hs,Pf=Ys,Mf=Sf.Function,_f=/MSIE .\./.test(Df)||Cf&&function(){var e=Sf.Bun.version.split(".");return e.length<3||"0"===e[0]&&(e[1]<3||"3"===e[1]&&"0"===e[2])}(),kf=$n,xf=a,Uf=Af.set,Ff=function(e,r){var t=r?2:1;return _f?function(n,o){var a=Pf(arguments.length,1)>t,i=If(n)?n:Mf(n),c=a?jf(arguments,t):[],u=a?function(){Tf(i,this,c)}:i;return r?e(u,o):e(u)}:e},Lf=xf.setImmediate?Ff(Uf,!1):Uf;kf({global:!0,bind:!0,enumerable:!0,forced:xf.setImmediate!==Lf},{setImmediate:Lf});var Bf=R,Nf=c,zf=V,Vf=Xa,Wf=it,Hf=function(){},Gf=Q("Reflect","construct"),Yf=/^\s*(?:class|function)\b/,Qf=Bf(Yf.exec),Xf=!Yf.test(Hf),qf=function(e){if(!zf(e))return!1;try{return Gf(Hf,[],e),!0}catch(e){return!1}},Kf=function(e){if(!zf(e))return!1;switch(Vf(e)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return Xf||!!Qf(Yf,Wf(e))}catch(e){return!0}};Kf.sham=!0;var Zf,$f,Jf,el,rl=!Gf||Nf((function(){var e;return qf(qf.call)||!qf(Object)||!qf((function(){e=!0}))||e}))?Kf:qf,tl=lr,nl=Ir,ol=b,al=p,il=Ne,cl=X,ul=Ji,sl=RegExp.prototype,fl=R,ll=Set.prototype,pl={Set:Set,add:fl(ll.add),has:fl(ll.has),remove:fl(ll.delete),proto:ll},yl=p,dl=R,hl=function(e,r,t){for(var n,o,a=t?e:e.iterator,i=e.next;!(n=yl(i,a)).done;)if(void 0!==(o=r(n.value)))return o},gl=pl.Set,vl=pl.proto,ml=dl(vl.forEach),bl=dl(vl.keys),wl=bl(new gl).next,El=Xs,Al="object"==typeof Deno&&Deno&&"object"==typeof Deno.version,Ol=!Al&&!Xs&&"object"==typeof window&&"object"==typeof document,Rl=c,Sl=te,Tl=Ol,Il=Al,Cl=Xs,Dl=a.structuredClone,jl=!!Dl&&!Rl((function(){if(Il&&Sl>92||Cl&&Sl>94||Tl&&Sl>97)return!1;var e=new ArrayBuffer(8),r=Dl(e,{transfer:[e]});return 0!==e.byteLength||8!==r.byteLength})),Pl=a,Ml=function(e){try{if(El)return Function('return require("'+e+'")')()}catch(e){}},_l=jl,kl=Pl.structuredClone,xl=Pl.ArrayBuffer,Ul=Pl.MessageChannel,Fl=!1;if(_l)Fl=function(e){kl(e,{transfer:[e]})};else if(xl)try{Ul||(Zf=Ml("worker_threads"))&&(Ul=Zf.MessageChannel),Ul&&($f=new Ul,Jf=new xl(2),el=function(e){$f.port1.postMessage(null,[e])},2===Jf.byteLength&&(el(Jf),0===Jf.byteLength&&(Fl=el)))}catch(e){}var Ll,Bl=Fl,Nl=b,zl=!c((function(){var e=new Error("a");return!("stack"in e)||(Object.defineProperty(e,"stack",Nl(1,7)),7!==e.stack)})),Vl=$n,Wl=a,Hl=Q,Gl=R,Yl=c,Ql=Ge,Xl=V,ql=rl,Kl=k,Zl=H,$l=pe,Jl=Oi,ep=Mr,rp=Xa,tp=Ne,np=function(e,r,t){var n=tl(r);n in e?nl.f(e,n,ol(0,t)):e[n]=t},op=Yr,ap=fn,ip=Ys,cp=function(e){var r=e.flags;return void 0!==r||"flags"in sl||il(e,"flags")||!cl(sl,e)?r:al(ul,e)},up=Ti,sp=pl,fp=function(e,r,t){return t?hl({iterator:bl(e),next:wl},r):ml(e,r)},lp=Bl,pp=zl,yp=jl,dp=Wl.Object,hp=Wl.Array,gp=Wl.Date,vp=Wl.Error,mp=Wl.TypeError,bp=Wl.PerformanceMark,wp=Hl("DOMException"),Ep=up.Map,Ap=up.has,Op=up.get,Rp=up.set,Sp=sp.Set,Tp=sp.add,Ip=sp.has,Cp=Hl("Object","keys"),Dp=Gl([].push),jp=Gl((!0).valueOf),Pp=Gl(1..valueOf),Mp=Gl("".valueOf),_p=Gl(gp.prototype.getTime),kp=Ql("structuredClone"),xp="DataCloneError",Up="Transferring",Fp=function(e){return!Yl((function(){var r=new Wl.Set([7]),t=e(r),n=e(dp(7));return t===r||!t.has(7)||!Zl(n)||7!=+n}))&&e},Lp=function(e,r){return!Yl((function(){var t=new r,n=e({a:t,b:t});return!(n&&n.a===n.b&&n.a instanceof r&&n.a.stack===t.stack)}))},Bp=Wl.structuredClone,Np=!Lp(Bp,vp)||!Lp(Bp,wp)||(Ll=Bp,!!Yl((function(){var e=Ll(new Wl.AggregateError([1],kp,{cause:3}));return"AggregateError"!==e.name||1!==e.errors[0]||e.message!==kp||3!==e.cause}))),zp=!Bp&&Fp((function(e){return new bp(kp,{detail:e}).detail})),Vp=Fp(Bp)||zp,Wp=function(e){throw new wp("Uncloneable type: "+e,xp)},Hp=function(e,r){throw new wp((r||"Cloning")+" of "+e+" cannot be properly polyfilled in this engine",xp)},Gp=function(e,r){return Vp||Hp(r),Vp(e)},Yp=function(e,r,t){if(Ap(r,e))return Op(r,e);var n,o,a,i,c,u;if("SharedArrayBuffer"===(t||rp(e)))n=Vp?Vp(e):e;else{var s=Wl.DataView;s||Xl(e.slice)||Hp("ArrayBuffer");try{if(Xl(e.slice)&&!e.resizable)n=e.slice(0);else{o=e.byteLength,a="maxByteLength"in e?{maxByteLength:e.maxByteLength}:void 0,n=new ArrayBuffer(o,a),i=new s(e),c=new s(n);for(u=0;u<o;u++)c.setUint8(u,i.getUint8(u))}}catch(e){throw new wp("ArrayBuffer is detached",xp)}}return Rp(r,e,n),n},Qp=function(e,r){if($l(e)&&Wp("Symbol"),!Zl(e))return e;if(r){if(Ap(r,e))return Op(r,e)}else r=new Ep;var t,n,o,a,i,c,u,s,f=rp(e);switch(f){case"Array":o=hp(ap(e));break;case"Object":o={};break;case"Map":o=new Ep;break;case"Set":o=new Sp;break;case"RegExp":o=new RegExp(e.source,cp(e));break;case"Error":switch(n=e.name){case"AggregateError":o=new(Hl(n))([]);break;case"EvalError":case"RangeError":case"ReferenceError":case"SuppressedError":case"SyntaxError":case"TypeError":case"URIError":o=new(Hl(n));break;case"CompileError":case"LinkError":case"RuntimeError":o=new(Hl("WebAssembly",n));break;default:o=new vp}break;case"DOMException":o=new wp(e.message,e.name);break;case"ArrayBuffer":case"SharedArrayBuffer":o=Yp(e,r,f);break;case"DataView":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float16Array":case"Float32Array":case"Float64Array":case"BigInt64Array":case"BigUint64Array":c="DataView"===f?e.byteLength:e.length,o=function(e,r,t,n,o){var a=Wl[r];return Zl(a)||Hp(r),new a(Yp(e.buffer,o),t,n)}(e,f,e.byteOffset,c,r);break;case"DOMQuad":try{o=new DOMQuad(Qp(e.p1,r),Qp(e.p2,r),Qp(e.p3,r),Qp(e.p4,r))}catch(r){o=Gp(e,f)}break;case"File":if(Vp)try{o=Vp(e),rp(o)!==f&&(o=void 0)}catch(e){}if(!o)try{o=new File([e],e.name,e)}catch(e){}o||Hp(f);break;case"FileList":if(a=function(){var e;try{e=new Wl.DataTransfer}catch(r){try{e=new Wl.ClipboardEvent("").clipboardData}catch(e){}}return e&&e.items&&e.files?e:null}()){for(i=0,c=ap(e);i<c;i++)a.items.add(Qp(e[i],r));o=a.files}else o=Gp(e,f);break;case"ImageData":try{o=new ImageData(Qp(e.data,r),e.width,e.height,{colorSpace:e.colorSpace})}catch(r){o=Gp(e,f)}break;default:if(Vp)o=Vp(e);else switch(f){case"BigInt":o=dp(e.valueOf());break;case"Boolean":o=dp(jp(e));break;case"Number":o=dp(Pp(e));break;case"String":o=dp(Mp(e));break;case"Date":o=new gp(_p(e));break;case"Blob":try{o=e.slice(0,e.size,e.type)}catch(e){Hp(f)}break;case"DOMPoint":case"DOMPointReadOnly":t=Wl[f];try{o=t.fromPoint?t.fromPoint(e):new t(e.x,e.y,e.z,e.w)}catch(e){Hp(f)}break;case"DOMRect":case"DOMRectReadOnly":t=Wl[f];try{o=t.fromRect?t.fromRect(e):new t(e.x,e.y,e.width,e.height)}catch(e){Hp(f)}break;case"DOMMatrix":case"DOMMatrixReadOnly":t=Wl[f];try{o=t.fromMatrix?t.fromMatrix(e):new t(e)}catch(e){Hp(f)}break;case"AudioData":case"VideoFrame":Xl(e.clone)||Hp(f);try{o=e.clone()}catch(e){Wp(f)}break;case"CropTarget":case"CryptoKey":case"FileSystemDirectoryHandle":case"FileSystemFileHandle":case"FileSystemHandle":case"GPUCompilationInfo":case"GPUCompilationMessage":case"ImageBitmap":case"RTCCertificate":case"WebAssembly.Module":Hp(f);default:Wp(f)}}switch(Rp(r,e,o),f){case"Array":case"Object":for(u=Cp(e),i=0,c=ap(u);i<c;i++)s=u[i],np(o,s,Qp(e[s],r));break;case"Map":e.forEach((function(e,t){Rp(o,Qp(t,r),Qp(e,r))}));break;case"Set":e.forEach((function(e){Tp(o,Qp(e,r))}));break;case"Error":op(o,"message",Qp(e.message,r)),tp(e,"cause")&&op(o,"cause",Qp(e.cause,r)),"AggregateError"===n?o.errors=Qp(e.errors,r):"SuppressedError"===n&&(o.error=Qp(e.error,r),o.suppressed=Qp(e.suppressed,r));case"DOMException":pp&&op(o,"stack",Qp(e.stack,r))}return o};Vl({global:!0,enumerable:!0,sham:!yp,forced:Np},{structuredClone:function(e){var r,t,n=ip(arguments.length,1)>1&&!Kl(arguments[1])?ep(arguments[1]):void 0,o=n?n.transfer:void 0;void 0!==o&&(t=function(e,r){if(!Zl(e))throw new mp("Transfer option cannot be converted to a sequence");var t=[];Jl(e,(function(e){Dp(t,ep(e))}));for(var n,o,a,i,c,u=0,s=ap(t),f=new Sp;u<s;){if(n=t[u++],"ArrayBuffer"===(o=rp(n))?Ip(f,n):Ap(r,n))throw new wp("Duplicate transferable",xp);if("ArrayBuffer"!==o){if(yp)i=Bp(n,{transfer:[n]});else switch(o){case"ImageBitmap":a=Wl.OffscreenCanvas,ql(a)||Hp(o,Up);try{(c=new a(n.width,n.height)).getContext("bitmaprenderer").transferFromImageBitmap(n),i=c.transferToImageBitmap()}catch(e){}break;case"AudioData":case"VideoFrame":Xl(n.clone)&&Xl(n.close)||Hp(o,Up);try{i=n.clone(),n.close()}catch(e){}break;case"MediaSourceHandle":case"MessagePort":case"OffscreenCanvas":case"ReadableStream":case"TransformStream":case"WritableStream":Hp(o,Up)}if(void 0===i)throw new wp("This object cannot be transferred: "+o,xp);Rp(r,n,i)}else Tp(f,n)}return f}(o,r=new Ep));var a=Qp(e,r);return t&&function(e){fp(e,(function(e){yp?Vp(e,{transfer:[e]}):Xl(e.transfer)?e.transfer():lp?lp(e):Hp("ArrayBuffer",Up)}))}(t),a}});var Xp=c,qp=u,Kp=er("iterator"),Zp=!Xp((function(){var e=new URL("b?a=1&b=2&c=3","http://a"),r=e.searchParams,t=new URLSearchParams("a=1&a=2&b=3"),n="";return e.pathname="c%20d",r.forEach((function(e,t){r.delete("b"),n+=t+e})),t.delete("a",2),t.delete("b",void 0),!r.size&&!qp||!r.sort||"http://a/c%20d?a=1&c=3"!==e.href||"3"!==r.get("c")||"a=1"!==String(new URLSearchParams("?a=1"))||!r[Kp]||"a"!==new URL("https://a@b").username||"b"!==new URLSearchParams(new URLSearchParams("a=b")).get("a")||"xn--e1aybc"!==new URL("http://тест").host||"#%D0%B1"!==new URL("http://a#б").hash||"a1c3"!==n||"x"!==new URL("http://x",void 0).host})),$p=$n,Jp=c,ey=Ys,ry=sc,ty=Zp,ny=Q("URL");$p({target:"URL",stat:!0,forced:!(ty&&Jp((function(){ny.canParse()})))},{canParse:function(e){var r=ey(arguments.length,1),t=ry(e),n=r<2||void 0===arguments[1]?void 0:ry(arguments[1]);try{return!!new ny(t,n)}catch(e){return!1}}});var oy=Kt,ay=R,iy=sc,cy=Ys,uy=URLSearchParams,sy=uy.prototype,fy=ay(sy.append),ly=ay(sy.delete),py=ay(sy.forEach),yy=ay([].push),dy=new uy("a=1&a=2&b=3");dy.delete("a",1),dy.delete("b",void 0),dy+""!="a=2"&&oy(sy,"delete",(function(e){var r=arguments.length,t=r<2?void 0:arguments[1];if(r&&void 0===t)return ly(this,e);var n=[];py(this,(function(e,r){yy(n,{key:r,value:e})})),cy(r,1);for(var o,a=iy(e),i=iy(t),c=0,u=0,s=!1,f=n.length;c<f;)o=n[c++],s||o.key===a?(s=!0,ly(this,o.key)):u++;for(;u<f;)(o=n[u++]).key===a&&o.value===i||fy(this,o.key,o.value)}),{enumerable:!0,unsafe:!0});var hy=Kt,gy=R,vy=sc,my=Ys,by=URLSearchParams,wy=by.prototype,Ey=gy(wy.getAll),Ay=gy(wy.has),Oy=new by("a=1");!Oy.has("a",2)&&Oy.has("a",void 0)||hy(wy,"has",(function(e){var r=arguments.length,t=r<2?void 0:arguments[1];if(r&&void 0===t)return Ay(this,e);var n=Ey(this,e);my(r,1);for(var o=vy(t),a=0;a<n.length;)if(n[a++]===o)return!0;return!1}),{enumerable:!0,unsafe:!0});var Ry=u,Sy=R,Ty=Zi,Iy=URLSearchParams.prototype,Cy=Sy(Iy.forEach);Ry&&!("size"in Iy)&&Ty(Iy,"size",{get:function(){var e=0;return Cy(this,(function(){e++})),e},configurable:!0,enumerable:!0});const Dy=r.createFormatter({day:"2-digit",omitCommas:!0,weekday:"short"}),jy=r.createFormatter({hour:"numeric",minute:"2-digit",omitZeroMinute:!0,meridiem:"narrow"});function Py(e){const t=My(),n=r.getDateMeta(e.instance.range.start,t);return Object.assign(n,{seg:{isStart:e.instance.range.start>=t.start,isEnd:e.instance.range.end<=t.end,eventRange:e}})}function My(e,r){const t=new Date(e||Date.now());r&&t.setUTCDate(t.getUTCDate()+r),t.setUTCHours(0,0,0,0);const n=new Date(t);return n.setUTCDate(n.getUTCDate()+1),{start:t,end:n}}function _y(e){const{children:n,context:o,date:a,events:i}=e,c=r.getDateMeta(a,My());return t.h("td",{class:r.getDayClassNames(c,o.theme).concat(["fc-events"]).join(" ")},i.map((e=>t.h(xy,{context:o,event:e}))),n)}function ky(e){const{events:n}=e;if(0===n.length)return;const o=Py(n[0]);return t.h(r.BgEvent,o)}function xy(e){const{event:n}=e,o=Py(n);return t.h(r.StandardEvent,Object.assign(o,{defaultTimeFormat:jy,elClasses:["fc-h-event"],isDragging:!1,isResizing:!1,isDateSelecting:!1,isSelected:!1}))}class Uy extends r.BaseComponent{render(e,n,o){const a=o.viewApi.getOption("dayHeaders"),i=o.viewApi.getOption("dayHeaderFormat")||Dy,c=My(),u=Object.values(o.calendarApi.getCurrentData().eventSources).filter((e=>"background"!=e?.ui.display)),s=a?[t.h("col",{class:"fc-day-col"})]:[];u.forEach((()=>s.push(t.h("col",{}))));const f=(a?[null]:[]).concat(u).map((e=>t.h("th",{class:"fc-col-header-cell fc-day",role:"columnheader"},t.h("div",{class:"fc-scrollgrid-sync-inner"},e?.extendedProps.name||"")))),l=[],p=new Date(e.dateProfile.renderRange.start);for(;p.getTime()<e.dateProfile.renderRange.end.getTime();){const n=My(p),s=r.sliceEventStore(e.eventStore,e.eventUiBases,n,e.nextDayThreshold);l.push(t.h("tr",{class:"fc-multicol-row"},a&&t.h(r.TableDateCell,{dayHeaderFormat:i,date:n.start,dateProfile:e.dateProfile,todayRange:c,colCnt:1,extraRenderProps:{class:"extra"}}),u.map((e=>t.h(_y,{context:o,date:n.start,events:s.fg.filter((r=>r.def.sourceId==e.sourceId))},t.h(ky,{events:s.bg})))))),p.setUTCDate(p.getUTCDate()+1)}return[t.h("style",{},".fc-multicol{border-collapse:collapse!important;}.fc-multicol .fc-day-col{width:75px;}.fc-multicol .fc-day-today{background-color:var(--fc-today-bg-color);}.fc-multicol th{overflow:hidden;padding:2px 4px;}.fc-multicol .fc-events{padding:2px;position:relative;}.fc-multicol .fc-event.fc-bg-event{border:none;margin:0;z-index:-1;}.fc-multicol .fc-h-event{border-radius:3px;display:block;font-size:var(--fc-small-font-size);margin:1px 0 2px 0;overflow:hidden;padding:1px 2px;}.fc-multicol .fc-event-meta{float:right;}.fc-multicol .fc-event-time{display:inline-block;margin-right:3px;overflow:unset;}.fc-multicol .fc-event-location{display:inline-block;}"),t.h("table",{class:"fc-scrollgrid fc-multicol"},t.h("colgroup",{},s),t.h("thead",{},t.h("tr",{},f)),t.h("tbody",{},l))]}}return e.createPlugin({name:"MultiColumnView",initialView:"multiCol",views:{multiCol:{component:Uy,dateAlignment:"week",duration:{weeks:4}}}})}(FullCalendar,FullCalendar.Internal,FullCalendar.Preact);//# sourceMappingURL=multicol.js.map
