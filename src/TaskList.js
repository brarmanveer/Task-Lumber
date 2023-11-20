import React, { useEffect, useState } from 'react';
import taskData from './task.json';
import wbsData from './wbs.json';
import projectData from './project.json';

const TaskList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Organize data by projects
    const projectsData = projectData.map((project) => ({
      ...project,
      wbsList: wbsData.filter((wbs) => wbs.projectId === project.id).map((wbs) => ({
        ...wbs,
        tasks: taskData.filter((task) => task.wbsId === wbs.id),
      })),
    }));

    setProjects(projectsData);
  }, []);

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.name}</h2>
          {project.wbsList.map((wbs) => (
            <div key={wbs.id}>
              <h3>{wbs.name}</h3>
              <ul>
                {wbs.tasks.map((task) => (
                  <li key={task.id}>{task.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskList;