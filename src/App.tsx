import React, { useEffect, useRef } from 'react';
import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
import Header from './containers/Header';
import LandingSection from './containers/LandingSection';
import CoordinatesProcessor from './containers/CoordinatesProcessor';
import './index.css';
import { ROUTES } from './routes/constants';
import PreviewProcessResult from './containers/PreviewProcessResult';
import Records from './containers/Records';

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      if ('onbeforeunload' in window) {
        navigate(ROUTES.DEFAULT);
      }
    }

    return () => {
      isMounted.current = false;
    };
  }, [navigate]);

  return (
    <>
      <Header
        showCreateButton={location.pathname === ROUTES.DEFAULT}
        showExitButton={location.pathname === ROUTES.PROCESSOR}
      />
      <Routes>
        <Route
          path={ROUTES.DEFAULT}
          element={<Records />}
        />
        <Route
          path={ROUTES.CREATE}
          element={<LandingSection />}
        />
        <Route
          path={ROUTES.PROCESSOR}
          element={<CoordinatesProcessor />}
        />
        <Route
          path={ROUTES.PREVIEW}
          element={<PreviewProcessResult />}
        />
      </Routes>
    </>
  );
};

export default App;
