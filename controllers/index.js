const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
// separate api routes and get routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;