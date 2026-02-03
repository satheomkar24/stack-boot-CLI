import fs from "fs-extra";
import path from "path";

export async function mergeVariant(variantPath: string, projectPath: string) {
  if (!fs.existsSync(variantPath)) return;

  const entries = await fs.readdir(variantPath, { withFileTypes: true });

  for (const entry of entries) {
    const src = path.join(variantPath, entry.name);
    const dest = path.join(projectPath, entry.name);

    if (entry.isDirectory()) {
      await fs.ensureDir(dest);
      await mergeVariant(src, dest);
      continue;
    }

    // file case
    if (await fs.pathExists(dest)) {
      console.warn(`⚠️ Skipped existing file: ${dest}`);
      continue;
    }

    await fs.copyFile(src, dest);
  }
}
