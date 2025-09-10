import React, {createContext, useContext, useReducer, type ReactNode, useEffect} from "react";
import axios, {type AxiosInstance, type AxiosResponse, AxiosError} from "axios";
import type {
    User,
    LoginCredentials,
    SignUpCredentials,
    AuthContextType,
    AuthResponse,
} from "../types/auth";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

type AuthAction =
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_ERROR"; payload: string | null }
    | { type: "LOGIN_SUCCESS"; payload: User }
    | { type: "LOGOUT" }
    | { type: "UPDATE_USER"; payload: Partial<User> }
    | { type: "CLEAR_ERROR" };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "SET_LOADING":
            return {...state, isLoading: action.payload};
        case "SET_ERROR":
            return {...state, error: action.payload, isLoading: false};
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            };
        case "UPDATE_USER":
            return {
                ...state,
                user: state.user ? {...state.user, ...action.payload} : null,
                isLoading: false,
                error: null,
            };
        case "CLEAR_ERROR":
            return {...state, error: null};
        default:
            return state;
    }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

    const api: AxiosInstance = axios.create({
        baseURL: API_BASE_URL,
        withCredentials: true,
        timeout: 10000,
    });

    api.interceptors.request.use(
        (config) => {
            if (config.data && config.method !== 'get') {
                config.headers['Content-Type'] = 'application/json';
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: AxiosError) => {
            console.error("API Error:", error);
            if (error.code === 'ERR_NETWORK') {
                console.error("Network error - check if backend is running and CORS is configured");
            }
            if (error.response?.status === 401 && state.isAuthenticated) {
                dispatch({type: "LOGOUT"});
            }
            return Promise.reject(error);
        }
    );

    const checkAuth = async (): Promise<void> => {
        try {
            dispatch({type: "SET_LOADING", payload: true});
            const response: AxiosResponse<AuthResponse> = await api.get("/users/profile");
            if (response.data && response.data.user) {
                dispatch({type: "LOGIN_SUCCESS", payload: response.data.user});
            } else {
                dispatch({type: "LOGOUT"});
            }
        } catch (error) {
            console.error("Authentication check failed:", error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    dispatch({type: "LOGOUT"});
                } else if (error.code !== 'ERR_NETWORK') {
                    dispatch({type: "LOGOUT"});
                }
            } else {
                dispatch({type: "LOGOUT"});
            }
        } finally {
            dispatch({type: "SET_LOADING", payload: false});
        }
    };

    const login = async (credentials: LoginCredentials): Promise<void> => {
        try {
            dispatch({type: "SET_LOADING", payload: true});
            dispatch({type: "CLEAR_ERROR"});

            console.log("Attempting login with:", {username: credentials.username});

            const response: AxiosResponse<AuthResponse> = await api.post("/auth/login", credentials);

            console.log("Login response:", response.data);

            if (response.data && response.data.user) {
                dispatch({type: "LOGIN_SUCCESS", payload: response.data.user});
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Login error:", error);

            let errorMessage = "Login Failed";

            if (axios.isAxiosError(error)) {
                if (error.code === 'ERR_NETWORK') {
                    errorMessage = "Network error. Please check if the server is running.";
                } else if (error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                } else if (error.response?.data) {
                    errorMessage = typeof error.response.data === 'string'
                        ? error.response.data
                        : "Server error occurred";
                } else if (error.message) {
                    errorMessage = error.message;
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            dispatch({
                type: "SET_ERROR",
                payload: errorMessage,
            });
            throw error;
        }
    };

    const register = async (credentials: SignUpCredentials): Promise<void> => {
        if (!credentials.email || !credentials.password || !credentials.username) {
            throw new Error("Invalid Credentials");
        }

        try {
            dispatch({type: "SET_LOADING", payload: true});
            dispatch({type: "CLEAR_ERROR"});

            const response: AxiosResponse<AuthResponse> = await api.post("/auth/signup", credentials);

            if (response.data && response.data.user) {
                dispatch({type: "LOGIN_SUCCESS", payload: response.data.user});
            }
        } catch (error) {
            let errorMessage = "Registration Failed";

            if (axios.isAxiosError(error)) {
                if (error.code === 'ERR_NETWORK') {
                    errorMessage = "Network error. Please check if the server is running.";
                } else if (error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                } else if (error.response?.data) {
                    errorMessage = typeof error.response.data === 'string'
                        ? error.response.data
                        : "Server error occurred";
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            dispatch({
                type: "SET_ERROR",
                payload: errorMessage,
            });
            throw error;
        }
    };

    const logout = async (): Promise<void> => {
        try {
            dispatch({type: "SET_LOADING", payload: true});
            dispatch({type: "CLEAR_ERROR"});

            console.log("Attempting to logout");

            const response = await api.post("/auth/logout");

            if (response.status === 200 || response.data?.message === "User already logged out!") {
                console.log("Logout successful");
                dispatch({type: "LOGOUT"});
            } else {
                throw new Error("Logout failed with unexpected response.");
            }
        } catch (error) {
            console.error("Logout error: ", error);
            let errorMessage = "Logout Failed";
            if (axios.isAxiosError(error)) {
                if (error.code === 'ERR_NETWORK') {
                    errorMessage = "Network error. Please check if the server is running.";
                } else if (error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            dispatch({
                type: "SET_ERROR",
                payload: errorMessage,
            });
            throw error;
        } finally {
            dispatch({type: "SET_LOADING", payload: false});
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    const contextValue: AuthContextType = {
        ...state,
        login,
        register,
        checkAuth,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
