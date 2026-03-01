import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'
import type { OpCheckChoice } from '../types/session'

const OPTIONS: { id: OpCheckChoice; label: string }[] = [
  { id: 'yes', label: 'Yes, I can see it listed with a dollar amount' },
  { id: 'might-be', label: 'I see something that might be it, but I am not sure' },
  { id: 'cannot-find', label: 'I cannot find it anywhere in the estimate' },
  { id: 'not-sure', label: 'I am not sure what I am looking at' },
]

export default function OpCheck() {
  const navigate = useNavigate()
  const { currentSession, updateCurrentSession } = useApp()
  const [value, setValue] = useState<OpCheckChoice>(currentSession?.opCheck ?? 'not-sure')

  return (
    <ScreenLayout title="One important thing to check right now." stepText="Step 2 of 5">
      <p>
        Look for Overhead and Profit (often called O&amp;P). These are normal contractor costs and usually appear
        toward the end of an estimate.
      </p>
      <fieldset className="panel">
        <legend>Can you find O&amp;P listed in your estimate?</legend>
        {OPTIONS.map((option) => (
          <label className="choice" key={option.id}>
            <input type="radio" name="op-check" checked={value === option.id} onChange={() => setValue(option.id)} />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>
      <p className="tip">If O&amp;P is missing or very low, this can significantly reduce settlement totals.</p>
      <div className="actions">
        <button
          className="button primary"
          type="button"
          onClick={() => {
            updateCurrentSession({ opCheck: value })
            navigate(ROUTES.SYSTEMS)
          }}
        >
          Continue →
        </button>
      </div>
    </ScreenLayout>
  )
}
