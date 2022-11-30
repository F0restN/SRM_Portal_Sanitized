import { useEffect, useState } from "react";
import store from "../store/store";

const useStore = () => {
    const [authenticationStatus, setAuthenticationStatus] = useState(store.getState())

    useEffect= (() => {
        setAuthenticationStatus(store.getState())
        window.location.reload()
        
        console.log("Use Store Hook")
    }, [authenticationStatus])

    return { authenticationStatus }
}

export default useStore