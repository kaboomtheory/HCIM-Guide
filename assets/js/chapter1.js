// HCIM Guide - Chapter 1 JavaScript

// Progress tracking functionality
let completedSteps = JSON.parse(localStorage.getItem('hcim-chapter1-progress') || '[]');

function updateProgress() {
  const checkboxes = document.querySelectorAll('.step-checkbox');
  const totalSteps = checkboxes.length;
  const completedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
  
  // Update progress bar
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  
  if (progressFill) {
    progressFill.style.width = progressPercent + '%';
  }
  
  // Determine current section based on progress
  let currentSection = '';
  if (completedCount === 0) {
    currentSection = 'Starting out';
  } else if (completedCount <= 20) {
    currentSection = 'Section 1.1: Tutorial Island to Wintertodt';
  } else if (completedCount <= 80) {
    currentSection = 'Section 1.2: Fishing and Thieving';
  } else if (completedCount <= 120) {
    currentSection = 'Section 1.3: Bird Runs';
  } else if (completedCount <= 180) {
    currentSection = 'Section 1.4: Advanced Progression';
  } else {
    currentSection = 'Chapter Complete!';
  }
  
  if (progressText) {
    progressText.textContent = `${progressPercent}% Complete - ${currentSection}`;
  }
  
  // Update section progress displays
  updateSectionProgress();
}

function toggleAccordion(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('.accordion-icon');
  
  if (content.style.display === 'none' || content.style.display === '') {
    content.style.display = 'block';
    icon.textContent = '▼';
    button.classList.add('active');
  } else {
    content.style.display = 'none';
    icon.textContent = '▶';
    button.classList.remove('active');
  }
}

function expandAll() {
  document.querySelectorAll('.accordion-content').forEach(content => {
    content.style.display = 'block';
  });
  document.querySelectorAll('.accordion-button').forEach(button => {
    const icon = button.querySelector('.accordion-icon');
    icon.textContent = '▼';
    button.classList.add('active');
  });
}

function collapseAll() {
  document.querySelectorAll('.accordion-content').forEach(content => {
    content.style.display = 'none';
  });
  document.querySelectorAll('.accordion-button').forEach(button => {
    const icon = button.querySelector('.accordion-icon');
    icon.textContent = '▶';
    button.classList.remove('active');
  });
}

// Initialize accordions as expanded by default
function initializeAccordions() {
  document.querySelectorAll('.accordion-content').forEach(content => {
    content.style.display = 'block';
  });
  document.querySelectorAll('.accordion-button').forEach(button => {
    const icon = button.querySelector('.accordion-icon');
    icon.textContent = '▼';
    button.classList.add('active');
  });
}

function updateSectionProgress() {
  const sections = ['section1', 'section2', 'section3', 'section4'];
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const checkboxes = section.querySelectorAll('.step-checkbox');
      const completedInSection = Array.from(checkboxes).filter(cb => cb.checked).length;
      const totalInSection = checkboxes.length;
      const sectionProgress = totalInSection > 0 ? Math.round((completedInSection / totalInSection) * 100) : 0;
      
      const progressElement = section.querySelector('.section-progress');
      if (progressElement) {
        progressElement.textContent = `${completedInSection}/${totalInSection} (${sectionProgress}%)`;
      }
    }
  });
}

function toggleStep(checkbox) {
  const stepId = checkbox.getAttribute('data-step-id');
  const stepContainer = checkbox.closest('.step-container');
  
  if (checkbox.checked) {
    if (!completedSteps.includes(stepId)) {
      completedSteps.push(stepId);
    }
    stepContainer.classList.add('step-completed');
  } else {
    completedSteps = completedSteps.filter(id => id !== stepId);
    stepContainer.classList.remove('step-completed');
  }
  
  localStorage.setItem('hcim-chapter1-progress', JSON.stringify(completedSteps));
  updateProgress();
}

function resetProgress() {
  if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
    completedSteps = [];
    localStorage.removeItem('hcim-chapter1-progress');
    
    // Uncheck all checkboxes
    document.querySelectorAll('.step-checkbox').forEach(cb => {
      cb.checked = false;
    });
    
    // Remove completed styling
    document.querySelectorAll('.step-container').forEach(container => {
      container.classList.remove('step-completed');
    });
    
    updateProgress();
  }
}

