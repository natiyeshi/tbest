/**
 * Lets a plain Node script import `src/lib/content.ts` and friends.
 *
 * Those modules statically import photographs, which only mean something
 * inside Next's build. Here each image resolves to a stub carrying the path it
 * came from, which is all the OG card builder needs — it opens the file itself
 * rather than going through the optimiser.
 */
import { fileURLToPath, pathToFileURL } from "node:url";

const IMAGE = /\.(jpe?g|png|gif|webp|avif|svg)$/i;

export async function resolve(specifier, context, next) {
  if (IMAGE.test(specifier)) {
    const url = new URL(specifier, context.parentURL ?? pathToFileURL(process.cwd() + "/"));
    return { url: url.href, format: "module", shortCircuit: true };
  }
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (IMAGE.test(url)) {
    const path = fileURLToPath(url).replace(/\\/g, "/");
    // Mirrors StaticImageData closely enough for the builder: `src` is the one
    // field it reads, and here it is an absolute path on disk.
    const source = `export default ${JSON.stringify({ src: path, width: 0, height: 0 })};`;
    return { format: "module", source, shortCircuit: true };
  }
  return next(url, context);
}
