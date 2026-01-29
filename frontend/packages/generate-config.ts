export function generateNextConfig(): string {
  return `
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "mctechfiji.s3.us-east-1.amazonaws.com",
    ],
  },
  output: "standalone",
  reactStrictMode: false,
};

export default nextConfig;
`.trim();
}

export function generateGitignore(): string {
  return `
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

`.trim();
}