function exportProgress() {
  const progress = {
    completedSteps: completedSteps,
    timestamp: new Date().toISOString(),
    totalSteps: document.querySelectorAll('.step-checkbox').length
  };
  
  const dataStr = JSON.stringify(progress, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'hcim-chapter1-progress.json';
  link.click();
  
  URL.revokeObjectURL(url);
}

function importProgress() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const progress = JSON.parse(e.target.result);
          completedSteps = progress.completedSteps || [];
          localStorage.setItem('hcim-chapter1-progress', JSON.stringify(completedSteps));
          
          // Update checkboxes
          document.querySelectorAll('.step-checkbox').forEach(cb => {
            const stepId = cb.getAttribute('data-step-id');
            const stepContainer = cb.closest('.step-container');
            
            if (completedSteps.includes(stepId)) {
              cb.checked = true;
              stepContainer.classList.add('step-completed');
            } else {
              cb.checked = false;
              stepContainer.classList.remove('step-completed');
            }
          });
          
          updateProgress();
          alert('Progress imported successfully!');
        } catch (error) {
          alert('Error importing progress file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };
  
  input.click();
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Sidebar accordion functionality
function toggleSidebar() {
  const sidebarContent = document.getElementById('sidebar-content');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  
  if (sidebarContent.classList.contains('expanded')) {
    // Collapse
    sidebarContent.classList.remove('expanded');
    sidebarContent.classList.add('collapsed');
    sidebarToggle.classList.add('collapsed');
    sidebarContent.style.maxHeight = '0px';
  } else {
    // Expand
    sidebarContent.classList.remove('collapsed');
    sidebarContent.classList.add('expanded');
    sidebarToggle.classList.remove('collapsed');
    
    // Calculate the full height needed
    const contentHeight = sidebarContent.scrollHeight;
    sidebarContent.style.maxHeight = contentHeight + 'px';
    
    // After animation, set to auto to allow for dynamic content changes
    setTimeout(() => {
      if (sidebarContent.classList.contains('expanded')) {
        sidebarContent.style.maxHeight = 'none';
      }
    }, 300);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidebar accordion
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarContent = document.getElementById('sidebar-content');
  
  if (sidebarToggle && sidebarContent) {
    // Start collapsed on mobile
    if (window.innerWidth <= 768) {
      sidebarContent.classList.add('collapsed');
      sidebarToggle.classList.add('collapsed');
    } else {
      sidebarContent.classList.add('expanded');
    }
    
    sidebarToggle.addEventListener('click', toggleSidebar);
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        // Desktop: always expanded
        sidebarContent.classList.remove('collapsed');
        sidebarContent.classList.add('expanded');
        sidebarToggle.classList.remove('collapsed');
      } else {
        // Mobile: start collapsed if not already expanded
        if (!sidebarContent.classList.contains('expanded')) {
          sidebarContent.classList.add('collapsed');
          sidebarToggle.classList.add('collapsed');
        }
      }
    });
  }
  
  // Set up checkboxes with proper event listeners
  document.querySelectorAll('.step-checkbox').forEach((checkbox, index) => {
    // Generate step ID if not already present
    let stepId = checkbox.getAttribute('data-step-id');
    if (!stepId) {
      stepId = `step-${index + 1}`;
      checkbox.setAttribute('data-step-id', stepId);
    }
    
    // Check if step was previously completed
    if (completedSteps.includes(stepId)) {
      checkbox.checked = true;
      checkbox.closest('.step-container').classList.add('step-completed');
    }
    
    // Add event listener for change events
    checkbox.addEventListener('change', function() {
      toggleStep(this);
    });
    
    // Also add click event listener for better mobile support
    checkbox.addEventListener('click', function(e) {
      // Prevent double-triggering with change event
      e.stopPropagation();
    });
  });
  
  // Set up accordion functionality
  document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', function() {
      toggleAccordion(this);
    });
  });
  
  // Initialize accordions
  initializeAccordions();
  
  // Initialize progress bar
  updateProgress();
  
  // Add a small delay to ensure everything is loaded
  setTimeout(() => {
    updateProgress();
  }, 100);
}); 