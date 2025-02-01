


const express = require('express');
const authMiddleware = require('../middleware/auth');
const { createShortenedLink, getUserLinks, redirectLink ,editUrl,deleteUrl,getSearchUrl,dashboard} = require('../controllers/linkController');
const router = express.Router();


router.post('/create', authMiddleware, createShortenedLink);
router.get('/geturl', authMiddleware, getUserLinks);
router.get('/dashboard',authMiddleware,dashboard);
router.get("/search/:searchQuery", authMiddleware, getSearchUrl);
router.get('/:shortened_url', redirectLink);
router.put("/edit/:id", authMiddleware, editUrl);

router.delete("/delete/:id", authMiddleware, deleteUrl);






module.exports = router;
