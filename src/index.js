document.addEventListener("DOMContentLoaded", function(event) {
    console.log('%c HI', 'color: firebrick')

    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(json => {
        const imageBox = document.getElementById("dog-image-container");
        json.message.forEach(function(url){
            const imageSpot = document.createElement('img');
            imageSpot.setAttribute("src", url)
            imageBox.appendChild(imageSpot)
        })
    })

    fetchData();
    
    const breeds = document.getElementById('dog-breeds')
    breeds.addEventListener('click', e => {
        if (e.target.tagName === 'LI') {
            // console.log(e.target)
            e.target.style.color = "red"
        }
    })

    const dropDown = document.getElementById('breed-dropdown')
    dropDown.addEventListener('change', function(e) {
        breeds.innerHTML = '';
        fetchData(dropDown.value)
    })

})

function fetchData(filter = "all") {
    // console.log(filter)
    
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(json => {
        const tree = document.getElementById("dog-breeds");
        
        // console.log("json.message: ", json.message)
        for (const breed in json.message) {
            // console.log(breed)
            if (filter === "all" || filter === breed[0]) {

                const branch = document.createElement('li')
                branch.innerText = breed
                tree.appendChild(branch)
                
                const arr = json.message[breed];
                
                if (arr.length > 0) {
                    const twig = document.createElement('ul')
                    branch.appendChild(twig)
                    
                    for (const type of arr) {
                        const leaf = document.createElement('li')
                        leaf.innerText = type
                        twig.appendChild(leaf)
                    }
                }
            }
        }
    })
}