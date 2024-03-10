<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        $is_completed = request()->query('is_completed', null);
        $totalTodoCount = Todo::where('session_id', session()->getId())->count();
        $completedTodoItemsCount = Todo::where(['is_completed' => 1, 'session_id' => session()->getId()])->count();
        if ($is_completed === null) {
            $todos = Todo::where('session_id', session()->getId())->get();
        } else {
            $todos = Todo::where([
                'session_id' => session()->getId(),
                'is_completed' => boolval($is_completed),
            ])->get();
        }

        return inertia('Todos/Index', ['totalTodoCount' => $totalTodoCount, 'completedTodoItemsCount' => $completedTodoItemsCount, 'todos' => $todos]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $todo = $request->all();
        $todo['session_id'] = session()->getId();
        Todo::create($todo);

        $todos = Todo::all();
        // redirect to index
        return redirect()->route('todos.index')->with('message', 'Todo created successfully.');
        // return inertia('Todos/Index', ['todos' => $todos]);
    }

    // Update the specified todo in storage
    public function update(Request $request, Todo $todo)
    {
        $request->validate([
            'title' => 'string|max:255',
            'is_completed' => 'boolean',
        ]);

        // only update todos match the session id
        if ($todo->session_id !== session()->getId()) {
            return redirect()->route('todos.index')->with('message', 'You are not authorized to update this todo.');
        }
        $todo->update($request->all());

        return redirect()->route('todos.index')->with('message', 'Todo updated successfully.');
    }

    // Remove the specified todo from storage
    public function destroy(Todo $todo)
    {
        // only update todos match the session id
        if ($todo->session_id !== session()->getId()) {
            return redirect()->route('todos.index')->with('message', 'You are not authorized to update this todo.');
        }
        $todo->delete();

        return redirect()->route('todos.index')->with('message', 'Todo deleted successfully.');
    }

    public function batchUpdate(Request $request)
    {
        $request->validate([
            'todos' => 'required|array',
            'todos.*.id' => 'required|exists:todos,id',
            'todos.*.is_completed' => 'sometimes|required|boolean',
        ]);

        // keep only id and is_completed field in the request
        $todos = collect($request->todos)->map(function ($todo) {
            return ['id' => $todo['id'], 'is_completed' => $todo['is_completed']];
        })->toArray();
    
        foreach ($todos as $todoData) {
            $todo = Todo::where([
                'id' => $todoData['id'],
                'session_id' => session()->getId(),
            ])->first();
            
            if ($todo) {
                $todo->update($todoData);
            }
        }
    
        return redirect()->route('todos.index')->with('message', 'Todos updated successfully.');
    }
    public function destroyCompleted()
    {
        Todo::where([
            'session_id' => session()->getId(),
            'is_completed' => 1,
        ])->delete();
        return redirect()->route('todos.index')->with('message', 'Todos deleted successfully.');
    }

}
