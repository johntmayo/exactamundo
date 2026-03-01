import type { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function RequireSession({ children }: { children: ReactElement }) {
  const { currentSession } = useApp()
  if (!currentSession) {
    return <Navigate to={ROUTES.UPLOAD} replace />
  }
  return children
}
