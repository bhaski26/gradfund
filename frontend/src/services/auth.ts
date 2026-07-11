import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export async function login(
    credentials: LoginRequest,
): Promise<LoginResponse> {

    const response = await API.post(
        "/auth/login",
        credentials,
    );

    return response.data;
}