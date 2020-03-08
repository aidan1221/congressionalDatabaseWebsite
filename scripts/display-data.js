const urlParams = new URLSearchParams(window.location.search);

const queryParam = urlParams.get('hiddenParam');

console.log(`queryParam = ${queryParam}`);


async function queryData (queryParam) {

    const url = 'http://localhost:5000/api/representatives/116';

    let data;

    const response = await fetch(url).then(response => response.json())
        .then(json => {
            data = json;
        })
        .catch(error => console.log(`WOOPS ERROR: ${error.message}`))
    
    return data;

}

queryData().then(data => {

    

    for (let i = 0; i < data.length; i++){
        console.log(data[i].rep_name);

        let p = document.createElement('p');
        p.innerHTML = `${data[i].rep_name}`;
        
        document.getElementById("top").insertAdjacentElement('afterend', p);
    }

    
})