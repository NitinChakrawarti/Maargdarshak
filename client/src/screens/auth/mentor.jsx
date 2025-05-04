import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import MentorPage from "../../screens/mentor/mentorhome";
import { LogOutFunc } from "../../api";
import { setAuth } from "../../redux/features/authSlice";

const Mentor = () => {
  const [openDialog, setOpenDialog] = useState(true);
  const [mentor, setMentor] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);

  useEffect(() => {
    setMentor(data);
  }, [data]);

  const { role } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    const logout = await LogOutFunc({ role: role });
    if (logout.status === 200) {
      dispatch(setAuth({ role: null, data: null }));
      return navigate("/");
    }
    else {
      console.error("Logout failed:", logout.message);
    }
  };

  if (!mentor) return null; // Optional: or a loading screen

  return (
    <>
      {mentor.status === "inactive" ? (
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard</h1>
              <div className="mt-4">
                <p className="text-lg text-gray-700">Welcome, {mentor.name}</p>
              </div>
            </div>
          </div>

          {openDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-md w-full">
                <div className="bg-primary text-white px-6 py-4 rounded-t-lg">
                  <h3 className="text-xl font-semibold">Account Status</h3>
                </div>
                <div className="p-6">
                  <div className="text-center">
                    <h4 className="text-xl font-medium mb-2">{mentor.name}</h4>
                    <p className="text-lg text-gray-700 mb-4">
                      Your mentor account request is currently pending verification.
                      We will notify you once your account has been verified.
                    </p>
                    <button
                      onClick={handleLogout}
                      className="mt-4 px-4 py-2 bg-red-600 cursor-pointer text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <MentorPage />
      )}
    </>
  );
};

export default Mentor;
