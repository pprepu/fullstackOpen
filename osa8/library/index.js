const { ApolloServer, AuthenticationError, UserInputError, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const jwt = require('jsonwebtoken')

const JWT_SECRET = "SEGRET_KEY"
// db->
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://fullstack:fullst4ck@cluster0-bvxvd.mongodb.net/library-app?retryWrites=true'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
// /db

const typeDefs = gql`
  type Book {
    title: String!
    published: Int 
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    hello: String!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author!
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {

  Author: {
    bookCount: async (root) => {
      let books = await Book.find({})
      const count = books.reduce((acc, cur) => {
        // implicit type coercion..
        if (cur.author == root.id) {
          acc++
        }
        return acc
      }, 0)
      return count
    }
  },

  Book: {
    author: (root) => {
      return {
        name: root.author.name
      }
    },
  },

  Query: {
    hello: () => { return "world" },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {

      const allBooks = await Book.find({}).populate('author')
      // console.log(allBooks)
      // allBooks.forEach(b => console.log(b.author))
      if (!args.genre) {
        return allBooks
      }
      
      return allBooks
        .filter(book => book.genres.includes(args.genre))
    },

    allAuthors: async () => {
      const allAuthors = await Author.find({})
      // console.log('allAuthors: ', allAuthors)
      return allAuthors
    },

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated - please login")
      }
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        const newAuthor = new Author( { name: args.author })
        author =  await newAuthor.save()
      }
      //const author = { name: args.author }
      const book = new Book({ ...args, author})

      try {
        await book.save() 
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book

    },

    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated - please login")
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      // const newAuthor = {
      //   name: author.name,
      //   born: args.setBornTo,
      // }

      // const returnedAuthor = await Author.findByIdAndUpdate(author.id, newAuthor, {new: true})

      // return returnedAuthor

      author.born = args.setBornTo

      try {
        await author.save() 
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },

    createUser: async (root, args) => {
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return await user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
        })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})