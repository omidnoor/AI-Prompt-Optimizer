const fs = require("fs");
const path = require("path");
const directoryPath = path.join(__dirname, "../../");
const output = fs.createWriteStream("output.txt");

// Asynchronous function to traverse directories
const traverseDirectory = async (dir) => {
  // Check each part of the path to see if it matches the excluded directories
  if (
    dir.includes("node_modules") ||
    dir.includes("traverseAndWrite") ||
    dir.includes(".next") ||
    dir.includes(".git") ||
    dir.includes(".idea") ||
    dir.includes(".vscode")
  ) {
    // console.log(`Skipping directory: ${dir}`);
    return; // Skip the directory if it's excluded
  }
  const files = await fs.promises.readdir(dir);
  // if (pathParts.includes("node_modules")) {
  //   console.log(dir);
  // }
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await fs.promises.stat(filePath);
    if (fileStat.isDirectory()) {
      await traverseDirectory(filePath);
    } else {
      const fileContent = await fs.promises.readFile(filePath, "utf8");
      await fs.promises.appendFile(
        "output.txt",
        `
        File: 
        ${filePath}  
        -------------------------------------
        ${fileContent}
        -------------------------------------
        `
      );
    }
  }
};

// Main execution
traverseDirectory(directoryPath)
  .then(() => console.log("Done"))
  .catch((err) => console.error(err));
