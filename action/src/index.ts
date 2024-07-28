import axios, { AxiosResponse } from 'axios';
// import * as fs from 'fs';

import { createHistoryFile, commitAndpush } from './utils/git';
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
      popularPaid: 'https://edu.goorm.io/api/lecture/list/detail?limit=20&page=1&sort=mostPopular&is_toll=true',
      popularFree: 'https://edu.goorm.io/api/lecture/list/detail?limit=20&page=1&sort=mostPopular&is_toll=false',
    },
    converter: ({ list }) => (
      list.map((item: any) => {
        return {
          id: item.sequence,
          title: item.subject,
          url: `https://edu.goorm.io/lecture/${item.sequence}/${item.url_slug}`,
          image: item.coverImage,
          instructor: item.owner.name,
        };
      })
    )
  },
  inflearn: {
    api: {
      latest: 'https://www.inflearn.com/courses/client/api/v1/course/search?isDiscounted=false&isNew=false&pageNumber=1&pageSize=60&sort=RECENT&types=ONLINE',
      popular: 'https://www.inflearn.com/courses/client/api/v1/course/search?isDiscounted=false&isNew=false&pageNumber=1&pageSize=60&sort=POPULAR&types=ONLINE',
      popularPaid: 'https://www.inflearn.com/courses/client/api/v1/course/search?charge=PAID&isDiscounted=false&isNew=false&pageNumber=1&pageSize=60&sort=POPULAR&types=ONLINE',
      popularFree: 'https://www.inflearn.com/courses/client/api/v1/course/search?charge=FREE&isDiscounted=false&isNew=false&pageNumber=1&pageSize=60&sort=POPULAR&types=ONLINE',
    },
    converter: ({ data: { items } }) => (
      items.map(({ course, instructor }: any) => {
        return {
          id: course.id,
          title: course.title,
          url: `https://www.inflearn.com/course/${course.slug}`,
          image: '',
          instructor: instructor.name,
        };
      })
    ),
  },
  udemyDev: {
    api: {
      latest: 'https://www.udemy.com/api-2.0/discovery-units/all_courses/?page_size=16&subcategory=&instructional_level=&lang=&price=&duration=&closed_captions=&subs_filter_type=&sort=newest&category_id=288&source_page=category_page&locale=ko_KR&currency=krw&navigation_locale=en_US&skip_price=true&sos=pc&fl=cat',
      popular: 'https://www.udemy.com/api-2.0/discovery-units/all_courses/?page_size=16&subcategory=&instructional_level=&lang=&price=&duration=&closed_captions=&subs_filter_type=&sort=popularity&category_id=288&source_page=category_page&locale=ko_KR&currency=krw&navigation_locale=en_US&skip_price=true&sos=pc&fl=cat',
      popularPaid: 'https://www.udemy.com/api-2.0/discovery-units/all_courses/?page_size=16&subcategory=&instructional_level=&lang=&price=price-paid&duration=&closed_captions=&subs_filter_type=&sort=popularity&category_id=288&source_page=category_page&locale=ko_KR&currency=krw&navigation_locale=en_US&skip_price=true&sos=pc&fl=cat',
      popularFree: 'https://www.udemy.com/api-2.0/discovery-units/all_courses/?page_size=16&subcategory=&instructional_level=&lang=&price=price-free&duration=&closed_captions=&subs_filter_type=&sort=popularity&category_id=288&source_page=category_page&locale=ko_KR&currency=krw&navigation_locale=en_US&skip_price=true&sos=pc&fl=cat',
    },
    converter: ({ unit: { items } }) => (
      items.map((item: any) => {
        return {
          id: item.id,
          title: item.title,
          url: `https://www.udemy.com/${item.url}`,
          image: '',
          instructor: item.visible_instructors[0].display_name,
        };
      })
    ),
  },
}


const createLectures = async (url: string, converter: Converter) => {
  const { data } = await axios.get(url);
  return converter(data);
};

async function run() {
  // const keys = ['goorm', 'inflearn'];
  const keys = ['inflearn'];

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

    createHistoryFile(key, results);
    // await createHistoryIssue(key, recentLectures);
  }

  commitAndpush();
}

run();
