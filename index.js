const fetch = require("node-fetch");
const fsPromises = require("fs").promises;

async function main() {
  const response = await fetch("https://iptv-org.github.io/iptv/channels.json");
  if (response.status < 200 || response.status >= 300) {
    throw new Error("wrong status code");
  }
  const json = await response.json();
  console.log(`successfully fetch iptv channels`);

  await fsPromises.rmdir("./dist", { recursive: true });
  console.log(`successfully deleted ./dist`);

  await fsPromises.mkdir("./dist");
  console.log(`successfully create ./dist`);

  await fsPromises.writeFile("./dist/channels.json", JSON.stringify(json));
  console.log(`successfully write channels.json`);

  await fsPromises.copyFile("./template/index.html", `./dist/index.html`);
  await fsPromises.copyFile("./template/index.css", `./dist/index.css`);
  await fsPromises.copyFile("./template/favicon.ico", `./dist/favicon.ico`);
  console.log(`successfully copy asset files`);
}

main();
