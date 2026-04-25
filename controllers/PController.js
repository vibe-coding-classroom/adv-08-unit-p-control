/**
 * P Controller - Proportional Control Logic
 * Task: Implement the update(error) function and saturation logic.
 */
class PController {
    constructor(kp) {
        this.kp = kp;
        this.limit = 255; // Default PWM limit
    }

    /**
     * Calculate control output based on error
     * @param {number} error - The difference between target and current state
     * @returns {number} - The calculated control output (PWM)
     */
    update(error) {
        // TODO: Implement P control formula: U = Kp * error
        // TODO: Implement Saturation (Clamping) logic to restrict output within [-limit, limit]
        
        // --- STUDENT IMPLEMENTATION START ---
        
        return 0; // Placeholder

        // --- STUDENT IMPLEMENTATION END ---
    }
}

if (typeof module !== 'undefined') {
    module.exports = PController;
}
