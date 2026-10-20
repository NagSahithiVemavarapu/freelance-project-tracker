export function getStatusInfo(project) {
  if (project.isCompleted) {
    return { type: "completed", label: "Completed", daysOverdue: 0 };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadline = new Date(project.deadline);
  deadline.setHours(0, 0, 0, 0);

  const daysOverdue = Math.round((today - deadline) / 86400000);

  if (daysOverdue > 0) {
    return {
      type: "overdue",
      label: `Overdue by ${daysOverdue} day${daysOverdue === 1 ? "" : "s"}`,
      daysOverdue
    };
  }

  if (daysOverdue === 0) {
    return { type: "pending", label: "Due today", daysOverdue: 0 };
  }

  return { type: "pending", label: "Pending", daysOverdue: 0 };
}

export function formatBudget(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "₹0";
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export function toInputDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function validateProject({ clientName, projectTitle, budget, deadline }) {
  const errors = {};

  if (!clientName || !clientName.trim()) {
    errors.clientName = "Client name is required.";
  }

  if (!projectTitle || !projectTitle.trim()) {
    errors.projectTitle = "Project title is required.";
  }

  if (budget === "" || budget === null || budget === undefined) {
    errors.budget = "Budget is required.";
  } else {
    const amount = Number(budget);
    if (Number.isNaN(amount)) {
      errors.budget = "Budget must be a number.";
    } else if (amount < 0) {
      errors.budget = "Budget cannot be negative.";
    }
  }

  if (!deadline) {
    errors.deadline = "Deadline is required.";
  } else if (Number.isNaN(new Date(deadline).getTime())) {
    errors.deadline = "Enter a valid date.";
  }

  return errors;
}
