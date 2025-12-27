/**
 * Check if delete confirmations are required
 * Set VITE_REQUIRE_DELETE_CONFIRMATION=true in .env to enable
 */
export function isDeleteConfirmationRequired(): boolean {
  return import.meta.env.VITE_REQUIRE_DELETE_CONFIRMATION === 'true'
}

/**
 * Get the current theme name from env var
 * Defaults to 'default' if not set
 */
export function getThemeFromEnv(): string {
  const theme = import.meta.env.VITE_THEME
  console.log('Theme from env:', theme)
  return theme || 'default'
}
