<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    use ApiResponser;

    public function index(Request $request)
    {
        return $this->successResponse($request->user()->todos()->latest()->get(), 'Todos retrieved successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required|string|max:255',
        ]);

        $todo = $request->user()->todos()->create([
            'text' => $validated['text'],
            'done' => false,
        ]);

        return $this->successResponse($todo, 'Todo created successfully', 201);
    }

    public function update(Request $request, Todo $todo)
    {
        if ($todo->user_id !== $request->user()->id) {
            return $this->errorResponse('Unauthorized', 403);
        }

        $validated = $request->validate([
            'text' => 'sometimes|string|max:255',
            'done' => 'sometimes|boolean',
        ]);

        $todo->update($validated);

        return $this->successResponse($todo, 'Todo updated successfully');
    }

    public function destroy(Request $request, Todo $todo)
    {
        if ($todo->user_id !== $request->user()->id) {
            return $this->errorResponse('Unauthorized', 403);
        }

        $todo->delete();

        return $this->successResponse(null, 'Todo deleted successfully');
    }
}
