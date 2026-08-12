# Operating system screens

Screenshots and short clips of Mindmaker OS, rendered by the
"The operating system, running" section.

## Adding one

1. Drop the file in this directory. Stills (`.png`, `.jpg`, `.webp`) and short
   loops (`.mp4`, `.webm`) both work.
2. Register it in `src/lib/asset-map.ts` under a short key.
3. Add an entry to `src/content/os.ts` using that key.

No component edits.

```ts
{
  id: 'control-center',
  title: 'Control Center',
  note: 'Every agent, its current task and what it is waiting on.',
  date: 'August 2026',       // optional
  kind: 'image',             // or 'video'
  asset: 'os-control-center',
  poster: 'os-control-center-still',  // videos only, optional but preferred
  alt: 'The control centre showing agent status',
}
```

## Notes

- Everything lazy loads. Video uses `preload="none"` and starts only once the
  tile is on screen.
- A visitor with `prefers-reduced-motion: reduce` gets the poster frame and
  playback controls, never autoplay. Give every video a poster so that visitor
  sees the screen rather than a placeholder.
- An entry with no `asset` renders a labelled "Screenshot to come" tile. That is
  deliberate: an unfilled slot should say so rather than show a fake.
- Crop to the interface. These are receipts, not marketing images.
