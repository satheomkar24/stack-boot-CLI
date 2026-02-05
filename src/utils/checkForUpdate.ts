export async function checkForUpdate(currentVersion: string) {
  try {
    const res = await fetch("https://registry.npmjs.org/@stackboot/cli");
    const data = await res.json();
    const latest = data["dist-tags"].latest;

    if (latest !== currentVersion) {
      console.log(`
⚠️  New version available: ${latest}
   Update with: npm install -g @stackboot/cli@latest
`);
    }
  } catch {
    // silently ignore if offline or error
  }
}
