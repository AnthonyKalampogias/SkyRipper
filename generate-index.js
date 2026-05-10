#!/usr/bin/env node

/**
 * generate-index.js — Regenerate index.json from character files
 *
 * Usage:
 *   node generate-index.js
 *
 * This script reads all character JSON files from output and
 * generates a lightweight index with accurate variant counts and types.
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHARACTERS_DIR = path.join(__dirname, "output", "characters");
const INDEX_FILE = path.join(__dirname, "output", "index.json");

async function generateIndex() {
  try {
    console.log("📋 Reading character files...\n");

    const files = await fs.readdir(CHARACTERS_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));

    console.log(`Found ${jsonFiles.length} character files\n`);

    const index = [];
    let processed = 0;
    let skipped = 0;

    for (const file of jsonFiles) {
      try {
        const filePath = path.join(CHARACTERS_DIR, file);
        const content = await fs.readFile(filePath, "utf-8");
        const character = JSON.parse(content);

        // Skip if missing required fields
        if (!character.id || !character.name) {
          console.warn(`  ⚠️  Skipping ${file} (missing id or name)`);
          skipped++;
          continue;
        }

        // Extract variant info
        const variants = character.variants || [];
        const variantTypes = [...new Set(variants.map((v) => v.type))];
        const variantIds = variants.map((v) => v.id);
        const variantNames = variants.map((v) => v.variant_name);

        // Build index entry
        const indexEntry = {
          id: character.id,
          name: character.name,
          element: character.element || null,
          role: character.role || null,
          primary_game: character.primary_game || null,
          species: character.species || null,
          variant_count: variants.length,
          variants: variants.map((v) => ({
            id: v.id,
            name: v.variant_name,
            type: v.type,
            img: v.image,
          })),
          //   variant_types: variantTypes,
          //   variant_ids: variantIds,
          //   variant_names: variantNames,
          //   image: character.variants?.[0]?.image || null,
        };

        index.push(indexEntry);
        processed++;

        if (processed % 50 === 0) {
          console.log(`  ✓ Processed ${processed} characters...`);
        }
      } catch (err) {
        console.error(`  ✗ Error processing ${file}: ${err.message}`);
        skipped++;
      }
    }

    // Sort by id for consistency
    index.sort((a, b) => a.id.localeCompare(b.id));

    // Write index
    await fs.writeFile(INDEX_FILE, JSON.stringify(index, null, 2), "utf-8");

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`  ✅ Index generated successfully!`);
    console.log(`  📊 ${processed} characters indexed`);
    if (skipped > 0) console.log(`  ⚠️  ${skipped} files skipped`);
    console.log(`  📁 ${INDEX_FILE}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  } catch (err) {
    console.error("Fatal error:", err);
    process.exit(1);
  }
}

generateIndex();
