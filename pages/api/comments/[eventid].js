const handler = (req, res) => {
  const eventId  = req.query.eventid;
  console.log(eventId)
  if (req.method === "POST") {
      const  {email,name,text}  = req.body
      if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === ''){
          return res.status(422).json({
              message: 'invalid input'
          })
      }
      const newComment = {
          id: new Date().toISOString(),
          email,
          name,
          text
      }
      console.log(newComment)
      return res.status(201).json({
          message: 'Added Comment'
      })
  }
  if (req.method === "GET") {
      const dummyList = [
          {
              id: 'c1', name: 'andi', text: ' A first Comment'
          },
          {
              id: 'c2', name: 'hoerudin', text: ' A first Comment'
          }
      ]
      return res.status(200).json({
          comments: dummyList
      })
  }
};

export default handler;
