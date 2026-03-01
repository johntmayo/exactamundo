/**
 * Route paths for Estimate Review Helper (SCREENS-v1-dwelling flow).
 * Order matches the 14-screen flow; Settings is available globally.
 */
export const ROUTES = {
  LANDING: '/',
  UPLOAD: '/upload',
  SETUP: '/setup',
  RESUME: '/resume',
  HOW_IT_WORKS: '/how-it-works',
  COVERAGE: '/coverage',
  OP_CHECK: '/op-check',
  SYSTEMS: '/systems',
  ROOM_SELECTION: '/rooms',
  ROOM_CHECKLIST: '/rooms/:roomId',
  SITE_ACCESS: '/site-access',
  GLOBAL_ISSUES: '/global-issues',
  SUMMARY: '/summary',
  SETTINGS: '/settings',
} as const

/** Build room checklist path for a given room id */
export function roomChecklistPath(roomId: string): string {
  return `/rooms/${roomId}`
}

export function isRoomChecklistPath(pathname: string): boolean {
  return pathname.startsWith('/rooms/')
}
