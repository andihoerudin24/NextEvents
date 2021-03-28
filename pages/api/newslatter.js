import { connectDatabase, insertDocuments } from "../../helpers/db-utils";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const useremail = req.body.email;
    if (!useremail || !useremail.includes("@")) {
      return res.status(422).json({
        message: "Invalid email address",
      });
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      return res.status(500).json({
        message: "connectiong to the database fail",
      });
    }
    
    try {
      await insertDocuments(client,'newsletter', {
        email: useremail,
      });
      client.close();
    } catch (error) {
      return res.status(500).json({
        message: "inserting data fail",
      });
    }
    return res.status(201).json({
      message: "Signed up!",
    });
  }
};

export default handler;
