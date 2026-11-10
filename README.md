# Secret Chess — หมากรวย

Online 1v1 chess with secret army deployment and competitive ELO rankings.

## Game concept
- Each player deploys 16 chess pieces anywhere within their own two back ranks.
- Deployments stay hidden from the opponent until both players lock their setup.
- Both formations are revealed simultaneously, then standard chess rules apply.
- Player accounts, match history, and ELO leaderboard.

## Stack
- Next.js App Router + TypeScript
- Supabase Auth + Postgres + Realtime (matchmaking and live gameplay are planned next)
- Vercel deployment

## Local setup
1. Use Node.js 20.9+.
2. Copy `.env.example` to `.env.local`.
3. Create a **dedicated Supabase project for Secret Chess**. Do not reuse the database for another app.
4. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local`.
5. Run `supabase/schema.sql` in the Supabase SQL Editor.
6. Run `npm install` then `npm run dev`.

## Security
Never expose a Supabase secret/service-role key in browser code. Hidden deployments and authoritative match results must be protected by server-side game logic and row-level security. Never send an opponent's hidden deployment to the browser before both players are ready.
