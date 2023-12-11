import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  //Create the cards for adventures grid page - Milestone-1
  let city = search.split("=")[1];
  return city;

  // console.log(search)
  //     let params = new URLSearchParams(search);
  //     console.log(params.get('city'))
  //    return params.get('city')
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  //Create the cards for adventures grid page - Milestone-2
  try {
    let response = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    let adventures = await response.json();
    console.log(adventures);
    return adventures;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  //Create the cards for adventures grid page -> Milestone - 3
  adventures.forEach((element) => {
    let div = document.createElement("div");
    div.className = "col-xl-3 col-lg-4 col-sm-6 mb-3";
    div.innerHTML = `
      <a href="detail/?adventure=${element.id}" id="${element.id}">
         <div class="activity-card">
          <img src=${element.image} class="activity-card img" alt=${element.name}>
          <div class="category-banner">${element.category}</div>
          <div class="card-body d-md-flex justify-content-between flex-wrap" style="width:100%;">
            <h5 class="card-title">${element.name}</h5>
            <h6 class="card-text">₹${element.costPerHead}</h6>
          </div>
          <div class="card-body d-md-flex justify-content-between flex-wrap" style="width:100%;">
          <h5 class="card-title">Duration</h5>
          <h6 class="card-text">${element.duration}</h6>
         </div>
        </div>
      </a>`;
    document.getElementById("data").appendChild(div);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  //Create filters for adventures -> Milestone-2
  let newlist = list.filter(
    (element) => low <= element.duration && element.duration <= high
  );
  console.log(newlist);
  return newlist;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  
  
  //Create filters for adventures -> Milestone-1
  let newlist = list.filter((element) =>
    categoryList.includes(element.category)
  );
  return newlist;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  //Create filters for adventures -> Milestone-1
  if (filters.category.length > 0)
    list = filterByCategory(list, filters.category);
  if (filters.duration.length > 0) {
    list = filterByDuration(
      list,
      filters.duration.split("-")[0],
      filters.duration.split("-")[1]
    );
  }
  console.log(list, filters);
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  //Create filters for adventures -> Milestone-1
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  //Create filters for adventures -> Milestone-1
  let localfilters = JSON.parse(window.localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  //Create filters for adventures -> Milestone-1
  
  document.getElementById("duration-select").value = filters.duration;

  // Clear existing pills
  document.getElementById("category-list").innerHTML = "";

  //Iterates over category filters and inserts category pilla into DOM
  filters["category"].forEach((key) => {
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `<div>${key}<span class="remove-filter" onclick="removeCategoryFilter('${key}')">
                      <span style="color: red; cursor: pointer">x</span></span></div>`;
    document.getElementById("category-list").appendChild(ele);
  });

}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
