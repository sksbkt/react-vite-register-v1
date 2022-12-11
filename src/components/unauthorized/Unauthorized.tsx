import { useNavigate } from "react-router-dom"
import PageTemplate from "../elements/page_template";

const Unauthorized = () => {
    const navigate = useNavigate();

    //? goes back one step in history
    const goBack = () => navigate(-1);

    return (
        <PageTemplate children={

            <>
                <h1>Unauthorized</h1>
                <br />
                <p>You do not have access to the requested page.</p>
                <div className="flexGrow">
                    <button onClick={goBack}>Go Back</button>
                </div>
            </>
        } />
    )
}

export default Unauthorized