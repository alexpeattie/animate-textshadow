/*!
 * Text shadow animation jQuery-plugin
 * http://alexpeattie.com/projects/text-shadow-animation
 * Copyright 2011 Alex Peattie <alexpeattie@gmail.com>
 * Contributor: Edwin Martin <edwin@bitstorm.org>
 * Released under the MIT and GPL licenses.
 */

jQuery(function($) {
	/**
	 * Check whether the browser supports RGBA color mode.
	 *
	 * Author Mehdi Kabab <http://pioupioum.fr>
	 * @return {boolean} True if the browser support RGBA. False otherwise.
	 */
	function isRGBACapable() {
		var $script = $('script:first'),
				color = $script.css('color'),
				result = false;
		if (/^rgba/.test(color)) {
			result = true;
		} else {
			try {
				result = ( color != $script.css('color', 'rgba(0, 0, 0, 0.5)').css('color') );
				$script.css('color', color);
			} catch (e) {
			}
		}

		return result;
	}

	$.extend(true, $, {
		support: {
			'rgba': isRGBACapable()
		}
	});

	/*************************************/

	// Extend the animate-function
	$.fx.step['textShadow'] = function(fx) {
		if (!fx.init) {
			//We have to pass the font size to the parseShadow method, to allow the use of em units
			var fontSize = $(fx.elem).get(0).style['fontSize'] || $(fx.elem).css('fontSize')
			var beginShadow = $(fx.elem).get(0).style['textShadow'] || $(fx.elem).css('textShadow')
			
			//In cases where text-shadow is none, or is not returned by browser (e.g. current versions of Opera)
			//then set the beginning and ending shadow to be equal, so no animation
			if(beginShadow == ('' || 'none')) { beginShadow = fx.end }
			
			fx.begin = parseShadow(beginShadow, fontSize);
			fx.end = $.extend({}, fx.begin, parseShadow(fx.end, fontSize));
			fx.init = true;
		}
		fx.elem.style.textShadow = calculateShadow(fx.begin, fx.end, fx.pos);
	}


	// Calculate an in-between shadow.
	function calculateShadow(begin, end, pos) {
		var parts = [];

		if (typeof end.right != 'undefined') {
			parts.push(parseInt(begin.right + pos * (end.right - begin.right)) + 'px '
					+ parseInt(begin.bottom + pos * (end.bottom - begin.bottom)) + 'px');
		}
		if (typeof end.blur != 'undefined') {
			parts.push(parseInt(begin.blur + pos * (end.blur - begin.blur)) + 'px');
		}

		if (typeof end.color != 'undefined') {
			var color = 'rgb' + ($.support.rgba ? 'a' : '') + '('
					+ parseInt((begin.color[0] + pos * (end.color[0] - begin.color[0]))) + ','
					+ parseInt((begin.color[1] + pos * (end.color[1] - begin.color[1]))) + ','
					+ parseInt((begin.color[2] + pos * (end.color[2] - begin.color[2])));
			if ($.support.rgba) {
				color += ',' + parseFloat(begin.color[3] + pos * (end.color[3] - begin.color[3]));
			}
			color += ')';
			parts.push(color);
		}
		var value = parts.join(' ');
		return value;
	}

	// Parse the shadow value and extract the values.
	function parseShadow(shadow, fontSize) {
		var match, color, lengths, valpx, parsedShadow = {};

		// Parse an CSS-syntax color. Outputs an array [r, g, b]
		// Match #aabbcc
		if (match = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(shadow)) {
			color = [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16), 1];

			// Match #abc
		} else if (match = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(shadow)) {
			color = [parseInt(match[1], 16) * 17, parseInt(match[2], 16) * 17, parseInt(match[3], 16) * 17, 1];

			// Match rgb(n, n, n)
		} else if (match = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(shadow)) {
			color = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), 1];

			// Match rgba(n, n, n, n)
		} else if (match = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(shadow)) {
			color = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]),parseFloat(match[4])];

			// No browser returns rgb(n%, n%, n%), so little reason to support this format.
		}

		// Remove the color value from the string for the next round of parsing
		lengths = shadow.replace(match[0], '');

		// Parse offset and blur            
		if (match = /(-*[0-9.]+(?:px|em|pt)?)\s+(-*[0-9.]+(?:px|em|pt)?)\s+(-*[0-9.]+(?:px|em|pt)?)/.exec(lengths)) {

			// Rough and ready em/pt > px conversion
			valpx = match.slice(1).map(function(v) {
				var unit = v.match(/em|pt/);
				if(unit == "em") return parseFloat(v) * parseInt(fontSize);
				if(unit == "pt") return parseInt(v)/72*96;
				return parseInt(v);
			});
			parsedShadow = {right: valpx[0], bottom: valpx[1], blur: valpx[2]};
		}

		parsedShadow.color = color;
		return parsedShadow;
	}
});