var options = {
  method: 'GET',
  url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
  // params: {ingr: 'apple'},
  headers: {
    'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com',
    'X-RapidAPI-Key': '948b6dd5b9mshb4da007de990f34p1551e4jsn6ef3514cf41e'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});