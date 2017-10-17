﻿/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function(){function x(a,b){var c=a.getAscendant("table"),d=b.getAscendant("table"),e=CKEDITOR.tools.buildTableMap(c),h=n(a),m=n(b),l=[],k={},f,p;c.contains(d)&&(b=b.getAscendant({td:1,th:1}),m=n(b));h>m&&(c=h,h=m,m=c,c=a,a=b,b=c);for(c=0;c<e[h].length;c++)if(a.$===e[h][c]){f=c;break}for(c=0;c<e[m].length;c++)if(b.$===e[m][c]){p=c;break}f>p&&(c=f,f=p,p=c);for(c=h;c<=m;c++)for(h=f;h<=p;h++)d=new CKEDITOR.dom.element(e[c][h]),d.$&&!d.getCustomData("selected_cell")&&(l.push(d),CKEDITOR.dom.element.setMarker(k,
d,"selected_cell",!0));CKEDITOR.dom.element.clearAllMarkers(k);return l}function G(a){if(a)return a=a.clone(),a.enlarge(CKEDITOR.ENLARGE_ELEMENT),(a=a.getEnclosedNode())&&a.is&&a.is(CKEDITOR.dtd.$tableContent)}function H(a){return(a=a.editable().findOne(".cke_table-faked-selection"))&&a.getAscendant("table")}function y(a,b){var c=a.editable().find(".cke_table-faked-selection"),d;a.fire("lockSnapshot");a.editable().removeClass("cke_table-faked-selection-editor");for(d=0;d<c.count();d++)c.getItem(d).removeClass("cke_table-faked-selection");
0<c.count()&&c.getItem(0).getAscendant("table").data("cke-table-faked-selection-table",!1);a.fire("unlockSnapshot");b&&(g={active:!1},a.getSelection().isInTable()&&a.getSelection().reset())}function t(a,b){var c=[],d,e;for(e=0;e<b.length;e++)d=a.createRange(),d.setStartBefore(b[e]),d.setEndAfter(b[e]),c.push(d);a.getSelection().selectRanges(c)}function I(a){var b=a.editable().find(".cke_table-faked-selection");1>b.count()||(b=x(b.getItem(0),b.getItem(b.count()-1)),t(a,b))}function J(a,b,c){var d=
u(a.getSelection(!0));b=b.is("table")?null:b;var e;(e=g.active&&!g.first)&&!(e=b)&&(e=a.getSelection().getRanges(),e=1<d.length||e[0]&&!e[0].collapsed?!0:!1);if(e)g.first=b||d[0],g.dirty=b?!1:1!==d.length;else if(g.active&&b&&g.first.getAscendant("table").equals(b.getAscendant("table"))){d=x(g.first,b);if(!g.dirty&&1===d.length)return y(a,"mouseup"===c.name);g.dirty=!0;g.last=b;t(a,d)}}function K(a){var b=(a=a.editor||a.sender.editor)&&a.getSelection(),c=b&&b.getRanges()||[],d;if(b&&(y(a),b.isInTable()&&
b.isFake)){1===c.length&&c[0]._getTableElement()&&c[0]._getTableElement().is("table")&&(d=c[0]._getTableElement());d=u(b,d);a.fire("lockSnapshot");for(b=0;b<d.length;b++)d[b].addClass("cke_table-faked-selection");0<d.length&&(a.editable().addClass("cke_table-faked-selection-editor"),d[0].getAscendant("table").data("cke-table-faked-selection-table",""));a.fire("unlockSnapshot")}}function n(a){return a.getAscendant("tr",!0).$.rowIndex}function v(a){function b(a,b){return a&&b?a.equals(b)||a.contains(b)||
b.contains(a)||a.getCommonAncestor(b).is(f):!1}function c(a){return!a.getAscendant("table",!0)&&a.getDocument().equals(e.document)}function d(a,d,e,k){return("mousedown"!==a.name||CKEDITOR.tools.getMouseButton(a)!==CKEDITOR.MOUSE_BUTTON_LEFT&&k)&&("mouseup"!==a.name||c(a.data.getTarget())||b(e,k))?!1:!0}if(a.data.getTarget().getName){var e=a.editor||a.listenerData.editor,h=e.getSelection(1),m=H(e),l=a.data.getTarget(),k=l&&l.getAscendant({td:1,th:1},!0),l=l&&l.getAscendant("table",!0),f={table:1,
thead:1,tbody:1,tfoot:1,tr:1,td:1,th:1};d(a,h,m,l)&&y(e,!0);!g.active&&"mousedown"===a.name&&CKEDITOR.tools.getMouseButton(a)===CKEDITOR.MOUSE_BUTTON_LEFT&&l&&(g={active:!0},CKEDITOR.document.on("mouseup",v,null,{editor:e}));(k||l)&&J(e,k||l,a);"mouseup"===a.name&&(CKEDITOR.tools.getMouseButton(a)===CKEDITOR.MOUSE_BUTTON_LEFT&&(c(a.data.getTarget())||b(m,l))&&I(e),g={active:!1},CKEDITOR.document.removeListener("mouseup",v))}}function L(a){var b=a.data.getTarget().getAscendant({td:1,th:1},!0);b&&!b.hasClass("cke_table-faked-selection")&&
(a.cancel(),a.data.preventDefault())}function M(a,b){function c(a){a.cancel()}var d=a.getSelection(),e=d.createBookmarks(),h=a.document,m=a.createRange(),l=h.getDocumentElement().$,k=CKEDITOR.env.ie&&9>CKEDITOR.env.version,f=a.blockless||CKEDITOR.env.ie?"span":"div",p,r,B,g;h.getById("cke_table_copybin")||(p=h.createElement(f),r=h.createElement(f),r.setAttributes({id:"cke_table_copybin","data-cke-temp":"1"}),p.setStyles({position:"absolute",width:"1px",height:"1px",overflow:"hidden"}),p.setStyle("ltr"==
a.config.contentsLangDirection?"left":"right","-5000px"),p.setHtml(a.getSelectedHtml(!0)),a.fire("lockSnapshot"),r.append(p),a.editable().append(r),g=a.on("selectionChange",c,null,null,0),k&&(B=l.scrollTop),m.selectNodeContents(p),m.select(),k&&(l.scrollTop=B),setTimeout(function(){r.remove();d.selectBookmarks(e);g.removeListener();a.fire("unlockSnapshot");b&&(a.extractSelectedHtml(),a.fire("saveSnapshot"))},100))}function C(a){var b=a.editor||a.sender.editor;b.getSelection().isInTable()&&M(b,"cut"===
a.name)}function q(a){this._reset();a&&this.setSelectedCells(a)}function z(a,b,c){a.on("beforeCommandExec",function(d){-1!==CKEDITOR.tools.array.indexOf(b,d.data.name)&&(d.data.selectedCells=u(a.getSelection()))});a.on("afterCommandExec",function(d){-1!==CKEDITOR.tools.array.indexOf(b,d.data.name)&&c(a,d.data)})}var g={active:!1},w,u,A,D,E;q.prototype={};q.prototype._reset=function(){this.cells={first:null,last:null,all:[]};this.rows={first:null,last:null}};q.prototype.setSelectedCells=function(a){this._reset();
a=a.slice(0);this._arraySortByDOMOrder(a);this.cells.all=a;this.cells.first=a[0];this.cells.last=a[a.length-1];this.rows.first=a[0].getAscendant("tr");this.rows.last=this.cells.last.getAscendant("tr")};q.prototype.getTableMap=function(){var a=A(this.cells.first,!0),b;a:{b=this.cells.last;var c=b.getAscendant("table"),d=n(b),c=CKEDITOR.tools.buildTableMap(c),e;for(e=0;e<c[d].length;e++)if((new CKEDITOR.dom.element(c[d][e])).equals(b)){b=e;break a}b=void 0}return CKEDITOR.tools.buildTableMap(this._getTable(),
n(this.rows.first),a,n(this.rows.last),b)};q.prototype._getTable=function(){return this.rows.first.getAscendant("table")};q.prototype.insertRow=function(a,b,c){if("undefined"===typeof a)a=1;else if(0>=a)return;for(var d=this.cells.first.$.cellIndex,e=this.cells.last.$.cellIndex,h=c?[]:this.cells.all,m,l=0;l<a;l++)m=D(c?this.cells.all:h,b),m=CKEDITOR.tools.array.filter(m.find("td, th").toArray(),function(a){return c?!0:a.$.cellIndex>=d&&a.$.cellIndex<=e}),h=b?m.concat(h):h.concat(m);this.setSelectedCells(h)};
q.prototype.insertColumn=function(a){function b(a){a=n(a);return a>=e&&a<=h}if("undefined"===typeof a)a=1;else if(0>=a)return;for(var c=this.cells,d=c.all,e=n(c.first),h=n(c.last),c=0;c<a;c++)d=d.concat(CKEDITOR.tools.array.filter(E(d),b));this.setSelectedCells(d)};q.prototype.emptyCells=function(a){a=a||this.cells.all;for(var b=0;b<a.length;b++)a[b].setHtml("")};q.prototype._arraySortByDOMOrder=function(a){a.sort(function(a,c){return a.getPosition(c)&CKEDITOR.POSITION_PRECEDING?-1:1})};var F={onPaste:function(a){function b(a){return Math.max.apply(null,
CKEDITOR.tools.array.map(a,function(a){return a.length},0))}function c(a){var b=d.createRange();b.selectNodeContents(a);b.select()}var d=a.editor,e=d.getSelection(),h=u(e),m=this.findTableInPastedContent(d,a.data.dataValue),l=e.isInTable(!0)&&this.isBoundarySelection(e),k,f;!h.length||1===h.length&&!G(e.getRanges()[0])&&!l||l&&!m||(h=h[0].getAscendant("table"),k=new q(u(e,h)),d.once("afterPaste",function(){var a;if(f){a=new CKEDITOR.dom.element(f[0][0]);var b=f[f.length-1];a=x(a,new CKEDITOR.dom.element(b[b.length-
1]))}else a=k.cells.all;t(d,a)}),m?(a.stop(),l?(k.insertRow(1,1===l,!0),e.selectElement(k.rows.first)):(k.emptyCells(),t(d,k.cells.all)),a=k.getTableMap(),f=CKEDITOR.tools.buildTableMap(m),k.insertRow(f.length-a.length),k.insertColumn(b(f)-b(a)),a=k.getTableMap(),this.pasteTable(k,a,f),d.fire("saveSnapshot"),setTimeout(function(){d.fire("afterPaste")},0)):(c(k.cells.first),d.once("afterPaste",function(){d.fire("lockSnapshot");k.emptyCells(k.cells.all.slice(1));t(d,k.cells.all);d.fire("unlockSnapshot")})))},
isBoundarySelection:function(a){a=a.getRanges()[0];var b=a.endContainer.getAscendant("tr",!0);if(b&&a.collapsed){if(a.checkBoundaryOfElement(b,CKEDITOR.START))return 1;if(a.checkBoundaryOfElement(b,CKEDITOR.END))return 2}return 0},findTableInPastedContent:function(a,b){var c=a.dataProcessor,d=new CKEDITOR.dom.element("body");c||(c=new CKEDITOR.htmlDataProcessor(a));d.setHtml(c.toHtml(b),{fixForBody:!1});return 1<d.getChildCount()?null:d.findOne("table")},pasteTable:function(a,b,c){var d,e=A(a.cells.first,
!0),h=a._getTable(),m={},l,k,f,p;for(f=0;f<c.length;f++)for(l=new CKEDITOR.dom.element(h.$.rows[a.rows.first.$.rowIndex+f]),p=0;p<c[f].length;p++)if(k=new CKEDITOR.dom.element(c[f][p]),d=b[f]&&b[f][p]?new CKEDITOR.dom.element(b[f][p]):null,k&&!k.getCustomData("processed")){if(d&&d.getParent())k.replace(d);else if(0===p||c[f][p-1])(d=0!==p?new CKEDITOR.dom.element(c[f][p-1]):null)&&l.equals(d.getParent())?k.insertAfter(d):0<e?l.$.cells[e]?k.insertAfter(new CKEDITOR.dom.element(l.$.cells[e])):l.append(k):
l.append(k,!0);CKEDITOR.dom.element.setMarker(m,k,"processed",!0)}else k.getCustomData("processed")&&d&&d.remove();CKEDITOR.dom.element.clearAllMarkers(m)}};CKEDITOR.plugins.tableselection={getCellsBetween:x,keyboardIntegration:function(a){function b(a){var b=a.getEnclosedNode();b&&b.is({td:1,th:1})?a.getEnclosedNode().setText(""):a.deleteContents();CKEDITOR.tools.array.forEach(a._find("td"),function(a){a.appendBogus()})}var c=a.editable();c.attachListener(c,"keydown",function(a){function c(b,e){if(!e.length)return null;
var f=a.createRange(),h=CKEDITOR.dom.range.mergeRanges(e);CKEDITOR.tools.array.forEach(h,function(a){a.enlarge(CKEDITOR.ENLARGE_ELEMENT)});var r=h[0].getBoundaryNodes(),g=r.startNode,r=r.endNode;if(g&&g.is&&g.is(m)){for(var q=g.getAscendant("table",!0),n=g.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT,q),t=!1,u=function(a){return!g.contains(a)&&a.is&&a.is("td","th")};n&&!u(n);)n=n.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT,q);!n&&r&&r.is&&!r.is("table")&&r.getNext()&&(n=r.getNext().findOne("td, th"),
t=!0);if(n)f["moveToElementEdit"+(t?"Start":"End")](n);else f.setStartBefore(g.getAscendant("table",!0)),f.collapse(!0);h[0].deleteContents();return[f]}if(g)return f.moveToElementEditablePosition(g),[f]}var h={37:1,38:1,39:1,40:1,8:1,46:1},m=CKEDITOR.tools.extend({table:1},CKEDITOR.dtd.$tableContent);delete m.td;delete m.th;return function(l){var k=l.data.getKey(),f,m=37===k||38==k,g,n,q;if(h[k]&&(f=a.getSelection())&&f.isInTable()&&f.isFake)if(g=f.getRanges(),n=g[0]._getTableElement(),q=g[g.length-
1]._getTableElement(),l.data.preventDefault(),l.cancel(),8<k&&46>k)g[0].moveToElementEditablePosition(m?n:q,!m),f.selectRanges([g[0]]);else{for(l=0;l<g.length;l++)b(g[l]);(l=c(n,g))?g=l:g[0].moveToElementEditablePosition(n);f.selectRanges(g);a.fire("saveSnapshot")}}}(a),null,null,-1);c.attachListener(c,"keypress",function(d){var c=a.getSelection(),h=d.data.$.charCode||13===d.data.getKey(),g;if(c&&c.isInTable()&&c.isFake&&h&&!(d.data.getKeystroke()&CKEDITOR.CTRL)){d=c.getRanges();h=d[0].getEnclosedNode().getAscendant({td:1,
th:1},!0);for(g=0;g<d.length;g++)b(d[g]);h&&(d[0].moveToElementEditablePosition(h),c.selectRanges([d[0]]))}},null,null,-1)},isSupportedEnvironment:!(CKEDITOR.env.ie&&11>CKEDITOR.env.version)};CKEDITOR.plugins.add("tableselection",{requires:"clipboard,tabletools",onLoad:function(){w=CKEDITOR.plugins.tabletools;u=w.getSelectedCells;A=w.getCellColIndex;D=w.insertRow;E=w.insertColumn;CKEDITOR.document.appendStyleSheet(this.path+"styles/tableselection.css")},init:function(a){CKEDITOR.plugins.tableselection.isSupportedEnvironment&&
(a.addContentsCss&&a.addContentsCss(this.path+"styles/tableselection.css"),a.on("contentDom",function(){var b=a.editable(),c=b.isInline()?b:a.document,d={editor:a};b.attachListener(c,"mousedown",v,null,d);b.attachListener(c,"mousemove",v,null,d);b.attachListener(c,"mouseup",v,null,d);b.attachListener(b,"dragstart",L);b.attachListener(a,"selectionCheck",K);CKEDITOR.plugins.tableselection.keyboardIntegration(a);CKEDITOR.plugins.clipboard&&!CKEDITOR.plugins.clipboard.isCustomCopyCutSupported&&(b.attachListener(b,
"cut",C),b.attachListener(b,"copy",C))}),a.on("paste",F.onPaste,F),z(a,"rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "),function(a,c){t(a,c.selectedCells)}),z(a,["cellMerge","cellMergeRight","cellMergeDown"],function(a,c){t(a,[c.commandData.cell])}),z(a,["cellDelete"],function(a){y(a,!0)}))}})})();