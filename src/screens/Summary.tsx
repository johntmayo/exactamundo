import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import { useApp } from '../context/AppContext'
import { buildSummary } from '../lib/summary'
import { ROUTES } from '../routes'

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export default function Summary() {
  const navigate = useNavigate()
  const { currentSession } = useApp()
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (currentSession) {
      setText(buildSummary(currentSession))
    }
  }, [currentSession])

  if (!currentSession) return null

  return (
    <ScreenLayout title="Here&apos;s what to raise with your adjuster." stepText="Step 5 of 5">
      <p>Based on your answers, here are items worth discussing. You can edit this text before using it.</p>

      <textarea className="summary-textarea" value={text} onChange={(event) => setText(event.target.value)} />

      <div className="inline-actions">
        <button
          className="button"
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 1400)
          }}
        >
          {copied ? 'Copied!' : 'Copy to clipboard'}
        </button>
        <button
          className="button"
          type="button"
          onClick={() => downloadTextFile(`${currentSession.nickname}.txt`, text)}
        >
          Download as .txt
        </button>
        <button
          className="button"
          type="button"
          onClick={() => downloadTextFile(`${currentSession.nickname}.md`, text)}
        >
          Download as .md
        </button>
      </div>

      <button className="link-button" type="button" onClick={() => navigate(ROUTES.COVERAGE)}>
        Go back and edit my answers
      </button>

      <p className="tip">
        You&apos;ve done a systems check, a room-by-room review, and flagged key issues like code upgrades and O&amp;P.
        You&apos;re ready to have this conversation.
      </p>
    </ScreenLayout>
  )
}
