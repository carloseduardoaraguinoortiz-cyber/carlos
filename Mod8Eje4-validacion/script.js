// Elementos del formulario
const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const age = document.getElementById('age');
const terms = document.getElementById('terms');
const submitBtn = document.getElementById('submitBtn');
const formSummary = document.getElementById('formSummary');

// Elementos de requisitos de contraseña
const reqLength = document.getElementById('req-length');
const reqUppercase = document.getElementById('req-uppercase');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';

    switch(field.id) {
        case 'username':
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
            if (!value) {
                message = 'El nombre de usuario es obligatorio';
                isValid = false;
            } else if (!usernameRegex.test(value)) {
                message = 'Solo letras, números y guiones bajos (3-20 caracteres)';
                isValid = false;
            }
            break;

        case 'email':
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu)$/;
            if (!value) {
                message = 'El correo electrónico es obligatorio';
                isValid = false;
            } else if (!emailRegex.test(value)) {
                message = 'Ingresa un correo electrónico válido (.com, .net, .org, .edu)';
                isValid = false;
            }
            break;

        case 'password':
            if (!value) {
                message = 'La contraseña es obligatoria';
                isValid = false;
            } else if (value.length < 8) {
                message = 'Debe tener al menos 8 caracteres';
                isValid = false;
            } else if (!/[A-Z]/.test(value)) {
                message = 'Debe contener al menos una mayúscula';
                isValid = false;
            } else if (!/[0-9]/.test(value)) {
                message = 'Debe contener al menos un número';
                isValid = false;
            } else if (!/[!@#$%^&*]/.test(value)) {
                message = 'Debe contener al menos un carácter especial (!@#$%^&*)';
                isValid = false;
            }
            updatePasswordRequirements(value);
            break;

        case 'confirmPassword':
            if (!value) {
                message = 'Confirma tu contraseña';
                isValid = false;
            } else if (value !== password.value) {
                message = 'Las contraseñas no coinciden';
                isValid = false;
            }
            break;

        case 'age':
            const ageValue = parseInt(value);
            if (!value) {
                message = 'La edad es obligatoria';
                isValid = false;
            } else if (isNaN(ageValue) || ageValue < 18 || ageValue > 120) {
                message = 'Debes ingresar una edad válida (18-120)';
                isValid = false;
            }
            break;
    }

    if (isValid) {
        formGroup.classList.remove('error');
        formGroup.classList.add('valid');
        field.classList.remove('invalid');
        field.classList.add('valid');
        errorMessage.textContent = '';
    } else {
        formGroup.classList.remove('valid');
        formGroup.classList.add('error');
        field.classList.remove('valid');
        field.classList.add('invalid');
        errorMessage.textContent = message;
    }

    return isValid;
}

// Actualizar requisitos visuales de contraseña
function updatePasswordRequirements(password) {
    reqLength.classList.toggle('met', password.length >= 8);
    reqUppercase.classList.toggle('met', /[A-Z]/.test(password));
    reqNumber.classList.toggle('met', /[0-9]/.test(password));
    reqSpecial.classList.toggle('met', /[!@#$%^&*]/.test(password));
}

// Validar checkbox de términos
function validateTerms() {
    const formGroup = terms.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    if (terms.checked) {
        formGroup.classList.remove('error');
        errorMessage.textContent = '';
        return true;
    } else {
        formGroup.classList.add('error');
        errorMessage.textContent = 'Debes aceptar los términos y condiciones';
        return false;
    }
}

// Verificar validez completa del formulario
function checkFormValidity() {
    const isValid = ['username','email','password','confirmPassword','age'].every(id => {
        return document.getElementById(id).classList.contains('valid');
    }) && terms.checked;
    submitBtn.disabled = !isValid;
    return isValid;
}

// Event listeners
['username','email','password','confirmPassword','age'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', () => { validateField(el); checkFormValidity(); });
    el.addEventListener('blur', () => validateField(el));
});

terms.addEventListener('change', () => { validateTerms(); checkFormValidity(); });

// Envío del formulario
form.addEventListener('submit', e => {
    e.preventDefault();
    const allValid = ['username','email','password','confirmPassword','age'].every(id => validateField(document.getElementById(id))) && validateTerms();
    if (allValid) {
        formSummary.innerHTML = `
            <h3>✓ Registro Exitoso</h3>
            <p><strong>Usuario:</strong> ${username.value}</p>
            <p><strong>Email:</strong> ${email.value}</p>
            <p><strong>Edad:</strong> ${age.value} años</p>
        `;
        formSummary.classList.add('show');
        setTimeout(() => {
            form.reset();
            document.querySelectorAll('.form-group').forEach(group => group.classList.remove('valid','error'));
            document.querySelectorAll('input').forEach(input => input.classList.remove('valid','invalid'));
            formSummary.classList.remove('show');
            submitBtn.disabled = true;
        }, 3000);
    }
});
