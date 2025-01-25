const shortid = require('shortid');
const Link = require('../models/link');

const createShortenedLink = async (req, res) => {
  const { original_url, expiration_date } = req.body;
  const shortened_url = shortid.generate();

  try {
    const newLink = new Link({
      original_url,
      shortened_url,
      user_id: req.user.id,
      expiration_date: expiration_date || null,
    });

    await newLink.save();
    res.json({ newLink });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all links for a user
const getUserLinks = async (req, res) => {
  try {
    console.log("Fetching links for user:", req.user.id);
    const links = await Link.find({ user_id: req.user.id });
    console.log("Links found:", links);
    res.json(links);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

//Redirect to the original URL
const redirectLink = async (req, res) => {
    const shortened_url = req.params.shortened_url;

  try {
    const link = await Link.findOne({ shortened_url: new RegExp(`^${shortened_url}$`, 'i') });

    if (!link) return res.status(404).json({ msg: "Link not found" });

    if (link.expiration_date && new Date() > link.expiration_date) {
      await link.remove();
      return res.status(404).json({ msg: "Link has expired" });
    }

    link.click_count += 1;
    console.log(link.click_count);
    await link.save();
    res.redirect(link.original_url);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};
// const redirectLink = async (req, res) => {
//     const shortId = req.params.shortened_url;
//     const ipAddress = req.ip;
//     const deviceType = req.device.type;
//     const userAgent = req.headers["user-agent"];
//     const parser = new UAParser();
//     const result = parser.setUA(userAgent).getResult();
//     const os = result.os.name;
  
//     const entry = await ShortUrlModel.findOneAndUpdate(
//       { shortId },
//       {
//         $push: {
//           clicks: {
//             timestamp: Date.now(),
//             ipAddress: ipAddress,
//             device: deviceType,
//             os: os,
//           },
//         },
//       },
//       { new: true }
//     );
  
//     if (!entry) {
//       return res.status(404).json({ message: "Short URL not found" });
//     }
  
//     res.redirect(entry.redirectURL);
//   };

module.exports = { createShortenedLink, getUserLinks, redirectLink };
