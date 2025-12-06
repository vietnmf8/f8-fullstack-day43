import { useMeQuery } from "@/services/auth";
import React from "react";

function Profile() {
    const { isSuccess, data: currentUser } = useMeQuery();
    console.log(isSuccess, currentUser);
    return <div>Profile</div>;
}

export default Profile;
