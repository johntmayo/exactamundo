import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useEstimateSessionStore } from '../store/estimateSessionStore'

export default function RequireSession({ children }: { children: ReactNode }) {
  const session = useEstimateSessionStore((state) => state.session)

  if (!session) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
