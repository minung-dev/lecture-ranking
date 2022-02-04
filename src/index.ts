import * as github from '@actions/github';
import * as core from '@actions/core';
import axios, { AxiosResponse } from 'axios';
import { exec } from 'shelljs';
import * as fs from 'fs';

const mkdir = (dirPath: string) => {
  const isExists = fs.existsSync(dirPath);
  if(!isExists) {
      fs.mkdirSync(dirPath, { recursive: true } );
  }
}

type Lecture = {
  sequence: number,
  title: string,
  url: string,
  image: string,
};

const createLectures = async (fetch: Promise<AxiosResponse<any, any>>, converter: (data: any) => Lecture[]) => {
  const { data } = await fetch;
  return converter(data);
};

const createIssueBody = (lectures: Lecture[]) => {
  const lectureListString = lectures.map(lecture => {
    return `- [${lecture.title}](${lecture.url})`
  }).join('\n');
  return `## Goorm\n\n${lectureListString}`;
}

async function run() {
    const lectures: Lecture[] = await createLectures(
      axios.get('https://edu.goorm.io/api/lecture/list/detail?limit=20&page=1&sort=newest'),
      ({ list }) => (
        list.map((l: any) => {
          return {
            title: l.subject,
            sequence: l.sequence,
            url: `https://edu.goorm.io/lecture/${l.sequence}/${l.url_slug}`,
            image: l.coverImage
          };
        })
      )
    );

    const [lastLecture] = lectures;

    const lastObj = {
      goorm: lastLecture.sequence,
    }
    
    const title = new Date().toISOString().slice(0, 10);
    mkdir(`./history/goorm`);
    fs.writeFileSync(`./history/last.json`, JSON.stringify(lastObj));
    fs.writeFileSync(`./history/goorm/${title}.json`, JSON.stringify(lectures));

    exec(`git config user.email "bot@minung.dev"`);
    exec(`git config user.name "Bot"`);
    exec(`git add history`);
    exec(`git commit -m "Add ${title} history"`);

    exec(`git push`);


    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    // const token = core.getInput('GH_TOKEN');
    // const token = process.env.GH_TOKEN;
    // const octokit = github.getOctokit(token)

    // const context = github.context;
    // const newIssue = await octokit.rest.issues.create({
    //   ...context.repo,
    //   title,
    //   body: createIssueBody(lectures),
    // });
}

run();