const {readTodos, writeTodos} = require("../utils/fileOperation");
const successResponse = (res,statusCode, message, todos)=>{
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        success: true,
        message: message,
        data: {
            todos
        }
    }));
}

const failureResponse = (res, statusCode, message)=>{
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        success: false,
        message: message,
        
    }));
}


exports.getSingleTodos = async(req, res, id)=>{
    try{
        const todos = await readTodos();
        console.log(todos);
        const todo = todos.filter(todo=>todo.id===id);
        if(todo.length!==0){
            successResponse(res, 200, "Todo is found", todo);
        }else{
            failureResponse(res, 404, "To do with this id is not found");
        }


    }catch(err){
        failureResponse(res, 500, "Something went very wrong");
    }
}

exports.getAllTodos = async (req, res)=>{
    try{

        const todos = await readTodos();
        successResponse(res, 200, "All todos are fetched", todos);
    }catch(err){
        failureResponse(res, 500, err.message);
    }

}

exports.createtodos=async(req, res, todo)=>{
    try{
        const todos = await readTodos();
        todo.id=todos.length;
        todos.push(todo);
        await writeTodos(todos);
        successResponse(res, 201, "New todo is created", todo);
    }catch(err){
failureResponse(res, 500, err.message);
    }
}


exports.updateTodos = async(req, res, id, todo)=>{
    try{
        const todos = await readTodos();
        const todoWithID = todos.filter(todo=>id===todo.id);
        if(todoWithID.length===0){
            return failureResponse(res, 404, "No todo with this id");
        }else{
            todos.forEach(element => {
                if(element.id===id) element.title = todo.title;
            });
            let responseData = {...todo, id: id}
            await writeTodos(todos)
            successResponse(res, 200, "Todo is modified", responseData);
        }
    }catch(err){
        failureResponse(res, 500, err.message)
    }
}

exports.deleteTodo = async(req, res, id)=>{
    try{
        const todos = await readTodos();
        const todoWithID = todos.filter(todo=>todo.id===id);
        if(todoWithID.length===0){
            failureResponse(res, 404, "Todo is not found with this id");
        }else{
            let filteredTodos = todos.filter(todo=>todo.id!==id);
            await writeTodos(filteredTodos);
            successResponse(res, 200, "The todo is deleted", filteredTodos);
        }
    }catch(err){
        failureResponse(res, 500, err.message);
    }
}