# Adding shows to Classic Radio Vault

All Vault show data lives in `src/vaultCatalog.json`. The catalog includes 36 shows grouped by category. `src/Vault.jsx` derives Browse, Shows, Categories, search, and featured cards from it; the page layout does not require changes when adding a show.

## Add a show
1. Place its art at `public/art/<category>/<slug>/card.png`.
2. Find the category in `categories` and add a show object under its `shows` map (keyed by slug). Example inside `categories.adventure.shows`:

```json
"new-show": {
  "title": "New Show",
  "href": "/shows?show=new-show",
  "years": "1948–1953"
}
```

3. To feature it on the homepage, add its slug to the ordered root `featured` array. The current homepage is designed for six featured cards; replace one slug to preserve that layout.

The image path is automatically `/art/<category>/<slug>/card.png`; optional `card` or `fallback` fields override art behavior. `years` may be omitted if the broadcast years have not been verified.

A `href` must point to a working landing page to enable navigation; catalog registration alone does not implement one. Existing dedicated pages and their API remain defined through `src/series.js` for now. Do not remove those entries until that router is migrated.

The JSON format requires double-quoted strings and keys, with no JavaScript comments or trailing commas.
