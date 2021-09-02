// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import SnapCss = require('snappy-css');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "snap-css-vsc" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('snap-css-vsc.optimize', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('CSS Optimized Successfully!');

		// vscode.workspace.fs.readDirectory(vscode.Uri.from('/src')).then((files) => console.log(files));
		vscode.window.showOpenDialog({
			title: 'Select Input File',
			canSelectMany: true,
			canSelectFiles: true,
			filters: {'css': ['css']}
		}).then(
			(file) => vscode.window.showQuickPick(
				["Restructure CSS", "Clean CSS", "Compress CSS", "Suggest Class Names"],
				{canPickMany: true})
		);

		const snap = new SnapCss();
		const optimizers = snap.getOptimizers("a");
		let css = snap.getCSS("Trial CSS code Goes Here");
		optimizers.forEach((optimizer) => (css = optimizer.optimize(css)));
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
