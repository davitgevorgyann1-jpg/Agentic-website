'use client'

import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface InteractiveRobotSplineProps {
  scene: string
  className?: string
}

export function InteractiveRobotSpline({ scene, className = '' }: InteractiveRobotSplineProps) {
  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center ${className}`}>
          {/* Silent fallback — spiral is visible behind while robot loads */}
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
