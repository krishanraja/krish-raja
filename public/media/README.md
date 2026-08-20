# Generated media

Everything here is produced by `npm run media` from the masters in
`public/files/`. Do not edit these by hand; the next run overwrites them.

The work list comes from `src/content/os.ts`, `src/content/deck.ts` and
`src/content/appearances.ts`, so adding an entry there and rerunning is
the whole process for adding a recording, a slide or an appearance.

Appearance captures are only emitted for records the content index marks
`approved`. The script throws on anything else.

`recipes.json` records what each derivative was built from beyond its
source file, which is how `--check` notices a crop that was edited in the
content layer and never applied. A master mtime cannot see that.
