require("dotenv").config();
const path = require("path");
const fs = require("fs");
const { createKoreFile, createGitHubAdaptor } = require("korefile");
const { uuid } = require("uuidv4");

const ejs = require("ejs");

const version = uuid();

const files = [
  {
    templatePath: "./eks/production.yaml.template",
    generatedPath: "./generated/production.yaml",
    writePath: "eks/production.yaml",
  },

  {
    templatePath: "./eks/deployment.yaml.template",
    generatedPath: "./generated/deployment.yaml",
    writePath: "eks/deployment.yaml",
  },

  {
    templatePath: "./drone.yml.template",
    generatedPath: "./generated/drone.yml",
    writePath: ".drone.yml",
  },
];

files.forEach((file) => {
  const template = fs.readFileSync(
    path.join(__dirname, file.templatePath),
    "utf8"
  );
  const result = ejs.render(template, { version });

  fs.writeFileSync(file.generatedPath, result);

  console.log(`Wrote: ${file.generatedPath}`);
});

const koreFile = createKoreFile({
  adaptor: createGitHubAdaptor({
    owner: "iandjx",
    repo: "programmatic-commit",
    ref: "heads/main",
    token: process.env.GH_TOKEN,
  }),
});

(async () => {
  for (const file of files) {
    const yamlFile = fs.readFileSync(path.join(__dirname, file.generatedPath));

    await koreFile.writeFile(file.writePath, yamlFile);
  }
})();
