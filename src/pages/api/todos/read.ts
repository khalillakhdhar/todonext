import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma=new PrismaClient(); 
export default async function handle(req: NextApiRequest,res:NextApiResponse){
const todos=await prisma.todo.findMany();
res.json(todos);

}