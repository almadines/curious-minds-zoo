(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"6v+W":function(t,e,r){"use strict";r.r(e);var n=r("q1tI"),a=r("B7F5"),i=(r("a1Th"),r("rE2o"),r("ioFf"),r("f3/d"),r("Vd3H"),r("9AAn"),r("rGqo"),r("yt8O"),r("Btvt"),r("XfO3"),r("HEwt"),r("Y+p1")),o=r.n(i),s=r("/MKj"),c=r("Wwog"),l=r("5bZA"),p=r("cx71"),u=r("P9dI"),m=r("YwZP"),f=r("uP/u");r("4Jxr");function d(t){return function(t){if(Array.isArray(t))return b(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return b(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return b(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var h=function(t){var e,r;function a(e){var r;return(r=t.call(this,e)||this).getListElementWrapper=Object(c.a)((function(t,e){var r=Array.from(t.values()).map((function(t){return new p.a(t,e?(r=t.id,function(){Object(m.navigate)("/animal-details?id="+r)}):void 0);var r}));return new p.b(r)}),o.a),r.state={createFormOpen:!1},r}r=t,(e=a).prototype=Object.create(r.prototype),e.prototype.constructor=e,e.__proto__=r,a.mapStateToProps=function(t,e){var r,n=Array.from(t.animals.keys()),a=function(t,e,r){void 0===r&&(r=!1);var n=new Map;return e.forEach((function(t){n.set(t,null)})),r?t.filter((function(t){return n.has(t)})):t.filter((function(t){return!n.has(t)}))};e.notAssignedToExhibit&&(n=a(n,(r=[]).concat.apply(r,d(Array.from(t.exhibits.values()).map((function(t){return t.animalIds})))),!1));if(e.staffId){var i=t.staff.get(e.staffId);i?n=a(n,i.animalIds,!0):console.warn("Staff Id provided to AnimalsList does not exist, ignoring filter!")}if(e.exhibitId){var o=t.exhibits.get(e.exhibitId);o?n=a(n,o.animalIds,!0):console.warn("Exhibit Id provided to AnimalsList does not exist, ignoring filter!")}var s=n.map((function(e){return t.animals.get(e)})).filter((function(t){return!!t})).sort((function(t,e){return t.name>e.name?1:-1}));return s.length!==n.length&&console.warn("could not find all animal Ids, there may be some entries missing!"),{animals:s}};var i=a.prototype;return i.setCreateFormOpenState=function(t){this.setState({createFormOpen:t})},i.render=function(){var t=this.getListElementWrapper(this.props.animals,this.props.linkDetailPages),e=this.state.createFormOpen?n.createElement("div",{className:"instance-list-create-form-container"},n.createElement(f.a,{editorTemplate:l.a.getNewEditorTemplate(),editMode:!0,onCancelCallback:this.setCreateFormOpenState.bind(this,!1),onSuccessCallback:this.setCreateFormOpenState.bind(this,!1),title:"Create Animal"})):n.createElement("button",{className:"btn btn-success instance-list-create-button",onClick:this.setCreateFormOpenState.bind(this,!0)},"Create Animal");return n.createElement("div",{className:"instance-list-wrapper"},n.createElement("div",{className:"instance-list-create-form-wrapper "+(this.state.createFormOpen?"create-form-open":"create-form-closed")},e),n.createElement("div",{className:"instance-list-content-wrapper"},n.createElement(u.a,{listElementWrapper:t,includeSearchFilter:!0,tableMode:!0})))},a}(n.PureComponent),v=Object(s.connect)(h.mapStateToProps)(h);var y=function(t){var e,r;function i(){return t.apply(this,arguments)||this}return r=t,(e=i).prototype=Object.create(r.prototype),e.prototype.constructor=e,e.__proto__=r,i.prototype.render=function(){return n.createElement(a.a,{title:"Animals:"},n.createElement(v,{linkDetailPages:!0}))},i}(n.PureComponent);e.default=y}}]);
//# sourceMappingURL=component---src-pages-animals-tsx-4d7c5f105e92c92c0760.js.map