import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find({}).lean();
    console.log(`Found ${restaurants.length} total restaurants in database`);
    
    res.json({
      data: restaurants,
      total: restaurants.length
    });
  } catch (error) {
    console.log("Error in getAllRestaurants:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    console.log(`Searching for restaurants in city: ${city}`);
    console.log(`Search query: ${searchQuery}`);
    console.log(`Selected cuisines: ${selectedCuisines}`);

    let query: any = {};

    // City search - case insensitive
    query["city"] = new RegExp(city, "i");

    // Add restaurant name or cuisine search if provided
    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    // Add cuisine filter if provided
    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine.trim(), "i"));

      if (query["$or"]) {
        // If we already have $or for search, we need to combine with $and
        query = {
          $and: [
            { city: new RegExp(city, "i") },
            { cuisines: { $in: cuisinesArray } },
            { $or: query["$or"] }
          ]
        };
      } else {
        query["cuisines"] = { $in: cuisinesArray };
      }
    }

    console.log("Final query:", JSON.stringify(query, null, 2));

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Get restaurants with the query
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);

    console.log(`Found ${total} restaurants`);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("Error in searchRestaurant:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  getRestaurant,
  getAllRestaurants,
  searchRestaurant,
};
