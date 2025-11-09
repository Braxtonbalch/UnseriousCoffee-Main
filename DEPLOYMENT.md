# Deployment Guide for Unserious Coffee Website

This guide will walk you through deploying your Unserious Coffee website to Vercel and connecting your custom domain.

## 🚀 Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Unserious Coffee website"
   ```

2. **Create GitHub Repository**:
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it `unseriouscoffee.com`
   - Make it public or private (your choice)
   - Don't initialize with README (we already have one)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/unseriouscoffee.com.git
   git branch -M main
   git push -u origin main
   ```

## 🌐 Step 2: Deploy to Vercel

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"

2. **Import Your Repository**:
   - Select your `unseriouscoffee.com` repository
   - Vercel will automatically detect it's a Vite project

3. **Configure Project Settings**:
   - **Framework Preset**: Vite (should auto-detect)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your site will be live at a Vercel URL like `https://unseriouscoffee.com-xxx.vercel.app`

## 🔗 Step 3: Connect Custom Domain

### Option A: Using Vercel's Nameservers (Recommended)

1. **In Vercel Dashboard**:
   - Go to your project dashboard
   - Click "Settings" → "Domains"
   - Add your domain: `unseriouscoffee.com`
   - Vercel will provide nameservers

2. **In Cloudflare**:
   - Log into your Cloudflare account
   - Go to your domain's dashboard
   - Click "DNS" → "Nameservers"
   - Change to "Custom nameservers"
   - Add Vercel's nameservers (usually `ns1.vercel-dns.com` and `ns2.vercel-dns.com`)

### Option B: Using CNAME Record

1. **In Vercel Dashboard**:
   - Go to your project dashboard
   - Click "Settings" → "Domains"
   - Add your domain: `unseriouscoffee.com`
   - Note the CNAME target (usually `cname.vercel-dns.com`)

2. **In Cloudflare**:
   - Go to your domain's DNS settings
   - Add a CNAME record:
     - **Name**: `@` (or leave empty for root domain)
     - **Target**: `cname.vercel-dns.com`
     - **Proxy status**: DNS only (gray cloud)

## ⚙️ Step 4: SSL and Security

1. **SSL Certificate**:
   - Vercel automatically provides SSL certificates
   - Your site will be available at `https://unseriouscoffee.com`

2. **Security Headers**:
   - The `vercel.json` file includes security headers
   - These are automatically applied to your deployment

## 📊 Step 5: Verify Deployment

1. **Check Your Site**:
   - Visit `https://unseriouscoffee.com`
   - Test all sections and functionality
   - Check mobile responsiveness

2. **Performance Check**:
   - Run Lighthouse audit in Chrome DevTools
   - Should score 95+ in all categories

## 🔄 Step 6: Continuous Deployment

- Every time you push to the `main` branch on GitHub, Vercel will automatically redeploy
- You can also trigger manual deployments from the Vercel dashboard

## 🛠️ Troubleshooting

### Common Issues:

1. **Domain Not Working**:
   - DNS changes can take up to 48 hours to propagate
   - Check DNS propagation with tools like [whatsmydns.net](https://whatsmydns.net)

2. **Build Errors**:
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`

3. **SSL Issues**:
   - Vercel handles SSL automatically
   - If you see SSL errors, wait a few minutes for certificate generation

### Getting Help:

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Cloudflare Support**: [support.cloudflare.com](https://support.cloudflare.com)
- **GitHub Issues**: Create an issue in your repository

## 🎉 Success!

Once deployed, your Unserious Coffee website will be live at:
- **Primary URL**: `https://unseriouscoffee.com`
- **Vercel URL**: `https://unseriouscoffee.com-xxx.vercel.app` (fallback)

Your website features:
- ✅ Modern, responsive design
- ✅ Fast loading times
- ✅ SEO optimized
- ✅ Mobile-friendly
- ✅ SSL secured
- ✅ Automatic deployments

---

**Next Steps:**
1. Update the content with your actual business information
2. Add real photos and menu items
3. Connect your social media accounts
4. Set up analytics (Google Analytics, etc.)
5. Consider adding an online ordering system

**Unserious Coffee** - Serious coffee, unserious vibes! ☕ 