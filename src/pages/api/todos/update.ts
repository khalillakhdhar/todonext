import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma=new PrismaClient(); 
export default async function handle(req: NextApiRequest,res:NextApiResponse){
   // const {id}=req.query;
    const {id,title,done}=req.body;
    const updatedTodo=await prisma.todo.update({
        where:{
            id:parseInt(id),
        },
        data:{
            title,
            done,
        },
    });
    res.json(updatedTodo);
}