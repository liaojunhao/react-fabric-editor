import { createContext, useContext } from 'react';

export const ProjectContext = createContext({});

export const useProject = () => useContext(ProjectContext);

class Project {
  async createNewDesign() {}
}
//@ts-expect-error
export const createProject = (...args) => new Project(...args);
export default createProject;
