import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'

export default function UploadZone({ onFile, onText, resumeText }) {
  const [mode, setMode] = useState('upload') // 'upload' | 'paste'
  const [fileName, setFileName] = useState(null)

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        setFileName(file.name)
        onFile(file)
      }
    },
    [onFile]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  })

  return (
    <div className="space-y-3">
      {/* Mode toggle */}
      <div className="flex gap-1 bg-roast-surface2 p-1 rounded-lg w-fit">
        {['upload', 'paste'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${
              mode === m
                ? 'bg-white text-roast-ink shadow-sm'
                : 'text-roast-muted hover:text-roast-ink'
            }`}
          >
            {m === 'upload' ? '📄 Upload PDF' : '✏️ Paste Text'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {mode === 'upload' ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                isDragActive
                  ? 'border-roast-orange bg-roast-orange-light'
                  : fileName
                  ? 'border-roast-good bg-roast-good-light'
                  : 'border-roast-surface3 hover:border-roast-orange hover:bg-roast-orange-light'
              }`}
            >
              <input {...getInputProps()} />
              {fileName ? (
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <p className="font-medium text-roast-good text-sm">{fileName}</p>
                  <p className="text-xs text-roast-muted">Drop another to replace</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl">📄</span>
                  <p className="font-medium text-roast-ink text-sm">
                    {isDragActive ? 'Drop it here!' : 'Drag & drop your PDF'}
                  </p>
                  <p className="text-xs text-roast-muted">or click to browse</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="paste"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            <textarea
              value={resumeText}
              onChange={(e) => onText(e.target.value)}
              placeholder="Paste your resume text here..."
              rows={10}
              className="w-full border border-roast-surface3 rounded-xl p-4 text-sm text-roast-ink 
                         bg-white resize-none outline-none leading-relaxed
                         focus:border-roast-orange focus:ring-2 focus:ring-roast-orange/10 transition-all"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
