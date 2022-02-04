import * as github from '@actions/github';
import * as core from '@actions/core';

const createIssueBody = (lectures: Lecture[]) => {
  const lectureListString = lectures.map(lecture => {
    return `- [${lecture.title}](${lecture.url})`
  }).join('\n');
  return `## Goorm\n\n${lectureListString}`;
}

export const createHistoryIssue = async (key: string, lectures: Lecture[]) => {
  const dateString = new Date().toISOString().slice(0, 10);

  // This should be a token with access to your repository scoped in as a secret.
  // The YML workflow will need to set myToken with the GitHub Secret Token
  // myToken: ${{ secrets.GITHUB_TOKEN }}
  // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
  // const token = core.getInput('GH_TOKEN');
  const token = process.env.GH_TOKEN;
  const octokit = github.getOctokit(token)

  const context = github.context;
  await octokit.rest.issues.create({
    ...context.repo,
    title: dateString,
    body: createIssueBody(lectures),
  });
}