# Necropolis
Typescript ScriptUI starter template. Run as a resizable ScriptUI Panel, headless, or from [Kbar](https://aescripts.com/kbar/). 

Includes:
- JSON
- Footer info system
- Simplified button stack building

<img src="https://user-images.githubusercontent.com/8580225/185628520-2794035f-435d-4e53-b74b-534bad95c938.png" width="240">


# Documentation

### Getting started
1. Clone the repo without history
```shell
git clone --depth 1 https://github.com/adamplouff/necropolis.git newProjName
```
or use [Degit](https://github.com/Rich-Harris/degit) to clone without an origin:
```shell
degit https://github.com/adamplouff/necropolis.git   
```
2. Open the project in VS Code and CMD+Shift+F to replace `Necropolis` to your new project name. It's low-tech and simple. 


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
