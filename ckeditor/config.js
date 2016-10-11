/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	//config.uiColor = '#DDDDDD';
	config.toolbar = [
	{ name: 'custom', items: ["formatVHDL"] },
	{ name: 'clipboard', items: ["Cut", "Copy", "Paste"] },
	{ name: 'insert', items: ["Table", "-", "HorizontalRule", "Special Char"] },
	{ name: 'paragraph', items: ["Indent", "-", "Outdent"]},
	{ name: 'tools', items: ["Maximize"] }
	]
};
