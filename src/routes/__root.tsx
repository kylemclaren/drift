import { useEffect } from 'react'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Toaster } from '@/components/ui/sonner'
import { applyTheme, getThemeName, themes } from '@/lib/themes'

import appCss from '../styles.css?url'

function getThemeColor(): string {
  const themeName = getThemeName()
  const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('flow-theme') as 'light' | 'dark' | null : null
  const mode = savedTheme || 'dark'
  const themeColors = themes[themeName][mode]
  const bgColor = themeColors.background

  // Convert OKLch color to approximated hex
  // For simple cases: default dark = black, default light = white
  // stone dark = dark gray, stone light = light gray
  if (themeName === 'default') {
    return mode === 'dark' ? '#000000' : '#ffffff'
  }
  // stone theme approximations
  return mode === 'dark' ? '#3a3a35' : '#f5f5f0'
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'drift — Clear your mind through expressive writing',
      },
      {
        name: 'description',
        content: 'Clear your mind through raw, unfiltered writing. Thoughts fade into the background to make space for new ones.',
      },
      // Open Graph meta tags for social sharing
      {
        property: 'og:title',
        content: 'drift — Clear your mind through expressive writing',
      },
      {
        property: 'og:description',
        content: 'Clear your mind through raw, unfiltered writing. Thoughts fade into the background to make space for new ones.',
      },
      {
        property: 'og:image',
        content: '/og.webp',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://driftaway.fly.dev/',
      },
      // Twitter Card meta tags
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'drift — Clear your mind through expressive writing',
      },
      {
        name: 'twitter:description',
        content: 'Clear your mind through raw, unfiltered writing. Thoughts fade into the background to make space for new ones.',
      },
      {
        name: 'twitter:image',
        content: '/og.webp',
      },
      // Theme color for browser UI
      {
        name: 'theme-color',
        content: getThemeColor(),
      },
      // Additional SEO
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        name: 'author',
        content: 'drift',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
      {
        rel: 'apple-touch-icon',
        href: '/favicon.svg',
      },
      {
        rel: 'canonical',
        href: 'https://driftaway.fly.dev/',
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const themeName = getThemeName()
    const savedTheme = localStorage.getItem('flow-theme') as 'light' | 'dark' | null
    const mode = savedTheme || 'dark'
    applyTheme(themeName, mode)

    // Update theme-color meta tag to match the applied theme
    const themeColorMeta = document.querySelector('meta[name="theme-color"]')
    if (themeColorMeta) {
      const themeColor = getThemeColor()
      themeColorMeta.setAttribute('content', themeColor)
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
