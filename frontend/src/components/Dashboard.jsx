import { useMemo, useState } from "react";
import api from "../api";
import { getStatusInfo } from "../utils";
import ConfirmDialog from "./ConfirmDialog";
import EditProjectModal from "./EditProjectModal";
import ProjectTable from "./ProjectTable";
import SummaryCards from "./SummaryCards";
import Toolbar from "./Toolbar";

function Dashboard({ projects, onRefresh }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState({ key: null, dir: "asc" });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const searched = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return projects;

    return projects.filter(
      (project) =>
        project.clientName.toLowerCase().includes(term) ||
        project.projectTitle.toLowerCase().includes(term)
    );
  }, [projects, query]);

  const counts = useMemo(() => {
    const result = { all: searched.length, pending: 0, completed: 0, overdue: 0 };
    searched.forEach((project) => {
      const status = getStatusInfo(project).type;
      result[status] += 1;
    });
    return result;
  }, [searched]);

  const visibleProjects = useMemo(() => {
    let list =
      filter === "all"
        ? searched
        : searched.filter((project) => getStatusInfo(project).type === filter);

    if (sort.key) {
      list = [...list].sort((a, b) => {
        const aValue =
          sort.key === "budget"
            ? Number(a.budget)
            : new Date(a.deadline).getTime();
        const bValue =
          sort.key === "budget"
            ? Number(b.budget)
            : new Date(b.deadline).getTime();

        if (aValue === bValue) return 0;
        const result = aValue < bValue ? -1 : 1;
        return sort.dir === "asc" ? result : -result;
      });
    }

    return list;
  }, [searched, filter, sort]);

  const handleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  };

  const toggleCompleted = async (project) => {
    try {
      await api.put(`/projects/${project._id}`, {
        isCompleted: !project.isCompleted
      });

      onRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await api.delete(`/projects/${deleteTarget._id}`);
      setDeleteTarget(null);
      onRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="dashboard" aria-labelledby="dashboard-heading">
      <div className="section-head">
        <h2 id="dashboard-heading">Project Dashboard</h2>
        <Toolbar
          query={query}
          onQueryChange={setQuery}
          filter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />
      </div>

      <SummaryCards projects={projects} />

      <ProjectTable
        projects={visibleProjects}
        totalCount={projects.length}
        sort={sort}
        onSort={handleSort}
        onToggle={toggleCompleted}
        onEdit={setEditTarget}
        onDelete={setDeleteTarget}
      />

      {deleteTarget && (
        <ConfirmDialog
          title="Delete project?"
          message={`"${deleteTarget.projectTitle}" for ${deleteTarget.clientName} will be permanently removed.`}
          confirmLabel="Delete"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {editTarget && (
        <EditProjectModal
          project={editTarget}
          onClose={() => setEditTarget(null)}
          onSaved={onRefresh}
        />
      )}
    </section>
  );
}

export default Dashboard;
