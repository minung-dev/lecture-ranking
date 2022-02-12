import { useEffect, useState, useRef } from "react";

import dayjs from "dayjs";
import Card from "./Card";

function Home() {
  const [type, setType] = useState("goorm");
  const [date, setDate] = useState(dayjs().add(-1, "day").format("YYYY-MM-DD"));
  const prevOrderMap = useRef<{ [key: string]: number }>({});
  const [lectures, setLectures] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(`/api/lectures/${type}/${date}`).then((res) =>
          res.json()
        );

        
        setLectures(prevLectures => {
          prevOrderMap.current = prevLectures.reduce((prev, lecture, index) => ({ ...prev, [lecture.id]: index }), {});
          return data.popular;
        });
        
        
      } catch (err) {
        console.log(err);
      }
    })();
  }, [type, date]);

  const handlePrev = () => {
    const prevDate = dayjs(date).add(-1, "day").format("YYYY-MM-DD");
    setDate(prevDate);
  };

  const handleNext = () => {
    const prevDate = dayjs(date).add(1, "day").format("YYYY-MM-DD");
    setDate(prevDate);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setType(value);
  };

  return (
    <div className="border mockup-window border-base-300 bg-base-200">
      <div className="flex flex-col justify-center px-6 py-10 border-t border-base-300 bg-base-200">
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={handleSelect}
        >
          <option value="goorm">goorm</option>
          <option value="inflearn">inflearn</option>
        </select>
        <div className="btn-group">
          <button
            className="btn btn-outline btn-sm btn-wide"
            onClick={handlePrev}
          >
            이전
          </button>
          <button
            className="btn btn-outline btn-sm btn-wide"
            onClick={handleNext}
          >
            다음
          </button>
        </div>
        {date}
        {lectures.map((lecture, index) => (
          <Card lecture={lecture} index={index} prevOrderMap={prevOrderMap} />
        ))}
        {/* <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {lectures.map((lecture, index) => (
                <tr key={lecture.id}>
                  <th>{index}</th>
                  <td>{lecture.title}</td>
                  <td>Link</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
}

export default Home;
