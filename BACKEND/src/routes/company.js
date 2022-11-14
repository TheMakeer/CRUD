const express = require('express');

const router = express.Router();

//create company
router.post('/company', (req,res) => {
    res.send('Create Company');
});


module.exports = router;

