import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'

const STEPS = [
  {
    title: 'Coverage sections',
    description:
      "We'll check which types of coverage are included in your estimate — things like your home structure, code upgrades, and outbuildings.",
  },
  {
    title: 'Overhead & profit',
    description:
      'We\'ll look for a line item called overhead and profit. When a general contractor coordinates repairs, insurers are typically required to include it.',
  },
  {
    title: 'Building systems',
    description:
      "We'll go through a list of common construction categories and flag anything that appears to be missing from your estimate.",
  },
  {
    title: 'Room by room',
    description:
      "For each room in your home, we'll ask simple questions about what was there — so you can compare it to what your estimate covers.",
  },
  {
    title: 'Site conditions',
    description:
      "We'll ask about things like lot slope or difficult access that can affect construction costs, and check whether your estimate accounts for them.",
  },
  {
    title: 'Final questions',
    description:
      'A few last questions about code upgrades, permits, and anything else that seems missing or wrong.',
  },
]

function HowItWorks() {
  const navigate = useNavigate()

  return (
    <ScreenLayout>
      <section className="screen-intro" aria-labelledby="how-it-works-title">
        <header className="screen-header">
          <h1 id="how-it-works-title">Here&apos;s how this works.</h1>
        </header>

        <div className="screen-body">
          <p>
            We&apos;ll walk through your estimate in six short sections. Each
            one focuses on a different part of what your insurance company
            should cover.
          </p>
          <p>
            You don&apos;t need to be a contractor. Just answer what you
            know &mdash; it&apos;s fine to say &ldquo;not sure&rdquo; along
            the way.
          </p>

          <ol className="panel how-it-works-steps">
            {STEPS.map((step, i) => (
              <li key={i} className="how-it-works-step">
                <span className="how-it-works-step-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="tip">
            If you have your estimate open nearby, it will help. You can
            refer back to it as we go through each section.
          </div>

          <div className="actions">
            <button
              className="button primary"
              onClick={() => navigate('/coverage')}
            >
              Let&apos;s go &rarr;
            </button>
          </div>
        </div>
      </section>
    </ScreenLayout>
  )
}

export default HowItWorks
