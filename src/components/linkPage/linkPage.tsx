import { Link } from "react-router-dom"
import PageTemplate from "../elements/page_template";

function LinkPage() {
    return (
        <PageTemplate children={
            <section>
                <h1>Links</h1>

                <h2>Public</h2>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>

                <h2>Private</h2>
                <Link to="/">Home</Link>
                <Link to="/editor">Editors Page</Link>
                <Link to="/admin">Admin Page</Link>
            </section>} />
    );
}

export default LinkPage;