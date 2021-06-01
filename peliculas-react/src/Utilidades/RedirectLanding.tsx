import { Redirect } from "react-router";

export default function RedirectLanding(){
    return (
        <Redirect to={{pathname:'/'}}/>
    )
}