const express = require('express');
const authMiddleware = require('../middleware/auth');
const { createShortenedLink, getUserLinks, redirectLink } = require('../controllers/linkController');
const router = express.Router();


router.post('/create', authMiddleware, createShortenedLink);
router.get('/geturl', authMiddleware, getUserLinks);
router.get('/:shortened_url', redirectLink);


module.exports = router;
