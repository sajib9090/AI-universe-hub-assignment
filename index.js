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
        console.log(singleFeature)
        const createDiv = document.createElement('div');
        createDiv.classList.add('col');
        createDiv.innerHTML = `
        <div class="card h-100">
        <img src="${singleFeature.image}" class="card-img-top p-3" alt="...">
        <div class="card-body">
          <h5 class="card-title fs-3 fw-semibold">Features</h5>
          <p class="fs-6">1. ${singleFeature.features[0]}</p>
          <p class="fs-6">2. ${singleFeature.features[1]}</p>
          <p class="fs-6">3. ${singleFeature.features[2]}</p>
        </div>
        <div class="card-footer bg-transparent">
           <div>
               <h5 class="card-title fs-3 fw-semibold py-3">${singleFeature.name}</h5>
           </div>
           <div class="d-flex align-items-center justify-content-between">
               <p><i class="fa fa-calendar-days"></i> ${singleFeature.published_in}</p>
               <p><i class="fa fa-arrow-right bg-body-tertiary p-2 rounded-circle text-danger"></i></p>
           </div>
        </div>
      </div>
        `
        featuresContainer.appendChild(createDiv)
    })
}
showFeatures()