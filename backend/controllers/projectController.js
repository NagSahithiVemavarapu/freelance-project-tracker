const Project = require("../models/Project");

// GET all projects
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new project
const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE project
const updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE project
const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);

        if (!deletedProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.json({
            message: "Project deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};