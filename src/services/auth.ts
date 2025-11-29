import api from "./api";

type RegistrationDataTypes = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export const registerUser = async(data: RegistrationDataTypes) => {
    const res = await api.post("/auth/register", data);
    return res.data;
}