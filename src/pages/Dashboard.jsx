import { Navigate, Route, Routes } from "react-router";
import Shell from "../Components/Shell";
import DiscoverPage from "./DiscoverPage";
import RequestsPage from "./RequestsPage";
import ConnectionsPage from "./ConnectionsPage";
import ProfilePage from "./ProfilePage";

export default function Dashboard() {
  return (
    <Shell>
      <Routes>
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="connections" element={<ConnectionsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/discover" replace />} />
      </Routes>
    </Shell>
  );
}
