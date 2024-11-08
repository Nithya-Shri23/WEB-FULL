// Function to animate the count
function animateCountUp(element) {
    const target = +element.getAttribute('data-target'); // Get target value
    let current = 0;
    const increment = target / 100; // How much to increment each time
    const duration = 1000; // Animation duration (milliseconds)

    const updateCounter = () => {
        if (current < target) {
            current += increment;
            element.innerText = Math.floor(current); // Update the text with the current number
            setTimeout(updateCounter, duration / 100); // Keep updating until the target is reached
        } else {
            element.innerText = target; // Ensure the final value is set correctly
        }
    };

    updateCounter();
}

// Wait for the DOM to load before running the animation
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.display-6.text-warning');
    counters.forEach(counter => animateCountUp(counter)); // Start counting on each element
});