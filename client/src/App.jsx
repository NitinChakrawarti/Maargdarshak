import { AllRoutes } from "./routes/route";
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { VerifyToken } from "./api";
import { useEffect } from "react";
import { setAuth, setError } from './redux/features/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await VerifyToken();
        const userData = response.data.data;
        dispatch(setAuth({ role: userData.role, data: userData }));
      } catch (error) {
        console.error('Error verifying token:', error);
        dispatch(setAuth({ role: null, data: null }));
        dispatch(setError('Token verification failed'));
      }
    };
    verifyToken();
  }, [dispatch]);

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer position="top-right" autoClose={2000} />
        <AllRoutes />
      </PersistGate>
    </Provider>
  );
};

export default App;
