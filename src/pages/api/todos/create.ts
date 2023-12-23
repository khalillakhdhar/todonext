import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma=new PrismaClient(); //appel de prisma client pour la connexion a la base de donnée et l'execution des requetes
export default async function handle(req: NextApiRequest,res:NextApiResponse){


const {title}=req.body; //recuperation du titre de la tache a creer
const newTodo=await prisma.todo.create(
    {

    data:{
        title,
        done:false,
    },
}
);
res.json(newTodo);
}