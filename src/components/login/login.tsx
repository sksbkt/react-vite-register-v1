import styles from "./login.module.scss";

import React from "react";

import { useRef, useState, useEffect, } from "react";
import CustomInput from "../customInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
function Login() {
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


    return (
        <div className={styles.loginRoot}>
            <section className={styles.loginSection}>
                <p
                    aria-live="assertive"
                    ref={errRef}
                    className={errMsg ? styles.errmsg : styles.offscreen}
                >
                    {errMsg}
                </p>
                <h1>Sign in</h1>
                <form >
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
                        onChange={(value, valid) => { setUser(value) }}
                    />
                    <CustomInput
                        label="Password"
                        type="password"

                        onChange={(value, valid) => { setPwd(value) }}
                    />
                </form>
            </section>
        </div>
    );
}

export default Login;
