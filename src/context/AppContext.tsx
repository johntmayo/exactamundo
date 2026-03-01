import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { EstimateSession, LossType } from '../types/session'

const SESSIONS_STORAGE_KEY = 'exactamundo.sessions.v1'
const LAST_ACTIVE_STORAGE_KEY = 'exactamundo.lastActiveSessionId.v1'

interface PdfState {
  sessionId: string
  fileName: string
  fileSize: number
  objectUrl: string
}

interface AppContextValue {
  sessions: EstimateSession[]
  currentSession: EstimateSession | null
  hasSavedSessions: boolean
  currentPdf: PdfState | null
  ensureCurrentSession: () => EstimateSession
  createSession: (seed?: Partial<Pick<EstimateSession, 'nickname' | 'lossType'>>) => EstimateSession
  setCurrentSessionId: (sessionId: string | null) => void
  updateCurrentSession: (patch: Partial<EstimateSession>) => void
  attachPdfToCurrentSession: (file: File) => EstimateSession
  clearCurrentPdf: () => void
  deleteSession: (sessionId: string) => void
  deleteAllSessions: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

function nowIso(): string {
  return new Date().toISOString()
}

function readStoredSessions(): EstimateSession[] {
  const raw = window.localStorage.getItem(SESSIONS_STORAGE_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as EstimateSession[]
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function readLastActiveSessionId(): string | null {
  return window.localStorage.getItem(LAST_ACTIVE_STORAGE_KEY)
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<EstimateSession[]>([])
  const [currentSessionId, setCurrentSessionIdState] = useState<string | null>(null)
  const [currentPdf, setCurrentPdf] = useState<PdfState | null>(null)

  useEffect(() => {
    const loaded = readStoredSessions().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    const lastId = readLastActiveSessionId()
    setSessions(loaded)
    if (lastId && loaded.some((session) => session.id === lastId)) {
      setCurrentSessionIdState(lastId)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions))
  }, [sessions])

  useEffect(() => {
    if (currentSessionId) {
      window.localStorage.setItem(LAST_ACTIVE_STORAGE_KEY, currentSessionId)
    } else {
      window.localStorage.removeItem(LAST_ACTIVE_STORAGE_KEY)
    }
  }, [currentSessionId])

  useEffect(() => {
    return () => {
      if (currentPdf) {
        URL.revokeObjectURL(currentPdf.objectUrl)
      }
    }
  }, [currentPdf])

  const createSession = useCallback(
    (seed?: Partial<Pick<EstimateSession, 'nickname' | 'lossType'>>): EstimateSession => {
      const created = nowIso()
      const session: EstimateSession = {
        id: crypto.randomUUID(),
        nickname: seed?.nickname?.trim() || 'Untitled Review',
        lossType: seed?.lossType ?? 'other',
        hasPdf: false,
        createdAt: created,
        updatedAt: created,
      }

      setSessions((prev) => [session, ...prev])
      setCurrentSessionIdState(session.id)
      if (currentPdf) {
        URL.revokeObjectURL(currentPdf.objectUrl)
        setCurrentPdf(null)
      }
      return session
    },
    [currentPdf]
  )

  const currentSession = useMemo(
    () => sessions.find((session) => session.id === currentSessionId) ?? null,
    [sessions, currentSessionId]
  )

  const ensureCurrentSession = useCallback((): EstimateSession => {
    if (currentSession) return currentSession
    return createSession()
  }, [createSession, currentSession])

  const updateCurrentSession = useCallback(
    (patch: Partial<EstimateSession>) => {
      const active = ensureCurrentSession()
      const updatedAt = nowIso()

      setSessions((prev) =>
        prev
          .map((session) =>
            session.id === active.id
              ? { ...session, ...patch, id: session.id, createdAt: session.createdAt, updatedAt }
              : session
          )
          .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      )
    },
    [ensureCurrentSession]
  )

  const setCurrentSessionId = useCallback(
    (sessionId: string | null) => {
      setCurrentSessionIdState(sessionId)
      if (currentPdf && (!sessionId || currentPdf.sessionId !== sessionId)) {
        URL.revokeObjectURL(currentPdf.objectUrl)
        setCurrentPdf(null)
      }
    },
    [currentPdf]
  )

  const attachPdfToCurrentSession = useCallback(
    (file: File): EstimateSession => {
      const session = ensureCurrentSession()
      updateCurrentSession({ hasPdf: true })

      if (currentPdf) {
        URL.revokeObjectURL(currentPdf.objectUrl)
      }
      setCurrentPdf({
        sessionId: session.id,
        fileName: file.name,
        fileSize: file.size,
        objectUrl: URL.createObjectURL(file),
      })

      return session
    },
    [currentPdf, ensureCurrentSession, updateCurrentSession]
  )

  const clearCurrentPdf = useCallback(() => {
    if (currentPdf) {
      URL.revokeObjectURL(currentPdf.objectUrl)
    }
    setCurrentPdf(null)
    if (currentSession) {
      updateCurrentSession({ hasPdf: false })
    }
  }, [currentPdf, currentSession, updateCurrentSession])

  const deleteSession = useCallback(
    (sessionId: string) => {
      setSessions((prev) => prev.filter((session) => session.id !== sessionId))
      if (currentSessionId === sessionId) {
        setCurrentSessionIdState(null)
      }
      if (currentPdf?.sessionId === sessionId) {
        URL.revokeObjectURL(currentPdf.objectUrl)
        setCurrentPdf(null)
      }
    },
    [currentPdf, currentSessionId]
  )

  const deleteAllSessions = useCallback(() => {
    setSessions([])
    setCurrentSessionIdState(null)
    if (currentPdf) {
      URL.revokeObjectURL(currentPdf.objectUrl)
      setCurrentPdf(null)
    }
    window.localStorage.removeItem(SESSIONS_STORAGE_KEY)
    window.localStorage.removeItem(LAST_ACTIVE_STORAGE_KEY)
  }, [currentPdf])

  const value = useMemo<AppContextValue>(
    () => ({
      sessions,
      currentSession,
      hasSavedSessions: sessions.length > 0,
      currentPdf:
        currentPdf && currentSession && currentPdf.sessionId === currentSession.id ? currentPdf : null,
      ensureCurrentSession,
      createSession,
      setCurrentSessionId,
      updateCurrentSession,
      attachPdfToCurrentSession,
      clearCurrentPdf,
      deleteSession,
      deleteAllSessions,
    }),
    [
      sessions,
      currentSession,
      currentPdf,
      ensureCurrentSession,
      createSession,
      setCurrentSessionId,
      updateCurrentSession,
      attachPdfToCurrentSession,
      clearCurrentPdf,
      deleteSession,
      deleteAllSessions,
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const value = useContext(AppContext)
  if (!value) {
    throw new Error('useApp must be used inside AppProvider')
  }
  return value
}

export function formatShortDate(value: string): string {
  return new Date(value).toLocaleDateString()
}

export function lossTypeLabel(lossType: LossType): string {
  switch (lossType) {
    case 'fire':
      return 'Fire or smoke'
    case 'wind':
      return 'Wind or storm'
    case 'water':
      return 'Water or flooding'
    case 'earthquake':
      return 'Earthquake'
    default:
      return 'Other'
  }
}
