// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';
    //Récupération du formulaire
    let form = document.getElementById('validForm');

    //Ecoute de l'action submit
    form.addEventListener(
        'submit',
        (e) => {
            // On met dans un tableau tous les éléments (input, select, button) du formulaire
            // et on boucle dessus pour check
            Array.from(form.elements).forEach((element) => {
                if (element.type !== 'submit') {
                    // si l'élément n'est pas validé
                    if (!validateFields(element)) {
                        e.preventDefault();
                        e.stopPropagation();

                        element.classList.remove('is-valid');
                        element.classList.add('is-invalid');
                        // on cible l'élément suivant (div avec text de non validation) est on l'affiche
                        element.nextElementSibling.style.display = 'block';
                        // si l'élément est validé
                    } else {
                        element.nextElementSibling.style.display = 'none';
                        element.classList.remove('is-invalid');
                        element.classList.add('is-valid');
                    }
                }
            });
        },
        false
    );
})();

/* ------------------- fonctions de validations générales (vide, nb charactéres, etc...) --------------------------------------------- */

// validation d'un champ REQUIRED
function validateRequired(input) {
    return !(input.value == null || input.value == '');
}

// validation du nombre de caractéres min et max
/* const validateLength = (input, minLength, maxLength) => {
    return !(input.value.length < minLength && input.value.length > maxLength);
}; */

function validateLength(input, minLength, maxLength) {
    console.log(input.value.length);
    return !(input.value.length < minLength || input.value.length > maxLength);
}

/* ------------------- fonctions de validations par type d'input --------------------------------------------- */

function validateFields(input) {
    let fieldName = input.name;

    // validation du champ Prénom
    if (fieldName == 'firstName') {
        if (!validateRequired(input)) {
            return false;
        }

        if (!validateLength(input, 2, 20)) {
            return false;
        }

        return true;
    }
}
