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
          id: item.sequence,
          title: item.subject,
          url: `https://edu.goorm.io/lecture/${item.sequence}/${item.url_slug}`,
          image: item.coverImage,
        };
      })
    )
  },
  inflearn: {
    apiUrl: 'https://www.inflearn.com/api/courses?order=recent&page=1',
    converter: ({ courses }) => (
      courses.map((item: any) => {
        return {
          id: item.id,
          title: item.title,
          url: `https://www.inflearn.com/course/${item.slug}`,
          image: '',
        };
      })
    ),
  }
}


const createLectures = async (fetch: Promise<AxiosResponse<any, any>>, converter: Converter) => {
  const { data } = await fetch;
  return converter(data);
};

async function run() {
  const keys = ['goorm', 'inflearn'];

  // TODO: 한번에 커밋하고 푸시하도록 변경 필요
  for (let key of keys) {
    const { apiUrl, converter } = runnerMap[key];
    const lectures: Lecture[] = await createLectures(
      axios.get(apiUrl),
      converter,
    );
  
    createHistoryFileAndPush(key, lectures);
    // await createHistoryIssue('goorm', lectures);
  }
}

run();