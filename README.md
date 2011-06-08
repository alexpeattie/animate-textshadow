#animate-textshadow
## A lightweight jQuery plugin to animate text shadows

animate-textshadow is a simple, lightweight (< 1KB minified + gzipped) jQuery plugin which lets you animate an element's `text-shadow` property, using jQuery's regular `.animate` method.

The plugin should work with all browsers that support the `text-shadow` property: Firefox 3.1+, Chrome 2+, Safari 1.1+ (untested), IE9+, limited Opera 9.5+ (see Known Issues below).

## Demo

To view the plugin in action see http://www.alexpeattie.com/projects/animate-textshadow/

## Usage

The plugin extends the `.animate` method to take a `textShadow` property.

```javascript
$("#text").animate({textShadow: "#000 1px 2px 3px"})
```
 
The textShadow property is made up of a color, and 3 absolute lengths:

* `right` - governs how far to the right the shadow is offset. A negative value offsets the shadow to the left.
* `bottom` - governs how far below the text the shadow is offset. A negative value offsets the shadow above the text.
* `blur` - governs the blur radius of the shadow.

For more see the [associated W3C spec](http://www.w3.org/TR/1998/REC-CSS2-19980512/text.html#text-shadow-props).

The color can be in hex or RGB, the lengths can be in px, pt or em.

## Requirements

[jQuery](http://jquery.com/) 1.4+

## Credits

Based on Edwin Martin's excellent [Shadow animation plugin](http://www.bitstorm.org/jquery/shadow-animation/).

## License

animate-textshadow is licensed under the [MIT License](http://creativecommons.org/licenses/MIT/):

  Copyright (c) 2011 Alex Peattie (http://www.alexpeattie.com)

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.

## Known issues/forthcoming features

* A bug in Opera's implementation of `getComputedStyle` means it can't fetch an element's text-shadow. In Opera the plugin will just apply the new `text-shadow` value (no animation)
* Only a single shadow is currently supported
* All properties of text-shadow must be provided at the moment (contrary to the CSS spec)
* Future support for CSS3 units (e.g. rem, ex, ch)
* Possible future support for IE through filters.