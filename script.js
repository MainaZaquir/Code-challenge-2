const animalList = document.getElementById('animal-list');
const animalDetails = document.getElementById('animal-details');


let animals = [
    { id: 1, name: 'Mr. Cute', image: 'https://thumbs.gfycat.com/EquatorialIckyCat-max-1mb.gif', votes: 0 },
    { id: 2, name: 'Mx. Monkey', image: 'https://thumbs.gfycat.com/FatalInnocentAmericanshorthair-max-1mb.gif', votes: 0 },
    { id: 3, name: 'Ms. Zebra', image: 'https://media2.giphy.com/media/20G9uNqE3K4dRjCppA/source.gif', votes: 0 },
    { id: 4, name: 'Dr. Lion', image: 'http://bestanimations.com/Animals/Mammals/Cats/Lions/animated-lion-gif-11.gif', votes: 0 },
    { id: 5, name: 'Mme. Panda', image: 'https://media.giphy.com/media/ALalVMOVR8Qw/giphy.gif', votes: 0 }
];

// Function for fetching data from the server
async function fetchData() {
    try {
        const response = await fetch(' https://my-json-server.typicode.com/MainaZaquir/Code-challenge-2');
        animals = await response.json();
        displayAnimals();
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

// Displaying the list of animals
    animals.forEach(character => {
        const listItem = document.createElement('div');
        listItem.textContent = character.name;
        listItem.addEventListener('click', () => showDetails(character));
        animalList.appendChild(listItem);
    });


// Function for displaying the animals details
function showDetails(character) {
    animalDetails.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}">
        <p>Votes: ${character.votes}</p>
        <button onclick="addVote(${character.id})">Vote</button>
        <button onclick="resetVote(${character.id})">Reset Votes</button>
    `;
}

// Function for adding votes
function addVote(id) {
    animals = animals.map(animal => {
        if (animal.id === id) {
            const updatedVotes = animal.votes + 1;
            localStorage.setItem(`votes_${id}`, updatedVotes);
            return { ...animal, votes: updatedVotes };
        }
        return animal;
    });
    const selectedAnimal = animals.find(animal => animal.id === id);
    showDetails(selectedAnimal);
}

// Function for reseting the votes to zero
function resetVote(id) {
    animals = animals.map(animal => {
        if (animal.id === id) {
            localStorage.setItem(`votes_${id}`, 0);
            return { ...animal, votes: 0 };
        }
        return animal;
    });
    const selectedAnimal = animals.find(animal => animal.id === id);
    showDetails(selectedAnimal);
}

// Function for adding new animals
function addAnimal(name, image) {
    const newAnimal = {
        id: animals.length + 1,
        name: name,
        image: image,
        votes: 0
    };
    animals.push(newAnimal);
    const listItem = document.createElement('div');
    listItem.textContent = newAnimal.name;
    listItem.addEventListener('click', () => showDetails(newAnimal));
    animalList.appendChild(listItem);
}

// Function handling the form submitting new animals
function addNewAnimal() {
    const nameInput = document.getElementById('animal-name');
    const imageInput = document.getElementById('animal-image');

    const name = nameInput.value;
    const image = imageInput.value;

    if (name && image) {
        addAnimal(name, image);
        nameInput.value = '';
        imageInput.value = '';
    } else {
        alert('Please fill out both the name and image fields.');
    }
}

// Calling the fetchData function when the page loads
window.onload = fetchData;
