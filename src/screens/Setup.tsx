import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import { useApp } from '../context/AppContext'
import { LOSS_TYPE_OPTIONS } from '../data/checklists'
import { ROUTES } from '../routes'
import type { LossType } from '../types/session'

export default function Setup() {
  const navigate = useNavigate()
  const { currentSession, ensureCurrentSession, updateCurrentSession } = useApp()
  const initialLoss = useMemo<LossType>(() => currentSession?.lossType ?? 'other', [currentSession])
  const initialNickname = useMemo(
    () => (currentSession?.nickname === 'Untitled Review' ? '' : currentSession?.nickname ?? ''),
    [currentSession]
  )

  const [lossType, setLossType] = useState<LossType>(initialLoss)
  const [nickname, setNickname] = useState(initialNickname)
  const [error, setError] = useState('')

  const submit = () => {
    const name = nickname.trim()
    if (!name) {
      setError('Please give this review a short name so we can save your progress.')
      return
    }
    ensureCurrentSession()
    updateCurrentSession({ nickname: name, lossType })
    navigate(ROUTES.HOW_IT_WORKS)
  }

  return (
    <ScreenLayout title="Let&apos;s get you set up." stepText="Step 1 of 5">
      <fieldset className="panel">
        <legend>What caused the damage to your home?</legend>
        {LOSS_TYPE_OPTIONS.map((option) => (
          <label className="choice" key={option.id}>
            <input
              type="radio"
              name="lossType"
              checked={lossType === option.id}
              onChange={() => setLossType(option.id)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>
      <label className="label" htmlFor="nickname">
        Give this review a short name so we can save your progress.
      </label>
      <input
        id="nickname"
        className="input"
        value={nickname}
        onChange={(event) => {
          setNickname(event.target.value)
          setError('')
        }}
        placeholder='e.g., "Main House Fire"'
      />
      <p className="muted">This is just for you. It stays on this device.</p>
      {error ? <p className="error">{error}</p> : null}
      <div className="actions">
        <button className="button primary" type="button" onClick={submit}>
          Continue →
        </button>
      </div>
    </ScreenLayout>
  )
}
