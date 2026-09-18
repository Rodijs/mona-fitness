# Mona Fitness — Landing Page

Marketing/waitlist landing page for [mona.fitness](https://mona.fitness), the AI fitness coach app. Built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/page.tsx` — composes the page from `components/`
- `components/Navbar.tsx` — sticky nav bar with mobile menu
- `components/Hero.tsx` — hero section with headline + email signup
- `components/EmailForm.tsx` — email input, validation, loading/success/error states
- `components/Features.tsx` — short "what is Mona" intro cards
- `components/Footer.tsx`
- `app/api/subscribe/route.ts` — handles email signups
- `app/globals.css` — theme colors (dark background + accent) defined as CSS variables, easy to swap for final brand colors

## Email signups

Signups currently write to `data/subscribers.json` (gitignored, dev-only) so nothing is lost while no email marketing provider is wired up yet.

To connect a real provider (Mailchimp, ConvertKit, Beehiiv, etc.), edit `app/api/subscribe/route.ts` — there's a single marked `TODO` block where the provider's API call goes. No changes are needed anywhere else.

## Deployment

Not decided yet — this is a standard Next.js app and deploys cleanly to Vercel, Netlify, or any Node hosting. Once a host is chosen, point the `mona.fitness` domain's DNS at it.

## Content

Placeholder copy is used for the headline, subtext, and feature cards — edit `components/Hero.tsx` and `components/Features.tsx` directly.
