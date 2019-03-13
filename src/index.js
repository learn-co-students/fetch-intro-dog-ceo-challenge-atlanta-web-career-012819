console.log('%c HI', 'color: firebrick')


function fetchUrl(prams) {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(data => renderDogImages(data))
    //.then(data => data.forEach(dogImage => renderDogImages(dogImage)))
}

function renderDogImages(data) {
    data.message.forEach(dogUrl => {
        console.log(dogUrl)
        let dogImageDiv = document.getElementById("dog-image-container")
        console.log(dogImageDiv)
        let img = document.createElement("img")
        console.log(img)
        img.src = dogUrl
        console.log(img)
        dogImageDiv.appendChild(img)

    })
}

function fetchDogBreeds(filter="") {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(data => renderDogBreeds(data,filter))
}

function renderDogBreeds(breedList,filter) {
    // breedList.message.forEach(breed =>{
    //     let dogBreedUl = document.getElementById("dog-breeds")
    //     dogBreedUl.appendChild()
    //     console.log(breed)
    // })
    let dogBreedUl = document.getElementById("dog-breeds")
    dogBreedUl.innerHTML = ''
    for( let breed in breedList.message){
        let list = document.createElement("li")
        if (filter !== ""){
            //clear all children
            if(breed.startsWith(filter)){
                dogBreedUl.appendChild(list)
                list.innerHTML = breed
                list.addEventListener('click', event => {
                list.style.color = 'deeppink'
                })
            }
        }else{
            dogBreedUl.appendChild(list)
            list.innerHTML = breed
            list.addEventListener('click', event => {
            list.style.color = 'deeppink'
            //list.hidden = true
            })
        }
        //DeepPink FF1493;
    }

}



function changeFilter(event) {
    fetchDogBreeds(event.target.value)
}
fetchUrl()
fetchDogBreeds()

document.addEventListener("DOMContentLoaded", ()=>{
    //Once all the page is loaded do this code
    let select = document.getElementById("breed-dropdown")
    select.onchange=changeFilter

})