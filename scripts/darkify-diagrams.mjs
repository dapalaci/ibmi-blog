#!/usr/bin/env node
/**
 * Remap colors in .excalidraw scenes from the light editorial palette
 * to the dark magazine palette. Used once during the identity pivot.
 *
 * Usage: node scripts/darkify-diagrams.mjs public/diagrams/*.excalidraw
 */
import fs from "node:fs";

const colorMap = {
  "#1e1e1e": "#f4f2ec",
  "#ffffff": "#1a1815",
  "#f8f9fa": "#1a1815",
  "#e9ecef": "#2a2723",
  "#868e96": "#a29d92",
  "#f4f2ec": "#0f0e0c",
  "#17150f": "#f4f2ec",
  "#b5501c": "#d97846",
  "#e8590c": "#d97846",
  "#ffd8a8": "#3a2820",
  "#fff4e6": "#2a2018",
  "#0c8599": "#5db9b0",
  "#99e9f2": "#1a3235",
  "#e6fcf5": "#14261e",
  "#9c36b5": "#a582d9",
  "#eebefa": "#2a1e35",
  "#f8f0fc": "#14101c",
  "#1971c2": "#5db9b0",
  "#e7f5ff": "#14202a",
  "#2f9e44": "#6cc27a",
  "#b2f2bb": "#14261a",
  "#ebfbee": "#0f1a12",
  "#e03131": "#ff8080",
};

function remap(color) {
  if (!color) return color;
  const lower = color.toLowerCase();
  return colorMap[lower] ?? color;
}

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("uso: node scripts/darkify-diagrams.mjs <archivo1.excalidraw> [...]");
  process.exit(1);
}

for (const file of files) {
  const scene = JSON.parse(fs.readFileSync(file, "utf8"));
  let changed = 0;
  for (const el of scene.elements ?? []) {
    if (el.backgroundColor && remap(el.backgroundColor) !== el.backgroundColor) {
      el.backgroundColor = remap(el.backgroundColor);
      changed++;
    }
    if (el.strokeColor && remap(el.strokeColor) !== el.strokeColor) {
      el.strokeColor = remap(el.strokeColor);
      changed++;
    }
  }
  fs.writeFileSync(file, JSON.stringify(scene, null, 2));
  console.log(`${file}: ${changed} color(es) remapeados`);
}
