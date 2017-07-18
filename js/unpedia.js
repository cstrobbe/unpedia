/*unpedia.js*/

var DEBUG = true;


/**
 * @namespace The main application object.
 */
var unpedia = {
    shaxChronoGroups : { //jsnlabels
        "legend"        : "Filter dates",
        "dategroups"    : {
            "shaxBio"       : ["Biography and Stratford", "checked", "shax-bio"],
            "shaxWork"      : ["Shakespeare's work and the theatres", "checked", "shax-work"],
            "shaxSource"    : ["Shakespeare's sources", "checked", "shax-source"],
            "dateCulture"   : ["Other literary and cultural events", "checked", "date-culture"],
            "dateHistory"   : ["Historical and political events", "checked", "date-history"]
        }
    },
    engLitRenaissanceGroups : { //jsnlabels
        "legend"        : "Filter authors / works",
        "dategroups"    : {
            "preShakespeare"    : ["Pre-Shakespearean works", "checked", "pre-shakespeare"],
            "nonFiction"        : ["Non-fiction work and the theatres", "checked", "non-fiction"],
            "marlowe"           : ["Shakespeare's sources", "checked", "marlowe-work"],
            "shakespeare"       : ["Other literary and cultural events", "checked", "shax-work"]
        }
    },

    init: function() {
        "use strict";
        // Check support for W3C DOM. (C. Heilmann: Beginning JavaScript Development ..., p. 66-68.)
        if (!document.getElementById || !document.createTextNode) { return; }

        /*loadScript("utilities.js", function() { 
            if (DEBUG) { console.log("utilities.js loaded."); }
        });*/

        this.addChronologyTweaker();
    },

    createCheckbox: function(id, label, status, cssClass) {
        "use scrict";
        var container, inputElement, labelElement;

        container = document.createElement("p");
        inputElement = document.createElement("input");
        inputElement.setAttribute("type", "checkbox");
        inputElement.setAttribute("id", id);
        inputElement.setAttribute("checked", status);
        inputElement.setAttribute("class", cssClass);

        labelElement = document.createElement("label");
        labelElement.setAttribute("for", id);
        labelElement.setAttribute("class", cssClass);
        labelElement.appendChild(document.createTextNode(label));

        container.appendChild(inputElement);
        container.appendChild(labelElement);
        return container;
    },

    /**
     * Add a form that lets the user tweak the chronology.
     * @param {Object} jsnlabels - JSON object representing the labels for the form.
     * @author Christophe Strobbe
     */
    addChronologyTweaker: function(jsnlabels) {
        "use scrict";
        var chronoTweaker, chronoTweakForm, chronoTweakFieldset, chronoTweakFieldsetLegend;
        var shaxBio, shaxWork, shaxSource, dateCulture, dateHistory;

        chronoTweaker = document.getElementById("tweak-chrono-container");
        if (chronoTweaker !== null) {
            chronoTweakForm = document.createElement("form");
            chronoTweakFieldset = document.createElement("fieldset");
            chronoTweakFieldsetLegend = document.createElement("legend");
            //@@todo get labels etc from the JSON object passed in to the function.
            chronoTweakFieldsetLegend.appendChild(document.createTextNode("Filter dates"));
            chronoTweakFieldset.appendChild(chronoTweakFieldsetLegend);
            shaxBio = unpedia.createCheckbox("shaxBio", "Biography and Stratford", "checked", "shax-bio");
            chronoTweakFieldset.appendChild(shaxBio);
            shaxWork= unpedia.createCheckbox("shaxWork", "Shakespeare's work and the theatres", "checked", "shax-work");
            chronoTweakFieldset.appendChild(shaxWork);
            shaxSource= unpedia.createCheckbox("shaxSource", "Shakespeare's sources", "checked", "shax-source");
            chronoTweakFieldset.appendChild(shaxSource);
            dateCulture= unpedia.createCheckbox("dateCulture", "Other literary and cultural events", "checked", "date-culture");
            chronoTweakFieldset.appendChild(dateCulture);
            dateHistory= unpedia.createCheckbox("dateHistory", "Historical and political events", "checked", "date-history");
            chronoTweakFieldset.appendChild(dateHistory);

            chronoTweakForm.appendChild(chronoTweakFieldset);
            chronoTweaker.appendChild(chronoTweakForm);

            addListener(document.getElementById("shaxBio"), "change", unpedia.handleChronologyToggle);
            addListener(document.getElementById("shaxSource"), "change", unpedia.handleChronologyToggle);
            addListener(document.getElementById("shaxWork"), "change", unpedia.handleChronologyToggle);
            addListener(document.getElementById("dateCulture"), "change", unpedia.handleChronologyToggle);
            addListener(document.getElementById("dateHistory"), "change", unpedia.handleChronologyToggle);
        }
    },


    /**
     * Toggle visibility of dates in the chronology when checkbox is checked/unchecked.
     * @author Christophe Strobbe
     */
    toggleChronologyVisibility: function(target, type) {
        "use scrict";
        var status, elems, i;
        if (DEBUG) console.log("Event: target.id=" + target.getAttribute("id") + "; class=" + target.getAttribute("class") + "; type=" + type);

        status = target.getAttribute("checked");
        if (DEBUG) console.log("Old status = " + (status ? status: "unchecked"));
        // Fetch all elements with the same class as the checkbox:
        elems = document.getElementsByClassName(target.getAttribute("class"));

        if (status) {
            target.removeAttribute("checked");
            for (i = 0; i < elems.length; i++) {
                if (elems[i].nodeName.toLowerCase() == "dt" || elems[i].nodeName.toLowerCase() == "dd") {
                    elems[i].setAttribute("hidden", "hidden"); // @@temporary hack
                }
            }
        } else {
            target.setAttribute("checked", "checked");
            for (i = 0; i < elems.length; i++) {
                if (elems[i].nodeName.toLowerCase() == "dt" || elems[i].nodeName.toLowerCase() == "dd") {
                    elems[i].removeAttribute("hidden"); // @@temporary hack
                }
            }
        }

        if (DEBUG) {
            status = target.getAttribute("checked");
            console.log("New status = " + (status ? status: "unchecked"));
        }
    },


    /**
     * Add change listeners to the checkboxes.
     * @author Christophe Strobbe
     */
    handleChronologyToggle: function(event) {
        "use scrict";
        // @@TODO replace with DOMhelp.stopDefault(event) and DOMhelp.stopBubble(event)
        event.preventDefault();
        event.stopPropagation();
        unpedia.toggleChronologyVisibility(event.target, event.type);
    }

};


addLoadEvent(function() {
    "use strict";
    // Check support for W3C DOM. (C. Heilmann: Beginning JavaScript Development ..., p. 66-68.)
    if (!document.getElementById || !document.createTextNode) {return;}
    unpedia.init();
});


