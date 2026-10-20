const FILTERS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "overdue", label: "Overdue" }
];

function Toolbar({ query, onQueryChange, filter, onFilterChange, counts }) {
  return (
    <div className="toolbar">
      <div className="search-box">
        <label htmlFor="project-search" className="search-label">
          Search
        </label>
        <div className="search-input-wrap">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
          <input
            type="search"
            id="project-search"
            placeholder="Search by client or project title"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
      </div>

      <div
        className="filter-tabs"
        role="group"
        aria-label="Filter projects by status"
      >
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`filter-tab${filter === item.value ? " active" : ""}`}
            aria-pressed={filter === item.value}
            onClick={() => onFilterChange(item.value)}
          >
            {item.label}
            <span className="filter-count">{counts[item.value]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Toolbar;
