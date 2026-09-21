import DateTime from "../Utilities/DateTime"
import { Link } from "react-router-dom"
import { useUser } from "../../context/UserContext"
import { routes } from "../../routes/routes"

function UserBadge({ name }) {
    return (
        <div className="flex items-center justify-center gap-2">
            <Link to={routes.account} data-title="Account details" data-title-position="bottom"
                className="bg-indigo-500 text-white rounded-full w-10 h-10 flex items-center justify-center transition-shadow shadow-indigo-500 hover:shadow-md">
                {name?.[0]?.toUpperCase()}
            </Link>
            <span>
                {name}
            </span>
        </div>
    )
}

export default function Header() {
    const { user } = useUser();

    return (
        <>
        <header className="sticky md:min-h-16 h-22 md:h-16 top-0 z-50 w-full bg-gray-100 dark:bg-gray-800/75 flex flex-col md:flex-row justify-between 
            items-center gap-2 md:gap-0 py-2.5 md:py-0 px-6 rounded-2xl shadow-sm backdrop-blur-md">

            <div className="text-center text-xl md:text-3xl capitalize font-bold text-gray-900/90 dark:text-white/90">
                <Link to={routes.home}>
                    Javascript - React Library
                </Link>
            </div>
            {
                user
                ? (<UserBadge name={user?.name} />)
                : (<DateTime />) 
            }
        </header>
        </>
    )
}
