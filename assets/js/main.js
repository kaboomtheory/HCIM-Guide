// HCIM Guide - Main JavaScript

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered successfully:', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showNotification('New version available! Refresh to update.', 'info');
            }
          });
        });
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
  
  // Handle online/offline status
  window.addEventListener('online', () => {
    showNotification('You are back online!', 'success');
  });
  
  window.addEventListener('offline', () => {
    showNotification('You are offline. Some features may be limited.', 'warning');
  });
}

// Offline Detection and Management
function initializeOfflineDetection() {
  // Create offline indicator
  const offlineIndicator = document.createElement('div');
  offlineIndicator.className = 'offline-indicator';
  offlineIndicator.textContent = 'You are currently offline. Some features may be limited.';
  document.body.appendChild(offlineIndicator);

  // Check initial online status
  if (!navigator.onLine) {
    offlineIndicator.classList.add('show');
  }

  // Listen for online/offline events
  window.addEventListener('online', () => {
    offlineIndicator.classList.remove('show');
    showNotification('You are back online!', 'success');
  });

  window.addEventListener('offline', () => {
    offlineIndicator.classList.add('show');
    showNotification('You are offline. Some features may be limited.', 'warning');
  });
}

// Service Worker Update Management
function initializeServiceWorkerUpdates() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      showNotification('New version loaded! Refresh to see updates.', 'info');
    });
  }
}

// Lazy Loading for Images
function initializeLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// Mobile-Specific Enhancements
function initializeMobileEnhancements() {
  // Check if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    initializeMobileGestures();
    initializeMobileScrollIndicators();
    initializeMobilePullToRefresh();
    initializeMobileTouchOptimizations();
  }
}

// Mobile gesture support
function initializeMobileGestures() {
  let startY = 0;
  let currentY = 0;
  let isScrolling = false;
  
  // Touch start
  document.addEventListener('touchstart', function(e) {
    startY = e.touches[0].clientY;
    isScrolling = false;
  }, { passive: true });
  
  // Touch move
  document.addEventListener('touchmove', function(e) {
    currentY = e.touches[0].clientY;
    const diffY = startY - currentY;
    
    // Detect pull-to-refresh gesture
    if (window.scrollY === 0 && diffY < -50) {
      showPullToRefreshIndicator();
    }
  }, { passive: true });
  
  // Touch end
  document.addEventListener('touchend', function(e) {
    if (isScrolling) return;
    
    const diffY = startY - currentY;
    
    // Pull-to-refresh
    if (window.scrollY === 0 && diffY < -100) {
      handlePullToRefresh();
    }
  }, { passive: true });
}

// Mobile scroll indicators
function initializeMobileScrollIndicators() {
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  scrollIndicator.innerHTML = '↑';
  scrollIndicator.setAttribute('aria-label', 'Scroll to top');
  scrollIndicator.setAttribute('role', 'button');
  scrollIndicator.setAttribute('tabindex', '0');
  document.body.appendChild(scrollIndicator);
  
  // Show/hide based on scroll position
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollIndicator.classList.add('show');
    } else {
      scrollIndicator.classList.remove('show');
    }
  });
  
  // Click to scroll to top
  scrollIndicator.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Keyboard support
  scrollIndicator.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

// Mobile pull-to-refresh
function initializeMobilePullToRefresh() {
  const pullIndicator = document.createElement('div');
  pullIndicator.className = 'pull-refresh-indicator';
  pullIndicator.innerHTML = '🔄 Refreshing...';
  pullIndicator.setAttribute('aria-live', 'polite');
  document.body.appendChild(pullIndicator);
}

function showPullToRefreshIndicator() {
  const indicator = document.querySelector('.pull-refresh-indicator');
  if (indicator) {
    indicator.classList.add('show');
  }
}

function hidePullToRefreshIndicator() {
  const indicator = document.querySelector('.pull-refresh-indicator');
  if (indicator) {
    indicator.classList.remove('show');
  }
}

