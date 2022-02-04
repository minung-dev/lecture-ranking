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
    [key]: lastLecture.sequence,
  };
  
  mkdir(`./history/goorm`);
  fs.writeFileSync(`./history/last.json`, JSON.stringify(lastObj));
  fs.writeFileSync(`./history/goorm/${dateString}.json`, JSON.stringify(lectures));

  exec(`git config user.email "bot@minung.dev"`);
  exec(`git config user.name "Bot"`);
  exec(`git add history`);
  exec(`git commit -m "Add ${dateString} history"`);

  exec(`git push`);
}