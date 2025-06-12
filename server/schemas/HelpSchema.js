const { gql } = require("@apollo/server");
const HelpModel = require("../models/HelpModel");

const typeDefs = `#graphql

  scalar Date

  type Location {
    lat: Float
    lng: Float
  }

  type HelpReport {
    _id: ID
    userId: ID
    triggerType: String
    message: String
    audioUrl: String
    location: Location
    createdAt: Date
    updatedAt: Date
    status: String
  }

  input LocationInput {
    lat: Float
    lng: Float
  }

  input CreateHelpInput {
    userId: ID!
    triggerType: String!
    message: String
    audioUrl: String
    location: LocationInput
  }

  type Query {
    helpReports(userId: ID!): [HelpReport]
    helpReportById(id: ID!): HelpReport
  }

  type Mutation {
    createHelpReport(input: CreateHelpInput!): HelpReport
    updateHelpReportStatus(id: ID!, status: String!): HelpReport
  }
`;

const resolvers = {
  Query: {
    helpReports: async (_, { userId }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      if (context.user._id !== userId) throw new Error('Forbidden');
      return await HelpModel.getHelpReportsByUser(userId);
    },
    helpReportById: async (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      return await HelpModel.getHelpReportById(id);
    },
  },

  Mutation: {
    createHelpReport: async (_, { input }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      if (input.userId !== context.user._id) throw new Error('Forbidden');
      return await HelpModel.createHelpReport(input);
    },
    updateHelpReportStatus: async (_, { id, status }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      return await HelpModel.updateHelpReportStatus(id, status);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
