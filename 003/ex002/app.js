const checkStatusAndParseData = (response) => {
    if (!response.ok) {
        throw new Error(`Status Code Error: ${response.status}`);
    }
    return response.json()
}

const printPlanetNames = (data) => {
    for (let planet of data.results) {
        console.log(planet.name);
    }
}
for (let i = 1; i < 7; i++) {
    fetch(`https://swapi.dev/api/planets/?page=${i}`)
    .then(checkStatusAndParseData)
    .then(printPlanetNames)
    .catch((err) => {
        console.log("SOMETHING WENT WRONG WITH FETCH!")
        console.log(err);
    })
}
