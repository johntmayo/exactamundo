import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RequireSession from '../components/RequireSession'
import ScreenLayout from '../components/ScreenLayout'
import { useEstimateSessionStore } from '../store/estimateSessionStore'
import type { CoverageSectionAnswers } from '../types/session'

const EMPTY_COVERAGE_ANSWERS: CoverageSectionAnswers = {
  dwelling: false,
  buildingCodeUpgrades: false,
  otherStructures: false,
  landscaping: false,
  treesAndShrubs: false,
}

function Coverage() {
  const navigate = useNavigate()
  const session = useEstimateSessionStore((state) => state.session)
  const updateSession = useEstimateSessionStore((state) => state.updateSession)
  const [answers, setAnswers] = useState<CoverageSectionAnswers>(EMPTY_COVERAGE_ANSWERS)

  useEffect(() => {
    if (!session) return
    setAnswers(session.coverageSections)
  }, [session])

  function toggleAnswer(key: keyof CoverageSectionAnswers) {
    setAnswers((previous) => ({
      ...previous,
      [key]: !previous[key],
    }))
  }

  function handleSubmit() {
    updateSession({ coverageSections: answers })
    navigate('/op-check')
  }

  return (
    <RequireSession>
      <ScreenLayout>
        <section className="screen-intro" aria-labelledby="coverage-title">
          <header className="screen-header">
            <h1 id="coverage-title">Let&apos;s start with the big picture.</h1>
          </header>

          <div className="screen-body">
            <p>
              A complete estimate for a home rebuild is usually divided into major coverage
              sections. Look at the first page or summary page of your estimate.
            </p>
            <p>
              Do you see each of the following sections listed, with dollar amounts next to them?
            </p>

            <div className="panel">
              <label className="choice">
                <input
                  type="checkbox"
                  checked={answers.dwelling}
                  onChange={() => toggleAnswer('dwelling')}
                />
                Dwelling (the main home structure)
              </label>

              <div>
                <label className="choice">
                  <input
                    type="checkbox"
                    checked={answers.buildingCodeUpgrades}
                    onChange={() => toggleAnswer('buildingCodeUpgrades')}
                  />
                  Building Code Upgrades
                </label>
                <p className="fine-print muted">
                  When a home is rebuilt, local laws often require certain improvements — like
                  upgraded wiring, insulation, or windows — beyond what you had before. These are
                  legally required and should be in your estimate. This section can be worth tens
                  of thousands of dollars. If it&apos;s missing or shows $0, that&apos;s a major issue
                  to raise.
                </p>
              </div>

              <label className="choice">
                <input
                  type="checkbox"
                  checked={answers.otherStructures}
                  onChange={() => toggleAnswer('otherStructures')}
                />
                Other Structures (garage, fence, shed, etc.)
              </label>

              <label className="choice">
                <input
                  type="checkbox"
                  checked={answers.landscaping}
                  onChange={() => toggleAnswer('landscaping')}
                />
                Landscaping
              </label>

              <label className="choice">
                <input
                  type="checkbox"
                  checked={answers.treesAndShrubs}
                  onChange={() => toggleAnswer('treesAndShrubs')}
                />
                Trees and Shrubs
              </label>
            </div>

            <div className="actions">
              <button className="button primary" onClick={handleSubmit}>
                Continue &rarr;
              </button>
            </div>
          </div>
        </section>
      </ScreenLayout>
    </RequireSession>
  )
}

export default Coverage
