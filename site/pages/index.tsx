import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import dayjs from 'dayjs';

function Home() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await fetch(`/api/lectures/inflearn/${date}`).then((res) =>
        res.json()
      );
      setLectures(data.popular);
    })();
  }, [date]);

  const handlePrev = () => {
    const prevDate = dayjs(date).add(-1, 'day').format('YYYY-MM-DD');
    setDate(prevDate);
  }

  return (
    <div>
      <div className="btn-group">
        <button className="btn btn-outline btn-sm btn-wide" onClick={handlePrev}>이전</button> 
        <button className="btn btn-outline btn-sm btn-wide">다음</button>
      </div>
      <div className="overflow-x-auto">
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
      </div>
    </div>
  );
}

export default Home;
