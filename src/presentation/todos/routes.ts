import { Router } from "express";
import { TodosController } from "./controller";


export class TodoRoutes {


    static get routes() : Router{

        const router = Router();
        const todoController = new TodosController()

        router.get('/', (req, res) => todoController.getTodos(req, res));
        router.get('/:id', (req, res) => todoController.getTodoById(req, res));
        router.post('/', (req, res) => todoController.createTodo(req, res));
        router.put('/:id', (req, res) => todoController.updatedTodo(req, res));
        router.delete('/:id', (req, res) => todoController.deleteTodo(req, res));

        return router;
    }


}
