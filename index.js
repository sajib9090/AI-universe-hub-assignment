let count = 0;
const showFeatures = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
      fetch (url)
        .then((response) => response.json())
        .then((data => displayFeatures(data.data.tools)))
}


const displayFeatures = (features) => {
    // console.log(Features)
    const featuresContainer = document.getElementById('display-features-container');
    features.forEach((singleFeature) => {
        // console.log(singleFeature)
        
        const {image, features, name, published_in, id} = singleFeature;
        const createDiv = document.createElement('div');
        
        createDiv.classList.add('col');
        createDiv.innerHTML = `
        <div class="card h-100">
        <img src="${image}" class="card-img-top p-3" alt="...">
        <div class="card-body">
          <h5 class="card-title fs-3 fw-semibold">Features</h5>
          ${featuresAdd(features)}
        </div>
        <div class="px-3">
        <hr class="text-secondary">
           <div>
               <h5 class="card-title fs-3 fw-semibold py-3">${name}</h5>
           </div>
           <div class="d-flex align-items-center justify-content-between">
               <p><i class="fa fa-calendar-days"></i> ${published_in}</p>
               <p><i onclick="detailsInfo('${id}')" style="cursor: pointer;" class="fa fa-arrow-right bg-body-tertiary p-2 rounded-circle text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></p>
           </div>
        </div>
      </div>
        `
        featuresContainer.appendChild(createDiv)
    })
}

const featuresAdd = features => {
  let featureHTML = '';
  for(let value of features){
    featureHTML += `<p class="fs-6"> ${value}</p>`
  }
  return featureHTML;
};

const detailsInfo = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch (url)
      .then((response => response.json()))
      .then((data => displayDetails(data.data)))
}

const displayDetails = (data) => {

  console.log(data.pricing)
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = '';
  const createDiv = document.createElement('div');
  createDiv.classList.add('row')
  createDiv.innerHTML = `
   <div class="col-12 col-md-6 p-3">
      <div class="border rounded">
       <h4>${data.description}</h4>
      </div>
      <div class="row">
         <div class="col-4">
           <div class="border">
            
           </div>
         </div>
         <div class="col-4">
           <div class="border">
           </div>
         </div>
         <div class="col-4">
           <div class="border">
           </div>
         </div>
      </div>
   </div>
   <div class="col-12 col-md-6 p-3">
      <div class="border rounded">
       <img class="w-100 p-3 rounded" src="${data.image_link[0]}">
      </div>
   </div>
  `
  modalBody.appendChild(createDiv);
}

