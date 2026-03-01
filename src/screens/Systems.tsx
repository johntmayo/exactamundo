import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import { useApp } from '../context/AppContext'
import { SYSTEM_GROUPS } from '../data/checklists'
import { ROUTES } from '../routes'
import type { SystemCategoryId, SystemsMissingFollowUp } from '../types/session'

export default function Systems() {
  const navigate = useNavigate()
  const { currentSession, updateCurrentSession } = useApp()
  const [selected, setSelected] = useState<SystemCategoryId[]>(currentSession?.systemsChecked ?? [])
  const [followUpChoice, setFollowUpChoice] = useState<SystemsMissingFollowUp>(
    currentSession?.systemsMissingFollowUp?.choice ?? 'not-sure'
  )
  const [followUpNote, setFollowUpNote] = useState(currentSession?.systemsMissingFollowUp?.note ?? '')
  const selectedSet = useMemo(() => new Set(selected), [selected])

  const toggle = (id: SystemCategoryId) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id]))
  }

  return (
    <ScreenLayout title="Now let&apos;s check the systems." stepText="Step 2 of 5">
      <p>
        A complete rebuild estimate should include sections for every trade involved. Check off each category you
        can find.
      </p>
      <div className="stack">
        {SYSTEM_GROUPS.map((group) => (
          <fieldset className="panel" key={group.title}>
            <legend>{group.title}</legend>
            {group.items.map((item) => (
              <label className="choice" key={item.id}>
                <input
                  type="checkbox"
                  checked={selectedSet.has(item.id)}
                  onChange={() => toggle(item.id)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </fieldset>
        ))}
      </div>

      <fieldset className="panel">
        <legend>Are there categories that applied to your home but were not in your estimate?</legend>
        <label className="choice">
          <input
            type="radio"
            checked={followUpChoice === 'yes'}
            onChange={() => setFollowUpChoice('yes')}
          />
          <span>Yes</span>
        </label>
        <label className="choice">
          <input type="radio" checked={followUpChoice === 'no'} onChange={() => setFollowUpChoice('no')} />
          <span>No, everything that applied seemed to be there</span>
        </label>
        <label className="choice">
          <input
            type="radio"
            checked={followUpChoice === 'not-sure'}
            onChange={() => setFollowUpChoice('not-sure')}
          />
          <span>I am not sure</span>
        </label>
        {followUpChoice !== 'no' ? (
          <textarea
            className="textarea"
            value={followUpNote}
            onChange={(event) => setFollowUpNote(event.target.value)}
            placeholder="List what seems missing or uncertain."
          />
        ) : null}
      </fieldset>

      <div className="actions">
        <button
          className="button primary"
          type="button"
          onClick={() => {
            updateCurrentSession({
              systemsChecked: selected,
              systemsMissingFollowUp: { choice: followUpChoice, note: followUpNote.trim() || undefined },
            })
            navigate(ROUTES.ROOM_SELECTION)
          }}
        >
          Continue →
        </button>
      </div>
    </ScreenLayout>
  )
}
