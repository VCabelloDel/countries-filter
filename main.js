// Suerte! :)

// estado de nuestra app
let countries;
let countryFilter;
let newCountries; //array con los paises filtrados segun lo que pone en el buscador
let selectedRegion;

async function getAllCountries() {
  const response = await fetch("https://restcountries.com/v2/all");
  countries = await response.json();
  loopCountries();

}

getAllCountries();

function loopCountries() {

  // newCountries = countries.filter((element) =>
  //   element.name.includes(countryFilter)
  // );

  // console.log(newCountries.length);
  document.querySelector(".cards").innerHTML = ""

  // iterar por la variable countries
  countries.forEach(element => {

    // 1. Crear un nuevo nodo HTML (createElement mirar documentación) del tipo 'div'
    // Cuando es que tengo que msotrar el pais?

    // 1. Si el filtro de nombre de pais esta vacio y el filtro de region esta vacio
    // 2. Si el filtro de region no está seleccionado, pero si hay texto en el filtro de nombre HAY QUE APLICARLO
    // 3. Si el filtro de region y de nombre de paises estan 'activados', hay que aplicar los dos!


    if ((element.name.toUpperCase().includes(countryFilter) || !countryFilter) && (element.region.toUpperCase() == selectedRegion || !selectedRegion || selectedRegion == "ALL")) {

      const country = document.createElement('div');

      // 2. Setear la propiedad .innerHTML de este nuevo div con todos los estrctura y datos para crear un país en HTML
      country.innerHTML = `<div class="card card-{country.name}">
        <img class="flag" src="${element.flag}" alt="${element.name} flag" />
        <div class="content">
          <h3 class="name">${element.name}</h3>
          <div><span class="country-info">Population: </span><span class="population">${element.population}</span></div>
          <div><span class="country-info">Region: </span><span class="region">${element.region}</span></div>
      
          <div><span class="country-info">Capital: </span><span class="capital">${element.capital}</span></div>
        </div>
      </div>`;

      // 3. Añadir el nodo que hemos creado como hijo de cards
      document.querySelector(".cards").appendChild(country);
    }

  });



  // console.log("Los países filtrados son: ", newCountries)

  // newCountries.forEach(element => {

  //   const newCountry = document.createElement('div');

  //   newCountry.innerHTML = `<div class="card card-{country.name}">
  //           <img class="flag" src="${element.flag}" alt="${element.name} flag" />
  //           <div class="content">
  //             <h3 class="name">${element.name}</h3>
  //             <div><span class="country-info">Population: </span><span class="population">${element.population}</span></div>
  //             <div><span class="country-info">Region: </span><span class="region">${element.region}</span></div>

  //             <div><span class="country-info">Capital: </span><span class="capital">${element.capital}</span></div>
  //           </div>
  //         </div>`;

  //   document.querySelector(".cards").appendChild(newCountry);

  // })

}
// Para filtrar:

// 1. Usar el evento 'input' para que , cada vez que cambie el valor del input, se invoque una función.

document.querySelector(".search-input").addEventListener("input", searchCountries);

function searchCountries() {
  // 2. LA función debe actualizar una variable de estado que sea algo así como 'countryFilter'
  countryFilter = document.querySelector(".search-input").value.toUpperCase().trim();
  console.log("Has escrito en el buscador", countryFilter);
  // 3. Invocar la función loopCountries.
  loopCountries();

  //Ahora, la función debería en cuenta si countryFilter tiene algun valor. Si lo tiene, debe
  // filtrar la lista de paises a crear en función de si su nombre contiene el texto de country filter.
}


// 3a. Forma más fácil: hacer de ka 23 a ka 29 si y solo si countryFilter contiene parte del nombre del pais (un if)
// 3b. utilizar el método .filter para crear un nuevo array con aquellos paises que cumplan la condición anterior





//filtrar por continente
document.querySelector("#regions").addEventListener("change", (e) => {
  selectedRegion = e.target.value.toUpperCase();
  console.log("Has seleccionado la region", selectedRegion);
  loopCountries()
}
);



//recargar al clicar el titulo
document.querySelector(".logo").addEventListener("click", function () {
  window.location.reload();
});


//lightmode

document.querySelector(".btn-toggle").addEventListener("click", toggleMode);

function toggleMode() {
  document.body.classList.toggle("light");
}