function handlePullToRefresh() {
  showPullToRefreshIndicator();
  
  // Simulate refresh (in real app, this would reload data)
  setTimeout(() => {
    hidePullToRefreshIndicator();
    showNotification('Page refreshed!', 'success');
  }, 1000);
}

// Mobile touch optimizations
function initializeMobileTouchOptimizations() {
  // Prevent zoom on double tap
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  
  // Optimize touch targets
  document.querySelectorAll('.btn, .step-checkbox, .accordion-button').forEach(element => {
    element.style.touchAction = 'manipulation';
  });
  
  // Add haptic feedback for iOS
  if ('vibrate' in navigator) {
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('touchstart', function() {
        navigator.vibrate(10);
      });
    });
  }
}

// Accessibility Enhancements
function initializeAccessibilityEnhancements() {
  initializeARIALabels();
  initializeKeyboardNavigation();
  initializeScreenReaderSupport();
  initializeFocusManagement();
  initializeLiveRegions();
}

// Skip links for keyboard users
function initializeSkipLinks() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);
}

// ARIA labels and descriptions
function initializeARIALabels() {
  // Add ARIA labels to interactive elements
  document.querySelectorAll('.btn').forEach(button => {
    if (!button.getAttribute('aria-label')) {
      const text = button.textContent.trim();
      button.setAttribute('aria-label', text);
    }
  });
  
  // Add ARIA descriptions to complex elements
  document.querySelectorAll('.step-container').forEach((container, index) => {
    const checkbox = container.querySelector('.step-checkbox');
    const content = container.querySelector('.step-content');
    
    if (checkbox && content) {
      const stepNumber = index + 1;
      checkbox.setAttribute('aria-describedby', `step-${stepNumber}-desc`);
      content.id = `step-${stepNumber}-desc`;
    }
  });
  
  // Add ARIA states to accordions
  document.querySelectorAll('.accordion-button').forEach(button => {
    const content = button.nextElementSibling;
    const isExpanded = content.style.display !== 'none';
    
    button.setAttribute('aria-expanded', isExpanded);
    button.setAttribute('aria-controls', content.id || 'accordion-content');
    
    if (!content.id) {
      content.id = 'accordion-content-' + Math.random().toString(36).substr(2, 9);
    }
  });
}

// Enhanced keyboard navigation
function initializeKeyboardNavigation() {
  // Tab trap for modals
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' && document.querySelector('.modal-overlay')) {
      const modal = document.querySelector('.modal-overlay');
      const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });
  
  // Enter key support for buttons
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
      e.target.click();
    }
  });
  
  // Space key support for checkboxes
  document.addEventListener('keydown', function(e) {
    if (e.key === ' ' && e.target.classList.contains('step-checkbox')) {
      e.preventDefault();
      e.target.checked = !e.target.checked;
      if (typeof toggleStep === 'function') {
        toggleStep(e.target);
      }
    }
  });
}

// Screen reader support
function initializeScreenReaderSupport() {
  // Announce progress changes
  const progressAnnouncement = document.createElement('div');
  progressAnnouncement.className = 'progress-announcement';
  progressAnnouncement.setAttribute('aria-live', 'polite');
  progressAnnouncement.setAttribute('aria-atomic', 'true');
  document.body.appendChild(progressAnnouncement);
  
  // Announce step completions
  document.querySelectorAll('.step-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const stepContent = this.closest('.step-container').querySelector('.step-content');
      const status = this.checked ? 'completed' : 'unchecked';
      const announcement = `${stepContent.textContent} ${status}`;
      
      progressAnnouncement.textContent = announcement;
      setTimeout(() => {
        progressAnnouncement.textContent = '';
      }, 1000);
    });
  });
}

// Focus management
function initializeFocusManagement() {
  // Remember last focused element
  let lastFocusedElement = null;
  
  document.addEventListener('focusin', function(e) {
    lastFocusedElement = e.target;
  });
  
  // Restore focus after modal closes
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.querySelector('.modal-overlay')) {
      const modal = document.querySelector('.modal-overlay');
      modal.remove();
      
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    }
  });
  
  // Focus management for accordions
  document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const isExpanded = content.style.display !== 'none';
      
      this.setAttribute('aria-expanded', !isExpanded);
      
      // Focus first focusable element in expanded content
      if (!isExpanded) {
        setTimeout(() => {
          const firstFocusable = content.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (firstFocusable) {
            firstFocusable.focus();
          }
        }, 100);
      }
    });
  });
}

