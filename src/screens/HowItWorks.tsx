import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import { ROUTES } from '../routes'

export default function HowItWorks() {
  const navigate = useNavigate()
  return (
    <ScreenLayout title="Here&apos;s how this works." stepText="Step 2 of 5">
      <p>We&apos;re going to do two things:</p>
      <ol>
        <li>Check the big sections of your estimate (systems and major coverage sections).</li>
        <li>Check each room and compare to what existed before the loss.</li>
      </ol>
      <p>
        At the end, we&apos;ll generate a clear list of items to discuss with your adjuster. It helps to have your
        estimate open nearby while you answer.
      </p>
      <div className="actions">
        <button className="button primary" type="button" onClick={() => navigate(ROUTES.COVERAGE)}>
          Let&apos;s start →
        </button>
      </div>
    </ScreenLayout>
  )
}
