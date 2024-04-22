import { Link } from "react-router-dom";

function ErrorTokenResetPage () {

    const message = sessionStorage.getItem('messageError')

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='max-w-3xl w-full p-10 rounded-md'>
                <p className="text-3xl text-red-500">{message}</p>
                <p className='flex gap-x-2 pt-4 justify-between'><Link to={'/forgot-password'} className='text-sky-500'>Reset password</Link></p>
            </div>
        </div>
        
    )
}

export default ErrorTokenResetPage;