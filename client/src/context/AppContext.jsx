import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();


const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [credit, setCredit] = useState(5);
  const navigate = useNavigate()
  const loadCreditsData = async () => {

    try {

      const { data } = await axios.get(backendUrl + '/api/user/credits', {
        headers: { token }
      })

      if (data.success) {
        console.log(data.user)
        setCredit(data.credits);
        setUser(data.user)
      }
    } catch (error) {

      console.log(error)
      toast.error(`Something went wrong:${error.message}`);
    }
  }

  const generateImage = async (prompt) => {

    try {
      const { data } = await axios.post(backendUrl + '/api/image/generate-image', {
        prompt
      }, { headers: { token: token } }
      )

      if (data.success) {
        loadCreditsData()
        return data.image
      }
      else {
        console.log(data)
        toast.error(data.message)
        loadCreditsData()
        if (data.creditBalance === 0) {
          navigate('/buy')
        }
      }

    } catch (error) {
      toast.error(`Something went wrong:${error.message}`);
      console.log(error);
    }

  }
  useEffect(() => {
    if (token) {
      loadCreditsData()
    }

  }, [token])

  const logout = () => {
    localStorage.removeItem("token");
    setToken('');
    setUser(null)
  }

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    credit,
    setCredit,
    token,
    setToken,
    loadCreditsData,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
