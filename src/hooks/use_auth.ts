import { useContext } from 'react';
import AuthContext from '../context/auth_provider';


function useAuth() {
    return useContext(AuthContext);
}

export default useAuth;