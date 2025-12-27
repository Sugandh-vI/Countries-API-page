const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')
const icon = document.querySelector('.theme-changer i')

let cls = JSON.parse(localStorage.getItem("cls")) || ""
if(cls == "dark") {
    document.body.classList.add("dark")
    themeChanger.innerHTML = `
    <i class="fa-solid fa-sun"></i>&nbsp;&nbsp;Light Mode
    `
    // icon.classList.remove("fa-regular", "fa-moon");
    // icon.classList.add("fa-solid", "fa-sun");
}

let allCountriesData

fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital ')
.then(res => res.json())
.then(data => {
    countriesContainer.innerHTML = ''
    data.forEach((country) => {
        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href = `country.html?name=${country.name.common}`

        countryCard.innerHTML = `
                        <img src="${country.flags.svg}" alt="flag">
                        <div class="card-text">
                            <h3 class="card-title">${country.name.common}</h3>
                            <p><b>Population:  </b>${country.population.toLocaleString('en-IN')}</p>
                            <p><b>Region:  </b>${country.region}</p>
                            <p><b>Capital:  </b>${country.capital}</p>
                        </div>
        `
        countriesContainer.append(countryCard)

    })
    allCountriesData = data
})

filterByRegion.addEventListener('change', (e) => {
    console.log(e.target.value)
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then(res => res.json())
    .then(data => {
        countriesContainer.innerHTML = ''
        data.forEach((country) => {
            const countryCard = document.createElement('a')
            countryCard.classList.add('country-card')
            countryCard.href = `country.html?name=${country.name.common}`

            countryCard.innerHTML = `
                            <img src="${country.flags.svg}" alt="flag">
                            <div class="card-text">
                                <h3 class="card-title">${country.name.common}</h3>
                                <p><b>Population:  </b>${country.population.toLocaleString('en-IN')}</p>
                                <p><b>Region:  </b>${country.region}</p>
                                <p><b>Capital:  </b>${country.capital}</p>
                            </div>
            `
            countriesContainer.append(countryCard)
        })
    })
})

searchInput.addEventListener('input',(e) => {
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCards(filteredCountries)
})

function renderCards(data) {
    countriesContainer.innerHTML = ''
    data.forEach((country) => {
        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href = `country.html?name=${country.name.common}`

        countryCard.innerHTML = `
                        <img src="${country.flags.svg}" alt="flag">
                        <div class="card-text">
                            <h3 class="card-title">${country.name.common}</h3>
                            <p><b>Population:  </b>${country.population.toLocaleString('en-IN')}</p>
                            <p><b>Region:  </b>${country.region}</p>
                            <p><b>Capital:  </b>${country.capital}</p>
                        </div>
        `
        countriesContainer.append(countryCard)
    })
}

themeChanger.addEventListener('click',() => {
    if(cls == "dark"){
        document.body.classList.remove("dark")
        cls = ""
        localStorage.setItem("cls",JSON.stringify(cls))
        themeChanger.innerHTML = `
        <i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode
        `
        // icon.classList.remove("fa-solid", "fa-sun");
        // icon.classList.add("fa-regular", "fa-moon");
    } else {
        document.body.classList.add("dark")
        cls = "dark"
        localStorage.setItem("cls",JSON.stringify(cls))
        themeChanger.innerHTML = `
        <i class="fa-solid fa-sun"></i>&nbsp;&nbsp;Light Mode
        `
        // icon.classList.remove("fa-regular", "fa-moon");
        // icon.classList.add("fa-solid", "fa-sun");
    }
})
