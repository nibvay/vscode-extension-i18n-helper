import * as vscode from 'vscode';
import I18nHoverProvider from './i18nHoverProvider';
import { getLocaleFiles } from './utilities/localeFilesParse';
import MessageController from './utilities/messageController';
import { LocaleMap } from './types';

const supportedLanguages = ['typescript', 'javascript', "javascriptreact", "typescriptreact"];

export function activate(context: vscode.ExtensionContext) {
	// console.log('Extension "i18n-helper" is now active!');

	const MessageHelper = new MessageController();
	const rootPath = (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
	const enSubPath = vscode.workspace.getConfiguration().get('i18nHelper.englishLocalesSubPath') as string;
	const twSubPath = vscode.workspace.getConfiguration().get('i18nHelper.traditionalChineseLocalesSubPath') as string;
	const cnSubPath = vscode.workspace.getConfiguration().get('i18nHelper.simplifiedChineseLocalesSubPath') as string;

	let enLocaleMap: LocaleMap;
	let twLocaleMap: LocaleMap;
	let cnLocaleMap: LocaleMap;

	if (rootPath) {
		enLocaleMap = getLocaleFiles({ rootPath, subPath: enSubPath });
		twLocaleMap = getLocaleFiles({ rootPath, subPath: twSubPath });
		cnLocaleMap = getLocaleFiles({ rootPath, subPath: cnSubPath });
		MessageHelper.showInformationMessage('load locale file!');
	} else {
		MessageHelper.showErrorMessage('Please provide a rootPath!');
		return;
	}

	const searchHover = vscode.languages.registerHoverProvider(
		supportedLanguages,
		new I18nHoverProvider(enLocaleMap, twLocaleMap, cnLocaleMap),
	);
	context.subscriptions.push(searchHover);
}

// This method is called when your extension is deactivated
export function deactivate() {}
