(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"/e88":function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},"0THn":function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n("q1tI"),r=n.n(a),l=n("/MKj");n("t3i4");var o=function(e){var t,n;function a(){return e.apply(this,arguments)||this}return n=e,(t=a).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,a.prototype.render=function(){return r.a.createElement("div",{className:"input-group mb-3 counter-wrapper"},r.a.createElement("input",{type:"text",className:"form-control",value:this.props.count}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{onClick:this.props.increment,className:"btn btn-outline-secondary",type:"button"},"Increment!")))},a}(r.a.Component),c=Object(l.connect)((function(e){return{count:e.count}}),(function(e){return{increment:function(){return e({type:"INCREMENT",value:"hi"})}}}))(o)},B7F5:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n("q1tI"),r=n.n(a),l=(n("xfY5"),n("+ZDr")),o=n.n(l);n("lw3w"),n("emEt").default.enqueue,r.a.createContext({});var c=n("hwdJ"),u=n.n(c);var i=function(e){var t,n;function a(){return e.apply(this,arguments)||this}return n=e,(t=a).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,a.prototype.render=function(){return r.a.createElement("div",{className:"layout-wrapper "+u.a.container},r.a.createElement("div",{className:"layout-side-nav"},r.a.createElement("h3",{className:"display-4"},"Nav:"),r.a.createElement("ul",{className:"list-unstyled"},r.a.createElement("li",null,r.a.createElement(o.a,{to:"/"},"Main page")),r.a.createElement("li",null,r.a.createElement(o.a,{to:"/sub-page/"},"Sub page")))),r.a.createElement("div",{className:"layout-main-content"},this.props.children))},a}(r.a.Component)},QeBL:function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),r=n.n(a),l=n("0THn"),o=n("B7F5");var c=function(e){var t,n;function a(){return e.apply(this,arguments)||this}return n=e,(t=a).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,a.prototype.render=function(){return r.a.createElement(o.a,null,r.a.createElement("h1",{className:"display-1"},"Hello Gatsby!"),r.a.createElement(l.a,null),r.a.createElement("div",{className:"test-colour"},"Hello world!"),r.a.createElement("table",{className:"table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Row"),r.a.createElement("th",null,"First Name"),r.a.createElement("th",null,"Last Name"),r.a.createElement("th",null,"Email"))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"1"),r.a.createElement("td",null,"Clark"),r.a.createElement("td",null,"Kent"),r.a.createElement("td",null,"clarkkent@mail.com")),r.a.createElement("tr",null,r.a.createElement("td",null,"2"),r.a.createElement("td",null,"John"),r.a.createElement("td",null,"Carter"),r.a.createElement("td",null,"johncarter@mail.com")),r.a.createElement("tr",null,r.a.createElement("td",null,"3"),r.a.createElement("td",null,"Peter"),r.a.createElement("td",null,"Parker"),r.a.createElement("td",null,"peterparker@mail.com")))))},a}(r.a.Component);t.default=c},hwdJ:function(e,t,n){e.exports={layoutWrapper:"layout-module--layout-wrapper--1D4JS",layoutSideNav:"layout-module--layout-side-nav--37oHI",layoutMainContent:"layout-module--layout-main-content--1ZsTR",testColour:"layout-module--test-colour--383W9"}},lw3w:function(e,t,n){var a;e.exports=(a=n("rzlk"))&&a.default||a},qncB:function(e,t,n){var a=n("XKFU"),r=n("vhPU"),l=n("eeVq"),o=n("/e88"),c="["+o+"]",u=RegExp("^"+c+c+"*"),i=RegExp(c+c+"*$"),s=function(e,t,n){var r={},c=l((function(){return!!o[e]()||"​"!="​"[e]()})),u=r[e]=c?t(p):o[e];n&&(r[n]=u),a(a.P+a.F*c,"String",r)},p=s.trim=function(e,t){return e=String(r(e)),1&t&&(e=e.replace(u,"")),2&t&&(e=e.replace(i,"")),e};e.exports=s},rzlk:function(e,t,n){"use strict";n.r(t);n("91GP");var a=n("q1tI"),r=n.n(a),l=n("IOVJ");t.default=function(e){var t=e.location,n=e.pageResources;return n?r.a.createElement(l.a,Object.assign({location:t,pageResources:n},n.json)):null}},t3i4:function(e,t,n){},xfY5:function(e,t,n){"use strict";var a=n("dyZX"),r=n("aagx"),l=n("LZWt"),o=n("Xbzi"),c=n("apmT"),u=n("eeVq"),i=n("kJMx").f,s=n("EemH").f,p=n("hswa").f,m=n("qncB").trim,E=a.Number,f=E,d=E.prototype,y="Number"==l(n("Kuth")(d)),N="trim"in String.prototype,h=function(e){var t=c(e,!1);if("string"==typeof t&&t.length>2){var n,a,r,l=(t=N?t.trim():m(t,3)).charCodeAt(0);if(43===l||45===l){if(88===(n=t.charCodeAt(2))||120===n)return NaN}else if(48===l){switch(t.charCodeAt(1)){case 66:case 98:a=2,r=49;break;case 79:case 111:a=8,r=55;break;default:return+t}for(var o,u=t.slice(2),i=0,s=u.length;i<s;i++)if((o=u.charCodeAt(i))<48||o>r)return NaN;return parseInt(u,a)}}return+t};if(!E(" 0o1")||!E("0b1")||E("+0x1")){E=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof E&&(y?u((function(){d.valueOf.call(n)})):"Number"!=l(n))?o(new f(h(t)),n,E):h(t)};for(var v,I=n("nh4g")?i(f):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),b=0;I.length>b;b++)r(f,v=I[b])&&!r(E,v)&&p(E,v,s(f,v));E.prototype=d,d.constructor=E,n("KroJ")(a,"Number",E)}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-1f1716d3d58e443e216e.js.map