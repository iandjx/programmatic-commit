require("dotenv").config();
const path = require("path");
const fs = require("fs");
const { createKoreFile, createGitHubAdaptor } = require("korefile");
const koreFile = createKoreFile({
  adaptor: createGitHubAdaptor({
    owner: "iandjx",
    repo: "programmatic-commit",
    ref: "heads/main",
    token: process.env.GH_TOKEN,
  }),
});
(async () => {
  // file path should be relative
  const text = fs.readFileSync(path.join(__dirname, "foo.js"));

  const testFilePath = "file/foo";
  // write
  await koreFile.writeFile(testFilePath, text);
  // read
  const content = await koreFile.readFile(testFilePath);
  console.log(content);
  // delete
  //   await koreFile.deleteFile(testFilePath);
})();
