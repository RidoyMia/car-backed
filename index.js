const express = require('express')
const app = express()
var cors = require('cors')

const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://carservice:carservice@cluster0.dwsuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
 
  try{
      await client.connect()
      const ServiceCollection = client.db('carservices').collection('carservice');
      const OrderCollection = client.db('carservices').collection('order');
      app.get('/services',async(req,res)=>{
        const query = {}
        const cursor = ServiceCollection.find(query);
        const result =   await cursor.toArray();
        res.send(result);

      })
      app.get('/services/:id',async(req,res)=>{
        const id = req.params;
        const query = {_id:ObjectId(id)}
        const cursor = ServiceCollection.find(query);
        const result =   await cursor.toArray();
        res.send(result);

      })
      app.post('/services',async(req,res)=>{
        const product = req.body;
        const result = await ServiceCollection.insertOne(product);
        res.send(result);

      })
      app.delete('/services/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id:ObjectId(id)};
        const result = await ServiceCollection.deleteOne(query);
        res.send(result)
      })
      app.post('/order',async(req,res)=>{
        const product = req.body;
        const result = await OrderCollection.insertOne(product);
        res.send(result);
      })
      app.get('/order',async(req,res)=>{
        const email = req.query.email;
        // console.log(email)
        // const query = {}
        // const cursor = OrderCollection.find(query);
        // const result =  await cursor.toArray();
        // res.send(result);
        const query ={email : email}
        const cursor = OrderCollection.find(query)
        const result = await cursor.toArray()
        res.send(result);

      })
  }
  finally{

  }
  
}
run().catch(console.dir);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})