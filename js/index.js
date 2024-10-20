const loadHunting = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phone = data.data;
    displayPhone(phone, isShowAll);
}

const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    
    // Clear phone container before adding new cards
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');

    // Show 'Show All' button if there are more than 12 phones
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all',isShowAll);
    // Display only the first 12 phones if not showing all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    // Display each phone in the UI
    phones.forEach((phone) => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList = `card bg-base-100 bg-orange-500 mt-4 shadow-xl p-2`;
        
        phoneDiv.innerHTML = `
        <figure>
            <img src="${phone.image}" alt="Phone Image" />
        </figure>
        <div class="card-body">
            <h2 class="card-title text-white">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick='showDetails("${phone.slug}")' class="btn btn-primary">show details</button>
            </div>
        </div>`;
        
        phoneContainer.appendChild(phoneDiv);
    });

    // Hide the spinner once the phones are displayed
    toggleLoadSpinner(false);
}
 const showDetails=async(id)=>{
            // console.log('click me',id);
            const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
            const data =await res.json()
            const phone=data.data
            showPhoneDetails(phone)
 } 

 const showPhoneDetails=(phone)=>{
    console.log(phone);
    
    const phoneName=document.getElementById('show-phone-details')
    phoneName.innerText=phone.name;

    const showDetailContainer=document.getElementById('show-details-container')
    showDetailContainer.innerHTML=`
    <img src="${phone.image}" alt=""/>
    <p>${phone.name}</p>
    <p>releaseDate '${phone.releaseDate}'</p>
    <p>brand:${phone.brand}</p>
    
    `
  show_Details_Modal.showModal()

 }



const searchButton = (isShowAll) => {
    toggleLoadSpinner(true);
    const inputField = document.getElementById('input-container');
    const inputText = inputField.value;
    inputField.value = '';

    loadHunting(inputText, isShowAll);
}

// Spinner toggle function
const toggleLoadSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
}

// Handle 'Show All' button click
const handelShowAll = () => {
    searchButton(true);
}
