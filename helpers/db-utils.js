import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://andihoerudin:andihoerudin@cluster0.dx4sn.mongodb.net/newsletter?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  );
  return client;
};

export const insertDocuments = async (client,collection,document) =>{
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    return result
}


export const getAllDocuments = async (client,collection,sort) =>{
    const db = client.db()
    const documents = await db.collection(collection).find().sort(sort).toArray()
    return documents
}