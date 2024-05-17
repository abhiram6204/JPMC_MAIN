function getData()
{
    fetch("http://localhost:3000/cart")
    .then(response=>response.json())
    .then(data=>{
        var tbody=""
        var totalPrice = 0;
        for(var item of data){
            var temp=""
            temp = '<tr><td>' + item.id + '</td>';
            temp+= '<td>' + item.name+ '</td>';
            temp+= '<td>' + item.price + '</td>';
            temp+=`<td><button onclick="deleteData(${item.id})">Delete Data</button></td></tr>`
            tbody+=temp;
            totalPrice += parseInt(item.price);
        }
        document.getElementById("tbody").innerHTML=tbody
        document.getElementById("totalPrice").innerHTML = "Total Price: $" + totalPrice;

    }
)

}
function addData(id,name,price)
{
    event.preventDefault(); // Prevent default form submission behavior 
    // Send POST request to add new user
    fetch("http://localhost:3000/cart",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            name,
            price,
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        return response.json();
    })
    .then(data => {
        // Refresh data after successful addition
        getData();
    })
    .catch(error => {
        console.error('Error adding user:', error);
        // Handle error
    });
}
function deleteData(id1)
{
    fetch("http://localhost:3000/cart/"+id1,{
        method:"DELETE"
    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
    getData()
}