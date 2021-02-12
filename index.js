require("dotenv").config();

const { createKoreFile, createGitHubAdaptor } = require("korefile");
const koreFile = createKoreFile({
  adaptor: createGitHubAdaptor({
    owner: "iandjx",
    repo: "programmatic-commit",
    ref: "heads/master",
    token: process.env.GH_TOKEN,
  }),
});
(async () => {
  // file path should be relative
  const testFilePath = "file.test";
  // write
  await koreFile.writeFile(testFilePath, "hello");
  // read
  const content = await koreFile.readFile(testFilePath);
  console.log(content);
  // delete
  //   await koreFile.deleteFile(testFilePath);
})();
