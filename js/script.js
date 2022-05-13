// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';
    //Récupération du formulaire
    let form = document.getElementById('validForm');

    //Ecoute de l'action submit
    form.addEventListener(
        'submit',
        (e) => {
            // On met dans un tableau tous les éléments (input, select, button) du formulaire elements = mot clé pour les formulaires, il désigne seulement les inputs, select, button, etc....
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
        false // je crois c'est pour le bouillonnement
    );
})(); // la fonction qui s'auto lance (encapsulée ds une autre fonction)

// _____________________________________________________________________

/* ------------------- fonctions de validations générales (vide, nb charactéres, etc...) --------------------------------------------- */

// validation d'un champ REQUIRED

const validateRequired = (input) => {
    return !(input.value == null || input.value == '');
};

// validation du nombre de caractéres min et max
const validateLength = (input, minLength, maxLength) => {
    return !(input.value.length < minLength || input.value.length > maxLength);
};

// validation d'un input text (Regex)
const validateText = (input) => input.value.match('^[A-z]+$');

// validation d'un input email (Regex)
const validateMail = (input) => {
    let email = input.value;
    let positionArrobase = email.indexOf('@'); // position de l'@
    let positionLastPoint = email.lastIndexOf('.'); // position de la derniere occurence '.'

    return !(
        positionArrobase < 1 ||
        positionLastPoint - positionArrobase < 2 ||
        positionLastPoint == email.length - 1
    );
};

/* ------------------- fonctions de validations par type d'input --------------------------------------------- */

const validateFields = (input) => {
    let fieldName = input.name;

    // validation du champ Prénom
    /* if (fieldName == 'firstName') {
        if (!validateRequired(input)) {
            return false;
        }
        if (!validateLength(input, 2, 20)) {
            return false;
        }
        if (!validateText(input)) {
            return false;
        }
        return true;
    }

    // validation du champ Email
    if (fieldName == 'email') {
        if (!validateMail(input)) {
            return false;
        }
    } */

    switch (fieldName) {
        // validation du champ Prénom
        case 'firstName':
            if (!validateRequired(input)) {
                return false;
            }
            if (!validateLength(input, 2, 20)) {
                return false;
            }
            if (!validateText(input)) {
                return false;
            }
            return true;
        // validation du champ Email
        case 'email':
            if (!validateMail(input)) {
                return false;
            }
            return true;
    }
};
