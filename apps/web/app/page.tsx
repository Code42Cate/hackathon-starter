import { User, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<User[]> {
  const data = await fetch("http://api:3000/users").then((res) => res.json());
  return data as User[];
}

export default async function Page() {
  const data = await getData();

  return (
    <main className="flex flex-col items-center py-4">
      <DataTable columns={columns} data={data} />
    </main>
  );
}
