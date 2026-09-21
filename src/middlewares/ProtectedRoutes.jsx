import { Outlet, useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import { useUser } from "../context/UserContext";
import { useAlerts } from "../context/AlertsContext";
import { routes } from "../routes/routes";


export default function ProtectedRoutes() {
    const { user } = useUser();
    const { loading } = useLoading();
    // const { pushAlert } = useAlerts();
    const navigate = useNavigate();

    if (loading) {
        return null
    }

    if (!user) {
        // pushAlert({
        //     type : 'warning',
        //     message : "You're not logged to access this page",
        //     autoRemove : true,
        //     clearAlerts : true
        // });

        navigate(
            routes.login,
            { replace : true }
        );
    }

    return (<Outlet />)
}