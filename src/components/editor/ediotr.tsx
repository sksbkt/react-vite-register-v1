import { Link } from "react-router-dom"
import PageTemplate from "../elements/page_template"

const Editor = () => {
    return (
        <PageTemplate children={

            <section>
                <h1>Editors Page</h1>

                <p>You must have been assigned an Editor role.</p>
                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section>
        } />
    )
}

export default Editor