import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { modules as seedModules } from "../../../database";

type Module = (typeof seedModules)[number] & { editing?: boolean };
type NewModule = Pick<Module, "name" | "course">;

const initialState: { modules: Module[] } = {
  modules: seedModules,
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
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

export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;
