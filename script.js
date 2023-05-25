var container= document.createElement("div");
container.className="container";
var row=document.createElement("div");
row.classList.add("row", "data-user");
row.style.marginTop="30px";
var nav=document.createElement("nav");
nav.classList.add("navbar","navbar-light","bg-light");
var div1=document.createElement("div");
div1.className="container-fluid";
var a=document.createElement("a");
a.className="navbar-brand";
a.innerHTML="Books Details";
a.style.color="rgb(19, 70, 30)";
a.style.fontSize="30px";
a.style.display="block";
a.style.fontFamily="Courier New', Courier, monospace";
var form=document.createElement("form");
form.className="d-flex";
var input=document.createElement("input");
input.className="form-control me-2";
input.setAttribute("id","search");
input.setAttribute("type","text");
input.setAttribute("placeholder", "Search Here!!!");
input.setAttribute("aria-label", "search");
var btn=document.createElement("button");
btn.classList.add("btn","btn-outline-success");
btn.setAttribute("id","btnsearch")
btn.addEventListener("click",search);
btn.innerHTML="Search";
// display the output
let outputdata=document.createElement("div");
outputdata.style.fontSize="20px";
outputdata.setAttribute("class","output");
let linebreaker=document.createElement("br");
document.body.style.backgroundColor="rgb(242, 243, 245)";

// Fetching API Data's using ASYNC and AWAIT
async function books(){
    try{
    let url= await fetch("https://anapioficeandfire.com/api/books");
    let res=await url.json();
    
    for(let i=0; i<=res.length-1; i++){
        let j=1; let k=5;
        var urlchar=res[i].characters;
   
      let charactersList=[];     
      for(let j=1; j<=k; j++){    
           let url1=await fetch(urlchar[j]);
           let res1=await url1.json();
            // charactersList.push(res1.name+" "+res1.died+" "+res1.gender+res1.born+res1.aliases[0]+res1.culture);
           let result=res1.name;
           if(result !== "")
           {
            charactersList.push(result);
           } else{
            k++;
           }
      }
   row.innerHTML += `<div class="col-md-4">
 <div class="card text-white bg-secondary mb-4" style="max-width: 100rem;">
 <h5 class="card-header">${res[i].name}</h5>
   <div class="card-body">
     <div class="card-title">isbn : ${res[i].isbn}</div>
     <div class="card-title">Number of Pages: ${res[i].numberOfPages}</div>
     <div class="card-title">Authors: ${res[i].authors}</div> 
     <div class="card-title">Publisher Name and Realeased Date: ${res[i].publisher} and ${res[i].released}</div> 
     <div class="card-title">Characters :  ${charactersList}</div> 
 </div>
</div>`;
}
    } catch(er){
        console.log("Page Not Found");
    }
}
books();

//Highlight the Searching Text

const data=document.getElementsByClassName("row");
function search(){
    let inputs=document.getElementById("search").value;
    if(inputs !== "")
    {
     let regExp=new RegExp(inputs, "gi");
      data.innerHTML=data.cloneNode(true).replace(regExp, "<mark>$&</mark>");
    } 
 }
row.appendChild(outputdata);
form.append(input,btn);
div1.append(a,form);
nav.appendChild(div1);
container.appendChild(row);
document.body.append(nav,container);