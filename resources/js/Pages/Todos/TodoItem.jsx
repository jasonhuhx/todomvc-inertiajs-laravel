import React, { useState, useRef, useEffect } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import classnames from 'classnames';

const TodoItem = ({ todo }) => {

    const [title, setTitle] = useState(todo.title);
    const [isCompleted, setIsCompleted] = useState(todo.is_completed);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef();

    // focus on input as soon as todo item enters editing mode
    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        setIsCompleted(todo.is_completed);
    }, [todo.is_completed]);

    function handleCheckboxClick(e) {
        setIsCompleted(e.target.checked);
        router.patch(`/todos/${todo.id}`, {
            is_completed: e.target.checked,
        });
    }


    function handleTodoItemDoubleClick(e) {
        setIsEditing(true);
    }

    function handleTodoItemBlur() {
        setIsEditing(false);
        router.patch(`/todos/${todo.id}`, {
            title,
        });
    }

    function handleTodoItemDelete() {
        router.delete(`/todos/${todo.id}`);
    }

    return (<li className={classnames({
                'completed': isCompleted,
                'editing': isEditing,
            })}>
        <div className="view">
            <input className="toggle" type="checkbox" checked={isCompleted} onChange={handleCheckboxClick} />
            <label onDoubleClick={handleTodoItemDoubleClick} >{ title }</label>
            <button className="destroy" onClick={handleTodoItemDelete}></button>
        </div>
        <input className="edit" value={ title } onChange={(e) => {
            setTitle(e.target.value);
        }} onBlur={handleTodoItemBlur} ref={inputRef} />
    </li>);
};

export default TodoItem;