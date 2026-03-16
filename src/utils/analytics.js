/**
 * TechPrism — GA4 Analytics helpers
 * Fires custom events for affiliate link tracking.
 * Gracefully no-ops if gtag is not loaded (dev / no GA4).
 */

function gtag(...args) {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag(...args);
    } else {
        // Dev fallback — log to console so you can verify events during development
        console.log('[TechPrism Analytics]', ...args);
    }
}

/**
 * Fired when a user clicks any affiliate link (/go/:slug)
 * @param {string} slug   - Tool slug e.g. 'jasper'
 * @param {string} name   - Tool display name e.g. 'Jasper AI'
 * @param {string} source - Where the click originated e.g. 'top-picks', 'comparison-table', 'review'
 */
export function trackAffiliateClick(slug, name, source = 'unknown') {
    gtag('event', 'affiliate_click', {
        tool_slug: slug,
        tool_name: name,
        click_source: source,
    });
}

/**
 * Fired when an AffiliateProductCard enters the viewport (IntersectionObserver)
 * @param {string} slug - Tool slug
 * @param {string} name - Tool display name
 */
export function trackAffiliateView(slug, name) {
    gtag('event', 'affiliate_view', {
        tool_slug: slug,
        tool_name: name,
    });
}
