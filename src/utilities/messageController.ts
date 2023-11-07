import * as vscode from 'vscode';

const prefix = '[i18n-helper]';

class MessageController {
  showInformationMessage(msg: string) {
    return vscode.window.showInformationMessage(`${prefix} ${msg}`);
  }
  showErrorMessage(msg: string) {
    return vscode.window.showErrorMessage(`${prefix} ${msg}`);
  }
}

export default MessageController;