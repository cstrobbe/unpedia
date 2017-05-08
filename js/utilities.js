/*utilities.js*/

var DEBUG = false;

/* Modifications after checking Willison's original code with JSHint: added "use strict" and changed "window.onload != 'function'" into "window.onload !== 'function'".*/
/**
 * Add a function to the list of functions that need to be called when
 * the HTML document has finished loading (in other words, after the <code>window.load</code> event).
 * @param {Function} func A function that needs to be invoked after <code>window.load</code>.
 * @static
 * @author Simon Willison
 * @see Simon Willison's article <a href="http://simonwillison.net/2004/may/26/addloadevent/">Executing JavaScript on page load</a> (26 May 2004).
 */
function addLoadEvent(func) {
    "use strict";
    var oldonload = window.onload;
    if (typeof window.onload !== 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        };
    }
}


// addListener from N.C. Zakas: Maintainable JavaScript, p. 58
// Note: this function is almost identical to DOMhelp.addEvent by C. Heilmann;
//       DOMhelp.addEvent also passes on useCapture (boolean) to addEventListener.
//       See Christian Heilmann: Beginning JavaScript, p. 156 and p. 166 (Scott Andrew's addEvent method).
/**
 * Add an event listener to an HTML element.
 * @param {Element} target The HTML element where the listener should be added.
 * @param {String} type The type of listener (click, focus, etcetera).
 * @param {Function} handler The function that will handle the event received by the element.
 * by the listener.
 * @author Nicholas C. Zakas
 */
function addListener(target, type, handler) {
    "use strict";
    if (target.addEventListener) {
        target.addEventListener(type, handler, false);
    } else if (target.attachEvent) {
        target.attachEvent("on" + type, handler);
    } else {
        target["on" + type] = handler;
    }
}


// Modifications: added "use strict"; replaced == with ===.
// (Node.TEXT_NODE is part of the DOM recommendation, but some older browsers don't support it; cf. Langridge: 'DHTML Utopia: Modern Web Design Using JavaScript and DOM' (2005), p. 117.)
/**
 * Get an event's target, taking into account differences in browser support.
 * @param {Event} event An event received by a listener.
 * @returns {Element} The element that received the event.
 * @author Peter-Paul Koch
 * @see Peter-Paul Koch's article <a href="http://www.quirksmode.org/js/events_properties.html">Event properties</a> (Quirksmode, 11 November 2008).
 * @see Christian Heilmann: Beginning JavaScript... (2006), p. 167-168, for a similar function that is part of DOMhelp.
 * The version in the downloadable code also checks whether the target is not BODY.
 */
function getTarget(event) {
    "use strict";
    var targ;
    if (!event) {
        event = window.event;
    }
    if (event.target) { // W3C
        targ = event.target;
    } else if (event.srcElement) { // MSIE 4+
        targ = event.srcElement;
    }
    // Defeat Safari bug: If an event takes place on an element that contains text,
    // this text node, and not the element, becomes the target of the event
    if (targ.nodeType === 3) { // Node.TEXT_NODE
        targ = targ.parentNode;
    }
    return targ;
}

// Modifications to the original script: addition of "use strict"; == replaced with ===.
/**
 * Load an external JavaScript without blocking other downloads or page processes.
 * @param {String} url The URL of the JavaScript file. This URL is either an absolute URL, or relative to the HTML file that should load the script.
 * @param {Function} callback The function that should be called when the external JavaScript file has finished loading.
 * @author Nicholas C. Zakas
 * @see Nicholas C. Zakas's article <a href="http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/">The best way to load external JavaScript</a> (NCZOnline, 28 July 2009).
 * @see Nicholas C. Zakas's article <a href="http://www.nczonline.net/blog/2009/06/23/loading-javascript-without-blocking/">Loading JavaScript without blocking</a> (NCZOnline, 23 June 2009).
 * @see Jack Slingerland's article <a href="http://www.re-cycledair.com/load-javascript-dynamically-with-lazy-load">Load Javascript Dynamically With Lazy Load</a> (Re-Cycled Air, 11 September 2010).
 */
function loadScript(url, callback) {
    "use strict";
    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {  //IE
        script.onreadystatechange = function() {
            if (script.readyState === "loaded" ||
                    script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            } // else { window.alert("DoMhelp.js not ready");}
        };
    } else {  //Others
        script.onload = function() {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}


/**
 * Check the type of a variable. This function is intended to improve on the built-in <code>typeof</code> function.
 * @param  variable The variable to be checked.
 * @returns {String} The detected type.
 * @author James Padolsey
 * @see James Padolsey's article <a href="http://james.padolsey.com/javascript/checking-types-in-javascript/">Checking types in JavaScript</a>
 * (12 January 2009).
 * @static
 */
function typeOfVar(variable) {
    "use strict";
    return !!variable && Object.prototype.toString.call(variable).match(/(\w+)\]/)[1];
}


/**
 * Detect whether the passed parameter is an Array.
 * @param {Object} The variable to be checked.
 * @returns <code>true</code> is the object is an Array, <code>false</code> otherwise.
 * @author Juriy Zaytsev a.k.a. Kangax
 * @see Nicholas C. Zakas: <i>Maintainable JavaScript</i>, p. 88.
 * @see Kangax: "<a href="http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/">`instanceof` considered harmful (or how to write a robust `isArray`)"</a> (10 January 2009).
 */
function isAnArray(value) {
    "use strict";
    return Object.prototype.toString.call(value) === "[object Array]";
}


