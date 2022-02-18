type Props = {
  date: string;
  onPrevClick: () => void;
  onNextClick: () => void;
};

function DateButtonGroup({ date, onPrevClick, onNextClick }: Props) {
  return (
    <div className="btn-group w-full my-6">
      <button className="btn btn-outline btn-sm grow" onClick={onPrevClick}>
        이전
      </button>
      <button className="btn btn-outline btn-sm grow">{date}</button>
      <button className="btn btn-outline btn-sm grow" onClick={onNextClick}>
        다음
      </button>
    </div>
  );
}

export default DateButtonGroup;
