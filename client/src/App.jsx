import { AllRoutes } from "./routes/route";
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { VerifyToken } from "./api";
import { useEffect } from "react";
import { setAuth, setError } from './redux/features/authSlice';

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
        dispatch(setError('Token verification failed'));
      }
    };
    verifyToken();
  }, [dispatch]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AllRoutes />
      </PersistGate>
    </Provider>
  );
};

export default App;
