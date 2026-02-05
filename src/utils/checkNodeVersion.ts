export function checkNodeVersion() {
  const major = Number(process.versions.node.split(".")[0]);
  console.log("📢[checkNodeVersion.ts:3]: major: ", major);

  if (major < 18) {
    console.warn(`
⚠️  Node.js ${process.versions.node} detected
    Stack Boot CLI works best with Node 18 or newer
`);
  }
}
