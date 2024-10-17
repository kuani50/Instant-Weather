export { search };

//function that allows to find the city code and the name of the city with the postal code 
async function searchWCode(postalCode){
    //the characters that are allowed
    const regex = new RegExp(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/);

    //tests if the postal code corresponds to the permitted characters
    if(regex.test(postalCode) == false){
        //if the postal code does not match it ends the function
        return null;
    }

    //asks the API about the informations it has about the postal code in parameter
    let reponse = await fetch("https://geo.api.gouv.fr/communes?codePostal=" + postalCode);
    let tab = await reponse.json();

    let result = [];

    tab.forEach(element => {
        result.push({"code":element.code, "nom":element.nom});
    });

    //returns an array with the city code and the name of the city
    return result;
}




//function that allows to find the city code and the code of the city with the name of the city 
async function searchWName(cityName){

    //asks the API about the informations it has about the name enter in parameter
    let reponse = await fetch("https://geo.api.gouv.fr/communes?nom=" + cityName +"&fields=departement&boost=population&limit=5");
    let tab = await reponse.json();

    let result = [];

    
    tab.forEach(element => {
        result.push({"code":element.code, "nom":element.nom});
    });
    //returns an array with the city code and the name of the city
    return result;
}

async function search(input){

    //the characters to see if it corresponds to a postal code
    const regex = new RegExp(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/);

    let tab = [];

    if(regex.test(input) == true){
        tab = await searchWCode(input);
    }else{
        tab = await searchWName(input);
    }

    return tab;
}

