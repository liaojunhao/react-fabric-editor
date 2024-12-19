import { createContext, useContext } from 'react';
import * as mobx from 'mobx';
import { StoreType } from './model/store';

export const ProjectContext = createContext({});

export const useProject = () => useContext(ProjectContext);

class Project {
  private store: StoreType;
  constructor({ store }) {
    mobx.makeAutoObservable(this);
    this.store = store;
    store.on('change', (e) => {
      // console.log('数据有变化', e);
    });
  }
  async createNewDesign() {}
}
//@ts-expect-error
export const createProject = (...args) => new Project(...args);
export default createProject;
