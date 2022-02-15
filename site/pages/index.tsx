import { useEffect, useState, useRef } from 'react';

import dayjs from 'dayjs';
import Card from '../components/Card';
import Tabs from '../components/Tabs';

const todayString = dayjs().format('YYYY-MM-DD');

function Home() {
  const [activeTabId, setActiveTabId] = useState('popular');
  const [service, setService] = useState('inflearn');
  const [date, setDate] = useState(todayString);
  const prevOrderMap = useRef<{ [key: string]: number }>({});
  const [lectures, setLectures] = useState<Lecture[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `/api/lectures/${service}/${date}/${activeTabId}`,
      );

      const isSuccess = res.status === 200;

      const data = isSuccess ? (await res.json()) : [];

      setLectures((prevLectures) => {
        prevOrderMap.current = prevLectures.reduce(
          (prev, lecture, index) => ({ ...prev, [lecture.id]: index }),
          {},
        );
        return data;
      });
    })();
  }, [service, date, activeTabId]);

  const handlePrev = () => {
    const prevDate = dayjs(date).add(-1, 'day').format('YYYY-MM-DD');
    setDate(prevDate);
  };

  const handleNext = () => {
    const prevDate = dayjs(date).add(1, 'day').format('YYYY-MM-DD');
    setDate(prevDate);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setService(value);
  };

  const handleTabItemClick = (id: string) => {
    setActiveTabId(id);
  };

  return (
    <div className="border mockup-window border-base-200 bg-base-200">
      <div className="flex flex-col justify-center py-10 border-t border-base-300 bg-base-200">
        <div className="px-6">
          <select
            className="select select-bordered w-full max-w-xs"
            value={service}
            onChange={handleSelect}
          >
            <option value="goorm">goorm</option>
            <option value="inflearn">inflearn</option>
          </select>
          <div className="btn-group">
            <button className="btn btn-outline btn-sm" onClick={handlePrev}>
              이전
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleNext}>
              다음
            </button>
          </div>
          <div className="badge badge-lg bg-base-300">{date}</div>
        </div>
        <Tabs activeId={activeTabId} onItemClick={handleTabItemClick} />
        <div className="bg-base-100 px-6 h-100">
          {lectures.map((lecture, index) => (
            <Card
              key={`${lecture.id}-${index}`} // NOTE: key에 index를 포함해서 order가 달라지면 리랜더링으로 애니메이션이 동작하도록 함
              lecture={lecture}
              prevOrder={prevOrderMap.current[lecture.id]}
              order={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
