# Adding shows to Classic Radio Vault

The single source of truth for the Vault's 36 shows is `src/vaultCatalog.json`. Category names and artwork paths are derived from the keys under `categories`; no separate category list or featured-slug list is maintained.

## Adding a show

1. Put its image at `public/art/<category>/<slug>/card.png`.
2. Insert the show into the `shows` object for its category:

```json
"new-show": {
  "title": "New Show",
  "href": "/new-show",
  "years": "1948–1953",
  "featuredEligible": true,
  "tagline": "CLASSIC RADIO ARCHIVE",
  "anniversaryYears": 75
}
```

Set `featuredEligible` to `false` to exclude the show from the homepage's featured-program lottery. Each page load picks six different eligible categories at random, then one eligible show from each, in randomized order. The separate Explore by Category section independently chooses four categories per load.

**Keep at least six categories containing one or more eligible shows** to guarantee all six featured slots are filled. Shows without card artwork remain eligible; the card displays its title instead.

The frontend automatically constructs `/art/<category>/<slug>/card.png`. You may supply a `card` property to override that path and `fallback` for another image. For the Western category, the category banner is `westerns.png`; for other categories, its filename follows the category slug.

The category key provides the public category name (e.g., `sci-fi` displays as Sci-Fi); no display-name field is necessary. Series titles, taglines, and anniversary offsets live in the catalog. `src/series.js` derives compatibility exports from that catalog, and the generic show-page shell is selected using the catalog slug.

JSON uses double-quoted keys and strings, with no comments or trailing commas.
