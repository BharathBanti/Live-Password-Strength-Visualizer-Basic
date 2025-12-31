const passwordInput = document.getElementById("passwordInput");
const strengthIndicator = document.getElementById("strengthIndicator");
const strengthLabel = document.getElementById("strengthLabel");
const strengthBar = document.getElementById("strengthBar");
const results = document.getElementById("results");
const resultContainer = document.querySelector('.resultContainer');
const strength = document.getElementById('strength');

// Suggestions
const pwdLength = document.getElementById("pwdLength");
const pwdLowerCase = document.getElementById("pwdLowerCase");
const pwdUpperCase = document.getElementById("pwdUpperCase");
const pwdNumber = document.getElementById("pwdNumber");
const pwdSpecialChar = document.getElementById("pwdSpecialChar");
const pwdNoSpaces = document.getElementById("pwdNoSpaces");
const pwdNoRepeated = document.getElementById("pwdNoRepeated");

function evaluatePassword(password) {
    let feedback = [];
    let score = 0;

    // Reset suggestion colors and icons
    const rules = [pwdLength, pwdLowerCase, pwdUpperCase, pwdNumber, pwdSpecialChar, pwdNoSpaces, pwdNoRepeated];
    rules.forEach(rule => {
        rule.style.color = 'red';
        rule.querySelector('i').classList.replace('fa-check', 'fa-xmark');
    });

    // Validation
    if(password.length === 0){
        feedback.push("Password can't be empty");
        return {score, feedback};
    }
    // Length
    if(password.length >= 8){
        score += 10;
        pwdLength.style.color = 'green';
        pwdLength.querySelector('i').classList.replace('fa-xmark', 'fa-check');
    }
    else{
        feedback.push("At least 8 characters required");
    }
    // Uppercase
    if(/[A-Z]/.test(password)){
        score += 20;
        pwdUpperCase.style.color = 'green';
        pwdUpperCase.querySelector('i').classList.replace('fa-xmark','fa-check');
    }
    else{
        feedback.push("At least one uppercase letter");
    }

    // Lowercase
    if(/[a-z]/.test(password)){
        score += 10;
        pwdLowerCase.style.color = 'green';
        pwdLowerCase.querySelector('i').classList.replace('fa-xmark','fa-check');
    }
    else{
        feedback.push("At least one lowercase letter");
    }

    // Number
    if(/[0-9]/.test(password)){
        score += 10;
        pwdNumber.style.color = 'green';
        pwdNumber.querySelector('i').classList.replace('fa-xmark','fa-check');
    }
    else{
        feedback.push("Add at least one number");
    }

    // Special char
    if(/[^a-zA-Z0-9\s]/.test(password)){
        score += 20;
        pwdSpecialChar.style.color = 'green';
        pwdSpecialChar.querySelector('i').classList.replace('fa-xmark','fa-check');
    }
    else{
        feedback.push("Add at least one special character");
    }

    // No spaces
    if(!password.includes(" ")){
        score += 10;
        pwdNoSpaces.style.color = 'green';
        pwdNoSpaces.querySelector('i').classList.replace('fa-xmark','fa-check');
    }
    else{
        feedback.push("Password must not contain spaces");
    }

    // No repeated chars 3+
    if(!/(.)\1{3,}/.test(password)){
        score += 20;
        pwdNoRepeated.style.color = 'green';
        pwdNoRepeated.querySelector('i').classList.replace('fa-xmark','fa-check');
    }
    else{
        feedback.push("No character should repeat 3+ times");
    }

    return { score, feedback };
}

function updateUI(score, feedback) {
    // Reset UI
    results.innerHTML = '';
    strengthIndicator.classList.remove('text-red-500','text-yellow-500','text-green-300','text-green-700');
    strengthBar.style.width = '0%';
    strengthBar.classList.remove('bg-red-500','bg-yellow-500','bg-green-300','bg-green-500');
    strengthLabel.classList.remove('text-red-500','text-yellow-500','text-green-300','text-green-700');

    // Show result container
    resultContainer.classList.remove('hidden');
    resultContainer.classList.add('flex');

    // Update score
    strength.textContent = `${score}`;

    // Update bar & label
    if(score <= 30){
        strengthLabel.textContent = "Very Weak ☹️";
        strengthLabel.classList.add('text-red-500');
        strengthIndicator.classList.add('text-red-500');
        strengthBar.style.width = `${score}%`;
        strengthBar.classList.add('bg-red-500');
    } else if(score <= 60){
        strengthLabel.textContent = "Weak 😕";
        strengthLabel.classList.add('text-yellow-500');
        strengthIndicator.classList.add('text-yellow-500');
        strengthBar.style.width = `${score}%`;
        strengthBar.classList.add('bg-yellow-500');
    } else if(score <= 80){
        strengthLabel.textContent = "Good 😊";
        strengthLabel.classList.add('text-green-300');
        strengthIndicator.classList.add('text-green-300');
        strengthBar.style.width = `${score}%`;
        strengthBar.classList.add('bg-green-300');
    } else {
        strengthLabel.textContent = "Strong 🥳";
        strengthLabel.classList.add('text-green-700');
        strengthIndicator.classList.add('text-green-700');
        strengthBar.style.width = `${score}%`;
        strengthBar.classList.add('bg-green-500');
    }

    // Render feedback
    feedback.forEach(msg => {
        const li = document.createElement('li');
        li.textContent = msg;
        results.appendChild(li);
    });
}

// Live typing event
passwordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    const { score, feedback } = evaluatePassword(password);
    updateUI(score, feedback);
});
