export function generatePackageJson(): string {
  const pkg = {
    name: "generated-site",
    private: true,
    version: "0.0.1",
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
    },
    dependencies: {
      next: "16.1.6",
      react: "19.2.3",
      "react-dom": "19.2.3",
      "tailwind-merge": "^3.3.1",
      "tailwindcss-animate": "^1.0.7",
    },
    devDependencies: {
      "@tailwindcss/postcss": "^4",
      "@types/node": "^20",
      "@types/react": "^19",
      "@types/react-dom": "^19",
      eslint: "^9",
      "eslint-config-next": "16.1.6",
      tailwindcss: "^4",
      typescript: "^5",
    },
  };

  return JSON.stringify(pkg, null, 2);
}
