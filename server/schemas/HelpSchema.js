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
    riskLevel: String
    deviceInfo: String
    status: String
    createdAt: Date
    updatedAt: Date
  }

  input LocationInput {
    lat: Float
    lng: Float
  }

  input CreateHelpInput {
    triggerType: String!
    message: String
    audioUrl: String
    location: LocationInput
    riskLevel: String
    deviceInfo: String
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
      const report = await HelpModel.createHelpReport(input, context.user._id);
      
      // Ambil data user untuk nomor darurat
      const user = await context.user;
      const emergencyPhone = user.emergencyPhone || user.emergencyContact || user.phone || null;
      if (context.io && context.io.notifyEmergencyContact && emergencyPhone) {
        context.io.notifyEmergencyContact(emergencyPhone, report);
      }
      return report;
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
