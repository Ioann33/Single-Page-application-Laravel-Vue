<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeskRequest;
use App\Http\Resources\DeskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class SpaController extends Controller
{
    public function index(){
        return view('index');
    }

    public function all(){
        $tasks = Task::all()->toArray();
        return response()->json($tasks);
//        return DeskResource::collection(Task::all());
    }

    public function save(Request $request){
        $this->validate($request, [
            'name' =>  'unique:tasks,name|required|max:255'
        ]);
        $task = new Task();
        $task->name = $request->name;
        $task->save();

    }

//    public function save(DeskRequest $request){
//        $created = Task::create($request->validated());
//
//        return new DeskResource($created);
//    }


    public function show(Request $request){
        $task = Task::findOrFail($request -> id);
        return response()->json($task);
//        return new DeskResource(Task::findOrFail($request -> id));
    }

    public function update(Request $request){
        $task = Task::findOrFail($request -> id);
        $task->name = $request->name;
        $task->save();
    }

    public function delete(Request $request){
        $task = Task::findOrFail($request -> id);
        $task->delete();
    }
}
