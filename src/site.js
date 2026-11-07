// Assembles the site: maps every output route (relative to dist/) to the HTML
// of its page. This is the only place that knows which pages exist.

import { homePage } from './pages/home.js';

export const ROUTES = {
  'index.html': homePage,
};

/** @returns {Record<string, string>} route -> HTML */
export function buildSite() {
  return Object.fromEntries(Object.entries(ROUTES).map(([route, render]) => [route, render()]));
}
