# Necropolis
Typescript ScriptUI starter template. Run as a resizable ScriptUI Panel, headless, or from [Kbar](https://aescripts.com/kbar/). 

Includes:
- JSON
- Footer info system
- Simplified button stack building

<img src="docs/NecropolisPanel.png" width="240">


# Documentation

### Main variables

Update these to change the footer.

```js
const scriptName = 'Necropolis'
const scriptVersion = '0.1.0'
const releaseYear = '2021'
const author = 'Battle Axe'
const helpURL = 'https://battleaxe.co/'
```
- `releaseYear` will create a copyright range from the first release to the current year, or a single year if the release and current years match.
- `helpURL` becomes the link in the [ ? ] button. Remove or leave blank to remove this link. 

### Buttons
Within the `buildUI()` function, is an array of button objects. Add new buttons with a reference to the func they should call as strings.

```js
const buildUI = () => {
    const buttons = [
        {
            text: 'Do cool shit',
            func: 'mainFunc()',
            helpTip: 'This is a tooltip'
        },
    ]
...
```


### Kbar support
A template for [Kbar arguments](https://bitbucket.org/kraftyfx/kbar/issues/105/let-consuming-scripts-know-if-and-how-they) is included. 

```js 
switch (button.argument.toLowerCase()) {
    case 'run':     // Kbar argument name
        mainFunc()
        break;

    default:
        buildUI()
        break;
}
```