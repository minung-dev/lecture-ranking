type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function ServiceSelect({ value, onChange }: Props) {
  return (
    <select
      className="select max-w-xs text-xl font-bold"
      value={value}
      onChange={onChange}
    >
      <option value="goorm">Goorm</option>
      <option value="inflearn">Inflearn</option>
      <option value="udemyDev">Udemy(개발)</option>
    </select>
  );
}

export default ServiceSelect;
