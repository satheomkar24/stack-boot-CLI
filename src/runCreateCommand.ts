import { createProject } from "./generator/react/createProject.js";
import { ParsedConfig } from "./types.js";

type NormalizedConfig = {
  stack: string;
  version?: number;
  variants: string[];
  projectName: string;
};

export async function runCreateCommand(config: ParsedConfig) {
  const { stack, version, variant, projectName } = config;

  if (stack === "react") {
    await createProject({
      name: projectName,
      target: `react@${version ?? 18}`,
      variants: [variant],
    });
    return;
  }

  // future
  throw new Error(`Framework "${stack}" is not supported yet.`);
}
