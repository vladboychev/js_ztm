#!/usr/bin/env node

import fs from "fs";
import chalk from "chalk";
import path from "path";

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    throw new Error(err);
  }

  /*
  Implementation v0
  BAD CODE!!!
  for (let filename of filenames) {
    fs.lstat(filename, (err, stats) => {
      if (err) {
        throw new Error(err);
      }
      console.log(filename, stats.isFile());
    });
  }
  BAD CODE!!!
  */

  /*Implementation v1
  const allStats = Array(filenames.length).fill(null);

  for (let filename of filenames) {
    const index = filenames.indexOf(filename);

    fs.lstat(filename, (err, stats) => {
      if (err) {
        throw new Error(err);
      }

      allStats[index] = stats;

      const arrayIsFull = allStats.every((stats) => {
        return stats;
      });

      if (arrayIsFull) {

        allStats.forEach((stats, index) => {
          if (stats.isFile()) {
            console.log(chalk.red(`${filenames[index]}`));
          } else {
            console.log(chalk.blue(`${filenames[index]}`));
          }
        });
      }
    });
  }
  */

  // Implementation v2.1
  // const lstat = (filename) => {
  //   return new Promise((resolve, reject) => {
  //     fs.lstat(filename, (err, stats) => {
  //       if (err) {
  //         reject(err);
  //       }

  //       resolve(stats);
  //     });
  //   });
  // };

  // Implementation v2.2
  // const { promisify } = require("util");
  // const lstat = promisify(fs.lstat);

  // Implementation v2.3
  // const { lstat } = fs.promises;

  // let dirColor = "\x1b[32m"; // Green
  // let fileColor = "\x1b[34m"; // Blue
  // let resetColor = "\x1b[0m";

  // for (let filename of filenames) {
  //   try {
  //     const stats = await lstat(filename);

  //     if (stats.isFile()) {
  //       console.log(chalk.blue(filename));
  //     } else {
  //       console.log(chalk.red(filename));
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // Implementation v3
  const { lstat } = fs.promises;

  const statPromises = filenames.map((filename) => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  allStats.forEach((stats, index) => {
    if (stats.isFile()) {
      console.log(chalk.red(`${filenames[index]}`));
    } else {
      console.log(chalk.blue.bold(`${filenames[index]}`));
    }
  });
});
