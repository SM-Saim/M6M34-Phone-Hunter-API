/*Inspect=> network=>all=>preview te gele amra data ta dekte parbo kon obostai ase.
 *function like api connect call korlei hobe na, function k call korte hobe ba button diea onclick kore call korte hobe.
 *asyc er awit mane holo= data ta load howa porjonto kisuta opeakka koro.
 *tarpor data ta json e convert koro, er jonno halka okkeka koro , ei jonno await add korsi.  */
const phoneFind = async (searchInput, displayAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchInput}`
  );
  if (!searchInput) {
    return "Not ok";
  }
  const data = await res.json();
  const phoneData = data.data;
  // console.log(phoneData);
  dataStore(phoneData, displayAll);
};

const dataStore = (phone, displayAll) => {
  //1. get the container
  const getContainer = document.getElementById("phone-card");
  // clear the container after one search
  getContainer.textContent = "";

  //  display show more button if card is grater than 12
  const showAllbutton = document.getElementById("showMore-btn");

  if (phone.length > 12 && !displayAll) {
    showAllbutton.classList.remove("hidden");
  } else {
    showAllbutton.classList.add("hidden");
  }

  // console.log("is show all", displayAll);
  // slice the result in (0-12) if dispaly all is not preesed
  if (!displayAll) {
    phone = phone.slice(0, 12);
  }

  // ekta ekta kore element dakhar jonno forEach marlam
  phone.forEach((element) => {
    // console.log(element);
    //2. create div
    const createDiv = document.createElement("div");
    createDiv.classList = "card bg-neutral-50 pt-10 shadow-xl";
    // 3.set inner HTML
    createDiv.innerHTML = `
    <figure>
    <img 
      src="${element.image}"
      alt="Shoes"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${element.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
      <button onclick="showDetail('${element.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
    `;
    getContainer.appendChild(createDiv);
  });
  loading(false);
};
// phoneFind();

// search button
const searchBtn = (displayAll) => {
  // calling loader
  loading(true);
  const getSearch = document.getElementById("search-input");
  const items = getSearch.value;
  // console.log(items);
  phoneFind(items, displayAll);
};

//spnnier section
const loading = (isLoading) => {
  const loadingId = document.getElementById("loading-id");
  if (isLoading) {
    loadingId.classList.remove("hidden");
  } else {
    loadingId.classList.add("hidden");
  }
};

// show all
const handleShowAll = () => {
  searchBtn(true);
};

// show details button
const showDetail = async (idshow) => {
  // console.log("click", idshow);
  const idNo = await fetch(
    `https://openapi.programming-hero.com/api/phone/${idshow}`
  );
  const data = await idNo.json();
  const deviceDetails = data.data;

  showDeatilModal(deviceDetails);
};

// Modal afer click the show detail button
const showDeatilModal = (element) => {
  console.log(element);

  // const devisenameFromData = document.getElementById("device-name");
  // devisenameFromData.innerText = element.name;

  const deviceDetail = document.getElementById("show-all-info");
  deviceDetail.innerHTML = `
  <img class="mx-auto" src="${element.image}" alt=""/>
  <h1 class="font-bold text-xl text-center my-5 ">${element.name}</h1> 
  <p><span class="font-bold">Brand: </span>${element.brand}<p> 
  <p><span class="font-bold">Storage: </span>${element.mainFeatures.storage}<p> 
  <p><span class="font-bold">Display Size: </span>${
    element.mainFeatures.displaySize
  }<p> 
  <p><span class="font-bold">Memory: </span>${element.mainFeatures.memory}<p> 
   <p><span class="font-bold">Release Date: </span>${
     element?.releaseDate || "Not available"
   }<p> 
  <p><span class="font-bold">USB: </span>${element.others.USB}<p>
    <p><span class="font-bold">GPS: </span>${
      element.others?.GPS ? element.others.GPS : "Not Available"
    }<p> 
  <p><span class="font-bold">WLAN: </span>${element.others.WLAN}<p> 
  <p><span class="font-bold">Slug: </span>${element.slug}<p> 
  
  `;
  // call the modal
  my_details_modal.showModal();
};
