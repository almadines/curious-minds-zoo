(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{tcf2:function(t,e,r){"use strict";r.r(e);var n=r("q1tI"),a=r("B7F5"),i=(r("f3/d"),r("Vd3H"),r("Z2Ku"),r("L9s1"),r("rGqo"),r("yt8O"),r("Btvt"),r("XfO3"),r("HEwt"),r("Y+p1")),o=r.n(i),s=r("/MKj"),c=r("Wwog"),p=r("P9dI"),l=r("cx71"),u=r("wmhn"),m=r("YwZP"),f=r("uP/u"),d=(r("4Jxr"),r("Wbzz"));var b=function(t){var e,r;function a(e){var r;return(r=t.call(this,e)||this).getListElementWrapper=Object(c.a)((function(t,e){var r=Array.from(t.values()).map((function(t){return new l.c(t,e?(r=t.id,function(){Object(m.navigate)(Object(d.b)("/exhibit-details?id="+r))}):void 0);var r}));return new l.d(r)}),o.a),r.state={createFormOpen:!1},r}r=t,(e=a).prototype=Object.create(r.prototype),e.prototype.constructor=e,e.__proto__=r,a.mapStateToProps=function(t,e){var r=Array.from(t.exhibits.values());return e.filterByStaffId&&(r=r.filter((function(t){return t.staffIds.includes(e.filterByStaffId)}))),{exhibits:r=r.sort((function(t,e){return t.name>e.name?1:-1}))}};var i=a.prototype;return i.setCreateFormOpenState=function(t){this.setState({createFormOpen:t})},i.render=function(){var t=this.getListElementWrapper(this.props.exhibits,this.props.linkDetailPages),e=this.state.createFormOpen?n.createElement("div",{className:"instance-list-create-form-container"},n.createElement(f.a,{editorTemplate:u.a.getNewEditorTemplate(),editMode:!0,onCancelCallback:this.setCreateFormOpenState.bind(this,!1),onSuccessCallback:this.setCreateFormOpenState.bind(this,!1),title:"Create Exhibit"})):n.createElement("button",{className:"btn btn-success instance-list-create-button",onClick:this.setCreateFormOpenState.bind(this,!0)},"Create Exhibit");return n.createElement("div",{className:"instance-list-wrapper"},n.createElement("div",{className:"instance-list-create-form-wrapper "+(this.state.createFormOpen?"create-form-open":"create-form-closed")},e),n.createElement("div",{className:"instance-list-content-wrapper"},n.createElement(p.a,{listElementWrapper:t,includeSearchFilter:!0,tableMode:!0})))},a}(n.PureComponent),h=Object(s.connect)(b.mapStateToProps)(b);var v=function(t){var e,r;function i(){return t.apply(this,arguments)||this}return r=t,(e=i).prototype=Object.create(r.prototype),e.prototype.constructor=e,e.__proto__=r,i.prototype.render=function(){return n.createElement(a.a,{title:"Exhibits:"},n.createElement(h,{linkDetailPages:!0}))},i}(n.Component);e.default=v}}]);
//# sourceMappingURL=component---src-pages-exhibits-tsx-d3a24a7af1fbe5e163ae.js.map