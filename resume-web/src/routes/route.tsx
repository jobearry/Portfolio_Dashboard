import { corpoProjects } from "@/lib/constants/project.constants";
import Home from "@/pages/home/Home";
import { Projects } from "@/pages/projects/Projects";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/home" element={<Home />}
      />
      <Route path="/projects" element={<Projects children={corpoProjects} />}/>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}