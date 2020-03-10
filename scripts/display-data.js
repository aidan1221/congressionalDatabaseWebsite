const urlParams = new URLSearchParams(window.location.search);

const queryParam = decodeURI(urlParams.get('hiddenParam'));
const detailParam = decodeURI(urlParams.get('hiddenDetailParam'));
const extraDetailParam = decodeURI(urlParams.get('hiddenExtraDetailParam'));

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
        case "congress-person-115-house-bycommittee":
            if(detailParam === ""){
                var url = BASE_URL + '/api/representatives/115/orderbycommittee';
                break;
            }
            else {
                committee = detailParam.slice(0, detailParam.length - 1);
                var url = BASE_URL + `/api/representatives/bycommittee/115/${committee}`;
            }
            break;
        case "congress-person-116-senate":
            var url = BASE_URL + '/api/senators/116'
            break;
        case "congress-person-115-senate":
            var url = BASE_URL + '/api/senators/115';
            break;
        case "congress-person-116-senate-bystate":
            if(detailParam === ""){
                var url = BASE_URL + '/api/senators/116/orderbystate';
            }
            else {
                var url = BASE_URL + `/api/senators/116/${detailParam}`;
            }
            break;
        case "congress-person-115-senate-bystate":
            if(detailParam === ""){
                var url = BASE_URL + '/api/senators/115/orderbystate';
            }
            else {
                var url = BASE_URL + `/api/senators/115/${detailParam}`;
            }
            break;
        case "congress-person-116-senate-bycommittee":
            if(detailParam === ""){
                var url = BASE_URL + '/api/senator/116/orderbycommittee';
                break;
            }
            else {
                committee = detailParam.slice(0, detailParam.length - 1);
                var url = BASE_URL + `/api/senator/bycommittee/116/${committee}`;
            }
            break;
        case "house-committee5":
            if(detailParam === "") {
                var url = BASE_URL + '/api/committees/116/House';
                break;
            }
            else {
                committee = detailParam;
                subcommittee = extraDetailParam;
                if(extraDetailParam === "") {
                    var url = BASE_URL + `/api/committees/116/House/${committee}`;
                    break;
                }
                else {

                    var url = BASE_URL + `/api/committees/116/House/${committee}/${subcommittee}`;
                    break;
                }
            }
        case "legislation-115-house":
            var url = BASE_URL + '/api/housebills/115';
            break;
        case "legislation-115-house-bystate":
            if (detailParam === "") {
                break;
            }
            else {
                var url = BASE_URL + `/api/housebillsbystate/115/${detailParam}`;
            }  
        case "legislation-115-house-byparty":
            var url = BASE_URL + `/api/housebillsbyparty/115/${detailParam}`;
            break; 
        case "legislation-115-senate":
            var url = BASE_URL + '/api/senatebills/115';
            break;
        case "legislation-115-senate-bystate":
            if (detailParam === "") {
                break;
            }
            else {
                var url = BASE_URL + `/api/senatebillsbystate/115/${detailParam}`;
            }
        case "legislation-115-senate-byparty":
            var url = BASE_URL + `/api/senatebillsbyparty/115/${detailParam}`;
            break;
        case "legislation-116-house":
            var url = BASE_URL + '/api/housebills/116';
            break;
        case "legislation-116-house-bystate":
            if (detailParam === "") {
                break;
            }
            else {
                var url = BASE_URL + `/api/housebillsbystate/116/${detailParam}`;
            }   
        case "legislation-116-house-byparty":
            var url = BASE_URL + `/api/housebillsbyparty/116/${detailParam}`;
            break;
        case "legislation-116-senate":
            var url = BASE_URL + '/api/senatebills/116';
            break;
        case "legislation-116-senate-bystate":
            if (detailParam === "") {
                break;
            }
            else {
                var url = BASE_URL + `/api/senatebillsbystate/116/${detailParam}`;
            } 
        case "legislation-116-senate-byparty":
            var url = BASE_URL + `/api/senatebillsbyparty/116/${detailParam}`;
            break;
    
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

    try {
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
    }
    catch (err){
        console.log(err);
        console.log(`data = ${data}`);
    }
    

    

    
})