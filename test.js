const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const React = require('react'); // You cannot use ES6 import syntax here

require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



async function handleOnClick() {
  console.log("Hi from click");
  const options = {
    method: 'POST',
    url: 'https://chatgpt-api8.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '297f284233mshb46d835f69da66dp18aa49jsnd187e5bbfb2b',
      'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'
    },
    data: [
      {
        content: 'who won the super bowl 2019?',
        role: 'user'
      }
    ]
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);

  } catch (error) {
    console.error(error);
  }
}

// Don't call handleOnClick() here, it should be called within a component or a route
handleOnClick();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
