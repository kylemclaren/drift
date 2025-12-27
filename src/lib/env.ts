/**
 * Check if delete confirmations are required
 * Set VITE_REQUIRE_DELETE_CONFIRMATION=true in .env to enable
 */
export function isDeleteConfirmationRequired(): boolean {
  return import.meta.env.VITE_REQUIRE_DELETE_CONFIRMATION === 'true'
}

