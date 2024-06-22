import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, deleteTodo, updateTodo } from '../features/todos/todoSlice';
import TodoItem from './TodoItem';

const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const userTodos = todos.filter(todo => todo.userId === user.uid);

    const handleDelete = (id) => {
        if (confirm("Do you want to delete this todo ?")) {
            dispatch(deleteTodo(id));
            alert("deleted your todo")
        }
    };

    const handleToggleComplete = (todo) => {
        dispatch(updateTodo({
            ...todo,
            completed: !todo.completed
        }));
    };

    return (
        <>
            <div className="mt-3">
                <h2></h2>
                <ul className="list-group">
                    {userTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={handleDelete}
                            onToggleComplete={handleToggleComplete}
                        />
                    ))}
                </ul>
            </div>
        </>

    );
};

export default TodoList;
