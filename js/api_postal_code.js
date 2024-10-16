export { search };

//function that allows to find the city code and the name of the city with the postal code 
async function search(postalCode){
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

