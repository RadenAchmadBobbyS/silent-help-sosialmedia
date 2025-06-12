const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongo");

class HelpModel {
  static collection() {
    return getDatabase().collection("helpReports");
  }

  static async createHelpReport(input) {
    const newReport = {
      userId: new ObjectId(input.userId),
      triggerType: input.triggerType, // "gesture" | "ai" | "wearable"
      message: input.message || null,
      audioUrl: input.audioUrl || null,
      location: input.location
        ? {
            lat: input.location.lat,
            lng: input.location.lng,
          }
        : null,
      riskLevel: input.riskLevel || null, // "low" | "medium" | "high"
      deviceInfo: input.deviceInfo || null, // { type, os, model }
      status: "pending", // default status
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await this.collection().insertOne(newReport);

    return {
      ...newReport,
      _id: result.insertedId.toString(),
      userId: newReport.userId.toString(),
    };
  }

  static async getHelpReportsByUser(userId) {
    const reports = await this.collection()
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();

    return reports.map((report) => ({
      ...report,
      _id: report._id.toString(),
      userId: report.userId.toString(),
    }));
  }

  static async getHelpReportById(id) {
    const report = await this.collection().findOne({ _id: new ObjectId(id) });
    if (!report) return null;

    return {
      ...report,
      _id: report._id.toString(),
      userId: report.userId.toString(),
    };
  }

  static async updateHelpReportStatus(id, status) {
    const result = await this.collection().updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      }
    );

    return result.modifiedCount === 1;
  }
}

module.exports = HelpModel;