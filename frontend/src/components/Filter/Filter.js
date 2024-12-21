import "./Filter.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/actions";
import { filterSelector } from "../../redux/selectors";

function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(filterSelector);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="filter-container">
      <p>Filter:</p>
      <input
        type="radio"
        name="filter"
        value="all"
        checked={filter === "all"}
        onChange={handleFilterChange}
      />
      <label htmlFor="filter-all">All</label>
      <input
        type="radio"
        name="filter"
        value="undone"
        checked={filter === "undone"}
        onChange={handleFilterChange}
      />
      <label htmlFor="filter-undone">Undone</label>
      <input
        type="radio"
        name="filter"
        value="done"
        checked={filter === "done"}
        onChange={handleFilterChange}
      />
      <label htmlFor="filter-done">Done</label>
    </div>
  );
}

export default Filter;
