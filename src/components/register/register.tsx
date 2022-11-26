import styles from "../register/register.module.scss"
import React, { useEffect, useRef, useState } from "react";
import RegisterInput from "./registerInput/registerInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";


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
            <form className={styles.registerForm}>
                <RegisterInput
                    onChange={
                        (value) => {

                            setUser(value)
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
                    onChange={(value) => {
                        setMatchPwd(value)
                        console.log(value);
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
            </form>
        </section >)
}

export default Register;
