import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import { useApp } from '../context/AppContext'
import { ROOM_OPTIONS } from '../data/checklists'
import { ROUTES, roomChecklistPath } from '../routes'
import type { RoomId } from '../types/session'

export default function RoomSelection() {
  const navigate = useNavigate()
  const { currentSession, updateCurrentSession } = useApp()
  const [selected, setSelected] = useState<RoomId[]>(currentSession?.roomsSelected ?? [])

  const toggle = (roomId: RoomId) => {
    setSelected((prev) => (prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]))
  }

  return (
    <ScreenLayout title="Now let&apos;s go room by room." stepText="Step 3 of 5">
      <p>Select all the rooms or areas that existed in your home before the damage.</p>
      <fieldset className="panel">
        <legend>Rooms and areas</legend>
        {ROOM_OPTIONS.map((room) => (
          <label className="choice" key={room.id}>
            <input type="checkbox" checked={selected.includes(room.id)} onChange={() => toggle(room.id)} />
            <span>{room.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="actions">
        <button
          className="button primary"
          type="button"
          onClick={() => {
            updateCurrentSession({ roomsSelected: selected })
            if (selected.length > 0) {
              navigate(roomChecklistPath(selected[0]))
            } else {
              navigate(ROUTES.SITE_ACCESS)
            }
          }}
        >
          Review these rooms →
        </button>
      </div>
    </ScreenLayout>
  )
}
