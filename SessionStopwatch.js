class SessionStopwatch {

    startTime = 0;
    interval = null;
    statusBar;

    constructor(vscodeStatusBar) {
        this.statusBar = vscodeStatusBar;
    }

    // ImI: add to prototype
    static parseTime(t) {
        const totalSeconds = parseInt(t / 1000);
        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const hours = Math.floor(totalSeconds / 3600);

        return [hours, minutes, seconds];
    }

    static prettyFormatTime(t) {
        const [hours, minutes, seconds] = this.parseTime(t);
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    start() {
        if (this.interval) return;

        this.startTime = Date.now();

        this.interval = setInterval(() => {
            const now = Date.now();
            const elapsed = now - this.startTime;
            this.statusBar.text = SessionStopwatch.prettyFormatTime(elapsed);
        }, 1000);
    }

    stop() {
        if (!this.interval) return;
        clearInterval(this.interval);
        this.interval = null;
    }

    reset() {
        this.stop();
        this.startTime = 0;
    }
}

module.exports = SessionStopwatch;