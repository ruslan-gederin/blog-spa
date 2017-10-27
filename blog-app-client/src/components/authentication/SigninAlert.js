import React from "react";

const SigninAlert = ({alert}) => {
    return (
        <div className="alert alert-danger">
            <strong>Error!</strong> {alert}
        </div>
    )
};

export default SigninAlert;