import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex relative top-0 right-0 max-w-full h-screen justify-center items-center my-auto">
      <SignIn />
    </section>
  );
}
