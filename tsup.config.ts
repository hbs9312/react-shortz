import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./core/src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: "dist",
});
