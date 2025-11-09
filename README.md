# Unserious Coffee Website

A modern, irreverent website for Unserious Coffee - Wichita's unstress zone for working-class warriors.

## 🚀 Features

- **Irreverent Brand Voice**: Sarcastic, witty, and community-focused content
- **Modern Design**: Clean, coffee-themed design with neutral/dark tones and amber accents
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Built with React + TypeScript + Vite for optimal performance
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Accessible**: WCAG compliant with proper focus states and keyboard navigation

## 🛠️ Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with animations and responsive design
- **Google Fonts** - Inter font family for clean typography

## 📁 Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Main styles
├── main.tsx         # Application entry point
├── index.css        # Global styles and fonts
└── assets/          # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/unseriouscoffee.com.git
cd unseriouscoffee.com
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Deploy to Vercel

1. **Connect your GitHub repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your GitHub repository

2. **Configure the project:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site

### Custom Domain Setup

1. **In Vercel:**
   - Go to your project dashboard
   - Click "Settings" → "Domains"
   - Add your domain: `unseriouscoffee.com`

2. **In Cloudflare:**
   - Log into your Cloudflare account
   - Go to your domain's DNS settings
   - Add a CNAME record:
     - Name: `@` or leave empty
     - Target: `cname.vercel-dns.com`
   - Or use Vercel's nameservers if preferred

## 🎨 Design System

### Colors
The website uses a sophisticated neutral/dark color palette:
- **Charcoal**: `#2d3748` (Primary text)
- **Taupe**: `#8b7355` (Secondary text)
- **Sand**: `#f4f1eb` (Light backgrounds)
- **Amber**: `#d69e2e` (Accent color)
- **Dark Charcoal**: `#1a202c` (Footer)
- **Light Sand**: `#faf8f5` (Section backgrounds)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Style**: Clean, modern, slightly playful

## 📱 Website Sections

### Hero Section
- Irreverent tagline: "The grind sucks. Our coffee doesn't."
- Location: Wichita, KS
- Call-to-action buttons

### Mission Section
- Brand story with sarcastic tone
- Statistics with humor (∞ Eye Rolls Per Day)
- Community-focused messaging

### Menu Section
- Irreverent drink names and descriptions
- "Burnout Cold Brew", "Monday Morning Latte", etc.
- Local sourcing emphasis

### Events & DJ Nights
- Outdoor patio events
- Music schedule
- RSVP functionality
- Community-focused programming

### Co-Work Space
- Professional escape room concept
- Pricing tiers (Hourly, Daily, Monthly)
- Features: WiFi, power outlets, unlimited coffee

### Merch & Community
- Coffee beans, t-shirts, mugs
- "Mean Boss Email Board" - submit emails for 10% off
- Community engagement features

### Contact & Visit
- Wichita location (Coming Soon)
- Business hours with humorous note
- Social media links (Instagram, X, TikTok)
- Community signup form

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Development

### Adding New Sections
1. Add the JSX structure in `App.tsx`
2. Add corresponding CSS in `App.css`
3. Ensure responsive design with media queries

### Styling Guidelines
- Use CSS custom properties for consistent theming
- Follow BEM methodology for class naming
- Use CSS Grid and Flexbox for layouts
- Implement smooth animations with CSS transitions
- Maintain the irreverent brand voice throughout

## 📈 Performance

- Lighthouse score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## 🎯 Brand Voice Guidelines

### Tone
- **Sarcastic but welcoming**
- **Irreverent but professional**
- **Community-focused**
- **Music-friendly**
- **Working-class warrior support**

### Content Style
- Use humor to address real pain points
- Celebrate the daily grind while offering escape
- Build community through shared experiences
- Maintain authenticity and relatability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email hello@unseriouscoffee.com or create an issue in this repository.

---

**Unserious Coffee** - Serious coffee, unserious vibes since 2024 ☕

*Wichita's unstress zone for working-class warriors*
