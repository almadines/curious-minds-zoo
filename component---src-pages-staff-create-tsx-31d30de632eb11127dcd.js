(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"/e88":function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},B7F5:function(t,e,a){"use strict";a.d(e,"a",(function(){return l}));var n=a("q1tI"),r=a("Wbzz"),o=(a("je2q"),a("X+mI")),i=a("/MKj");function s(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}var c=function(t){function e(){return t.apply(this,arguments)||this}return s(e,t),e.mapStateToProps=function(t){return e.saveElement.stateChanged(t),{}},e.prototype.render=function(){return null},e}(n.PureComponent);c.saveElement=new o.a;var p=Object(i.connect)(c.mapStateToProps)(c),l=function(t){function e(){return t.apply(this,arguments)||this}return s(e,t),e.prototype.render=function(){return n.createElement("div",{className:"layout-wrapper"},n.createElement(p,null),n.createElement("div",{className:"layout-side-nav"},n.createElement("div",{className:"layout-top-block layout-nav-title"},n.createElement("div",{className:"layout-nav-header"},n.createElement("h3",{className:"display-6"}))),n.createElement("div",{className:"layout-link-list"},n.createElement(r.a,{to:"/"},"Main Page"),n.createElement(r.a,{to:"/animals/"},"Animals"),n.createElement(r.a,{to:"/exhibits/"},"Exhibits"),n.createElement(r.a,{to:"/staff/"},"Staff"),n.createElement(r.a,{to:"/about/"},"About"))),n.createElement("div",{className:"layout-right-block"},n.createElement("div",{className:"layout-top-block"},n.createElement("div",{className:"layout-title"},n.createElement("h1",{className:"display-5"},this.props.title))),n.createElement("div",{className:"layout-main-content"},n.createElement("div",{className:"layout-main-content-padding"},this.props.children))))},e}(n.Component)},UHJW:function(t,e,a){"use strict";a.r(e);var n=a("q1tI"),r=a("B7F5"),o=a("B4Bt"),i=a("uP/u");var s=function(t){var e,a;function s(){return t.apply(this,arguments)||this}return a=t,(e=s).prototype=Object.create(a.prototype),e.prototype.constructor=e,e.__proto__=a,s.prototype.render=function(){return n.createElement(r.a,{title:"Create Staff"},n.createElement(i.a,{editorTemplate:o.a.getNewEditorTemplate(),editMode:!0}))},s}(n.PureComponent);e.default=s},Wbzz:function(t,e,a){"use strict";a("xfY5");var n=a("q1tI"),r=a.n(n),o=a("+ZDr"),i=a.n(o);a.d(e,"a",(function(){return i.a})),a.d(e,"b",(function(){return o.navigate}));a("lw3w"),a("emEt").default.enqueue,r.a.createContext({})},je2q:function(t,e,a){},lw3w:function(t,e,a){var n;t.exports=(n=a("rzlk"))&&n.default||n},qncB:function(t,e,a){var n=a("XKFU"),r=a("vhPU"),o=a("eeVq"),i=a("/e88"),s="["+i+"]",c=RegExp("^"+s+s+"*"),p=RegExp(s+s+"*$"),l=function(t,e,a){var r={},s=o((function(){return!!i[t]()||"​"!="​"[t]()})),c=r[t]=s?e(u):i[t];a&&(r[a]=c),n(n.P+n.F*s,"String",r)},u=l.trim=function(t,e){return t=String(r(t)),1&e&&(t=t.replace(c,"")),2&e&&(t=t.replace(p,"")),t};t.exports=l},rzlk:function(t,e,a){"use strict";a.r(e);a("91GP");var n=a("q1tI"),r=a.n(n),o=a("IOVJ");e.default=function(t){var e=t.location,a=t.pageResources;return a?r.a.createElement(o.a,Object.assign({location:e,pageResources:a},a.json)):null}},"uP/u":function(t,e,a){"use strict";a("91GP");var n=a("q1tI"),r=a("/MKj"),o=a("Vkfw");a("ugz2");var i=function(t){var e,a;function r(e){var a;return(a=t.call(this,e)||this).state={currentData:a.getInitialState(e)},a}a=t,(e=r).prototype=Object.create(a.prototype),e.prototype.constructor=e,e.__proto__=a;var i=r.prototype;return i.getInitialState=function(t){var e={};return t.editorTemplate.getEditorElements().forEach((function(t){t.initialValue&&(e[t.identifier]=t.initialValue)})),e},i.onInputChange=function(t,e){var a=Object.assign({},this.state.currentData);a[e]=t,this.setState({currentData:a})},i.createObject=function(t){t.stopPropagation();var e=this.props.editorTemplate.fromData(this.state.currentData);e&&this.props.dispatchFunction?(this.props.editorTemplate.reset(),this.props.dispatchFunction({type:o.a.add,values:[e],names:[this.props.editorTemplate.dataTypeName]}),this.setState({currentData:this.getInitialState(this.props)}),this.props.onSuccessCallback&&this.props.onSuccessCallback()):console.warn("Unable to create object!, Invalid  or incomplete data!")},i.cancel=function(t){t.stopPropagation(),this.props.editorTemplate.reset(),this.setState({currentData:this.getInitialState(this.props)}),this.props.onCancelCallback&&this.props.onCancelCallback()},r.mapStateToProps=function(t){return{}},r.mapDispatchToProps=function(t){return{dispatchFunction:t}},i.render=function(){var t=this,e=this.props.editMode?n.createElement("button",{className:"btn btn-success edit-page-button",onClick:this.createObject.bind(this)},"Submit"):null,a=this.props.editMode?n.createElement("button",{className:"btn btn-danger edit-page-button",onClick:this.cancel.bind(this)},"Cancel"):null,r=this.props.title?n.createElement("h3",{className:"display-8"},this.props.title):null;return n.createElement("div",{className:"edit-wrapper"},r,n.createElement("div",{className:"edit-page-contents"},this.props.editorTemplate.getEditorElements().map((function(e){return e.render(t.props.editMode,t.onInputChange.bind(t))}))),n.createElement("div",{className:"edit-page-buttons-wrapper"},a,e))},r}(n.PureComponent),s=Object(r.connect)(i.mapStateToProps,i.mapDispatchToProps)(i);e.a=s},ugz2:function(t,e,a){},xfY5:function(t,e,a){"use strict";var n=a("dyZX"),r=a("aagx"),o=a("LZWt"),i=a("Xbzi"),s=a("apmT"),c=a("eeVq"),p=a("kJMx").f,l=a("EemH").f,u=a("hswa").f,m=a("qncB").trim,f=n.Number,d=f,h=f.prototype,E="Number"==o(a("Kuth")(h)),v="trim"in String.prototype,b=function(t){var e=s(t,!1);if("string"==typeof e&&e.length>2){var a,n,r,o=(e=v?e.trim():m(e,3)).charCodeAt(0);if(43===o||45===o){if(88===(a=e.charCodeAt(2))||120===a)return NaN}else if(48===o){switch(e.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+e}for(var i,c=e.slice(2),p=0,l=c.length;p<l;p++)if((i=c.charCodeAt(p))<48||i>r)return NaN;return parseInt(c,n)}}return+e};if(!f(" 0o1")||!f("0b1")||f("+0x1")){f=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof f&&(E?c((function(){h.valueOf.call(a)})):"Number"!=o(a))?i(new d(b(e)),a,f):b(e)};for(var g,N=a("nh4g")?p(d):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),y=0;N.length>y;y++)r(d,g=N[y])&&!r(f,g)&&u(f,g,l(d,g));f.prototype=h,h.constructor=f,a("KroJ")(n,"Number",f)}}}]);
//# sourceMappingURL=component---src-pages-staff-create-tsx-31d30de632eb11127dcd.js.map