import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import { useEstimateSessionStore } from '../store/estimateSessionStore'
import type { LossType } from '../types/session'

const LOSS_TYPE_OPTIONS: { value: LossType; label: string }[] = [
  { value: 'fire', label: 'Fire or smoke' },
  { value: 'wind', label: 'Wind or storm' },
  { value: 'water', label: 'Water or flooding' },
  { value: 'earthquake', label: 'Earthquake' },
  { value: 'other', label: 'Something else' },
]

function Setup() {
  const navigate = useNavigate()
  const { session, createSession, updateSession } = useEstimateSessionStore()

  const [lossType, setLossType] = useState<LossType | null>(
    session?.lossType ?? null
  )
  const [nickname, setNickname] = useState(session?.nickname ?? '')

  function handleSubmit() {
    if (!lossType) return

    const resolvedNickname = nickname.trim() || 'Untitled Review'

    if (!session) {
      createSession({ nickname: resolvedNickname, lossType })
    } else {
      updateSession({ nickname: resolvedNickname, lossType })
    }

    navigate('/how-it-works')
  }

  return (
    <ScreenLayout>
      <section className="screen-intro" aria-labelledby="setup-title">
        <header className="screen-header">
          <h1 id="setup-title">Let&apos;s get you set up.</h1>
        </header>

        <div className="screen-body">
          <fieldset className="panel">
            <legend className="label">What caused the damage to your home?</legend>

            {LOSS_TYPE_OPTIONS.map(({ value, label }) => (
              <label key={value} className="choice">
                <input
                  type="radio"
                  name="lossType"
                  value={value}
                  checked={lossType === value}
                  onChange={() => setLossType(value)}
                />
                {label}
              </label>
            ))}
          </fieldset>

          <div className="panel">
            <label className="label" htmlFor="nickname">
              Give this review a short name so we can save your progress.
            </label>
            <input
              id="nickname"
              type="text"
              className="input"
              placeholder='e.g., "Main House Fire" or "Storm Damage 2025"'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <p className="fine-print">This is just for you — it stays on this device.</p>
          </div>

          <div className="actions">
            <button
              className="button primary"
              disabled={!lossType}
              onClick={handleSubmit}
            >
              Continue &rarr;
            </button>
          </div>
        </div>
      </section>
    </ScreenLayout>
  )
}

export default Setup
