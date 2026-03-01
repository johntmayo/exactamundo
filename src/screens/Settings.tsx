import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import { formatShortDate, useApp } from '../context/AppContext'
import { nextRouteForSession } from '../lib/sessionFlow'
import { ROUTES } from '../routes'

export default function Settings() {
  const navigate = useNavigate()
  const { sessions, setCurrentSessionId, deleteSession, deleteAllSessions } = useApp()
  const sorted = useMemo(() => [...sessions].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)), [sessions])

  return (
    <ScreenLayout title="Settings">
      <section className="panel">
        <h2>Saved reviews</h2>
        {sorted.length === 0 ? <p className="muted">No saved reviews.</p> : null}
        <div className="stack">
          {sorted.map((session) => (
            <article className="panel nested" key={session.id}>
              <h3>{session.nickname}</h3>
              <p className="muted">Last updated {formatShortDate(session.updatedAt)}</p>
              <div className="inline-actions">
                <button
                  className="button"
                  type="button"
                  onClick={() => {
                    setCurrentSessionId(session.id)
                    navigate(nextRouteForSession(session))
                  }}
                >
                  Continue
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
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel danger">
        <h2>Delete all data</h2>
        <p>Remove all saved reviews and answers from this device.</p>
        <button
          className="button danger"
          type="button"
          onClick={() => {
            if (confirm('Delete all saved reviews from this device?')) {
              deleteAllSessions()
              navigate(ROUTES.LANDING)
            }
          }}
        >
          Delete all data
        </button>
      </section>

      <section className="panel">
        <h2>About this tool</h2>
        <p>
          This tool is for informational purposes only and is not a substitute for legal or professional advice.
          It is informed by publicly available guidance from United Policyholders.
        </p>
        <p>
          Always consult a licensed public adjuster, attorney, or other qualified professional for advice specific
          to your claim.
        </p>
        <a href="https://uphelp.org" target="_blank" rel="noreferrer">
          Visit uphelp.org
        </a>
      </section>
    </ScreenLayout>
  )
}
