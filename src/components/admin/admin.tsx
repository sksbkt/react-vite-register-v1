import { Link } from "react-router-dom"
import PageTemplate from "../elements/page_template"
import Users from "../users"

const Admin = () => {
    return (
        <PageTemplate children={
            <section>
                <h1>Admins Page</h1>
                <Users />
                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section>
        } />
    )
}

export default Admin