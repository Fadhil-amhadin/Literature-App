const express = require('express');
const router = express.Router();

const { addLiterature, getLiteratures, getLiterature, updateLiterature, deleteLiterature, getCancel } = require('../controllers/literature');
const { register, login } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');
const { addCollection, getCollections, deleteCollection } = require('../controllers/collection');
const { updateUser, getUser } = require('../controllers/user');
const { getAnalytics, getAnalytic, addAnalytic, updateUpload, updateDownload } = require('../controllers/analytic');

router.get('/users/:id', auth, getUser)
router.patch('/users', auth, uploadFile("photo"), updateUser)

router.post('/register', register)
router.post('/login', login)

router.post('/literatures/:id', auth, uploadFile("attachment"), addLiterature)
router.delete('/literatures/:id', auth, deleteLiterature)
router.patch('/literatures/:id', auth, updateLiterature)
router.get('/literatures/:id', auth, getLiterature)
router.get('/literatures', auth, getLiteratures)

router.post('/collections', auth, addCollection)
router.get('/collections', auth, getCollections)
router.delete('/collections/:id', auth, deleteCollection)

router.get('/analyticsLog', getAnalytics)
router.get('/analytics', auth, getAnalytics)
router.get('/analytics/:props', auth, getAnalytic)
router.post('/analytics', auth, addAnalytic)
router.patch('/analytics/:id/:props', auth, updateUpload)
router.patch('/analyticsDw/:id/:props', auth, updateDownload)

router.get('/cancel', auth, getCancel)

module.exports = router;