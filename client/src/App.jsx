import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { VerifyToken } from "./api";
import { useEffect, Suspense, useState } from "react";
import { setAuth, setError } from './redux/features/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@clerk/clerk-react";
import { setUser } from "./redux/features/userSlice";
import InstallPrompt from "./components/insatallationprompt";
import { AnimatePresence } from "framer-motion";
import { AllRoutes } from './routes/allRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import { setMentor } from './redux/features/mentorSlice';


// Loading fallback component
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    <p className="mt-4 text-lg text-gray-600 font-medium">Loading...</p>
  </div>
);

const AppContent = () => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();

  const [routeChange, setRouteChange] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const handleRouteChange = () => {
    if (window.location.pathname !== currentPath) {
      setCurrentPath(window.location.pathname);
      setRouteChange(true);
      setTimeout(() => {
        setRouteChange(false);
      }, 1000); // Reset after 1 second
    }
  };

  // Listen for route changes
  useEffect(() => {
    window.addEventListener('popstate', handleRouteChange);

    // For programmatic navigation (using history.push)
    const originalPushState = window.history.pushState;
    window.history.pushState = function () {
      originalPushState.apply(this, arguments);
      handleRouteChange();
    };

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.history.pushState = originalPushState;
    };
  }, [currentPath]);



  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await VerifyToken({ token: await getToken() });
        const userData = response.data.data;
        dispatch(setAuth({
          role: userData.role, data: {
            _id: userData._id,
            email: userData.email,
            name: userData.name,
            isverified: userData.isverified,
          }
        }));
        dispatch(userData.role === 'user' ? setUser(userData) : setMentor(userData));
      } catch (error) {
        console.error('Error verifying token:', error.data);
        dispatch(setMentor({ mentor: null }));
        dispatch(setAuth({ role: null, data: null }));
        dispatch(setUser({ user: null, isverified: false, savedItems: [] }));
        dispatch(setError('Token verification failed'));
      }
    };
    verifyToken();
  }, [routeChange]);

  // Scroll to top on route change
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };
    // Add event listeners for route changes
    window.addEventListener('popstate', handleRouteChange);
    // Clean up event listener
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <div>
      <Suspense fallback={<LoadingFallback />}>
        <AnimatePresence mode="wait" initial={false}>
          <AllRoutes />

        </AnimatePresence>
      </Suspense>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingFallback />} persistor={persistor}>
        <ToastContainer position="top-right" autoClose={2000} />
        <Router>
          <AppContent />
          <InstallPrompt />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
