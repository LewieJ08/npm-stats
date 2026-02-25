#!/usr/bin/env node

import { Command } from "commander";
import { baseCommand } from "./commands/base";

const program = new Command('npmstats');

program 
    .description('A cli tool to view download stats for npm packages')
    .argument('[pkg]', 'npm Package')
    .action((pkg?: string) => {
        pkg ? baseCommand(pkg) : program.help();
    })

program.parse();



















