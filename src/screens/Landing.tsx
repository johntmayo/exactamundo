import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function Landing() {
  const navigate = useNavigate()
  const { hasSavedSessions } = useApp()

  useEffect(() => {
    if (hasSavedSessions) {
      navigate(ROUTES.RESUME, { replace: true })
    }
  }, [hasSavedSessions, navigate])

  return (
    <main className="screen screen-intro">
      <h1>You deserve a fair settlement. Let&apos;s make sure you got one.</h1>
      <p>
        After a major loss, your insurance company sends an estimate for repairing or rebuilding your home.
        These estimates can run dozens or even hundreds of pages, and they&apos;re full of construction trade
        language that is hard to read even for experts.
      </p>
      <p>
        This tool walks you through your estimate section by section and helps you spot things that might be
        missing, undercounted, or worth asking about.
      </p>
      <p>You don&apos;t need to know anything about construction. We&apos;ll guide you one simple step at a time.</p>
      <div className="actions">
        <Link className="button primary" to={ROUTES.UPLOAD}>
          Get started →
        </Link>
      </div>
      <p className="fine-print">
        Your answers stay on your device. We don&apos;t share them with your insurer or anyone else.
      </p>
    </main>
  )
}
