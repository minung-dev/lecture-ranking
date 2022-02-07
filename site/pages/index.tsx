import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

function Home() {
  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await fetch("/api/lectures/goorm/2022-02-05").then((res) =>
        res.json()
      );
      setLectures(data.popularPaid);
    })();
  }, []);

  return (
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
  );
}

export default Home;
