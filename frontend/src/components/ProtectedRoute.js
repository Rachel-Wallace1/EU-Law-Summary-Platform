import React from 'react';
import {UserRoleIntToStringMapping} from "./enums";
import {useAuth} from "./AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
    const { user } = useAuth();
    const userRoleAsString = UserRoleIntToStringMapping[user.role];

    if (!user || !allowedRoles.includes(userRoleAsString)) {
        if (user) {
            console.log("User Role:", user.role);
            console.log("Mapped Role:", UserRoleIntToStringMapping[user.role]);
            console.log("Allowed Roles:", allowedRoles);
            console.log("Is role allowed:", allowedRoles.includes(UserRoleIntToStringMapping[user.role]));
        }

        // If the user does not exist or the user's role is not allowed
        // display permission denied
        return <div style={{ padding: 20, textAlign: 'center', marginTop: 50 }}>
            <h2>FORBIDDEN</h2>
            <p>You do not have permission to access this page.</p>
        </div>;
    }

    // If the user is logged in and their role is allowed, render the requested route component
    return children;
}

export default ProtectedRoute;
