const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const DATA = 'api_techician_response_data.json';

let dataIndex = 0;

/* GET say Hello */
router.get('/', function(req, res, next) {
  return res.status(200).send( { message: "Hello World" } );
});

router.get('/from_file', fromFile);
router.get('/:id/technicians', fromFile);
async function fromFile(req, res, next) {
    let data = await fs.readFile(`${appRoot}/data/${DATA}`);
    let jsonData = JSON.parse(data);

    if(jsonData[dataIndex] == undefined){
        dataIndex = 0;
    }
    console.log(dataIndex);
    return res.status(200).send(jsonData[dataIndex++]);
}

module.exports = router;
