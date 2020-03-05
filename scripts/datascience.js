

async function getData(congress, state) {

    const url = (`http://localhost:5000/api/gethousebillsbystate/${congress}/${state}`);

    const response = fetch(url).then(res => res.json()).then(json => data = json)
}