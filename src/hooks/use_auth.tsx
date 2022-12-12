import { useContext } from 'react';
import AuthContext from '../context/auth_provider';


function UseAuth() {
    return useContext(AuthContext);
}

export default UseAuth;