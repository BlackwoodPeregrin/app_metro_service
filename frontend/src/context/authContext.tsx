import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LayoutRouteProps, Navigate } from 'react-router-dom';
import { refreshAuth } from '../services/FileBrowserService';


interface User {
    id: number;
    role: string;
}

interface AuthContextType {
    isAuth: boolean;
    user: User;
    login: () => void;
    logout: () => void;
    loading: boolean;
}

const emptyUser = {
    id: -1,
    role: "ci"
}

const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    user: emptyUser,
    login: () => {},
    logout: () => {},
    loading: true,
});

type Props = {
    children: ReactNode
}

interface AuthData {
    id: string;
    role: string;
    exp: number;
    iat: number;
}

const checkAuth = async () => {
    const access = localStorage.getItem('access') || '';
    const refresh = localStorage.getItem('refresh') || '';

    let ok = false;
    if (access && refresh) {
        const authData: AuthData = jwtDecode(refresh);
        const now = Date.now();
        const timeDiff = authData.exp - Math.floor(now / 1000);
        ok = timeDiff > 0;
        if (!ok) {
            ok = await refreshAuth(refresh);
        }
    }
    return ok;
}

const changeUser = (user: User, newUser: User) => (user.id = newUser.id, user.role = newUser.role)

export const AuthProvider: React.FC<Props> = (props: Props) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    let user = {id: -1, role: 'ci'};

    useEffect(() => {
        const start = async () => {
            const ok = await checkAuth();
            if (ok) {
                setIsAuth(true);
                const access = localStorage.getItem('access') || '';
                const {id: idStr, role}: AuthData = jwtDecode(access);
                changeUser(user, {id: Number(idStr), role})
            }
            setIsLoading(false);
        }
        start();
    }, []);

    const login = () => {
        const access = localStorage.getItem('access') || '';
        const {id: idStr, role}: AuthData = jwtDecode(access);
        const newUser = {id: Number(idStr), role}
        changeUser(user, newUser)
        setIsAuth(true);
    }
    const logout = () => {
        setIsAuth(false);
        changeUser(user, emptyUser)
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    }

    return (
        <AuthContext.Provider value={{ isAuth, user, login, logout, loading: isLoading }}>
            {props.children}
        </AuthContext.Provider>
    );
};

interface PrivateRouteProps extends LayoutRouteProps {
    component: React.ComponentType<any>;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...props }) => {
    const { isAuth, loading } = useAuth();
    return loading ? <div>loading...</div> : isAuth ? <Component {...props} /> : <Navigate to={{ pathname: '/login'}}/>
};

export const useAuth = () => useContext(AuthContext);
