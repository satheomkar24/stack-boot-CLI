import https from "https";

function fetchPackage(pkg: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https
      .get(`https://registry.npmjs.org/${pkg}`, (res) => {
        let data = "";
        res.on("data", (d) => (data += d));
        res.on("end", () => resolve(JSON.parse(data)));
      })
      .on("error", reject);
  });
}

export async function resolveReactVersion(
  major: number | null,
): Promise<string> {
  const data = await fetchPackage("react");
  const versions = Object.keys(data.versions);

  if (!major) {
    return data["dist-tags"].latest;
  }

  const matches = versions
    .filter((v) => v.startsWith(`${major}.`))
    .sort((a, b) => (a > b ? -1 : 1));

  if (!matches.length) {
    throw new Error(`No React version found for ${major}`);
  }

  return matches[0];
}
