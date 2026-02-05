import fs from "fs-extra";

export async function updateHtmlTitle(
  indexHtmlPath: string,
  projectName: string,
) {
  if (!fs.existsSync(indexHtmlPath)) return;

  let html = await fs.readFile(indexHtmlPath, "utf-8");

  html = html.replace(/<title>.*?<\/title>/, `<title>${projectName}</title>`);

  await fs.writeFile(indexHtmlPath, html);
}
