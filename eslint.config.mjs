import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@next/next/no-img-element": "off",
    },
  }),
  {
    ignores: [    '.next/**',
    '.git/**',
    '.vscode/**',
    '.vercel/**',
    'coverage/**',
    'node_modules/**',
    'dist/**',
    'public/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '**/node_modules/',],
  },
];

export default eslintConfig;