// Live regions for dynamic content
function initializeLiveRegions() {
  // Create live region for notifications
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  document.body.appendChild(liveRegion);
  
  // Announce search results
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const results = document.querySelectorAll('.search-result-item');
      if (results.length > 0) {
        liveRegion.textContent = `Found ${results.length} search results`;
      }
    });
  }
  
  // Announce progress updates
  const progressText = document.getElementById('progress-text');
  if (progressText) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          liveRegion.textContent = `Progress updated: ${progressText.textContent}`;
        }
      });
    });
    
    observer.observe(progressText, { childList: true });
  }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('HCIM Guide loaded successfully');
    
    // Initialize all interactive features
    initializeAccessibility();
    initializeNotifications();
    initializeLoadingStates();
    initializeSmoothScrolling();
    initializeChapterInteractions();
    initializeDisclaimerToggle();
    initializeResourceLinks();
    initializeLazyLoading();
    initializeOfflineDetection();
    initializeServiceWorkerUpdates();
    initializeMobileEnhancements();
    initializeAccessibilityEnhancements();
});

// Accessibility features
function initializeAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideAllModals();
        }
    });
    
    // Add focus management
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusable = [...document.querySelectorAll(focusableElements)];
            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Notification system
let notificationTimeout;

function initializeNotifications() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'notification-container';
        container.setAttribute('role', 'alert');
        container.setAttribute('aria-live', 'polite');
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 5000) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; font-size: 1.2rem;">×</button>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Auto-remove after duration
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, duration);
    
    return notification;
}

// Loading states
function initializeLoadingStates() {
    const buttons = document.querySelectorAll('.btn:not(.btn-disabled)');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('btn-disabled')) return;
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="btn-icon">⏳</span> Loading...';
            this.style.opacity = '0.7';
            this.disabled = true;
            
            // Simulate loading (remove this in production)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.opacity = '1';
                this.disabled = false;
            }, 1000);
        });
    });
}

