// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "run-decomp-permuter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('run-decomp-permuter.import', () => {
		const editor = vscode.window.activeTextEditor;
        let filePath = editor?.document.uri.fsPath.substring(editor?.document.uri.fsPath.indexOf("src"));
		let filePath2 = filePath?.substring(0, filePath.length-2);
        let fileSelection = editor?.document.getText(editor.selection);
		let fileUri = vscode.Uri.file("../decomp-permuter/nonmatchings/");
		var importFlags  = vscode.workspace.getConfiguration("run-decomp-permuter").get("import-flags");		
		const newTerm = vscode.window.createTerminal("New Term");

		newTerm?.show();
		newTerm?.sendText("WORKING_DIR=`pwd`");
		newTerm?.sendText("cd ../decomp-permuter/");
		newTerm?.sendText("rm -rf nonmatchings/" + fileSelection + "/");
		newTerm?.sendText("./import.py ../papermario/src/" + filePath?.substring(filePath.indexOf("/")+1) + " ../papermario/ver/us/asm/nonmatchings/" + filePath2?.substring(filePath2.indexOf("/")+1) + "/" + fileSelection + ".s " + importFlags);
		newTerm?.sendText("cd $WORKING_DIR");
	});

	let disposable2 = vscode.commands.registerCommand('run-decomp-permuter.run', () => {
		
		let options: vscode.InputBoxOptions = {
			prompt: "Label: ",
			placeHolder: "Enter Cores"
		};

		var cores = vscode.workspace.getConfiguration("run-decomp-permuter").get("cores");
		var runFlags  =  vscode.workspace.getConfiguration("run-decomp-permuter").get("run-flags");
	
		if(typeof cores === 'number'){
			if(cores <= 0){
				
				vscode.window.showInputBox(options).then(value => {	
					if (!value) {return;}

					cores = parseInt(value);
					vscode.workspace.getConfiguration("run-decomp-permuter").update("cores", parseInt(value),true);
					const editor = vscode.window.activeTextEditor;
					let filePath = editor?.document.uri.fsPath.substring(editor?.document.uri.fsPath.indexOf("src"));
					let filePath2 = filePath?.substring(0, filePath.length-2);
					let fileSelection = editor?.document.getText(editor.selection);
					const newTerm = vscode.window.createTerminal(fileSelection);

					newTerm?.sendText("echo ENTER NUMBER OF CORES");
					newTerm?.show();
					newTerm?.sendText("WORKING_DIR=`pwd`");
					newTerm?.sendText("cd ../decomp-permuter/");
					newTerm?.sendText("./permuter.py -j" + cores +" nonmatchings/" + fileSelection + "/ " + runFlags);
					newTerm?.sendText("cd $WORKING_DIR");
				});

			}else{
					const editor = vscode.window.activeTextEditor;
					let filePath = editor?.document.uri.fsPath.substring(editor?.document.uri.fsPath.indexOf("src"));
					let filePath2 = filePath?.substring(0, filePath.length-2);
					let fileSelection = editor?.document.getText(editor.selection);
					const newTerm = vscode.window.createTerminal(fileSelection);

					newTerm?.sendText("echo ENTER NUMBER OF CORES");
					newTerm?.show();
					newTerm?.sendText("WORKING_DIR=`pwd`");
					newTerm?.sendText("cd ../decomp-permuter/");
					newTerm?.sendText("./permuter.py -j" + cores +" nonmatchings/" + fileSelection + "/ " + runFlags);
					newTerm?.sendText("cd $WORKING_DIR");
			}
			
		}
		
		
		

		
		
	});
	

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
