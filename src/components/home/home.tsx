import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/auth_provider";
import styles from "../../styles/global.module.scss"
import PageTemplate from "../elements/page_template";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
    }

    return (
        <PageTemplate children={
            <section>
                <h1>Home</h1>
                <p>You are logged in!</p>
                <Link to="/editor">Go to the Editor page</Link>
                <Link to="/admin">Go to the Admin page</Link>
                <Link to="/lounge">Go to the Lounge</Link>
                <Link to="/linkpage">Go to the link page</Link>
                <div className="flexGrow">
                    <button className={styles.button} onClick={logout}>Sign Out</button>
                </div>
            </section>
        } />
    )
}

export default Home