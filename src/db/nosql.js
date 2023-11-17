const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin_user:zz1234567@clustergeek.al5hggz.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
// async function run() {
async function execSQL(sql) {
try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const dbName = "blog";
    const collectionName = "blog";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const findQuery = sql;

    try {
        // console.log("1111");
        // console.log(findQuery);
        const cursor = await collection.find(findQuery);
        // const cursor = await collection.find("旅行日记");
        // const cursor = await collection.find({id: 1});
        const result= await cursor.toArray();
        const jsonData = JSON.stringify(result, null, 2);
        return jsonData
        // return jsonData
        // const promise = new Promise((resolve, reject) => {
        //     collection.find(sql).toArray((err, result) => {
        //         if (err) {
        //             reject(err)
        //             return;
        //         }
        //         // const result1= result.toArray();
        //         const jsonData = JSON.stringify(result, null, 2);
        //         console.log(jsonData);
        //         resolve(jsonData)
        //     })
        // })
        // return promise;
        // console.log(jsonData);//返回JSON内容
        
        
        // add a linebreak
        // console.log();
    } catch (err) {
        console.error(`Something went wrong trying to find the documents: ${err}\n`);
    }
} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
}
}
// run().catch(console.dir);
module.exports = {
    execSQL
}