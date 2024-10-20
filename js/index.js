const loadHunting = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phone = data.data
    displayPhone(phone);
}

const displayPhone = phones => {
    const phoneContainer=document.getElementById('phone-container')
    // clear phn container before the adding cards 
    phoneContainer.textContent='';
    const showAllContainer=document.getElementById('show-all-container')
    if(phones.length>12){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    
    //display only output 10 phone 
    phones=phones.slice(0,12)
    // console.log(phones);
    // forEach use we are look the ui one one card 
    phones.forEach(phone => {
        console.log(phone);
        // create a div section
        const phoneDiv = document.createElement('div')
        // and add the class list for the card 
        phoneDiv.classList = `card bg-base-100 bg-orange-500 mt-4 shadow-xl p-2`
        //get the inner html 
    phoneDiv.innerHTML = `
    <figure>
        <img
        
            src="${phone.image}" />  
        </figure>
        <div class="card-body">
        <h2 class="card-title text-white">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
        </div>
        </div>
`;
 phoneContainer.appendChild(phoneDiv)
        
    });
    // hide the the spinner 
    toggleLoadSpinner(false)
    
}

const searchButton=()=>{
 const inputField=document.getElementById('input-container')
 const inputText=inputField.value 
 inputField.value=''
//  console.log(inputText);
toggleLoadSpinner(true)
loadHunting(inputText)

}

const toggleLoadSpinner=(isLoading)=>{
    const spinner=document.getElementById('spinner')
    if(isLoading){
        spinner.classList.remove('hidden')
    }
    else{
        spinner.classList.add('hidden')
    }


}
// loadHunting();