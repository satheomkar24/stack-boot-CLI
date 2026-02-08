import path from "path";
import { resolveTemplatePath } from "../../utils/resolveTemplatePath.js";
import { log, logStep } from "../../utils/logger.js";
import { copyBaseTemplate } from "../../utils/copyBaseTemplate.js";
import { resolveVariants } from "../../utils/resolveVariants.js";
import { mergeVariant } from "../../utils/mergeVariant.js";
import { updatePackageJson } from "../../utils/updatePackageJson.js";
import { updateReadme } from "../../utils/updateReadme.js";
import { setupEnvFile } from "../../utils/setupEnvFile.js";

interface CreateProjectOptions {
  projectName: string;
  variant: string;
  projectPath: string;
  isCurrentDir: boolean;
}

export async function createNodeProject({
  projectName,
  variant,
  projectPath,
  isCurrentDir,
}: CreateProjectOptions) {
  const framework = "node";
  const finalVariants = resolveVariants(variant);

  const basePath = resolveTemplatePath(`${framework}/base`);

  logStep(5, "Copying template files");
  await copyBaseTemplate(basePath, projectPath);

  for (const v of finalVariants) {
    if (v !== "base") {
      const variantPath = resolveTemplatePath(`${framework}/${v}`);
      await mergeVariant(variantPath, projectPath);
    }
  }

  logStep(6, "Updating package name");
  await updatePackageJson({ projectPath, projectName });

  logStep(7, "Updating README.md");
  const readmePath = path.join(projectPath, "README.md");
  await updateReadme(readmePath, projectName);

  logStep(8, "Finalizing setup");
  await setupEnvFile(projectPath);
  const cdCommand = isCurrentDir ? "." : projectName;

  log.success(`
🎉 Project created successfully!

Next steps:

1️⃣  Move into your project:
   cd ${cdCommand}

2️⃣  Environment file ready
   ✏️  Update values inside .env as needed

3️⃣  Install dependencies:
   npm install

4️⃣  Start development server:
   npm run dev

Happy hacking 🚀
`);
}
