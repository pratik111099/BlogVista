import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authentication = true }) => {
    const navigate = useNavigate();
    const status = useSelector((store) => store.auth.status);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (authentication && status !== authentication) {
            //    0 && 0
            navigate("/login");
        } else if (!authentication && status !== authentication) {
            // 1 && 0
            navigate("/");
        }
        setLoader(false);
    }, [status, navigate, authentication]);
    return loader ? <p>Loading....</p> : <div>{children}</div>;
};

export default AuthLayout;
