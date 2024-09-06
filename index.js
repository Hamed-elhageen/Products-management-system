let tittle =document.getElementById("title");
let price = document.getElementById("pure");
let taxes = document.getElementById("taxes");
let adds=document.getElementById("ads");
let discount = document.getElementById("discounts");
let count = document.getElementById("count");
let category = document.getElementById("category");
let total = document.querySelector(".total");
let createButton=document.querySelector(".create");
let tableBody=document.getElementById("tBody");
let searchInput=document.getElementById("search");
let deleteallDiv = document.getElementById("deleteall");
let mood="create";
let temp;
// 1- get total price
// 2- create the products
// 3-  save to local storage
// 4- clear inputs 
// 5- read 
// 6- count
// 7- delete 
// 8- update
// 9- search 
// 10- test and clean data
function getTotalPrice() {                                                                                                                                                                                          // 1- the function to get the total price
    if(price.value != ''){
    total.innerHTML= (+price.value + +taxes.value+ +adds.value) - +discount.value;
    total.style.backgroundColor="#040";                                                                                                                                                                // the condition is if there is a value in the price input get the total price and make it's bakcground green 
    }
    else{
        total.innerHTML='';
        total.style.backgroundColor="#982525da";                                                                                                                                              // and if the price input is empty make the total price empty and make the background red and if you writed any thing and deleted it the background will return to red
    }
}
let  arrayofProducts;                                                                                                                                                                                      // this is the most important thing in the project , the array containing the products and it will continue with us to the end of the project
                                                                                                                                                                                                                      // here after he add a product and return to the first of the code to run it line by line he will clear the the array of products " the products in the local storage  ,then i want to tell him if you found any products in the local storage leave them, make the the array of products equal to them"
