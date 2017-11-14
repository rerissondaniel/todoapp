var TodoService = require('../services/todo.service');

_this = this;

exports.getTodos = async function(req, res, next){
    var page = req.query.page || 1;
    var limit = req.query.limit || 10;

    try{
        var todos = await TodoService.getTodos({}, page, limit);

        return res
            .status(200)
            .json({
                status: 200, 
                data: todos.docs, 
                message: "Todos received successfully"
            });

    }catch(e){
        return res.status(400).json({status:400, message: e.message})
    }
}

exports.createTodo = async function(req, res, next){
    var todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }

    try{
        var createdTodo = await TodoService.createTodo(todo);
        return res
            .status(201)
            .json({
                status: 201,
                data: createdTodo,
                message: 'Todo successfully created'
            });
    }catch(e){
        res.satus(400).json({status: 400, message: e.message});
    }
}

exports.updateTodo = async function(req, res, next){
    if(!req.body._id){
        return res
            .status(400)
            .json({
                status: 400,
                message: 'Id must be present'
            });
    }

    var id = req.body._id;

    var todo = {
        id,
        title: req.body.title, 
        description: req.body.description,
        status: req.body.status
    }

    try{
        var updatedTodo = await TodoService.updateTodo(todo);
        return res.status(200).json({status: 200, data:updatedTodo, message: "todo updated"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeTodo = async function(req, res, next){
    var id = req.params.id;

    try{
        var deletedTodo = await TodoService.deleteTodo(id);
        return res.status(204).json({status:204, message: "Deletion successfully"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}