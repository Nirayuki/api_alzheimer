const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.send('Você está no init!');
})


module.exports = router;