import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import { formatShortDate, useApp } from '../context/AppContext'
import { nextRouteForSession } from '../lib/sessionFlow'
import { ROUTES } from '../routes'

export default function Resume() {
  const navigate = useNavigate()
  const { sessions, setCurrentSessionId, createSession, deleteSession } = useApp()
  const sorted = useMemo(() => [...sessions].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)), [sessions])

  if (sorted.length === 0) {
    return (
      <ScreenLayout title="Welcome." showBack={false}>
        <p>No saved review was found on this device.</p>
        <button className="button primary" onClick={() => navigate(ROUTES.UPLOAD)}>
          Start a new review
        </button>
      </ScreenLayout>
    )
  }

  return (
    <ScreenLayout title="Welcome back." showBack={false}>
      <p>We found saved reviews on this device.</p>
      <div className="stack">
        {sorted.map((session) => (
          <article className="panel" key={session.id}>
            <h3>{session.nickname}</h3>
            <p className="muted">
              Started {formatShortDate(session.createdAt)} · Last updated {formatShortDate(session.updatedAt)}
            </p>
            <div className="inline-actions">
              <button
                className="button primary"
                type="button"
                onClick={() => {
                  setCurrentSessionId(session.id)
                  navigate(nextRouteForSession(session))
                }}
              >
                Continue where I left off
              </button>
              <button
                className="button subtle"
                type="button"
                onClick={() => {
                  if (confirm('Delete this saved review?')) {
                    deleteSession(session.id)
                  }
                }}
              >
                Delete this saved review
              </button>
            </div>
          </article>
        ))}
      </div>
      <button
        className="link-button"
        type="button"
        onClick={() => {
          createSession()
          navigate(ROUTES.UPLOAD)
        }}
      >
        Start a new review
      </button>
    </ScreenLayout>
  )
}
