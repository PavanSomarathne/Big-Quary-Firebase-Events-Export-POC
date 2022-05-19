const express = require("express"); //Import the express dependency
const app = express(); //Instantiate an express app, the main work horse of this server
const port = 5001; //Save the port number where your server will be listening
const bodyParser = require("body-parser")
const cors = require('cors')
// Imports the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');

const bigqueryClient = new BigQuery({
  projectId: 'superapp-wow-mobile',
  keyFilename: './sa-google-key.json'
});
const datasetId = 'superapp_events';
const tableId = 'events';

app.use(bodyParser.urlencoded({ encoded: true }))
app.use(bodyParser.json());
app.use(cors())

async function listDatasets() {
  const [datasets] = await bigqueryClient.getDatasets();
  const data = bigqueryClient.getProjectId();
  console.log('Datasets:');
  datasets.forEach(dataset => console.log(dataset.id));
  return data;
}
// listDatasets();

async function listTables() {
  const [tables] = await bigqueryClient.dataset(datasetId).getTables();
  console.log('Tables:');
  tables.forEach(table => console.log(table.id));
}
// listTables();

async function listsRow() {
  const table = bigqueryClient.dataset(datasetId).table(tableId);
  const [metadata] = await table.getMetadata();
  console.log(metadata);
}
// listsRow();

// Run the query
async function rows() {
  const sqlQuery = `SELECT event_name, event_bundle_sequence_id, user_pseudo_id, platform FROM \`superapp-wow-mobile.analytics_302164004.events_20220517\` LIMIT 100`;
  const options = {
    query: sqlQuery,
  };
  const [rows] = await bigqueryClient.query(options);
  return rows
}

app.get("/", (req, res) => {
  //get requests to the root ("/") will route here
  res.sendFile("index.html", { root: __dirname }); //server responds by sending the index.html file to the client's browser
});

app.post("/tableDatas", async (req, res) => {
  const events = await rows();
  res.status(200).send(events);
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});