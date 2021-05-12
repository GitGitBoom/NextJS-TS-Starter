import mongoose from 'mongoose'
import pick from 'lodash/pick'

/**
 * User Roles
 */
enum Role {
  'user' = 'user',
  'admin' = 'admin',
}
const roles = ['user', 'admin']

/**
 * Tranformed props
 */
const publicProperties = ['name', 'email', 'role'] as const

// Property Union Types
export type PublicProperty = typeof publicProperties[number]
export type PublicUser = Pick<Document, PublicProperty>

/**
 * Base User Interface
 */
export interface User {
  email: string
  name: string
  address: string
  role: Role
}

/**
 * User Document Interface w/ generated fields + methods
 */
export interface Document extends User, mongoose.Document {
  transform(): PublicUser
}

/**
 * User Model Interface w/ static methods
 */
export interface Model extends mongoose.Model<Document> {
  getRoles(): typeof roles
}

/**
 * User Schema
 */
const userSchema = new mongoose.Schema<Document, Model>(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      maxlength: 128,
      required: true,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    first_name: {
      type: String,
      maxlength: 16,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    last_name: {
      type: String,
      maxlength: 16,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
    },

    roles: [
      {
        type: String,
        enum: roles,
        default: 'user',
      },
    ],
  },
  {
    timestamps: true,
  }
)

/**
 * Methods
 */
userSchema.method({
  /**
   * Get public json-able public properties for this user
   * @return {Object<User>}
   */
  transform(): PublicUser {
    return pick(this, publicProperties)
  },
})

/**
 * Statics
 */
userSchema.statics = {
  getRoles: (): typeof roles => roles,
}

/**
 * Due to the nature of Next.js
 * the model may or may not already be initialized
 * Export the already initialized model or create it
 */
const UserModel: mongoose.Model<Document> =
  mongoose.models.user || mongoose.model<Document>('user', userSchema)
export default UserModel
