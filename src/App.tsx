import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from './routes'
import { AppProvider } from './context/AppContext'
import RequireSession from './components/RequireSession'
import Landing from './screens/Landing'
import Upload from './screens/Upload'
import Setup from './screens/Setup'
import Resume from './screens/Resume'
import HowItWorks from './screens/HowItWorks'
import Coverage from './screens/Coverage'
import OpCheck from './screens/OpCheck'
import Systems from './screens/Systems'
import RoomSelection from './screens/RoomSelection'
import RoomChecklist from './screens/RoomChecklist'
import SiteAccess from './screens/SiteAccess'
import GlobalIssues from './screens/GlobalIssues'
import Summary from './screens/Summary'
import Settings from './screens/Settings'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LANDING} element={<Landing />} />
          <Route path={ROUTES.UPLOAD} element={<Upload />} />
          <Route path={ROUTES.SETUP} element={<Setup />} />
          <Route path={ROUTES.RESUME} element={<Resume />} />
          <Route
            path={ROUTES.HOW_IT_WORKS}
            element={
              <RequireSession>
                <HowItWorks />
              </RequireSession>
            }
          />
          <Route
            path={ROUTES.COVERAGE}
            element={
              <RequireSession>
                <Coverage />
              </RequireSession>
            }
          />
          <Route
            path={ROUTES.OP_CHECK}
            element={
              <RequireSession>
                <OpCheck />
              </RequireSession>
            }
          />
          <Route
            path={ROUTES.SYSTEMS}
            element={
              <RequireSession>
                <Systems />
              </RequireSession>
            }
          />
          <Route
            path={ROUTES.ROOM_SELECTION}
            element={
              <RequireSession>
                <RoomSelection />
              </RequireSession>
            }
          />
          <Route
            path={ROUTES.ROOM_CHECKLIST}
            element={
              <RequireSession>
                <RoomChecklist />
              </RequireSession>
            }
          />
          <Route
            path={ROUTES.SITE_ACCESS}
            element={
              <RequireSession>
                <SiteAccess />
              </RequireSession>
            }
          />
          <Route
            path={ROUTES.GLOBAL_ISSUES}
            element={
              <RequireSession>
                <GlobalIssues />
              </RequireSession>
            }
          />
          <Route
            path={ROUTES.SUMMARY}
            element={
              <RequireSession>
                <Summary />
              </RequireSession>
            }
          />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
          <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
