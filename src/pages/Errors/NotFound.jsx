export default function NotFound() {
  
  return (
    <div className="h-full flex flex-col justify-center items-center">

      <div className="relative">
        <p className="display-1 text-shadow-lg text-shadow-white text-white animate-bounce">
          404
        </p>
        <div className="w-full h-10 bg-white/75 rounded-circle rotate-x-50 -mt-10"></div>
      </div>

      <h4 className="font-bold">Sorry, this page isn't available.</h4>

      <p>
        The link you followed may be broken, or the page may have been removed.
        <button onClick={() => history.go(-1)}
          className="text-indigo-500 text-decoration-underline hover:text-white ms-2 transition-colors"
        >
          Go back Back.
        </button> 
      </p>

    </div>
  )
}