// const mongoose = require('mongoose');
// const faker = require('../node_modules/faker');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin_user:zz1234567@clustergeek.al5hggz.mongodb.net/?retryWrites=true&w=majority";

// 连接到MongoDB数据库
// mongoose.connect('mongodb://localhost:27017/myblog', { useNewUrlParser: true, useUnifiedTopology: true });

// // 定义博客模型
// const Blog = mongoose.model('Blog', {
//     title: String,
//     content: String,
//     author: String,
//     createdAt: { type: Date, default: Date.now }
// });

// // 执行查询
// Blog.find({}, (err, result) => {
//     if (err) {
//         console.error('error', err);
//         return;
//     }
//     console.log('result', result);
    
//     // 关闭连接
//     mongoose.connection.close();
// });
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
async function run() {
try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const dbName = "blog";
    const collectionName = "blog";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const findQuery = {};

    try {
        const cursor = await collection.find(findQuery);
        const result= await cursor.toArray();
        console.log(result);
        
        // add a linebreak
        // console.log();
    } catch (err) {
        console.error(`Something went wrong trying to find the documents: ${err}\n`);
    }

    // We can also find a single document. Let's find the first document
    // that has the string "potato" in the ingredients list.
    // const findQuery1 = {id: 2};

    // try {
    //     const result = await collection.findOne(findQuery1);
    //     console.log('查询结果:', result);
        
    // } catch (err) {
    //     console.error(`Something went wrong trying to find one document: ${err}\n`);
    // }
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
}
}
run().catch(console.dir);
//   async function run() {
//     try {
//       await client.connect();
  
//       const database = client.db("blog"); // Replace "myblog" with your actual database name
//       const collection = database.collection("blog");
  
//       // Generating random blog data
//       const generateRandomBlog = () => {
//         return {
//           title: faker.lorem.words(),
//           content: faker.lorem.paragraphs(),
//           author: faker.name.findName(),
//           createAt: faker.date.past().toISOString(),
//         };
//       };
  
//       const numberOfBlogs = 5;
//       const blogs = Array.from({ length: numberOfBlogs }, generateRandomBlog);
  
//       // Insert blogs into the MongoDB collection
//       const result = await collection.insertMany(blogs);
  
//       console.log(`${result.insertedCount} blogs inserted successfully into the MongoDB collection.`);
//     } finally {
//       await client.close();
//     }
//   }
  
//   run().catch(console.error);