 /* =============== FONCTION AUTOSTART CHECK INPUT FORMULAIRE ======================= */

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
        false // je crois c'est pour le bouillonnement false par défaut si true = capture
    );
})(); // la fonction qui s'auto lance (encapsulée ds une autre fonction)

/* =============== FONCTIONS DE VALIDATION DIF INPUT  ====================== */

// validation d'un champ REQUIRED
const validateRequired = (input) => !(input.value == null || input.value == '');

// validation du nombre de caractéres min et max
const validateLength = (input, minLength, maxLength) =>
    !(input.value.length < minLength || input.value.length > maxLength);

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

// validation du code postal
const validatePostCode = (input) =>
    input.value.match('^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$');

// validation adresse
const validateAddress = (input) => input.value.match(/^\s*\S+(?:\s+\S+){2}/);

// validation numéro de téléphone
const validatePhoneNumber = (input) =>
    input.value.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/);

// validation d'un checxbox
const validateTerms = (input) => input.checked;

/* =============== VALIDATION DES CHAMPS DE FORMULAIRES =================== */

function validateFields(input) {
    let fieldName = input.name;

    switch (fieldName) {
        // validation du champ Prénom -------------------
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
        // validation du champ Nom ------------------------
        case 'lastName':
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
        // validation du champ Email ---------------------
        case 'email':
            if (!validateRequired(input)) {
                return false;
            }
            if (!validateMail(input)) {
                return false;
            }
            return true;
        // validation du numéro de téléphone ---------------------
        case 'phoneNumber':
            if (!validateRequired(input)) {
                return false;
            }
            if (!validatePhoneNumber(input)) {
                return false;
            }
            return true;
        // validation de l'adresse ---------------------
        case 'address':
            if (!validateRequired(input)) {
                return false;
            }
            if (!validateAddress(input)) {
                return false;
            }
            return true;
        // validation de la ville ---------------------
        case 'city':
            if (!validateRequired(input)) {
                return false;
            }
            return true;
        // validation du code postal ---------------------
        case 'postCode':
            if (!validateRequired(input)) {
                return false;
            }
            if (!validatePostCode(input)) {
                return false;
            }
            return true;
        // validation de la check-box ---------------------
        case 'conditions':
            if (!validateRequired(input)) {
                return false;
            }
            return true;
        default:
            break;
    }
}
