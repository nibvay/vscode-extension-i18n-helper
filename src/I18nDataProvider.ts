import * as vscode from 'vscode';

export class I18nDataProvider implements vscode.TreeDataProvider<any>{
  constructor(private workspaceRootPath: string | undefined) {
  }

  getChildren(element?: any): any {
    console.log('in getChildren');
    console.log(element);
    if (!this.workspaceRootPath) {
      vscode.window.showInformationMessage('No root path in workspace');
      return Promise.resolve([]);
    }
    if (!element) {
      const result = [
        new I18nItem('sbms', '1.0', vscode.TreeItemCollapsibleState.Expanded),
        new I18nItem('sbms', '2.0', vscode.TreeItemCollapsibleState.Expanded)
      ];
      console.log('result I18nItem', result);
      return result;
    }
    return Promise.resolve([]);
  }

  getTreeItem(element: any) {
    console.log('in getTreeItem');
    return element;
  }
}

class I18nItem extends vscode.TreeItem {
  constructor(
		public readonly label: string,
		private readonly version: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);

		this.tooltip = `${this.label}-${this.version}`;
		this.description = this.version;
	}

}