/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useResetPassword } from "../context/ResetPasswordContext";

function ForgotPasswordPage() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { forgotPassword, errors: resetPasswordErrors, message } = useResetPassword();
    const navigate = useNavigate();


    const onSubmit = handleSubmit(async data => {
        const res = await forgotPassword(data);
        if(res) {
            const timer = setTimeout(() => {
                navigate('/login')
            }, 6000);
            return () => clearTimeout(timer);
        }
        reset();
    });

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <h1 className='text-2xl font-bold'>Reset Password</h1>
                {
                    resetPasswordErrors.map((error, i) => (
                        <p className='bg-red-500 text-white my-2' key={i}>
                            {error}
                        </p>
                    ))
                }
                <form onSubmit={ onSubmit }>
                    <input type="email" {...register("email", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Email'/>
                    {errors.email && <p className='text-red-500'>Email is required</p>}
                    <p className='text-green-500'>{message}</p>
                    <button className='bg-zinc-700 px-3 py-0.5 rounded-md hover:bg-zinc-600 transition ease-out' type="submit">
                        Reset
                    </button>
                </form>
                <p className='flex gap-x-2 justify-between'>Already have an account?<Link to={'/login'} className='text-sky-500'>Login</Link></p>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;