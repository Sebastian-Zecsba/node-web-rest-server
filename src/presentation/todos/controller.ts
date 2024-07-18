import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"

export class TodosController {

    constructor(){}

    // * Read

    public getTodos = async (req: Request, res: Response) => {
        const getTodos = await prisma.todo.findMany()
        return res.json(getTodos)
    }

    // Read by id 

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: `ID must be a number`})

        // const todo = todos.find(todo => todo.id === id);

        const findTodoById = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        (findTodoById)
            ? res.json(findTodoById)
            : res.status(404).json({ error: `TODO with id: ${id} not found`})
    }

    // * Create 

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if(error) return res.status(400).json({error: error})

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.json(todo)
    };

    public updatedTodo = async (req: Request, res: Response) => {
        
        const id = +req.params.id;
        const [error, updatedTodo ] = UpdateTodoDto.create({...req.body, id})
        if(error) return res.status(400).json({error})

        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        if(!todo) return res.status(404).json({error: `TODO with id: ${id} not found`})

        const todos = await prisma.todo.update({
            where: {
                id: id
            },
            data: updatedTodo!.values
        })

        //! OJO, referencia

        res.json(todos);
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: `ID must be a number` });
        
        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });
        if(!todo) return res.status(404).json({error: `TODO with id: ${id} not found`})

        const todos = await prisma.todo.delete({
            where: {
                id: id
            }
        });

        (todos)
            ? res.json(todos)
            : res.status(400).json({error: `Todo with id ${id} not found`})
    }   

} 