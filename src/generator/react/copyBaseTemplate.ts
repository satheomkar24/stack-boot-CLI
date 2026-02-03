import fs from "fs-extra";

export async function copyBaseTemplate(basePath: string, projectPath: string) {
  await fs.copy(basePath, projectPath, {
    overwrite: false,
    errorOnExist: false,
  });
}
