# Deploying Your Affiliate Site to Netlify Step-by-Step Guide

Since you've already created a Netlify account and connected it to GitHub, here's the exact process to get your affiliate website live:

## Step 1: Create a GitHub Repository

1. Log in to your GitHub account
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "smart-tech-advisor" or "affiliate-website")
4. Make it public (for easier Netlify integration)
5. Click "Create repository"

## Step 2: Upload Your Website Files to GitHub

### Option A: Using GitHub Web Interface (Easiest)

1. In your new GitHub repository, click "Add file" > "Upload files"
2. Select all files from your "MONEY MAKER" folder:
   - index.html
   - styles.css
   - script.js
   - privacy-policy.html
   - terms.html
   - affiliate-disclosure.html
   - README.md
   - (and any other files)
3. Add a commit message like "Initial website upload"
4. Click "Commit changes"

### Option B: Using Git Commands (If You're Familiar with Git)

```bash
# Navigate to your website folder
cd c:/Users/beres/Desktop/MONEY MAKER

# Initialize Git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial website upload"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy on Netlify

1. Log in to your Netlify account
2. Click the "Add new site" button
3. Select "Import an existing project"
4. Choose GitHub as your Git provider
5. Select the repository you just created
6. Configure your build settings:
   - Build command: Leave empty (not needed for simple HTML/CSS/JS sites)
   - Publish directory: Leave empty (or use "." if required)
7. Click "Deploy site"

## Step 4: Configure Your Netlify Site

1. While your site is deploying, click on "Site settings"
2. Under "General" > "Site details" > "Site name", click "Change site name"
3. Choose a custom subdomain (e.g., "smart-tech-advisor.netlify.app")
4. Click "Save"

## Step 5: Verify Your Deployment

1. Once deployment is complete (usually within 1-2 minutes), Netlify will provide a URL (e.g., https://smart-tech-advisor.netlify.app)
2. Click the URL to visit your live site
3. Test all pages and features to ensure everything works properly
4. Test your affiliate links to make sure they are correctly tracking with your bez01-21 ID

## Step 6: Set Up Continuous Deployment (Optional but Recommended)

With Netlify and GitHub connected, any changes you push to your GitHub repository will automatically trigger a new deployment:

1. If you update any files on your computer, push them to GitHub
2. Netlify will detect the changes and automatically redeploy your site
3. Your live site will be updated within minutes

## Step 7: Custom Domain Setup (Optional - When You're Ready to Upgrade)

When you're ready to use a professional domain:

1. Purchase a domain from a registrar like Namecheap or GoDaddy
2. In Netlify, go to "Site settings" > "Domain management" > "Custom domains"
3. Click "Add custom domain"
4. Enter your domain name and follow the prompts to verify ownership
5. Netlify will guide you through updating your DNS settings at your domain registrar

## Troubleshooting Common Issues

### If Images Don't Appear
- Make sure image paths are correct (case-sensitive)
- Consider using absolute URLs for images (https://i.imgur.com/... links)

### If Links Don't Work
- Check for typos in your href attributes
- Ensure paths are correct for internal pages

### If Styles Don't Apply
- Verify the path to your CSS file is correct
- Check for any console errors in your browser's developer tools

## Next Steps After Deployment

Once your site is live:

1. Start implementing the traffic strategies from traffic-strategies.md
2. Set up Google Analytics to track visitor behavior
3. Create a content calendar for expanding your site
4. Consider adding more products or categories based on performance

You now have a fully functional affiliate website that can generate passive income through Amazon commissions! The more traffic you drive to your site, the more potential earnings you'll generate.
