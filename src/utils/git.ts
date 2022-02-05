import { exec } from 'shelljs';
import * as fs from 'fs';

const mkdir = (dirPath: string) => {
  const isExists = fs.existsSync(dirPath);
  if(!isExists) {
    fs.mkdirSync(dirPath, { recursive: true } );
  }
}

export const createHistoryFileAndPush = (key: string, lectures: Lecture[]) => {
  const dateString = new Date().toISOString().slice(0, 10);

  const [lastLecture] = lectures;
  const lastObj = {
    id: lastLecture.id,
    date: dateString,
  };
  
  mkdir(`./history/${key}`);
  fs.writeFileSync(`./history/${key}/last.json`, JSON.stringify(lastObj));
  fs.writeFileSync(`./history/${key}/${dateString}.json`, JSON.stringify(lectures));

  exec(`git config user.email "bot@minung.dev"`);
  exec(`git config user.name "Bot"`);
  exec(`git add history`);
  exec(`git commit -m "Add ${dateString} history - ${key}"`);

  exec(`git push`);
}