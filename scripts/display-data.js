const urlParams = new URLSearchParams(window.location.search);

const queryParam = decodeURI(urlParams.get('hiddenParam'));
const detailParam = decodeURI(urlParams.get('hiddenDetailParam'));

console.log(`queryParam = ${queryParam}`);
console.log(typeof(queryParam))

const BASE_URL = 'http://localhost:5000';

async function queryData (queryParam) {

    switch(queryParam) {

        case "congress-person":
           var url = BASE_URL + '/api/allCongressPeople/';
           break;
        case "congress-person-116":
            var url = BASE_URL + '/api/allCongressPeople/116';
            break;
        case "congress-person-115":
            var url = BASE_URL + '/api/allCongressPeople/115';
            break;
        case "congress-person-116-house":
            var url = BASE_URL + '/api/representatives/116';
            break;
        case "congress-person-115-house":
            var url = BASE_URL + '/api/representatives/115';
            break;
        case "congress-person-116-house-bystate":
            if (detailParam === "") {
                var url = BASE_URL + '/api/representatives/116/orderbystate';
            }
            else {
                var url = BASE_URL + `/api/representatives/116/${detailParam}`;
            }
            break;
        case "congress-person-115-house-bystate":
            if (detailParam === "") {
                var url = BASE_URL + '/api/representatives/115/orderbystate';
            }
            else {
                var url = BASE_URL + `/api/representatives/115/${detailParam}`;
            }
            break;
        case "congress-person-116-house-bycommittee":
            if(detailParam === ""){
                var url = BASE_URL + '/api/representatives/116/orderbycommittee';
                break;
            }
            else {
                committee = detailParam.slice(0, detailParam.length - 1);
                var url = BASE_URL + `/api/representatives/bycommittee/116/${committee}`;
            }
            
            break;

        // default:
        //     console.log("No good");
        //     break;
    }

    let data;

    const response = await fetch(url).then(response => response.json())
    .then(json => {
        data = json;
    }).catch(error => console.log(`WOOPS ERROR: ${error.message}`))
    
    return data;

}

queryData(queryParam).then(data => {

    let columns = Object.keys(data[0]);

    console.log(columns);

    for (let i = 0; i < columns.length; i++) {
        let header = document.createElement('th');
        header.innerHTML = `${columns[i]}`;
        document.getElementById('headers').appendChild(header);
    }
    
    for (let i = 0; i < data.length; i++){

        let row = data[i];
        console.log(data[i]);
        let newRow = document.createElement('tr');
        newRow.setAttribute('id', `row${i + 1}`);
        console.log(newRow.getAttribute('id'));
        Object.keys(row).forEach(function(key) {            
            let rowData = document.createElement('td')
            rowData.innerText = row[key];
            newRow.appendChild(rowData);
        })
        document.getElementById('data').appendChild(newRow);
    }

    
})