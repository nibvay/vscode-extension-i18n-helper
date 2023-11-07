import * as fs from 'fs';
import * as path from 'path';

function getLocaleFiles({ rootPath, subPath }: { rootPath: string, subPath: string }) {
  const fullPath = path.join(rootPath, subPath);
  const rawData = fs.readFileSync(fullPath, 'utf-8');
  const dataMap = new Map(Object.entries(JSON.parse(rawData)));
  return dataMap;
}

export {
  getLocaleFiles,
};