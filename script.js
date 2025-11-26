
const container = document.querySelector(".container")
const search = document.querySelector(".btn-search")
const wether = document.querySelector(".wether-box")
const info = document.querySelector(".info")
const city0 = document.querySelector(".input-city")
const error = document.querySelector(".error")

container.style.height = "90px" 

function display() {
    const apikey = 'c6e79805cc5c280668c04558748417c7'
    const city = document.querySelector(".input-city").value.trim()

    if(city === "") {
        error.classList.add("active")
        info.classList.remove("active")
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`)
    .then(response => response.json())
    .then(data => {
        console.log("بيانات API:", data)
        
        if(data.cod && data.cod !== 200) {
            container.style.height = "370px"
            error.classList.add("active")
            info.classList.remove("active")
        } else {
            container.style.height = "500px"
            error.classList.remove("active")
            info.classList.add("active")

            const img = document.querySelector(".wether-box img")
            const datatemp = document.querySelector(".data-temp")
            const description = document.querySelector(".description")
            const humidity = document.querySelector(".humidity-value")
            const wind = document.querySelector(".wind-value")
        
            switch (data.weather[0].main) {
                case "Clear": img.src = "img/clear.png"; break
                case "Clouds": img.src = "img/cloud.png"; break
                case "Mist": img.src = "img/mist.png"; break
                case "Rain": img.src = "img/rain.png"; break
                case "Snow": img.src = "img/snow.png"; break
                case "Haze": img.src = "img/mist.png"; break
                default: img.src = "img/cloud.png"; break
            }
            
            datatemp.textContent = `${Math.round(data.main.temp)}`
            description.textContent = data.weather[0].description
            humidity.textContent = `${data.main.humidity}`
            wind.textContent = `${Math.round(data.wind.speed)} `
        }
    })    
    .catch(error => {
        console.error("خطأ في الاتصال:", error)
        container.style.height = "370px"
        error.classList.add("active")
        info.classList.remove("active")
    })
}

search.addEventListener("click", function(){
    display()
})

city0.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        display()
        e.preventDefault()
    }
})