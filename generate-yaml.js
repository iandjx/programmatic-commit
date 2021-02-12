const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const environment = process.argv[2];
const sha = process.argv[3];

const template = fs.readFileSync(path.join(__dirname, `./${environment}.yaml.template`), 'utf8')
const yamlFile = ejs.render(template, { sha });

fs.writeFileSync(`./${environment}.yaml`, yamlFile);

console.log(`Wrote: ${environment}.yaml`);
