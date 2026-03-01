import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'
import { createEmptySiteAccessAnswers, type SiteAccessAnswers } from '../types/session'

export default function SiteAccess() {
  const navigate = useNavigate()
  const { currentSession, updateCurrentSession } = useApp()
  const [answers, setAnswers] = useState<SiteAccessAnswers>(
    currentSession?.siteAccess ?? createEmptySiteAccessAnswers()
  )

  return (
    <ScreenLayout title="A few questions about your property." stepText="Step 4 of 5">
      <p>These questions help identify costs that are easy to overlook but can add up significantly.</p>

      <fieldset className="panel">
        <legend>Is your home on a slope, hillside, or difficult-to-access lot?</legend>
        {(['yes', 'no', 'not-sure'] as const).map((choice) => (
          <label className="choice" key={choice}>
            <input
              type="radio"
              checked={answers.slopeOrHillside.choice === choice}
              onChange={() => setAnswers((prev) => ({ ...prev, slopeOrHillside: { ...prev.slopeOrHillside, choice } }))}
            />
            <span>{choice === 'yes' ? 'Yes' : choice === 'no' ? 'No' : 'I am not sure'}</span>
          </label>
        ))}
        {answers.slopeOrHillside.choice === 'yes' ? (
          <textarea
            className="textarea"
            value={answers.slopeOrHillside.note ?? ''}
            onChange={(event) =>
              setAnswers((prev) => ({ ...prev, slopeOrHillside: { ...prev.slopeOrHillside, note: event.target.value } }))
            }
            placeholder="Describe briefly"
          />
        ) : null}
      </fieldset>

      <fieldset className="panel">
        <legend>Is your home in an area known for higher construction costs?</legend>
        {(['yes', 'no', 'not-sure'] as const).map((choice) => (
          <label className="choice" key={choice}>
            <input
              type="radio"
              checked={answers.higherCostArea.choice === choice}
              onChange={() => setAnswers((prev) => ({ ...prev, higherCostArea: { ...prev.higherCostArea, choice } }))}
            />
            <span>{choice === 'yes' ? 'Yes' : choice === 'no' ? 'No' : 'I am not sure'}</span>
          </label>
        ))}
        {answers.higherCostArea.choice === 'yes' ? (
          <textarea
            className="textarea"
            value={answers.higherCostArea.note ?? ''}
            onChange={(event) =>
              setAnswers((prev) => ({ ...prev, higherCostArea: { ...prev.higherCostArea, note: event.target.value } }))
            }
            placeholder="Describe briefly"
          />
        ) : null}
      </fieldset>

      <fieldset className="panel">
        <legend>Were there unusual site conditions that could make rebuilding harder?</legend>
        {(['yes', 'no', 'not-sure'] as const).map((choice) => (
          <label className="choice" key={choice}>
            <input
              type="radio"
              checked={answers.unusualConditions.choice === choice}
              onChange={() => setAnswers((prev) => ({ ...prev, unusualConditions: { ...prev.unusualConditions, choice } }))}
            />
            <span>{choice === 'yes' ? 'Yes' : choice === 'no' ? 'No' : 'I am not sure'}</span>
          </label>
        ))}
        {answers.unusualConditions.choice === 'yes' ? (
          <textarea
            className="textarea"
            value={answers.unusualConditions.note ?? ''}
            onChange={(event) =>
              setAnswers((prev) => ({ ...prev, unusualConditions: { ...prev.unusualConditions, note: event.target.value } }))
            }
            placeholder="Describe briefly"
          />
        ) : null}
      </fieldset>

      <fieldset className="panel">
        <legend>Were there other structures on the property beyond the main home?</legend>
        {(['yes', 'no'] as const).map((choice) => (
          <label className="choice" key={choice}>
            <input
              type="radio"
              checked={answers.otherStructures.choice === choice}
              onChange={() => setAnswers((prev) => ({ ...prev, otherStructures: { ...prev.otherStructures, choice } }))}
            />
            <span>{choice === 'yes' ? 'Yes' : 'No'}</span>
          </label>
        ))}
        {answers.otherStructures.choice === 'yes' ? (
          <textarea
            className="textarea"
            value={answers.otherStructures.note ?? ''}
            onChange={(event) =>
              setAnswers((prev) => ({ ...prev, otherStructures: { ...prev.otherStructures, note: event.target.value } }))
            }
            placeholder="List what you had"
          />
        ) : null}
      </fieldset>

      <div className="actions">
        <button
          className="button primary"
          type="button"
          onClick={() => {
            updateCurrentSession({ siteAccess: answers })
            navigate(ROUTES.GLOBAL_ISSUES)
          }}
        >
          Continue →
        </button>
      </div>
    </ScreenLayout>
  )
}
