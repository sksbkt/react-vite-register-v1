
import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import UseAuth from "./use_auth";
import { useRefreshToken } from "./use_refresh_token";

function useAxiosPrivate() {
    const refresh = useRefreshToken();
    const { auth } = UseAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                console.log('REQ INTER');
                if (!config.headers!['Authorization']) {
                    config.headers!['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const newAccessToken = await refresh();
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        )
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);


    return axiosPrivate;
}

export default useAxiosPrivate;