// Smooth scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Chapter interactions
function initializeChapterInteractions() {
    // Add hover effects for chapter cards
    document.querySelectorAll('.chapter-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Chapter preview functionality
function showChapterPreview(chapterNumber) {
    const previews = {
        1: {
            title: "Chapter 1 Preview",
            content: "This chapter covers the essential early-game progression including Tutorial Island completion, Wintertodt training, and Desert Treasure quest. You'll learn efficient methods for Firemaking, Thieving, and early quest completion.",
            highlights: [
                "Complete Tutorial Island efficiently",
                "Train Firemaking to 99 at Wintertodt",
                "Earn 1.25M GP from blackjacking",
                "Complete Desert Treasure quest"
            ]
        },
        2: {
            title: "Chapter 2 Preview",
            content: "Advanced questing and diary completion. This chapter focuses on unlocking key content and preparing for end-game activities.",
            highlights: [
                "Advanced quest progression",
                "Diary completion strategies",
                "Content unlock optimization",
                "Mid-game preparation"
            ]
        },
        3: {
            title: "Chapter 3 Preview",
            content: "Final preparations and end-game content optimization. Learn bossing strategies and end-game efficiency methods.",
            highlights: [
                "End-game preparation",
                "Bossing strategies",
                "Content optimization",
                "Final efficiency methods"
            ]
        }
    };
    
    const preview = previews[chapterNumber];
    if (!preview) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${preview.title}</h3>
                <button onclick="this.closest('.modal-overlay').remove()" class="modal-close">×</button>
            </div>
            <div class="modal-body">
                <p>${preview.content}</p>
                <h4>Key Highlights:</h4>
                <ul>
                    ${preview.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-footer">
                <button onclick="this.closest('.modal-overlay').remove()" class="btn btn-secondary">Close</button>
                ${chapterNumber === 1 ? '<a href="chapters/chapter1.html" class="btn btn-primary">Start Chapter</a>' : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles if not already present
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }
            .modal-content {
                background: #2d2d2d;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                border: 1px solid #4a4a4a;
            }
            .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid #4a4a4a;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .modal-header h3 {
                margin: 0;
                color: #ffffff;
            }
            .modal-close {
                background: none;
                border: none;
                color: #a0a0a0;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s;
            }
            .modal-close:hover {
                background: #4a4a4a;
                color: #ffffff;
            }
            .modal-body {
                padding: 1.5rem;
                color: #e0e0e0;
            }
            .modal-body h4 {
                color: #ffffff;
                margin-top: 1rem;
                margin-bottom: 0.5rem;
            }
            .modal-body ul {
                margin: 0;
                padding-left: 1.5rem;
            }
            .modal-body li {
                margin-bottom: 0.5rem;
            }
            .modal-footer {
                padding: 1.5rem;
                border-top: 1px solid #4a4a4a;
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
        `;
        document.head.appendChild(style);
    }
}

// Notification system for coming soon chapters
function notifyWhenAvailable(chapterNumber) {
    showNotification(`You'll be notified when Chapter ${chapterNumber} is available!`, 'info');
    
    // In a real application, this would save to localStorage or send to a server
    const notifications = JSON.parse(localStorage.getItem('chapterNotifications') || '[]');
    if (!notifications.includes(chapterNumber)) {
        notifications.push(chapterNumber);
        localStorage.setItem('chapterNotifications', JSON.stringify(notifications));
    }
}

// Disclaimer toggle
function initializeDisclaimerToggle() {
    const toggle = document.querySelector('.disclaimer-toggle');
    const details = document.querySelector('#disclaimer-details');
    
    if (toggle && details) {
        toggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (isExpanded) {
                details.hidden = true;
                this.querySelector('.toggle-text').textContent = 'Show More Details';
                this.querySelector('.toggle-icon').textContent = '▼';
            } else {
                details.hidden = false;
                this.querySelector('.toggle-text').textContent = 'Show Less Details';
                this.querySelector('.toggle-icon').textContent = '▲';
            }
        });
    }
}

// Resource links with external link handling
function initializeResourceLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a small delay to show the notification
            setTimeout(() => {
                showNotification('Opening external link...', 'info', 2000);
            }, 100);
        });
    });
}

// Utility functions
function hideAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => modal.remove());
}

function showLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.hidden = false;
    }
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.hidden = true;
    }
}

// Feedback form (placeholder)
function showFeedbackForm() {
    showNotification('Feedback form coming soon!', 'info');
}

// About modal (placeholder)
function showAbout() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>About This Guide</h3>
                <button onclick="this.closest('.modal-overlay').remove()" class="modal-close">×</button>
            </div>
            <div class="modal-body">
                <p>This guide was created by <strong>So Iron BRUH</strong> in collaboration with <strong>ParasailerOSRS</strong> to provide the most efficient Ironman progression path.</p>
                <p>The guide focuses on maximum efficiency while maintaining a logical progression through the game's content.</p>
                <p><strong>Version:</strong> 1.0.0</p>
                <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="modal-footer">
                <button onclick="this.closest('.modal-overlay').remove()" class="btn btn-secondary">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Global functions for onclick handlers
window.showChapterPreview = showChapterPreview;
window.notifyWhenAvailable = notifyWhenAvailable;
window.toggleDisclaimerDetails = function() {
    const toggle = document.querySelector('.disclaimer-toggle');
    if (toggle) toggle.click();
};
window.showFeedbackForm = showFeedbackForm;
window.showAbout = showAbout;

// Test loading animation (for debugging)
window.testLoading = function() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        showNotification('Loading animation test completed!', 'success');
    }, 2000);
};

// Make loading functions globally available
window.showLoading = showLoading;
window.hideLoading = hideLoading; 