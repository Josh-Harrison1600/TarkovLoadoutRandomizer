// Variables to hold the loadout data
let pistols, assaultCarbine, boltAction, marksmanRifle, grenadeLauncher, lmg, SMG, shotgun, ar, armorClass, armorVestClass, tacticalRigClass, helmetClass1, helmetClass2, helmetClass3, helmetClass4, helmetClass5, helmetClass6, headphones, maps, bags;

// Fetch the loadout data from the JSON file
fetch('loadoutData.json')
    .then(response => response.json())
    .then(data => {
        // Assign the fetched data to the corresponding variables

        // Weapons
        pistols = data.pistols;
        SMG = data.SMG;
        shotgun = data.shotgun;
        ar = data.ar;
        assaultCarbine = data.assaultCarbine;
        boltAction = data.boltAction;
        marksmanRifle = data.marksmanRifle;
        grenadeLauncher = data.grenadeLauncher;
        lmg = data.lmg;

        // Armor
        armorClass = data.armorClass;
        armorVestClass = data.armorVestClass;
        tacticalRigClass = data.tacticalRigClass;

        // Helmets
        helmetClass1 = data.helmetClass1;
        helmetClass2 = data.helmetClass2;
        helmetClass3 = data.helmetClass3;
        helmetClass4 = data.helmetClass4;
        helmetClass5 = data.helmetClass5;
        helmetClass6 = data.helmetClass6;

        // Miscellaneous
        headphones = data.headphones;
        maps = data.maps;
        bags = data.bags;

        console.log("Data loaded successfully:", data); // Debugging: Check if data is loaded
    })
    .catch(error => console.error('Error fetching JSON data:', error));

// Function to select a random item from an array
function getRandomItem(array) {
    if (!array || array.length === 0) return null; // Return null if the array is empty or null
    const randomIndex = Math.floor(Math.random() * array.length); // Generate a random index
    return array[randomIndex]; // Return the item at the random index
}

// Function to get a random loadout item based on selected checkboxes
function getRandomLoadoutItem(checkboxIds, dataArrays) {
    let loadoutItems = [];
    for (let i = 0; i < checkboxIds.length; i++) {
        if (document.getElementById(checkboxIds[i]).checked) { // Check if the checkbox is selected
            loadoutItems = loadoutItems.concat(dataArrays[i]); // Add the corresponding data array to loadoutItems
        }
    }
    return getRandomItem(loadoutItems); // Return a random item from the combined loadoutItems
}

// Function to append the generated loadout item to the output container
function appendLoadoutItem(container, loadoutItem, label) {
    if (loadoutItem) {
        const itemText = document.createElement('p'); // Create a new <p> element
        itemText.textContent = `${label}: ${loadoutItem}`; // Set the text content to the loadout item
        itemText.className = 'randomItemStyle'; // Add a class for styling
        container.appendChild(itemText); // Append the <p> element to the container
    }
}

// Event listener for the "Generate Loadout" button
document.getElementById('myButton').addEventListener('click', function() {
    // Check if all data is loaded
    if (!armorClass || !armorVestClass || !tacticalRigClass
        || !helmetClass1 || !helmetClass2 || !helmetClass3 || !helmetClass4 || !helmetClass5 || !helmetClass6 || 
        !headphones || !maps || !bags || 
        !pistols || !SMG || !shotgun || !ar || !assaultCarbine || !boltAction || !marksmanRifle || !grenadeLauncher || !lmg){
        console.error("Data not loaded yet. Please wait.");
        return;
    }

    const outputDiv = document.getElementById('buttonOutput');
    outputDiv.innerHTML = ''; // Clear previous output

    // Generate and append a random map
    const mapSelection = getRandomLoadoutItem(
        ['mapCheckbox'],
        [maps]
    );
    appendLoadoutItem(outputDiv, mapSelection, "Map");

    // Generate and append a random gun
    const gun = getRandomLoadoutItem(
        ['pistolCheckbox', 'smgCheckbox', 'shotgunCheckbox', 'arCheckbox', 'acCheckbox', 'boltCheckbox', 'marksmanCheckbox', 'glCheckbox', 'lmgCheckbox'],
        [pistols, SMG, shotgun, ar, assaultCarbine, boltAction, marksmanRifle, grenadeLauncher, lmg]
    );
    appendLoadoutItem(outputDiv, gun, "Gun");

    // Generate and append a random helmet
    const helmetLoadout = getRandomLoadoutItem(
        ['helmetCheckbox1', 'helmetCheckbox2', 'helmetCheckbox3', 'helmetCheckbox4', 'helmetCheckbox5', 'helmetCheckbox6'],
        [helmetClass1, helmetClass2, helmetClass3, helmetClass4, helmetClass5, helmetClass6]
    );
    appendLoadoutItem(outputDiv, helmetLoadout, "Helmet");

    // Generate and append a random headset
    const headsetLoadout = getRandomLoadoutItem(
        ['headphoneCheckbox'],
        [headphones]
    );
    appendLoadoutItem(outputDiv, headsetLoadout, "Headset");

    // Generate and append a random armor item
    const armorLoadout = getRandomLoadoutItem(
        ['armorCheckbox'],
        [armorClass]
    );
    appendLoadoutItem(outputDiv, armorLoadout, "Armor Vest");

    // Generate and append a random tactical rig
    const tacticalRigLoadout = getRandomLoadoutItem(
        ['tacticalRigCheckbox'],
        [tacticalRigClass]
    );
    appendLoadoutItem(outputDiv, tacticalRigLoadout, "Tactical Rig");

    // Generate and append a random armor rig
    const armorRigLoadout = getRandomLoadoutItem(
        ['armorRigCheckbox'],
        [armorVestClass]
    );
    appendLoadoutItem(outputDiv, armorRigLoadout, "Armored Rig");

    // Generate and append a random backpack
    const bagLoadout = getRandomLoadoutItem(
        ['bagCheckbox'],
        [bags]
    );
    appendLoadoutItem(outputDiv, bagLoadout, "Bag");
});

//Listener for the 'select all' checkbox
document.getElementById('selectAllCheckbox').addEventListener('change', function(){
    const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
    const isChecked = this.checked;
    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
});
