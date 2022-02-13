function Tabs() {
  return (
    <div className="tabs">
      <a className="tab tab-lifted flex-grow"></a>
      <a className="tab tab-lifted flex-grow">최신순</a>
      <a className="tab tab-lifted tab-active flex-grow">인기순</a>
      <a className="tab tab-lifted flex-grow">인기순 (무료)</a>
      <a className="tab tab-lifted flex-grow">인기순 (유료)</a>
      <a className="tab tab-lifted flex-grow"></a>
    </div>
  );
};

export default Tabs;