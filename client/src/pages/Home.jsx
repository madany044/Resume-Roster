import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import UploadZone from '../components/UploadZone'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export default function Home() {
  const navigate = useNavigate()
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!resumeFile && !resumeText.trim()) {
      toast.error('Please upload your resume or paste the text.')
      return
    }
    if (!jobDescription.trim()) {
      toast.error('Please paste the job description.')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('job_description', jobDescription)
      if (resumeFile) {
        formData.append('file', resumeFile)
      } else {
        formData.append('resume_text', resumeText)
      }

      const res = await axios.post(`${API_BASE}/roast`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      navigate('/results', { state: { data: res.data } })
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Something went wrong. Try again.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-roast-surface">
      {/* Nav */}
      <nav className="border-b border-roast-surface3 bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <span className="font-serif text-lg font-semibold text-roast-ink">Resume Roaster</span>
        </div>
        <span className="text-xs text-roast-muted bg-roast-surface2 px-3 py-1 rounded-full border border-roast-surface3">
          Powered by Gemini AI
        </span>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-14">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-roast-orange text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            AI-Powered · Free · Instant
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-roast-ink leading-tight mb-4">
            Get your resume <em className="text-roast-orange italic">roasted.</em>
          </h1>
          <p className="text-roast-muted text-lg max-w-xl mx-auto leading-relaxed">
            Paste your resume and the job description. Our AI will brutally honest-feedback your
            resume, score every section, and rewrite the weak parts.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Resume Upload */}
          <div className="card space-y-3">
            <div>
              <span className="section-tag">Step 1</span>
              <h2 className="font-semibold text-roast-ink text-[17px]">Your Resume</h2>
              <p className="text-sm text-roast-muted mt-0.5">Upload a PDF or paste your resume text</p>
            </div>
            <UploadZone
              onFile={setResumeFile}
              onText={setResumeText}
              resumeText={resumeText}
            />
          </div>

          {/* JD Input */}
          <div className="card space-y-3">
            <div>
              <span className="section-tag">Step 2</span>
              <h2 className="font-semibold text-roast-ink text-[17px]">Job Description</h2>
              <p className="text-sm text-roast-muted mt-0.5">Paste the full JD you're applying for</p>
            </div>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              rows={8}
              className="w-full border border-roast-surface3 rounded-xl p-4 text-sm text-roast-ink
                         bg-roast-surface resize-none outline-none leading-relaxed
                         focus:border-roast-orange focus:ring-2 focus:ring-roast-orange/10 transition-all"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary text-base px-8 py-3.5"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Roasting your resume...
                </>
              ) : (
                <>🔥 Roast My Resume</>
              )}
            </button>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-roast-muted">
            Your resume is never stored. Analysis happens in real-time and is discarded immediately.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
