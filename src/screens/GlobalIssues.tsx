import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'
import { createEmptyGlobalIssuesAnswers, type GlobalIssuesAnswers } from '../types/session'

export default function GlobalIssues() {
  const navigate = useNavigate()
  const { currentSession, updateCurrentSession } = useApp()
  const [answers, setAnswers] = useState<GlobalIssuesAnswers>(
    currentSession?.globalIssues ?? createEmptyGlobalIssuesAnswers()
  )

  return (
    <ScreenLayout title="A few more questions about the whole estimate." stepText="Step 4 of 5">
      <fieldset className="panel">
        <legend>Has anyone mentioned building code upgrades to you?</legend>
        {(
          [
            ['yes-in-estimate', 'Yes, it was discussed and is in the estimate'],
            ['mentioned-unsure', 'It was mentioned but I am not sure it is in the estimate'],
            ['no-one-mentioned', 'No one has mentioned it'],
            ['not-sure', 'I am not sure'],
          ] as const
        ).map(([choice, label]) => (
          <label className="choice" key={choice}>
            <input
              type="radio"
              checked={answers.codeUpgrades === choice}
              onChange={() => setAnswers((prev) => ({ ...prev, codeUpgrades: choice }))}
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="panel">
        <legend>Does your estimate include notes about engineering, permits, or inspections?</legend>
        {(
          [
            ['yes', 'Yes, I can see it'],
            ['not-sure', 'I am not sure'],
            ['cannot-find', 'I cannot find it'],
          ] as const
        ).map(([choice, label]) => (
          <label className="choice" key={choice}>
            <input
              type="radio"
              checked={answers.permitsEngineering === choice}
              onChange={() => setAnswers((prev) => ({ ...prev, permitsEngineering: choice }))}
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="panel">
        <legend>Are you planning to rebuild the same home you had, or something different?</legend>
        {(
          [
            ['same', 'The same home, as close as possible'],
            ['different', 'Something different'],
            ['undecided', 'I have not decided yet'],
          ] as const
        ).map(([choice, label]) => (
          <label className="choice" key={choice}>
            <input
              type="radio"
              checked={answers.rebuildSameOrDifferent === choice}
              onChange={() => setAnswers((prev) => ({ ...prev, rebuildSameOrDifferent: choice }))}
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="panel">
        <legend>Is there anything you already know is missing or wrong in the estimate?</legend>
        {(['yes', 'no', 'not-sure'] as const).map((choice) => (
          <label className="choice" key={choice}>
            <input
              type="radio"
              checked={answers.anythingMissing.choice === choice}
              onChange={() =>
                setAnswers((prev) => ({ ...prev, anythingMissing: { ...prev.anythingMissing, choice } }))
              }
            />
            <span>{choice === 'yes' ? 'Yes' : choice === 'no' ? 'No' : 'I am not sure'}</span>
          </label>
        ))}
        {answers.anythingMissing.choice === 'yes' ? (
          <textarea
            className="textarea"
            value={answers.anythingMissing.note ?? ''}
            onChange={(event) =>
              setAnswers((prev) => ({
                ...prev,
                anythingMissing: { ...prev.anythingMissing, note: event.target.value },
              }))
            }
            placeholder="Describe what seems off"
          />
        ) : null}
      </fieldset>

      <div className="actions">
        <button
          className="button primary"
          type="button"
          onClick={() => {
            updateCurrentSession({ globalIssues: answers })
            navigate(ROUTES.SUMMARY)
          }}
        >
          See my review summary →
        </button>
      </div>
    </ScreenLayout>
  )
}
