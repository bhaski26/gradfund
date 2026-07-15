import api from "./api";

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

    const formData =
        new URLSearchParams();

    formData.append(
        "username",
        credentials.email,
    );

    formData.append(
        "password",
        credentials.password,
    );

    const response =
        await api.post(

            "/auth/login",

            formData,

            {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },
            }

        );

    return response.data;

}