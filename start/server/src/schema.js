const { gql } = require('apollo-server');

const typeDefs = gql`
  # Your schema will go here
  # 声明的字段后面加(!)表示该字段永远不可为空
  # 声明的字段类型如果用[]包裹，则表示该字段是一个数组字段
  type Launch {
      id: ID!   
      site: String
      mission: Mission
      rocket: Rocket
      isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }
  type User {
    id: ID!
    email: String!
    trips: [Launch]!
    token: String
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }
  enum PatchSize {
    SMALL
    LARGE
  }
  # 上面的任务类型的missionPatch字段有一个名为size的参数，它是enum类型PatchSize。
  # 在查询接受参数的字段时，字段的值可以根据所提供参数的值而变化。
  # 在这种情况下，您为size提供的值将决定返回任务相关补丁的大小(SMALL or LARGE)。

  # The Query type
  # 该查询类型定义了三个可供客户端执行的查询
  type Query {
      launches: [Launch]!
      launch(id: ID!): Launch
      me: User
  }

  # The Mutation type
  #突变类型是一种特殊的query类型
  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!    #允许登录的用户book trip
    cancelTrip(launchId: ID!): TripUpdateResponse!      #允许登录的用户cancel trip
    login(email: String): User                          #用户登录
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
 }

`;

module.exports = typeDefs;
