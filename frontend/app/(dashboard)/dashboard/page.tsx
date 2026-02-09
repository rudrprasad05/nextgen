import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { H1, P } from "@/components/font/Fonts";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <H1 className="">Dashboard</H1>
        <P className="">
          Welcome back! Here&apos;s what&apos;s happening with your site.
        </P>
      </div>
      <DashboardStats />
    </div>
  );
}
