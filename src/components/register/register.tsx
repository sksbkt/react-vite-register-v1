import styles from "../register/register.module.scss"
import React, { Component, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { render } from "react-dom";
import RegisterInput from "../registerInput";
import axios from "../../api/axios";
import { AxiosError } from "axios";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/register';


function Register() {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        console.log(validName);

    }, [validName]);


    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //! to avoid JS hack
        const userInput = USER_REGEX.test(user)
        const pwdInput = PWD_REGEX.test(pwd)
        if (!userInput || !pwdInput) {
            setErrMsg('invalid entry')
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({
                //? if the api/end point would have accepted values with different names
                //? user: username
                //? pwd: password
                user,
                pwd
            }),
                {
                    headers: { 'Content-type': 'application/json', },
                    withCredentials: true
                }
            );
            console.log(response.data);
            // console.log(response.data.accessToken);
            console.log(JSON.stringify(response));

            setSuccess(true);
            setUser('');
            setPwd('');
        } catch (err: any) {
            if (!err) {
                setErrMsg('No server response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username is taken');
            } else {
                setErrMsg('registration failed');
            }
            console.log(err.message);

            errRef.current?.focus();
        }
    }

    return (
        <div className={styles.registerRoot}>

            <section className={styles.registerSection} >
                {errMsg ? <div className={styles.errMsgContainer}>
                    <p
                        ref={errRef}
                        // className={errMsg ? styles.errmsg : styles.offscreen}
                        className={styles.errMsg}
                        aria-live="assertive"
                    >{errMsg}</p>
                </div> : <></>}
                {success ? (<section>
                    <h1>success</h1>
                </section>) : (<>
                    <h1>Register</h1>
                    <form className={styles.registerForm} noValidate onSubmit={handleSubmit}>
                        <RegisterInput
                            onChange={
                                (value, valid) => {
                                    setValidName(valid);
                                    setUser(value);

                                }
                            }
                            label="Username"
                            primaryFocus={true}
                            regex={USER_REGEX}
                            type="username"
                            ariaNote="uidnote"
                            hint={
                                (<>
                                    <p
                                        id="uidnote"
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        &nbsp;3 to 23 characters.<br />
                                        Must begin with a letter.<br />
                                        Letters, numbers, underscores, hyphens allowed.
                                    </p>
                                </>)
                            }
                        />
                        <RegisterInput
                            label="Password"
                            primaryFocus={true}
                            regex={PWD_REGEX}
                            type="password"
                            ariaNote="pwdnote"
                            onChange={(value) => { setPwd(value); }
                            }
                            hint={
                                (<>
                                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        &nbsp;8 to 24 characters.<br />
                                        Must include uppercase and lowercase letters, a number and a special character.<br />
                                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                    </p>
                                </>)
                            }
                        />
                        <RegisterInput
                            label="Match password"
                            primaryFocus={true}
                            regex={PWD_REGEX}
                            type="matchPassword"
                            ariaNote="confirmnote"
                            match={pwd}
                            onChange={(value, valid) => {
                                setMatchPwd(value);
                                setValidMatch(valid);
                            }}

                            hint={
                                (<>
                                    <p id="confirmnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        &nbsp;Must match the password
                                    </p>
                                </>)
                            }
                        />
                        <button
                            disabled={!(validName && validMatch && matchPwd != '')}
                            className={styles.registerBtn}
                        >Sign up</button>
                    </form>
                    <p className={styles.signInSection}>
                        Already registered? <br />
                    </p> </>)}
                <a href="#">Sign in</a>
            </section >
        </div>
    )
}

export default Register;
