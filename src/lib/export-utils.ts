import type { Thought } from '@/components/flow/types'

export function downloadThoughts(
  thoughts: Thought[],
  filename: string
): void {
  if (thoughts.length === 0) {
    alert('No thoughts to download')
    return
  }

  const data = {
    exportedAt: new Date().toISOString(),
    thoughtCount: thoughts.length,
    thoughts: thoughts.map((t) => ({
      content: t.content,
      createdAt: new Date(t.createdAt).toISOString(),
      updatedAt: new Date(t.updatedAt).toISOString(),
    })),
  }

  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
