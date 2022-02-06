export function snakeToCamel(snakeCaseString: string): string {
  const camelCaseString = snakeCaseString.replace(/([-_]\w)/g, (g) =>
    g[1].toUpperCase(),
  );
  return camelCaseString;
}
