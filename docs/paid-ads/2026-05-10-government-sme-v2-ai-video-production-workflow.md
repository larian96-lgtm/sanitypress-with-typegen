# Comparison One — AI Video Production Workflow

Campaign: Government SME awareness-first funding campaign  
Source scripts: `2026-05-10-government-sme-v2-video-scripts-ai-prompts.md`  
Goal: 45–90s vertical videos using ElevenLabs voiceover, a 3–5s Kling hook via KIE.ai, then ChatGPT-generated slideshow frames with light animation.

## Short Answer

Yes. The cleanest workflow is:

1. Generate the final voiceover first in ElevenLabs.
2. Use Kling via KIE.ai only for the opening 3–5 second hook clip.
3. Generate the rest as branded 9:16 still frames in ChatGPT Images.
4. Animate those stills with simple motion: push-ins, pans, parallax, card reveals, cursor movement, and graph/chart build-ons.
5. Assemble in CapCut, Premiere, DaVinci, or After Effects with manual captions and overlays.

Do not try to generate the whole 60–90s ad in Kling. It will be harder to control, more expensive, and less consistent. Use video generation only where motion genuinely adds value.

## Recommended Stack

### Voiceover
- Tool: ElevenLabs
- Voice: calm Australian business/finance voice
- Pace: 135–150 words per minute
- Delivery: clear, credible, not salesy
- Export: WAV if editing professionally, MP3 if using CapCut/Canva

### Hook Video
- Tool: Kling through KIE.ai
- Clip length: 3–5 seconds
- Format: 9:16 vertical
- Use case: opening scroll-stopper only
- Best prompt style: credible SME/finance/news visual, no readable text, no logos, no generated speech

### Image Slides
- Tool: ChatGPT Images
- Format: 9:16 vertical, 1080×1920
- Style: premium fintech editorial, deep green and warm gold, clean Australian SME contexts
- Text: avoid generating embedded text; add overlays manually in the editor
- Count: roughly 8–12 still frames per 60–90s ad

### Animation
- Easy mode: CapCut / Canva / Premiere motion presets
- Better mode: After Effects parallax + shape layers
- AI motion mode: Kling image-to-video for selected frames only, 3–5 seconds each

## Production Sequence

### 1. Lock the VO script
Use the script as the source of truth. Minor edits are fine, but once voiceover is generated, do not keep changing copy unless necessary.

Output file naming:
- `c1-gov-sme-v2-script-01-vo-v1.mp3`
- `c1-gov-sme-v2-script-01-vo-v2.mp3`

### 2. Generate ElevenLabs voiceover
Suggested direction:

```text
Australian business finance narrator. Calm, clear, credible, slightly warm. Not hype, not urgent, not influencer-style. Speak like a helpful finance explainer for SME owners.
```

Recommended settings:
- Stability: medium-high
- Similarity: medium-high
- Style/exaggeration: low
- Speed: natural, slightly brisk

### 3. Build edit timing from VO
Drop the VO into the editing timeline first. Then cut visuals to the narration. This prevents the slideshow from feeling random.

Timeline rhythm:
- 0:00–0:05: Kling hook clip
- 0:05–0:20: education cards and simple visual metaphors
- 0:20–0:40: SME situation visuals
- 0:40–1:05: comparison/checklist/map visuals
- 1:05–1:25: CTA and brand card

### 4. Generate Kling hook via KIE.ai
Use Kling for the first 3–5 seconds only.

Prompt template:

```text
A credible Australian small business finance scene, cinematic vertical video, calm premium fintech style, deep green and warm gold color accents, realistic SME environment, business owner looking at a laptop with financial notes nearby, no readable text, no logos, no government symbols, no speaking, no exaggerated emotion, professional lighting, shallow depth of field, smooth camera movement, 9:16 vertical, 5 seconds
```

Negative prompt:

```text
logos, readable text, fake government crest, bank logo, distorted hands, extra fingers, unrealistic documents, panic, debt stress, shouting, presenter speaking, subtitles, watermark
```

### 5. Generate ChatGPT image frames
Use ChatGPT Images for the rest of the ad.

Global image style prompt to prepend:

```text
Create a vertical 9:16 image for a premium Australian business finance explainer ad. Deep forest green, cream, and muted gold palette. Editorial fintech style, clean composition, realistic Australian SME context where relevant, plenty of negative space for overlay text, no readable text in the image, no logos, no government crests, no fake brand names, no watermarks. Professional, calm, useful, trustworthy.
```

