import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScoreRing from './ScoreRing'

const sectionMeta = {
  summary: { label: 'Summary', emoji: '🧾' },
  skills: { label: 'Skills', emoji: '🛠️' },
  experience: { label: 'Experience', emoji: '💼' },
  format: { label: 'Format & ATS', emoji: '📐' },
}

export default function RoastCard({ sectionKey, data }) {
  const [showRewrite, setShowRewrite] = useState(false)
  const [copied, setCopied] = useState(false)
  const meta = sectionMeta[sectionKey] || { label: sectionKey, emoji: '📝' }

  const scoreColor =
    data.score >= 75
      ? 'text-roast-good bg-roast-good-light border-roast-good/30'
      : data.score >= 50
      ? 'text-roast-orange bg-roast-orange-light border-roast-orange/30'
      : 'text-roast-danger bg-roast-danger-light border-roast-danger/30'

  const handleCopy = () => {
    navigator.clipboard.writeText(data.rewrite)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-roast-surface3 rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-roast-surface2">
        <div className="flex items-center gap-3">
          <span className="text-xl">{meta.emoji}</span>
          <span className="font-semibold text-roast-ink text-[15px]">{meta.label}</span>
        </div>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full border ${scoreColor}`}
        >
          {data.score}/100
        </span>
      </div>

      {/* Roast */}
      <div className="px-6 py-4">
        <p className="text-sm text-roast-muted leading-relaxed">
          🔥 <span className="text-roast-ink">{data.roast}</span>
        </p>
      </div>

      {/* Rewrite Toggle */}
      <div className="px-6 pb-4">
        <button
          onClick={() => setShowRewrite(!showRewrite)}
          className="text-sm font-medium text-roast-orange hover:underline flex items-center gap-1 transition-all"
        >
          {showRewrite ? '▲ Hide' : '✨ Show'} AI Rewrite
        </button>

        <AnimatePresence>
          {showRewrite && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-3 bg-roast-surface p-4 rounded-lg border border-roast-surface3 relative">
                <p className="text-sm text-roast-ink leading-relaxed whitespace-pre-wrap pr-16">
                  {data.rewrite}
                </p>
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 text-xs font-medium px-3 py-1.5 bg-white border border-roast-surface3 rounded-lg hover:bg-roast-surface2 transition-all"
                >
                  {copied ? '✅ Copied' : '📋 Copy'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
