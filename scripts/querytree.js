$(document).ready(function () {
    $('.node').click(function() {
        $(this).next('.hidden').slideToggle();
        $(this).parent().siblings().find('ul').slideUp();
        $(this).parent().find('.node').removeClass('active');
        $(this).parent().siblings().find('.active').removeClass('active');
        $(this).addClass('active');
        $(this).parent().find("option:eq(0)").prop('selected', true);
        $(this).parent().siblings().find("option:eq(0)").prop('selected', true);
    });

    $("#committee5").change(function() {
        if ($(this).data('options') === undefined) {
          /*Taking an array of all options-2 and kind of embedding it on the select1*/
          $(this).data('options', $('#subcommittee5 option').clone());
        }
        var id = $(this).val();
        var options = $(this).data('options').filter('[value=' + id + ']');
        $('#subcommittee5').html(options);
    });

    $("#committee6").change(function() {
        if ($(this).data('options') === undefined) {
          /*Taking an array of all options-2 and kind of embedding it on the select1*/
          $(this).data('options', $('#subcommittee6 option').clone());
        }
        var id = $(this).val();
        var options = $(this).data('options').filter('[value=' + id + ']');
        $('#subcommittee6').html(options);
    });

    $("#committee7").change(function() {
        if ($(this).data('options') === undefined) {
          /*Taking an array of all options-2 and kind of embedding it on the select1*/
          $(this).data('options', $('#subcommittee7 option').clone());
        }
        var id = $(this).val();
        var options = $(this).data('options').filter('[value=' + id + ']');
        $('#subcommittee7').html(options);
    });

    $("#committee8").change(function() {
        if ($(this).data('options') === undefined) {
          /*Taking an array of all options-2 and kind of embedding it on the select1*/
          $(this).data('options', $('#subcommittee8 option').clone());
        }
        var id = $(this).val();
        var options = $(this).data('options').filter('[value=' + id + ']');
        $('#subcommittee8').html(options);
    });
});


function setParam(id) {

  if (String(id).includes('state') || String(id).includes('party') || String(id).includes('committee')) {
    document.getElementById('hidden-detail-param').value = "";
  }

  document.getElementById('hidden-param').value = id
}

function setDetailParam(id) {
  let detail = document.getElementById(id).value;

  document.getElementById('hidden-detail-param').value = detail;

  console.log(detail)
}

function setExtraDetailParam(id) {
  let detail = document.getElementById(id).value;

  document.getElementById('hidden-extra-detail-param').value = encodeURI(detail);

  console.log(detail)
}

const BASE_URL = 'http://localhost:5000';

async function setCommittee(id) {

  setParam(id);
  setDetailParam(id);

  num = id.slice(id.length-1);
  console.log(num);

  var committeeName = encodeURI(document.getElementById(id).value);

  console.log("** Encoded URI = " + committeeName + " **");
  

  var subcommitteeId = `subcommittee${num}`;
  document.getElementById(subcommitteeId).innerHTML = '';
  var emptyOption = document.createElement('option');

  document.getElementById(subcommitteeId).appendChild(emptyOption);

  switch (id) {
    case "house-committee5":
      var url = BASE_URL + `/api/getsubcommittees/116/House/${committeeName}`;
      break;
    case "senate-committee6":
      var url = BASE_URL + `/api/getsubcommittees/116/Senate/${committeeName}`;
      break;
    case "house-committee7":
      var url = BASE_URL + `/api/getsubcommittees/115/House/${committeeName}`;
      break;
    case "senate-committee8":
      var url = BASE_URL + `/api/getsubcommittees/115/Senate/${committeeName}`;
      break;

  }


  console.log("ENDPOINT: " + url)

  const response = await fetch(url).then(response => response.json())
  .then(json => {
      var data = json;
      return data;
  }).then(data => {
    console.log("HERE IS THE DATA: " + data[0]);
    for (let i = 0; i < data.length; i++) {
      let subcommitteeName = data[i]['subcommittee'];
      let option = document.createElement('option');
      option.setAttribute('id', subcommitteeName)
      option.innerText = subcommitteeName;
      document.getElementById(subcommitteeId).appendChild(option);
    }
  }).catch(error => console.log(`WOOPS ERROR: ${error.message}`))  
}