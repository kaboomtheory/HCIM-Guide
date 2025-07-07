# Setup Guide

This document explains how to set up and run the HCIM Guide locally for development or contribution.

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for cloning the repository)
- A text editor (VS Code, Sublime Text, etc.)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/HCIM-Guide.git
   cd HCIM-Guide
   ```

2. **Open the guide**
   - Simply open `index.html` in your web browser
   - Or use a local server for better development experience

## Local Development Server

For the best development experience, we recommend using a local server:

### Option 1: Python (if you have Python installed)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Option 2: Node.js (if you have Node.js installed)
```bash
# Install a simple HTTP server
npm install -g http-server

# Run the server
http-server -p 8000
```

### Option 3: VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

Then visit `http://localhost:8000` in your browser.

## File Structure

```
HCIM-Guide/
├── index.html              # Main landing page
├── README.md              # Project documentation
├── chapters/              # Individual chapter files
│   └── chapter1.html     # Chapter 1 content
├── assets/               # Static assets
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
│   └── images/          # Images and graphics
├── resources/            # Additional resources
│   ├── changelogs/      # Version history
│   └── detailed-steps/  # Detailed step breakdowns
└── docs/                # Documentation
    ├── setup.md         # This file
    └── contributing.md  # Contribution guidelines
```

## Development Guidelines

### HTML Structure
- Use semantic HTML5 elements
- Ensure proper heading hierarchy (h1 → h2 → h3)
- Include proper meta tags for SEO

### CSS Guidelines
- Use modern CSS features (Grid, Flexbox)
- Ensure responsive design for mobile devices
- Follow a consistent color scheme (blue theme)

### Content Guidelines
- Keep content concise and actionable
- Include time estimates where possible
- Provide alternative methods for different playstyles
- Update GP values and meta information regularly

## Browser Compatibility

The guide is designed to work on:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Troubleshooting

### Common Issues

1. **Links not working**
   - Ensure all file paths are relative to the repository root
   - Check that target files exist

2. **Styling issues**
   - Clear browser cache
   - Check browser console for CSS errors

3. **Content not loading**
   - Verify file permissions
   - Check for syntax errors in HTML files

### Getting Help

- Check the [README.md](../README.md) for general information
- Review [contributing.md](contributing.md) for development guidelines
- Open an issue on GitHub for bugs or feature requests

## Deployment

The guide can be deployed to any static hosting service:

- **GitHub Pages**: Push to a GitHub repository and enable Pages
- **Netlify**: Drag and drop the folder to Netlify
- **Vercel**: Connect your GitHub repository
- **Any web server**: Upload files to your web server

No build process is required - the guide is pure HTML/CSS/JavaScript. 