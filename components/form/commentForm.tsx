"use client";
import { FadeImg } from "../core/fadeImg";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CommentSchema } from "../../utils/validation/threadValidation";
import { useState } from "react";
import { Input } from "../ui/input";
import { commentOnThread } from "../../libs/actions/thread.actions";
import { usePathname } from "next/navigation";
interface CommentFormProps {
  threadId: string;
  image: string;
  parentId: string;
  userId: string;
}

function CommentForm({ threadId, image, parentId, userId }: CommentFormProps) {
  const [disable, setIsDisable] = useState(false);
  const path = usePathname();
  const form = useForm({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      thread: "",
    },
  });

  console.log(threadId);

  const onSubmit = async (values: z.infer<typeof CommentSchema>) => {
    setIsDisable(true);
    form.reset();
    await commentOnThread({
      threadId,
      parentId,
      path: path,
      author: userId,
      comment: values.thread,
    });

    setIsDisable(false);
  };
  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex items-center justify-between gap-3"
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex gap-3 w-full items-center">
                <FadeImg
                  src={image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full "
                />
                <FormControl className="border-none bg-transparent w-full">
                  <Input
                    type="text"
                    className="no-focus text-small-regular text-light-1 !my-0 outline-none w-full"
                    placeholder="Comment..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="font-montserrat text-base-semibold tracking-tight px-5 !mt-0 leading-4 rounded-full"
            disabled={disable}
            size={"sm"}
            type="submit"
          >
            Reply
          </Button>
        </form>
      </Form>
    </div>
  );
}
export default CommentForm;
