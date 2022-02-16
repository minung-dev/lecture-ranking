import { memo } from 'react';

import classNames from 'classnames';
import styles from './Card.module.css';

const getAnimationClass = (prevIndex: number, currentIndex: number): string => {
  if (prevIndex === undefined) {
    return styles.slideInLeft;
  }

  if (prevIndex === currentIndex) {
    return '';
  }

  const diff: number = Math.abs(prevIndex - currentIndex);

  const animationClass =
    prevIndex > currentIndex ? styles.slideInUp : styles.slideInDown;
  const diffClass = styles[`step${diff}`];

  return `${animationClass} ${diffClass}`;
};

type Props = {
  lecture: Lecture;
  prevOrder: number;
  order: number;
};

function Card({ lecture, prevOrder, order }: Props) {
  return (
    <a
      className={classNames(
        'card shadow-lg compact cursor-pointer bg-base-200 hover:bg-neutral-focus mt-6 first:mt-0 ',
        styles.animation,
        getAnimationClass(prevOrder, order),
      )}
      href={lecture.url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex-row items-center space-x-5 card-body">
        <div>
          <span className="text-lg font-bold">{order + 1}</span>
        </div>
        <div className="flex-auto truncate">
          <h2 className="card-title text-base">{lecture.title}</h2>
          <p className="text-base-content text-opacity-40">
            {lecture.instructor || '-'}
          </p>
        </div>
        {/* <div>
          <a
            className="btn btn-sm"
            href={lecture.url}
            target="_blank"
            rel="noreferrer"
          >
            Link
          </a>
        </div> */}
      </div>
    </a>
  );
}

export default memo(Card);
