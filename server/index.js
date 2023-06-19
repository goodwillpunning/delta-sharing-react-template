const express = require('express');
const bodyParser = require('body-parser');
const {
  SharingClient,
  DeltaSharingProfile,
  Share,
  Schema,
  Table,
  DeltaSharingReader,
  DataSharingRestClient
} = require('delta-sharing');
const jsonString = `
{
    "shareCredentialsVersion": 1,
    "endpoint": "https://sharing.delta.io/delta-sharing/",
    "bearerToken": "faaie590d541265bcab1f2de9813274bf233"
}
`;
const sharingProfile = DeltaSharingProfile.fromJson(jsonString);
const restClient = new DataSharingRestClient(sharingProfile);

// Create a Sharing Client to interact with the Sharing Server
const client = new SharingClient(sharingProfile);

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

function transpose(matrix) {
  return matrix.reduce((prev, next) => next.map((item, i) =>
    (prev[i] || []).concat(next[i])
  ), []);
}

app.get('/getShares', (req, res) => {
  // List all available shares
  client.listSharesAsync().then(function(shares) {
    let sharesList = [];
    shares.map(function(share) {
      sharesList.push(share.shareName.toString());
    });
    res.json({ shares: sharesList});
   })
});

app.post('/getTables', (req, res) => {
  const shareName = req.body.shareName;
  let schemasList = [];
  let tablesList = [];
  const share = new Share(shareName);
  // First, list all the available schemas
  client.listSchemasAsync(share).then((schemas) => {
    schemas.forEach((schema) => {
      schemasList.push(schema.schemaName.toString());
        // Next, list the available tables under each schema
        schemasList.forEach((schemaName) => {
          const schemaObject = new Schema(schemaName, shareName);
          client.listTablesAsync(schemaObject).then((tables) => {
            tables.map(function(table) {
              const schemaName = table.schema.toString();
              const tableName = table.tableName.toString();
              tablesList.push(schemaName + '.' + tableName);
            });
            res.json({ tables: tablesList });
          })
        });
    });
  })
});

app.post('/getTableRows', (req, res) => {
  const shareName = req.body.shareName;
  const schemaName = req.body.schemaName;
  const tableName = req.body.tableName;
  const table = new Table(tableName, shareName, schemaName);
  console.log('Loading table: ' + table.toString());
  const reader = new DeltaSharingReader(table, restClient);
  reader.createDataArray().then(function(tableRows) {
    // Truncate the output to the first 100 rows
    if (tableRows.length > 100) 
      tableRows = tableRows.slice(0, 100);
    // Create a table header from dictionary keys
    let rawKeys = Object.keys(tableRows[0]);
    if (rawKeys.length > 5)
      rawKeys = rawKeys.slice(0, 5);
    const headerContent = [];
    rawKeys.forEach((col) => {
      headerContent.push(['<b>' + col + '</b>']);
    });
    // Parse the row content
    const parsedRows = [];
    tableRows.forEach((row) => {
      const rowArr = [];
      rawKeys.forEach((key) => {
          if (row.hasOwnProperty(key))
            rowArr.push(row[key]);
      });
      parsedRows.push(rowArr);
    });
    // Send back a response containing header and rows
    res.json({
      header: headerContent,
      values: transpose(parsedRows)
    });
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
