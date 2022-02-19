import { CSSProperties, memo } from 'react';

import classNames from 'classnames';
import styles from './Card.module.css';
import SwapText from './SwapText';

const getAnimationClass = (prevIndex: number, currentIndex: number): string => {
  if (prevIndex === undefined) {
    return 'slideInLeft';
  }

  if (prevIndex === currentIndex) {
    return '';
  }

  return prevIndex > currentIndex ? 'slideInUp' : 'slideInDown';
};

type Props = {
  lecture: Lecture;
  prevOrder: number;
  order: number;
};

function Card({ lecture, prevOrder, order }: Props) {
  const diff: number = Math.abs(prevOrder - order);
  return (
    <a
      className={classNames(
        'card shadow-lg compact cursor-pointer bg-base-200 hover:bg-neutral-focus mt-6 first:mt-0 animation',
        getAnimationClass(prevOrder, order),
      )}
      href={lecture.url}
      target="_blank"
      rel="noreferrer"
      style={{ '--diff': diff } as CSSProperties}
    >
      <div className="flex-row items-center space-x-5 card-body">
        <SwapText
          textClassName="text-lg font-bold"
          prev={prevOrder + 1}
          next={order + 1}
        />
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
