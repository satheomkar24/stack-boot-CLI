import { createNodeProject } from "./generator/node/createProject.js";
import { createReactProject } from "./generator/react/createProject.js";
import { ParsedConfig } from "./types.js";
import { createProjectDirectory } from "./utils/createProjectDirectory.js";
import { logStep } from "./utils/logger.js";
import { verifyVariantName } from "./utils/verifyVariantName.js";

export const STACK_VARIANTS = {
  react: ["base", "auth", "admin"],
  node: ["base", "auth"],
  // fastapi: ["base"],
  // java: ["base"],
} as const;

type Stack = keyof typeof STACK_VARIANTS;

function verifyStackName(stack: string): asserts stack is Stack {
  if (!(stack in STACK_VARIANTS)) {
    const available = Object.keys(STACK_VARIANTS)
      .map((s) => `"${s}"`)
      .join(", ");

    throw new Error(
      `Framework "${stack}" is not supported yet.\n` +
        `  Available frameworks: ${available}`,
    );
  }
}

export async function runCreateCommand(config: ParsedConfig) {
  const { stack, version, variant, projectName, groupId, targetDir } = config;

  logStep(2, "Validating framework");
  verifyStackName(stack);

  logStep(3, "Validating variant name");
  const AVAILABLE_VARIANTS = STACK_VARIANTS[stack];
  verifyVariantName(variant, AVAILABLE_VARIANTS);

  logStep(4, "Creating project directory");
  const { isCurrentDir, projectPath } = await createProjectDirectory(targetDir);

  switch (stack) {
    case "react":
      await createReactProject({
        projectName,
        version: version ? Number(version) : 18,
        variant,
        isCurrentDir,
        projectPath,
      });
      break;

    case "node":
      await createNodeProject({
        projectName,
        variant,
        isCurrentDir,
        projectPath,
      });
      break;

    default:
      // future
      throw new Error(`Framework "${stack}" is not supported yet.`);
  }
}
