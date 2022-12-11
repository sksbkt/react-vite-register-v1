import { Link } from "react-router-dom"
import PageTemplate from "../elements/page_template"

const Admin = () => {
    return (
        <PageTemplate children={

            <section>
                <h1>Admins Page</h1>
                <p>You must have been assigned an Admin role.</p>
                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section>
        } />
    )
}

export default Admin