document.addEventListener('DOMContentLoaded', function() {
    const signupPasswordInput = document.getElementById('signupPassword');
    const forgotPasswordInput = document.getElementById('forgotNewPassword');
    
    if (signupPasswordInput) {
        signupPasswordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthDiv = document.getElementById('signupPasswordStrength');
            
            if (password.length === 0) {
                strengthDiv.innerHTML = '';
                return;
            }
            
            const validation = Validator.validatePassword(password);
            const strength = validation.strength;
            
            let strengthColor = '';
            let strengthText = '';
            
            if (strength === 'weak') {
                strengthColor = 'danger';
                strengthText = 'Weak';
            } else if (strength === 'medium') {
                strengthColor = 'warning';
                strengthText = 'Medium';
            } else {
                strengthColor = 'success';
                strengthText = 'Strong';
            }
            
            strengthDiv.innerHTML = `
                <div class="progress" style="height: 5px;">
                    <div class="progress-bar bg-${strengthColor}" role="progressbar" 
                         style="width: ${strength === 'weak' ? '33%' : strength === 'medium' ? '66%' : '100%'}">
                    </div>
                </div>
                <small class="text-${strengthColor}">Password Strength: ${strengthText}</small>
            `;
        });
    }
    
    if (forgotPasswordInput) {
        forgotPasswordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthDiv = document.getElementById('forgotPasswordStrength');
            
            if (password.length === 0) {
                strengthDiv.innerHTML = '';
                return;
            }
            
            const validation = Validator.validatePassword(password);
            const strength = validation.strength;
            
            let strengthColor = '';
            let strengthText = '';
            
            if (strength === 'weak') {
                strengthColor = 'danger';
                strengthText = 'Weak';
            } else if (strength === 'medium') {
                strengthColor = 'warning';
                strengthText = 'Medium';
            } else {
                strengthColor = 'success';
                strengthText = 'Strong';
            }
            
            strengthDiv.innerHTML = `
                <div class="progress" style="height: 5px;">
                    <div class="progress-bar bg-${strengthColor}" role="progressbar" 
                         style="width: ${strength === 'weak' ? '33%' : strength === 'medium' ? '66%' : '100%'}">
                    </div>
                </div>
                <small class="text-${strengthColor}">Password Strength: ${strengthText}</small>
            `;
        });
    }
    
    const signupEmailInput = document.getElementById('signupEmail');
    if (signupEmailInput) {
        signupEmailInput.addEventListener('blur', function() {
            const email = Validator.sanitizeInput(this.value);
            const validation = Validator.validateEmail(email);
            
            if (email && !validation.valid) {
                document.getElementById('signupEmailError').textContent = validation.errors[0];
            } else {
                document.getElementById('signupEmailError').textContent = '';
            }
        });
    }
    
    const signupPhoneInput = document.getElementById('signupPhone');
    if (signupPhoneInput) {
        signupPhoneInput.addEventListener('blur', function() {
            const phone = Validator.sanitizeInput(this.value);
            const validation = Validator.validatePhone(phone);
            
            if (phone && !validation.valid) {
                document.getElementById('signupPhoneError').textContent = validation.errors[0];
            } else {
                document.getElementById('signupPhoneError').textContent = '';
            }
        });
    }
    
    const signupNameInput = document.getElementById('signupName');
    if (signupNameInput) {
        signupNameInput.addEventListener('blur', function() {
            const name = Validator.sanitizeInput(this.value);
            const validation = Validator.validateName(name);
            
            if (name && !validation.valid) {
                document.getElementById('signupNameError').textContent = validation.errors[0];
            } else {
                document.getElementById('signupNameError').textContent = '';
            }
        });
    }
});
