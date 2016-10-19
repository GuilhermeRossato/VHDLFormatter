"use strict";

var editor;

window.addEventListener("load", function() {
	editor = CKEDITOR.replace('editor1');
	editor.config.font_style.styles["font-family"] = "Arial";
	editor.addCommand("mySimpleCommand", { // create named command
    exec: function(edt) {
    	var data = edt.getData();
    	data = clearHTML(data);
    	data = addRed(data);
    	data = addBlue(data);
    	data = addGreen(data);
    	edt.setData(data);
    } } );

    var a = editor.ui.addButton("formatVHDL", {
    	label: "Click me",
    	command: 'mySimpleCommand',
    	toolbar: 'insert',
    	icon: '../Images/circuit-icon-1.png'
    });

});
