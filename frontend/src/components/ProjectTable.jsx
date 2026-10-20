import StatusBadge from "./StatusBadge";
import { formatBudget, formatDate } from "../utils";

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

function SortableHeader({ label, column, sort, onSort, className }) {
  const active = sort.key === column;
  const ariaSort = active
    ? sort.dir === "asc"
      ? "ascending"
      : "descending"
    : "none";

  return (
    <th scope="col" className={className} aria-sort={ariaSort}>
      <button type="button" className="sort-btn" onClick={() => onSort(column)}>
        {label}
        <span className="sort-arrow" aria-hidden="true">
          {active ? (sort.dir === "asc" ? "▲" : "▼") : "⇅"}
        </span>
      </button>
    </th>
  );
}

function ProjectTable({
  projects,
  totalCount,
  sort,
  onSort,
  onToggle,
  onEdit,
  onDelete
}) {
  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <p>
          {totalCount === 0
            ? "No projects yet. Add your first one above."
            : "No projects match your search or filter."}
        </p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="project-table">
        <thead>
          <tr>
            <th scope="col" className="col-left">
              Client
            </th>
            <th scope="col" className="col-left">
              Project
            </th>
            <SortableHeader
              label="Budget"
              column="budget"
              sort={sort}
              onSort={onSort}
              className="col-right"
            />
            <SortableHeader
              label="Deadline"
              column="deadline"
              sort={sort}
              onSort={onSort}
              className="col-right"
            />
            <th scope="col" className="col-center">
              Status
            </th>
            <th scope="col" className="col-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td className="col-left" data-label="Client">
                {project.clientName}
              </td>
              <td className="col-left" data-label="Project">
                {project.projectTitle}
              </td>
              <td className="col-right" data-label="Budget">
                {formatBudget(project.budget)}
              </td>
              <td className="col-right" data-label="Deadline">
                {formatDate(project.deadline)}
              </td>
              <td className="col-center" data-label="Status">
                <StatusBadge project={project} />
              </td>
              <td className="col-center" data-label="Actions">
                <div className="row-actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-fixed"
                    onClick={() => onToggle(project)}
                    aria-label={
                      project.isCompleted
                        ? `Mark ${project.projectTitle} as pending`
                        : `Mark ${project.projectTitle} as completed`
                    }
                  >
                    {project.isCompleted ? "Mark Pending" : "Mark Completed"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => onEdit(project)}
                    aria-label={`Edit ${project.projectTitle} for ${project.clientName}`}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger-outline"
                    onClick={() => onDelete(project)}
                    aria-label={`Delete ${project.projectTitle} for ${project.clientName}`}
                  >
                    <TrashIcon />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTable;
