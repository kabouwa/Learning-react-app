import { useLoading } from "../../context/LoadingContext"

export default function LoadingModal() {
    const { loading } = useLoading();

    return (
        <div className={`loading-modal fixed top-0 left-0 w-screen h-screen z-100 bg-gray-700 flex justify-center items-center ${loading ? 'animate-fade-in' : 'animate-fade-out'}`} >
            {
                loading
                ? (
                    <div className="loading w-20 h-20 border-t-white/50 border-b-white/50 border-l-white/50 border-r-indigo-600 border-5 rounded-full flex justify-center items-center animate-spin">
                    </div>
                ) : null

            }
        </div>
    )
}