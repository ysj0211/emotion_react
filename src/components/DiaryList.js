import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Button from './Button';
import DiaryItem from "./DiaryItem";
import "./DiaryList.css";

const sortOptionList = [
  {value : "latest", name : "최신순"},
  {value : "oldest", name : "오래된 순"},
]

const DiartList = ({data}) => {
  const [sortType, setSortType] = useState("latest");
  const navigate = useNavigate();
  const [sortedData, setSortedData] = useState([]);

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  }
  const onClickNew = () => {
    navigate("/new");
  }

  useEffect(() => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return Number(b.date) - Number(a.date);
      } else {
        return Number(a.date) - Number(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(data));
    copyList.sort(compare);
    setSortedData(copyList);
  }, [data, sortType]);

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <select value={sortType} onChange={onChangeSortType}>
            {sortOptionList.map((it, idx) => (
              <option key={idx} value={it.value}>{it.name}</option>
            ))}
          </select>
        </div>
        <div className="right_col">
          <Button type={"positive"} text={"새 일기 쓰기"} onClick={onClickNew} />
        </div>
      </div>
      <div className="List_wrapper">
        {sortedData.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  )
};

export default DiartList;