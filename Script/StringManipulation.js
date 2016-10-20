isLetter = (ch)=>((ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122));
function addRed(text) {
	var i, char, charId, lastWord = "", replacing, word, color, closing, mode = 0, reds = ["library", "use", "entity", "is", "port", "architecture", "signal", "of", "in", "inout", "out", "generic", "map", "when", "begin", "end", "else", "or", "and", "nor", "not", "downto", "to", "range"], blues = ["std_logic_vector", "std_logic", "inst_type"];
	for (i = text.indexOf('>') + 1; (i < text.length); i++) {
		char = text.charAt(i);
		charId = text.charCodeAt(i);
		if (mode == 0) {
			if (char == ' ' || char == '<' || char == '.' || char == ';') {
				//word is complete
				color = "";
				if (reds.indexOf(lastWord) != -1) {
					color = "#ff0000";
				} else if (blues.indexOf(lastWord) != -1) {
					color = "#0b5394";
				}
				if (color != "") {
					replacing = "<span style='color:" + color + "'>" + lastWord + "</span>";
					text = text.substr(0, i - lastWord.length) + replacing + text.substr(i);
					i += replacing.length - lastWord.length;
				}
				lastWord = "";
				if (char == '<') {
					mode = 1;
					closing = false;
				}
			} else if (char == ')')
				lastWord = "";
			else
				lastWord = lastWord + char
		} else if (mode == 1) {
			if (char == '/' && text.charAt(i - 1) == '<') {
				closing = true;
			} else if (char == ">") {
				if ((text[i - 2] == "b") && (text[i - 1] == "r"))
					mode = 0;
				else
					mode = closing ? 0 : 1;
			}
		}
	}
	return text;
}
function addSpaceWhereNeeded(text) {
	var i = text.indexOf("="), next;
	while (i !== -1 && next !== -1) {
		if (text.substr(i - 5, 5) == "style") {
			next = text.substr(i + 1).indexOf("=");
			i = i + next + 1;
		} else {
			if (text[i + 1] == "=" || text[i - 1] == "=" || text[i - 1] == "<" || text[i + 1] == ">" || (text[i - 1] == " " && text[i + 1] == " "))
				txt2 = "=";
			else if (text[i - 1] == " ")
				txt2 = "= ";
			else if (text[i + 1] == " ")
				txt2 = " =";
			else
				txt2 = " = ";
			text = text.substr(0, i) + txt2 + text.substr(i + 1);
			next = text.substr(i + txt2.length).indexOf("=");
			i = i + txt2.length + next;
		}
	}
	return text;
}
function addBlueNGreen(text) {
	function addColoredSpan(txt, symb, color) {
		return carefulReplace(txt, symb, "<span style='color:" + color + ";'>" + symb + "</span>");
	}
	var i, j, mode = 0, replacing, lastTag = "";
	for (i = text.indexOf('>') + 1; i <= text.length; i++) {
		if (i < text.length) {
			if (mode == 10) {
				if (lastTag == "br" || lastTag == "/br") {
					replacing = "</span>";
					text = text.substr(0, i) + replacing + text.substr(i);
					i += replacing.length;
				}
				mode = 0;
			} else
				j = text.charCodeAt(i);
			if ((mode != 5) && (mode != 6))
				lastTag = "";
		} else if (mode == 1)
			j = ' '.charCodeAt();
		else if (mode == 2)
			j = '"'.charCodeAt();
		else if (mode == 3)
			j = "'".charCodeAt();
		else
			j = '\n'.charCodeAt();
		if (mode == 0) {
			// Nothing
			if ((j >= 48 && j <= 57) || (j == 34) || (j == 39)) {
				if (text.charAt(i - 1) == '_' && (j >= 48 && j <= 57)) {
					while (text.charCodeAt(i) >= 48 && text.charCodeAt(i) <= 57)
						i++;
					i--;
					mode = 0;
				} else {
					replacing = "<span style='color:#0b5394'>";
					text = text.substr(0, i) + replacing + text.substr(i);
					i += replacing.length;
					if (j >= 48 && j <= 57)
						// Number
						mode = 1;
					else if (j === 34)
						// "text"
						mode = 2;
					else
						// 'text'
						mode = 3;
				}
			} else if (i > 0 && j == 45 && text.charCodeAt(i - 1) == 45) {
				replacing = "<span style='color:#38761d'>-";
				text = text.substr(0, i - 1) + replacing + text.substr(i);
				i += replacing.length;
				mode = 4;
			} else if (j == 60) {
				if (text.charAt(i + 1) != ' ' && text.charAt(i + 1) != '=' && text.charAt(i - 1) != '=')
					mode = 5;
			}
		} else if (mode == 1) {
			// Is number
			if (j < 48 || j > 57) {
				replacing = "</span>";
				text = text.substr(0, i) + replacing + text.substr(i);
				i += replacing.length - 1;
				mode = 0;
			}
		} else if (mode == 2 || mode == 3 || mode == 4) {
			// Is "text" or 'text' or end of comment
			if (j == 10 && mode == 4) {
				replacing = "</span>";
				text = text.substr(0, i) + replacing + text.substr(i);
				i += replacing.length - 1;
				mode = 0;
			} else if ((j == 34 && mode == 2) || (j == 39 && mode == 3)) {
				replacing = ((j == 39 && mode == 3) ? "'" : '"') + "</span>";
				text = text.substr(0, i) + replacing + text.substr(i + 1);
				i += replacing.length - 1;
				mode = 0;
			}
			if (mode == 4) {
				if (j == 60) {
					mode = 6
					// tag inside comment
				}
			}
		} else if ((mode == 5) || (mode == 6)) {
			if (j == 62)
				mode = (mode == 5) ? 0 : 10;
			else
				lastTag += text.charAt(i);
		}
	}
	["(", ")", "=>", "<=", " = ", " == "].forEach(label=>{
		text = addColoredSpan(text, label, "#0000FF");
	}
	);
	return text;
}
function carefulReplace(text, txt1, txt2) {
	var i = text.indexOf(txt1, i), next;
	while (i !== -1 && next !== -1) {
		text = text.substr(0, i) + txt2 + text.substr(i + txt1.length);
		next = text.substr(i + txt2.length).indexOf(txt1);
		i = i + txt2.length + next;
	}
	return text;
}
function continousReplace(text, txt1, txt2) {
	var editText;
	while (editText !== text) {
		editText = text;
		text = editText.replace(txt1, txt2);
	}
	return editText;
}
function clearHTML(text) {
	var newText = text;
	newText = continousReplace(newText, "<br>", "\n");
	newText = continousReplace(newText, "</br>", "\n");
	newText = "<span style='font-family:Courier New,Courier,monospace'>" + newText.replace(/<(?:.|\n)*?>/gm, '') + "</span>";
	newText = continousReplace(newText, '&nbsp;', ' ');
	newText = continousReplace(newText, '&#39;', "'");
	newText = continousReplace(newText, '&quot;', '"');
	newText = continousReplace(newText, '&lt;', '<');
	newText = continousReplace(newText, '&gt;', '>');
	/*newText = continousReplace(newText, '&amp;', /&/g);
    newText = continousReplace(newText, '&quot;', /"/g);
    newText = continousReplace(newText, '&#39;', /'/g);
    newText = continousReplace(newText, '&lt;', /</g);
    newText = continousReplace(newText, '&gt;', />/g);*/
	newText = continousReplace(newText, '\n', '<br>');
	return newText;
}
function addDarkRed(text) {
	var i = text.indexOf("=>"), mode = 1, j, replacing, hasContent = false;
	var limitter = text.length*2;
	while (i > -1 && i < text.length && (limitter--)) {
		j = text.charAt(i);
		if (mode === 0) {
			mode = 1;
			i--;
		} else if (mode === 1) {
			// Going backwards to find span's right/ending
			if (j === ">")
				mode = 2;
			else
				i--;
		} else if (mode === 2) {
			// Going backwards to find span's left/beggining
			if (j === "<")
				mode = 3;
			i--;
		} else if (mode === 3) {
			// Going backwards to find label start
			if (isLetter(j.charCodeAt())) {
				i--;
			} else if (j == " " || j == "_") {
				i--;
			} else {
				mode = 4;
			}
		} else if (mode === 4) {
			// Replacing new span start
			replacing = "<span style='color:#980000'>";
			text = text.substr(0, i + 1) + replacing + text.substr(i + 1);
			i += replacing.length + 1;
			mode = 5;
		} else if (mode === 5) {
			// Finding the '=>' span left/beggining
			if (j == "<")
				mode = 6;
			else
				i++;
		} else if (mode === 6) {
			// Replacing span end
			replacing = "</span>";
			text = text.substr(0, i) + replacing + text.substr(i);
			i += replacing.length + 1;
			mode = 7;
		} else if (mode === 7) {
			// Finding => itself back again
			if ((text.charAt(i - 1) === "=") && (j === ">"))
				mode = 8;
			else
				i++;
		} else if (mode === 8) {
			// Done, restart operation if needed
			if (text.substr(i).indexOf("=>") != -1)
				i += text.substr(i).indexOf("=>");
			else
				i = -1;
			mode = 0;
		} else {
			i++;
		}
	}
	return text;
}
function formatPort(text) {
	return text;
}
function assemblyTags(text) {
	var result = "<table border='0' style='text-align:center; width:100%'><tbody><tr><td style='width:50px;background-color:#cccccc'>"
	  , instructions = ["add", "addi", "addiu", "and", "andi", "beq", "bgez", "bgezal", "bgtz", "blez", "bltz", "bltzal", "bne", "div", "divu", "mult", "multu", "j", "jal", "jr", "lb", "lw", "sb", "sw", "lui", "mfhi", "mflo", "noop", "or", "ori", "sb", "sll", "sllv", "slt", "slti", "sltiu", "sltu", "sra", "srl", "srlv", "sub", "subu", "sw", "syscall", "xor", "xori"];
	text = text.replace(/<(?:.|\n)*?>/gm, '');
	lines = text.split('\n');
	function getColoredSpan(color, inside, margin) {
		return (margin == undefined)?"<span style='color:" + color + ";'>" + inside + "</span>":
			"<span style='color:" + color + ";margin-left:"+margin+"px;'>" + inside + "</span>";
	}
	lines = lines.filter(line => {
		for (var i = 0;i<line.length;i++)
			if (isLetter(line.charCodeAt(i)))
				return true;
		return false;
	});
	lines.forEach((line,i)=>{
		result += i.toString() + '<br/>';
	}
	);
	result += "</td><td style='text-align:left;margin:10px'>";
	var canMarginMneu;
	lines.forEach(line=>{
		var words = line.split(" ");
		canMarginMneu = true;
		words.forEach((word,j) => {
			while (word[0] == ' ' || word[0] == '\t')
				word = word.substr(1);
			if (word == ".text" || word == ".data") {
				result += getColoredSpan("#bb00bb", word);
			} else if (instructions.indexOf(word.toLowerCase()) != -1) {
				result += getColoredSpan("#0000bb", word, canMarginMneu?20:undefined);
			} else if (word[0] == "$") {
				var subwords = word.split(",");
				subwords.forEach((subword,i)=>{
					if (subword[0] == "$")
						result += getColoredSpan("#ff0000", subword);
					else
						result += subword;
					if (i != subwords.length-1) {
						result += ', ';
					}
				});
			} else {
				result += word;
			}
			if (j != words.length-1) {
				result += ' ';
			}
			canMarginMneu = false;
		});
		result += ' <br />';
	})
	result += '</td></tr></tbody></table>';
	return result;
}
