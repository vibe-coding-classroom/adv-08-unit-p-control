/**
 * Telemetry App - Visualizes Error and PWM output in real-time.
 */
class TelemetryApp {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.dataBuffer = [];
            this.maxBufferLength = 500;
        }
    }

    /**
     * Add new data point to the telemetry
     * @param {number} error - Current error value
     * @param {number} output - Current controller output
     */
    addData(error, output) {
        this.dataBuffer.push({ error, output });
        if (this.dataBuffer.length > this.maxBufferLength) {
            this.dataBuffer.shift();
        }
        this.draw();
    }

    /**
     * Render the curves on the canvas
     */
    draw() {
        if (!this.ctx) return;
        const { width, height } = this.canvas;
        const centerY = height / 2;
        const scale = height / 512; // Scale for PWM (-255 to 255)

        this.ctx.clearRect(0, 0, width, height);

        // Draw background grid
        this.ctx.strokeStyle = '#333';
        this.ctx.beginPath();
        this.ctx.moveTo(0, centerY);
        this.ctx.lineTo(width, centerY);
        this.ctx.stroke();

        if (this.dataBuffer.length < 2) return;

        // Draw Error Curve (Cyan)
        this.ctx.strokeStyle = '#00ffff';
        this.ctx.beginPath();
        this.dataBuffer.forEach((point, i) => {
            const x = (i / this.maxBufferLength) * width;
            const y = centerY - (point.error * scale);
            if (i === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        });
        this.ctx.stroke();

        // Draw Output Curve (Orange)
        this.ctx.strokeStyle = '#ffaa00';
        this.ctx.beginPath();
        this.dataBuffer.forEach((point, i) => {
            const x = (i / this.maxBufferLength) * width;
            const y = centerY - (point.output * scale);
            if (i === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        });
        this.ctx.stroke();
    }
}

if (typeof module !== 'undefined') {
    module.exports = TelemetryApp;
}
