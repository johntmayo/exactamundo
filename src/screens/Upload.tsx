import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

const MAX_MB = 20
const MAX_BYTES = MAX_MB * 1024 * 1024

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function Upload() {
  const navigate = useNavigate()
  const { currentPdf, attachPdfToCurrentSession, ensureCurrentSession, clearCurrentPdf } = useApp()
  const [error, setError] = useState('')
  const [showPdf, setShowPdf] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onSelectPdf = (file?: File) => {
    if (!file) return
    setError('')
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError("That file doesn't look like a PDF. Please try again.")
      return
    }
    if (file.size > MAX_BYTES) {
      setError(`That file is too large. Please use a PDF smaller than ${MAX_MB} MB.`)
      return
    }
    attachPdfToCurrentSession(file)
    setShowPdf(true)
  }

  return (
    <ScreenLayout title="First, upload your estimate." stepText="Step 1 of 5" showBack={false}>
      <p>
        This is the PDF your insurance company or adjuster sent you. It might be called an estimate or scope of
        loss. Upload it here if you have it.
      </p>

      <div className="panel">
        <input
          ref={fileInputRef}
          className="sr-only"
          type="file"
          accept="application/pdf"
          onChange={(event) => onSelectPdf(event.target.files?.[0])}
        />
        <button className="button" type="button" onClick={() => fileInputRef.current?.click()}>
          Tap or click to upload a PDF
        </button>
        <p className="muted">Accepted format: PDF · Max size: 20 MB</p>
      </div>

      {error ? <p className="error">{error}</p> : null}

      {currentPdf ? (
        <div className="panel">
          <p>
            <strong>Uploaded:</strong> {currentPdf.fileName} ({formatBytes(currentPdf.fileSize)})
          </p>
          <div className="inline-actions">
            <button className="button subtle" type="button" onClick={() => setShowPdf((prev) => !prev)}>
              {showPdf ? 'Hide my estimate' : 'View my estimate'}
            </button>
            <button className="button subtle" type="button" onClick={clearCurrentPdf}>
              Remove PDF
            </button>
          </div>
          {showPdf ? <iframe className="pdf-viewer" src={currentPdf.objectUrl} title="Uploaded estimate PDF" /> : null}
        </div>
      ) : null}

      <div className="actions">
        <button
          className="button primary"
          type="button"
          onClick={() => {
            ensureCurrentSession()
            navigate(ROUTES.SETUP)
          }}
        >
          Upload and continue →
        </button>
      </div>

      <button
        className="link-button"
        type="button"
        onClick={() => {
          ensureCurrentSession()
          navigate(ROUTES.SETUP)
        }}
      >
        Don&apos;t have your estimate yet? Continue without it →
      </button>
    </ScreenLayout>
  )
}
