import path from "path";
import fs from "fs-extra";

import { parseTarget } from "../../utils/parseTarget.js";
import { copyBaseTemplate } from "./copyBaseTemplate.js";
import { mergeVariant } from "./mergeVariant.js";
import { generateRoutesIndex } from "./generateRoutesIndex.js";
import { resolveReactVersion } from "./resolveReactVersion.js";
import { updatePackageJson } from "./updatePackageJson.js";

function resolveVariants(input: string[]) {
  const set = new Set(["base"]);

  if (input.includes("auth")) set.add("auth");
  if (input.includes("admin")) {
    set.add("auth");
    set.add("admin");
  }

  return Array.from(set) as ("base" | "auth" | "admin")[];
}

export async function createProject({
  name,
  target,
  variants,
}: {
  name: string;
  target: string;
  variants: string[];
}) {
  const projectPath = path.resolve(name);

  if (fs.existsSync(projectPath)) {
    throw new Error("Folder already exists");
  }

  const { framework, major } = parseTarget(target);
  const finalVariants = resolveVariants(variants);

  await copyBaseTemplate(`templates/${framework}/base`, projectPath);

  for (const v of finalVariants) {
    if (v !== "base") {
      await mergeVariant(`templates/${framework}/${v}`, projectPath);
    }
  }

  await generateRoutesIndex(projectPath, finalVariants);

  const reactVersion = await resolveReactVersion(major);

  if (major !== 18) {
    console.warn(`
⚠️  Warning:
This template is tested with React 18.
You selected React ${reactVersion}.

Some dependencies may not be compatible with this version.
If you face dependency issues, you can try:

  npm install --force

Otherwise, you may need to manually adjust dependency versions.
`);
  }

  await updatePackageJson(projectPath, reactVersion);
}
