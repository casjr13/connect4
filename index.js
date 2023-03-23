#!/usr/bin/env node

import chalk from "chalk";
import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

const age = prompt("How old are you? ");
const ageStr = chalk.red.bold(age);
console.log(`You are ${ageStr} years old.`);