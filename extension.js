const vscode = require('vscode');

function activate(context) {

	const startTime = Date.now();

	function prettyPrintTime(t) {
		const [hours, minutes, seconds] = parseTime(t);
		console.log(
			`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
		);
	}

	function parseTime(t) {
		const totalSeconds = parseInt(t / 1000);
		const seconds = totalSeconds % 60;
		const minutes = Math.floor(totalSeconds / 60) % 60;
		const hours = Math.floor(totalSeconds / 3600);

		return [hours, minutes, seconds];
	}

	setInterval(() => {
		const rightnow = Date.now();
		const elapsed = rightnow - startTime;
		prettyPrintTime(elapsed);
	}, 1000);


	const disposable = vscode.commands.registerCommand('fosession.startSession', function () {
		vscode.window.showInformationMessage('00:03');
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
