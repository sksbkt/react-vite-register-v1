import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UseAuth from "../../hooks/use_auth";
import { useRefreshToken } from "../../hooks/use_refresh_token";

function PersistLogin() {

    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = UseAuth();
    useEffect(() => {
        let isMounted = true;
        async function verifyRefreshToken() {
            try {
                await refresh();
            } catch (err) {
                console.log(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        return () => { isMounted = false };
    }, []);
    useEffect(() => {
        console.log(`isLoading ${isLoading}`);
        console.log(`aT ${JSON.stringify(auth?.accessToken)}`);

    }, [isLoading]);

    return (<>
        {!persist
            ? <Outlet />
            : isLoading
                ? <p>Loading...</p>
                : <Outlet />}
    </>);
}

export default PersistLogin;
