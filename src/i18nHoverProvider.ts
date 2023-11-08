import * as vscode from 'vscode';
import { LocaleMap, Languages } from './types';

class I18nHoverProvider implements vscode.HoverProvider {
  constructor(
    private enLocaleMap: LocaleMap,
    private twLocaleMap: LocaleMap, 
    private cnLocaleMap: LocaleMap
  ) {
  }

  provideHover(
    _document: vscode.TextDocument,
    _position: vscode.Position,
    _token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.Hover> {
	  const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const selection = editor.selection;
    let highlighted;

    if (selection && !selection.isEmpty) {
      const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);

      // with t func example: t('home-address')
      const withTFuncRange = new vscode.Range(selection.start.line, selection.start.character - 3, selection.end.line, selection.end.character + 2);
      const highlightedWithTFunc = editor.document.getText(withTFuncRange);

      const validTPrefix = [`t('`, `t(\``];
      const validPostfix = [`')`, `\`)`];
      if (
        validTPrefix.some(prefix => highlightedWithTFunc.slice(0, 3).includes(prefix)) && 
        validPostfix.some(postfix => highlightedWithTFunc.slice(-2,).includes(postfix))
      ) {
        console.log('highlightedWithTFunc', highlightedWithTFunc);
        highlighted = editor.document.getText(selectionRange);
        console.log("highlighted word", highlighted);
        const contents = new vscode.MarkdownString(`<h4>[i18n-helper]</h4><span style="color:#fff;background-color:#395858;">${Languages['en-US']}</span>&nbsp;<span>${this.enLocaleMap.get(highlighted) ?? '---' }</span></br><span style="color:#fff;background-color:#395858;">${Languages['zh-TW']}</span>&nbsp;<span>${this.twLocaleMap.get(highlighted) ?? '---' }</span></br><span style="color:#fff;background-color:#395858;">${Languages['zh-CN']}</span>&nbsp;<span>${this.cnLocaleMap.get(highlighted) ?? '---' }</span>`);
        contents.isTrusted = true;
        contents.supportHtml = true;
  
        return new vscode.Hover(contents);
      }
    }
  }
}

export default I18nHoverProvider;
