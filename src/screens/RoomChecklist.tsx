import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import { useApp } from '../context/AppContext'
import { roomLabel } from '../data/checklists'
import { ROUTES, roomChecklistPath } from '../routes'
import { createEmptyRoomAnswers, type RoomAnswers, type RoomId } from '../types/session'

export default function RoomChecklist() {
  const navigate = useNavigate()
  const { roomId } = useParams<{ roomId: RoomId }>()
  const { currentSession, updateCurrentSession } = useApp()

  const selectedRooms = currentSession?.roomsSelected ?? []
  const activeRoomId = roomId as RoomId | undefined

  useEffect(() => {
    if (selectedRooms.length === 0) {
      navigate(ROUTES.SITE_ACCESS, { replace: true })
      return
    }
    if (!activeRoomId || !selectedRooms.includes(activeRoomId)) {
      navigate(roomChecklistPath(selectedRooms[0]), { replace: true })
    }
  }, [activeRoomId, navigate, selectedRooms])

  const initialAnswers = useMemo<RoomAnswers>(() => {
    if (!activeRoomId) return createEmptyRoomAnswers()
    return currentSession?.answersByRoom?.[activeRoomId] ?? createEmptyRoomAnswers()
  }, [activeRoomId, currentSession])

  const [answers, setAnswers] = useState<RoomAnswers>(initialAnswers)

  useEffect(() => {
    setAnswers(initialAnswers)
  }, [initialAnswers])

  const roomIndex = activeRoomId ? selectedRooms.indexOf(activeRoomId) : -1
  const nextRoomId = roomIndex >= 0 ? selectedRooms[roomIndex + 1] : undefined

  const updateField = <T extends keyof RoomAnswers>(field: T, value: RoomAnswers[T]) => {
    setAnswers((prev) => ({ ...prev, [field]: value }))
  }

  if (!activeRoomId || !selectedRooms.includes(activeRoomId)) return null

  return (
    <ScreenLayout title={`Let&apos;s look at the ${roomLabel(activeRoomId)}.`} stepText="Step 3 of 5">
      <p>Think back to what this room was like before the damage.</p>
      <p className="muted">
        Room {roomIndex + 1} of {selectedRooms.length}
      </p>

      <fieldset className="panel">
        <legend>What were the floors like?</legend>
        <label className="choice">
          <input
            type="radio"
            checked={answers.floors.choice === 'standard'}
            onChange={() => updateField('floors', { ...answers.floors, choice: 'standard' })}
          />
          <span>Standard / basic</span>
        </label>
        <label className="choice">
          <input
            type="radio"
            checked={answers.floors.choice === 'upgraded'}
            onChange={() => updateField('floors', { ...answers.floors, choice: 'upgraded' })}
          />
          <span>Upgraded or custom</span>
        </label>
        <label className="choice">
          <input
            type="radio"
            checked={answers.floors.choice === 'not-sure'}
            onChange={() => updateField('floors', { ...answers.floors, choice: 'not-sure' })}
          />
          <span>I am not sure</span>
        </label>
        {answers.floors.choice === 'upgraded' ? (
          <textarea
            className="textarea"
            value={answers.floors.note ?? ''}
            onChange={(event) => updateField('floors', { ...answers.floors, note: event.target.value })}
            placeholder="Describe briefly"
          />
        ) : null}
      </fieldset>

      <fieldset className="panel">
        <legend>Were there special wall or ceiling finishes?</legend>
        {(['standard', 'upgraded', 'not-sure'] as const).map((choice) => (
          <label className="choice" key={choice}>
            <input
              type="radio"
              checked={answers.wallsCeiling.choice === choice}
              onChange={() => updateField('wallsCeiling', { ...answers.wallsCeiling, choice })}
            />
            <span>{choice === 'standard' ? 'Standard / basic' : choice === 'upgraded' ? 'Upgraded or custom' : 'I am not sure'}</span>
          </label>
        ))}
        {answers.wallsCeiling.choice === 'upgraded' ? (
          <textarea
            className="textarea"
            value={answers.wallsCeiling.note ?? ''}
            onChange={(event) => updateField('wallsCeiling', { ...answers.wallsCeiling, note: event.target.value })}
            placeholder="Describe briefly"
          />
        ) : null}
      </fieldset>

      <fieldset className="panel">
        <legend>Were there built-in features?</legend>
        {(['yes', 'no', 'not-sure'] as const).map((choice) => (
          <label className="choice" key={choice}>
            <input
              type="radio"
              checked={answers.builtIns.choice === choice}
              onChange={() => updateField('builtIns', { ...answers.builtIns, choice })}
            />
            <span>{choice === 'yes' ? 'Yes' : choice === 'no' ? 'No' : 'I am not sure'}</span>
          </label>
        ))}
        {answers.builtIns.choice === 'yes' ? (
          <textarea
            className="textarea"
            value={answers.builtIns.note ?? ''}
            onChange={(event) => updateField('builtIns', { ...answers.builtIns, note: event.target.value })}
            placeholder="Describe briefly"
          />
        ) : null}
      </fieldset>

      <fieldset className="panel">
        <legend>What were the windows like?</legend>
        {(['standard', 'upgraded', 'not-sure'] as const).map((choice) => (
          <label className="choice" key={choice}>
            <input
              type="radio"
              checked={answers.windows.choice === choice}
              onChange={() => updateField('windows', { ...answers.windows, choice })}
            />
            <span>{choice === 'standard' ? 'Standard size and style' : choice === 'upgraded' ? 'Large, custom, or specialty' : 'I am not sure'}</span>
          </label>
        ))}
        {answers.windows.choice === 'upgraded' ? (
          <textarea
            className="textarea"
            value={answers.windows.note ?? ''}
            onChange={(event) => updateField('windows', { ...answers.windows, note: event.target.value })}
            placeholder="Describe briefly"
          />
        ) : null}
      </fieldset>

      <fieldset className="panel">
        <legend>Any notable light fixtures?</legend>
        {(['standard', 'upgraded', 'not-sure'] as const).map((choice) => (
          <label className="choice" key={choice}>
            <input
              type="radio"
              checked={answers.lightFixtures.choice === choice}
              onChange={() => updateField('lightFixtures', { ...answers.lightFixtures, choice })}
            />
            <span>{choice === 'standard' ? 'Standard / basic' : choice === 'upgraded' ? 'Notable or custom' : 'I am not sure'}</span>
          </label>
        ))}
        {answers.lightFixtures.choice === 'upgraded' ? (
          <textarea
            className="textarea"
            value={answers.lightFixtures.note ?? ''}
            onChange={(event) => updateField('lightFixtures', { ...answers.lightFixtures, note: event.target.value })}
            placeholder="Describe briefly"
          />
        ) : null}
      </fieldset>

      <fieldset className="panel">
        <legend>Any special architectural features?</legend>
        {(['yes', 'no', 'not-sure'] as const).map((choice) => (
          <label className="choice" key={choice}>
            <input
              type="radio"
              checked={answers.architecturalFeatures.choice === choice}
              onChange={() => updateField('architecturalFeatures', { ...answers.architecturalFeatures, choice })}
            />
            <span>{choice === 'yes' ? 'Yes' : choice === 'no' ? 'No' : 'I am not sure'}</span>
          </label>
        ))}
        {answers.architecturalFeatures.choice === 'yes' ? (
          <textarea
            className="textarea"
            value={answers.architecturalFeatures.note ?? ''}
            onChange={(event) =>
              updateField('architecturalFeatures', { ...answers.architecturalFeatures, note: event.target.value })
            }
            placeholder="Describe briefly"
          />
        ) : null}
      </fieldset>

      <fieldset className="panel">
        <legend>Anything else about this room to make sure is covered?</legend>
        {(['yes', 'no'] as const).map((choice) => (
          <label className="choice" key={choice}>
            <input
              type="radio"
              checked={answers.anythingElse.choice === choice}
              onChange={() => updateField('anythingElse', { ...answers.anythingElse, choice })}
            />
            <span>{choice === 'yes' ? 'Yes' : 'No'}</span>
          </label>
        ))}
        {answers.anythingElse.choice === 'yes' ? (
          <textarea
            className="textarea"
            value={answers.anythingElse.note ?? ''}
            onChange={(event) => updateField('anythingElse', { ...answers.anythingElse, note: event.target.value })}
            placeholder="Describe briefly"
          />
        ) : null}
      </fieldset>

      <div className="actions">
        <button
          className="button primary"
          type="button"
          onClick={() => {
            updateCurrentSession({
              answersByRoom: {
                ...(currentSession?.answersByRoom ?? {}),
                [activeRoomId]: answers,
              },
            })
            if (nextRoomId) {
              navigate(roomChecklistPath(nextRoomId))
            } else {
              navigate(ROUTES.SITE_ACCESS)
            }
          }}
        >
          Save and continue →
        </button>
      </div>
    </ScreenLayout>
  )
}
