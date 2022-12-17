import axios from "../api/axios";
import UseAuth from "./use_auth";

function useLogout() {
    const { setAuth } = UseAuth();

    async function logOut() {
        setAuth({});
        try {
            const response = await axios('/logout', { withCredentials: true });
        } catch (err) {
            console.log(err);
        }
    }
    return logOut;
}

export default useLogout;