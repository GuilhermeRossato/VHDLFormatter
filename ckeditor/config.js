/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	config.extraPlugins = 'colorbutton,colordialog';
	
	config.toolbar = [
	{ name: 'custom', items: ["formatVHDL"] },
	{ name: 'clipboard', items: ["Cut", "Copy", "Paste", "Undo", "Redo"] },
	{ name: 'insert', items: ["Table", "-", "HorizontalRule", "SpecialChar"] },
	{ name: 'paragraph', items: ["Indent", "Outdent", "-", "TextColor", "BGColor"] },
	{ name: 'tools', items: ["Maximize", "Source"] }
	];

	config.extraPlugins = 'colorbutton,colordialog';

	config.font_names = "Verdana";
	config.enterMode = CKEDITOR.ENTER_BR;
	
};
