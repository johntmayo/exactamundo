import { create } from 'zustand'
import { createEmptyEstimateSession, type EstimateSession } from '../types'
import {
  clearLastActiveSessionId,
  getLastActiveSessionId,
  loadSession as loadStoredSession,
  saveSession,
  setLastActiveSessionId,
} from '../lib/storage'

type SessionPatch = Partial<EstimateSession> | ((session: EstimateSession) => Partial<EstimateSession>)

interface EstimateSessionStore {
  session: EstimateSession | null
  createSession: (seed?: Partial<Pick<EstimateSession, 'nickname' | 'lossType'>>) => EstimateSession
  updateSession: (patch: SessionPatch) => void
  loadSession: (sessionId: string) => EstimateSession | null
  hydrateSession: () => EstimateSession | null
}

function applyPatch(session: EstimateSession, patch: SessionPatch): Partial<EstimateSession> {
  if (typeof patch === 'function') {
    return patch(session)
  }
  return patch
}

export const useEstimateSessionStore = create<EstimateSessionStore>((set) => ({
  session: null,

  createSession: (seed) => {
    const created = createEmptyEstimateSession(seed)
    set({ session: created })
    return created
  },

  updateSession: (patch) =>
    set((state) => {
      if (!state.session) return state

      const merged = {
        ...state.session,
        ...applyPatch(state.session, patch),
        id: state.session.id,
        createdAt: state.session.createdAt,
        updatedAt: new Date().toISOString(),
      }

      return { session: merged }
    }),

  loadSession: (sessionId) => {
    const session = loadStoredSession(sessionId)
    set({ session })
    return session
  },

  hydrateSession: () => {
    const lastActiveSessionId = getLastActiveSessionId()
    if (!lastActiveSessionId) return null

    const session = loadStoredSession(lastActiveSessionId)
    if (!session) return null

    set({ session })
    return session
  },
}))

useEstimateSessionStore.subscribe((state, previousState) => {
  if (state.session === previousState.session) return

  if (state.session) {
    saveSession(state.session)
    setLastActiveSessionId(state.session.id)
    return
  }

  clearLastActiveSessionId()
})
