import { developmentStage, productionStage } from "../utils/constants"
const dotenv = require('dotenv')
dotenv.config({ path: process.env.NODE_ENV === productionStage ? '.env.production' : '.env.development' })
const ENV = process.env.NODE_ENV || developmentStage
// if (process.env.NODE_ENV === productionStage) {
//   dotenv.config({ path: '.env.production' })
// } else {
//   dotenv.config({ path: '.env.development' })
// }
export type ServerConfig = {
  app: {
    URL: string,
    PORT: string | number,
    API_VERSION: string,
    CLIENT_URL: string
  },
  db: {
    MONGO_URL: string,
    PORT_MONGO_DB: string | number
  },
  auth0: {
    AUDIENCE: string | undefined,
    ISSUER: string | undefined,
    ISSUER_TOKEN: string | undefined
  }
}

type ConfigEnv = {
  [key: string]: ServerConfig
}

const CONFIG: ConfigEnv = {
  development: {
    app: {
      URL: `http://${process.env.IP_SERVER}:${process.env.PORT_SERVER}/api/${process.env.API_VERSION}`,
      PORT: process.env.PORT_SERVER || 4000,
      API_VERSION: process.env.API_VERSION || 'v1',
      CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000'
    },
    db: {
      MONGO_URL: `mongodb://${process.env.IP_SERVER}:${process.env.PORT_MONGO_DB}/${process.env.DB_NAME}`,
      PORT_MONGO_DB: process.env.PORT_MONGO_DB || 27017
    },
    auth0: {
      AUDIENCE: process.env.AUTH0_AUDIENCE,
      ISSUER: process.env.AUTH0_ISSUER,
      ISSUER_TOKEN: process.env.AUTH0_ISSUER_TOKEN
    },
  },
  production: {
    app: {
      URL: `http://${process.env.IP_SERVER}${process.env.PORT_SERVER}/api/${process.env.API_VERSION}`,
      PORT: process.env.PORT_SERVER || 4006,
      API_VERSION: process.env.API_VERSION || 'v1',
      CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000'
    },
    db: {
      MONGO_URL: `mongodb://${process.env.DB_USER_PASSWORD}@${process.env.IP_SERVER}:${process.env.PORT_MONGO_DB}/${process.env.DB_NAME}?authSource=admin`,
      PORT_MONGO_DB: process.env.PORT_MONGO_DB || 27017
    },
    auth0: {
      AUDIENCE: process.env.AUTH0_AUDIENCE,
      ISSUER: process.env.AUTH0_ISSUER,
      ISSUER_TOKEN: process.env.AUTH0_ISSUER_TOKEN
    },
  }
}

module.exports = CONFIG[ENV] as ServerConfig