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



// if no value

/** Fetches houses from the server and adds them to the DOM. */
function loadHouses() {
    fetch('/list-houses').then(response => response.json()).then((houses) => {
      const houseListElement = document.getElementById('house-list');
    //   // styling
    //   houseListElement.setAttribute(
    //       'style',
    //       'background: #eee'
    //   );
      houseListElement.innerHTML = '';
      
      // filter for houses bt price
      houses = houses.filter(priceFilter);
      
      houses.forEach((house) => {
        houseListElement.appendChild(createHouseElement(house));
      })
    });
  }
  
  /** Creates an element that represents a house. */
  function createHouseElement(house) {
    const houseElement = document.createElement('article');
    houseElement.className = 'house-data';
    // // styling
    // houseElement.setAttribute(
    //     'style',
    //     'background: #white'
    // );
  
    const nameElement = document.createElement('h3');
    nameElement.innerText = house.name;
    nameElement.className = 'house-name';

    const addressElement = document.createElement("h4");
    addressElement.innerHTML = house.address;
    addressElement.className = "house-address";

    const schoolElement = document.createElement("h4");
    schoolElement.innerHTML = house.school;
    schoolElement.className = "house-school";

    const ammenitiesElement = document.createElement("h4");
    ammenitiesElement.innerHTML = house.amenities;
    ammenitiesElement.className = "house-ammenities";

    const descriptionElement = document.createElement('p');
    descriptionElement.innerText = house.description;
    descriptionElement.className = "house-description"

    // descriptionElement.setAttribute(
    //     'style',
    //     'font-size: 12px;  padding: 3px;'
    // );


    const costElement = document.createElement('h3');
    costElement.innerText = "Monthly rent: " + house.cost;
    costElement.className = 'house-price';
  
    houseElement.appendChild(nameElement);
    houseElement.appendChild(ammenitiesElement);
    houseElement.appendChild(addressElement);
    houseElement.appendChild(schoolElement);
    houseElement.appendChild(descriptionElement);
    houseElement.appendChild(costElement);
    return houseElement;
  }

//   filer list of houses fetched from datasotre by price
function priceFilter(house) {
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

    // apply filter
    console.log([lower,upper])
    return (parseInt(house.cost) <= upper && parseInt(house.cost) >= lower);
  }