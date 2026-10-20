import { formatBudget, getStatusInfo } from "../utils";

function SummaryCards({ projects }) {
  const totalProjects = projects.length;
  const totalBudget = projects.reduce(
    (sum, project) => sum + (Number(project.budget) || 0),
    0
  );
  const completed = projects.filter(
    (project) => getStatusInfo(project).type === "completed"
  ).length;
  const overdue = projects.filter(
    (project) => getStatusInfo(project).type === "overdue"
  ).length;

  const cards = [
    { label: "Total Projects", value: totalProjects, tone: "neutral" },
    { label: "Total Budget", value: formatBudget(totalBudget), tone: "navy" },
    { label: "Completed", value: completed, tone: "success" },
    { label: "Overdue", value: overdue, tone: "danger" }
  ];

  return (
    <section className="summary-cards" aria-label="Project summary">
      {cards.map((card) => (
        <article className={`summary-card tone-${card.tone}`} key={card.label}>
          <p className="summary-label">{card.label}</p>
          <p className="summary-value">{card.value}</p>
        </article>
      ))}
    </section>
  );
}

export default SummaryCards;
