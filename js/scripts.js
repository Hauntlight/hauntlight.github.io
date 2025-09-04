(function() {
  'use strict';

  /**
   * Data for the Publications section.
   * Adding an 'award' property allows us to dynamically add badges.
   */
  const publicationsData = [
    { date: 'Nov 2025', title: 'On the use of Test-Driven Development for Embedded Systems', description: 'Special contribution for the International Journal Information and Software Technology (IST) as special Issue.' },
    { date: 'Oct 2025', title: 'A Mining-Software-Repository study on deprecated API usages', description: 'Special contribution for the IST Journal with the extension of the article presented at PROFES 2023.' },
    { date: 'Apr 2025', title: 'Do LLMs Provide Links to Code Similar to What They Generate?', description: 'Research Paper at the MSR 2025 conference.' },
    { date: 'Oct 2024', title: 'MSR4SBOM: Mining Software Repositories for enhanced SBOMs', description: 'Presentation of the poster in the ESEM 2024 conference.' },
    { date: 'Aug 2024', title: 'User Experience and Security in Digital Health Applications', description: 'Presentation of the short paper in the SEAA 2024 conference.' },
    { date: 'Aug 2024', title: 'A Confirmation Study on the Removal of Dead Code', description: 'Presentation of the short paper in the SEEA 2024 conference.' },
    { date: 'Jun 2024', title: 'A Folklore Confirmation on the Removal of Dead Code', description: 'Presentation of the short paper in the EASE 2024 conference.' },
    { date: 'Mar 2024', title: 'Generative Artificial Intelligence for TDD: GAI4-TDD', description: 'Presentation of the tool demo article in the SANER 2024 conference.' },
    { date: 'Jan 2024', title: 'Generative AI to Improve Learning of TDD', description: 'Presentation of the extended abstract in the WAILS 2024 conference.' },
    { date: 'Dec 2023', title: 'On Deprecated API Usages: An Exploratory Study', description: 'Presentation of the article in the PROFES 2023 conference.', award: 'Best Paper Award' },
    { date: 'Nov 2023', title: 'The Role of the ’Principle of Acceptability in Security’', description: 'Presentation of the scientific poster to the AHL Napoli 2023.' },
    { date: 'Apr 2023', title: 'On the spread and evolution of dead methods', description: 'Special contribution for the International Journal Springer EMSE with the extension of the article presented at ESEM 2021.' },
    { date: 'Jun 2022', title: 'Do Developers Modify Dead Methods during Maintenance?', description: 'Presentation of the scientific article in the EASE 2022 conference.' },
    { date: 'Oct 2021', title: 'An Exploratory Study on Dead Methods', description: 'Presentation of the article in the ESEM 2021 conference.', award: 'Candidate Best Paper' },
  ].sort((a, b) => new Date(b.date) - new Date(a.date)); // Ensure data is always sorted chronologically descending

  /**
   * Mobile Menu Toggle
   */
  const navToggle = document.querySelector('.nav-toggle');
  const siteMenu = document.getElementById('site-menu');
  if (navToggle && siteMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    // Close menu when a link is clicked
    siteMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if(siteMenu.classList.contains('open')) {
                siteMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
  }

  /**
   * Theme Toggle with Local Storage Persistence
   */
  const themeToggle = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'pc-theme';
  const setTheme = (mode) => {
    document.documentElement.dataset.theme = mode;
    localStorage.setItem(STORAGE_KEY, mode);
    themeToggle.querySelector('i').className = mode === 'dark' ? 'fa fa-sun-o' : 'fa fa-moon-o';
  };
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const preferredScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(savedTheme || preferredScheme);
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme || preferredScheme;
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  /**
   * Reveal elements on scroll using IntersectionObserver
   */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.section, .card, .timeline li, .skill-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
  
    /**
   * NEW: Reusable function to create collapsible sections
   * @param {string} sectionId - The ID of the section container.
   * @param {string} itemSelector - The selector for the items to count (e.g., '.card').
   * @param {string} toggleId - The ID of the toggle button.
   * @param {number} visibleLimit - The number of items to show initially.
   */
  function setupCollapsibleSection(sectionId, itemSelector, toggleId, visibleLimit) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const items = section.querySelectorAll(itemSelector);
    const toggleButton = document.getElementById(toggleId);
    let isExpanded = false;

    // If there are not enough items to hide, hide the button and stop.
    if (items.length <= visibleLimit) {
      if (toggleButton) {
        toggleButton.style.display = 'none';
      }
      return;
    }

    // Initially hide the extra items
    items.forEach((item, index) => {
      if (index >= visibleLimit) {
        item.classList.add('collapsible-item', 'is-hidden');
      }
    });

    // Add click event to the button
    toggleButton.addEventListener('click', () => {
      isExpanded = !isExpanded;
      
      items.forEach((item, index) => {
        if (index >= visibleLimit) {
          item.classList.toggle('is-hidden', !isExpanded);
        }
      });
      
      toggleButton.textContent = isExpanded ? 'Show Less' : 'Show More';
    });
  }

  
  /**
   * Publications Timeline Management (Show More/Less)
   */
  const publicationsTimeline = document.getElementById('publications-timeline');
  const publicationsToggle = document.getElementById('publications-toggle');
  const INITIAL_ITEMS = 4;
  let isExpanded = false;

  function renderPublications() {
    publicationsTimeline.innerHTML = publicationsData.map((item, index) => {
      const awardBadge = item.award ? `<span class="award-badge"><i class="fa fa-trophy"></i> ${item.award}</span>` : '';
      return `
        <li class="${index >= INITIAL_ITEMS ? 'extra-item' : ''}" style="${index >= INITIAL_ITEMS && !isExpanded ? 'display: none;' : ''}">
          <div class="badge">${item.date}</div>
          <div class="content">
            <h3>${item.title} ${awardBadge}</h3>
            <p>${item.description}</p>
          </div>
        </li>
      `;
    }).join('');
    // Re-observe new timeline items for reveal effect
    publicationsTimeline.querySelectorAll('li').forEach(li => {
        li.classList.add('reveal');
        observer.observe(li);
    });
  }
  
  if (publicationsTimeline && publicationsToggle) {
    renderPublications();
    if(publicationsData.length <= INITIAL_ITEMS) {
        publicationsToggle.style.display = 'none';
    }
    publicationsToggle.addEventListener('click', () => {
      isExpanded = !isExpanded;
      const extraItems = publicationsTimeline.querySelectorAll('.extra-item');
      extraItems.forEach(item => {
        item.style.display = isExpanded ? 'grid' : 'none';
      });
      publicationsToggle.textContent = isExpanded ? 'Show Less' : 'Show More';
    });
  }
  
   /**
   * Initialize all collapsible sections on page load
   */
  document.addEventListener('DOMContentLoaded', () => {
    // Setup for Awards Section
    setupCollapsibleSection('awards', '.award-card', 'awards-toggle', 3);
    
    // Setup for Research Community Service Section
    setupCollapsibleSection('service', '.service-list li', 'service-toggle', 4);
  });

  /**
   * Update footer year automatically
   */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  
})();