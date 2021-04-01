#!/usr/bin/env node
const { Command } = require('commander');
const chalk = require('chalk');
const utils = require('./lib/utils');
const path = require('path');
const { exec } = require('child_process')


const program = new Command('remotr');
program
    .version('0.0.1')
    .requiredOption("-n --name <string>", "remote name")
program.parse()

const options = program.opts();

if (options.name) {
    createGitBareRepo(options.name)
};

function createGitBareRepo(name) {
    console.log(chalk.hex('#0066ff')('creating directories'))
    const bareRepo = path.resolve('/home', name)
    const webDir = path.resolve('/var', 'www')
    const workingDir = path.resolve('/var', 'www', name)

    
    utils.createDirs(bareRepo, webDir, workingDir)
    console.log(chalk.hex('#0066ff')('creating the bare repo'))
    exec(`cd ${bareRepo} && git init --bare`)
    utils.createFile(path.resolve(bareRepo, 'hooks', 'post-receive'), `git --work-tree=${workingDir} --git-dir=${bareRepo}.git checkout -f`)
    console.log(chalk.hex('#0066ff')('bare repo created'))
    console.log(chalk.hex('#0066ff')('ready to go!'))
}