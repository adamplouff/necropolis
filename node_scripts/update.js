import fse from 'fs-extra'
import inquirer from 'inquirer'
import chalk from 'chalk'

const { name, version } = await fse.readJson('./package.json')

async function updateVersion() {
console.log(
    `${chalk.blue(name)} is currently ${chalk.green(
      `v${version}`
    )}`
  );
  console.log("");
  let answer = await inquirer.prompt([
    {
      type: "confirm",
      name: "shouldUpdate",
      message: `Update version?`,
      default: true
    }
  ]);
  if (answer.shouldUpdate) {
    let answerVersion = await findTier(version.split("."));
    let ans = await promptNewNumber(
      version.split(".")[answerVersion.versionIndex]
    );
    let newVersion = version.split(".");
    newVersion[answerVersion.versionIndex] = ans.newTier;
    let updated = setVersion(version, newVersion);

    boxLog(`✔ ${name} updated to v${updated}`);
  } else {
    console.log("");
    console.log(`   All right! No changes will be made.`);
    // endMessage();
  }
  return "";
};

updateVersion()


async function findTier(original) {
    return await inquirer.prompt([
      {
        type: "list",
        name: "versionIndex",
        message: "Choose tier to update",
        choices: [
          {
            name: `Major (${original[0]}.x.x)`,
            value: 0
          },
          {
            name: `Minor (x.${original[1]}.x)`,
            value: 1
          },
          {
            name: `Micro (x.x.${original[2]})`,
            value: 2
          }
        ]
      }
    ]);
  }

  async function promptNewNumber(old) {
    return await inquirer.prompt([
      {
        type: "Number",
        message: "Enter new value for tier",
        default: +old + 1,
        name: "newTier"
      }
    ]);
  }

  function setVersion(older, newer) {
    //// extension
    // let xml = fse.readFileSync(`./CSXS/manifest.xml`, { encoding: "utf-8" });
    // let rx = new RegExp(`${older.split(".").join("\\.")}`);
    // xml = xml.split(rx).join(newer.join("."));
    // fse.writeFileSync(`./CSXS/manifest.xml`, xml);

    //// script
    let xml = fse.readFileSync(`./src/host.ts`, { encoding: "utf-8" });
    let rx = new RegExp(`${older.split(".").join("\\.")}`);
    xml = xml.split(rx).join(newer.join("."));
    fse.writeFileSync(`./src/host.ts`, xml);
  
    //// package.json
    let jsondata = fse.readFileSync("./package.json", { encoding: "utf-8" });
    let jsonrx = /\"version\"\:\s\"[^\"]*/;
    jsondata = jsondata.split(jsonrx).join(`\"version\"\: \"${newer.join(".")}`);
    fse.writeFileSync(`./package.json`, jsondata);
  
    return newer.join(".");
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