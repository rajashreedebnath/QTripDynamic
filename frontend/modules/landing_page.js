import config from "../conf/index.js";

async function init() {

  console.log("From init()")                                                //Milestone1 task



  
  // Log the API endpoint to fetch Cities data using the config object          //Milestone2 2nd task
  const citiesApiEndpoint = `${config.backendEndpoint}/cities`;
  console.log(`${citiesApiEndpoint}`);

  




  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();




  console.log(cities);          //Module2 4th task



  //Updates the DOM with the cities                                       //Module3 1st task     //need to comment else city will show double
  // cities.forEach((key) => {
  //   addCityToDOM(key.id, key.city, key.description, key.image);
  // });


  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  try{
    const citiesData=await fetch(`${config.backendEndpoint}/cities`)
    const citiesjson=await citiesData.json()
    return citiesjson;}
    catch(e){
      return null;
  }
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM


  const cityCard = document.createElement("div")
  cityCard.className = "col-sm-6 col-lg-3 my-4";
  const anchor = document.createElement("a")
  anchor.href = `pages/adventures/?city=${id}`
  anchor.id = id
  const card = document.createElement("div")
  card.className = "tile"
  const textContainer = document.createElement("div")
  textContainer.className = "tile-text text-center";
  const cityName = document.createElement("h5")
  cityName.textContent = city
  const descriptionContainer = document.createElement("h5");
  descriptionContainer.textContent = description;
  textContainer.append(cityName);
  textContainer.append(descriptionContainer);
  const imgContainer = document.createElement("img");
  imgContainer.src = image;
  imgContainer.alt = city;
  card.append(textContainer);
  card.append(imgContainer);
  anchor.append(card);
  cityCard.append(anchor);
  document.getElementById("data").append(cityCard)



}

export { init, fetchCities, addCityToDOM };
