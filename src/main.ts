import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

// Import our Tailwind styles
import './input.css';

// Initialize Reveal.js
const deck = new Reveal({
  plugins: [Markdown],
  hash: true,
  transition: 'fade',
  markdown: {
    breaks: true
  }
});

deck.initialize();

// Dark mode toggle functionality
function initDarkMode() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.classList.add('dark');
    toggle!.textContent = '☀️';
  } else {
    html.classList.remove('dark');
    toggle!.textContent = '🌙';
  }
  
  toggle?.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      toggle.textContent = '🌙';
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      toggle.textContent = '☀️';
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
