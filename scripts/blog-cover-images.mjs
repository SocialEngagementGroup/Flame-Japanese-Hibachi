#!/usr/bin/env node

import {
  access,
  readdir,
  readFile,
  rename,
  stat,
  unlink,
} from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const ROOT = process.cwd();
const BLOG_DATA = path.join(ROOT, "lib/data/blog-data.ts");
const PUBLIC_DIR = path.join(ROOT, "public");
const COVER_DIR = path.join(PUBLIC_DIR, "blog/featured");

const COVER_WIDTH = 1400;
const COVER_HEIGHT = 788;
const JPEG_QUALITY = 76;
const MAX_COVER_BYTES = 400 * 1024;
const COVER_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*\.jpg$/;
const PATH_SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+)?$/;
const SUPPORTED_FORMATS = new Set(["avif", "jpeg", "png", "webp"]);

const mode = process.argv[2] ?? "audit";

if (!["audit", "optimize"].includes(mode)) {
  console.error("Usage: node scripts/blog-cover-images.mjs [audit|optimize]");
  process.exit(1);
}

function publicFilePath(publicPath) {
  return path.join(PUBLIC_DIR, publicPath.replace(/^\//, ""));
}

function parseBlogImages(source) {
  const entries = [];
  const entryPattern =
    /slug:\s*['"]([^'"]+)['"][\s\S]*?featuredImage:\s*['"]([^'"]+)['"]/g;

  for (const match of source.matchAll(entryPattern)) {
    entries.push({ slug: match[1], image: match[2] });
  }

  return entries;
}

async function optimizeCovers() {
  const names = (await readdir(COVER_DIR))
    .filter((name) => !name.startsWith("."))
    .sort();
  let beforeBytes = 0;
  let afterBytes = 0;

  for (const name of names) {
    if (!COVER_NAME.test(name)) {
      throw new Error(`Invalid cover filename: ${name}`);
    }

    const file = path.join(COVER_DIR, name);
    const temporaryFile = path.join(COVER_DIR, `.${name}.tmp`);
    beforeBytes += (await stat(file)).size;

    try {
      await sharp(file)
        .rotate()
        .resize({
          width: COVER_WIDTH,
          height: COVER_HEIGHT,
          fit: "cover",
          position: "centre",
          withoutEnlargement: true,
        })
        .jpeg({
          quality: JPEG_QUALITY,
          progressive: true,
          chromaSubsampling: "4:2:0",
        })
        .toFile(temporaryFile);

      await rename(temporaryFile, file);
    } catch (error) {
      await unlink(temporaryFile).catch(() => {});
      throw error;
    }

    afterBytes += (await stat(file)).size;
  }

  const savedPercent =
    beforeBytes === 0 ? 0 : Math.round((1 - afterBytes / beforeBytes) * 100);
  console.log(
    `Optimized ${names.length} blog covers: ${(beforeBytes / 1024 / 1024).toFixed(2)} MiB -> ${(afterBytes / 1024 / 1024).toFixed(2)} MiB (${savedPercent}% smaller).`
  );
}

async function auditBlogImages() {
  const source = await readFile(BLOG_DATA, "utf8");
  const entries = parseBlogImages(source);
  const errors = [];

  if (entries.length === 0) {
    errors.push("No blog image mappings were found in lib/data/blog-data.ts.");
  }

  const referencedCovers = new Map();
  const uniqueImages = new Set(entries.map(({ image }) => image));

  for (const { slug, image } of entries) {
    if (!image.startsWith("/")) {
      errors.push(`${slug}: featuredImage must start with "/": ${image}`);
      continue;
    }

    const segments = image.slice(1).split("/");
    if (segments.some((segment) => !PATH_SEGMENT.test(segment))) {
      errors.push(
        `${slug}: image path must use lowercase kebab-case: ${image}`
      );
    }

    const file = publicFilePath(image);
    try {
      await access(file);
    } catch {
      errors.push(`${slug}: referenced image does not exist: ${image}`);
      continue;
    }

    let metadata;
    try {
      metadata = await sharp(file).metadata();
    } catch {
      errors.push(`${slug}: image cannot be decoded: ${image}`);
      continue;
    }

    if (!metadata.format || !SUPPORTED_FORMATS.has(metadata.format)) {
      errors.push(
        `${slug}: unsupported image format for ${image}: ${metadata.format ?? "unknown"}`
      );
    }

    if ((metadata.width ?? 0) > 1400 || (metadata.height ?? 0) > 1400) {
      errors.push(
        `${slug}: image exceeds the established 1400 px limit: ${image}`
      );
    }

    if (metadata.format === "jpeg" && !metadata.isProgressive) {
      errors.push(`${slug}: JPEG must be progressive: ${image}`);
    }

    if (image.startsWith("/blog/featured/")) {
      const expectedImage = `/blog/featured/${slug}.jpg`;
      if (image !== expectedImage) {
        errors.push(
          `${slug}: dedicated cover must map to ${expectedImage}, found ${image}`
        );
      }
      referencedCovers.set(
        path.basename(image),
        (referencedCovers.get(path.basename(image)) ?? 0) + 1
      );
    }
  }

  const coverNames = (await readdir(COVER_DIR))
    .filter((name) => !name.startsWith("."))
    .sort();

  for (const name of coverNames) {
    if (!COVER_NAME.test(name)) {
      errors.push(`Invalid cover filename: ${name}`);
      continue;
    }

    const file = path.join(COVER_DIR, name);
    const [metadata, fileStat] = await Promise.all([
      sharp(file).metadata(),
      stat(file),
    ]);

    if (metadata.format !== "jpeg") {
      errors.push(
        `${name}: expected JPEG, found ${metadata.format ?? "unknown"}`
      );
    }
    if (metadata.width !== COVER_WIDTH || metadata.height !== COVER_HEIGHT) {
      errors.push(
        `${name}: expected ${COVER_WIDTH}x${COVER_HEIGHT}, found ${metadata.width}x${metadata.height}`
      );
    }
    if (!metadata.isProgressive) {
      errors.push(`${name}: expected progressive JPEG encoding`);
    }
    if (metadata.exif || metadata.icc || metadata.xmp || metadata.iptc) {
      errors.push(`${name}: metadata should be removed`);
    }
    if (fileStat.size > MAX_COVER_BYTES) {
      errors.push(
        `${name}: ${(fileStat.size / 1024).toFixed(0)} KiB exceeds the 400 KiB limit`
      );
    }
    if (referencedCovers.get(name) !== 1) {
      errors.push(`${name}: expected exactly one matching blog-post reference`);
    }
  }

  if (errors.length > 0) {
    console.error(`Blog image audit failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log(
    `Blog image audit passed: ${entries.length} posts, ${uniqueImages.size} unique images, ${coverNames.length} dedicated covers.`
  );
}

if (mode === "optimize") {
  await optimizeCovers();
}

await auditBlogImages();
