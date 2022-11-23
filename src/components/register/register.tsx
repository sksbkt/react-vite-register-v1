import styles from "../register/register.module.scss"
import React, { useEffect, useRef, useState } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    return (
        <section >
            <div className={styles.errMsgContainer}>

                <p
                    ref={errRef}
                    // className={errMsg ? styles.errmsg : styles.offscreen}
                    className={styles.errMsg}
                    aria-live="assertive"
                >{errMsg}error message</p>
            </div>
            <h1>Register</h1>
            <form>
                <div className={styles.inputDiv}>
                    <p>
                        Username:
                    </p>
                    <div className={styles.verifyIcons}>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <FontAwesomeIcon icon={faCheck} className={`${validName ? styles.valid : styles.hide} ${styles.faIcon}`} />
                        <FontAwesomeIcon icon={faTimes} className={`${validName || !user ? styles.hide : styles.invalid} ${styles.faIcon}`} />
                    </div>
                    <div className={styles.dotView}>

                        <div
                            className={userFocus && user && !validName ? styles.instructions : styles.offscreen}
                        >

                            <p
                                id="uidnote"
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </div>
                    </div>


                </div>
            </form>
        </section >)
}

export default Register;
