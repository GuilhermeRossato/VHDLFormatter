

function isLetter(ch) {
	return ((ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122));
}

function addRed(text) {
	var cont = true;
	var reds = ["library", "use", "entity", "is", "port", "architecture","signal", "of", "in", "inout","out", "generic", "map", "when", "end"];
	var ats = [];
	var at_now = 0;
	var addition = "<span style='color:#ff0000;'>";
	var closition = "</span>";
	reds.forEach((label, i) => {
		text = continousReplace(text, " "+label+" "," "+addition+label+closition+" ");
	});
	return text;
}

function addBlue(text) {
	
	return text;
}

function addGreen(text) {
	var addition = "<span style='color:#38761d;'>";
	var closition = "</span>";
	var at = text.indexOf("--");
	var lastAt = at;
	while (at != -1) {
		lastAt = at;
		at = text.indexOf("\n", at);
		if (at == -1) {
			return text.substr(0, lastAt) + addition + text.substr(lastAt) + closition;
		} else {
			text = text.substr(0, lastAt) + addition + text.substr(lastAt, at) + closition + text.substr(at+1);
			at = at + addition.length + closition.length + (at-lastAt);
		}
		at = text.indexOf("--", at);
	}
	return text;
}

function continousReplace(text,txt1,txt2) {
	var editText;
	while (editText !== text) {
		editText = text;
		text = editText.replace(txt1, txt2);
	}
	return editText;
}

function clearHTML(text) {
	var newText = text;
	newText = continousReplace(newText,"<br>","\n");
	newText = continousReplace(newText,"</br>","\n");
	newText = "<p style='font-style:\"Courier New\"'>"+newText.replace(/<(?:.|\n)*?>/gm, '')+"</p>";
	newText = continousReplace(newText, '&nbsp;', ' ');
	newText = continousReplace(newText, '\n', '<br>');
	return newText;
}