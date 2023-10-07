const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

require('dotenv').config()

const app = express();
const port = 3000;

let output = "";

async function handleOnClick(str) {
  console.log("Hi from click");
  const options = {
    method: 'POST',
    url: 'https://chatgpt-api8.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'c0f9303e5bmsh2969a9945bfe258p133077jsnf883156d71d5',
      'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'
    },
    data: [
      {
        content: str,
        role: 'user'
      }
    ]
  };

  try {
    const response = await axios.request(options);
    output = JSON.parse(response.data.text); // Parse the JSON response
    console.log(output);

  } catch (error) {
    console.error(error);
  }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit', async (req, res) => {
  const searchQuery =
    req.body.searchField +
    ' for ' +
    req.body.genderField +
    ' with Age ' +
    req.body.ageField +
    ' body size ' +
    req.body.sizeField +
    ' living in ' +
    req.body.locationField;
  
  await handleOnClick("give me output only in json and Generate a JSON object with a key DressIdeas that contains a list of dress ideas suitable for " +  searchQuery);
  
  const dressIdeas = output.DressIdeas;
  const firstDressIdea = dressIdeas[0];
  const response = await axios.get(`https://flipkart-scraper-api.dvishal485.workers.dev/search/${firstDressIdea}`);
  console.log(response);

  res.send(`
    <html>
      <head>
        <title>Search Result</title>
        <style>
          div {
            background-color: grey;
            display: flex;

            justify-content: center;
            align-items: center;
            height: 100vh; /* This ensures the content is vertically centered */      
          }
          .f{
            display:flex;
            flex-direction:column;
            
          }
          .content {
            text-align: center;
          }
        </style>
      </head>
      <body>
      <div >
      <div class = "f">
        <h2>${response.data.result[0].name}</h2>
        <img src=${response.data.result[0].thumbnail}></img>
      </div>
      <div class = "f">
        <h2>${response.data.result[1].name}</h2>
        <img src=${response.data.result[1].thumbnail}></img>
      </div>
      <div class = "f">
        <h2>${response.data.result[2].name}</h2>
        <img src=${response.data.result[2].thumbnail}></img>
      </div>  
        </div>
        </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
