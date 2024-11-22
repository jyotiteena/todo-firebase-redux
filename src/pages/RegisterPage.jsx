import { useDispatch } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const signupForm = (data) => {
        const res = dispatch(registerUser(data.email, data.password));
        if(res){
            navigate('/login');
        }
    };

    return (
        <div className="col-7 mx-auto my-5 p-5 shadow">
            <h1 className="my-4">Register</h1>
            <form onSubmit={handleSubmit(signupForm)}>
            <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder='Enter Email Id'
                        {...register('email', {
                            required: { value: true, message: "Please Enter Email Id" },
                        })}
                    />
                    <p className='text-danger'>{errors?.email?.message}</p>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder='Enter Password'
                        {...register('password', {
                            required: { value: true, message: "Please Enter Password" },
                            minLength: { value: 8, message: 'At least 8 characters' },
                        })}
                    />
                    <p className='text-danger'>{errors?.password?.message}</p>
                </div>
                <button className="btn btn-primary px-5 my-2">Register</button>
                <NavLink to="/login" className="my-2 ms-3">Login</NavLink>
            </form>
        </div>
    );
};

export default RegisterPage;
