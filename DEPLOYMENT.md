# Deployment Guide for R Ceramica Website

## 🚀 Quick Deployment Options

### Option 1: Static Hosting Services (Recommended)

#### **Netlify** (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Sign up for a free account
3. Drag and drop your project folder to the deployment area
4. Your site will be live in minutes with a free subdomain
5. Optional: Configure custom domain

#### **Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub/GitLab
3. Import your repository or upload files
4. Automatic deployment with free SSL

#### **GitHub Pages**
1. Create a GitHub repository
2. Upload your files
3. Go to repository Settings > Pages
4. Select source branch (main/master)
5. Site will be available at `username.github.io/repository-name`

### Option 2: Traditional Web Hosting

#### **Shared Hosting** (GoDaddy, Bluehost, etc.)
1. Purchase hosting plan
2. Access cPanel or hosting control panel
3. Upload files to `public_html` or `www` folder
4. Configure domain if needed

#### **VPS/Cloud Hosting**
1. Set up server (Ubuntu/CentOS)
2. Install web server (Nginx/Apache)
3. Upload files to web directory
4. Configure domain and SSL

## 📋 Pre-Deployment Checklist

### 1. Content Updates
- [ ] Update contact information in `index.html`
- [ ] Replace placeholder phone numbers and emails
- [ ] Update business address
- [ ] Replace social media links with actual profiles

### 2. SEO Configuration
- [ ] Update `sitemap.xml` with actual domain
- [ ] Update `robots.txt` with actual domain
- [ ] Add Google Analytics tracking code (optional)
- [ ] Add favicon.ico file

### 3. Performance Optimization
- [ ] Compress images (use tools like TinyPNG)
- [ ] Minify CSS and JavaScript (optional for production)
- [ ] Enable gzip compression on server
- [ ] Set up CDN for faster loading (optional)

### 4. Testing
- [ ] Test on different devices (mobile, tablet, desktop)
- [ ] Test in different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Check all links work correctly
- [ ] Verify contact forms functionality
- [ ] Test loading speed

## 🔧 File Structure for Deployment

```
website-root/
├── index.html
├── contact.html
├── sitemap.xml
├── robots.txt
├── css/
│   ├── style.css
│   └── utilities.css
├── js/
│   └── script.js
├── images/
│   └── [all product images]
├── logo/
│   └── logo.jpeg
└── pdf/
    └── [all catalog files]
```

## 🌐 Domain Configuration

### DNS Settings
If using a custom domain:
```
Type    Name    Value
A       @       [Your hosting IP]
CNAME   www     [Your hosting domain]
```

### SSL Certificate
- Most modern hosting providers offer free SSL
- For manual setup, use Let's Encrypt
- Ensure all HTTP traffic redirects to HTTPS

## ⚙️ Server Configuration

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomainname.com www.yourdomainname.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomainname.com www.yourdomainname.com;
    
    root /var/www/rceramica;
    index index.html;
    
    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript text/javascript;
    
    # Cache static files
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
}
```

### Apache Configuration (.htaccess)
```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static files
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/x-javascript "access plus 1 month"
    ExpiresByType application/x-shockwave-flash "access plus 1 month"
    ExpiresByType image/x-icon "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## 📊 Analytics & Monitoring

### Google Analytics
Add this code before closing `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Google Search Console
1. Verify domain ownership
2. Submit sitemap.xml
3. Monitor search performance

## 🔄 Maintenance

### Regular Updates
- Update product catalogs
- Add new product images
- Update contact information
- Monitor website performance
- Check for broken links

### Backup Strategy
- Regular website backups
- Database backups (if applicable)
- Store backups in multiple locations

### Security Updates
- Keep server software updated
- Monitor for security vulnerabilities
- Use strong passwords
- Enable two-factor authentication

## 📞 Support

For technical support or updates:
- Contact your hosting provider
- Consult documentation for your specific platform
- Consider hiring a web developer for major updates

---

**Deployment Time Estimate**: 30 minutes to 2 hours depending on method chosen

**Cost Estimate**: 
- Free hosting: $0/month (Netlify, GitHub Pages)
- Shared hosting: $3-15/month
- VPS hosting: $5-50/month
- Domain: $10-15/year