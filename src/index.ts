#!/usr/bin/env node

import { Command } from "commander";
import { npmstats } from "./commands/npmstats";

const program = new Command('npmstats');

program 
    .description('A cli tool to view download stats for npm packages')
    .argument('[pkg]', 'npm Package')
    .action((pkg?: string) => {
        pkg ? npmstats(pkg) : program.help();
    })

program.parse();



















