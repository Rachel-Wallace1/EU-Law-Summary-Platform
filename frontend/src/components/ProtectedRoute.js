import React from 'react';
import {UserRoleIntToStringMapping} from "./enums";
import {useAuth} from "./AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
    const { user } = useAuth(); // gets the user from auth context
    const userRoleAsString = UserRoleIntToStringMapping[user.role]; // maps the user role into a string

    if (!user || !allowedRoles.includes(userRoleAsString)) { // if user is NOT valid OR is NOT one of the allowed roles, then log in console, and return a FORBIDDEN page
        if (user) {
            console.log("User Role:", user.role);
            console.log("Mapped Role:", UserRoleIntToStringMapping[user.role]);
            console.log("Allowed Roles:", allowedRoles);
            console.log("Is role allowed:", allowedRoles.includes(UserRoleIntToStringMapping[user.role]));
        }

        // we return a forbidden page below
        return <div style={{ padding: 20, textAlign: 'center', marginTop: 50 }}>
            <h2>FORBIDDEN</h2>
            <p>You do not have permission to access this page.</p>
        </div>;
    }

    // If user IS logged in AND their role IS allowed, render the requested route component
    return children;
}

export default ProtectedRoute;
