$(document).ready(function(){

    $("btnmodal").click(function(){

        let noms = $("form").serialize();
        let pass = $("form").serializeArray();
        
        //Affiche les résultats dans la console
        console.log(noms);
        console.log(pass);
    });
});