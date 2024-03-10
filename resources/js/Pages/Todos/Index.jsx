import React, { useState, useEffect } from 'react';
import { Link, Head, router } from '@inertiajs/react';
import classnames from 'classnames';
import "todomvc-common/base.css";
import "todomvc-app-css/index.css";
import TodoItem from './TodoItem';
<Head>
    <meta charset="UTF-8" />
    <meta name="description" content="A TodoMVC written in React, Inertia.js and Laravel" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>TodoMVC: React + Inertia.js + Laravel</title>
</Head>
const Index = ({ todos: externalTodos, totalTodoCount, completedTodoItemsCount }) => {

    const [todos, setTodos] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [toggleAllChecked, setToggleAllChecked] = useState(false);
    const [isCompletedFilter, setIsCompletedFilter] = useState(null);

    useEffect(() => {
        setTodos(externalTodos);
    }, [externalTodos]);

    useEffect(() => {
        setToggleAllChecked(todos.length > 0 && todos.every(todo => todo.is_completed));
    }, [todos]);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        setIsCompletedFilter(urlParams.get('is_completed'));
    }, [window.location.search]);
    
    const createNewTodoItem = (title) => {
        router.post('/todos', { title });
        setNewTodoTitle(''); // Reset form
    }

    function handleToggleAll(e) {
        const isCompleted = e.target.checked;
        console.log('toggle to', isCompleted);
        const batchedTodos = [];
        const newTodos = todos.map(todo => {
            if (todo.is_completed !== isCompleted) {
                batchedTodos.push({
                    id: todo.id,
                    is_completed: isCompleted,
                });
                return {
                    ...todo,
                    is_completed: isCompleted,
                };
            } else {
                return todo;
            }
        });
        setTodos(newTodos);
        router.patch(`/todos/batch`, {
            todos: batchedTodos,
        });

    }

    function handleClearCompleted() {
        router.post(`/todos/destroy-completed`);
    }

    return (<>
		<section className="todoapp">
			<header className="header">
				<h1>todos</h1>
				<input className="new-todo" placeholder="What needs to be done?" value={newTodoTitle} autoFocus onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        createNewTodoItem(newTodoTitle)
                    }
                }} onChange={(e) => {
                    setNewTodoTitle(e.target.value);
                }}/>
			</header>
			<section className="main">
				{todos.length > 0 && <input id="toggle-all" className="toggle-all" type="checkbox" onChange={handleToggleAll} checked={toggleAllChecked}/>}
				{todos.length > 0 && <label htmlFor="toggle-all">Mark all as complete</label>}
				<ul className="todo-list">
                    {todos.map((todo) => (
                        <TodoItem todo={todo} key={todo.id} />
                    ))}
				</ul>
			</section>
			{totalTodoCount > 0 && <footer className="footer">
				<span className="todo-count"><strong>{totalTodoCount - completedTodoItemsCount}</strong> item left</span>
				<ul className="filters">
					<li>
                    <Link href="/todos" className={classnames({
                            'selected': isCompletedFilter === null,
                        })}>All</Link>
					</li>
					<li>
                        <Link href="/todos?is_completed=0" className={classnames({
                            'selected': isCompletedFilter === '0',
                        })}>Active</Link>
					</li>
					<li>
                    <Link href="/todos?is_completed=1" className={classnames({
                            'selected': isCompletedFilter === '1',
                        })}>Completed</Link>
					</li>
				</ul>
				{completedTodoItemsCount > 0 && <button className="clear-completed" onClick={handleClearCompleted}>Clear completed</button>}
			</footer>}
		</section>
		<footer className="info">
			<p>Double-click to edit a todo</p>
			<p>Created by <a href="https://github.com/jasonhuhx">Jason Hu</a></p>
			<p>Based on <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
    </>);
};

export default Index;
