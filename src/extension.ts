import * as vscode from 'vscode';
import I18nHoverProvider from './i18nHoverProvider';
import { getLocaleFiles } from './utilities/localeFilesParse';
import MessageController from './utilities/messageController';
import { LocaleMap, Languages } from './types';

const i18nSubPath = {
	[Languages['en-US']]: 'src/server/public/locales/en-US/translation.json',
	[Languages['zh-TW']]: 'src/server/public/locales/zh-TW/translation.json',
	[Languages['zh-CN']]: 'src/server/public/locales/zh-CN/translation.json',
};

const supportedLanguages = ['typescript', 'javascript', "javascriptreact", "typescriptreact", "json"];

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "i18n-help" is now active!');

	const MessageHelper = new MessageController();
	const rootPath = (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

	let enLocaleMap: LocaleMap;
	let twLocaleMap: LocaleMap;
	let cnLocaleMap: LocaleMap;

	if (rootPath) {
		enLocaleMap = getLocaleFiles({ rootPath, subPath: i18nSubPath['en-US'] });
		twLocaleMap = getLocaleFiles({ rootPath, subPath: i18nSubPath['zh-TW'] });
		cnLocaleMap = getLocaleFiles({ rootPath, subPath: i18nSubPath['zh-CN'] });
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