if(localStorage.products!=null){                                                                                                                                                                    // here i am saying if you found products are added in local storage in past add them to the array of products "dont clear them"
    arrayofProducts=JSON.parse(localStorage.products);
}
else{
    arrayofProducts=[];
}
createButton.onclick=function(){                                                                                                                                                             // 2-  this is the main function of the project which is when clicking on create and inside it we will add alot of functions                               
    let newPro={
        title:tittle.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        adds:adds.value,
        count:count.value,
        discounts: discount.value,
        total:total.innerHTML,
        category:category.value.toLowerCase(),
    }
        if(mood==="create"){                                                                                                                                                                             //8- this if for number 8 which means if the mood is "create" after that i will create elements by the button and if it is anohter he will make the upadate process
            if(tittle.value!='' && price.value!='' & category.value!='' ){ 
               if(newPro.count>1){                                                                                                                                                                               //7- this if the user enters a count number in count input then we will create a number of products with that number
                    for(let i=0;i<newPro.count;i++){
                    arrayofProducts.push(newPro);                                                                                                                                                      // this is a basic operation in any time                                                               
                }
            }
                else{
                    arrayofProducts.push(newPro);                                                                                                                                                          // here i am adding the only product to the array
                }
        }
        else{ 
            inputsValidation();
            return;
        }
    }
        else{                                                                                                                                                                                                            // here it is , this if the mood was to update
            arrayofProducts[temp]=newPro;                                                                                                                                                           // here we will update data to date which is in inputs field
            mood="create";                                                                                                                                                                                    // after updating return the mood to create mode to add products again
            createButton.innerHTML="Create";                                                                                                                                                     // and return the button to the word create
            count.style.display="block";                                                                                                                                                                // and appear the count input
        }
        clearInputData();                                                                                                                                                                               //3- this is the fucntion to clear the data of inputs after clicking on create
    window.localStorage.setItem('products', JSON.stringify( arrayofProducts));                                                                                     // by this i added the products to local storage but data that be added to local storage should be string
    showData();                                                                                                                                                                                     //4-  this is the fucntion to show data in the page
}
function clearInputData(){
    tittle.value="";
    price.value="";
    taxes.value="";
    adds.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
}
function showData(){
    let table=``;
    for(let i=0; i<arrayofProducts.length ;i++){
        table +=`
                    <tr>
                    <td>${i+1}</td>
                    <td>${arrayofProducts[i].title}</td>
                    <td>${arrayofProducts[i].price}</td>
                    <td>${arrayofProducts[i].taxes}</td>
                    <td>${arrayofProducts[i].adds}</td>
                    <td>${arrayofProducts[i].discounts}</td>
                    <td>${arrayofProducts[i].total}</td>
                    <td>${arrayofProducts[i].category}</td>
                    <td> <button id="update" onclick="updateProduct(${i})">Update</button></td>
                    <td> <button id="delete" onclick="deleteProduct(${i})">Delete</button></td>    
                    </tr>`                                                                                                                                                                                        // 5-  here i gave the button the action when clicking on him , go to see the functtion body
    }
    tableBody.innerHTML=table;
    getTotalPrice();                                                                                                                                                                                        // to make the total price red after create or update
    if(arrayofProducts.length>0){
        deleteallDiv.innerHTML=`<button onclick="deleteAll()" id="deleteAll">Delete All (${arrayofProducts.length})</button>`;                     // 6- this is for the delete all button which appears only when there i products in page 
    }
    else{
        deleteallDiv.innerHTML="";
    }
}
function deleteProduct(i){
arrayofProducts.splice(i,1);
window.localStorage.products=JSON.stringify(arrayofProducts);                                                                                                                          //by this you updated the items in local storage after deletion
showData();                                                                                                                                                                                                            // by this you updated the items in the page after deletion
}
function deleteAll(){
    window.localStorage.clear();
    arrayofProducts.splice(0);                                                                                                                                                                                // if i cleared the local storage only the products will still at page because the function show data gets here data from arrayof products . so you should clear it also and show data after update
    showData();
}
function updateProduct(i){                                                                                                                                                                              //8- function to update products
    tittle.value=arrayofProducts[i].title;
    price.value=arrayofProducts[i].price;
    taxes.value=arrayofProducts[i].taxes;
    adds.value=arrayofProducts[i].adds;
    discount.value=arrayofProducts[i].discounts;
    getTotalPrice();
    category.value=arrayofProducts[i].category;
    count.style.display="none";
    createButton.innerHTML="Update";
    mood="update";                                                                                                                                                                             // by this declaration there is some things changed in creating the product above in the conditon if mood = upadate go to above
    temp=i;
    scroll({
        top: 0,                                                                                                                                                                                                   // all of this happen when clicking on update button
        behavior:"smooth"
    })
}
searchmood="tittle";
function getsearchMethod(id){                                                                                                                                                                        //9-  this is the function to  get the method of the search " by tittle or by category"   
    if(id==="searchtittle"){
        searchmood="tittle";
        searchInput.placeholder="Search by tittle";                          
    }
    else{
        searchmood="category";
        searchInput.placeholder="Search by category";
    }
    searchInput.focus();                                                                                                                                                                                      // after clicking on search by category of search by title he will fcous on searchinput
    searchInput.value="";                                                                                                                                                                                   // after clicking and typing clear the input field
    showData();                                                                                                                                                                                                 // if you searched by category for example and didn't find any result i want when i am click on search by tittle the products come again , with show data function you can do that
}
function Search(value){                                                                                                                                                                                  //10- with the previos function i knowed if i will search by title of category and now i have searchmood
    let table="";
    if(searchmood=="tittle"){                                                                                                                                                                         //now you are searching by tittle
        for(let i=0 ; i<arrayofProducts.length ; i++){
            if(arrayofProducts[i].title.includes(value.toLowerCase())){
                table +=`
                    <tr>
                    <td>${i+1}</td>
                    <td>${arrayofProducts[i].title}</td>
                    <td>${arrayofProducts[i].price}</td>
                    <td>${arrayofProducts[i].taxes}</td>
                    <td>${arrayofProducts[i].adds}</td>
                    <td>${arrayofProducts[i].discounts}</td>
                    <td>${arrayofProducts[i].total}</td>
                    <td>${arrayofProducts[i].category}</td>
                    <td> <button id="update" onclick="updateProduct(${i})">Update</button></td>
                    <td> <button id="delete" onclick="deleteProduct(${i})">Delete</button></td>    
                    </tr>`            
        }
    }
}
    else{                                                                                                                                                                                                     //now you are searching by category
        for(let i=0 ; i<arrayofProducts.length ; i++){
            if(arrayofProducts[i].category.includes(value.toLowerCase())){
                table +=`
                    <tr>
                    <td>${i+1}</td>
                    <td>${arrayofProducts[i].title}</td>
                    <td>${arrayofProducts[i].price}</td>
                    <td>${arrayofProducts[i].taxes}</td>
                    <td>${arrayofProducts[i].adds}</td>
                    <td>${arrayofProducts[i].discounts}</td>
                    <td>${arrayofProducts[i].total}</td>
                    <td>${arrayofProducts[i].category}</td>
                    <td> <button id="update" onclick="updateProduct(${i})">Update</button></td>
                    <td> <button id="delete" onclick="deleteProduct(${i})">Delete</button></td>    
                    </tr>`            
        }
    }
    }
    tableBody.innerHTML=table;
}
function inputsValidation() {
    let allInputs = document.querySelectorAll(".input input.check");
    allInputs.forEach(function (input) {
        // Check if the input is empty or contains only whitespace
        if (input.value.trim() === "") {
            input.classList.add("invalid");
            createButton.classList.add("unavailable");
        } else {
            input.classList.remove("invalid");
            createButton.classList.remove("unavailable");
        }
        // Remove 'invalid' class and update button state on input change
        input.addEventListener("input", function () {
            if (input.value.trim() !== "") {
                input.classList.remove("invalid");
                createButton.classList.remove("unavailable");
            } else {
                input.classList.add("invalid");
                createButton.classList.add("unavailable");
            }
        });
    });
}
showData();







