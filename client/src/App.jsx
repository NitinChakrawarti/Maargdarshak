import { AllRoutes } from "./routes/route";
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { VerifyToken } from "./api";
import { setUser } from "./redux/features/userSlice";
import { setMentor } from './redux/features/mentorSlice';
import { useEffect } from "react";


const App = () => {
  const dispatch = useDispatch();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };
  
  const cookies = getCookie('userToken');
  console.log("cookies", cookies); 
  
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await VerifyToken();
        dispatch(setUser(response.data.data));
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    }
    verifyToken();
  }, [dispatch]);


  // useEffect(() => {
  //   const verifyToken = async () => {
  //     try {
  //       const response = await VerifyToken();
  //       dispatch(setMentor(response.data.data));
  //       if (response.data.data?.status === "inactive") {
  //         setOpenDialog(true);
  //       }
  //     } catch (error) {
  //       console.error('Error verifying token:', error);
  //     }
  //   }
  //   verifyToken();
  // }, [dispatch]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AllRoutes />
      </PersistGate>
    </Provider>
  );
};

export default App;
