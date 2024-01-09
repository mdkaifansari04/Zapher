"use server";
import UserCard from "../../../components/cards/userCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUserById, fetchUsers } from "../../../libs/actions/user.actions";
import { redirect } from "next/navigation";
import SearchBar from "../../../components/form/search";
let users = [];

export const setFoundUSer = (foundUser: any[]) => {
  users = foundUser;
};
async function Page() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const userInfo = await fetchUserById(user && user.id);

  if (!userInfo || !userInfo.onBoarded) {
    redirect("/onboarding");
  }

  const response = await fetchUsers(userInfo.id);
  users = response ? response?.users : [];

  return (
    <section className="overflow-y-auto">
      <h1 className="text-heading2-bold font-montserrat">Search</h1>

      <SearchBar placeholder="Search users" userId={user.id} className="mt-6" />

      <div className="mt-10">
        {users?.map((user) => (
          <UserCard
            name={user.name}
            username={user.username}
            image={user.image}
            userId={user.id}
            key={user.id}
          />
        ))}
      </div>
    </section>
  );
}

export default Page;
