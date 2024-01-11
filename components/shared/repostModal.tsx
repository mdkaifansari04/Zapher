import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUserById } from "../../libs/actions/user.actions";
import CreateThreadForm from "../form/createThreadForm";
import { FadeImg } from "../core/fadeImg";

const CreateThreadDrawer = async ({
  iconImage,
  content,
  isDrawer,
}: {
  iconImage: string;
  content: string;
  isDrawer?: boolean;
}) => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const userInfo = await fetchUserById(user.id);

  if (!userInfo || !userInfo.onBoarded) {
    redirect("/onboarding");
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <FadeImg
          src={iconImage}
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </DrawerTrigger>
      <DrawerContent className="bg-[#020202] h-[80%] !border-[0.001px] !border-dark-5">
        <div className="bg-slate-800 w-1/4 md:w-1/12 h-2 rounded-full mx-auto mt-1 mb-3"></div>
        <div className="h-full w-11/12 md:w-3/6 mx-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <h1 className="text-heading2-bold font-montserrat text-center md:text-start">
            Repost Thread
          </h1>
          <CreateThreadForm
            closer={
              <DrawerClose asChild>
                <Button
                  className="font-montserrat text-base-semibold tracking-tight leading-4 w-full rounded-full"
                  variant="outline"
                >
                  Cancel
                </Button>
              </DrawerClose>
            }
            content={content}
            id={userInfo._id}
            isDrawer
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateThreadDrawer;
