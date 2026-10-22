# Adding shows to Classic Radio Vault

The home page, Browse, Shows, Categories and show-title Search share the catalog in `src/vaultCatalog.json`. You do not need to edit `src/Vault.jsx` or `src/vault.css` when adding a show.

1. Add the artwork at `public/art/<category>/<slug>/card.png` (for example, `public/art/adventure/escape/card.png`).
2. Add an object to the `extraShows` array in `src/vaultCatalog.json`:
   ```json
   {"slug":"new-show", "name":"New Show", "category":"adventure",
    "href":"/shows?show=new-show", "years":"1948 – 1953"}
   ```
   Provide a real `href` if its custom landing page already exists. An entry in this catalog alone does **not** create an individual show page.
3. Optionally add `"new-show"` to the `featuredSlugs` array. The home page currently has **six fixed featured slots**, so replace an existing slug if you want to keep the same layout.
4. For an existing show registered in `src/series.js`, do **not** duplicate it in `extraShows`. Its catalog entry is automatic; update the `categoryBySlug` object if the default category is incorrect.
5. To add an actual dedicated show landing page, register it in `src/series.js`, supply its show-specific artwork and implement/verify the corresponding skin or route. The Vault catalog only handles discovery and links.

Categories, image paths, featured ordering and existing show metadata are configured centrally. The layout is unchanged by catalog edits. The artwork must be present on the branch being served.

The catalog is strict JSON: use double quotes, commas between entries, and no comments or trailing commas. Existing dedicated-show metadata continues to come from `src/series.js`.
