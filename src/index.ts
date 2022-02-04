import axios, { AxiosResponse } from 'axios';

import { createHistoryFileAndPush } from './utils/git';
// import { createHistoryIssue } from './utils/github';

type Converter = (data: any) => Lecture[];
type RunnerMap = {
  [key: string]: {
    apiUrl: string,
    converter: Converter,
  }
}

const runnerMap: RunnerMap = {
  goorm: {
    apiUrl: 'https://edu.goorm.io/api/lecture/list/detail?limit=20&page=1&sort=newest',
    converter: ({ list }) => (
      list.map((item: any) => {
        return {
          title: item.subject,
          sequence: item.sequence,
          url: `https://edu.goorm.io/lecture/${item.sequence}/${item.url_slug}`,
          image: item.coverImage,
        };
      })
    )
  }
}


const createLectures = async (fetch: Promise<AxiosResponse<any, any>>, converter: Converter) => {
  const { data } = await fetch;
  return converter(data);
};

async function run() {
  const key = 'goorm';
  const { apiUrl, converter } = runnerMap[key];
  const lectures: Lecture[] = await createLectures(
    axios.get(apiUrl),
    converter,
  );

  createHistoryFileAndPush('goorm', lectures);
  // await createHistoryIssue('goorm', lectures);
}

run();