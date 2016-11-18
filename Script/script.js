"use strict";

var editor;

window.addEventListener("load", function() {
	editor = CKEDITOR.replace('editor1');
	editor.config.font_style.styles["font-family"] = "Arial";
	editor.addCommand("format_vhdl", { // create named command
    exec: function(edt) {
    	var data = edt.getData();
    	data = clearHTML(data);
    	data = addSpaceWhereNeeded(data);
    	data = addBlueNGreen(data);
    	data = addRed(data);
    	data = addDarkRed(data);
    	data = formatClockEvent(data);
    	edt.setData(data);
    } } );
    editor.addCommand("format_assembly", {
    exec: function(edt) {
    	var data = edt.getData();
    	if (data.indexOf("architecture") === -1) {
    		data = assemblyTags(data);
    		edt.setData(data);
    	}
    } } );

    var a = editor.ui.addButton("formatVHDL", {
    	label: "Format VHDL",
    	command: 'format_vhdl',
    	toolbar: 'insert',
    	icon: '../Images/circuit-icon-1.png'
    });
    var a = editor.ui.addButton("formatASSEMBLY", {
    	label: "Format assembly",
    	command: 'format_assembly',
    	toolbar: 'insert',
    	icon: '../Images/asm.png'
    });

});
