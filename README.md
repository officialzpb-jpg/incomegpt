# ProfitPilot AI

An AI-powered platform that helps users generate and execute profitable money-making strategies.

## Features

- 🤖 **AI Strategy Generation** - Personalized income strategies based on your goals, skills, and budget
- 📊 **Dashboard** - Track your income goals and active strategies
- 💡 **Execution Plans** - Step-by-step guides to implement each strategy
- 🎯 **Progress Tracking** - Monitor your journey to financial goals

## Tech Stack

- **Frontend:** Next.js 14 + TypeScript + TailwindCSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Payments:** Stripe (ready for integration)
- **Hosting:** Vercel

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.local.example` to `.env.local` and fill in your environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret |
| `OPENAI_API_KEY` | OpenAI API key for strategy generation |

## Project Structure

```
profipilot-ai/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/          # API routes
│   │   ├── dashboard/    # Dashboard page
│   │   ├── generator/    # Strategy generator page
│   │   ├── login/        # Login page
│   │   ├── results/      # Strategy results page
│   │   ├── signup/       # Signup page
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Landing page
│   ├── components/       # React components
│   └── lib/              # Utilities and types
├── public/               # Static assets
└── package.json
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Manual

```bash
npm run build
```

## License

MIT
