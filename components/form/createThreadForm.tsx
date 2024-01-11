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
import { useOrganization } from "@clerk/nextjs";

interface FormProps {
  id: string;
  content?: string;
  isDrawer?: boolean;
  closer?: any;
}

function CreateThreadForm({ id, content, isDrawer, closer }: FormProps) {
  const [disable, setIsDisable] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { organization, isLoaded } = useOrganization();
  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: content ? content : "",
    },
  });

  console.log("org1", organization?.id);
  const onSubmit = async (value: z.infer<typeof ThreadValidation>) => {
    setIsDisable(true);
    form.reset();
    if (isLoaded) {
      await createThread({
        text: value.thread,
        userId: id,
        path: pathname,
        communityId: organization ? organization?.id : null,
      });
    }

    router.push("/");
    setIsDisable(false);
  };
  return (
    <div className="my-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem>
                <FormControl className="border-none text-dark-2 my-10">
                  <Textarea
                    rows={8}
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
          {isDrawer && closer}
        </form>
      </Form>
    </div>
  );
}

export default CreateThreadForm;
