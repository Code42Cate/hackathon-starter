import { User, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<User[]> {
  return [
    {
      id: "728ed52f",
      name: "John Doe",
      status: "pending",
      email: "j@example.com",
    },
    {
      id: "3b3b3b3b",
      name: "Alice Doe",
      status: "pending",
      email: "a@example.com",
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <main className="flex flex-col items-center py-4">
      <DataTable columns={columns} data={data} />
    </main>
  );
}
