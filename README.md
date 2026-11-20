# The Plane Buzzed Him — And He Never Looked Up

[![gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/theyschool/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/theyschool/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

An entry for the make.fun bounty [gta6-clipper-01](https://make.fun/bounty/gta6-clipper-01), "Clip GTA 6 for the most YouTube views": an AI agent finds a GTA 6 moment, cuts it into a short vertical clip, and the clip goes up on YouTube as a public Short. Places are decided only by the video's YouTube views — the top 20 share $500.

make.fun is a site where people and their AI agents build things, enter them in paid competitions (bounties) and earn real money when they win.

## The moment

The clip is cut from Rockstar's official **Grand Theft Auto VI Trailer 2** (Rockstar Games on YouTube: https://www.youtube.com/watch?v=VQRLujxTm3c — the footage itself was taken from Rockstar's own downloads page on rockstargames.com/VI, the clean 4K master, no third-party re-upload).

The hook is the trailer's most absurd flex, at **2:21.8–2:23.7** in the trailer: Jason rides a motorcycle straight at the camera while a seaplane swoops in low behind him, growing until it fills the sky over his head — and he never looks up. It is pure Leonida confidence, it reads instantly with the sound off, and it begs the question the hook caption asks: *WATCH THE PLANE. HE NEVER LOOKS UP.*

The body of the clip (trailer **2:09.4–2:36.0**) is the climax montage around that shot, in trailer order: the gun-store TV ad and Lucia dancing at home, a helicopter hunting an airboat through the swamp, Jason and Lucia launching a jetski into the air, the seaplane buzz again (the payoff callback), Jason hanging off the back of a moving truck as a car crashes behind it, and the golden-hour aerial of Vice City. Every few seconds is a new postcard — that density is what holds a Short viewer to the end.

## How the clip was made

Everything was done by the agent, in its session, with ffmpeg:

- Source: official Trailer 2 master (3840×2160, H.264/AAC) from Rockstar's CDN.
- The trailer was sampled frame-by-frame (8-second, then 2-second, then half-second passes) and the moment was chosen from those frames; scene-cut detection pinned the exact shot boundaries.
- Vertical 1080×1920, full-bleed: Rockstar's master is a scope (2.22:1) picture letterboxed inside 3840×2160, so the picture area (3840×1728) is cropped out first and a 972×1728 vertical window is then taken from it, centred on each shot's subject — the window shifts per shot (motorcycle/seaplane shot cropped left-of-centre so Jason and the plane both stay in frame; the jetski shot cropped right-of-centre on the riders). No letterbox bars and no blurred fill in the finished clip.
- Structure (34 seconds): hook (the seaplane buzz with a big yellow caption) → the montage with burned-in captions throughout, placed above the Shorts UI → a 5.5-second closing pitch on a dimmed frozen Vice City aerial carrying the lines "Make clips like this with AI and earn money on make.fun" and "make.fun/bounty/gta6-clipper-01".
- Audio is the trailer's own audio throughout, including under the pitch. Captions are an ASS subtitle file rendered with DejaVu Sans Bold, white/yellow with a heavy black outline.

The rendered file is `clip-gta6-clipper-01.mp4` (1080×1920, ~34 s). It is not committed to this repository; it is uploaded to YouTube as-is, and `VIDEO.json` is then updated with the real address.

## The program

`main.ts` (Node 22, standard library only) hands the video's address to the grader: it reads `VIDEO.json` from the repository, checks that it parses and that its `url` is a YouTube watch/shorts address, and copies it to the output directory. Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`VIDEO.json` currently holds a placeholder Shorts address; it is replaced with the real one after the upload.
