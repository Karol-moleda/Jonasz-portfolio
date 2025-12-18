import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const projectRoot = process.cwd();
const inputPngPath = path.join(projectRoot, 'public', 'favicon-v2.png');
const outputIcoPath = path.join(projectRoot, 'public', 'favicon.ico');

const sizes = [16, 32, 48, 64, 128, 256];

async function main() {
  const pngBuffer = await fs.readFile(inputPngPath);

  const resizedBuffers = await Promise.all(
    sizes.map((size) => sharp(pngBuffer).resize(size, size, { fit: 'cover' }).png().toBuffer())
  );

  const icoBuffer = await pngToIco(resizedBuffers);
  await fs.writeFile(outputIcoPath, icoBuffer);

  const stat = await fs.stat(outputIcoPath);
  // eslint-disable-next-line no-console
  console.log(`Generated ${path.relative(projectRoot, outputIcoPath)} (${stat.size} bytes)`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});
