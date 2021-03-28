import { MongoClient } from "mongodb";
import { connectDatabase, getAllDocuments, insertDocuments } from "../../../helpers/db-utils";

const handler = async (req, res) => {
  const eventId = req.query.eventid;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    return res.status(500).json({
      message: "Connectiong to the database fail",
    });
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (!email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "") {
      client.close();
      return res.status(422).json({
        message: "invalid input",
      });
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    let result;
    try {
      result = await insertDocuments(client, "comments", newComment);
      newComment._id = result.insertedId;
      return res.status(201).json({
        message: "Added Comment",
        comment: newComment,
      });
    } catch (error) {
      return res.status(500).json({
        message: "inserting comments fail",
      });
    }

  }
  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", {
        _id: -1,
      });
      return res.status(200).json({
        comments: documents,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Getting Comments fail",
      });
    }
  }
  client.close();
};

export default handler;
