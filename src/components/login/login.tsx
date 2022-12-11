import styles from "./login.module.scss";
import globalStyles from '../../styles/global.module.scss'
import React, { FormEvent, useContext } from "react";

import { useRef, useState, useEffect, } from "react";
import CustomInput from "../elements/customInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/auth_provider";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import PageTemplate from "../elements/page_template";

const LOGIN_URL = '/auth';

function Login() {

    const { auth, setAuth } = useContext(AuthContext);


    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current?.focus();
    }, []);
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ user, pwd }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            console.log(JSON.stringify(response?.data));
            console.log(response);

            const accessToken = response?.data.accessToken;
            const roles = response?.data?.roles;

            setAuth({ user, pwd, roles, accessToken });


            setUser('');
            setPwd('');
            setSuccess(true);
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
    console.log('AUTH: ', auth);

    return (
        <PageTemplate children={

            <>

                {success ? (<section>
                    <h1>success</h1>
                </section>) : (

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
                )}
            </>
        } />

    );
}

export default Login;
