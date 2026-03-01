import { ROUTES, roomChecklistPath } from '../routes'
import type { EstimateSession, RoomId } from '../types/session'

function hasRoomAnswers(session: EstimateSession, roomId: RoomId): boolean {
  const answer = session.answersByRoom?.[roomId]
  return Boolean(answer)
}

export function nextRouteForSession(session: EstimateSession): string {
  if (!session.coverageSections) return ROUTES.COVERAGE
  if (!session.opCheck) return ROUTES.OP_CHECK
  if (!session.systemsChecked) return ROUTES.SYSTEMS
  if (!session.roomsSelected) return ROUTES.ROOM_SELECTION

  if (session.roomsSelected.length > 0) {
    const nextRoom = session.roomsSelected.find((roomId) => !hasRoomAnswers(session, roomId))
    if (nextRoom) {
      return roomChecklistPath(nextRoom)
    }
  }

  if (!session.siteAccess) return ROUTES.SITE_ACCESS
  if (!session.globalIssues) return ROUTES.GLOBAL_ISSUES
  return ROUTES.SUMMARY
}
