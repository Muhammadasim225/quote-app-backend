import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
import express from 'express';
import { createServer } from 'http';
const app=express();
const port=process.env.PORT || 4000
const httpServer=createServer(app);
app.use(cors({
    origin: "*", // Or set your frontend domain like 'https://your-vercel-url.vercel.app'
    credentials: true
  }));
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import typeDefs from './schemaGql.js'
import resolver from './resolver.js';
import conn from './config/db.js';
// import { verify } from "jsonwebtoken";
// const frontendPath = path.resolve(__dirname, '../frontend/dist');

const server=new ApolloServer({
    typeDefs,
    resolvers:resolver,
    context:({req})=>{
        const {authorization}=req.headers;
        if(authorization){
            const {userId}=jwt.verify(authorization,process.env.JWT_SECRET)
            return {userId}
        }

    },
    plugins:[
        // ApolloServerPluginDrainHttpServer({httpServer}),
        // process.env.NODE_ENV !== 'production' ?  ApolloServerPluginLandingPageGraphQLPlayground() : ApolloServerPluginLandingPageDisabled()
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageGraphQLPlayground()

        // ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

// if(process.env.NODE_ENV==='production'){
//     app.use(express.static(frontendPath));
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(frontendPath, 'index.html'));
//     });
// }
await server.start();
server.applyMiddleware({
    app,
    path:'/graphql'
})
httpServer.listen({port},'0.0.0.0',()=>{
    console.log(`Server ready at 4000 ${server.graphqlPath}`)

})
// server.listen().then(({ url }) => {
//     console.log(`Server ready at ${url}`);
//   });
