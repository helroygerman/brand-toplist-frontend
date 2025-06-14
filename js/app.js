const API_URL = 'http://localhost:8000/api/v1/toplist';

async function fetchToplist() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderToplist(data.brands);
  } catch (error) {
    document.getElementById('brand-list').innerHTML = `
      <div class="col-12 text-center text-danger">Failed to load toplist.</div>
    `;
    console.error(error);
  }
}

function renderToplist(brands) {
  const container = document.getElementById('brand-list');
  container.innerHTML = '';

  brands.forEach(brand => {
    const card = document.createElement('div');
    card.className = 'col-12 col-sm-6 col-md-4 col-lg-3';

    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${brand.brand_image}" alt="${brand.brand_name}" class="card-img-top" />
        <div class="card-body text-center">
          <h5 class="card-title">${brand.brand_name}</h5>
           <div class="stars-number">${brand.rating}</div>
          <div class="stars">${renderStars(brand.rating)}</div>
          
          
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderStars(rating) {
  const full = '★'.repeat(rating);
  const empty = '☆'.repeat(5 - rating);
  return full + empty;
}

fetchToplist();
