(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"6v+W":function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),i=n("B7F5"),o=n("4Ccd");var s=function(e){var t,n;function s(){return e.apply(this,arguments)||this}return n=e,(t=s).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,s.prototype.render=function(){return a.createElement(i.a,{title:"Animals:",iconName:"pets"},a.createElement(o.a,{linkDetailPages:!0}))},s}(a.PureComponent);t.default=s},B7F5:function(e,t,n){"use strict";n.d(t,"a",(function(){return y}));var a=n("q1tI"),i=n("Wbzz"),o=(n("je2q"),n("X+mI")),s=n("/MKj"),r=n("rCxd"),l=n("IjVs"),c=(n("f3/d"),n("Vkfw"));n("MV0r");var p=function(e){var t,n;function i(t){return e.call(this,t)||this}n=e,(t=i).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,i.mapDispatchToProps=function(e){return{dispatchFunction:e}};var o=i.prototype;return o.resetSettings=function(e){e.stopPropagation(),this.props.dispatchFunction&&this.props.dispatchFunction({type:c.a.upsert,values:[new r.d("")],names:[r.d.name]})},o.render=function(){return a.createElement("button",{className:"btn btn-dark reset-button-wrapper",onClick:this.resetSettings.bind(this)},"Reset")},i}(a.PureComponent),u=Object(s.connect)(null,p.mapDispatchToProps)(p);function d(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var m=function(e){function t(){return e.apply(this,arguments)||this}return d(t,e),t.mapStateToProps=function(e){return t.saveElement.stateChanged(e),{}},t.prototype.render=function(){return null},t}(a.PureComponent);m.saveElement=new o.a;var h=Object(s.connect)(m.mapStateToProps)(m),E=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={sideMenuExpanded:!1},n}d(t,e),t.mapStateToProps=function(e){return{settings:e.settings||new r.d("")}};var n=t.prototype;return n.setSideMenuExpanded=function(e){this.setState({sideMenuExpanded:e})},n.changeSideMenuState=function(e,t){this.blockEventPropagation(t),this.setState({sideMenuExpanded:e})},n.blockEventPropagation=function(e){e.stopPropagation()},n.render=function(){return this.props.settings&&this.props.settings.columnView===r.a.true?this.renderColumn():this.renderNormal()},n.renderColumn=function(){return a.createElement(l.a,null)},n.renderNormal=function(){var e=this.props.iconName?a.createElement("i",{className:"material-icons"},this.props.iconName):null,t=this.props.settings?{fontFamily:this.props.settings.fontFamily+", -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",backgroundColor:""+this.props.settings.backgroundColour,color:""+this.props.settings.textColour}:void 0,n=this.props.settings.expandableSideMenu===r.a.true?"layout-side-nav-expandable":"",o=this.state.sideMenuExpanded?"layout-side-nav-expanded":"layout-side-nav-collapsed",s=this.props.settings.expandableSideMenu===r.a.true?a.createElement("i",{className:"material-icons colour-red",onClick:this.changeSideMenuState.bind(this,!0)},"menu"):null,l=this.props.settings.expandableSideMenu===r.a.true?a.createElement("div",{className:"layout-side-nav-backing "+o,onClick:this.changeSideMenuState.bind(this,!1)}):null;return a.createElement("div",{className:"layout-wrapper",style:t,onClick:this.setSideMenuExpanded.bind(this,!1)},a.createElement(h,null),l,a.createElement("div",{className:"layout-side-nav "+n+" "+o,onClick:this.blockEventPropagation.bind(this)},a.createElement("div",{className:"layout-side-nav-inner-wrapper"},a.createElement("div",{className:"layout-top-block"},a.createElement("div",{className:"layout-nav-title"},e)),a.createElement("div",{className:"layout-link-list"},a.createElement(i.a,{to:"/",onClick:this.setSideMenuExpanded.bind(this,!1)},a.createElement("i",{className:"material-icons layout-link-icon"},"menu"),"Main Page"),a.createElement(i.a,{to:"/animals/",onClick:this.setSideMenuExpanded.bind(this,!1)},a.createElement("i",{className:"material-icons layout-link-icon"},"pets"),"Animals"),a.createElement(i.a,{to:"/exhibits/",onClick:this.setSideMenuExpanded.bind(this,!1)},a.createElement("i",{className:"material-icons layout-link-icon"},"house_siding"),"Exhibits"),a.createElement(i.a,{to:"/staff/",onClick:this.setSideMenuExpanded.bind(this,!1)},a.createElement("i",{className:"material-icons layout-link-icon"},"person"),"Staff"),a.createElement(i.a,{to:"/options/",onClick:this.setSideMenuExpanded.bind(this,!1)},a.createElement("i",{className:"material-icons layout-link-icon"},"edit"),"Options")))),a.createElement("div",{className:"layout-right-block"},a.createElement("div",{className:"layout-top-block"},a.createElement("div",{className:"layout-top-block-title"},a.createElement("div",{className:"layout-title"},a.createElement("div",{className:"layout-side-menu-button-wrapper"},s),a.createElement("h1",{className:"display-5"},this.props.title)),a.createElement(u,null))),a.createElement("div",{className:"layout-main-content "+(this.props.applyDefaultColourToMainContent?"default-colours":"")},a.createElement("div",{className:"layout-main-content-padding"},this.props.children))))},t}(a.Component),y=Object(s.connect)(E.mapStateToProps)(E)},MV0r:function(e,t,n){},je2q:function(e,t,n){}}]);
//# sourceMappingURL=component---src-pages-animals-tsx-7cc1e652164d33298eef.js.map