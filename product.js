const itemList=document.getElementById("items");
const form=document.getElementById("my-form");
const itemList2=document.getElementById('items2');
const list=document.getElementById('list');
form.addEventListener('submit',onAddProduct);
let objects=[];
let price=0;

function onAddProduct(e){
    e.preventDefault();
    const sellingprice=document.getElementById('number').value;
    const addProduct=document.getElementById('select').value;
    obj={sellingprice,addProduct}
    objects.push(obj);
    //pushing elements into crud
    axios.post("https://crudcrud.com/api/7c574feee53f453a9c5460d4ba44137c/productDetails",obj)
    .then((res)=>{
        console.log(res)
    calculate(res.data.sellingprice)}).catch(err=>console.error(err));
    showUserOnScreen(obj)
    
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/7c574feee53f453a9c5460d4ba44137c/productDetails")
    .then(res=>{
        console.log(res);
        for(var i=0;i<res.data.length;i++){
            showUserOnScreen(res.data[i])
            calculate(res.data[i].sellingprice)
            
        }
    }).catch(err=>console.error(err))
});
function showUserOnScreen(objects){
  var li=document.createElement('li');
  li.textContent=`${objects.sellingprice}-${objects.addProduct}    `;
  var delbtn=document.createElement('input');
  delbtn.type='button';
  delbtn.value='Delete Product';
  delbtn.style='background-color:red';
  delbtn.onclick=()=>{
    itemList.removeChild(li);
    axios.delete(`https://crudcrud.com/api/7c574feee53f453a9c5460d4ba44137c/productDetails/${objects._id}`)
    .then(res=>{console.log(res) 
        subtract(objects.sellingprice)}).catch(err=>console.error(err))
          
  }
  li.appendChild(delbtn);
  itemList.appendChild(li);
  
  
}
function calculate(sellingprice)
{
    const par=document.getElementById('itemPrice');
    price=Number(sellingprice)+Number(price);
    const childHTML=`<h4>Total price is:${price}<h4>`;
    par.innerHTML=childHTML;
}
function subtract(sellingprice)
{
    const par=document.getElementById('itemPrice');
    price=Number(price)-Number(sellingprice);
    const childHTML=`<h4>Total price is:${price}<h4>`;
    par.innerHTML=childHTML;
}