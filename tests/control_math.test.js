const PController = require('../controllers/PController');

describe('P-Controller Math & Logic', () => {
    
    it('should correctly calculate proportional output (U = Kp * e)', () => {
        const controller = new PController(2.0); // Kp = 2.0
        const error = 50;
        const output = controller.update(error);
        
        // This test will fail until the student implements the logic
        expect(output).toBe(100);
    });

    it('should saturate positive output at 255', () => {
        const controller = new PController(10.0); // Kp = 10.0
        const error = 100;
        const output = controller.update(error);
        
        // 100 * 10 = 1000, should be clamped to 255
        expect(output).toBe(255);
    });

    it('should saturate negative output at -255', () => {
        const controller = new PController(5.0); // Kp = 5.0
        const error = -100;
        const output = controller.update(error);
        
        // -100 * 5 = -500, should be clamped to -255
        expect(output).toBe(-255);
    });

    it('should handle zero error', () => {
        const controller = new PController(1.5);
        expect(controller.update(0)).toBe(0);
    });

    it('should handle very small errors (precision check)', () => {
        const controller = new PController(0.5);
        expect(controller.update(0.1)).toBeCloseTo(0.05);
    });
});
