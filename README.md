# NapNav — Smart Flight Planning for Families

## The Problem
Traveling with young children means mentally juggling nap windows, timezone math, airport logistics, and arrival timing — all at once. Most parents just pick a flight and hope for the best.

## What NapNav Does
NapNav takes your child's sleep schedule and full travel logistics as inputs, then scores and ranks every available flight — telling you not just which flight is best, but why, in plain language.

## Key Design Decisions

**Wizard with progress indicator:**
A 5-step wizard reduces cognitive load by surfacing one decision at a time. A persistent progress bar ensures parents always know where they are and how much is left — critical for a tool used while already stressed about trip planning.

**Results lead with the answer:**
The #1 design principle: the parent should never have to do mental work after submitting their inputs. The results screen leads with a plain-English recommendation card before showing the full scoring grid as supporting detail.

**Live flight data:**
Integrated with AviationStack API to score real available flights on the travel date, not hypothetical time blocks. Proxied through a Cloudflare Pages Function to handle HTTPS requirements. Falls back to estimated windows gracefully if the API is unavailable.

**Multi-child algorithm:**
Children are scored separately and combined using age-weighted averages, with explicit tension resolution when nap windows don't overlap. Infants and young toddlers receive higher weight — their sleep is less flexible and more consequential when disrupted.

**Transparent scoring:**
A collapsible FAQ explains every scoring factor — nap overlap, body clock arrival time, bedtime proximity, logistics buffer — so curious parents can verify the reasoning. Hidden by default so it never gets in the way.

## Scoring Model
- Nap window overlap: 40 points
- Body clock arrival time: 20 points
- Bedtime proximity at landing: 15 points
- Flight duration vs. nap duration: 15 points
- Logistics buffer: 10 points

## Architecture
- Frontend: Vanilla JS/HTML/CSS on Cloudflare Pages (nap-n-fly.pages.dev)
- API proxy: Cloudflare Pages Function at /api/flights (HTTPS bridge to AviationStack)

## What I'd Build Next
- Saved child profiles for repeat travelers
- Calendar export with pre-trip nap shift reminders
- Return flight scoring within the same trip plan
- Airline-specific boarding policy data

## Tech
Vanilla JS, HTML, CSS — deployed on Cloudflare Pages
