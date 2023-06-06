var title = document.getElementById('title') ,
price = document.getElementById('price'),
taxes = document.getElementById('taxes') ,
ads = document.getElementById('ads') ,
discount = document.getElementById('discount') ,
count = document.getElementById('count') ,
category = document.getElementById('category'),
total = document.getElementById('total') ,
submit = document.getElementById('submit') ;
var mood = "Create" ;
var tmp ;
var alert = document.getElementById("alert") ;
console.log(title , taxes , price , ads , discount,total,count,category,submit) ;

// Get Total 
function getTotal() 
{
  if(price.value != "" )
  {
    var result = (+price.value + +taxes.value + +ads.value)
    - +discount.value ;
    total.innerHTML = result ;
    total.style.backgroundColor = '#040' ;
    alert.style.left = '-400px' ;
  }  
  else {
    total.innerHTML = "" ;
    total.style.backgroundColor = "#B31312" ;
  }
}
// Create Product 
var dataPro ;
if(localStorage.getItem("product") != null ) {

  dataPro = JSON.parse(localStorage.getItem("product")) ;
}  else {
  dataPro = [] ;
}

submit.onclick = function() 
{
  var newPro = {
     title:title.value,
     price:price.value,
     taxes:taxes.value,
     ads:ads.value,
     discount:discount.value,
     total:total.innerHTML,
     count:count.value ,
     category:category.value
  }
 
   if(title.value != "" && price.value != "" && ads.value != "" && taxes.value != ""  && discount.value != "" ) {
 
    if(mood === "Create") 
    {
      if(newPro.count > 1) 
      {
        for(var i = 0 ; i < newPro.count;i++) {
          dataPro.push(newPro) ;
        }
      } else {
        dataPro.push(newPro) ;
      }
    } else {
        dataPro[tmp] = newPro ;
        submit.innerHTML = "Create" ;
        mood = "Create" ;
        count.style.display = 'block' ;  
    } 
    alert.style.left = '-400px' ;
   }   else {


    alert.innerHTML = '` رجاء قم بأدخال البيانات`' ;
    alert.style.backgroundColor = '#5D9C59' ;
    alert.style.left = '0px' ;
    alert.style.top = '50%' ;
   }
     localStorage.setItem("product" , JSON.stringify(dataPro)) ;
     clearData() ;
     showData(dataPro) ;
     getTotal() ;
}

// Clear Inputs 
function clearData() 
{
     title.value ='' ;
     price.value ='' ;
     ads.value = ''  ;
     discount.value = '' ;
     taxes.value = '' ;
     total.innerHTML = '' ;
     count.value = '' ;
     category.value = '' ;
}

// Read 
var deleteAll = document.getElementById("delete_all") ;
function showData(listOfData) {
  var table = `` ;
  for(var i = 0 ; i < listOfData.length ; i++) {
    table+=` <tr>
            <td>${i+1}</td>
            <td>${listOfData[i].title}</td>
            <td>${listOfData[i].price}</td>
            <td>${listOfData[i].ads}</td>
            <td>${listOfData[i].taxes}</td>
            <td>${listOfData[i].discount}</td>
            <td>${listOfData[i].total}</td>
            <td>${listOfData[i].category}</td>
            <td><button class="bg-success text-light btn" onclick="UpdateData(${i})" >Update</button> </td>
            <td><button class="bg-warning text-light btn" onclick="deleteData(${i})">Delete</button> </td>
    </tr> ` ;
  }
    document.getElementById("tBody").innerHTML = table ;


    if(dataPro.length > 0) {
      deleteAll.innerHTML = (`Delete All  (${dataPro.length})`) ;
      deleteAll.style.color = "#B31312" ;
      deleteAll.style.fontWeight = "700" ;
      deleteAll.style.display = 'block' ;
    }  else {
      deleteAll.innerHTML = (`Delete All`) ;
      deleteAll.style.color = "#ffffff" ;
      deleteAll.style.fontWeight = "400" ;
      deleteAll.style.display = 'none' ;
    }
}
showData(dataPro) ;

// Delete Product
function deleteData(i) {
  dataPro.splice(i,1) ;
  showData(dataPro) ;
  localStorage.setItem("product" , JSON.stringify(dataPro)) ;
}

// delete all 
deleteAll.onclick = function() {

  dataPro.splice(0) ;
  localStorage.clear();
  showData(dataPro) ;
}

// Update
function UpdateData(i) {

  title.value = dataPro[i].title ;
  price.value = dataPro[i].price ;
  ads.value = dataPro[i].ads ;
  taxes.value = dataPro[i].taxes ;
  total.innerHTML = dataPro[i].total ;
  discount.value = dataPro[i].discount ;
  category.value = dataPro[i].category ;
  submit.innerHTML = "Update" ;
  mood = "Update" ;
  tmp = i ;
  getTotal() ;
  count.style.display = "none" ;
  scroll({
      top : 0 ,
      behavior : "smooth"
  })
}

// Search 

function searchProduct(value) {

var searchPro = [] ;
for(var i = 0 ; i<dataPro.length;i++){
  if(dataPro[i].title.toLowerCase().includes(value.toLowerCase()) == true || dataPro[i].category.toLowerCase().includes(value.toLowerCase()) == true) 
  {
    searchPro.push(dataPro[i]) ;
  }
}
showData(searchPro);
}
