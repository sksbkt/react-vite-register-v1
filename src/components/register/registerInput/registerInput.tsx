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
    match?: string,
    onChange?: (value: string) => void
}

function RegisterInput({ label, primaryFocus = false, regex, hint, type, match, onChange }: registerInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);


    const [value, setValue] = useState('');
    const [focus, setFocus] = useState(false);

    const [valid, setValid] = useState(false);

    useEffect(() => {
        switch (type) {
            case 'username':
                inputRef.current?.focus();
                setValid(regex.test(value));
                console.log(valid, value);
                break;
            case 'password':
                setValid(regex.test(value));
                setValid(value === match);
                break;
            default:
                break;
        }
    }, [value]);



    function inputValueChange(e: React.ChangeEvent<HTMLInputElement>, inValue: string) {
        e.preventDefault();
        if (onChange)
            onChange(inValue);
    }

    return (<section>
        <div className={styles.inputDiv}>

            <div className={styles.verifyIcons}>
                <input
                    title={label}
                    type="text"
                    id="username"
                    ref={inputRef}
                    autoComplete="off"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    required
                    aria-invalid={valid ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
                <FontAwesomeIcon icon={faCheck} className={`${valid ? styles.valid : styles.hide} ${styles.faIcon}`} />
                <FontAwesomeIcon icon={faTimes} className={`${valid || !value ? styles.hide : styles.invalid} ${styles.faIcon}`} />
            </div>
            <div className={styles.dotView}>

                <div
                    className={focus && value && !valid ? styles.instructions : styles.offscreen}
                >

                    {(<>
                        {hint}
                    </>)}
                </div>
            </div>


        </div>
    </section>)
}

export default RegisterInput;