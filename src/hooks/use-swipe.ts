import { useCallback, useRef } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

interface SwipeState {
  startX: number
  startY: number
  currentX: number
}

const SWIPE_THRESHOLD = 80
const SWIPE_VELOCITY_THRESHOLD = 0.3

export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers) {
  const stateRef = useRef<SwipeState | null>(null)
  const elementRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef<number>(0)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    stateRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
    }
    startTimeRef.current = Date.now()
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!stateRef.current || !elementRef.current) return

    const touch = e.touches[0]
    const deltaX = touch.clientX - stateRef.current.startX
    const deltaY = touch.clientY - stateRef.current.startY

    // If scrolling more vertically than horizontally, don't swipe
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return
    }

    stateRef.current.currentX = touch.clientX

    // Only allow left swipe (for delete)
    if (deltaX < 0) {
      const translateX = Math.max(deltaX, -120)
      elementRef.current.style.transform = `translateX(${translateX}px)`
      elementRef.current.style.transition = 'none'
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!stateRef.current || !elementRef.current) return

    const deltaX = stateRef.current.currentX - stateRef.current.startX
    const duration = Date.now() - startTimeRef.current
    const velocity = Math.abs(deltaX) / duration

    // Reset transform
    elementRef.current.style.transform = ''
    elementRef.current.style.transition = 'transform 0.2s ease-out'

    // Check if swipe was fast enough or far enough
    const isSwipe =
      Math.abs(deltaX) > SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY_THRESHOLD

    if (isSwipe) {
      if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft()
      } else if (deltaX > 0 && onSwipeRight) {
        onSwipeRight()
      }
    }

    stateRef.current = null
  }, [onSwipeLeft, onSwipeRight])

  return {
    ref: elementRef,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  }
}
