import EditProfile from "./EditProfile";

export default function ProfileDashboard() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-5xl font-semibold text-neutral-200/60 mb-8">Profile Dashboard</h1>
      <EditProfile />
    </div>
  );
}
