// This function runs when the "Calculate BMI" button is clicked (from bmi.html)
function calculateBMI() {
    // 1. Get the values from the input fields
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultBox = document.getElementById('bmi-result');

    // Convert string inputs to numbers (parseFloat handles decimals)
    const heightMeters = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);

    // 2. Basic Validation: Check if the inputs are valid numbers
    if (isNaN(heightMeters) || isNaN(weightKg) || heightMeters <= 0 || weightKg <= 0) {
        resultBox.style.display = 'block';
        resultBox.style.borderColor = 'red';
        resultBox.innerHTML = 'Please enter valid, positive numbers for height and weight.';
        return; // Stop the function if validation fails
    }

    // 3. BMI Calculation: Formula is weight (kg) / height (m)^2
    // We assume the user inputs height in meters as per the placeholder
    const bmi = weightKg / (heightMeters * heightMeters);
    const bmiRounded = bmi.toFixed(1); // Round the result to 1 decimal place

    // 4. Determine the Health Category
    let category = '';
    if (bmi < 18.5) {
        category = 'Underweight';
        resultBox.style.borderColor = '#FFC107'; // Yellow
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Normal';
        resultBox.style.borderColor = '#28A745'; // Green
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = 'Overweight';
        resultBox.style.borderColor = '#FF5722'; // Orange
    } else { // bmi >= 30
        category = 'Obese';
        resultBox.style.borderColor = '#DC3545'; // Red
    }

    // 5. Display the Result
    resultBox.style.display = 'block';
    resultBox.innerHTML = `Your BMI is ${bmiRounded} &mdash; <strong>${category}</strong>`;
}

// --- Scroll Animation Implementation (Advanced) ---
// This part adds a subtle animation to elements when they appear on screen.
document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.fade-on-scroll');
    
    // Check if the Intersection Observer API is supported by the browser
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    // Optional: remove 'visible' class if element scrolls out
                    entry.target.classList.remove('visible'); 
                }
            });
        }, {
            threshold: 0.1 // Run when 10% of the element is visible
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers: just make everything visible
        elements.forEach(element => {
            element.classList.add('visible');
        });
    }
});