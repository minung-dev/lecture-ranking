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
    <div
      className={classNames(
        'card shadow-lg compact side bg-base-200 mt-6 first:mt-0',
        styles.animation,
        getAnimationClass(prevOrder, order),
      )}
      key={lecture.id}
    >
      <div className="flex-row items-center space-x-5 card-body">
        <div className="flex-0">
          <span className="text-lg font-bold">{order + 1}</span>
        </div>
        <div className="flex-1">
          <h2 className="card-title text-base">{lecture.title}</h2>
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
  );
}

export default memo(Card);
