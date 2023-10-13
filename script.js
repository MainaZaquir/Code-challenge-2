document.addEventListener('DOMContentLoaded', function() {
    const animalListElem = document.querySelector('.animal-list');
    const animalDetailsElem = document.querySelector('.animal-details');
    const addAnimalForm = document.getElementById('add-animal-form');
    const resetVotesButton = document.getElementById('reset-votes');

    // Function to fetch the data from the local server
    async function fetchData() {
        const response = await fetch('http://localhost:3000/characters');
        const data = await response.json();
        return data;
    }

    // Function to display the list of animals
    async function renderAnimalList() {
        const data = await fetchData();
        animalListElem.innerHTML = '';
        data.characters.forEach(animal => {
            const animalElem = document.createElement('div');
            animalElem.innerHTML = `
                <h3>${animal.name}</h3>
            `;
            animalElem.addEventListener('click', () => {
                renderAnimalDetails(animal);
            });
            animalListElem.appendChild(animalElem);
        });
    }

    // Function to render the details of a selected animal
    function renderAnimalDetails(animal) {
        animalDetailsElem.innerHTML = `
            <h2>${animal.name}</h2>
            <img src="${animal.image}" alt="${animal.name}" />
            <p>Votes: ${animal.votes}</p>
            <button class="vote-button">Vote</button>
        `;
        const voteButton = animalDetailsElem.querySelector('.vote-button');
        voteButton.addEventListener('click', () => {
            animal.votes += 1;
            renderAnimalDetails(animal);
        });
    }

    // Event listener for the add animal form
    addAnimalForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const newAnimalName = document.getElementById('animal-name').value;
        const newAnimalImage = document.getElementById('animal-image').value;
        const newAnimal = {
            id: Date.now(),
            name: newAnimalName,
            image: newAnimalImage,
            votes: 0
        };
        // Simulating adding a new animal to the list (without server persistence)
        const data = await fetchData();
        data.characters.push(newAnimal);
        animalDetailsElem.innerHTML = '';
        renderAnimalList();
    });

    // Event listener for the reset votes button
    resetVotesButton.addEventListener('click', async function() {
        const data = await fetchData();
        data.characters.forEach(animal => {
            animal.votes = 0;
        });
        renderAnimalList();
        animalDetailsElem.innerHTML = '';
    });

    // Initial rendering of the animal list
    renderAnimalList();
});
