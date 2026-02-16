import { connect } from "mongoose"

let mongo_uri = process.env.MONGO_URI || ""
if (!mongo_uri)
  throw new Error("Please define the MONGO_URI environment variable inside .env.local")

let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const dbConnect = async () => {
  if (cached.conn) {
    console.log('cached DB connected')
    return cached.conn
  }
  if (!cached.promise)
    cached.promise = connect(mongo_uri).then((c) => c.connection)
  try {
    cached.conn = await cached.promise
    console.log('DB connected')
    return cached.conn
  } catch (error) { throw error }
}

export default dbConnect
