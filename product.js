const itemList=document.getElementById("items");
const form=document.getElementById("my-form");
const itemList2=document.getElementById('items2');
const list=document.getElementById('list');
form.addEventListener('submit',onAddProduct);
let objects=[];
let price=0;

async function onAddProduct(e){
    try{
    e.preventDefault();
    const sellingprice=document.getElementById('number').value;
    const addProduct=document.getElementById('select').value;
    obj={sellingprice,addProduct}
    objects.push(obj);
    
    //pushing elements into crud
    let res=await axios.post("https://crudcrud.com/api/e49ad33850c24a2e934f06749a778a1a/productDetails",obj)
        console.log(res)
    calculate(res.data.sellingprice)
    showUserOnScreen(obj)
    }
    catch{
        console.error('something went wrong');
    }
    
}
window.addEventListener("DOMContentLoaded",async()=>{
    try{
    let response=await axios.get("https://crudcrud.com/api/e49ad33850c24a2e934f06749a778a1a/productDetails")
    
      
        for(var i=0;i<response.data.length;i++){
            showUserOnScreen(response.data[i])
            calculate(response.data[i].sellingprice)
            
        }
    }
    catch{
        console.log('something went wrong');
    }
})

async function showUserOnScreen(objects){
try{
  var li=document.createElement('li');
  li.style="font-weight:bold";
  li.textContent=`${objects.sellingprice}-${objects.addProduct}  `;
  var delbtn=document.createElement('input');
  delbtn.type='button';
  delbtn.value='Delete Product';
  delbtn.style='background-color:red';
  delbtn.onclick=async()=>{
    itemList.removeChild(li);
    let res= await axios.delete(`https://crudcrud.com/api/e49ad33850c24a2e934f06749a778a1a/productDetails/${objects._id}`)
    console.log(res) 
    subtract(objects.sellingprice)

}
}

    catch
    {
        console.log('something went wrong');
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