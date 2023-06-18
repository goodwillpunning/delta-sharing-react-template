const express = require('express');
const cors = require('cors');
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
app.use(cors());

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

app.get('/getTables', (req, res) => {
  // TODO: parse share name from request
  const shareName = 'delta_sharing'
  let schemasList = [];
  let tablesList = [];
  const share = new Share('delta_sharing');
  // First, list all the available schemas
  client.listSchemasAsync(share).then((schemas) => {
    schemas.forEach((schema) => {
      schemasList.push(schema.schemaName.toString());
        // Next, list the available tables under each schema
        schemasList.forEach((schemaName) => {
          const schemaObject = new Schema(schemaName, shareName);
          client.listTablesAsync(schemaObject).then((tables) => {
            tables.map(function(table) {
              tablesList.push(table.tableName.toString());
            });
            res.json({ tables: tablesList });
          })
        });
    });
  })
});

app.get('/getDataFrame', (req, res) => {
  // TODO: get table name from request
  const table = new Table('boston-housing', 'delta_sharing', 'default');
  const reader = new DeltaSharingReader(table, restClient);
  reader.createDataFrame().then(function(df) {
    res.json({ dataframe: df })
  })
});

app.get('/hello', (req, res) => {
  res.json({ message: "Well hellooo there!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
