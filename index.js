
const showFeatures = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
      fetch (url)
        .then((response) => response.json())
        .then((data => displayFeatures(data.data.tools)));
        loader(true);
}


const displayFeatures = (features) => {
    // console.log(Features)
    const featuresContainer = document.getElementById('display-features-container');

    // const seeMoreBtn = document.getElementById('see-more-btn');
    // if(features.length > 6){
    //   features = features.slice(0, 6);
      
    //   seeMoreBtn.classList.remove('d-none')
    // }
    // else{
    //   seeMoreBtn.classList.add('d-none')
    // }
    
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
    });
    loader(false);
}

const featuresAdd = features => {
  let featureHTML = '';
  let counter = 1;
  for(let value of features){
    featureHTML += `<p class="fs-6 text-secondary">${counter} . ${value}</p>`;
    counter ++;
  }
  return featureHTML;
};

const detailsInfo = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch (url)
      .then((response => response.json()))
      .then((data => displayDetails(data.data)));
      loader(true);
}

const displayDetails = (data) => {

  // console.log(data)
  const {description, image_link, accuracy, input_output_examples, integrations, pricing} = data;
  
  const featuresObj = data.features;
  const featuresObjValue = Object.values(featuresObj);
  const featureNames = featuresObjValue.map(obj => obj.feature_name);
  // console.log(featuresObjValue)
  console.log(pricing)
  
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
        <div class="col-6 col-md-4">
          <div style="min-height: 100px;" class="d-flex flex-column align-items-center justify-content-center rounded bg-white text-success-emphasis fw-bold">
          ${pricingDisplay1(pricing)}
          </div>
        </div>
        <div class="col-6 col-md-4">
          <div style="min-height: 100px;" class="d-flex flex-column align-items-center justify-content-center rounded bg-white text-warning fw-bold">
           ${pricingDisplay2(pricing)}
          </div>
        </div>
        <div class="col-12 col-md-4 mt-2 mt-md-0">
          <div style="min-height: 100px;" class="d-flex flex-column align-items-center justify-content-center rounded bg-white text-danger fw-bold">
           ${pricingDisplay3(pricing)}
          </div>
        </div>
     </div>    
     <div class="row p-3">
        <div class="col-12 col-md-6">
          <div>
            <h4>Features</h4>
            ${modalFeaturesAdd(featureNames)}
          </div>
        </div> 
        <div class="col-12 col-md-6 mt-3 mt-md-0">
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
         ${inpOut(input_output_examples)}
       </div>
      </div>
   </div>
  `
  modalBody.appendChild(createDiv);
  loader(false);
}


// pricing-1

const pricingDisplay1 = (pricing) => {
  let priceHTML = '';
  if (pricing != null) {
    for (let i = 0; i < 1; i++) {
      const priceValue = pricing[i];
      let priceText = priceValue.price == "0" ? 'no cost' : priceValue.price;
      priceHTML += `
        <p class="m-0 p-0">${priceText}</p>
        <p class="m-0 p-0">${priceValue.plan}</p>
      `;
    }
  } else {
    priceHTML = 'Unavailable';
  }
  return priceHTML;
};


// pricing-2

const pricingDisplay2 = (pricing) => {
  let priceHTML = '';
  if (pricing != null) {
    for (let i = 1; i < 2; i++) {
      const priceValue = pricing[i];
      let priceText = priceValue.price ? priceValue.price : 'no cost';
      priceHTML += `
        <p class="m-0 p-0">${priceText}</p>
        <p class="m-0 p-0">${priceValue.plan}</p>
      `;
    }
  } else {
    priceHTML = 'Unavailable';
  }
  return priceHTML;
};

// pricing3

const pricingDisplay3 = (pricing) => {
  let priceHTML = '';
  if (pricing != null) {
    for (let i = 2; i < 3; i++) {
      const priceValue = pricing[i];
      let priceText = priceValue.price ? priceValue.price : 'no cost';
      priceHTML += `
        <p class="m-0 p-0">${priceText}</p>
        <p class="m-0 p-0">${priceValue.plan}</p>
      `;
    }
  } else {
    priceHTML = 'Unavailable';
  }
  return priceHTML;
};
// input output null error value
const inpOut = (input_output_examples) => {
  let inpOutHTML = '';
  if (input_output_examples != null) {
    for(let i = 0; i < 1; i++){
      const unit = input_output_examples[i];
      const input = unit.input === "function reverseString(str) {\n return str.split('').reverse().join('');\n}" ? "coming soon.." : unit.input;
      const output = unit.output === "function reverseString(str) {\n return str.split('').reverse().join('');\n}" ? "coming soon" : unit.output;
      inpOutHTML += `<h4 class="text-center">${input}</h4>
                     <p class="text-secondary text-center">${output}</p>`;
    }
  }
  return inpOutHTML;
}


// modal features
const modalFeaturesAdd = featureNames => {
  let featureObjHTML = '';
  for(let featureName of featureNames){
    featureObjHTML += `<li class="text-secondary">${featureName}</li>`;
    // console.log(featureName)
  }
  return featureObjHTML;
};

// modal integrations

const modalIntegrationsAdd = integrations => {
  let integrationsHTML = '';
  if (integrations != null) {
    for(let integration of integrations){
      integrationsHTML += `<li class="text-secondary">${integration}</li>`;
    }
  } else {
    integrationsHTML = '<li class="text-secondary">Coming soon...</li>';
  }
  return integrationsHTML;
};


// loader

const loader = (isLoading) => {
  const loadSection = document.getElementById('load-section');
  if(isLoading == true){
      loadSection.classList.remove('d-none')
  }
  else{
      loadSection.classList.add('d-none')
  }
  
}


//

// document.getElementById('btnAll').addEventListener('click', function(){
//   displayFeatures()
// })
