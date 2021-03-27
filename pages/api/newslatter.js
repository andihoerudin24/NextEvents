const handler = (req,res) =>{
     if(req.method === 'POST'){
         const useremail=  req.body.email
         if(!useremail || !useremail.includes('@')){
             return res.status(422).json({
                 message: 'Invalid email address'
             })
         }
         console.log(useremail)
         return res.status(201).json({
             message: 'Signed up!'
         })         
     }
}

export default handler