import fs from "fs-extra";
import path from "path";
import { toPackageName } from "./toPackageName.js";

export async function updatePackageJson({
  projectName,
  projectPath,
  reactVersion = undefined,
}: {
  projectPath: string;
  projectName: string;
  reactVersion?: string | undefined;
}) {
  const pkgPath = path.join(projectPath, "package.json");
  const pkg = await fs.readJson(pkgPath);

  pkg.name = toPackageName(projectName);

  if (reactVersion) {
    pkg.dependencies = pkg.dependencies || {};
    pkg.dependencies.react = `^${reactVersion}`;
    pkg.dependencies["react-dom"] = `^${reactVersion}`;
  }

  await fs.writeJson(pkgPath, pkg, { spaces: 2 });
}
