const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const DATA = 'api_techician_response_data.json';

let dataIndex = 0;

/*Routes*/

//GET say Hello
router.get('/', function(req, res, next) {
  return res.status(200).send( { message: "Hello World" } );
});


//GET technicians
router.get('/from_file', getTechnicians);
router.get('/:id/technicians', getTechnicians);
async function getTechnicians(req, res, next) {  
  let data = await fromFile();
  return res.status(200).send(data);
}

/*Logic*/
async function fromFile() {
  let data = await fs.readFile(`${appRoot}/data/${DATA}`);
  let jsonData = JSON.parse(data);

  if(jsonData[dataIndex] == undefined){
      dataIndex = 0;
  }
  console.log(dataIndex);
  return jsonData[dataIndex++];
}

module.exports = { router,  fromFile };
