!function(t,e){t.getElementById("livereloadscript")||((e=t.createElement("script")).async=1,e.src="//"+(window.location.host||"localhost").split(":")[0]+":35729/livereload.js?snipver=1",e.id="livereloadscript",t.head.appendChild(e))}(window.document);var nftcard=function(t){"use strict";function e(t){return(e=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function i(t,r,s){return(i="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,i,r){var s=function(t,i){for(;!Object.prototype.hasOwnProperty.call(t,i)&&null!==(t=e(t)););return t}(t,i);if(s){var n=Object.getOwnPropertyDescriptor(s,i);return n.get?n.get.call(r):n.value}})(t,r,s||t)}function r(t){return function(t){if(Array.isArray(t))return t}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var r=i.call(t,e||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:String(e)}function n(t,e,i,n){var p=function(){(function(){return t});var t={elementsDefinitionOrder:[["method"],["field"]],initializeInstanceElements:function(t,e){["method","field"].forEach((function(i){e.forEach((function(e){e.kind===i&&"own"===e.placement&&this.defineClassElement(t,e)}),this)}),this)},initializeClassElements:function(t,e){var i=t.prototype;["method","field"].forEach((function(r){e.forEach((function(e){var s=e.placement;if(e.kind===r&&("static"===s||"prototype"===s)){var n="static"===s?t:i;this.defineClassElement(n,e)}}),this)}),this)},defineClassElement:function(t,e){var i=e.descriptor;if("field"===e.kind){var r=e.initializer;i={enumerable:i.enumerable,writable:i.writable,configurable:i.configurable,value:void 0===r?void 0:r.call(t)}}Object.defineProperty(t,e.key,i)},decorateClass:function(t,e){var i=[],r=[],s={static:[],prototype:[],own:[]};if(t.forEach((function(t){this.addElementPlacement(t,s)}),this),t.forEach((function(t){if(!l(t))return i.push(t);var e=this.decorateElement(t,s);i.push(e.element),i.push.apply(i,e.extras),r.push.apply(r,e.finishers)}),this),!e)return{elements:i,finishers:r};var n=this.decorateConstructor(i,e);return r.push.apply(r,n.finishers),n.finishers=r,n},addElementPlacement:function(t,e,i){var r=e[t.placement];if(!i&&-1!==r.indexOf(t.key))throw new TypeError("Duplicated element ("+t.key+")");r.push(t.key)},decorateElement:function(t,e){for(var i=[],r=[],s=t.decorators,n=s.length-1;n>=0;n--){var o=e[t.placement];o.splice(o.indexOf(t.key),1);var a=this.fromElementDescriptor(t),l=this.toElementFinisherExtras((0,s[n])(a)||a);t=l.element,this.addElementPlacement(t,e),l.finisher&&r.push(l.finisher);var d=l.extras;if(d){for(var c=0;c<d.length;c++)this.addElementPlacement(d[c],e);i.push.apply(i,d)}}return{element:t,finishers:r,extras:i}},decorateConstructor:function(t,e){for(var i=[],r=e.length-1;r>=0;r--){var s=this.fromClassDescriptor(t),n=this.toClassDescriptor((0,e[r])(s)||s);if(void 0!==n.finisher&&i.push(n.finisher),void 0!==n.elements){t=n.elements;for(var o=0;o<t.length-1;o++)for(var a=o+1;a<t.length;a++)if(t[o].key===t[a].key&&t[o].placement===t[a].placement)throw new TypeError("Duplicated element ("+t[o].key+")")}}return{elements:t,finishers:i}},fromElementDescriptor:function(t){var e={kind:t.kind,key:t.key,placement:t.placement,descriptor:t.descriptor};return Object.defineProperty(e,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),"field"===t.kind&&(e.initializer=t.initializer),e},toElementDescriptors:function(t){if(void 0!==t)return r(t).map((function(t){var e=this.toElementDescriptor(t);return this.disallowProperty(t,"finisher","An element descriptor"),this.disallowProperty(t,"extras","An element descriptor"),e}),this)},toElementDescriptor:function(t){var e=String(t.kind);if("method"!==e&&"field"!==e)throw new TypeError('An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "'+e+'"');var i=s(t.key),r=String(t.placement);if("static"!==r&&"prototype"!==r&&"own"!==r)throw new TypeError('An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "'+r+'"');var n=t.descriptor;this.disallowProperty(t,"elements","An element descriptor");var o={kind:e,key:i,placement:r,descriptor:Object.assign({},n)};return"field"!==e?this.disallowProperty(t,"initializer","A method descriptor"):(this.disallowProperty(n,"get","The property descriptor of a field descriptor"),this.disallowProperty(n,"set","The property descriptor of a field descriptor"),this.disallowProperty(n,"value","The property descriptor of a field descriptor"),o.initializer=t.initializer),o},toElementFinisherExtras:function(t){return{element:this.toElementDescriptor(t),finisher:c(t,"finisher"),extras:this.toElementDescriptors(t.extras)}},fromClassDescriptor:function(t){var e={kind:"class",elements:t.map(this.fromElementDescriptor,this)};return Object.defineProperty(e,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),e},toClassDescriptor:function(t){var e=String(t.kind);if("class"!==e)throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "'+e+'"');this.disallowProperty(t,"key","A class descriptor"),this.disallowProperty(t,"placement","A class descriptor"),this.disallowProperty(t,"descriptor","A class descriptor"),this.disallowProperty(t,"initializer","A class descriptor"),this.disallowProperty(t,"extras","A class descriptor");var i=c(t,"finisher");return{elements:this.toElementDescriptors(t.elements),finisher:i}},runClassFinishers:function(t,e){for(var i=0;i<e.length;i++){var r=(0,e[i])(t);if(void 0!==r){if("function"!=typeof r)throw new TypeError("Finishers must return a constructor.");t=r}}return t},disallowProperty:function(t,e,i){if(void 0!==t[e])throw new TypeError(i+" can't have a ."+e+" property.")}};return t}();if(n)for(var h=0;h<n.length;h++)p=n[h](p);var u=e((function(t){p.initializeInstanceElements(t,f.elements)}),i),f=p.decorateClass(function(t){for(var e=[],i=function(t){return"method"===t.kind&&t.key===n.key&&t.placement===n.placement},r=0;r<t.length;r++){var s,n=t[r];if("method"===n.kind&&(s=e.find(i)))if(d(n.descriptor)||d(s.descriptor)){if(l(n)||l(s))throw new ReferenceError("Duplicated methods ("+n.key+") can't be decorated.");s.descriptor=n.descriptor}else{if(l(n)){if(l(s))throw new ReferenceError("Decorators can't be placed on different accessors with for the same property ("+n.key+").");s.decorators=n.decorators}a(n,s)}else e.push(n)}return e}(u.d.map(o)),t);return p.initializeClassElements(u.F,f.elements),p.runClassFinishers(u.F,f.finishers)}function o(t){var e,i=s(t.key);"method"===t.kind?e={value:t.value,writable:!0,configurable:!0,enumerable:!1}:"get"===t.kind?e={get:t.value,configurable:!0,enumerable:!1}:"set"===t.kind?e={set:t.value,configurable:!0,enumerable:!1}:"field"===t.kind&&(e={configurable:!0,writable:!0,enumerable:!0});var r={kind:"field"===t.kind?"field":"method",key:i,placement:t.static?"static":"field"===t.kind?"own":"prototype",descriptor:e};return t.decorators&&(r.decorators=t.decorators),"field"===t.kind&&(r.initializer=t.value),r}function a(t,e){void 0!==t.descriptor.get?e.descriptor.get=t.descriptor.get:e.descriptor.set=t.descriptor.set}function l(t){return t.decorators&&t.decorators.length}function d(t){return void 0!==t&&!(void 0===t.value&&void 0===t.writable)}function c(t,e){var i=t[e];if(void 0!==i&&"function"!=typeof i)throw new TypeError("Expected '"+e+"' to be a function");return i}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const p=new WeakMap,h=t=>"function"==typeof t&&p.has(t),u=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,f=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},m={},y={},g=`{{lit-${String(Math.random()).slice(2)}}}`,v=`\x3c!--${g}--\x3e`,b=new RegExp(`${g}|${v}`);class _{constructor(t,e){this.parts=[],this.element=e;const i=[],r=[],s=document.createTreeWalker(e.content,133,null,!1);let n=0,o=-1,a=0;const{strings:l,values:{length:d}}=t;for(;a<d;){const t=s.nextNode();if(null!==t){if(o++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let r=0;for(let t=0;t<i;t++)w(e[t].name,"$lit$")&&r++;for(;r-- >0;){const e=l[a],i=S.exec(e)[2],r=i.toLowerCase()+"$lit$",s=t.getAttribute(r);t.removeAttribute(r);const n=s.split(b);this.parts.push({type:"attribute",index:o,name:i,strings:n}),a+=n.length-1}}"TEMPLATE"===t.tagName&&(r.push(t),s.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(g)>=0){const r=t.parentNode,s=e.split(b),n=s.length-1;for(let e=0;e<n;e++){let i,n=s[e];if(""===n)i=x();else{const t=S.exec(n);null!==t&&w(t[2],"$lit$")&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(n)}r.insertBefore(i,t),this.parts.push({type:"node",index:++o})}""===s[n]?(r.insertBefore(x(),t),i.push(t)):t.data=s[n],a+=n}}else if(8===t.nodeType)if(t.data===g){const e=t.parentNode;null!==t.previousSibling&&o!==n||(o++,e.insertBefore(x(),t)),n=o,this.parts.push({type:"node",index:o}),null===t.nextSibling?t.data="":(i.push(t),o--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(g,e+1));)this.parts.push({type:"node",index:-1}),a++}}else s.currentNode=r.pop()}for(const t of i)t.parentNode.removeChild(t)}}const w=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},k=t=>-1!==t.index,x=()=>document.createComment(""),S=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class C{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=u?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,r=document.createTreeWalker(t,133,null,!1);let s,n=0,o=0,a=r.nextNode();for(;n<i.length;)if(s=i[n],k(s)){for(;o<s.index;)o++,"TEMPLATE"===a.nodeName&&(e.push(a),r.currentNode=a.content),null===(a=r.nextNode())&&(r.currentNode=e.pop(),a=r.nextNode());if("node"===s.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(a.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,s.name,s.strings,this.options));n++}else this.__parts.push(void 0),n++;return u&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const E=` ${g} `;class P{constructor(t,e,i,r){this.strings=t,this.values=e,this.type=i,this.processor=r}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let r=0;r<t;r++){const t=this.strings[r],s=t.lastIndexOf("\x3c!--");i=(s>-1||i)&&-1===t.indexOf("--\x3e",s+1);const n=S.exec(t);e+=null===n?t+(i?E:v):t.substr(0,n.index)+n[1]+n[2]+"$lit$"+n[3]+g}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const T=t=>null===t||!("object"==typeof t||"function"==typeof t),A=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class N{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new R(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let r=0;r<e;r++){i+=t[r];const e=this.parts[r];if(void 0!==e){const t=e.value;if(T(t)||!A(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class R{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===m||T(t)&&t===this.value||(this.value=t,h(t)||(this.committer.dirty=!0))}commit(){for(;h(this.value);){const t=this.value;this.value=m,t(this)}this.value!==m&&this.committer.commit()}}class V{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(x()),this.endNode=t.appendChild(x())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=x()),t.__insert(this.endNode=x())}insertAfterPart(t){t.__insert(this.startNode=x()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;h(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}const t=this.__pendingValue;t!==m&&(T(t)?t!==this.value&&this.__commitText(t):t instanceof P?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):A(t)?this.__commitIterable(t):t===y?(this.value=y,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof C&&this.value.template===e)this.value.update(t.values);else{const i=new C(e,t.processor,this.options),r=i._clone();i.update(t.values),this.__commitNode(r),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,r=0;for(const s of t)i=e[r],void 0===i&&(i=new V(this.options),e.push(i),0===r?i.appendIntoPart(this):i.insertAfterPart(e[r-1])),i.setValue(s),i.commit(),r++;r<e.length&&(e.length=r,this.clear(i&&i.endNode))}clear(t=this.startNode){f(this.startNode.parentNode,t.nextSibling,this.endNode)}}class O{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;h(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=m}}class $ extends N{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new j(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class j extends R{}let D=!1;try{const t={get capture(){return D=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class z{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;h(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),r=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=U(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=m}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const U=t=>t&&(D?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;const q=new class{handleAttributeExpressions(t,e,i,r){const s=e[0];if("."===s){return new $(t,e.slice(1),i).parts}return"@"===s?[new z(t,e.slice(1),r.eventContext)]:"?"===s?[new O(t,e.slice(1),i)]:new N(t,e,i).parts}handleTextExpression(t){return new V(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function H(t){let e=F.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},F.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const r=t.strings.join(g);return i=e.keyString.get(r),void 0===i&&(i=new _(t,t.getTemplateElement()),e.keyString.set(r,i)),e.stringsArray.set(t.strings,i),i}const F=new Map,M=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const B=(t,...e)=>new P(t,e,"html",q)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function L(t,e){const{element:{content:i},parts:r}=t,s=document.createTreeWalker(i,133,null,!1);let n=W(r),o=r[n],a=-1,l=0;const d=[];let c=null;for(;s.nextNode();){a++;const t=s.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(d.push(t),null===c&&(c=t)),null!==c&&l++;void 0!==o&&o.index===a;)o.index=null!==c?-1:o.index-l,n=W(r,n),o=r[n]}d.forEach(t=>t.parentNode.removeChild(t))}const I=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},W=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(k(e))return i}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const Z=(t,e)=>`${t}--${e}`;let J=!0;void 0===window.ShadyCSS?J=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),J=!1);const Y=t=>e=>{const i=Z(e.type,t);let r=F.get(i);void 0===r&&(r={stringsArray:new WeakMap,keyString:new Map},F.set(i,r));let s=r.stringsArray.get(e.strings);if(void 0!==s)return s;const n=e.strings.join(g);if(s=r.keyString.get(n),void 0===s){const i=e.getTemplateElement();J&&window.ShadyCSS.prepareTemplateDom(i,t),s=new _(e,i),r.keyString.set(n,s)}return r.stringsArray.set(e.strings,s),s},X=["html","svg"],G=new Set,K=(t,e,i)=>{G.add(t);const r=i?i.element:document.createElement("template"),s=e.querySelectorAll("style"),{length:n}=s;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(r,t);const o=document.createElement("style");for(let t=0;t<n;t++){const e=s[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{X.forEach(e=>{const i=F.get(Z(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),L(t,i)})})})(t);const a=r.content;i?function(t,e,i=null){const{element:{content:r},parts:s}=t;if(null==i)return void r.appendChild(e);const n=document.createTreeWalker(r,133,null,!1);let o=W(s),a=0,l=-1;for(;n.nextNode();){for(l++,n.currentNode===i&&(a=I(e),i.parentNode.insertBefore(e,i));-1!==o&&s[o].index===l;){if(a>0){for(;-1!==o;)s[o].index+=a,o=W(s,o);return}o=W(s,o)}}}(i,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(r,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),L(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const Q={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},tt=(t,e)=>e!==t&&(e==e||t==t),et={attribute:!0,type:String,converter:Q,reflect:!1,hasChanged:tt},it=Promise.resolve(!0);class rt extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=it,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const r=this._attributeNameForProperty(i,e);void 0!==r&&(this._attributeToPropertyMap.set(r,i),t.push(r))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=et){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[i]},set(e){const r=this[t];this[i]=e,this._requestUpdate(t,r)},configurable:!0,enumerable:!0})}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=tt){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,r=e.converter||Q,s="function"==typeof r?r:r.fromAttribute;return s?s(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,r=e.converter;return(r&&r.toAttribute||Q.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=32|this._updateState,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=et){const r=this.constructor,s=r._attributeNameForProperty(t,i);if(void 0!==s){const t=r._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(s):this.setAttribute(s,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,r=i._attributeToPropertyMap.get(t);if(void 0!==r){const t=i._classProperties.get(r)||et;this._updateState=16|this._updateState,this[r]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const r=this.constructor,s=r._classProperties.get(t)||et;r._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=4|this._updateState;const i=this._updatePromise;this._updatePromise=new Promise((i,r)=>{t=i,e=r});try{await i}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return 32&this._updateState}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}rt.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const st=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:r}=e;return{kind:i,elements:r,finisher(e){window.customElements.define(t,e)}}})(t,e),nt=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}}:Object.assign({},e,{finisher(i){i.createProperty(e.key,t)}});function ot(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):nt(t,e)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const at="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,lt=Symbol();class dt{constructor(t,e){if(e!==lt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(at?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ct=(t,...e)=>{const i=e.reduce((e,i,r)=>e+(t=>{if(t instanceof dt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[r+1],t[0]);return new dt(i,lt)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const pt=t=>t.flat?t.flat(1/0):function t(e,i=[]){for(let r=0,s=e.length;r<s;r++){const s=e[r];Array.isArray(s)?t(s,i):i.push(s)}return i}(t);class ht extends rt{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){pt(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?at?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof P&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}ht.finalized=!0,ht.render=(t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const r=i.scopeName,s=M.has(e),n=J&&11===e.nodeType&&!!e.host,o=n&&!G.has(r),a=o?document.createDocumentFragment():e;if(((t,e,i)=>{let r=M.get(e);void 0===r&&(f(e,e.firstChild),M.set(e,r=new V(Object.assign({templateFactory:H},i))),r.appendInto(e)),r.setValue(t),r.commit()})(t,a,Object.assign({templateFactory:Y(r)},i)),o){const t=M.get(a);M.delete(a);const i=t.value instanceof C?t.value.template:void 0;K(r,a,i),f(e,e.firstChild),e.appendChild(a),M.set(e,t)}!s&&n&&window.ShadyCSS.styleElement(e.host)};var ut="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{};/*! MIT License © Sindre Sorhus */const ft={},mt=t=>"undefined"!=typeof self&&self&&t in self?self:"undefined"!=typeof window&&window&&t in window?window:void 0!==ut&&ut&&t in ut?ut:"undefined"!=typeof globalThis&&globalThis?globalThis:void 0,yt=["Headers","Request","Response","ReadableStream","fetch","AbortController","FormData"];for(const t of yt)Object.defineProperty(ft,t,{get(){const e=mt(t),i=e&&e[t];return"function"==typeof i?i.bind(e):i}});const gt=t=>null!==t&&"object"==typeof t,vt="function"==typeof ft.AbortController,bt="function"==typeof ft.ReadableStream,_t=(...t)=>{let e={};for(const i of t)if(Array.isArray(i))Array.isArray(e)||(e=[]),e=[...e,...i];else if(gt(i))for(let[t,r]of Object.entries(i))gt(r)&&Reflect.has(e,t)&&(r=_t(e[t],r)),e={...e,[t]:r};return e},wt=["get","post","put","patch","head","delete"],kt={json:"application/json",text:"text/*",formData:"multipart/form-data",arrayBuffer:"*/*",blob:"*/*"},xt=[413,429,503],St=Symbol("stop");class Ct extends Error{constructor(t){super(t.statusText),this.name="HTTPError",this.response=t}}class Et extends Error{constructor(){super("Request timed out"),this.name="TimeoutError"}}const Pt=t=>new Promise(e=>setTimeout(e,t)),Tt=t=>wt.includes(t)?t.toUpperCase():t,At={limit:2,methods:["get","put","head","delete","options","trace"],statusCodes:[408,413,429,500,502,503,504],afterStatusCodes:xt},Nt=(t={})=>{if("number"==typeof t)return{...At,limit:t};if(t.methods&&!Array.isArray(t.methods))throw new Error("retry.methods must be an array");if(t.statusCodes&&!Array.isArray(t.statusCodes))throw new Error("retry.statusCodes must be an array");return{...At,...t,afterStatusCodes:xt}};class Rt{constructor(t,e={}){if(this._retryCount=0,this._input=t,this._options={credentials:this._input.credentials||"same-origin",...e,hooks:_t({beforeRequest:[],beforeRetry:[],afterResponse:[]},e.hooks),method:Tt(e.method||this._input.method),prefixUrl:String(e.prefixUrl||""),retry:Nt(e.retry),throwHttpErrors:!1!==e.throwHttpErrors,timeout:void 0===e.timeout?1e4:e.timeout},"string"!=typeof this._input&&!(this._input instanceof URL||this._input instanceof ft.Request))throw new TypeError("`input` must be a string, URL, or Request");if(this._options.prefixUrl&&"string"==typeof this._input){if(this._input.startsWith("/"))throw new Error("`input` must not begin with a slash when using `prefixUrl`");this._options.prefixUrl.endsWith("/")||(this._options.prefixUrl+="/"),this._input=this._options.prefixUrl+this._input}if(vt&&(this.abortController=new ft.AbortController,this._options.signal&&(this._options.signal.addEventListener("abort",()=>{this.abortController.abort()}),this._options.signal=this.abortController.signal)),this.request=new ft.Request(this._input,this._options),this._options.searchParams){const t=new URL(this.request.url);t.search=new URLSearchParams(this._options.searchParams),this.request=new ft.Request(new ft.Request(t,this.request),this._options)}this._options.json&&(this._options.body=JSON.stringify(this._options.json),this.request.headers.set("content-type","application/json"),this.request=new ft.Request(this.request,{body:this._options.body}));const i=async()=>{if(this._options.timeout>2147483647)throw new RangeError("The `timeout` option cannot be greater than 2147483647");await Pt(1);let t=await this._fetch();for(const e of this._options.hooks.afterResponse){const i=await e(this.request,this._options,t.clone());i instanceof ft.Response&&(t=i)}if(!t.ok&&this._options.throwHttpErrors)throw new Ct(t);if(this._options.onDownloadProgress){if("function"!=typeof this._options.onDownloadProgress)throw new TypeError("The `onDownloadProgress` option must be a function");if(!bt)throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");return this._stream(t.clone(),this._options.onDownloadProgress)}return t},r=this._options.retry.methods.includes(this.request.method.toLowerCase())?this._retry(i):i();for(const[t,e]of Object.entries(kt))r[t]=async()=>{this.request.headers.set("accept",this.request.headers.get("accept")||e);const i=(await r).clone();return"json"===t&&204===i.status?"":i[t]()};return r}_calculateRetryDelay(t){if(this._retryCount++,this._retryCount<this._options.retry.limit&&!(t instanceof Et)){if(t instanceof Ct){if(!this._options.retry.statusCodes.includes(t.response.status))return 0;const e=t.response.headers.get("Retry-After");if(e&&this._options.retry.afterStatusCodes.includes(t.response.status)){let t=Number(e);return Number.isNaN(t)?t=Date.parse(e)-Date.now():t*=1e3,void 0!==this._options.retry.maxRetryAfter&&t>this._options.retry.maxRetryAfter?0:t}if(413===t.response.status)return 0}return.3*2**(this._retryCount-1)*1e3}return 0}async _retry(t){try{return await t()}catch(e){const i=Math.min(this._calculateRetryDelay(e),2147483647);if(0!==i&&this._retryCount>0){await Pt(i);for(const t of this._options.hooks.beforeRetry){if(await t(this.request,this._options,e,this._retryCount)===St)return}return this._retry(t)}if(this._options.throwHttpErrors)throw e}}async _fetch(){for(const t of this._options.hooks.beforeRequest){const e=await t(this.request,this._options);if(e instanceof Request){this.request=e;break}if(e instanceof Response)return e}return!1===this._options.timeout?ft.fetch(this.request):(t=ft.fetch(this.request),e=this._options.timeout,i=this.abortController,new Promise((r,s)=>{const n=setTimeout(()=>{i&&i.abort(),s(new Et)},e);t.then(r).catch(s).then(()=>{clearTimeout(n)})}));var t,e,i}_stream(t,e){const i=Number(t.headers.get("content-length"))||0;let r=0;return new ft.Response(new ft.ReadableStream({start(s){const n=t.body.getReader();e&&e({percent:0,transferredBytes:0,totalBytes:i},new Uint8Array),async function t(){const{done:o,value:a}=await n.read();if(o)s.close();else{if(e){r+=a.byteLength,e({percent:0===i?0:r/i,transferredBytes:r,totalBytes:i},a)}s.enqueue(a),t()}}()}}))}}const Vt=(...t)=>{for(const e of t)if((!gt(e)||Array.isArray(e))&&void 0!==e)throw new TypeError("The `options` argument must be an object");return _t({},...t)},Ot=t=>{const e=(e,i)=>new Rt(e,Vt(t,i));for(const i of wt)e[i]=(e,r)=>new Rt(e,Vt(t,r,{method:i}));return e.create=t=>Ot(Vt(t)),e.extend=e=>Ot(Vt(t,e)),e.stop=St,e};var $t=Ot();
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const jt=new WeakMap,Dt=(zt=t=>e=>{if(!(e instanceof R)||e instanceof j||"style"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:i}=e,{style:r}=i.element;jt.has(e)||(r.cssText=i.strings.join(" "));const s=jt.get(e);for(const e in s)e in t||(-1===e.indexOf("-")?r[e]=null:r.removeProperty(e));for(const e in t)-1===e.indexOf("-")?r[e]=t[e]:r.setProperty(e,t[e]);jt.set(e,t)},(...t)=>{const e=zt(...t);return p.set(e,!0),e});var zt;n([st("pill-element")],(function(t,e){return{F:class extends e{constructor(...e){super(...e),t(this)}},d:[{kind:"field",decorators:[ot({type:String})],key:"imageUrl",value:void 0},{kind:"field",decorators:[ot({type:String})],key:"label",value:void 0},{kind:"field",decorators:[ot({type:String})],key:"backgroundColor",value:void 0},{kind:"field",decorators:[ot({type:String})],key:"textColor",value:void 0},{kind:"field",decorators:[ot({type:String})],key:"border",value:()=>"none"},{kind:"field",decorators:[ot({type:Object})],key:"customStyles",value(){return{backgroundColor:this.backgroundColor,color:this.textColor,border:this.border}}},{kind:"get",static:!0,key:"styles",value:function(){return ct`
      .pill {
        display: flex;
        /* grid-template-columns: 1fr 2fr; */
        border: 1px solid #E2E6EF;
        box-sizing: border-box;
        border-radius: 60px;
        width: 100%;
        height: 100%;
        padding: 2px;
      }
      .pill img {
        height: 100%;
        border-radius: 50px;
        /* width: 100%; */
        /* padding: 3px; */
        /* box-sizing: border-box; */
      }
      .pill p {
        text-align: center;
        align-self: center;
        margin: auto;
         /* Centers text since grid-template-columns auto has glitch */
        /* transform: translateX(-10%); */
        backface-visibility: inherit;
      }
      .no-img {
        grid-template-columns: 100%;
      }
      .no-img p {
         /* Reverts transform (see above) */
        /* transform: none; */
      }
    `}},{kind:"method",key:"render",value:function(){return B`
    <div class="pill ${this.imageUrl?"":"no-img"}"
      style="${Dt({backgroundColor:this.backgroundColor,color:this.textColor,border:this.border})}">
      ${this.imageUrl?B`<img src="${this.imageUrl}"></img>`:""}
      <p>${this.label}</p>
    </div>`}}]}}),ht),n([st("nft-card-front")],(function(t,r){class s extends r{constructor(){super(),t(this),this.loading=!0}}return{F:s,d:[{kind:"field",decorators:[ot({type:Object})],key:"asset",value:()=>({})},{kind:"get",static:!0,key:"styles",value:function(){return ct`
      .card-front {
        position: absolute;
        backface-visibility: hidden;
        background: #FFFFFF;
        border-radius: 5px;
        display: grid;
        grid-template-columns: 1fr 2fr;
        position: relative;
        width: 100%;
        height: 100%;
        /* Remove when done with back face */
        /* display: none; */

      }
      .card-front p {
        margin: 0;
      }
      .asset-image-container {
        border-right: 1px solid #E2E6EF;
      }
      .asset-image-container img {
        width: 100%;
      }
      .asset-details-container {
        display: grid;
        grid-template-rows: auto auto auto;
        grid-template-columns: 2fr 3fr;
        margin: 25px;
        align-items: center;
      }
      .asset-detail {
        display: flex;
      }
      .asset-detail .asset-detail-type {
        width: 115px;
        height: 30px;
        font-size: 12px;
        margin-right: 10px;
      }
      .asset-detail .asset-detail-badge {
        width: 54px;
        height: 30px;
        font-size: 12px;
      }
      .asset-detail-name {
        font-weight: 300;
        text-align: left;
      }
      .asset-detail-price {
        text-align: right;
      }
      .asset-detail-price-current {
        font-size: 18px;
        font-weight: 400;
      }
      .asset-detail-price-previous {
        font-size: 14px;
        color: #828282;
      }
      .asset-action-buy {
        grid-column-start: 1;
        grid-column-end: 3;
      }
      .asset-action-buy button {
        width: 100%;
        background: #3291E9;
        border-radius: 5px;
        height: 35px;
        color: white;
        font-weight: bold;
        letter-spacing: .5px;
        cursor: pointer;
        transition: 200ms;
        outline: none;
        border-style: none;
      }
      .asset-action-buy button:hover {
        background: rgb(21, 61, 98);
      }
      .asset-action-info {
        position: absolute;
        right: 10px;
        top: 10px;

      }
      .asset-action-info #info-icon {
        cursor: pointer;
        transition: 200ms;
        opacity: .4;
        backface-visibility: hidden;
      }
      .asset-action-info #info-icon:hover {
        opacity: 1;
      }
    `}},{kind:"method",key:"eventHandler",value:function(t,e,i={}){const r=new CustomEvent("new-event",{detail:{type:e,data:i}});this.dispatchEvent(r)}},{kind:"method",key:"connectedCallback",value:function(){i(e(s.prototype),"connectedCallback",this).call(this),console.warn("I flip card for testing remove me later")}},{kind:"method",key:"updated",value:function(t){t.forEach((t,e)=>{"asset"===e&&(this.loading=!1,this.requestUpdate())})}},{kind:"method",key:"getAssetImageTemplate",value:function(t){return B`
        <div class="asset-image-container">
          <img src="${t}" />
        </div>
      `}},{kind:"method",key:"render",value:function(){return this.isLoading?B``:B`
      <div class="card-front">
        <div class="asset-action-info">
        <svg id="info-btn" @click="${t=>this.eventHandler(t,"flip")}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="white"/><path id="info-icon"fill="rgb(82, 87, 89)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg></div>
        ${this.getAssetImageTemplate(this.asset.image_url)}
        <div class="asset-details-container">
          <div class="asset-detail">
            <div class="pill-container asset-detail-type">
              <pill-element
                .imageUrl=${this.asset.asset_contract.image_url}
                .label=${this.asset.asset_contract.name}
                textColor="#828282"
                border="1px solid #E2E6EF"
              ></pill-element>
            </div>
            <!-- TODO: This badge is optional and must be rendered programmatically -->
            <!-- <div class="pill-container asset-detail-badge">
              <pill-element
                label="New"
                backgroundColor="#23DC7D"
                textColor="#FFFFFF"
              ></pill-element>
            </div> -->
          </div>
          <div class="spacer"></div>
          <div class="asset-detail-name">
            <p>${this.asset.name}</p>

          </div>
          <div class="asset-detail-price">
            <div class="asset-detail-price-current">Ξ 0.04</div>
            <div class="asset-detail-price-previous">Prev. Ξ 0.04</div>
          </div>
          <div class="asset-action-buy">
            <button @click="${t=>this.eventHandler(t,"buy",{buy:"buyit"})}" >BUY THIS ITEM ❯</button>
          </div>

        </div>
      </div>
    `}}]}}),ht);var Ut;!function(t){t.Property="prop",t.Stat="stat",t.Ranking="ranking",t.Boost="boost"}(Ut||(Ut={}));n([st("nft-card-back")],(function(t,e){return{F:class extends e{constructor(){super(),t(this)}},d:[{kind:"field",decorators:[ot({type:Object})],key:"traitData",value:()=>({})},{kind:"field",decorators:[ot({type:Boolean})],key:"loading",value:()=>!0},{kind:"method",key:"buildTraits",value:function(t){this.traits={props:[],stats:[],rankings:[],boosts:[]};const{traits:e,collectionTraits:i}=this.traitData;for(let t of e){const e=this.getTraitType(t,i),r=t.trait_type;this.traits[e+"s"].push({name:r,value:t.value,...e===Ut.Ranking?{max:i[r].max}:{}})}console.log(this.traits)}},{kind:"method",key:"getTraitType",value:function(t,e){return this.isProperty(t,e)?Ut.Property:this.isStat(t)?Ut.Stat:this.isRanking(t,e)?Ut.Ranking:this.isBoost(t)?Ut.Boost:void 0}},{kind:"method",key:"isBoost",value:function(t){return"boost_number"===t.display_type}},{kind:"method",key:"isRanking",value:function(t,e){return null===t.display_type&&"max"in e[t.trait_type]}},{kind:"method",key:"isStat",value:function(t){return"number"===t.display_type}},{kind:"method",key:"isProperty",value:function(t,e){return null===t.display_type&&!("max"in e[t.trait_type])}},{kind:"method",key:"updated",value:function(t){t.forEach((t,e)=>{"traitData"===e&&(this.buildTraits(this.traitData),this.loading=!1,this.requestUpdate())})}},{kind:"get",static:!0,key:"styles",value:function(){return ct`
      .card-back {
        position: absolute;
        backface-visibility: hidden;
        width: 100%;
        height: 100%;
        transform: rotateY(180deg);
        top: 0;
        overflow: initial;
      }
      .card-back p {
        margin: 10px;
      }
      .card-back-inner {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 10px;
        margin: 16px 24px;
      }
      .attribute-container {
        text-align: left;
      }
      .trait-header {
        display: flex;
        font-size: 14px;
        color: rgba(0,0,0,.87);
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        border-bottom: 1px solid rgba(0,0,0,.1);
        line-height: 20px;
        margin-bottom: 8px;
      }
      .trait-header p {
        margin: 0 0 10px 8px;
      }
      .trait-icon {
        height: 100%;
      }
      .trait_property {
        background: #EDFBFF;
        border: 1px solid #2D9CDB;
        border-radius: 5px;
        margin-bottom: 8px;
        display: grid;
        grid-template-columns: 50% 50%;
      }
      .trait_property p {
        margin: 7px 0;
        font-weight: 400;
        font-size: 15px;
        color: rgba(0,0,0,.87);
      }
      .trait_property .trait_property-type {
        text-transform: uppercase;
        font-weight: 500;
        color: #2d9cdb;
        opacity: .8;
        margin: 7px 10px;
      }
      .trait_property .trait_property-value {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .trait_ranking {
        margin-bottom: 8px;
        cursor: pointer;
        padding-bottom: 8px;
      }
      .trait_ranking .trait_ranking-header {
        display: flex;
        justify-content: space-between;
      }
      .trait_ranking .trait_ranking-header .trait_ranking-header-name {
        color: rgba(0,0,0,.87);
        font-size: 14px;
      }

      .trait_ranking .trait_ranking-header .trait_ranking-header-value {
        color: #9e9e9e;
        font-size: 11px;
      }
      .trait_ranking .trait_ranking-bar {
        width: 100%;
        height: 6px;
        border-radius: 14px;
        box-shadow: inset 0 0 0 1px rgba(0,0,0,.1);
        position: relative;
        background: #f3f3f3;
        margin-top: 4px;
      }

      .trait_ranking .trait_ranking-bar .trait_ranking-bar-fill {
        position: absolute;
        left: 1px;
        top: 1px;
        height: 4px;
        background: #3291e9;
        border-radius: 14px;
        max-width: calc(100% - 2px);
      }

      .stat {
        display: grid;
        grid-template-columns: 1fr 4fr;
        justify-items: center;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
      .stat-name {
        font-size: 20px;
        font-weight: 100;
        text-transform: capitalize;
        justify-self: left;
        margin-left: 5px;
      }
      .stat-value {
        color: #2D9CDB;
        font-size: 34px;
        font-weight: 100;
      }
      .trait_boost {
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,.1);
        margin-bottom: 8px;
        padding-bottom: 8px;
      }
      .trait_boost .trait_boost-value {
        width: 30px;
        height: 30px;
        background-color: #2d9cdb;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
      }
      .trait_boost .trait_boost-value p {
        font-size: 12px;
        color: #ffffff;
      }
    `}},{kind:"method",key:"getBoostsTemplate",value:function(t){return B`
      ${t.map(({name:t,value:e})=>B`
        <div class="trait_boost">
          <div class="trait_boost-value">
            <p>+${e}</p>
          </div>
          <div class="trait_boost-name">
            ${t}
          </div>
        </div>
        `)}
    `}},{kind:"method",key:"_getStatsTemplate",value:function(t){if(!t)return B`
      ${t.map(t=>"number"!==t.display_type?"":B`<div class="stat"><div class="stat-value">${t.value}</div><div class="stat-name">${t.trait_type.replace(/_/g," ")}</div></div>`)}
    `}},{kind:"method",key:"getStatsTemplate",value:function(t){return B`
      <div class="trait-header">
        <div class="trait-icon">
          <svg width="15" height="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.66666 11.3333H7.33332V0.666672H4.66666V11.3333ZM0.666656 11.3333H3.33332V6H0.666656V11.3333ZM8.66666 4V11.3333H11.3333V4H8.66666Z" fill="black"/></svg>
        </div>
      </div>

    `}},{kind:"method",key:"getRankingsTemplate",value:function(t){return B`
      <div class="trait-header">
        <div class="trait-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="100%" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/></svg>
        </div>
        <p class="attribute-title">Rankings</p>
      </div>
      ${t.map(({name:t,value:e,max:i})=>B`
        <div class="trait_ranking">
          <div class="trait_ranking-header">
            <div class="trait_ranking-header-name">${t}</div>
            <div class="trait_ranking-header-value">${e} of ${i}</div>
          </div>
          <div class="trait_ranking-bar">
            <div class="trait_ranking-bar-fill" style=${Dt({width:`${e/i*100}%`})}></div>
          </div>
        </div>
      `)}
    `}},{kind:"method",key:"getPropsTemplate",value:function(t){return console.log(t),B`
      ${t.map(t=>B`
        <div class="trait_property">
          <p class="trait_property-type">${t.name}</p>
          <p class="trait_property-value">${t.value}</p>
        </div>
        `)}
    `}},{kind:"method",key:"transformTrait",value:function(t){return t.replace(/_/g," ")}},{kind:"method",key:"render",value:function(){return B`
      <div class="card-back">
        <div class="card-back-inner">
          <div class="attribute-container attribute-properties">
            <div class="trait-header">
              <div class="trait-icon">
                <svg width="18" height="100%" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.00001H9.33333V0.666672H0V2.00001ZM0 4.66667H9.33333V3.33334H0V4.66667ZM0 7.33334H9.33333V6H0V7.33334ZM10.6667 7.33334H12V6H10.6667V7.33334ZM10.6667 0.666672V2.00001H12V0.666672H10.6667ZM10.6667 4.66667H12V3.33334H10.6667V4.66667Z" fill="#1C1F27"/></svg>
              </div>
              <p class="attribute-title">Properties</p>
            </div>
            ${this.loading?"":this.getPropsTemplate(this.traits.props)}
          </div>
          <!-- TODO: Add conditional class based on if it's a rank or stat -->
          <div class="attribute-container">
              ${this.loading?"loadingTemplate()":this.traits.rankings.length>0?this.getRankingsTemplate(this.traits.rankings):this.getStatsTemplate(this.traits.stats)}
          </div>
          <div class="attribute-container attribute-boosts">
            <div class="trait-header">
              <div class="trait-icon">
                <svg width="10" height="100%" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.666656 0.333336V7.66667H2.66666V13.6667L7.33332 5.66667H4.66666L7.33332 0.333336H0.666656Z" fill="#1C1F27"/></svg>
              </div>
              <p class="attribute-title">Boosts</p>
            </div>
            ${this.loading?"loadingTemplate()":this.getBoostsTemplate(this.traits.boosts)}
          </div>
        </div>
      </div>
    `}}]}}),ht);let qt=n([st("nft-card")],(function(t,r){class s extends r{constructor(){super(),t(this)}}return{F:s,d:[{kind:"field",decorators:[ot({type:String})],key:"orientation",value:()=>"vertical"},{kind:"field",decorators:[ot({type:String})],key:"flippedCard",value:()=>!1},{kind:"field",decorators:[ot({type:Boolean})],key:"loading",value:()=>!0},{kind:"field",decorators:[ot({type:Object})],key:"asset",value:()=>({})},{kind:"field",decorators:[ot({type:Object})],key:"traitData",value:()=>({})},{kind:"method",key:"getAsset",value:async function(t,e){return $t.get("./war-rider-nft.json").json()}},{kind:"method",key:"connectedCallback",value:async function(){i(e(s.prototype),"connectedCallback",this).call(this),this.asset=await this.getAsset("",""),this.traitData={traits:this.asset.traits,collectionTraits:this.asset.collection.traits},this.loading=!1,this.requestUpdate()}},{kind:"get",static:!0,key:"styles",value:function(){return ct`
        p {
          margin: 0;
          -webkit-font-smoothing: antialiased;
        }
        .card {
          background-color: transparent;
          font-family: Avenir Next, Avenir, Helvetica Neue, sans-serif;
          font-style: normal;
          font-weight: normal;
          border-radius: 5px;
          perspective: 1000px;
       }
       .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
          box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
          border-radius: 5px;
          min-height: 160px;
      }
      .flipped-card .card-inner {
        transform: rotateY(180deg);
      }
    `}},{kind:"method",key:"buyEvent",value:function(t){console.log(t)}},{kind:"method",key:"flipCard",value:function(t){this.flippedCard=!this.flippedCard}},{kind:"method",key:"eventHandler",value:function(t){const{detail:e}=t;switch(e.type){case"buy":this.buyEvent(e.data);break;case"flip":this.flipCard()}}},{kind:"method",key:"render",value:function(){return B`

      <style>
        @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500&display=swap');
      </style>
      <div class="card ${this.flippedCard?"flipped-card":""}">
        <div class="card-inner">
          ${this.loading?B`loading`:B`
            <nft-card-front @new-event="${this.eventHandler}" .asset=${this.asset} ></nft-card-front>
            <nft-card-back .traitData=${this.traitData} ></nft-card-back>`}
        </div>
      </div>
    `}}]}}),ht);return t.NftCard=qt,t}({});//# sourceMappingURL=nft-card.js.map
