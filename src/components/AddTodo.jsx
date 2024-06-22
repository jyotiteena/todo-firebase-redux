import React from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todoSlice';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const AddTodo = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const submitData = (data) => {
        dispatch(addTodo({
            ...data,
            userId: user.uid
        }));
    };

    return (
        <form onSubmit={handleSubmit(submitData)} className='col-10 mx-auto p-5 my-5 shadow'>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    type="text"
                    placeholder='Enter Title Name'
                    className="form-control"
                    {...register('title',
                        {
                            required: { value: true, message: "Please Enter Title Name" },
                            minLength: { value: 2, message: 'atleast 2 character' }
                        }
                    )}
                />
                <p className='text-danger'>{errors?.title?.message}</p>
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                    className="form-control"
                    placeholder='Enter Desctiption'
                    {...register('description', {
                        required: { value: true, message: "Please Enter Description" },
                        minLength: { value: 3, message: "atleast 3 character" }
                    })}
                />
                <p className='text-danger'>{errors?.description?.message}</p>
            </div>
            <button type="submit" title='add' className="btn btn-success"><i class="fa-solid fa-plus"></i></button>
        </form>
    );
};

export default AddTodo;
