import { Link } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'

function Landing() {
  return (
    <ScreenLayout>
      <section className="screen-intro landing-hero" aria-labelledby="landing-title">
        <header className="screen-header">
          <h1 id="landing-title">
            You deserve a fair settlement.<br />
            Let&apos;s make sure you got one.
          </h1>
        </header>

        <div className="screen-body">
          <p>
            After a major loss, your insurance company sends an estimate for
            repairing or rebuilding your home. These estimates can run dozens
            — or even hundreds — of pages, and they&apos;re full of construction
            trade language that&apos;s hard to read even for experts.
          </p>
          <p>
            This tool walks you through your estimate section by section and
            helps you spot things that might be missing, undercounted, or
            worth asking about.
          </p>
          <p>
            You don&apos;t need to know anything about construction.
            We&apos;ll guide you through it, one simple question at a time.
          </p>

          <div className="actions landing-cta">
            <Link className="button primary" to="/upload">
              Get started →
            </Link>
          </div>

          <p className="fine-print">
            Your answers stay on your device. We don&apos;t share them with
            your insurer or anyone else.
          </p>
        </div>
      </section>
    </ScreenLayout>
  )
}

export default Landing
