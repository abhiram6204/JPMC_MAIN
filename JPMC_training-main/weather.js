function fetch1(){
    let lat=prompt("Enter latitude")
    let lon=prompt("Enter longitude")
    if(lat!=undefined && lon!=undefined)
        {
    //let p=fetch("https://api.open-meteo.com/v1/forecast?latitude=55.75582600&longitude=37.61729990&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m")
    let p=fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`)
    .then(response=>response.json())
    .then(data=>{document.getElementById("temp").innerHTML=data.current.temperature_2m,
    document.getElementById("hum").innerHTML=data.current.wind_speed_10m
    })
}
else
{
    alert("Enter valid data")
}
}