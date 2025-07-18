import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

// Import our Tailwind styles
import './input.css';

// Import slides content as text
import slidesContent from './slides.md?raw';

// Initialize Reveal.js
const deck = new Reveal({
  plugins: [Markdown],
  hash: true,
  transition: 'fade',
  markdown: {
    breaks: true
  }
});

// Load slides content programmatically
function loadSlides() {
  const slidesContainer = document.querySelector('.slides');
  if (slidesContainer && slidesContent) {
    // Split slides by separator and create sections
    const slides = slidesContent.split(/\n---\n/);
    
    slides.forEach((slideContent: string) => {
      const section = document.createElement('section');
      section.setAttribute('data-markdown', '');
      section.innerHTML = `<textarea data-template>${slideContent.trim()}</textarea>`;
      slidesContainer.appendChild(section);
    });
  }
}

// Load slides and initialize Reveal
loadSlides();
deck.initialize();

// Dark mode toggle functionality with Heroicons
function initDarkMode() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Heroicon SVGs
  const moonIcon = `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>`;
  
  const sunIcon = `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>`;
  
  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.classList.add('dark');
    toggle!.innerHTML = sunIcon;
  } else {
    html.classList.remove('dark');
    toggle!.innerHTML = moonIcon;
  }
  
  toggle?.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      toggle.innerHTML = moonIcon;
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      toggle.innerHTML = sunIcon;
    }
  });
}

// Initialize chat widget and dark mode after DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize dark mode
  initDarkMode();
  
  // Dynamically import and initialize chat widget
  try {
    const { default: initChatWidget } = await import('./chat-widget');
    initChatWidget();
  } catch (error) {
    console.warn('Chat widget failed to load:', error);
  }
});
