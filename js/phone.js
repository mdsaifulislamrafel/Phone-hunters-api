const lodePhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    // display show all button if there are more then 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    // display only first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
                            alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title text-black">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard)
    });
    toggleLoadingSpinner(false);
};



// handle show phone details
const handleShowDetails = async (id) => {
    // console.log('handleShowDetails', id);

    // load single phone details
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);

};

const showPhoneDetails = (phone) => {
    console.log(phone.brand);
    const showDetailsPhoneName = document.getElementById('show-details-phone-name');
    showDetailsPhoneName.textContent = phone.name;

    const brandName = document.getElementById('brand-name');
    brandName.innerText = phone.brand;
    // <img src="${phone.image}" alt="Shoes" />
    // `


    
    // show the phone details modal
    show_details_modal.showModal();
};


const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field').value;
    lodePhone(searchField, isShowAll);
};



const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
};


// handle show all phones

const handleShowAll = () => {
    handleSearch(true);
};

lodePhone();