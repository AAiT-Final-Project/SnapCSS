// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import snap = require('snappy-css');

function makeOptions(choices: string[]) {
	const result = ['k'];

	if ('Restructure CSS' in choices) {
		result.push('r');
	}
	if ('Clean CSS' in choices) {
		result.push('c');
	}
	if ('Suggest Selectors' in choices) {
		result.push('s');
	}
	return result.join('');
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const supported_extensions = ['css', 'html', 'vue', 'php', 'jsx']
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "snap-css-vsc" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('snap-css-vsc.optimize', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		// vscode.workspace.fs.readDirectory(vscode.Uri.from('/src')).then((files) => console.log(files));
		vscode.window.showOpenDialog({
			title: 'Select Input File',
			canSelectMany: false,
			canSelectFiles: true,
			filters: {'css': supported_extensions}
		}).then(files => {
			if (files) {
				vscode.window.showQuickPick(
					["Restructure CSS", "Clean CSS", "Suggest Selectors"],
					{canPickMany: true}
				).then(res => {
					let message: string[] = [];
					const css = snap.getCSSFromFile(files[0].path, messages => {
						message = messages;
					});
					if (message[0] === 'Successfully Loaded CSS') {
						vscode.window.showInformationMessage(message[0]);
						if (!res) {
							res = [];
						}
						snap.optimize(css, makeOptions(res)).then(result => {
							vscode.window.showInformationMessage('Successfully Optimized CSS!');
						});
						vscode.window.showOpenDialog({
							title: 'Select Output Path',
							canSelectMany: false,
							canSelectFiles: true,
							canSelectFolders: true,
							filters: {'css': supported_extensions}
						}).then(files => {
							if (files) {
								const end = files[0].path.split('.').pop();
								const path = end && supported_extensions.includes(end) ? files[0].path : files[0].path + '/optimized_output.css';
								snap.exportFile(path, css.toString(), messages => {
									for (const mess of messages) {
										vscode.window.showInformationMessage(mess);
									}
								});
							}
						});
					} else {
						for (const mess of message) {
							vscode.window.showErrorMessage(mess);
						}
					}
				});
			}
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
