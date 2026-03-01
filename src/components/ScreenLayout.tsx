import { Link, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { ROUTES } from '../routes'

interface ScreenLayoutProps {
  title: string
  children: ReactNode
  stepText?: string
  showBack?: boolean
}

export default function ScreenLayout({
  title,
  children,
  stepText,
  showBack = true,
}: ScreenLayoutProps) {
  const navigate = useNavigate()
  return (
    <main className="screen">
      <header className="screen-header">
        <div className="screen-header-row">
          {showBack ? (
            <button className="button subtle" type="button" onClick={() => navigate(-1)}>
              Back
            </button>
          ) : (
            <div />
          )}
          <Link to={ROUTES.SETTINGS} className="button subtle">
            Settings
          </Link>
        </div>
        {stepText ? <p className="step-text">{stepText}</p> : null}
        <h1>{title}</h1>
        <p className="autosave">Progress saved on this device ✓</p>
      </header>
      <section className="screen-body">{children}</section>
    </main>
  )
}
