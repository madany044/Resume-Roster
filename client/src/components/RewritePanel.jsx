import { motion } from 'framer-motion'

export default function RewritePanel({ strengths, criticalFixes, missingKeywords, jdMatchPercent }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* JD Match */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-roast-surface3 rounded-xl p-5 md:col-span-2"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-roast-muted mb-3">
          Job Description Match
        </p>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-roast-surface2 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${jdMatchPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              className={`h-full rounded-full ${
                jdMatchPercent >= 70
                  ? 'bg-roast-good'
                  : jdMatchPercent >= 45
                  ? 'bg-roast-orange'
                  : 'bg-roast-danger'
              }`}
            />
          </div>
          <span className="text-lg font-bold text-roast-ink w-12 text-right">
            {jdMatchPercent}%
          </span>
        </div>
        <p className="text-xs text-roast-muted mt-2">
          {jdMatchPercent >= 70
            ? '✅ Strong alignment with the job description.'
            : jdMatchPercent >= 45
            ? '⚠️ Partial match — add more relevant keywords.'
            : '❌ Low match — your resume needs significant tailoring.'}
        </p>
      </motion.div>

      {/* Strengths */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-roast-good-light border border-roast-good/25 rounded-xl p-5"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-roast-good mb-3">
          💪 Top Strengths
        </p>
        <ul className="space-y-2">
          {strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-roast-ink">
              <span className="mt-0.5 text-roast-good font-bold">✓</span>
              {s}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Critical Fixes */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-roast-danger-light border border-roast-danger/25 rounded-xl p-5"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-roast-danger mb-3">
          🚨 Critical Fixes
        </p>
        <ul className="space-y-2">
          {criticalFixes.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-roast-ink">
              <span className="mt-0.5 text-roast-danger font-bold">!</span>
              {f}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Missing Keywords */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white border border-roast-surface3 rounded-xl p-5 md:col-span-2"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-roast-muted mb-3">
          🔑 Missing Keywords from JD
        </p>
        <div className="flex flex-wrap gap-2">
          {missingKeywords.map((kw, i) => (
            <span
              key={i}
              className="text-xs font-medium px-3 py-1.5 bg-roast-warn-light text-roast-warn border border-roast-warn/25 rounded-full"
            >
              {kw}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
