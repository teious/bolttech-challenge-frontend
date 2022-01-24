import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from 'axios'



const API = axios.create({
    baseURL: `http://localhost:8000`
});

export interface AuthPayload {
    username: string;
    password: string;
}

interface User {
    _id: string;
    username: string;
}

interface AuthContextType {
    user: User;
    signin: (payload: AuthPayload) => Promise<void>;
    signout: () => void;
    signup: (payload: AuthPayload) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<any>(null);

    const navigate = useNavigate()
    useEffect(() => {
        async function loadStorageData() {
            try {
                const storedToken = sessionStorage.getItem('access_token');
                if (storedToken) {
                    const res = await API.get('/auth/me', {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    })
                    if (res.status === 200) {
                        setUser(res.data);
                    } else {
                        setUser(null);
                        sessionStorage.removeItem('access_token')
                        navigate('/login', { replace: true });
                    }
                }
            } catch (error) {
                console.error(error);
                setUser(null);
                sessionStorage.removeItem('access_token')
                navigate('/login', { replace: true });
            }

        }

        loadStorageData();
    }, []);

    const signin = async (payload: AuthPayload) => {
        const res = await API.post<AuthPayload, AxiosResponse<{ access_token: string }>>('/auth/signin', payload);
        const { access_token } = res.data
        sessionStorage.setItem('access_token', access_token);
        const userRes = await API.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        setUser(userRes.data);
    };

    const signout = () => {
        sessionStorage.removeItem('access_token')
        setUser(null);
    };
    const signup = async (payload: AuthPayload) => {
        try {
            const signupRes = await API.post('/auth/signup', payload);
            if (signupRes.status == 201) {
                await signin(payload)
            }
        } catch (error) {

        }
    }
        ;

    const value = { user, signin, signout, signup };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
    const { user } = useAuth();

    if (!sessionStorage.getItem('access_token') && !user) {

        return <Navigate to="/login" replace />;
    }


    return children;
}