"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserValidation } from "../../utils/validation/userValidation";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FadeImg } from "../core/fadeImg";
import { Textarea } from "../ui/textarea";
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "../../utils/libs";
import { useUploadThing } from "../../utils/uploadthing";
import { updateUser } from "../../libs/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
interface UserProps {
  user: {
    id?: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnText: string;
}

function AccountProfileForm({ user, btnText }: UserProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [disable, SetIsDisable] = useState(false);
  const { startUpload } = useUploadThing("mediaUploader");
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_picture: user.image,
      username: user.username,
      name: user.name,
      bio: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    SetIsDisable(true);
    const blob = values.profile_picture;
    const hasImageChanges = isBase64Image(blob);

    if (hasImageChanges) {
      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0].url) {
        values.profile_picture = imgRes[0].url;
      }
    }
    if (user.id) {
      await updateUser({
        id: user.id,
        username: values.username,
        name: values.name,
        image: values.profile_picture,
        onBoarded: true,
        bio: values.bio,
        path: pathname,
      });
    } else {
      router.push("/sign-in");
    }

    SetIsDisable(false);
    if (pathname == "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement>,
    onChange: (field: string) => void
  ) {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        onChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="profile_picture"
            render={({ field }) => (
              <FormItem className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                {field.value ? (
                  <FadeImg
                    className="rounded-full w-20 h-20"
                    src={field.value}
                  />
                ) : (
                  <div className="bg-dark-1 w-20 h-20 flex justify-center items-center rounded-full">
                    <FadeImg src={"./assets/profile.svg"} className="w-5 h-5" />
                  </div>
                )}
                <FormControl className="border-none outline-none account-form_image-input">
                  <Input
                    className="text-light-2  w-auto  placeholder:text-light-2 cursor-pointer"
                    type="file"
                    placeholder="Choose your profile"
                    onChange={(e) => handleChange(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage className="text-red-600 font-thin" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl className="account-form_input">
                  <Input
                    className="account-form_input text-dark-2 text-base-regular font-montserrat"
                    placeholder="Enter your username"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 font-thin" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl className="account-form_input text-dark-2 text-base-regular font-montserrat">
                  <Input
                    className="account-form_input"
                    placeholder="Enter your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 font-thin" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="leading-3">Bio</FormLabel>
                <FormControl className="account-form_input text-dark-2 text-base-regular font-montserrat">
                  <Textarea
                    rows={12}
                    className="account-form_input text-pretty"
                    placeholder="Enter your bio.."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 font-thin" />
              </FormItem>
            )}
          />
          <Button
            className="font-montserrat text-base-semibold tracking-tight leading-4"
            disabled={disable}
            size={"lg"}
            type="submit"
          >
            {disable ? "Saving..." : btnText}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AccountProfileForm;
