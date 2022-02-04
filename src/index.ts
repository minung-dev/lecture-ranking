import axios, { AxiosResponse } from 'axios';

import { createHistoryFileAndPush } from './utils/git';
// import { createHistoryIssue } from './utils/github';

const createLectures = async (fetch: Promise<AxiosResponse<any, any>>, converter: (data: any) => Lecture[]) => {
  const { data } = await fetch;
  return converter(data);
};

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
    
    createHistoryFileAndPush('goorm', lectures);
    // await createHistoryIssue('goorm', lectures);
}

run();