const express = require('express');
const cors = require('cors');
const {
  SharingClient,
  DeltaSharingProfile,
  Share,
  Schema,
  Table
} = require('delta-sharing');
const jsonString = `
{
    "shareCredentialsVersion": 1,
    "endpoint": "https://sharing.delta.io/delta-sharing/",
    "bearerToken": "faaie590d541265bcab1f2de9813274bf233"
}
`;
const sharingProfile = DeltaSharingProfile.fromJson(jsonString);

// Create a Sharing Client to interact with the Sharing Server
const client = new SharingClient(sharingProfile);

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.get('/getShares', (req, res) => {
  // List all available shares
  client.listSharesAsync().then(function(shares) {
    var sharesList = [];
    shares.map(function(share) {
      sharesList.push(share.shareName.toString());
    });
    res.json({ shares: sharesList});
   })
});

app.get('/getSchemas', (req, res) => {
  const share = new Share('delta_sharing');
  client.listSchemasAsync(share).then(function(schemas) {
    var schemasList = [];
    schemas.map(function(schema) {
      schemasList.push(schema.schemaName.toString());
    });
    res.json({ schemas: schemasList});
  })
});

app.get('/hello', (req, res) => {
  res.json({ message: "Well hellooo there!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
