export function parseTarget(input: string) {
  const [framework, version] = input.split("@");

  return {
    framework,
    major: version ? Number(version) : null,
  };
}
