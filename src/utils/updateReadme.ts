import fs from "fs-extra";

export async function updateReadme(readmePath: string, projectName: string) {
  const content = `# ${projectName}

Generated using Stack Boot CLI
`;

  await fs.writeFile(readmePath, content);
}
