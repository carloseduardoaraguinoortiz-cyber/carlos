const form = document.getElementById('registrationForm');
const inputs = form.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
        if (input.id === 'password') {
            checkPasswordStrength(input.value);
        }
    });
});

function validateField(input) {
    const group = input.closest('.form-group');
    const error = group.querySelector('.error-message');

    if (input.id === 'confirmPassword') {
        if (input.value !== password.value) {
            showError(group, error, 'Las contraseñas no coinciden');
            return false;
        }
    }

    if (!input.checkValidity()) {
        showError(group, error, 'Campo inválido');
        return false;
    }

    showSuccess(group);
    return true;
}

function showError(group, error, msg) {
    group.classList.add('error');
    group.classList.remove('valid');
    group.querySelector('input').classList.add('invalid');
    error.textContent = msg;
}

function showSuccess(group) {
    group.classList.remove('error');
    group.classList.add('valid');
    group.querySelector('input').classList.remove('invalid');
    group.querySelector('input').classList.add('valid');
}

function checkPasswordStrength(password) {
    const bar = document.querySelector('.strength-bar');
    const text = document.querySelector('.strength-text');

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    bar.className = 'strength-bar';

    if (score <= 2) {
        bar.classList.add('weak');
        text.textContent = 'Débil';
    } else if (score <= 4) {
        bar.classList.add('medium');
        text.textContent = 'Media';
    } else {
        bar.classList.add('strong');
        text.textContent = 'Fuerte';
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    inputs.forEach(i => valid &= validateField(i));

    if (valid) {
        alert('🎉 Registro exitoso');
        form.reset();
        document.querySelector('.strength-text').textContent = '';
        document.querySelector('.strength-bar').className = 'strength-bar';
    }
});
