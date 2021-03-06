// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/** Fetches houses from the server and adds them to the DOM. */
function loadHouses() {
    
    // fetch data
    fetch('/list-houses').then(response => response.json()).then((houses) => {
      const houseListElement = document.getElementById('house-list');
      houseListElement.innerHTML = '';

      perfTestFilter(houses);

      houses = filterHouses(houses);
      
      perfTestElement(houses);

      houses.forEach((house) => {
        houseListElement.appendChild(createHouseElement(house));
      })


    });
}
  
/** Creates an element that represents a house. */
function createHouseElement(house) {
    const houseElement = document.createElement('article');
    houseElement.className = 'house-data';
  
    const nameElement = document.createElement('p');
    nameElement.innerHTML = house.name + "<hr>";
    nameElement.className = 'house-name';

    const addressElement = document.createElement("p");
    addressElement.innerHTML = "<u>Address:</u> " + house.address;
    addressElement.className = "house-address";

    const schoolElement = document.createElement("p");
    schoolElement.innerHTML = "<u>School(s) nearby:</u> " + house.school;
    schoolElement.className = "house-school";

    const ammenitiesElement = document.createElement("p");
    ammenitiesElement.innerHTML = "<u>Amenities:</u> " + house.amenities;
    ammenitiesElement.className = "house-amenities";

    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = "<u>Description:</u> \n" + house.description;
    descriptionElement.className = "house-description"


    const costElement = document.createElement('p');
    costElement.innerHTML = "<u>Monthly rent:</u> $ " + house.cost;
    costElement.className = 'house-price';
  
    houseElement.appendChild(nameElement);
    houseElement.appendChild(addressElement);
    houseElement.appendChild(schoolElement);
    houseElement.appendChild(ammenitiesElement);
    houseElement.appendChild(descriptionElement);
    houseElement.appendChild(costElement);
    return houseElement;
}

// filter function
function filterHouse(house){
    // PRICE FILTER
    // get price filer data
    try{
        lower = document.getElementById('lower').value || 0;
    }
    catch{
        lower = 0;
    }
    try{
        upper = document.getElementById('upper').value || 40000;
    }catch{
        upper = 40000;
    }
    if (parseInt(house.cost) > upper || parseInt(house.cost) < lower){
        return false
    }

    // SCHOOL FILTER
    // get school filter data
    school = document.getElementById('filter-school').value.toLowerCase();
    if(school != "" && house.school.toLowerCase() !== school){
        return false
    }

    // AMENITIES FILTER
    // get filter data
    am = document.getElementById('filter-amenities').value.toLowerCase();
    if(am != "" && !house.amenities.includes(am)){
        return false;
    }

    return true;

}

// filter
function filterHouses(houses){
    houses = houses.filter(filterHouse);
    
    return houses;
    
}


// performance testing
function perfTestFilter(houses){

    // test time taken by 1 run of the filtering algorithm
    let startTime = performance.now();
    for(i=0; i<10; i++){
        console.time("timer1")
        filterHouses(houses);
        console.timeEnd("timer1")
    }
    let endTime = performance.now();
    let avgResponseTime = (endTime - startTime) / 10;
    
    console.log("average response time per run: " + avgResponseTime)
    
}

// performance testing
function perfTestElement(houses){
    const houseListElement = document.getElementById('house-list');
    // test time taken by building the house list html after filtering
    let startTime = performance.now();
    for(i=0; i<10; i++){
        houses.forEach((house) => {
            houseListElement.appendChild(createHouseElement(house));
          })
    }
    let endTime = performance.now();
    let avgResponseTime = (endTime - startTime) / 10;
    
    console.log("average time to display: " + avgResponseTime)
    houseListElement.innerHTML = '';

}

