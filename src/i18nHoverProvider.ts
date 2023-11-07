import * as vscode from 'vscode';
import { LocaleMap, Languages } from './types';

class I18nHoverProvider implements vscode.HoverProvider {
  constructor(
    private editor: vscode.TextEditor,
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
    const selection = this.editor.selection;
    let highlighted;

    if (selection && !selection.isEmpty) {
      const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
      highlighted = this.editor.document.getText(selectionRange);
      console.log("highlighted word", highlighted);
      const contents = new vscode.MarkdownString(`<h4>[i18n-helper]</h4><span style="color:#fff;background-color:#395858;">${Languages['en-US']}</span>&nbsp;<span>${this.enLocaleMap.get(highlighted) ?? '---' }</span></br><span style="color:#fff;background-color:#395858;">${Languages['zh-TW']}</span>&nbsp;<span>${this.twLocaleMap.get(highlighted) ?? '---' }</span></br><span style="color:#fff;background-color:#395858;">${Languages['zh-CN']}</span>&nbsp;<span>${this.cnLocaleMap.get(highlighted) ?? '---' }</span>`);
      contents.isTrusted = true;
      contents.supportHtml = true;

      return new vscode.Hover(contents);
    }
  }
}

export default I18nHoverProvider;
