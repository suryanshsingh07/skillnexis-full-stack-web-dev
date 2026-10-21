# Skill Nexis Full Stack Web Development (MERN) Internship — Week 1 Assignment

> **Candidate:** Suryansh Singh  
> **Role:** Full Stack Developer  
> **Location:** Lucknow, Uttar Pradesh, India  
> **Email:** [suryanshsinghchauhanthakur@gmail.com](mailto:suryanshsinghchauhanthakur@gmail.com) | **Phone:** +91-8874518917  
> **Profiles:** [Portfolio](https://suryanshsingh.vercel.app) · [LinkedIn](https://linkedin.com/in/suryansh-singh-thakur) · [GitHub](https://github.com/suryanshsingh07) · [LeetCode](https://leetcode.com/suryanshsingh07)

---

## Executive Overview

This repository contains the complete, production-grade submission for **Week 1** of the **Skill Nexis Full Stack Web Development (MERN) Internship**. The project demonstrates mastery across semantic HTML5, modern responsive CSS3 (Flexbox and CSS Grid), JavaScript DOM manipulation and form validation, reusable component-driven React architecture, and dynamic filtering with state management.

All components, applications, and exercises are implemented without placeholders or mockups.

---

## Repository Structure

```text
week-1/
├── .gitignore                      # Git ignore rules for node_modules, build artifacts & logs
├── README.md                       # Comprehensive documentation & submission guide
│
├── portfolio-html-css/             # Deliverable A & B: Production Developer Portfolio
│   ├── index.html                  # Semantic HTML5 portfolio structure
│   ├── css/
│   │   └── style.css               # Mobile-first CSS with custom properties & design tokens
│   ├── js/
│   │   └── main.js                 # Mobile nav, active link spy, form validation & back-to-top
│   └── assets/                     # Portfolio assets & SVGs
│
├── practice-exercises/             # Deliverables B, C, D, E: Targeted Practice Modules
│   ├── responsive-navbar/          # Deliverable B: Responsive navigation bar & mobile drawer
│   │   └── index.html
│   ├── form-validation/            # Deliverable C: Real-time accessible JS form validation
│   │   └── index.html
│   ├── ecommerce-landing-page/     # Deliverable D: MyShop interactive e-commerce platform
│   │   └── index.html
│   └── flexbox-grid/               # Deliverable E: Interactive Flexbox vs CSS Grid playground
│       └── index.html
│
├── react-components/               # Deliverable F: 5 Reusable React UI Components
│   ├── package.json                # React 19 + Vite + Oxlint configuration
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx                # React root mount
│       ├── App.jsx                 # Interactive showcase and playground for all 5 components
│       ├── index.css               # Design tokens & base stylesheet
│       └── components/
│           ├── Header.jsx          # Reusable sticky navigation header with badge & actions
│           ├── Footer.jsx          # Reusable multi-column footer with social links & copyright
│           ├── Card.jsx            # Multi-variant content card (elevated, bordered, flat)
│           ├── Button.jsx          # 5-variant button (primary, outline, ghost, danger, success)
│           └── Form.jsx            # Controlled form with real-time validation & submit state
│
└── react-blog/                     # Deliverable G: React Blog UI Mini-Project
    ├── package.json                # React 19 + Vite + Oxlint configuration
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx                # React root mount
        ├── App.jsx                 # Blog application shell with combined search & filter logic
        ├── index.css               # Dark theme design system
        ├── data/
        │   └── posts.json          # 12 original tech articles authored by Suryansh Singh
        └── components/
            ├── BlogCard.jsx        # Article preview card with category pills, tags & read action
            ├── CategoryFilter.jsx  # Interactive category pill filter bar
            ├── SearchBar.jsx       # Controlled search bar with clear button & focus ring
            └── PostModal.jsx       # Full-screen editorial article reader modal (Esc / backdrop)
```

---

## Deliverables & Requirements Matrix

| Module | Requirement | Status | Key Features |
|---|---|---|---|
| **Portfolio Website** | Deliverable A | Complete | Semantic HTML5, CSS Grid/Flexbox, Hero, About, Skills, Projects, Experience timeline, Education, Demo contact form. |
| **Responsive Navbar** | Deliverable B | Complete | Mobile hamburger drawer, accessible `aria-expanded`, smooth scrolling, active link scroll spy. |
| **Form Validation** | Deliverable C | Complete | Real-time and submit-time validation, regex email checks, inline error messages, honest demo submission state. |
| **MyShop E-Commerce** | Deliverable D | Complete | 8 products, category filter, price sorting, live cart drawer with item count and subtotal, wishlist toggle, empty state. |
| **Flexbox & Grid Lab** | Deliverable E | Complete | Visual comparison, 1D navigation and media card flexbox, 2D responsive auto-fit grid, holy grail layout. |
| **React Components** | Deliverable F | Complete | 5 production-ready components (`Header`, `Footer`, `Card`, `Button`, `Form`) with prop-driven variants, state handling, and interactive sandbox. |
| **React Tech Blog** | Deliverable G | Complete | 12 technical articles from `posts.json`, instant full-text search, category pills, tag filtering, sort by date/read-time, empty state, reader modal. |

---

## Technology Stack

- **Languages:** HTML5, CSS3, JavaScript (ES6+), JSX
- **Framework & Build Tools:** React 19, Vite 8, Node.js
- **Linters & Quality:** Oxlint (0 warnings, 0 errors)
- **Styling Architecture:** Vanilla CSS with custom properties (`:root` design tokens), CSS Grid, Flexbox, accessible focus rings, reduced-motion queries (`prefers-reduced-motion`)
- **Typography:** Inter, JetBrains Mono

---

## Setup and Execution Guide

### Prerequisites
- Node.js (version 18 or higher recommended)
- Modern web browser (Chrome, Edge, Firefox, or Safari)

### 1. Static Web Projects (Vanilla HTML/CSS/JS)
The portfolio and practice exercises require no build step or package installations. Open their `index.html` files directly in a browser or serve them with a static HTTP server:

```bash
# Option A: Using npx serve (recommended)
npx serve portfolio-html-css

# Option B: Using VS Code Live Server extension
# Right-click portfolio-html-css/index.html -> "Open with Live Server"

# Practice exercises:
npx serve practice-exercises/ecommerce-landing-page
npx serve practice-exercises/flexbox-grid
npx serve practice-exercises/form-validation
npx serve practice-exercises/responsive-navbar
```

### 2. React Components Showcase (`react-components/`)
```bash
# Navigate to the folder
cd react-components

# Install dependencies
npm install

# Start development server
npm run dev
# -> Opens http://localhost:5173

# Run production build
npm run build

# Run linter
npm run lint
```

### 3. React Blog Application (`react-blog/`)
```bash
# Navigate to the folder
cd react-blog

# Install dependencies
npm install

# Start development server
npm run dev
# -> Opens http://localhost:5173

# Run production build
npm run build

# Run linter
npm run lint
```

---

## Verification & Build Results

All automated checks and builds have passed:

### 1. `react-components` Build & Lint Output
```text
$ npm run lint
> oxlint
Found 0 warnings and 0 errors.
Finished in 40ms on 8 files with 104 rules using 8 threads.

$ npm run build
> vite build
vite v8.3.4 building client environment for production...
✓ 21 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.29 kB
dist/assets/index-CgPyt4DM.css    0.86 kB │ gzip:  0.55 kB
dist/assets/index-CvmWdm9f.js   247.74 kB │ gzip: 76.13 kB
✓ built in 457ms
```

### 2. `react-blog` Build & Lint Output
```text
$ npm run lint
> oxlint
Found 0 warnings and 0 errors.
Finished in 43ms on 7 files with 104 rules using 8 threads.

$ npm run build
> vite build
vite v8.3.4 building client environment for production...
✓ 21 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.29 kB
dist/assets/index-aiMPMVTh.css    0.76 kB │ gzip:  0.50 kB
dist/assets/index-Du50kuIa.js   256.88 kB │ gzip: 79.53 kB
✓ built in 412ms
```

---

## Interactive Feature Walkthrough & Testing Steps

### A. Personal Portfolio (`portfolio-html-css/`)
1. **Navigation:** Click nav links (`About`, `Skills`, `Projects`, `Experience`, `Education`, `Contact`) to verify smooth scrolling. Resize window to mobile width (<768px) and toggle the hamburger menu.
2. **Projects Section:** Inspect 5 real project cards with accurate tech stacks and details.
3. **Contact Form:**
   - Attempt to click **Send Message** with empty fields: inline errors appear with accessible icons and error messages.
   - Enter an invalid email (e.g. `test@domain`): real-time regex validation flags invalid format.
   - Fill in valid credentials: submission switches to an honest demo success message acknowledging receipt without fabricating backend email delivery.
4. **Back-to-top button:** Appears on scroll and smoothly returns viewport to top.

### B. E-Commerce Landing Page (`practice-exercises/ecommerce-landing-page/`)
1. **Filtering:** Click category buttons (`All`, `Audio`, `Accessories`, `Peripherals`) to filter products.
2. **Cart Flow:** Click **Add to Cart** on any item. Notice the cart counter badge incrementing.
3. **Cart Drawer:** Click the cart icon to slide out the cart drawer. Test incrementing (`+`), decrementing (`-`), and removing items. Total subtotal recalculates dynamically.
4. **Wishlist:** Click the heart icon on any card to toggle wishlist status.

### C. React Blog UI (`react-blog/`)
1. **Dynamic Rendering:** 12 articles loaded dynamically from `src/data/posts.json`.
2. **Combined Filtering:** Type "React" into the search bar, select the `React` category pill, and click any tag. Notice the count indicator ("Showing X of 12 articles").
3. **Empty State:** Type random gibberish (e.g. `xyz123`) into search: displays a friendly empty state with a **Clear all filters** button.
4. **Reader Modal:** Click any post title or **Read article →** to open the `PostModal` reader. Test closing via **✕**, **Close Article**, clicking outside the modal, or pressing `Escape`.

---

## Deployment Guidance

### Deploying the Portfolio to Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to `portfolio-html-css/` and run `vercel`
3. Follow prompts to deploy the static website.

### Deploying React Apps (Vite) to Vercel or Netlify
1. Connect your GitHub repository to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Set Root Directory to `react-blog` (or `react-components`).
3. Set Build Command: `npm run build`
4. Set Output Directory: `dist`
5. Click **Deploy**.

---

## Submission Links

- **GitHub Repository URL:** `https://github.com/suryanshsingh07/suryansh-skillnexis-week-1` *(Placeholder: replace with actual repository URL upon push)*
- **Live Portfolio Demo (Vercel):** `https://suryanshsingh.vercel.app`
- **Optional React Blog Demo:** `https://suryansh-react-blog.vercel.app` *(Optional live deployment)*

---

## Honest Disclosures & Scope
- **Frontend Demonstration:** As this is a Week 1 Frontend Assignment, the contact forms and checkout buttons simulate real user flows with state handling and honest completion feedback, rather than persisting data to a live database or payment gateway.
- **Data Integrity:** All resume information, internships, academic records, and projects represent genuine accomplishments of Suryansh Singh without fabricated statistics or credentials.
