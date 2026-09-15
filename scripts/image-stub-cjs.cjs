/**
 * The CommonJS half of the image stub. tsx compiles these modules through
 * Node's CJS loader, so registering an ESM hook alone is not enough: each
 * image extension also needs a require handler, or Node tries to parse a PNG
 * as JavaScript.
 */
const Module = require("node:module");

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg"];

for (const ext of IMAGE_EXTENSIONS) {
  Module._extensions[ext] = (module, filename) => {
    const stub = { src: filename.split("\\").join("/"), width: 0, height: 0 };
    // Reached as both `import x from "./a.jpg"` and `require(...)`, so the
    // stub has to be its own default.
    stub.default = stub;
    module.exports = stub;
  };
}
