import {
  createCollection,
  localStorageCollectionOptions,
} from '@tanstack/react-db'
import type { Thought } from '@/components/flow/types'

const OLD_STORAGE_KEY = 'flow-thoughts'
const NEW_STORAGE_KEY = 'flow-thoughts-db'

// Migrate from old localStorage format to new TanStack DB format
function migrateOldData() {
  if (typeof window === 'undefined') return

  const oldData = localStorage.getItem(OLD_STORAGE_KEY)
  const newData = localStorage.getItem(NEW_STORAGE_KEY)

  // Only migrate if old data exists and new data doesn't
  if (oldData && !newData) {
    try {
      const thoughts = JSON.parse(oldData) as Array<Thought>
      if (Array.isArray(thoughts) && thoughts.length > 0) {
        // Convert array to TanStack DB format (object with IDs as keys)
        const dbFormat: Record<string, Thought> = {}
        for (const thought of thoughts) {
          dbFormat[thought.id] = thought
        }
        localStorage.setItem(NEW_STORAGE_KEY, JSON.stringify(dbFormat))
        // Remove old data after successful migration
        localStorage.removeItem(OLD_STORAGE_KEY)
      }
    } catch {
      // Ignore migration errors
    }
  }
}

// Lazy-initialized collection (client-side only)
let _thoughtsCollection: ReturnType<
  typeof createCollection<Thought>
> | null = null

export function getThoughtsCollection() {
  if (typeof window === 'undefined') {
    throw new Error('thoughtsCollection can only be accessed on the client')
  }

  if (!_thoughtsCollection) {
    migrateOldData()
    _thoughtsCollection = createCollection(
      localStorageCollectionOptions<Thought>({
        id: 'thoughts',
        storageKey: NEW_STORAGE_KEY,
        getKey: (thought) => thought.id,
      })
    )
  }

  return _thoughtsCollection
}

// Helper to generate IDs
export function generateThoughtId() {
  return Math.random().toString(36).substring(2, 15)
}
