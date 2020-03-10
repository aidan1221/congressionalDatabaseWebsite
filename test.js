


// async function get_reps_by_state(congress, state) {
//     const url = `http://localhost:5000/api/housebillsbystate/${congress}/${state}`;

//     let data;

//     const response = await fetch(url)
//     .then(response => response.json())
//     .then(json => {
//         data = json;
//     })
//     .catch(error => console.log(error));

//     return data;
// }

// test_api().then(data => {

//     console.log("HERE WE ARE");
    
//     for (let i = 0; i < data.length; i++) {
//         console.log("This is the data: " + data[i].sponsor);

//         let p = document.createElement('p');
//         p.innerHTML = `${data[i].sponsor} : ${data[i].bill_name} : ${data[i].description} : ${data[i].bill_status}`;

//         document.getElementById("test-id").appendChild(p);
//     }
// })



const urlParams = new URLSearchParams(window.location.search);

console.log(urlParams.get('a'));