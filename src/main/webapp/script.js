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
      houseListElement.innerHTML = '';
      
      // filter for houses cheaper than $1000
      houses = houses.filter(priceFilter);

      houses.forEach((house) => {
        houseListElement.appendChild(createHouseElement(house));
      })
    });
  }
  
  /** Creates an element that represents a house, including its delete button. */
  function createHouseElement(house) {
    const houseElement = document.createElement('article');
    houseElement.className = 'house-data';
  
    const nameElement = document.createElement('h3');
    nameElement.innerText = house.name;
    nameElement.className = 'house-name';

    const descriptionElement = document.createElement('p');
    descriptionElement.innerText = house.description;

    const costElement = document.createElement('h3');
    costElement.innerText = house.cost;
    nameElement.className = 'house-price';

    // DELETE BUTTON : doesn't make sense to include on the client-side of the webapp, but maybe
    // useful to include if we were to make an admin panel where admin of the app can delete fraudulent listing
    // *
    // const deleteButtonElement = document.createElement('button');
    // deleteButtonElement.innerText = 'Delete';
    // deleteButtonElement.addEventListener('click', () => {
    //   deleteHouse(house);
  
    //   // Remove the house from the DOM.
    //   houseElement.remove();
    // });
  
    houseElement.appendChild(nameElement);
    houseElement.appendChild(descriptionElement);
    houseElement.appendChild(costElement);
    // houseElement.appendChild(deleteButtonElement);
    return houseElement;
  }
  
  /** Tells the server to delete the task. */
  function deleteHouse(house) {
    const params = new URLSearchParams();
    params.append('id', house.id);
    fetch('/delete-house', {method: 'POST', body: params});
  }

//   filer list of houses fetched from datasotre by price
function priceFilter(house) {
    // get price filer data
    try{
        lower = document.getElementById('lower').value;
    }
    catch{
        lower = 0;
    }
    try{
        upper = document.getElementById('upper').value || 1200;
    }catch{
        upper = 4000;
    }
    // apply filter
    return (parseInt(house.cost) <= upper && parseInt(house.cost) >= lower);
  }