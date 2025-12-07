import api from "./api";

export type RegistrationDataTypes = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
}

export const registerUser = async(data: RegistrationDataTypes) => {
    const res = await api.post("/auth/register", data);
    return res.data;
}

export const loginUser = async(data:{email:string, password:string}) =>{
    const res = await api.post("/auth/login",data);
    return res.data;
}

export const refreshTokens = async(refreshToken:string) => {
    const res = await api.post("/auth/refresh",{token: refreshToken});
    return res.data;
}