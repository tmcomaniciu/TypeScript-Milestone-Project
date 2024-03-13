import express, { Router, Request, Response } from "express";
import Campsite from "../models/campsite";

const router: Router = express.Router();

// api/campsites/search
router.get("/search", async (req: Request, res: Response) => {
  try {
    const pageSize: number = 5;
    const pageNumber: number = parseInt(req.query.page ? req.query.page.toString() : "1");
    const skip: number = (pageNumber - 1) * pageSize;

    const campsites = await Campsite.find().skip(skip).limit(pageSize);
    const total: number = await Campsite.countDocuments();

    const response = {
      data: campsites,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Something went wrong(campsites.js)" });
  }
});

export default router;
