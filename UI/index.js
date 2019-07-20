async function CreateTableFromJSON() {
 const res = await fetch('https://team-lead-picker.herokuapp.com/api/v1/team/leaders');
 const { data } = await res.json();
 
   var myBooks = await data.map((obj) => {
   return {
     'WEEK': `WEEK ${obj.week}`,
     'TEAM LEAD': obj.teamLead,
     'QUALITY ASSURANCE': obj.qualityAssurance
   }
  });
  


  const currentWeek = myBooks[myBooks.length - 1];
  const tl = document.getElementById('tl')
  const qa = document.getElementById('qa')
  const wk = document.getElementById('week');

  tl.innerText = currentWeek["TEAM LEAD"];
  qa.innerText = currentWeek["QUALITY ASSURANCE"];
  wk.innerText = currentWeek["WEEK"];

  var col = [];
  for (var i = 0; i < myBooks.length; i++) {
      for (var key in myBooks[i]) {
          if (col.indexOf(key) === -1) {
              col.push(key);
          }
      }
  }


  var table = document.createElement("table");



  var tr = table.insertRow(-1);                  

  for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th");     
      th.innerHTML = col[i];
      tr.appendChild(th);
  }


  for (var i = 0; i < myBooks.length; i++) {

      tr = table.insertRow(-1);

      for (var j = 0; j < col.length; j++) {
          var tabCell = tr.insertCell(-1);
          tabCell.innerHTML = myBooks[i][col[j]];
      }
  }


  var divContainer = document.getElementById("showData");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
}

function createNewLeaders() {
  const leader = fetch('https://team-lead-picker.herokuapp.com/api/v1/team/leaders',{ 
    method: 'POST'
  });
  CreateTableFromJSON()

}
  CreateTableFromJSON()


  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours()
console.log(day, hour)
  if (day === 5 && hour > 12) {
    createNewLeaders();
  }



