import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

function Home() {
  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await fetch('/api/lectures/goorm/2022-02-05').then(res => res.json());
      setLectures(data.popularPaid)
    })();
  }, []);

  return (
    <div>
      {lectures.map(lecture => (
        <div key={lecture.id}>
          <h4>{lecture.title}</h4>
        </div>
      ))}
    </div>
  )
}

export default Home;
