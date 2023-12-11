const StatusCard = ({ status }) => {
  const statusArr = ['NOTHING', 'OPEN', 'IN_PROGRESS', 'COMPLETE', 'CANCELED'];
  const colors = [
    'github-gray text-black',
    'github-green text-white',
    'github-blue text-white',
    'github-black text-white',
    'github-red text-white',
  ];
  const css = `p-4 font-bold rounded-md shadow-md animate-appear bg-${colors[status]}`;

  return (
    <div className="p-6 rounded-md shadow-md m-4 bg-github-gray animate-popup">
      <div className="mb-3">The Task status is...</div>
      <div className={css}>{statusArr[status]}</div>
    </div>
  );
};

export default StatusCard;
