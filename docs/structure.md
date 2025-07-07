# HCIM Guide - File Structure Documentation

## Overview

The HCIM Guide has been restructured for better efficiency, maintainability, and performance. This document outlines the new structure and best practices for maintaining the guide.

## File Structure

```
HCIM-Guide/
├── index.html                          # Main landing page
├── chapters/
│   ├── chapter1.html                   # Original chapter (kept for reference)
│   └── chapter1-restructured.html      # New efficient version
├── assets/
│   ├── css/
│   │   ├── main.css                    # General styles (legacy)
│   │   └── chapter1.css                # Chapter 1 specific styles
│   └── js/
│       └── chapter1.js                 # Chapter 1 JavaScript functionality
├── docs/
│   ├── setup.md                        # Setup instructions
│   ├── contributing.md                 # Contribution guidelines
│   └── structure.md                    # This file
└── resources/
    ├── changelogs/
    └── detailed-steps/
```

## Key Improvements

### 1. **Separation of Concerns**
- **HTML**: Pure content structure
- **CSS**: All styling in external files
- **JavaScript**: All functionality in external files

### 2. **Performance Benefits**
- **Caching**: External CSS/JS files can be cached by browsers
- **Parallel Loading**: CSS and JS load in parallel with HTML
- **Reduced File Size**: HTML files are much smaller and load faster

### 3. **Maintainability**
- **Modular CSS**: Styles are organized by component
- **Reusable JavaScript**: Functions can be shared across chapters
- **Easier Updates**: Changes to styling or functionality don't require editing HTML

### 4. **Developer Experience**
- **Better Organization**: Clear separation of content, style, and behavior
- **Easier Debugging**: Issues can be isolated to specific files
- **Version Control**: Smaller, focused changes are easier to track

## File Descriptions

### HTML Files
- **`index.html`**: Landing page with chapter navigation
- **`chapters/chapter1-restructured.html`**: Efficient version of Chapter 1

### CSS Files
- **`assets/css/main.css`**: General styles (legacy, may be deprecated)
- **`assets/css/chapter1.css`**: Complete styling for Chapter 1 including:
  - Dark theme with orange accents
  - Responsive sidebar design
  - Interactive step containers
  - Accordion functionality
  - Chapter completion styling

### JavaScript Files
- **`assets/js/chapter1.js`**: Complete functionality for Chapter 1 including:
  - Progress tracking with localStorage
  - Accordion toggle functionality
  - Step completion management
  - Import/export progress features
  - Smooth scrolling

## Usage Guidelines

### Adding New Chapters
1. Create new HTML file in `chapters/` directory
2. Create corresponding CSS file in `assets/css/`
3. Create corresponding JS file in `assets/js/`
4. Update navigation in `index.html`

### Modifying Styles
1. Edit the appropriate CSS file
2. Test changes across different screen sizes
3. Ensure accessibility compliance (WCAG AA)

### Adding Functionality
1. Add JavaScript functions to the appropriate JS file
2. Test functionality thoroughly
3. Document any new features

### Content Updates
1. Edit only the HTML content
2. Preserve all CSS classes and data attributes
3. Test that all interactive features still work

## Performance Considerations

### CSS Optimization
- Use efficient selectors
- Minimize specificity conflicts
- Group related styles together
- Use CSS custom properties for consistent theming

### JavaScript Optimization
- Use event delegation where appropriate
- Minimize DOM queries
- Cache frequently used elements
- Use efficient data structures

### HTML Structure
- Keep semantic markup
- Use appropriate heading hierarchy
- Include proper ARIA labels
- Maintain accessibility features

## Browser Compatibility

The guide is designed to work with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility Features

- WCAG AA compliant color contrast
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic HTML structure

## Future Improvements

### Planned Enhancements
1. **Component System**: Create reusable CSS components
2. **Build Process**: Add minification and optimization
3. **Progressive Enhancement**: Add advanced features for modern browsers
4. **Analytics**: Track user progress and guide usage

### Potential Optimizations
1. **CSS-in-JS**: For more dynamic styling
2. **Service Worker**: For offline functionality
3. **PWA Features**: For mobile app-like experience
4. **Database Integration**: For cloud progress sync

## Maintenance Checklist

### Regular Tasks
- [ ] Test all interactive features
- [ ] Verify accessibility compliance
- [ ] Check cross-browser compatibility
- [ ] Update content as needed
- [ ] Optimize images and assets

### Before Releases
- [ ] Minify CSS and JavaScript
- [ ] Optimize images
- [ ] Test on multiple devices
- [ ] Validate HTML and CSS
- [ ] Check performance metrics

## Troubleshooting

### Common Issues
1. **Styles not loading**: Check CSS file paths
2. **JavaScript not working**: Check console for errors
3. **Progress not saving**: Check localStorage permissions
4. **Layout breaking**: Test responsive design

### Debug Tools
- Browser Developer Tools
- Lighthouse for performance
- WAVE for accessibility
- HTML/CSS validators

## Contributing

See `docs/contributing.md` for detailed contribution guidelines.

## Support

For issues or questions about the file structure, please refer to this documentation or create an issue in the repository. 