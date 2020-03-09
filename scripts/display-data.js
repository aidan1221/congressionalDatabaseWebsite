const urlParams = new URLSearchParams(window.location.search);

const queryParam = urlParams.get('hiddenParam');

console.log(`queryParam = ${queryParam}`);
console.log(typeof(queryParam))

async function queryData (queryParam) {

    switch(queryParam) {

        case "congress-person":
           var url = 'http://localhost:5000/api/representatives/';
           console.log("WE'RE HERE");
           break;
        default:
            console.log("No good");
            break;
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