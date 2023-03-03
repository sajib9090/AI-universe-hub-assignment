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
    featureHTML += `<p class="fs-6">${value}</p>`;
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

  // console.log(data)
  const {description, image_link, accuracy, input_output_examples, integrations, pricing} = data;
  console.log(integrations)
  const featuresObj = data.features;
  const featuresObjValue = Object.values(featuresObj);
  const featureNames = featuresObjValue.map(obj => obj.feature_name);
  // console.log(featuresObjValue)
  // console.log(featureNames)
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = '';
  const createDiv = document.createElement('div');
  createDiv.classList.add('row', 'p-3')
  createDiv.innerHTML = `
   <div class="col-12 col-md-6 p-3">
      <div class="border rounded bg-danger-subtle">
      <div class="p-3">
      <h4>${description}</h4>
     </div>
     <div class="row p-3 text-center">
        <div class="col-4">
          <div style="min-height: 100px;" class="d-flex flex-column align-items-center justify-content-center rounded bg-white text-success-emphasis fw-bold">
           <p class="p-0 m-0">${pricing[0].price}</p>
           <p class="p-0 m-0">${pricing[0].plan}</p>
          </div>
        </div>
        <div class="col-4">
          <div style="min-height: 100px;" class="d-flex flex-column align-items-center justify-content-center rounded bg-white text-warning fw-bold">
          <p class="p-0 m-0">${pricing[1].price}</p>
          <p class="p-0 m-0">${pricing[1].plan}</p>
          </div>
        </div>
        <div class="col-4">
          <div style="min-height: 100px;" class="d-flex flex-column align-items-center justify-content-center rounded bg-white text-danger fw-bold">
          <p class="p-0 m-0">${pricing[2].price}</p>
          <p class="p-0 m-0">${pricing[2].plan}</p>
          </div>
        </div>
     </div>    
     <div class="row p-3">
        <div class="col-6">
          <div>
            <h4>Features</h4>
            ${modalFeaturesAdd(featureNames)}
          </div>
        </div> 
        <div class="col-6">
          <div>
            <h4>Integrations</h4>
            ${modalIntegrationsAdd(integrations)}
          </div>
        </div> 
     </div> 
      </div>
      
   </div>
   <div class="col-12 col-md-6 p-3">
      <div class="border rounded">
       <img class="w-100 p-3 rounded" src="${image_link[0]}">
       <div class="accuracy position-relative">
       <p class="btn btn-danger py-1">${accuracy.score * 100 <= 0 ? "0" : accuracy.score * 100}% accuracy found</p>
       </div>
       <div class="p-3">
         <h4 class="text-center">${input_output_examples == null ?'Not Found' : input_output_examples[0].input}</h4>
         <p class="text-center">${input_output_examples.output == "function reverseString(str) {\n return str.split('').reverse().join('');\n}" ? "" : input_output_examples[0].output}</p>
       </div>
      </div>
   </div>
  `
  modalBody.appendChild(createDiv);
}

// modal features
const modalFeaturesAdd = featureNames => {
  let featureObjHTML = '';
  for(let featureName of featureNames){
    featureObjHTML += `<li>${featureName}</li>`;
    // console.log(featureName)
  }
  return featureObjHTML;
};

// modal integrations

const modalIntegrationsAdd = integrations => {
  let integrationsHTML = '';
  for(let integration of integrations){
    integrationsHTML += `<li>${integration}</li>`;
    // console.log(featureName)
  }
  return integrationsHTML;
};


