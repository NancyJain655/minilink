
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
  const { page = 1, limit = 8 } = req.query;
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
}





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
    const device = parser.getDevice().model || "Unknown Device";

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
}

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
}
const searchUrl= async (req, res) => {
  const { page = 1, limit = 8, search = "" } = req.query; // Capture the search query from the request
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);

    // Define the search query, focusing only on the 'remarks' field
    const searchQuery = search
      ? { remarks: { $regex: search, $options: 'i' } }  // Case-insensitive match for 'remarks'
      : {}; // If no search term, return all

    const urls = await ShortUrlModel.find({ user_id: userId, ...searchQuery })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalLinks = await ShortUrlModel.countDocuments({ user_id: userId, ...searchQuery });

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
      error:
        "An error occurred while fetching the links. Please try again later.",
    });
  }
}


module.exports = { createShortenedLink, getUserLinks, redirectLink ,editUrl,deleteUrl,searchUrl};
