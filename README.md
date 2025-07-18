# AgentGraph Pitch Deck

A modern Reveal.js pitch deck built with Vite, React, TypeScript, and Tailwind CSS, featuring the AgentGraph design system and an integrated AI chat widget.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) to view the pitch deck.

## 🎨 Design System

The deck uses AgentGraph's brand colors and typography:

- **Primary Color**: Mint (`#00FF85`)
- **Secondary Color**: Mint Dark (`#20DC8E`) 
- **Text Colors**: Brand Black (`#000000`) / Brand White (`#FFFFFF`)
- **Typography**: Inter font family
- **Special Effects**: Mint glow shadow for CTAs

### Design Principles

- **Top-only spacing**: Uses `mt-*` classes, never `mb-*` for consistent vertical rhythm
- **Dark mode ready**: Toggle with 🌙/☀️ button in top-right corner
- **Brand consistency**: All components follow AgentGraph visual guidelines

## 🛠️ Architecture

```
├── index.html              # Main HTML template with Reveal.js container
├── src/
│   ├── main.ts            # Reveal.js initialization + dark mode toggle
│   ├── slides.md          # Markdown slides content (edit here!)
│   ├── input.css          # Tailwind + custom AgentGraph styles
│   └── chat-widget.tsx    # React chat bubble component
├── vite.config.ts         # Vite config with React plugin + API middleware
├── tailwind.config.ts     # AgentGraph design tokens
└── package.json           # Dependencies and scripts
```

## 📝 Editing Slides

Edit `src/slides.md` to modify slide content. Each slide is separated by `---`:

```markdown
<!-- .slide: class="text-center" data-transition="fade" -->
# Your Slide Title
Content goes here...

---

<!-- .slide: data-transition="fade" -->
## Next Slide <!-- .element: class="text-mint" -->
More content...
```

### Slide Features

- **Markdown support**: Full Markdown syntax + HTML classes
- **Fragment animations**: Use `<!-- .element: class="fragment fade-in" -->`
- **Custom transitions**: Add `data-transition="fade"` to slide comments
- **Brand styling**: Use `.text-mint` class for accent colors

## 🤖 Chat Widget

The floating chat bubble (`🤖`) provides an interactive AI assistant:

- **Stub API**: Returns placeholder responses during development
- **React-powered**: Full TypeScript support with state management
- **Responsive design**: Works on mobile and desktop
- **Dark mode compatible**: Adapts to theme changes

### API Integration

Currently stubs `/api/chat` endpoint. For production, replace with:

```typescript
// In production, update chat-widget.tsx
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ msg: userMessage })
});
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Set build settings**:
   - Build Command: `pnpm build`
   - Output Directory: `dist`
3. **Add environment variables** (see below)
4. **Deploy** 🚀

### Environment Variables

For production deployment, you'll need:

```bash
# AI/RAG Integration
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=us-west1-gcp

# Analytics (optional)
VERCEL_ANALYTICS_ID=...
GA_TRACKING_ID=...

# Authentication (if needed)
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://your-domain.com
```

### Other Platforms

The build outputs a static bundle (`dist/`) that works on:

- **Netlify**: Deploy `dist` folder
- **GitHub Pages**: Use GitHub Actions with `dist` 
- **AWS S3 + CloudFront**: Upload `dist` contents
- **Any static host**: Just serve the `dist` folder

## 🔧 Development

### File Structure

- `src/slides.md` - Edit slide content here
- `src/input.css` - Custom styles and Tailwind overrides
- `src/chat-widget.tsx` - Chat bubble component
- `tailwind.config.ts` - Design system tokens

### Adding New Features

1. **New slides**: Add to `slides.md` with `---` separators
2. **Custom styles**: Add to `src/input.css` using Tailwind classes
3. **Interactive elements**: Extend `chat-widget.tsx` or create new React components
4. **API endpoints**: Add middleware to `vite.config.ts`

### Brand Guidelines

- Use `text-mint` for accents and CTAs
- Apply `hover:shadow-mint` for interactive elements
- Follow top-only spacing with `mt-*` classes
- Maintain Inter font family consistency

## 🎯 Roadmap

- [ ] Real RAG endpoint integration (LangChain + Pinecone)
- [ ] Analytics tracking (`slidechange`, `agent_open` events)
- [ ] Speaker notes plugin
- [ ] Print-to-PDF theme optimization
- [ ] Advanced slide transitions
- [ ] Multi-language support

## 📦 Dependencies

**Core:**
- Reveal.js 5.1.0 - Presentation framework
- React 18.2.0 - Chat widget UI
- Vite 5.2.0 - Build tool and dev server

**Styling:**
- Tailwind CSS 3.4.0 - Utility-first CSS
- Inter font - Typography

**Development:**
- TypeScript 5.4.0 - Type safety
- @vitejs/plugin-react - React integration

## 🐛 Troubleshooting

**Chat widget not loading?**  
Check browser console for import errors. Ensure React dependencies are installed.

**Styles not applying?**  
Verify Tailwind is processing `src/input.css`. Check `postcss.config.js` configuration.

**Slides not updating?**  
Ensure `slides.md` uses proper `---` separators and valid Markdown syntax.

**Build failing?**  
Run `pnpm install` to ensure all dependencies are installed with correct versions.

---

Built with ❤️ for AgentGraph
