const fs = require("fs");
const path = require("path");

const rd = fs.promises.readdir;
const lstat = fs.promises.lstat;

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async collectFiles(targetPath) {
    const files = await rd(targetPath);

    for (let file of files) {
      const filePath = path.join(targetPath, file);
      const stats = await lstat(filePath);

      if (stats.isFile() && file.includes(".test.js")) {
        this.testFiles.push({
          name: filePath,
        });
      } else if (stats.isDirectory()) {
        const childFiles = await rd(filePath);

        files.push(...childFiles.map((f) => path.join(file, f)));
      }
    }
  }
}

module.exports = Runner;
