export { search };

// Function that allows to find the city code and the name of the city with the postal code 
async function searchWCode(postalCode){
    // The characters that are allowed
    const regex = new RegExp(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/);

    // Tests whether the postal code corresponds to the permitted characters
    if(regex.test(postalCode) == false){
        // If the postal code does not match it ends the function
        return null;
    }

    // Asks the API about the information it has about the postal code in parameter
    const reply = await fetch("https://geo.api.gouv.fr/communes?codePostal=" + postalCode);
    const tab = await reply.json();

    let result = [];

    tab.forEach(element => {
        result.push({"code":element.code, "nom":element.nom});
    });

    // Returns an array with the city code and the name of the city
    return result;
}




// Function that allows to find the city code with the name of the city 
async function searchWName(cityName){

    // Asks the API about the information it has about the city entered as a parameter
    const reply = await fetch("https://geo.api.gouv.fr/communes?nom=" + cityName +"&fields=departement&boost=population&limit=5");
    const tab = await reply.json();

    let result = [];

    
    tab.forEach(element => {
        result.push({"code":element.code, "nom":element.nom});
    });
    // Returns an array with the city code and the name of the city
    return result;
}

async function search(input){

    // The regular expression to check whether the input corresponds to a postal code
    const regex = new RegExp(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/);

    let tab = [];

    if(regex.test(input) == true){
        tab = await searchWCode(input);
    }else{
        tab = await searchWName(input);
    }

    return tab;
}

