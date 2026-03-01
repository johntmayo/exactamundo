import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import { useEstimateSessionStore } from '../store/estimateSessionStore'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 MB

function Upload() {
  const navigate = useNavigate()
  const { session, createSession, updateSession } = useEstimateSessionStore()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null)
    const file = e.target.files?.[0] ?? null

    if (!file) {
      setSelectedFile(null)
      return
    }

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError("That file doesn't look like a PDF. Please try again.")
      setSelectedFile(null)
      e.target.value = ''
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('That file is too large. Try a compressed version, or contact us for help.')
      setSelectedFile(null)
      e.target.value = ''
      return
    }

    setSelectedFile(file)
  }

  function handleUploadAndContinue() {
    if (!selectedFile) return

    if (!session) {
      createSession()
    }
    updateSession({ pdfFileName: selectedFile.name })

    navigate('/setup')
  }

  function handleSkip() {
    navigate('/setup')
  }

  return (
    <ScreenLayout>
      <section className="screen-intro" aria-labelledby="upload-title">
        <header className="screen-header">
          <h1 id="upload-title">First, upload your estimate.</h1>
        </header>

        <div className="screen-body">
          <p>
            This is the PDF your insurance company or adjuster sent you. It
            might be called an &ldquo;estimate,&rdquo; a &ldquo;scope of
            loss,&rdquo; or something similar.
          </p>
          <p>
            If you have it on your phone or computer, upload it here. If you
            don&apos;t have it yet, you are entitled to ask your adjuster for a
            copy &mdash; don&apos;t be shy about asking.
          </p>

          <div
            className="upload-zone"
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                fileInputRef.current?.click()
              }
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="sr-only"
              aria-label="Upload a PDF file"
              onChange={handleFileChange}
            />

            {selectedFile ? (
              <span className="upload-zone-filename">{selectedFile.name}</span>
            ) : (
              <span className="upload-zone-prompt">Tap or click to upload a PDF</span>
            )}

            <span className="upload-zone-hint">
              Accepted format: PDF · Max size: 20 MB
            </span>
          </div>

          {error && (
            <p className="danger-callout" role="alert">
              {error}
            </p>
          )}

          <div className="actions">
            <button
              className="button primary"
              disabled={!selectedFile}
              onClick={handleUploadAndContinue}
            >
              Upload and continue →
            </button>
          </div>

          <div className="upload-skip">
            <button className="link-button" onClick={handleSkip}>
              Don&apos;t have your estimate yet? Continue without it →
            </button>
            <p className="muted">
              (You can upload it later — but having it open nearby will help.)
            </p>
          </div>
        </div>
      </section>
    </ScreenLayout>
  )
}

export default Upload
