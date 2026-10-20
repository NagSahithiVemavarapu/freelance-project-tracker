import { useState } from "react";
import api from "../api";
import { toInputDate, validateProject } from "../utils";
import Modal from "./Modal";

function EditProjectModal({ project, onClose, onSaved }) {
  const [form, setForm] = useState({
    clientName: project.clientName,
    projectTitle: project.projectTitle,
    budget: project.budget,
    deadline: toInputDate(project.deadline)
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);

    if (Object.keys(errors).length > 0) {
      setErrors(validateProject(next));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateProject(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    try {
      await api.put(`/projects/${project._id}`, {
        clientName: form.clientName.trim(),
        projectTitle: form.projectTitle.trim(),
        budget: Number(form.budget),
        deadline: form.deadline
      });

      onSaved();
      onClose();
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
  };

  const fieldError = (name) =>
    errors[name] ? (
      <p className="field-error" id={`edit-${name}-error`} role="alert">
        {errors[name]}
      </p>
    ) : null;

  const errorProps = (name) => ({
    "aria-invalid": errors[name] ? "true" : "false",
    "aria-describedby": errors[name] ? `edit-${name}-error` : undefined
  });

  return (
    <Modal title="Edit Project" onClose={onClose}>
      <form className="form-grid form-grid-modal" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="edit-clientName">Client Name</label>
          <input
            type="text"
            id="edit-clientName"
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
            {...errorProps("clientName")}
          />
          {fieldError("clientName")}
        </div>

        <div className="field">
          <label htmlFor="edit-projectTitle">Project Title</label>
          <input
            type="text"
            id="edit-projectTitle"
            name="projectTitle"
            value={form.projectTitle}
            onChange={handleChange}
            {...errorProps("projectTitle")}
          />
          {fieldError("projectTitle")}
        </div>

        <div className="field">
          <label htmlFor="edit-budget">Budget (&#8377;)</label>
          <div className="input-prefix">
            <span className="input-prefix-symbol" aria-hidden="true">
              &#8377;
            </span>
            <input
              type="number"
              id="edit-budget"
              name="budget"
              min="0"
              step="1"
              value={form.budget}
              onChange={handleChange}
              {...errorProps("budget")}
            />
          </div>
          {fieldError("budget")}
        </div>

        <div className="field">
          <label htmlFor="edit-deadline">Deadline</label>
          <input
            type="date"
            id="edit-deadline"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            {...errorProps("deadline")}
          />
          {fieldError("deadline")}
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditProjectModal;
