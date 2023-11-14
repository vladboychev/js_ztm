const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const render = require("./render");

const rd = fs.promises.readdir;
const lstat = fs.promises.lstat;
const forbiddenDirs = ["node_modules"];

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTests() {
    for (let file of this.testFiles) {
      console.log(chalk.gray(`------ ${file.shortName}`));
      const beforeEaches = [];

      global.render = render;

      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };

      global.it = async (desc, fn) => {
        beforeEaches.forEach((func) => func());
        try {
          await fn();
          console.log(chalk.green("\t", `OK - ${desc}`));
        } catch (err) {
          const message = err.message.replace(/\n/g, "\n\t\t");
          console.log(chalk.red("\t", `X - ${desc}`));
          console.log(chalk.red("\t", message));
        }
      };

      try {
        require(file.name);
      } catch (err) {
        console.log(chalk.re(err));
      }
    }
  }

  async collectFiles(targetPath) {
    const files = await rd(targetPath);

    for (let file of files) {
      const filePath = path.join(targetPath, file);
      const stats = await lstat(filePath);

      if (stats.isFile() && file.includes(".test.js")) {
        this.testFiles.push({
          name: filePath,
          shortName: file,
        });
      } else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
        const childFiles = await rd(filePath);

        files.push(...childFiles.map((f) => path.join(file, f)));
      }
    }
  }
}

module.exports = Runner;
