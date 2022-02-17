import { memo } from 'react';

import styles from './Table.module.css';

import classNames from 'classnames';

const getAnimationClass = (prevIndex: number, currentIndex: number): string => {
  if (prevIndex === undefined) {
    return styles.slideInLeft;
  }

  if (prevIndex === currentIndex) {
    return '';
  }

  const animationClass =
    prevIndex > currentIndex ? styles.slideInUp : styles.slideInDown;

  return animationClass;
};

type TableProps = {
  lectures: Lecture[];
  prevOrderMap: { [key: string]: number };
};

function Table({ lectures, prevOrderMap }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th></th>
            <th>제목</th>
            <th>강의자</th>
          </tr>
        </thead>
        <tbody>
          {lectures.map((lecture, index) => (
            <TableRow
              key={`${lecture.id}-${index}`} // NOTE: key에 index를 포함해서 order가 달라지면 리랜더링으로 애니메이션이 동작하도록 함
              lecture={lecture}
              prevOrder={prevOrderMap[lecture.id]}
              order={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

type TableRowProps = {
  lecture: Lecture;
  prevOrder: number;
  order: number;
};

function TableRow({ lecture, prevOrder, order }: TableRowProps) {
  const diff: number = Math.abs(prevOrder - order);
  return (
    <tr
      className={classNames(
        styles.animation,
        getAnimationClass(prevOrder, order),
      )}
      style={{ '--step': diff }}
    >
      <th>{order + 1}</th>
      <td className="max-w-xs truncate">{lecture.title}</td>
      <td className="w-32">{lecture.instructor || '-'}</td>
    </tr>
  );
};

export default Table;
