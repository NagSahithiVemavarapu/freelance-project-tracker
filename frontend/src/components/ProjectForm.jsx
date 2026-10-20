import { useEffect, useRef, useState } from "react";
import api from "../api";
import { validateProject } from "../utils";
import Toast from "./Toast";

const EMPTY_FORM = {
  clientName: "",
  projectTitle: "",
  budget: "",
  deadline: ""
};

function ProjectForm({ onProjectAdded }) {
  const [project, setProject] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(toastTimer.current);
  }, []);

  const showToast = (message, type = "success") => {
    clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...project, [name]: value };
    setProject(next);

    if (submitAttempted) {
      setErrors(validateProject(next));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateProject(project);
    setSubmitAttempted(true);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      await api.post("/projects", project);

      setProject(EMPTY_FORM);
      setErrors({});
      setSubmitAttempted(false);
      showToast("Project added successfully.");

      if (onProjectAdded) {
        onProjectAdded();
      }
    } catch (error) {
      console.log(error);
      showToast("Could not add the project. Please try again.", "error");
    }
  };

  const fieldError = (name) =>
    errors[name] ? (
      <p className="field-error" id={`${name}-error`} role="alert">
        {errors[name]}
      </p>
    ) : null;

  const errorProps = (name) => ({
    "aria-invalid": errors[name] ? "true" : "false",
    "aria-describedby": errors[name] ? `${name}-error` : undefined
  });

  return (
    <section className="card form-container" aria-labelledby="add-project-heading">
      <h2 id="add-project-heading">Add New Project</h2>

      <form className="form-grid" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="clientName">Client Name</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            placeholder="e.g. Priya Sharma"
            value={project.clientName}
            onChange={handleChange}
            {...errorProps("clientName")}
          />
          {fieldError("clientName")}
        </div>

        <div className="field">
          <label htmlFor="projectTitle">Project Title</label>
          <input
            type="text"
            id="projectTitle"
            name="projectTitle"
            placeholder="e.g. E-commerce website"
            value={project.projectTitle}
            onChange={handleChange}
            {...errorProps("projectTitle")}
          />
          {fieldError("projectTitle")}
        </div>

        <div className="field">
          <label htmlFor="budget">Budget (&#8377;)</label>
          <div className="input-prefix">
            <span className="input-prefix-symbol" aria-hidden="true">
              &#8377;
            </span>
            <input
              type="number"
              id="budget"
              name="budget"
              min="0"
              step="1"
              placeholder="0"
              value={project.budget}
              onChange={handleChange}
              {...errorProps("budget")}
            />
          </div>
          {fieldError("budget")}
        </div>

        <div className="field">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={project.deadline}
            onChange={handleChange}
            {...errorProps("deadline")}
          />
          {fieldError("deadline")}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Add Project
          </button>
        </div>
      </form>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </section>
  );
}

export default ProjectForm;
