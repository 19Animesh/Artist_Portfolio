# Anshika Agarwal - Artist Portfolio

A minimalist, high-performance digital portfolio for abstract mixed media artist Anshika Agarwal.

## Project Overview

This website serves purely as a digital portfolio and gallery. Its primary purpose is to showcase artwork, highlight featured pieces, and provide direct contact information for inquiries and commissions. 

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion & GSAP
- **3D Canvas (Hero):** React Three Fiber / Drei
- **Data & Storage:** Cloudinary (CMS + Image Hosting)

## Cloudinary-Only Architecture

This project was intentionally simplified to remove the need for a database. **MongoDB has been fully removed** because an art portfolio currently does not require complex relational data or user tracking. 

Instead, the site uses Cloudinary as a lightweight, headless CMS:
1. **Artwork Images:** Uploaded to the `artist_portfolio` folder.
2. **Artwork Metadata:** Data like title, medium, year, dimensions, and descriptions are stored directly within each image asset using **Cloudinary Context Tags**.
3. **Data Fetching:** The Next.js frontend calls the Cloudinary Admin API to fetch the folder's assets and reads their context metadata to render the gallery dynamically.

## Folder Structure

```
src/
├── app/                  # Next.js App Router pages and API routes
│   ├── (public)/         # Public-facing pages (Home, Gallery, Contact, About)
│   ├── admin/            # Protected admin dashboard for uploading artwork
│   └── api/              # API routes for Cloudinary operations
├── components/           # Reusable UI components
│   ├── admin/            # Admin-specific components (Uploaders, forms)
│   ├── animations/       # Framer Motion / GSAP animated wrappers
│   ├── gallery/          # Grid and painting card components
│   ├── layout/           # Navbar, Footer
│   └── three/            # WebGL / R3F Canvas components
├── lib/                  # Utility functions (cloudinary.ts, paintings.ts, auth.ts)
└── types/                # TypeScript type definitions (painting.ts)
```

## Environment Setup

Create a `.env.local` file in the root directory (never commit this file) with the following variables:

```env
# NextAuth / Session
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret

# Admin Credentials
ADMIN_USER=admin
ADMIN_PASS=change_me

# Cloudinary Portfolio Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=artist_portfolio
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Public site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
> **Note:** Do not expose `CLOUDINARY_API_SECRET` to the frontend via a `NEXT_PUBLIC_` prefix.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin & Upload Instructions

The site includes a secure admin panel for managing the portfolio:
1. Navigate to `/admin` and log in using the `ADMIN_USER` and `ADMIN_PASS` defined in your `.env.local`.
2. Click "Upload Artwork" to add a new piece.
3. The image file will be uploaded to Cloudinary, and the form data (Title, Medium, Description, etc.) will be attached to the image as Cloudinary Context Metadata.
4. You can edit or delete existing artworks directly from the dashboard.

## Contact Section

MongoDB contact message storage has been removed to maintain the stateless architecture. The contact section currently uses direct `mailto:` links and social media integration. 

If real contact form submissions are needed later, add a dedicated email provider service such as Resend, EmailJS, Formspree, or standard SMTP. Do not reintroduce a database just for contact messages.

## Future E-Commerce Note

Later, if pendant/resin products are added for sale, a real database or e-commerce backend should be added for products, inventory, orders, customers, payments, and shipping. Cloudinary should continue to be used for product images, but not for order or customer data.
