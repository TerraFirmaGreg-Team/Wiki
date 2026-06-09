import assert from 'node:assert/strict';
import { test } from 'node:test';

import { buildMergedSitemap, pageToCanonical, parseSitemapLocs } from '../lib/seo.mjs';

test('pageToCanonical uses trailing slash for locale index', () => {
  assert.equal(
    pageToCanonical('https://wiki.test', 'modern/en_us/index.md'),
    'https://wiki.test/modern/en_us/',
  );
});

test('parseSitemapLocs extracts loc tags', () => {
  const xml = '<?xml version="1.0"?><urlset><url><loc>https://a.test/one</loc></url></urlset>';
  assert.deepEqual(parseSitemapLocs(xml), ['https://a.test/one']);
});

test('buildMergedSitemap deduplicates urls', () => {
  const xml = buildMergedSitemap(['https://a.test/one', 'https://a.test/one', 'https://a.test/two']);
  assert.match(xml, /<loc>https:\/\/a\.test\/one<\/loc>/);
  assert.match(xml, /<loc>https:\/\/a\.test\/two<\/loc>/);
  assert.equal(parseSitemapLocs(xml).length, 2);
});
