const express = require('express');
const router = express.Router();

router.use(require('./sources/roles'));
router.use(require('./sources/departments'));
router.use(require('./sources/manage_employees'));

// Middleware
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;


