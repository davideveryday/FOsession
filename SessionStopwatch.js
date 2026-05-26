const vscode = require('vscode');

class SessionStopwatch {

    startTime = 0;
    accumulatedTime = 0;
    interval = null;
    timeStatus = null;
    statusBar;

    constructor(vscodeStatusBar) {
        this.statusBar = vscodeStatusBar;
        this.timeStatus = "stopped";
    }

    static parseTime(t) {
        const totalSeconds = Math.floor(t / 1000);
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
        if (this.timeStatus == "stopped") this.timeStatus = "running";
        this.statusBar.show();

		this.statusBar.backgroundColor = null;
        this.startTime = Date.now();

        this.interval = setInterval(() => {
            if (this.timeStatus == "running") {
                const now = Date.now();
                const elapsed = this.accumulatedTime + (now - this.startTime);
                this.statusBar.text = SessionStopwatch.prettyFormatTime(elapsed);
            }
        }, 250);
    }

    pause() {
        if (!this.interval) return;
        if (this.timeStatus == "paused") return;
        this.statusBar.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
        this.accumulatedTime += (Date.now() - this.startTime);
        this.timeStatus = "paused";
    }

    unpause() {
        if (!this.interval) return;
        if (this.timeStatus != "paused") return;
		this.statusBar.backgroundColor = null;
        this.timeStatus = "running";
        this.startTime = Date.now();
    }

    stop() {
        if (!this.interval) return;
        clearInterval(this.interval);
		this.statusBar.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
        this.accumulatedTime = 0;
        this.interval = null;
        this.timeStatus = "stopped";
    }

    reset() {
        this.stop();
		this.statusBar.backgroundColor = null;
        this.statusBar.hide();
        this.startTime = 0;
        this.accumulatedTime = 0;
        this.timeStatus = "stopped";
		this.statusBar.text = "00:00:00";
    }
}

module.exports = SessionStopwatch;