import { getStatusInfo } from "../utils";

function StatusBadge({ project }) {
  const status = getStatusInfo(project);

  return (
    <span className={`badge badge-${status.type}`}>
      <span className="badge-dot" aria-hidden="true" />
      {status.label}
    </span>
  );
}

export default StatusBadge;
