import fs from "fs-extra";
import path from "path";

export async function updatePackageJson(projectPath: string, version: string) {
  const pkgPath = path.join(projectPath, "package.json");
  const pkg = await fs.readJson(pkgPath);

  pkg.dependencies = pkg.dependencies || {};
  pkg.dependencies.react = version;
  pkg.dependencies["react-dom"] = version;

  await fs.writeJson(pkgPath, pkg, { spaces: 2 });
}
