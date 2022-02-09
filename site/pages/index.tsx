import { useEffect, useState } from "react";

import dayjs from "dayjs";

function Home() {
  const [type, setType] = useState("goorm");
  const [date, setDate] = useState(dayjs().add(-1, "day").format("YYYY-MM-DD"));
  const [lectures, setLectures] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(`/api/lectures/${type}/${date}`).then((res) =>
          res.json()
        );
        setLectures(data.popular);
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
          <div className="card shadow-lg compact side bg-base-100 mt-6" key={lecture.id}>
            <div className="flex-row items-center space-x-5 card-body">
              <div className="flex-0">
                <span className="text-lg font-bold text-info">{index + 1}</span>
              </div>
              <div className="flex-1">
                <h2 className="card-title text-lg">{lecture.title}</h2>
                <p className="text-base-content text-opacity-40">
                  {lecture.instructor || '-'}
                </p>
              </div>
              <div className="flex-0">
                <a
                  className="btn btn-sm"
                  href={lecture.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Link
                </a>
              </div>
            </div>
          </div>
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
