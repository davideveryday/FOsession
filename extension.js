const vscode = require('vscode');
const SessionStopwatch = require ('./SessionStopwatch');

let stopwatch = null;
function activate(context) {
	const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 999);
	statusBar.text = "00:00:00";
	statusBar.show();
	stopwatch = new SessionStopwatch(statusBar);

	const startCommand = vscode.commands.registerCommand('fosession.startSession', function() {
		stopwatch.start();
	});

	const pauseCommand = vscode.commands.registerCommand('fosession.pauseSession', function() {
		stopwatch.pause();
	});

	const unpauseCommand = vscode.commands.registerCommand('fosession.unpauseSession', function() {
		stopwatch.unpause();
	});

	const stopCommand = vscode.commands.registerCommand('fosession.stopSession', function() {
		stopwatch.stop();
	});

	const resetCommand = vscode.commands.registerCommand('fosession.resetSession', function() {
		stopwatch.reset();
	});

	context.subscriptions.push(
		startCommand,
		pauseCommand,
		stopCommand,
		resetCommand,
		statusBar
	);
}

function deactivate() {
	if (stopwatch) stopwatch.stop();
	
}

module.exports = {
	activate,
	deactivate
}
