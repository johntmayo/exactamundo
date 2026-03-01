import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import { useApp } from '../context/AppContext'
import { COVERAGE_OPTIONS } from '../data/checklists'
import { ROUTES } from '../routes'
import { createEmptyCoverageSections, type CoverageSections } from '../types/session'

export default function Coverage() {
  const navigate = useNavigate()
  const { currentSession, updateCurrentSession } = useApp()
  const initial = useMemo<CoverageSections>(
    () => currentSession?.coverageSections ?? createEmptyCoverageSections(),
    [currentSession]
  )
  const [coverage, setCoverage] = useState<CoverageSections>(initial)

  const toggle = (key: keyof CoverageSections) => {
    setCoverage((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <ScreenLayout title="Let&apos;s start with the big picture." stepText="Step 2 of 5">
      <p>Do you see each of these sections listed in your estimate with dollar amounts?</p>
      <fieldset className="panel">
        <legend>Coverage sections</legend>
        {COVERAGE_OPTIONS.map((option) => (
          <label className="choice" key={option.id}>
            <input
              type="checkbox"
              checked={coverage[option.id as keyof CoverageSections]}
              onChange={() => toggle(option.id as keyof CoverageSections)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>
      <p className="tip">
        Building code upgrades are often legally required when rebuilding. If that section is missing or zero,
        it is important to raise.
      </p>
      <div className="actions">
        <button
          className="button primary"
          type="button"
          onClick={() => {
            updateCurrentSession({ coverageSections: coverage })
            navigate(ROUTES.OP_CHECK)
          }}
        >
          Continue →
        </button>
      </div>
    </ScreenLayout>
  )
}
