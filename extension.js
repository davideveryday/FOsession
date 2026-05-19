const vscode = require('vscode');
const SessionStopwatch = require ('./SessionStopwatch');

function activate(context) {
	const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 999);
	// statusBar.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
	statusBar.text = "00:00:00";
	statusBar.show();
	const stopwatch = new SessionStopwatch(statusBar);

	const disposable = vscode.commands.registerCommand('fosession.startSession', function() {
		stopwatch.start();
	});

	context.subscriptions.push(disposable, statusBar);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
