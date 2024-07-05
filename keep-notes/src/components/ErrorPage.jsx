import { useRouteError } from "react-router-dom"


function ErrorPage() {
    const error = useRouteError().error;

    return(
        <>
        <div className="flex flex-col text-center drop-shadow-lg border-2 items-center">
            <p>Oops! Something went wrong.</p>
            <p>Of course! You are the <span  className="text-red-500 block font-bold">REASON.</span></p>
            <p className="">{error.message}</p>
        </div>
        </>
    )
}

export default ErrorPage