class SessionStopwatch {

    startTime = 0;
    interval = null;
    timeStatus = null;
    statusBar;

    constructor(vscodeStatusBar) {
        this.statusBar = vscodeStatusBar;
        this.timeStatus = "running";
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
            if (this.timeStatus == "running") {
                const elapsed = now - this.startTime;
                this.statusBar.text = SessionStopwatch.prettyFormatTime(elapsed);
            }
        }, 1000);
    }

    // 2 options: 1. create a new interval in each pause/resume 2. add a conditional to the start interval
    pause() {
        if (!this.interval) return;
        this.startTime = Date.now();
        this.timeStatus = "paused";
    }

    unpause() {
        if (!this.interval) return;
        this.timeStatus = "running";
    }

    stop() {
        if (!this.interval) return;
        clearInterval(this.interval);
        this.interval = null;
        this.timeStatus = "stopped";
    }

    reset() {
        this.stop();
        this.startTime = 0;
        this.timeStatus = "running";
    }
}

module.exports = SessionStopwatch;