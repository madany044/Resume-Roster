import { useEffect, useState } from 'react'

const getColor = (score) => {
  if (score >= 75) return '#2a7a4a'
  if (score >= 50) return '#c8622a'
  return '#a33030'
}

export default function ScoreRing({ score, size = 120, strokeWidth = 8, label = '' }) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedScore / 100) * circumference
  const color = getColor(score)

  useEffect(() => {
    let start = 0
    const step = score / 60
    const timer = setInterval(() => {
      start += step
      if (start >= score) {
        setAnimatedScore(score)
        clearInterval(timer)
      } else {
        setAnimatedScore(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [score])

  return (
    <div className="flex flex-col items-center gap-1">
      <div style={{ width: size, height: size }} className="relative">
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e4e0d8"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-semibold text-roast-ink" style={{ fontSize: size * 0.22 }}>
            {animatedScore}
          </span>
          <span className="text-roast-muted" style={{ fontSize: size * 0.11 }}>
            /100
          </span>
        </div>
      </div>
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wider text-roast-muted">
          {label}
        </span>
      )}
    </div>
  )
}
