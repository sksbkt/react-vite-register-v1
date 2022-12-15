import styles from "./login.module.scss";
import globalStyles from '../../styles/global.module.scss'
import React from "react";

import { useRef, useState, useEffect, } from "react";
import CustomInput from "../elements/customInput";
import axios from "../../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageTemplate from "../elements/page_template";
import UseAuth from "../../hooks/use_auth";

const LOGIN_URL = '/auth';

function Login() {

    const { setAuth } = UseAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current?.focus();
    }, []);
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // "Access-Control-Allow-Methods": ["OPTIONS", "GET", "POST", "PUT", "DELETE"]
                    },
                    withCredentials: true
                }
            );
            // console.log(JSON.stringify(response?.data));

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (error: any) {
            if (!error?.response) {
                setErrMsg('No server response');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing username or pwd');
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login failed');
            }
            errRef.current?.focus();
        }
    }

    return (
        <PageTemplate children={
            <>
                <p
                    aria-live="assertive"
                    ref={errRef}
                    className={errMsg ? styles.errmsg : styles.offscreen}
                >
                    {errMsg}
                </p>
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                    {/* <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                    /> */}
                    <CustomInput
                        label="Username"
                        type="username"
                        primaryFocus={true}
                        onChange={(value, valid) => {
                            setUser(value)
                        }}
                    />
                    <CustomInput
                        label="Password"
                        type="password"

                        onChange={(value, valid) => { setPwd(value) }}
                    />
                    <button className={globalStyles.button}>Sign in</button>
                </form>
                <p className={styles.signInSection}>
                    Still not registered <br />
                    <Link to="/register">Sign up</Link>
                </p>
            </>


        } />

    );
}

export default Login;
