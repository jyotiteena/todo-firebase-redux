import React from 'react';

const TodoItem = ({ todo, onDelete, onToggleComplete }) => {
    return (
        <li className="col-10 mx-auto  shadow list-group-item d-flex justify-content-between align-items-center p-3">
            <div>
                <h5 className={todo.completed ? 'text-decoration-line-through text-danger text-uppercase' : 'text-success text-uppercase'}>{todo.title}</h5>
                <p className='text-muted'>{todo.description}</p>
            </div>
            <div>
                <button className="btn btn-warning me-2" onClick={() => onToggleComplete(todo)}>
                    {todo.completed ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i>}
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(todo.id)}><i class="fa-solid fa-trash-can"></i></button>
            </div>
            
        </li>
    );
};

export default TodoItem;
