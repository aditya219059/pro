import { useState, useEffect, useContext, createContext } from 'react'

const Authcontext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });
    useEffect(() => {
      const data = localStorage.getItem("auth");
      if (data) {
        const parseData = JSON.parse(data);
        setAuth({
            ...auth,
            user: parseData.user,
            token: parseData.token
        })
      }
      // eslint-disable-next-line
    }, [])
    
    return (
        <Authcontext.Provider value={[auth, setAuth]}>
            {children}
        </Authcontext.Provider>
    )
}

const useAuth = () => useContext(Authcontext);

export { useAuth, AuthProvider };