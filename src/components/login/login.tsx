import styles from "./login.module.scss";
import { useRef, useState, useEffect, } from "react";
import axios from "../../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageTemplate from "../elements/page_template";

import useAuth from "../../hooks/use_auth";
import useInput from "../../hooks/use_input";
import useToggle from "../../hooks/use_toggle";

const LOGIN_URL = '/auth';

function Login() {


    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef<any>();
    const errRef = useRef<any>();

    const [user, resetUser, userAttribs] = useInput('user', '')
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);

    useEffect(() => {
        if (userRef.current)
            userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    async function handleSubmit(e: any) {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            setAuth({ user, accessToken });
            resetUser();
            setPwd('');
            navigate(from, { replace: true });
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <PageTemplate children={

            <section className={styles.authSection}>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit} className={styles.loginSection}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        {...userAttribs}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button>Sign In</button>
                    <div className={styles.persistCheck}>
                        <input
                            type="checkbox"
                            id="persist"
                            onChange={toggleCheck}
                            checked={check}
                        />
                        <label htmlFor="persist">Trust This Device</label>
                    </div>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        <Link to="/register">Sign Up</Link>
                    </span>
                </p>
            </section>
        } />

    )
}

export default Login;
