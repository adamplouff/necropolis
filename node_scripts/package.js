import { renameSync } from 'fs'
import fse from 'fs-extra'
import { readdir } from 'fs/promises'
import { fork, exec } from 'child_process'
import readdirp from 'readdirp'
import { homedir } from 'os'
import path from 'path'
import AdmZip from 'adm-zip'
import chalk from 'chalk'

const { name, version, docsURL } = await fse.readJson('./package.json')

const devmode = process.env.NODE_ENV === 'development'
const outdir = devmode ? 'build' : 'dist'

const curDir = path.resolve(outdir)
const foundScripts = await readdirp.promise(curDir, { fileFilter: '*.jsx' })
const scripts = foundScripts.map((f) => f.fullPath)
const exportJSXBin = await getExtensionPath()

const packageName = `${name}_${version}`
const archiveDirectory = `./archive/`
try { fse.removeSync(`${archiveDirectory}${packageName}.zip`) } catch (error) { } // delete zip file if it exists

// try creating the folders
try { fse.mkdirSync(archiveDirectory) } catch (error) { }

// jsxbin each script
scripts.forEach((script) => {
    fork(exportJSXBin, ['-f', '-n', script])
    .on('close', () => {
      renameSync(`${script}bin`, script)
    })
})
zipDirectory()


async function zipDirectory() {
  try {
      const zip = new AdmZip()

      /// manual url file
      const manualData = `[InternetShortcut]
URL=${docsURL}`
      zip.addFile(`${name} manual.url`, manualData)

      //// package folder
      try {
        zip.addLocalFolder(`./package`)
      } catch (error) { }

      //// jsx file
      zip.addLocalFile(`./dist/${name}.jsx`)

      zip.writeZip(`./archive/${packageName}.zip`)

      boxLog(`✔ ${packageName} created at ${archiveDirectory}`)
  } catch (error) {
      console.error(error)
  }
}


async function getExtensionPath() {
    const extensionsPath = path.join(homedir(), '.vscode', 'extensions')
    const extensions = await readdir(extensionsPath)
    const extensionName = 'adobe.extendscript-debug'
    const extendscript = extensions.find((f) => f.includes(extensionName))
    return path.join(extensionsPath, extendscript, 'public-scripts', 'exportToJSXBin.js')
}

function boxLog(str, color, padded = false) {
  console.log("");
  if (/green/.test(color)) {
    console.log(
      `${padded ? "  " : ""}  ${chalk.black.bgGreen(
        `  ${str.toUpperCase()}  `
      )}`
    );
  } else {
    console.log(
      `${padded ? "  " : ""}  ${chalk.black.bgBlue(
        `  ${str.toUpperCase()}  `
      )}`
    );
  }
  console.log("");
}