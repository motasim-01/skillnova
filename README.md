# SkillNova 🌟

SkillNova is a modern, high-fidelity **AI-Guided Scholarly Learning Workspace** designed to bridge traditional scholarly authority with cutting-edge learning technologies. Styled with a premium, high-contrast, clean aesthetic, it provides users with a comprehensive suite of tools to customize, pursue, and refine their cognitive growth.

---

## 🎨 Visual Identity & Design System

SkillNova employs a custom visual layout geared toward cognitive comfort and structural readability:
- **Typography Suite**: Includes pairing of **Inter** (custom Sans-Serif optimized for interface usability), **Space Grotesk** (tech-forward display headers), and **JetBrains Mono** (monospaced for status values and academic data).
- **Cognitive Personalization**: An integrated sensory configuration system allowing instant real-time toggling of typography tuning:
  - **Inter**: Premium standard layouts.
  - **Dyslexic**: High-legibility spacing optimized for visual clarity.
  - **Display**: High-contrast, serif-accented header structures.
- **Micro-Animations**: Staggered viewport enterings and fluid state changes powered by `motion` (via `motion/react`).

---

## 🚀 Key Architectural Features

### 1. Unified Authentication Gate (`AuthPage`)
- Implements secure, state-persistent log in and sign up interfaces.
- Dynamically parses the scholar's email to instantly construct customized name structures (e.g. `scholar@skillnova.edu` yields `Scholar Name`), introducing instant personalized workspace telemetry.

### 2. Scholar Profile Customization Panel (`UserProfileForm`)
- Fully-featured identity management system available in user **Workspace Settings**, allowing users to update their profile in real-time:
  - **Full Name**: Instantly synchronizes across all sidebar greetings, menus, and notification headings.
  - **Email Address**: Safely mutates communication records.
  - **Custom Passwords**: Multi-character security input with toggleable visibility controls to protect user credentials.
  - **Avatar Identifiers**: Interactive photo selector featuring premium Unsplash scholar presets, a **drag-and-drop/file-select local uploader** (with instant Base64 data conversion), and direct network URL inputs.

### 3. Progressive Dashboard (My Learning Space)
- Tracks enrolled courses, showing real-time hours covered, status indicators ("In Progress", "Completed", "Up Next"), and percentage progress bar gauges.
- Houses interactive customized path guides mapped across categories such as *Fundamentals*, *Applied Cognition*, and *Advanced Systems*.

### 4. Interactive Hubs & Exchange Centers (`InteractiveShowcase`)
- **Skill Marketplace**: Modular catalog of specialized knowledge-modules showing ratings, expert creators, and active currency/credit markers.
- **Community Discussion Hub**: Live collaboration panels tracking structured forums, member tallies, and active subject boards.

### 5. Persistent Workspace Notifications
- Tracks workspace activity logs (e.g. course enrolment status, profile changes, authentication success) in an interactive, real-time bell dropdown menu.

---

## 🗄️ Technical Repository Layout

```bash
├── package.json               # Package configurations & environment scripts
├── vite.config.ts             # Vite server bundling parameters (port 3000 mapping)
├── metadata.json              # Applet metadata (Frame permissions, capabilities)
├── src/
│   ├── main.tsx               # Main runtime bootloader
│   ├── App.tsx                # Master state hub and routing logic
│   ├── index.css              # Global styles importing Tailwind CSS
│   ├── types.ts               # Core shared TypeScript interfaces and state models
│   ├── data.ts                # Scholar course paths and hub databases
│   └── components/            # Modular functional view components
│       ├── AuthPage.tsx       # Auth portal (Log In / Sign Up)
│       ├── Header.tsx         # Universal Topbar containing quick panel configurations
│       ├── UserProfileForm.tsx# Profile modification panel (Name/Email/Password/Avatar)
│       ├── Hero.tsx           # Visually striking portal introduction viewport
│       ├── FeatureGrid.tsx    # Showcase grids highlighting platform benefits
│       ├── DashboardPreview.tsx# Previews of active dashboards
│       ├── OnboardingModal.tsx# Onboarding preferences alignment builder
│       └── VideoDemoModal.tsx # Full screen overlay running video overviews
```

---

## 🛠️ Developer Setup & Deployment

### Dependencies Install
To download and install the required modules, run:
```bash
npm install
```

### Run Locally (Development server)
Spin up the local developer server binding to port `3000` by executing:
```bash
npm run dev
```

### Static Application Build
To bundle the application into optimized static assets in `/dist`, run:
```bash
npm run build
```

### Source Code Analysis
Verify that typing signatures and static imports contain zero compilation issues:
```bash
npm run lint
```
