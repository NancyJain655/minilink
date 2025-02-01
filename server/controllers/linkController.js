
const shortid = require('shortid');
const ShortUrlModel = require('../models/shortUrl');
const mongoose = require('mongoose');
const { request } = require('express');
const UAParser = require("ua-parser-js");


const createShortenedLink = async (req, res) => {
  const { original_url, remarks, expirationdate } = req.body;
  if (!original_url) {
    return res.status(400).json({
        status: 'error',
        msg: "Destination URL is required."
    });
}
  

  try {
    const shortened_url = shortid.generate();
    const newLink = new ShortUrlModel({
      original_url,
      shortened_url,
      user_id: req.user.id,  // Referencing user field in your schema
      remarks,
      expirationdate: expirationdate || null,
    });

    await newLink.save();
   
    return res.status(201).json({
      status: 'success',
      msg: "Short URL created successfully.",
      data: {
        original_url: newLink.original_url,
        shortened_url: `${req.headers.host}/${newLink.shortened_url}`,
          expirationdate: newLink.expirationdate,
          userId: newLink.userId,
      },
  });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const getUserLinks = async (req, res) => {
  const { page = 1, limit = 7 } = req.query;
  try { 
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const userId =  new mongoose.Types.ObjectId(req.user.id);
      const urls = await ShortUrlModel.find({user_id: userId})
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(parseInt(limit));

      const totalLinks = await ShortUrlModel.countDocuments({user_id: userId });

      return res.status(200).json({
          message: "Links fetched successfully.",
          data: {
              urls,
              pagination: {
                  totalLinks,
                  currentPage: parseInt(page),
                  totalPages: Math.ceil(totalLinks / limit),
              },
          },
      });
  } catch (err) {
      console.error("Error fetching links:", err);
      return res.status(500).json({
          error: "An error occurred while fetching the links. Please try again later.",
      });
  }
};





const redirectLink = async (req, res) => {
  const shortened_url = req.params.shortened_url;

  try {
    const link = await ShortUrlModel.findOne({ shortened_url: new RegExp(`^${shortened_url}$`, 'i') });

    if (!link) return res.status(404).json({ msg: "Link not found" });

    if (link.expirationdate && new Date() > link.expirationdate) {
      await link.remove();
      return res.status(404).json({ msg: "Link has expired" });
    }

    // Parse User-Agent to get OS, browser, and device
    const userAgent = req.headers["user-agent"];
    const parser = new UAParser(userAgent);
    const os = parser.getOS().name || "Unknown OS"; 
    const browser = parser.getBrowser().name || "Unknown Browser"; 
    const browserVersion = parser.getBrowser().version || "Unknown Version";
    const device = req.device.type || "Unknown Device";

    // Collecting click data
    const clickData = {
      timestamp: new Date(),
      ipAddress: req.headers["x-forwarded-for"]
        ? req.headers["x-forwarded-for"].split(",")[0].trim()
        : req.ip,
      device,
      os,
      browser,
      browserVersion,
    };

    console.log("Click Data:", clickData);
    link.clicks.push(clickData);
    await link.save();

    res.redirect(link.original_url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const editUrl = async (req, res) => {
  const { id } = req.params; // ID of the link to be updated
  console.log(id);
  
  const { original_url, remarks, expirationdate } = req.body;
  if (!original_url && !remarks && !expirationdate) {
      return res.status(400).json({
          status: 'error',
          msg: "At least one field is required for update.",
      });
  }

  try {
    const userId = (req.user.id);
    console.log(userId);
      const link = await ShortUrlModel.findOne({ _id: id, user_id: userId });

      if (!link) {
          return res.status(404).json({
              status: 'error',
              msg: "Link not found or you do not have permission to edit this link.",
          });
      }

      // Update fields only if they are provided
      if (original_url) link.original_url = original_url;
      if (remarks) link.remarks = remarks; // Assumes a `remarks` field exists in the schema
      if (expirationdate) link.expirationdate = new Date(expirationdate);
      // Save the updated link
      await link.save();

      return res.status(200).json({
          status: 'success',
          msg: "Link updated successfully.",
          data: {
              id: link._id,
              original_url: link.original_url,
              remarks: link.remarks,
              expirationdate: link.expirationdate,
              shortened_url: link.shortened_url,
          },
      });
  } catch (err) {
      console.error("Error updating link:", err);
      return res.status(500).json({
          status: 'error',
          msg: "An error occurred while updating the link. Please try again later.",
      });
  }
};

const deleteUrl = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const userId =  (req.user.id);
    console.log(userId);
      const link = await ShortUrlModel.findOne({ _id: id, user_id:userId});

      if (!link) {
          return res.status(404).json({
              status: 'error',
              msg: "Link not found or you do not have permission to delete this link.",
          });
      }

      await ShortUrlModel.deleteOne({ _id: id });

      return res.status(200).json({
          status: 'success',
          msg: "Link deleted successfully.",
          data: {
              id: link._id,
              original_url: link.original_url,
              shortened_url: link.shortened_url,
          },
      });
  } catch (err) {
      console.error("Error deleting link:", err);
      return res.status(500).json({
          status: 'error',
          msg: "An error occurred while deleting the link. Please try again later.",
      });
  }
};



const dashboard = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const userId =  new mongoose.Types.ObjectId(req.user.id);
      
      const urls = await ShortUrlModel.find({user_id: userId });

      let totalClicks = 0;
      const dateWiseClicks = {};
      const deviceTypeClicks = {
          desktop: 0,
          mobile: 0,
          tablet: 0,
      };

      if (!urls.length) {
          return res.status(202).json({ 
              status: 'error',
              message: "No URLs found for the user.",
              totalClicks,
              dateWiseClicks,
              deviceTypeClicks,
          });
      }

      
      urls.forEach((url) => {
          totalClicks += url.clicks.length;

          url.clicks.forEach((entry) => {
              const date = entry.timestamp.toISOString().split("T")[0]; 

              if (!dateWiseClicks[date]) {
                  dateWiseClicks[date] = 0;
              }
              dateWiseClicks[date] += 1;
            console.log(entry);
              const userAgent = entry.device;
              if (userAgent.includes("phone")) {
                  deviceTypeClicks.mobile += 1;
              } else if (userAgent.includes("tablet")) {
                  deviceTypeClicks.tablet += 1;
              } else {
                  deviceTypeClicks.desktop += 1;
              }
          });
      });

      res.status(200).json({
          totalClicks,
          dateWiseClicks,
          deviceTypeClicks,
      });
  } catch (error) {
      console.error("Error fetching analytics:", error.message);
      res.status(500).json({ 
          status: 'error',
          message: "Internal server error."
      });
  }
};
const getSearchUrl = async (req, res) => {
  let { search } = req.query;
  const userId = req.user.id;


  try {


    if (typeof search !== 'string') {
      search = ''; // Set it to an empty string to prevent errors
  }
      const urls = await ShortUrlModel.find({
          userId,
          remarks: { $regex:search.trim(), $options: 'i' } // Case-insensitive search
      });

      if (!urls.length) {
          return res.status(404).json({
              status: 'error',
              message: "No URLs found matching the search query.",
          });
      }

      return res.status(200).json({
          status: 'success',
          message: "URLs fetched successfully.",
          data: urls,
      });
  } catch (err) {
      console.error("Error fetching search results:", err);
      return res.status(500).json({
          status: 'error',
          message: "An error occurred while fetching the search results. Please try again later.",
      });
  }
}
// router.get("/", authMiddleware, async (req, res) => {
//   const { query } = req.query;

//   try {
//     if (!query || query.trim() === "") {
//       console.log("Query is missing or empty");
//       return res.status(400).json({ message: "Search query is required" });
//     }

//     const filter = {
//       user: req.user.id,
//       remarks: { $regex: query, $options: "i" }, // Perform regex search
//     };

//     const results = await ShortUrlModel.find(filter);
//     if (results.length === 0) {
//       return res.status(404).json({ message: "No matching links found" });
//     }
//     res.status(200).json({
//       message: "Search results fetched successfully",
//       data: results,
//     });
//   } catch (error) {
//     console.error("Error in /search route:", error.message);
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// });

module.exports = { createShortenedLink, getUserLinks, redirectLink ,editUrl,deleteUrl,getSearchUrl,dashboard};
