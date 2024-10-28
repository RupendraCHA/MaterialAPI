const express = require("express");
const axios = require('axios');
const mongoose = require('mongoose');

const app = express()
app.use(express.json())

// MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/materialDB';

// Define a schema for the material data
const materialSchema = new mongoose.Schema({
    Material: String,
    Description: String,
    // Add more fields as per your JSON structure
});

// Create a model
const Material = mongoose.model('Material', materialSchema);


const fetchDataAndStore = async () => {
  const username = 'NikhilA';
  const password = 'Nikhil@12345';
  const authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');


  try {
    const response = await axios.get('http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/ZMATERIAL_SRV/MaterialSet?$format=json', {
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json',
      }
    });
    
    // console.log(response.data)
    console.log("Results are given")
  } catch (error) {
    console.error('Error fetching or storing data:', error);
  }
};

app.get("/materials", async (req, res) => {
  const username = 'NikhilA';
  const password = 'Nikhil@12345';
  const authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

  try {
    const response = await axios.get('http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/ZMATERIAL_SRV/MaterialSet?$format=json', {
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json',
      }
    });
    response.json({data : response.data})
  } catch (error) {
    console.error('Error fetching or storing data:', error);
  }
})

// Function to fetch data from the API
// const fetchDataAndStore = async () => {
//     try {
//         // Fetch data from the given URL
//         const authData = {
//             username: "NikhilA",
//             password: "Nikhil@12345"
//         }
//         const response = await axios.get('http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/ZMATERIAL_SRV/MaterialSet?$format=json', authData);
//         const materials = response.data.d.results; // Adjust this based on the actual structure of the JSON response

//         // Store each material in MongoDB
//         for (let material of materials) {
//             const newMaterial = new Material({
//                 Material: material.Material,
//                 Description: material.Description,
//                 // Map other fields as needed
//             });

//             await newMaterial.save();
//         }

//         console.log('Data stored successfully!');
//     } catch (error) {
//         console.error('Error fetching or storing data:', error);
//     }
// };

// Connect to MongoDB and execute the function

const connectDB = async () => {
  await mongoose.connect(mongoURL)
  .then(() => {
      console.log('Connected to MongoDB');
      fetchDataAndStore();
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
}

connectDB();


app.listen(3500, () => {
  console.log(`Server is running on http:/localhost:3500/`)
})