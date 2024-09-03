const fs = require('fs').promises; 

// async function updateTodos() {
//     try {
//         const data = await fs.readFile('data.js', 'utf8');
//         let todos = JSON.parse(data);

//         const newTodo = { id: 1, todo: "New todo item" };
//         todos.push(newTodo);

//         const updatedData = JSON.stringify(todos, null, 4);

//         await fs.writeFile('data.js', updatedData, 'utf8');

//         console.log('File updated successfully!');
//     } catch (err) {
//         console.error('Error:', err);
//     }
// }

// async function readTodos(){

// }

// updateTodos("../data.js")


// module.exports = updateTodos;


exports.readTodos = async()=>{
    try{

        const data = await fs.readFile('data.js', 'utf8');
        let todos = JSON.parse(data);
        return todos;
    }catch(err){
        console.log(err);
    }
    }


exports.writeTodos = async(todos)=>{
    try{

        const updatedData = JSON.stringify(todos, null, 4);

        await fs.writeFile('data.js', updatedData, 'utf8');

    }catch(err){
        console.log(err);
    }
}



