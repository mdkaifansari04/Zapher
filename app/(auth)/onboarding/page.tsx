import { currentUser } from "@clerk/nextjs";
import AccountProfileForm from "../../../components/form/accountProfileForm";
import { fetchUserById } from "../../../libs/actions/user.actions";
import { redirect } from "next/navigation";
const page = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const userInfo = await fetchUserById(user.id);
  if (userInfo && userInfo.onBoarded) {
    redirect("/");
  }
  const userData = {
    id: user?.id,
    objectId: userInfo?._id || "",
    username: user?.username || userInfo?.username || "",
    name: user?.firstName || userInfo?.name || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl || "",
  };

  return (
    <section className="container px-5 md:px-40 mt-14">
      <h1 className="text-heading1-semibold">Onboarding</h1>
      <p className="text-dark-2">Complete your profile now to use thread</p>

      <div className="bg-secondary-500 p-3 md:px-12 md:py-10 my-11">
        <AccountProfileForm user={userData} btnText="Continue" />
      </div>
    </section>
  );
};

export default page;
