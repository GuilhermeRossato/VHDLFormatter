"use strict";

var editor;

window.addEventListener("load", function() {
	editor = CKEDITOR.replace('editor1');

	editor.addCommand("mySimpleCommand", { // create named command
    exec: function(edt) {
    	var data = edt.getData();
    	data = replaceRed(data);
    	data = replaceBlue(data);
    	data = replace
    	console.log(edt.getData(),edt.setData(edt.getData()+"<p>ha</p>"));

    } } );

    var a = editor.ui.addButton("formatVHDL", {
    	label: "Click me",
    	command: 'mySimpleCommand',
    	toolbar: 'insert',
    	icon: '../Images/circuit-icon-1.png'
    });
    console.log(a);

});
