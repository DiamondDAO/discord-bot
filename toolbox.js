const { Util } = require('discord.js');


// Import required AWS SDK clients and commands for Node.js.
const { PutObjectCommand, CreateBucketCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require('./s3client.js');

// Function to write to s3
const s3Write = async (path, data) => {
    // Set the parameters
  const params = {
    Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
    Key: path, // The name of the object. For example, 'sample_upload.txt'.
    Body: data, // The content of the object. For example, 'Hello world!".
  };

  const run = async () => {
    try {
      const results = await s3Client.send(new PutObjectCommand(params));
      console.log(
          "Successfully created " +
          params.Key +
          " and uploaded it to " +
          params.Bucket +
          "/" +
          params.Key
      );
      return results; // For unit tests.
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();
};

// Function to write data to file named after a given attribute
const writeData = async (data, path, name, uidAttribute = 'id') => {

    const timestamp = + new Date();
    const jsonPath = `discord/${path}/${name}_${data[uidAttribute]}_${timestamp}.json`;

    // writes files as $name_$DiscordUID_timestamp
    data.recordTimestamp = + new Date();

    // add the timestamp attribute to the data
    const strigifiedData = JSON.stringify(data, (key, value) => typeof value === 'bigint' ? value.toString() : value);

    await s3Write(jsonPath, strigifiedData);

  };


  // function to take data from a collection
  const outputCollectionRecords = (collection, directory, uidAttribute, callback) => {
    // For each object in the collection, flatten and write it to a JSON in <directory>
    collection.forEach( item => writeData(Util.flatten(item), directory, '', uidAttribute));
    // callback for retrieving data nested within this object
    if(callback != undefined){
        collection.forEach(item => callback(item));
    }
  };




const writeEventToFile = (data, eventName, path, uidAttribute = 'id', callback) => {
  if(data != undefined){
    let flat = Util.flatten(data); // flatten the data
    if(callback != undefined){ //
      callback(flat, data);
      }

    writeData(flat, path, eventName);

  }
  else {console.log('Data for ', eventName, ' is undefined')};
};



module.exports = { writeData, outputCollectionRecords, writeEventToFile };
