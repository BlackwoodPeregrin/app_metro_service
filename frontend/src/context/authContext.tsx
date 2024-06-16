import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LayoutRouteProps, Navigate, useNavigate } from 'react-router-dom';
import { refreshAuth } from '../services/FileBrowserService';


interface AuthContextType {
    isAuth: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    login: () => {},
    logout: () => {}
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

const checkAuth = () => {
    const access = localStorage.getItem('access') || '';
    const refresh = localStorage.getItem('refresh') || '';

    let ok = false;
    if (access && refresh) {
        const authData: AuthData = jwtDecode(refresh);
        const now = Date.now();
        const timeDiff = authData.exp - Math.floor(now / 1000);
        ok = timeDiff > 0;
        if (!ok) {
            refreshAuth(refresh);
        }
    }
    return ok;
}

export const AuthProvider: React.FC<Props> = (props: Props) => {
    const [isAuth, setIsAuth] = useState(checkAuth());

    const login = () => setIsAuth(true);
    const logout = () => setIsAuth(false);

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

interface PrivateRouteProps extends LayoutRouteProps {
    component: React.ComponentType<any>;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...props }) => {
    const { isAuth } = useAuth();
    return isAuth ? <Component {...props} /> : <Navigate to={{ pathname: '/login'}}/>
};

export const useAuth = () => useContext(AuthContext);
