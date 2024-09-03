const http = require("http");
const url = require('url');

const {getSingleTodos, getAllTodos, createtodos, updateTodos, deleteTodo} = require("./controller/todosController");


const server = http.createServer((req, res)=>{

    const {pathname, query} = url.parse(req.url);
    console.log(pathname, query)
    console.log(pathname.split("/"))
    console.log(req.method);
    const method = req.method;

    if(method==='GET' && pathname==="/api/v1/todo"){
getAllTodos(req, res);
    }

    if(method==="GET" && pathname.startsWith("/api/v1/todo/")){
        const id = parseInt(pathname.split("/")[4]);
        getSingleTodos(req, res, id);
    }

    if(method==="POST" && pathname==="/api/v1/todo"){
        const dataContainor = [];
        req.on("data", (data)=>{
//data is received here
dataContainor.push(data);
        })
        .on("end", ()=>{
            const parsedData = JSON.parse(...dataContainor);
            createtodos(req, res, parsedData);
        })
    }

    if(method==="PATCH" && pathname.startsWith("/api/v1/todo/")){
        const id = parseInt(pathname.split("/")[4]);
        const dataContainor = [];
        req.on("data", (data)=>{
//data is received here
dataContainor.push(data);
        })
        .on("end", ()=>{
            const parsedData = JSON.parse(...dataContainor);
            updateTodos(req, res,id, parsedData);
        })   
    }

    if(method==="DELETE" && pathname.startsWith("/api/v1/todo/")){
        const id = parseInt(pathname.split("/")[4]);
        deleteTodo(req, res, id);
    }

    // const todoData = [];
    // req.on("data", (data)=>{
    //     console.log(data);
    //     console.log(typeof(data))
    //     todoData.push(data);

    // })
    // .on("end", ()=>{
    //     const reqBody = JSON.parse(todoData);
    //      res.writeHead(201, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify(reqBody)); 
    // })
    
})


const port = 4000;
server.listen(port, ()=>{
    console.log(`server is running at ${port}`)
})