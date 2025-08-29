
const cars = [
    { id: 1, name: "Mahindra Scorpio", type: "SUV", fuel: "Petrol", transmission: "Manual", price: 2500, img: "https://imgd.aeplcdn.com/664x374/n/cw/ec/128413/scorpio-exterior-right-front-three-quarter-47.jpeg?isig=0&q=80" },
    { id: 1, name: "Mahindra Thar", type: "SUV", fuel: "Petrol", transmission: "Manual", price: 2500, img: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Thar/10741/1755775915560/front-left-side-47.jpg" },
    { id: 1, name: "Toyota Fortuner", type: "SUV", fuel: "Petrol", transmission: "Manual", price: 2600, img: "https://imgd.aeplcdn.com/664x374/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-20.jpeg?isig=0&q=80" },
    { id: 2, name: "Honda City", type: "Sedan", fuel: "Petrol", transmission: "Manual", price: 1800, img: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/134287/city-exterior-right-front-three-quarter-78.jpeg?isig=0&q=80&q=80" },
    { id: 2, name: "Maruti Suzuki Dzire", type: "Sedan", fuel: "Petrol", transmission: "Automatic", price: 1800, img: "https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/170299/dzire-2024-right-front-three-quarter.jpeg?isig=0&q=80" },
    { id: 2, name: "Hyundai-verna", type: "Sedan", fuel: "Petrol", transmission: "Automatic", price: 1800, img: "https://www.motorbeam.com/wp-content/uploads/Hyundai-Verna-Specifications-1.jpg" },
    { id: 3, name: "Maruti Swift", type: "Hatchback", fuel: "Petrol", transmission: "Manual", price: 1500, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrVwoUuEo4ytoHHQPoTBpsQp_c_wIA7irbBQ&s" },
    { id: 3, name: "Hyundai i20 N-Line", type: "Hatchback", fuel: "Petrol", transmission: "Manual", price: 1500, img: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/158139/i20-n-line-exterior-right-front-three-quarter-15.jpeg?isig=0&q=80&q=80" },
    { id: 3, name: "Maruti Baleno", type: "Hatchback", fuel: "Petrol", transmission: "Manual", price: 1600, img: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/102663/baleno-exterior-right-front-three-quarter-71.jpeg?isig=0&q=80&q=80" },
];

const carContainer = document.getElementById('cars');
const filterType = document.getElementById('filterType');
const filterFuel = document.getElementById('filterFuel');
const filterTrans = document.getElementById('filterTrans');
const minPrice = document.getElementById('minPrice');

function renderCars() {
    carContainer.innerHTML = '';
    const filtered = cars.filter(c => {
        return (!filterType.value || c.type === filterType.value)
            && (!filterFuel.value || c.fuel === filterFuel.value)
            && (!filterTrans.value || c.transmission === filterTrans.value)
            && (!minPrice.value || c.price >= parseInt(minPrice.value));
    });
    filtered.forEach(c => {
        carContainer.innerHTML += `
      <div class="car-card">
        <img src="${c.img}" alt="${c.name}">
        <div class="info">
          <h3>${c.name}</h3>
          <p>Type: ${c.type}</p>
          <p>Fuel: ${c.fuel}</p>
          <p>Transmission: ${c.transmission}</p>
          <p>Price: ₹${c.price}/day</p>
          <button class="btn" onclick="openModal(${c.id})">Book Now</button>
        </div>
      </div>`;
    });
}

[filterType, filterFuel, filterTrans, minPrice].forEach(el => el.addEventListener('change', renderCars));

let selectedCar = null;
function openModal(id) {
    selectedCar = cars.find(c => c.id === id);
    document.getElementById('bookingModal').style.display = 'flex';
}
function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('custName').value;
    const email = document.getElementById('custEmail').value;
    const date = document.getElementById('pickupDate').value;
    const notes = document.getElementById('notes').value;
    if (selectedCar) {
        const booking = { car: selectedCar.name, name, email, date, notes };
        let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        alert('Booking Confirmed!');
        closeModal();
        loadBookings();
    }
});

function loadBookings() {
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const container = document.getElementById('myBookings');
    container.innerHTML = '';
    if (bookings.length === 0) { container.innerHTML = '<p>No bookings yet.</p>'; return; }
    bookings.forEach(b => {
        container.innerHTML += `<div class='card'><h3>${b.car}</h3><p>${b.name} (${b.email})</p><p>Date: ${b.date}</p><p>${b.notes}</p></div>`;
    });
}

renderCars();
loadBookings();