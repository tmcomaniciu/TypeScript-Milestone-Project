import express, { Router, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import cloudinary from "cloudinary";
import Campsite from "../models/campsite";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

interface ExtendedRequest extends Request {
  userId?: string;
}

const router: Router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("state").notEmpty().withMessage("State is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: ExtendedRequest, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newCampsite = req.body;

      const imageUrls = await uploadImages(imageFiles);

      newCampsite.imageUrls = imageUrls;
      newCampsite.lastUpdated = new Date();
      newCampsite.userId = req.userId;

      const campsite = new Campsite(newCampsite);
      await campsite.save();

      res.status(201).send(campsite);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
