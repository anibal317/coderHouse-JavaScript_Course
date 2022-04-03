var options = {
  method: 'GET',
  url: 'https://www.thesportsdb.com/api/v1/json/2/all_sports.php',
  // params: {ingr: 'apple'},
  headers: {
  }
};

axios.request(options).then(function (response) {
	console.log(response.data.sports);
}).catch(function (error) {
	console.error(error);
});