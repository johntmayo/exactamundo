import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useEstimateSessionStore } from './store/estimateSessionStore'
import Coverage from './screens/Coverage'
import GlobalIssues from './screens/GlobalIssues'
import HowItWorks from './screens/HowItWorks'
import Landing from './screens/Landing'
import OpCheck from './screens/OpCheck'
import RoomChecklist from './screens/RoomChecklist'
import RoomSelection from './screens/RoomSelection'
import Resume from './screens/Resume'
import Settings from './screens/Settings'
import Setup from './screens/Setup'
import SiteAccess from './screens/SiteAccess'
import Summary from './screens/Summary'
import Systems from './screens/Systems'
import Upload from './screens/Upload'

function App() {
  useEffect(() => {
    useEstimateSessionStore.getState().hydrateSession()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/coverage" element={<Coverage />} />
        <Route path="/op-check" element={<OpCheck />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/rooms" element={<RoomSelection />} />
        <Route path="/rooms/:areaId" element={<RoomChecklist />} />
        <Route path="/site-access" element={<SiteAccess />} />
        <Route path="/global-issues" element={<GlobalIssues />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
