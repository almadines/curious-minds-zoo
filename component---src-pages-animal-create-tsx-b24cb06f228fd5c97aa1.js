(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{XHPI:function(t,e,a){"use strict";a.r(e);var n=a("q1tI"),r=a("B7F5"),i=a("uP/u"),o=a("5bZA");var s=function(t){var e,a;function s(){return t.apply(this,arguments)||this}return a=t,(e=s).prototype=Object.create(a.prototype),e.prototype.constructor=e,e.__proto__=a,s.prototype.render=function(){return n.createElement(r.a,{title:"Create Animal",iconName:"pets"},n.createElement(i.a,{editorTemplate:o.a.getNewEditorTemplate(),editMode:!0}))},s}(n.PureComponent);e.default=s},"uP/u":function(t,e,a){"use strict";a("dRSK"),a("91GP");var n=a("Y+p1"),r=a.n(n),i=a("q1tI"),o=a("/MKj"),s=a("Vkfw"),c=(a("ugz2"),a("8sGc"));var p=function(t){var e,a;function n(e){var a,n=(a=t.call(this,e)||this).props.editorTemplate.convertDataToObject(a.getInitialState(e)),r=n instanceof c.a?[]:n;return a.state={currentData:a.getInitialState(e),errors:r},a}a=t,(e=n).prototype=Object.create(a.prototype),e.prototype.constructor=e,e.__proto__=a;var o=n.prototype;return o.getInitialState=function(t){var e={};return t.editorTemplate.getEditorElements().forEach((function(t){t.initialValue&&(e[t.identifier]=t.initialValue)})),e},o.onInputChange=function(t,e){var a=Object.assign({},this.state.currentData);if(a[e]=t,!r()(a,this.state.currentData)){var n=this.props.editorTemplate.convertDataToObject(a),i=n instanceof c.a?[]:n;this.setState({currentData:a,errors:i})}},o.createObject=function(t){t.stopPropagation();var e=this.props.editorTemplate.convertDataToObject(this.state.currentData);e instanceof c.a?e&&this.props.dispatchFunction?(this.props.editorTemplate.reset(),this.props.dispatchFunction({type:s.a.add,values:[e],names:[this.props.editorTemplate.dataTypeName]}),this.setState({currentData:this.getInitialState(this.props)}),this.props.onSuccessCallback&&this.props.onSuccessCallback()):console.warn("Unable to create object!, Invalid  or incomplete data!"):this.setState({errors:e})},o.cancel=function(t){t.stopPropagation(),this.props.editorTemplate.reset(),this.setState({currentData:this.getInitialState(this.props)}),this.props.onCancelCallback&&this.props.onCancelCallback()},n.mapStateToProps=function(t){return{}},n.mapDispatchToProps=function(t){return{dispatchFunction:t}},o.render=function(){var t=this,e=this.props.editMode?i.createElement("button",{className:"btn btn-success edit-page-button",onClick:this.createObject.bind(this)},i.createElement("i",{className:"material-icons layout-link-icon"},"add"),"Submit"):null,a=this.props.editMode?i.createElement("button",{className:"btn btn-danger edit-page-button",onClick:this.cancel.bind(this)},i.createElement("i",{className:"material-icons layout-link-icon"},"close"),"Cancel"):null,n=this.props.title?i.createElement("h3",{className:"display-8"},this.props.title):null;return i.createElement("div",{className:"edit-wrapper"},n,i.createElement("div",{className:"edit-page-contents"},this.props.editorTemplate.getEditorElements().map((function(e){var a=t.state.errors.find((function(t){return t.inputIdentifier===e.identifier}));return e.render(t.props.editMode,t.onInputChange.bind(t),a)}))),i.createElement("div",{className:"edit-page-buttons-wrapper"},a,e))},n}(i.PureComponent),l=Object(o.connect)(p.mapStateToProps,p.mapDispatchToProps)(p);e.a=l}}]);
//# sourceMappingURL=component---src-pages-animal-create-tsx-b24cb06f228fd5c97aa1.js.map