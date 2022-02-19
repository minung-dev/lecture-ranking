import classNames from 'classnames';

const ITEMS = [
  {
    id: 'latest',
    text: '최신순',
  },
  {
    id: 'popular',
    text: '인기순',
  },
  {
    id: 'popularPaid',
    text: '인기순 (유료)',
  },
  {
    id: 'popularFree',
    text: '인기순 (무료)',
  },
];

type Props = {
  activeId: string;
  onItemClick: (itemId: string) => void;
};

function Tabs({ activeId, onItemClick }: Props) {
  return (
    <div className="tabs">
      {ITEMS.map((item) => (
        <div
          key={item.id}
          className={classNames(
            'tab tab-lifted flex-grow',
            activeId === item.id && 'tab-active',
          )}
          onClick={() => onItemClick(item.id)}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
