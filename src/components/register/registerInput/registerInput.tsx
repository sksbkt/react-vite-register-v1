import styles from '../registerInput/registerInput.module.scss'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement, useEffect, useRef, useState } from "react";






interface registerInputProps {
    label: string
    primaryFocus?: boolean,
    regex: RegExp,
    hint: ReactElement,
    type: 'username' | 'password' | 'matchPassword',
    ariaNote: string,
    match?: string,
    onChange?: (value: string, valid: boolean) => void,
}

function RegisterInput({ label, primaryFocus = false, regex, hint, type, ariaNote, match, onChange }: registerInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);
    const [id, setId] = useState('');


    const [value, setValue] = useState('');
    const [focus, setFocus] = useState(false);

    const [valid, setValid] = useState<boolean>(false);
    useEffect(() => {
        switch (type) {
            case 'username':
                setValid(regex.test(value));
                break;
            case 'password':
                setValid(regex.test(value));
                // setValid(value === match);
                break;
            case 'matchPassword':
                setValid(value === match && value != '');
            default:
                break;
        }
        onChange ? onChange(value, valid) : () => { }
        return () => {

        }
    }, [value, match, valid]);
    useEffect(() => {
        setId(label.replace(' ', '_').toLocaleLowerCase())
    }, []);


    return (<section>
        <div className={styles.inputContainer}>

            <label htmlFor={id}>{label}</label>
            <div className={styles.inputDiv}>

                <div className={styles.verifyIcons}>
                    <input
                        title={label}
                        type="text"
                        id={id}
                        ref={inputRef}
                        autoComplete="off"
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        value={value}
                        required
                        aria-invalid={valid ? "false" : "true"}
                        aria-describedby={ariaNote}
                        onLoad={(e) => { if (primaryFocus) e.currentTarget.focus(); }}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                    />

                    {
                        valid ?
                            <FontAwesomeIcon icon={faCheck} className={styles.valid} /> :
                            value ?
                                <FontAwesomeIcon icon={faTimes} className={styles.invalid} /> : <></>
                    }
                </div>
                <div className={styles.dotView}>

                    <div
                        className={focus && !valid ? styles.instructions : styles.offscreen}
                    // className={styles.instructions}
                    >

                        {(<>
                            {hint}
                        </>)}
                    </div>
                </div>


            </div>
        </div>
    </section>)
}

export default RegisterInput;