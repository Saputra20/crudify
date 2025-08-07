#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { execSync } = require("child_process");
const { version } = require("../package.json");
const generator = require("../commands/generator");

program
  .name("crudify")
  .description("Vodjo Express CRUD generator CLI")
  .version(version);

program
  .command("generate <name>")
  .alias("g")
  .description("Generate CRUD files for a given name")
  .option("-c, --controller", "Include controller file")
  .option("-r, --route", "Include route file")
  .option("-v, --validation", "Include validation files")
  .option("-s, --service", "Include service file")
  .option(
    "-a, --attributes <attributes>",
    "Comma-separated list of attributes for the entity"
  )
  .action(generator);

program.parse();
