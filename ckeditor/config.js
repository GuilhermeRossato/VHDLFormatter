/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	config.extraPlugins = 'colorbutton,colordialog';
	
	config.toolbar = [
	{ name: 'custom', items: ["formatVHDL", "formatASSEMBLY"] },
	{ name: 'clipboard', items: ["Cut", "Copy", "Paste", "Undo", "Redo"] },
	{ name: 'paragraph', items: ["Indent", "Outdent", "Table", "Font", "TextColor", "BGColor"] },
	{ name: 'tools', items: ["Maximize", "Source"] }
	];

	config.extraPlugins = 'colorbutton,colordialog';

	config.font_names = "Verdana";
	config.enterMode = CKEDITOR.ENTER_BR;
	config.height = 400;
	
};
