const axios = require('axios');

const options = {
  method: 'POST',
  url: 'http://localhost:3000/submit', // Replace with your server URL
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
  data: {
    searchField: 'Super Bowl 2019 winner',
    genderField: 'male',
    ageField: '30',
    sizeField: 'medium',
    locationField: 'New York',
  },
};

(async () => {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
})();