Frame prompt format:

```text
[GLOBAL STYLE]
Scene: [specific scene description]
Composition: leave upper third or right side clean for manual overlay text.
Mood: calm, credible, useful.
Avoid: readable text, logos, government symbols, overdramatic debt imagery.
```

### 6. Animate images
Use mostly simple motion. Finance explainer ads should feel clean, not overproduced.

Animation rules:
- Add 3–6% slow zoom on SME photos.
- Use left-to-right pans for workspace scenes.
- Use card slide-ins for checklist/map screens.
- Use simple line/arrow animations for comparison logic.
- Use parallax only on 2–3 hero frames.
- Avoid spinning text, loud transitions, and stock-template energy.

### 7. Add manual overlays and captions
Never rely on generated image text. Add all copy manually.

Overlay style:
- Large, high-contrast, 3–7 words per line
- Use brand green/cream/gold
- Keep one main thought per frame
- Burn in subtitles from the VO

### 8. Export variants
For each full video:
- 9:16 Reel/Story: 1080×1920
- 4:5 Feed: 1080×1350
- 1:1 optional: 1080×1080
- 6s hook cutdown
- 15s retargeting cutdown

## Recommended Asset Counts

For each 45–90s video:
- ElevenLabs VO: 1 file
- Kling hook: 1 clip
- ChatGPT stills: 8–12 images
- Optional image-to-video animations: 2–4 clips
- Manual overlay cards: 3–5 text/card screens
- Final exports: 2–4 formats

For all 5 current scripts:
- Voiceovers: 5
- Kling hook clips: 5
- ChatGPT still frames: about 45–60
- Optional animated clips: about 10–20
- Final exports: 10–20 depending on formats

## Script-by-Script Production Plan

### Script 1 — The Loan Most SME Owners Haven’t Checked
Best pilot. Use this first.

Asset plan:
- Kling hook: laptop/finance-news desk scene or finance presenter for 3 seconds
- Images: government-backed concept card, SME workspace, cash-flow/equipment scene, eligibility filter, two-path comparison, C1 funding-fit check, CTA brand card
- Animation: slow card reveal for eligibility filter and two-path comparison

### Script 2 — Sounds Amazing. Here’s What To Check.
Use as the strongest reality-check version.

Asset plan:
- Kling hook: owner pausing before applying online
- Images: 0% opportunity card, checklist cards, manufacturing/supply-chain visual, comparison decision card, CTA
- Animation: checklist tick build-ons

### Script 3 — Manufacturing Doesn’t Mean Automatic
Use for manufacturing and supply-chain targeting.

Asset plan:
- Kling hook: clean workshop/manufacturing floor
- Images: manufacturing bench, sector-fit filter, document/purpose check, lender assessment concept, alternative funding path, CTA
- Animation: filter/funnel diagram

### Script 4 — The 3-Step Funding Check
Use as the most direct performance ad.

Asset plan:
- Kling hook: business owner looking at three funding options
- Images: Step 1 program fit, Step 2 business need, Step 3 lender/product fit, comparison map, CTA
- Animation: numbered step sequence

### Script 5 — The Funding Fit Map
Use as the most brand-building explainer.

Asset plan:
- Kling hook: abstract map of business funding pathways
- Images: funding map, government program branch, lender options branch, timing/need/profile nodes, C1 matching view, CTA
- Animation: map lines drawing on screen

## Best Pilot Workflow

Start with Script 1 only:

1. Generate ElevenLabs VO.
2. Produce one Kling 5s hook.
3. Generate 10 ChatGPT still frames.
4. Assemble a rough cut.
5. Review tone, pace, image style, and overlay readability.
6. Lock the visual system.
7. Batch-produce Scripts 2–5 using the same template.

This avoids wasting time generating 60 images before the style is approved.

## What Hermes Can Prepare Next

Hermes can produce:
- exact ElevenLabs-ready VO text for each script
- exact KIE.ai/Kling prompt per hook
- exact ChatGPT image prompts for every slideshow frame
- filename-by-filename asset manifest
- CapCut/Premiere assembly timeline
- 6s and 15s cutdown scripts

Hermes cannot guarantee the image generator behind its own image tool is specifically ChatGPT Images unless that backend is configured. If you want images specifically from ChatGPT, use the provided prompts inside ChatGPT Images, or connect an image API/tool that targets it.
