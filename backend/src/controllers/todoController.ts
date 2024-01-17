import { Request, Response } from 'express';
import { Todo } from '../model/TodoModels';


export const GetTodo=async (req: Request, res: Response)=>{
    const { body } = req.body;

    try {
        body
        const todos = await Todo.findAll();
        res.status(200).json({data:todos,message:"success",status:true})
        // res.json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).json({data:[],message:'Internal Server Error',status:false})
    //   res.status(500).send('Internal Server Error');
    }
}

export const GetTodoByID=async (req: Request, res: Response)=>{
    // const { body } = req.body;
    const { id } = req.params;
    try {
        // body
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ data:[],message:'Todo Not Found',status:false });
        }
        // const todos = await Todo.findByPk();
        res.status(200).json({data:todo,message:"success",status:true})
        // res.json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).json({data:[],message:'Internal Server Error',status:false})
    //   res.status(500).send('Internal Server Error');
    }
}

export const CreateTodo=async (req: Request, res: Response)=>{
    const { title } = req.body;

    try {
      const todo = await Todo.create({ title });
      res.status(200).json({data:todo,message:"success",status:true})
    } catch (error) {
      console.error(error);
      return res.status(500).json({data:[],message:'Internal Server Error',status:false});
    }
}

export const UpdateTodo=async(req:Request,res:Response)=>{
    const { id } = req.params;
    const { isCompleted, title, description } = req.body;

    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ data:[],message:'Todo Not Found',status:false });
        }

        todo.isCompleted = isCompleted;
        todo.title = title;
        todo.description = description;
        todo.modifiedOn = Date.now()

        if(isCompleted){
        todo.completedOn = Date.now()
        }
        await todo.save();

        res.status(200).json({data:todo,message:"success",status:true})
    } catch (error) {
        console.error(error);
        res.status(500).json({ data:[],message:'Internal Server Error',status:false})
    }
}

export const DeleteTodo=async(req:Request,res:Response)=>{
    const { id } = req.params;

  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
        return res.status(404).json({ data:[],message:'Todo Not Found',status:false});
    }

    await todo.destroy();
    res.json({ data:todo,message:'Todo Deleted',status:true});
  } catch (error) {
    console.error(error);
    res.status(500).json({data:[],message:'Internal Server Error',status:false});
  }
}

