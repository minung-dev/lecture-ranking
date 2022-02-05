import axios, { AxiosResponse } from 'axios';
// import * as fs from 'fs';

import { createHistoryFileAndPush } from './utils/git';
// import { createHistoryIssue } from './utils/github';

type Converter = (data: any) => Lecture[];
type RunnerMap = {
  [key: string]: {
    api: {
      latest: string,
      popular: string,
      popularPaid: string,
      popularFree: string,
    },
    converter: Converter,
  }
}

const runnerMap: RunnerMap = {
  goorm: {
    api: {
      latest: 'https://edu.goorm.io/api/lecture/list/detail?limit=20&page=1&sort=newest',
      popular: 'https://edu.goorm.io/api/lecture/list/detail?limit=20&page=1&sort=mostPopular',
      popularPaid: 'https://edu.goorm.io/api/lecture/list/detail?limit=20&page=1&sort=mostPopular&is_toll=false',
      popularFree: 'https://edu.goorm.io/api/lecture/list/detail?limit=20&page=1&sort=mostPopular&is_toll=true',
    },
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
    api: {
      latest: 'https://www.inflearn.com/api/courses?order=recent&page=1',
      popular: 'https://www.inflearn.com/api/courses?order=popular',
      popularPaid: 'https://www.inflearn.com/api/courses?charge=paid&order=popular',
      popularFree: 'https://www.inflearn.com/api/courses?charge=paid&order=popular',
    },
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


const createLectures = async (url: string, converter: Converter) => {
  const { data } = await axios.get(url);
  return converter(data);
};

async function run() {
  const keys = ['goorm', 'inflearn'];

  // TODO: 한번에 커밋하고 푸시하도록 변경 필요
  for (let key of keys) {
    const { api, converter } = runnerMap[key];

    const getLecture = (url: string) => createLectures(url, converter);

    const results = {
      latest: await getLecture(api.latest),
      popular: await getLecture(api.popular),
      popularPaid: await getLecture(api.popularPaid),
      popularFree: await getLecture(api.popularFree),
    };

    // 마지막 id 앞 lecture만 남기기
    // const data = fs.readFileSync(`./history/${key}/last.json`);
    // const { id } = JSON.parse(data.toString());
    // const index = lectures.findIndex(lecture => lecture.id === id);
    // const recentLectures = lectures.slice(0, index);

    createHistoryFileAndPush(key, results);
    // await createHistoryIssue(key, recentLectures);
  }
}

run();