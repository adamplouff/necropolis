(function (thisObj) {

    //@ts-ignore
    var JSON; JSON || (JSON = {}); (function () { function k(a) { return a < 10 ? "0" + a : a } function o(a) { p.lastIndex = 0; return p.test(a) ? '"' + a.replace(p, function (a) { var c = r[a]; return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + a + '"' } function l(a, j) { var c, d, h, m, g = e, f, b = j[a]; b && typeof b === "object" && typeof b.toJSON === "function" && (b = b.toJSON(a)); typeof i === "function" && (b = i.call(j, a, b)); switch (typeof b) { case "string": return o(b); case "number": return isFinite(b) ? String(b) : "null"; case "boolean": case "null": return String(b); case "object": if (!b) return "null"; e += n; f = []; if (Object.prototype.toString.apply(b) === "[object Array]") { m = b.length; for (c = 0; c < m; c += 1)f[c] = l(c, b) || "null"; h = f.length === 0 ? "[]" : e ? "[\n" + e + f.join(",\n" + e) + "\n" + g + "]" : "[" + f.join(",") + "]"; e = g; return h } if (i && typeof i === "object") { m = i.length; for (c = 0; c < m; c += 1)typeof i[c] === "string" && (d = i[c], (h = l(d, b)) && f.push(o(d) + (e ? ": " : ":") + h)) } else for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (h = l(d, b)) && f.push(o(d) + (e ? ": " : ":") + h); h = f.length === 0 ? "{}" : e ? "{\n" + e + f.join(",\n" + e) + "\n" + g + "}" : "{" + f.join(",") + "}"; e = g; return h } } if (typeof Date.prototype.toJSON !== "function") Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + k(this.getUTCMonth() + 1) + "-" + k(this.getUTCDate()) + "T" + k(this.getUTCHours()) + ":" + k(this.getUTCMinutes()) + ":" + k(this.getUTCSeconds()) + "Z" : null }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () { return this.valueOf() }; var q = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, p = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e, n, r = { "\u0008": "\\b", "\t": "\\t", "\n": "\\n", "\u000c": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, i; if (typeof JSON.stringify !== "function") JSON.stringify = function (a, j, c) { var d; n = e = ""; if (typeof c === "number") for (d = 0; d < c; d += 1)n += " "; else typeof c === "string" && (n = c); if ((i = j) && typeof j !== "function" && (typeof j !== "object" || typeof j.length !== "number")) throw Error("JSON.stringify"); return l("", { "": a }) }; if (typeof JSON.parse !== "function") JSON.parse = function (a, e) { function c(a, d) { var g, f, b = a[d]; if (b && typeof b === "object") for (g in b) Object.prototype.hasOwnProperty.call(b, g) && (f = c(b, g), f !== void 0 ? b[g] = f : delete b[g]); return e.call(a, d, b) } var d, a = String(a); q.lastIndex = 0; q.test(a) && (a = a.replace(q, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) })); if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return d = eval("(" + a + ")"), typeof e === "function" ? c({ "": d }, "") : d; throw new SyntaxError("JSON.parse"); } })();

    //================ VARIABLES ======================
    const scriptName = 'Necropolis'
    const scriptVersion = '0.1.0'
    const releaseYear = '2021'
    const author = 'Battle Axe'
    const helpURL = 'https://battleaxe.co/'

    let thisComp

    const mainFunc = () => {
        thisComp = getActiveComp()
        if (!thisComp) { return }

        alert(thisComp.name)

        function getActiveComp(): CompItem  {
            if (!app.activeViewer) { return null }
            /// activate the comp window
            app.activeViewer.setActive();
            const thisComp = app.project.activeItem;
            /// Make sure a comp is selected
            if (!thisComp || !(thisComp instanceof CompItem)) {
                return null;
            }
            return thisComp;
        }
    }

    const buildUI = () => {
        const buttons = [
            {
                text: 'Do cool shit',
                func: 'mainFunc()',
                helpTip: 'This is a tooltip'
            },
        ]


        let myPanel = (thisObj instanceof Panel) ? thisObj : new Window('palette', scriptName, undefined, { resizeable: true });

        if (myPanel === null) return;       //stop if there's no window

        myPanel.orientation = "column";
        myPanel.alignChildren = ["left", "fill"];
        myPanel.preferredSize.width = 240;
        myPanel.spacing = 8;
        myPanel.margins = 12;


        addButtonsToPanel(buttons, myPanel)

        function addButtonsToPanel (buttons, panel) {
            const uiButtons = buttons.map(button => {
                const newButton = panel.add("button", undefined, undefined)
                newButton.text = button.text
                newButton.helpTip = button.helpTip
                newButton.alignment = ["fill", "top"];
                newButton.onClick = () => {
                    try {
                        eval(button.func)
                    } catch (e) { alert(e.toString() + "\nError on line: " + e.line.toString());}
                }
                return newButton
            })
        }

        const aboutGroup = myPanel.add('group')
        aboutGroup.orientation = "column"
        aboutGroup.spacing = 2
        aboutGroup.alignment = ['fill', 'bottom']
        aboutGroup.alignChildren = ['left', 'bottom']
            
        const ccYear = (year?: string) => {
            const currentYear = new Date().getFullYear().toString()
            if (!year) { return currentYear }

            let ccYear = year
            if (year != currentYear) {
                ccYear += `-${currentYear}`
            }

            return ccYear
        }

        aboutGroup.add('statictext', undefined, `${scriptName} - ${scriptVersion}`);
        const coInfo = aboutGroup.add('group')
        coInfo.alignment = ['fill', 'top']
        coInfo.add('statictext', undefined, `©${ccYear(releaseYear)} ${author}`);

        if (typeof helpURL !== 'undefined') {
            const helpButton = coInfo.add('button', [0,0,16,16], '?')
            helpButton.helpTip = 'Learn stuff'
            helpButton.alignment = ['right', 'top']
    
            helpButton.onClick = () => {
                visitURL(helpURL)
            }

            function visitURL(url: string) {
                if ($.os.indexOf('Windows') != -1) {
                    system.callSystem('cmd /c "' + Folder.commonFiles.parent.fsName + "\\Internet Explorer\\iexplore.exe" + '" ' + url);
                } else {
                    let cmd = 'open "' + url + '"';
                    system.callSystem(cmd);
                }
            }
        }

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
    }

    let isKBarRunning = (typeof kbar !== 'undefined');

    if (isKBarRunning && kbar.button) {
        let button = kbar.button;  // Make a local copy of the kbar variable and button.

        switch (button.argument.toLowerCase()) {
            case 'ui':     // Kbar argument name
                buildUI()
                break;

            default:
                mainFunc()
                break;
        }
    }
    else {
        buildUI()
    }

})(this);
