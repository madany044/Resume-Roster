import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import ScoreRing from '../components/ScoreRing'
import RoastCard from '../components/RoastCard'
import RewritePanel from '../components/RewritePanel'

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state?.data

  useEffect(() => {
    if (!data) navigate('/')
  }, [data, navigate])

  if (!data) return null

  const { overall_score, verdict, sections, top_strengths, critical_fixes, jd_match_percent, missing_keywords } = data

  const scoreLabel =
    overall_score >= 80
      ? '🏆 Strong Resume'
      : overall_score >= 60
      ? '🟡 Needs Work'
      : overall_score >= 40
      ? '🔴 Major Gaps'
      : '💀 Start Over'

  return (
    <div className="min-h-screen bg-roast-surface">
      {/* Nav */}
      <nav className="border-b border-roast-surface3 bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <span className="font-serif text-lg font-semibold text-roast-ink">Resume Roaster</span>
        </div>
        <button onClick={() => navigate('/')} className="btn-secondary text-sm">
          ← Roast Another
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">

        {/* Overall Score Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card flex flex-col md:flex-row items-center gap-8 py-8"
        >
          <ScoreRing score={overall_score} size={130} strokeWidth={9} />
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-roast-muted mb-1">
              Overall Score
            </p>
            <h1 className="font-serif text-3xl text-roast-ink mb-2">{scoreLabel}</h1>
            <p className="text-roast-muted text-[15px] leading-relaxed italic">"{verdict}"</p>
          </div>
        </motion.div>

        {/* Section Scores Quick View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {Object.entries(sections).map(([key, val]) => (
            <div key={key} className="card flex flex-col items-center py-5 gap-2">
              <ScoreRing score={val.score} size={72} strokeWidth={6} />
              <span className="text-xs font-semibold uppercase tracking-wider text-roast-muted capitalize">
                {key === 'format' ? 'Format & ATS' : key}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Overview Panel */}
        <div>
          <h2 className="font-serif text-2xl text-roast-ink mb-4">Overview</h2>
          <RewritePanel
            strengths={top_strengths}
            criticalFixes={critical_fixes}
            missingKeywords={missing_keywords}
            jdMatchPercent={jd_match_percent}
          />
        </div>

        {/* Section Roasts */}
        <div>
          <h2 className="font-serif text-2xl text-roast-ink mb-4">Section Breakdown</h2>
          <div className="space-y-4">
            {Object.entries(sections).map(([key, val]) => (
              <RoastCard key={key} sectionKey={key} data={val} />
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="card text-center py-8 space-y-3"
        >
          <p className="font-serif text-xl text-roast-ink">Ready to fix it?</p>
          <p className="text-sm text-roast-muted">Apply the rewrites above, then roast it again until you hit 80+.</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary mx-auto"
          >
            🔥 Roast Again
          </button>
        </motion.div>

      </div>
    </div>
  )
}
