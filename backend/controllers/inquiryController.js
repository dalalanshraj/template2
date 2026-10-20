import Inquiry from "../models/Inquiry.js";

// USER → CREATE INQUIRY

import mongoose from "mongoose";

export const createInquiry = async (req, res) => {
  try {
    const { property, name, email, phone, message, Arrival , Departure , Adults , Kids } = req.body;

    if (!property) {
      return res.status(400).json({ error: "Property is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(property)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }

    const inquiry = await Inquiry.create({
      property,
      name,
      email,
      phone,
      message,
      Arrival,
      Departure,
      Adults,
      Kids,
    });

  const populatedInquiry = await Inquiry.findById(inquiry._id)
  .populate({
  path: "property",
  select: "property.title",
})
  .lean();

console.log("👉 RAW PROPERTY ID:", property);

const listingCheck = await mongoose.model("Listing").findById(property);
console.log("👉 LISTING FOUND:", listingCheck);

console.log("👉 POPULATED RESULT:", populatedInquiry);

    res.status(201).json({
      message: "Inquiry submitted successfully",
      inquiry: populatedInquiry,
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


 // ADMIN → GET ALL INQUIRIES AND MARK AS READ
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate("property")
      .sort({ createdAt: -1 });

    // Mark fetched inquiries as read
    await Inquiry.updateMany(
      { isRead: false },
      { $set: { isRead: true } }
    );

    res.json(inquiries);
  } catch (err) {
    console.error("GET INQUIRIES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
};

// ADMIN → GET UNREAD INQUIRY COUNT
export const getUnreadInquiryCount = async (req, res) => {
  try {
    const count = await Inquiry.countDocuments({ isRead: false });
    res.json({ count });
  } catch (err) {
    console.error("UNREAD COUNT ERROR:", err);
    res.status(500).json({ message: "Failed to fetch unread count" });
  }
};


export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    await Inquiry.findByIdAndDelete(id);

    res.json({ message: "Inquiry deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Delete error" });
  }
};