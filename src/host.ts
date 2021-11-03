(function (thisObj) {

    var JSON; JSON || (JSON = {}); (function () { function k(a) { return a < 10 ? "0" + a : a } function o(a) { p.lastIndex = 0; return p.test(a) ? '"' + a.replace(p, function (a) { var c = r[a]; return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + a + '"' } function l(a, j) { var c, d, h, m, g = e, f, b = j[a]; b && typeof b === "object" && typeof b.toJSON === "function" && (b = b.toJSON(a)); typeof i === "function" && (b = i.call(j, a, b)); switch (typeof b) { case "string": return o(b); case "number": return isFinite(b) ? String(b) : "null"; case "boolean": case "null": return String(b); case "object": if (!b) return "null"; e += n; f = []; if (Object.prototype.toString.apply(b) === "[object Array]") { m = b.length; for (c = 0; c < m; c += 1)f[c] = l(c, b) || "null"; h = f.length === 0 ? "[]" : e ? "[\n" + e + f.join(",\n" + e) + "\n" + g + "]" : "[" + f.join(",") + "]"; e = g; return h } if (i && typeof i === "object") { m = i.length; for (c = 0; c < m; c += 1)typeof i[c] === "string" && (d = i[c], (h = l(d, b)) && f.push(o(d) + (e ? ": " : ":") + h)) } else for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (h = l(d, b)) && f.push(o(d) + (e ? ": " : ":") + h); h = f.length === 0 ? "{}" : e ? "{\n" + e + f.join(",\n" + e) + "\n" + g + "}" : "{" + f.join(",") + "}"; e = g; return h } } if (typeof Date.prototype.toJSON !== "function") Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + k(this.getUTCMonth() + 1) + "-" + k(this.getUTCDate()) + "T" + k(this.getUTCHours()) + ":" + k(this.getUTCMinutes()) + ":" + k(this.getUTCSeconds()) + "Z" : null }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () { return this.valueOf() }; var q = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, p = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e, n, r = { "\u0008": "\\b", "\t": "\\t", "\n": "\\n", "\u000c": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, i; if (typeof JSON.stringify !== "function") JSON.stringify = function (a, j, c) { var d; n = e = ""; if (typeof c === "number") for (d = 0; d < c; d += 1)n += " "; else typeof c === "string" && (n = c); if ((i = j) && typeof j !== "function" && (typeof j !== "object" || typeof j.length !== "number")) throw Error("JSON.stringify"); return l("", { "": a }) }; if (typeof JSON.parse !== "function") JSON.parse = function (a, e) { function c(a, d) { var g, f, b = a[d]; if (b && typeof b === "object") for (g in b) Object.prototype.hasOwnProperty.call(b, g) && (f = c(b, g), f !== void 0 ? b[g] = f : delete b[g]); return e.call(a, d, b) } var d, a = String(a); q.lastIndex = 0; q.test(a) && (a = a.replace(q, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) })); if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return d = eval("(" + a + ")"), typeof e === "function" ? c({ "": d }, "") : d; throw new SyntaxError("JSON.parse"); } })();

    //================ VARIABLES ======================
    let scriptName = 'Umf'
    let scriptVersion = '0.1.0'
    let author = 'adamplouff@'

    let thisComp

    /**
     * Set the current comp to the var thisComp
     * @returns {boolean}           - if there is an available comp
     */
    function setComp(): boolean {
        if (app.activeViewer == null) { return false; }
        /// activate the comp window
        app.activeViewer.setActive();
        thisComp = app.project.activeItem;
        /// Make sure a comp is selected
        if (!thisComp || !(thisComp instanceof CompItem)) {
            return false;
        }
        return true;
    }

    /**
     * create clickable web links from AE
     *
     * @param {string} url - web url
     */
    function visitURL(url: string) {
        if ($.os.indexOf('Windows') != -1) {
            system.callSystem('cmd /c "' + Folder.commonFiles.parent.fsName + "\\Internet Explorer\\iexplore.exe" + '" ' + url);
        } else {
            let cmd = 'open "' + url + '"';
            system.callSystem(cmd);
        }
    }

    /**
     * Draw the interface
     * 
     * @returns 
     */
    function buildUI() {
        /*
        Code for Import https://scriptui.joonas.me — (Triple click to select):
        {"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"myPanel","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":true},"text":"Dialog","preferredSize":[240,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["fill","top"]}},"item-1":{"id":1,"type":"Button","parentId":0,"style":{"enabled":true,"varName":"btn_click","text":"Button","justify":"center","preferredSize":[0,0],"alignment":"fill","helpTip":null}},"item-3":{"id":3,"type":"StaticText","parentId":0,"style":{"enabled":true,"varName":"txt_about","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"About","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,1,3],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"},"activeId":1}
        */
        let myPanel = (thisObj instanceof Panel) ? thisObj : new Window('palette', scriptName, undefined, { resizeable: true });

        //stop if there's no window
        if (myPanel === null) return;

        myPanel.orientation = "column";
        myPanel.alignChildren = ["left", "top"];
        // myPanel.preferredSize.width = 300;
        myPanel.spacing = 4;
        myPanel.margins = 12;



        let btn_click = myPanel.add("button", undefined, undefined, { name: "btn_click" });
        btn_click.text = "Button";
        btn_click.alignment = ["fill", "top"];

        let txt_about = myPanel.add("statictext", undefined, undefined, { name: "txt_about" });
        txt_about.text = "About";


        txt_about.text = `${scriptName} - ${scriptVersion} // ${author}`

        myPanel.onResizing = myPanel.onResize = function () {
            myPanel.layout.resize();
        };

        if (myPanel instanceof Window) {
            myPanel.center();
            myPanel.show();
        } else {
            myPanel.layout.layout(true);
            myPanel.layout.resize();
        }

        /**************************************************************************
         * Button functionality ***************************************************
         **************************************************************************/

        btn_click.onClick = function () {
            alert('button click')
        }
    }

    let isKBarRunning = (typeof kbar !== 'undefined');

    if (isKBarRunning && kbar.button) {
        let button = kbar.button;  // Make a local copy of the kbar variable and button.

        switch (button.argument.toLowerCase()) {
            case 'run':     // Kbar argument name
                // run the modal
                // alert('butt')
                buildUI()
                break;

            default:
                buildUI()
                break;
        }
    }
    else {
        buildUI()
    }

})(this);
