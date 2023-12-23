import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma=new PrismaClient(); 
export default async function handle(req: NextApiRequest,res:NextApiResponse){
    const {id}=req.query;
    const deletedTodo=await prisma.todo.delete({
        where:{
            id:parseInt(id as string),
        },
    });
    res.json({message: "Todo deleted successfully "+deletedTodo});
}