import { prisma } from "src/lib/prisma";
import { runMiddleware } from "src/lib/middleware";
import { authenticationMiddleware } from "src/lib/jwt";


export default async function handler(req, res) {
  if (req.method == "POST") {
    await runMiddleware(req, res, authenticationMiddleware);
    const { id } = req.user;
    const { api_key } = req.body;

    let user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    
    if (!user) {
      res.status(200).json({
        isSuccess: false,
      });
    } 
    else if(api_key === "c32db451-3f3d-4055-9d0e-c5c5c8ebf96a"){

      console.log(id); 
      
      await prisma.task.create({
        data: {
          vulnerability: "EXPOSE_KEY",
          userId: id,
        },
      });
      res.status(200).json({
        isSuccess: true,
      });
    }
    else{
      res.status(200).json({
        isSuccess: false,
      });
    }

    
  }
}
