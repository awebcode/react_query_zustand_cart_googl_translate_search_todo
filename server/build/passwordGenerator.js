"use strict";
function generatePassword() {
    const length = 16;
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;:,.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
}
function checkPasswordStrength(password) {
    if (password.length < 6) {
        return "Weak";
    }
    // Add your criteria for determining weak or strong password
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}[\]|;:,.<>?]/.test(password);
    if (hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
        return "strong";
    }
    else {
        return "weak";
    }
}
const result = generatePassword();
const strength = checkPasswordStrength(result);
console.log(`Generated Password: ${result}`);
console.log(`Password Strength: ${strength}`);
