function getData(event) {
    event.preventDefault();
    axios.get("http://localhost:3000/inventory")
    .then(response => {
        var temp = "";
        for (const item of response.data) {
            temp += `<tr><td>${item.id}</td>`;
            temp += `<td>${item.name}</td>`;
            temp += `<td>${item.quantity}</td>`;
            temp += `<td>${item.price}</td>`;
            temp+=`<td><button onclick="updateData(${item.id})">Update Data</button>`
            temp+=`<button onclick="deleteData(${item.id})">Delete Data</button></td></tr>`
        }
        document.getElementById("tbody").innerHTML = temp
        console.log(response.data);
        
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}
function addData(event) {
    event.preventDefault();
    let id=document.getElementById("id").value
    let name=document.getElementById("name").value
    let quantity=document.getElementById("quantity").value
    let price=document.getElementById("price").value
    axios.post("http://localhost:3000/inventory",{
        id,
        name,
        quantity,
        price
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    getData(event)
}
function deleteData(id)
{
    axios.delete("http://localhost:3000/inventory/"+id)
    .then(console.log("data deleted"))
}
function updateData(id)
{
    let name=document.getElementById("name").value
    let quantity=document.getElementById("quantity").value
    let price=document.getElementById("price").value
    axios.patch("http://localhost:3000/inventory/"+id,{name,quantity,price})
}
