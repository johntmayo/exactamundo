import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'

function HowItWorks() {
  const navigate = useNavigate()

  return (
    <ScreenLayout>
      <section className="screen-intro" aria-labelledby="how-it-works-title">
        <header className="screen-header">
          <h1 id="how-it-works-title">Here&apos;s how this works.</h1>
        </header>

        <div className="screen-body">
          <p>We&apos;re going to do two things:</p>

          <div className="panel">
            <p>
              <strong>1. Check the big sections of your estimate.</strong>
              <br />
              Insurance estimates for homes are usually organized by system
              &mdash; things like Electrical, Plumbing, Roofing, and so on.
              We&apos;ll ask whether each system appears in yours.
            </p>
            <p>
              <strong>2. Check each room.</strong>
              <br />
              Then we&apos;ll go room by room and ask a few questions about
              what your home was like before the damage. This helps you spot
              things the estimate might have missed or gotten wrong.
            </p>
            <p>
              At the end, we&apos;ll give you a clear list of questions to
              raise with your adjuster.
            </p>
          </div>

          <div className="tip">
            💡 It helps to have your estimate open nearby &mdash; on screen or
            printed &mdash; as you go through this. You don&apos;t need to read
            every line; we&apos;ll tell you what to look for.
          </div>

          <div className="actions">
            <button
              className="button primary"
              onClick={() => navigate('/coverage')}
            >
              Let&apos;s start &rarr;
            </button>
          </div>
        </div>
      </section>
    </ScreenLayout>
  )
}

export default HowItWorks
