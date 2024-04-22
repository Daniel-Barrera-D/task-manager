/* eslint-disable react/no-unescaped-entities */
import { useForm } from 'react-hook-form';
import { useResetPassword } from '../context/ResetPasswordContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function ResetPasswordPage() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { resetPassword, verifyTokenReset, redirect, errors: resetPasswordErrors, message } = useResetPassword();
    const { id, resetToken } = useParams();

    const navigate = useNavigate();

    const onSubmit = handleSubmit(data => {
        console.log(id, resetToken, data);
        const res = resetPassword(id, resetToken, data);
        if(res) {
            const timer = setTimeout(() => {
                navigate('/login')
            }, 6000);
            return () => clearTimeout(timer);
        }
        reset()
    });

    useEffect(() => {
        verifyTokenReset(id, resetToken);
        if(redirect) navigate('/reset-password-error');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[redirect])


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
                    <input type="password" {...register("password", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='New password'/>
                    {errors.password && <p className='text-red-500'>New password is require</p>}
                    {/* <input type="password" {...register("confirmPassword", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Confirm password'/>
                    {errors.confirmPassword && <p className='text-red-500'>Confirm password is required</p>} */}
                    <p className='text-green-500'>{message}</p>
                    <button className='bg-zinc-700 px-3 py-0.5 rounded-md hover:bg-zinc-600 transition ease-out' type="submit">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordPage;