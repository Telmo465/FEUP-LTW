var http = require('http');
var path = require('path');
const url = require('url');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Username:', username => {
});
readline.question('Password:', password => {
  console.log(`Hello, ${username}! Welcome to the game!`);
});

const fs = require('fs').promises;

async function openFile() {
  try {
    const csvHeaders = 'username,password'
    await fs.writeFile('mancala.csv', csvHeaders);
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

async function addPlayer(username, password) {
  try {
    const csvLine = `\n${username},${password}`
    await fs.writeFile('mancala.csv', csvLine, { flag: 'a' });
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}
