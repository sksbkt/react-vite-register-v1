import { Link } from "react-router-dom"
import PageTemplate from "../elements/page_template"

const Lounge = () => {
    return (
        <PageTemplate children={
            <section>
                <h1>The Lounge</h1>
                <br />
                <p>Admins and Editors can hang out here.</p>
                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section>
        } />
    )
}

export default Lounge