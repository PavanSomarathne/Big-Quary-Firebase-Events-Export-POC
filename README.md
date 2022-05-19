# Getting Started with the project

1) Enable BigQuery in firebase project setting's integrations

2) Add google-services.json and service account's key file to the root directory.rename it to google-services.json and sa-google-key.json 

3) Make sure the projectId and keyFilename in BigQuery object

4) Change 'datasetId' and 'tableId'

5) Change the Sql query by using listDatasets(), listTables(), listsRow()

6) `npm install` to install node packages

7) `npm start` to start node server

8) 'http://localhost:5001/tableDatas' [POST] url;
   will return the events array.

9) Before fetching analytic data, make sure you have enough data on the BigQuery Workspace
