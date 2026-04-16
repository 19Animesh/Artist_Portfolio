# Anshika Agarwal — Artist Portfolio

A high-performance, immersive digital exhibition website for abstract and mixed media artist **Anshika Agarwal**. Built with Next.js 16, React 19, and Tailwind CSS v4, this portfolio doubles as an admin-managed art gallery with Cloudinary-powered image hosting and MongoDB persistence.

---

## ✨ Features

- **Immersive Hero** — Three.js canvas animation with a custom painting-reveal interaction
- **Gallery** — Filterable, masonry-style grid of artworks fetched from MongoDB + served via Cloudinary CDN
- **About Page** — Artist biography, studio statistics, and portrait reveal
- **Contact Page** — Validated contact form (React Hook Form + Zod) that writes to MongoDB
- **Admin Panel** — Protected dashboard (`/admin`) for managing artworks and reading contact messages
  - Add / Edit / Delete paintings with Cloudinary image upload
  - Login protected via NextAuth v5 (JWT strategy, credentials provider)
- **Custom Cursor** — Magnetic canvas cursor with blend-mode effects
- **Loading Screen** — Animated intro sequence on first visit
- **SEO** — Dynamic `sitemap.ts`, `robots.ts`, JSON-LD structured data, Open Graph meta tags
- **Dark Art Direction** — Stone-950 base with a handcrafted gold colour palette, Playfair Display serif headers, Inter sans body

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── (public)/           # Public-facing routes (layout with Navbar + Footer)
│   │   ├── page.tsx        # Homepage — Hero, quote, featured works
│   │   ├── about/          # About the artist
│   │   ├── gallery/        # Full gallery grid + individual painting pages
│   │   └── contact/        # Contact form page
│   ├── admin/              # Protected admin panel (NextAuth guard via middleware)
│   │   ├── layout.tsx      # Admin sidebar layout
│   │   ├── page.tsx        # Dashboard — artworks list + recent messages
│   │   ├── login/          # Login form
│   │   └── paintings/      # new / [id]/edit
│   ├── api/
│   │   ├── paintings/      # GET all, GET by slug, POST, PATCH, DELETE
│   │   ├── upload/         # Cloudinary signed-upload route
│   │   └── contact/        # POST — saves contact message to DB
│   ├── error.tsx           # Global error boundary
│   ├── not-found.tsx       # 404 page
│   ├── robots.ts           # SEO robots rules
│   └── sitemap.ts          # Dynamic XML sitemap (includes gallery slugs)
├── components/
│   ├── animations/         # PageTransition, ScrollReveal, PaintingReveal, MagneticButton
│   ├── gallery/            # GalleryGrid, PaintingCard, FilterBar
│   ├── layout/             # Navbar, Footer, CustomCursor, LoadingScreen
│   ├── shared/             # ContactForm
│   └── three/              # HeroCanvas (React Three Fiber)
├── lib/
│   ├── auth.ts             # NextAuth v5 config (Credentials provider)
│   ├── cloudinary.ts       # Cloudinary v2 SDK config
│   ├── mongodb.ts          # Mongoose connection with connection caching
│   └── utils.ts            # Shared utility helpers
├── models/
│   ├── Painting.ts         # Mongoose schema — title, slug, image, category, medium, year
│   └── ContactMessage.ts   # Mongoose schema — name, email, message, read flag
└── middleware.ts            # NextAuth edge middleware — guards /admin/* routes
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```env
# MongoDB (local or Atlas)
MONGODB_URI=mongodb://localhost:27017/artist_portfolio

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>

# Admin credentials (single-user, stored in ENV)
ADMIN_USER=admin
ADMIN_PASS=your_secure_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Public site URL (used in sitemap + robots)
NEXT_PUBLIC_SITE_URL=https://anshikaagarwal.com
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev), [Tailwind CSS v4](https://tailwindcss.com) |
| Animation | [Framer Motion 12](https://www.framer.com/motion/), [GSAP 3](https://gsap.com) |
| 3D | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Three.js](https://threejs.org) |
| Database | [MongoDB](https://mongodb.com) via [Mongoose](https://mongoosejs.com) |
| Auth | [NextAuth v5](https://authjs.dev) (JWT + Credentials) |
| Media | [Cloudinary](https://cloudinary.com) |
| Forms | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | [Playfair Display](https://fonts.google.com/specimen/Playfair+Display), [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts via `next/font`) |

---

## 🔐 Admin Access

Navigate to `/admin/login`. Credentials are controlled by the `ADMIN_USER` and `ADMIN_PASS` environment variables. The middleware at `src/middleware.ts` automatically redirects unauthenticated users away from all `/admin/*` routes.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm run start` | Run production build locally |
| `npm run lint` | Run ESLint |

---

## 🌐 Deployment

This project is optimised for deployment on [Vercel](https://vercel.com). Set all environment variables in the Vercel dashboard under **Settings → Environment Variables**.

For Cloudinary image domains, the `next.config.ts` already allows `res.cloudinary.com` as a remote image pattern.

---

## 🎨 Design System

- **Background**: `#0c0a09` (stone-950)
- **Text**: `#fafaf9` (stone-50)
- **Accent palette**: Custom gold scale (`gold-50` → `gold-950`) defined in `globals.css` via `@theme`
- **Heading font**: Playfair Display (serif)
- **Body font**: Inter (sans-serif)
- **Custom scrollbar**, text selection highlight, and no-overflow-x globally applied

---

*Designed & built for Anshika Agarwal · Artist & Designer · India*
