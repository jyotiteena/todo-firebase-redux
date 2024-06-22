import React from 'react';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import SignOut from './SignOut';

const HomePage = () => {
    return (
        <div className="container">
            
            <h5 className="my-4 text-center text-info">Maximize your productivity and keep your tasks in check with our To-do List</h5>
            <AddTodo />
            <TodoList />
            <SignOut/>
        </div>
    );
};

export default HomePage;
