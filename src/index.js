console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", ()=>{
    renderAllDogs(); 
    renderAllBreeds();
    document.getElementById("dog-breeds").addEventListener("click", function(e){
        e.target.style.color = '#B66C6D'
    })
    document.getElementById("breed-dropdown").addEventListener("change", function(e){  
        const option = e.target.value
        filterBreeds(option)
    })
})


function renderAllDogs() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(result => result.json())
    .then(data => data['message'].forEach(dog => renderDog(dog)))
    // .then(data => console.log(data))
}

function renderDog(dog) {
    const img = document.createElement('img')
    img.src = dog
    const dogContainer = document.getElementById("dog-image-container")
    dogContainer.appendChild(img)
}

function renderAllBreeds(){
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(result => result.json())
    .then(data => Object.keys(data['message']).forEach(breed => renderBreed(breed)))
}

function renderBreed(breed) {
    const li = document.createElement('li')
    li.textContent = breed
    const breedContainer = document.getElementById("dog-breeds")
    breedContainer.appendChild(li)
}

function filterBreeds(option) {
    const breedContainer = document.getElementById("dog-breeds")
    while(breedContainer.firstChild) breedContainer.removeChild(breedContainer.firstChild);
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(result => result.json())
    .then(data => Object.keys(data['message']).filter(breed => breed.charAt(0) === option))
    .then(breeds => breeds.forEach(breed => renderBreed(breed)))
}


