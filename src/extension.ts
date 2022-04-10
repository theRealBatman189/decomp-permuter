// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	var decompPath = "cd ../decomp-permuter/";
	var configString = "run-decomp-permuter";
	var nonMatchingsString = " nonmatchings/";
	var workingDIR = "WORKING_DIR=`pwd`";
	var revertWorkingDIR = "cd $WORKING_DIR";
	
	let disposable = vscode.commands.registerCommand('run-decomp-permuter.import', () => {

		var importDIR = "./import.py ../papermario/src/";
		var nonMatchingsDIR = " ../papermario/ver/us/asm/nonmatchings/";

		const editor = vscode.window.activeTextEditor;
        let filePath = editor?.document.uri.fsPath.substring(editor?.document.uri.fsPath.indexOf("src"));
		let filePath2 = filePath?.substring(0, filePath.length-2);
        let fileSelection = editor?.document.getText(editor.selection);
		var importFlags  = vscode.workspace.getConfiguration(configString).get("import-flags");		
		const newTerm = vscode.window.createTerminal("IMPORT-" + fileSelection);

		newTerm?.show();
		newTerm?.sendText(workingDIR);
		newTerm?.sendText(decompPath);
		newTerm?.sendText("rm -rf" + nonMatchingsString + fileSelection + "/");
		newTerm?.sendText(importDIR + filePath?.substring(filePath.indexOf("/")+1) + nonMatchingsDIR + filePath2?.substring(filePath2.indexOf("/")+1) + "/" + fileSelection + ".s " + importFlags);
		newTerm?.sendText(revertWorkingDIR);
	});

	let disposable2 = vscode.commands.registerCommand('run-decomp-permuter.run', () => {
		
		var permuterString = "./permuter.py -j";
		var cores = vscode.workspace.getConfiguration(configString).get("cores");
		var runFlags  =  vscode.workspace.getConfiguration(configString).get("run-flags");
		let options: vscode.InputBoxOptions = {
			prompt: "Label: ",
			placeHolder: "Enter Cores"
		};

		if(typeof cores === 'number'){
			if(cores <= 0){
				
				vscode.window.showInputBox(options).then(value => {	
					if (!value) {return;}

					cores = parseInt(value);
					vscode.workspace.getConfiguration("run-decomp-permuter").update("cores", parseInt(value),true);
					const editor = vscode.window.activeTextEditor;
					let fileSelection = editor?.document.getText(editor.selection);
					const newTerm = vscode.window.createTerminal("RUN-" + fileSelection);

					newTerm?.sendText("echo ENTER NUMBER OF CORES");
					newTerm?.show();
					newTerm?.sendText(workingDIR);
					newTerm?.sendText(decompPath);
					newTerm?.sendText(permuterString + cores + nonMatchingsString + fileSelection + "/ " + runFlags);
					newTerm?.sendText(revertWorkingDIR);
				});

			}else{
					const editor = vscode.window.activeTextEditor;
					let fileSelection = editor?.document.getText(editor.selection);
					const newTerm = vscode.window.createTerminal("RUN-" + fileSelection);

					newTerm?.sendText("echo ENTER NUMBER OF CORES");
					newTerm?.show();
					newTerm?.sendText(workingDIR);
					newTerm?.sendText(decompPath);
					newTerm?.sendText(permuterString + cores + nonMatchingsString + fileSelection + "/ " + runFlags);
					newTerm?.sendText(revertWorkingDIR);
			}
			
		}
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
