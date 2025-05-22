
import { gql } from 'apollo-server-express'
import { quotes, users } from "./fakedb.js"

const typeDefs=gql`
type Query{
users:[User]
user(_id:ID!):User
quotes:[QuoteWithName]
iquote(by:ID!):Quote
myProfile:User

}
type QuoteWithName{
name:String
by:Idname

}
type Idname{
_id:String
firstname:String
lastname:String
}

type User{
_id:ID!
firstname:String
lastname:String
email:String
quotes:[Quote]
}

type Quote{
name:String
by:ID
}

type Token{
token:String
}


type Mutation{
signupUser(userNnew:UserInput):User
loginUser(userSignIn:loginUserInput!):Token
createQuote(name:String!):String

}



input UserInput{
firstname:String!
lastname:String!
email:String!
password:String!
}

input loginUserInput{

email:String!
password:String!

}
`

export default typeDefs