import type { EstimateSession } from '../types'

const SESSIONS_KEY = 'exactamundo.sessions.v1'
const LAST_ACTIVE_SESSION_KEY = 'exactamundo.lastActiveSessionId.v1'

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function readAll(): EstimateSession[] {
  if (!canUseStorage()) return []

  const raw = window.localStorage.getItem(SESSIONS_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as EstimateSession[]
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function writeAll(sessions: EstimateSession[]): void {
  if (!canUseStorage()) return
  window.localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
}

export function saveSession(session: EstimateSession): void {
  const sessions = readAll()
  const next = sessions.filter((item) => item.id !== session.id)
  next.push(session)
  next.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  writeAll(next)
}

export function loadSession(id: string): EstimateSession | null {
  const sessions = readAll()
  return sessions.find((session) => session.id === id) ?? null
}

export function listSessions(): EstimateSession[] {
  return readAll().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export function deleteSession(id: string): void {
  const sessions = readAll().filter((session) => session.id !== id)
  writeAll(sessions)

  if (getLastActiveSessionId() === id) {
    clearLastActiveSessionId()
  }
}

export function deleteAllSessions(): void {
  if (!canUseStorage()) return
  window.localStorage.removeItem(SESSIONS_KEY)
  window.localStorage.removeItem(LAST_ACTIVE_SESSION_KEY)
}

export function setLastActiveSessionId(sessionId: string): void {
  if (!canUseStorage()) return
  window.localStorage.setItem(LAST_ACTIVE_SESSION_KEY, sessionId)
}

export function getLastActiveSessionId(): string | null {
  if (!canUseStorage()) return null
  return window.localStorage.getItem(LAST_ACTIVE_SESSION_KEY)
}

export function clearLastActiveSessionId(): void {
  if (!canUseStorage()) return
  window.localStorage.removeItem(LAST_ACTIVE_SESSION_KEY)
}
