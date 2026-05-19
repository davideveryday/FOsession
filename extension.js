const vscode = require('vscode');
const SessionStopwatch = require ('./SessionStopwatch');

function activate(context) {
	const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 999);
	statusBar.text = "00:00:00";
	statusBar.show();
	const stopwatch = new SessionStopwatch(statusBar);

	const startCommand = vscode.commands.registerCommand('fosession.startSession', function() {
		stopwatch.start();
		statusBar.backgroundColor = null;
	});

	const stopCommand = vscode.commands.registerCommand('fosession.stopSession', function() {
		stopwatch.stop();
		statusBar.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
	});

	const resetCommand = vscode.commands.registerCommand('fosession.resetSession', function() {
		stopwatch.reset();
		statusBar.backgroundColor = null;
		statusBar.text = "00:00:00";

	});

	context.subscriptions.push(
		startCommand,
		stopCommand,
		resetCommand,
		statusBar
	);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
