import { prisma } from "src/lib/prisma";


export default async function handler(req, res) {
  if (req.method == "POST") {
    const { key, email } = req.body;

    //TODO: get user from JWT
    // get user
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    
    if (!user) {
      res.status(200).json({
        isSuccess: false,
      });
    } 
    else if(user.api_key === key){

      // TODO: Fix so task works
      let task = await prisma.task.create({
        data: {
          vulnerability: "EXPOSE_KEY",
          userId: user.id
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
