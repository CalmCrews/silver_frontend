import React, { useState } from 'react';
import { includesByCho, makeRegexByCho } from 'hangul-util'; // hangul-util 라이브러리를 import

const AutoComplete: React.FC = () => {
  const dataList: string[] = ["빨간색", "빨간맛", "파란색", "노란색", "검정색"];

  const [searchValue, setSearchValue] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [matchDataList, setMatchDataList] = useState<string[]>([]);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    const newMatchDataList = value
      ? dataList.filter((label) => includesByCho(value, label))
      : [];

    switch (event.keyCode) {
      case 38: // UP KEY
        setActiveIndex(Math.max(activeIndex - 1, 0));
        break;

      case 40: // DOWN KEY
        setActiveIndex(Math.min(activeIndex + 1, newMatchDataList.length - 1));
        break;

      case 13: // ENTER KEY
        setSearchValue(newMatchDataList[activeIndex] || '');
        setActiveIndex(0);
        setMatchDataList([]);
        break;

      default:
        setActiveIndex(0);
        break;
    }

    setMatchDataList(newMatchDataList);
  };

  const handleItemClick = (index: number) => {
    setSearchValue(matchDataList[index]);
    setMatchDataList([]);
  };

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        onKeyUp={handleKeyUp}
      />
      <div className="autocomplete">
        {matchDataList.map((label, index) => (
          <div
            key={index}
            className={index === activeIndex ? "active" : ""}
            onClick={() => handleItemClick(index)}
          >
            {label.replace(makeRegexByCho(searchValue), '<mark>$1</mark>')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoComplete;
