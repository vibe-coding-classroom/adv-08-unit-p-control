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
        // Calculate proportional output: U = Kp * error
        let output = error * this.kp;

        // Apply saturation (clamping) logic to restrict output within [-limit, limit]
        if (output > this.limit) {
            output = this.limit;
        } else if (output < -this.limit) {
            output = -this.limit;
        }

        return output;
    }
}

if (typeof module !== 'undefined') {
    module.exports = PController;
}
