
import express from "express";
import {
  createInquiry,
  getAllInquiries,
  getUnreadInquiryCount,
  deleteInquiry,
} from "../controllers/inquiryController.js";

const router = express.Router();

router.post("/", createInquiry);
router.get("/unread-count", getUnreadInquiryCount);
router.get("/", getAllInquiries);
router.delete("/:id", deleteInquiry);

export default router;
