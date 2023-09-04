for(let i = 6; i > 0; i--) {
    axios.get(`https://swapi.dev/api/planets/?page=${i}`)
    .then((resp) => {
        for(let planet of resp.data.results) {
            console.log(planet.name);
        }
    })
    .catch((err) => {
        console.log(err);
    })
}
