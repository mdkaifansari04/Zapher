import CreateThreadForm from "../../../components/form/createThreadForm";
import { currentUser } from "@clerk/nextjs";
import { fetchUserById } from "../../../libs/actions/user.actions";
import { redirect } from "next/navigation";

async function Page({ params }: { params: { content: string } }) {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const userInfo = await fetchUserById(user.id);

  if (!userInfo || !userInfo.onBoarded) {
    redirect("/onboarding");
  }

  return (
    <section className="">
      <h1 className="text-heading2-bold font-montserrat">Create Thread</h1>
      <CreateThreadForm id={userInfo._id} />
    </section>
  );
}

export default Page;
