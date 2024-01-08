"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ThreadValidation } from "../../utils/validation/threadValidation";
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
import { Textarea } from "../ui/textarea";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createThread } from "../../libs/actions/thread.actions";

interface FormProps {
  user: {
    _id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
}

function CreateThreadForm({ user }: FormProps) {
  const [disable, setIsDisable] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof ThreadValidation>) => {
    setIsDisable(true);
    form.reset();
    await createThread({
      text: value.thread,
      userId: user._id,
      path: pathname,
    });
    router.push("/");
    setIsDisable(false);
  };
  return (
    <div className="my-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="leading-3 text-small-regular my-2">
                  Content
                </FormLabel>
                <FormControl className="border-none text-dark-2 my-10">
                  <Textarea
                    rows={12}
                    className="no-focus p-5 text-small-regular bg-[#080A0D] text-light-1 !my-0 outline-none border-dark-2 border-[0.1px]"
                    placeholder=""
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
            {disable ? "Posting..." : "Post Thread"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateThreadForm;
