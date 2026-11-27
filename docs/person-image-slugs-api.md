# Person image slugs — cast API contract

## Database
The UTF-8 database `crv_test_utf8` has a unique, non-null `crv.person.image_slug` for all 637 person records.

## Required API response
The frontend requests `GET https://{show-subdomain}.{VITE_API_DOMAIN}/v1/cast` and expects an object with a `cast` array. Each cast member **must** include the stable `image_slug` from `crv.person`, without reconstructing it from display names or `person_id`.

Example cast member:

```json
{
  "person_id": 390,
  "name": "Richard Boone",
  "image_slug": "richard-boone",
  "role": "Actor"
}
```

## Query integration
For a cast query already joining `crv.person p`, add `p.image_slug AS image_slug` to its SELECT/JSON projection. Example fragment:

```sql
SELECT p.person_id, p.image_slug,
       trim(concat_ws(' ', p.first_name, p.middle_name, p.last_name)) AS name
FROM crv.person p
WHERE p.person_id = $1;
```

This is a query fragment, not a replacement for the show's existing credit, role, and ordering logic.

## Frontend resolution
1. Valid `image_slug`: `/people/{image_slug}/portrait.webp`
2. Existing `portrait_url`, `image_url`, or `photo_url`, if provided
3. Dragnet art fallback `/art/detective/dragnet/sample.png`
4. Otherwise show existing blank portrait area

Do not derive paths from `person_id`. Do not delete numeric directories until API and frontend deployment have been validated.

## Validation checklist
- Confirm one existing portrait returns HTTP 200 at its slug path.
- Confirm a person without an image renders without broken image.
- Confirm actors with middle names use the **stored** slug.
- Confirm changes to `person_id` or display name do not affect image path.
- Confirm all show cast routes, including Dragnet, get `image_slug`.
- Verify old numeric paths are unused before deleting them.

## Current limitation
The linked repository `phpwalter/otr.api` is empty at the time of this change. The live backend source and deployment configuration were not accessible here; API query modifications remain outstanding.
