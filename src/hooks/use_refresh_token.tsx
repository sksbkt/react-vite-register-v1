import axios from "../api/axios";
import UseAuth from "./use_auth";

export function useRefreshToken() {

    const { setAuth } = UseAuth();

    async function refresh() {
        const response = await axios.get('/refresh', {
            withCredentials: true,
        });
        setAuth((prev: any) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
}

