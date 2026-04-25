/**
 * Car Simulator - Provides a simplified physical environment for testing.
 * Features basic inertia, friction, and lag.
 */
class CarSimulator {
    constructor() {
        this.position = 0;
        this.velocity = 0;
        this.target = 100; // Default target position
        
        // Physical parameters
        this.friction = 0.15;
        this.mass = 1.2;
        this.dt = 0.05; // Simulation step (seconds)
        this.drag = 0.05;
    }

    /**
     * Advance simulation by one step
     * @param {number} pwmOutput - Motor control signal (-255 to 255)
     * @returns {Object} - Current state {position, error}
     */
    step(pwmOutput) {
        // Simple physics simulation: F = ma
        // We assume pwmOutput is proportional to motor force
        const motorForce = pwmOutput * 0.05;
        const totalForce = motorForce - (this.velocity * this.friction) - (Math.sign(this.velocity) * this.drag);
        
        const acceleration = totalForce / this.mass;
        
        this.velocity += acceleration * this.dt;
        this.position += this.velocity * this.dt;
        
        const error = this.target - this.position;
        
        return {
            position: this.position,
            error: error
        };
    }

    setTarget(newTarget) {
        this.target = newTarget;
    }

    reset() {
        this.position = 0;
        this.velocity = 0;
    }
}

if (typeof module !== 'undefined') {
    module.exports = CarSimulator;
}
