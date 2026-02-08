import path from "path";
import fs from "fs-extra";
import { isDirEmpty } from "./directoryCheck.js";

export async function createProjectDirectory(targetDir: string) {
  const projectPath = path.resolve(targetDir);
  const isCurrentDir = projectPath === process.cwd();

  if (fs.existsSync(projectPath)) {
    if (!isCurrentDir) {
      throw new Error(
        "Folder already exists\n\n👉 Choose a different name or delete the folder.",
      );
    }

    if (!isDirEmpty(projectPath)) {
      throw new Error(
        "Current directory is not empty\n\n👉 Use an empty folder or choose a different project name.",
      );
    }
  } else {
    await fs.mkdir(projectPath, { recursive: true });
  }
  return { isCurrentDir, projectPath };
}
