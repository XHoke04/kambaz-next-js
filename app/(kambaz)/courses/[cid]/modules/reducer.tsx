import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// Used chatGPT here as the directions online were somewhat confusing. Genereated
// Both code snippets directly below and the payloadaction portion. 
type Lesson = {
  _id: string;
  name: string;
  description: string;
  module: string;
};

type Module = {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons: Lesson[];
  editing?: boolean;
};

type NewModule = Pick<Module, "name" | "course">;

const initialState: { modules: Module[] } = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },
    addModule: (state, { payload: module }: PayloadAction<NewModule>) => {
      const newModule: Module = {
        _id: new Date().getTime().toString(),
        lessons: [],
        description: "",
        name: module.name,
        course: module.course,
      };
      state.modules = [...state.modules, newModule];
    },
    deleteModule: (state, { payload: moduleId }: PayloadAction<string>) => {
      state.modules = state.modules.filter((module) => module._id !== moduleId);
    },
    updateModule: (state, { payload: module }: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === module._id ? module : m,
      );
    },
    editModule: (state, { payload: moduleId }: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m,
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;
