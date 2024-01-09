"use client";
import { FadeImg } from "../core/fadeImg";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SearchSchema } from "../../utils/validation/threadValidation";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";
import { fetchUsers } from "../../libs/actions/user.actions";
import { clx } from "../../utils/libs";
import { setFoundUSer } from "../../app/(root)/search/page";

function SearchBar({
  userId,
  className,
  placeholder,
}: {
  userId: string;
  className: string;
  placeholder: string;
}) {
  // const [placeholder, setPlaceHolder] = useState<string>("Md Kaif Ansari");
  // const [count, setCount] = useState<number>(0);

  const path = usePathname();
  const form = useForm({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SearchSchema>) => {
    const response = await fetchUsers({
      userId: userId,
      queryString: values.thread,
      path: path,
    });

    if (!response) return;

    setFoundUSer(response.users);
  };

  // (() => {
  //   const placeHolderArray: string[] = [
  //     "Elon Musk",
  //     "Mark Zugerberg",
  //     "Bill Gates",
  //   ];

  //   setInterval(() => {
  //     console.log(count);

  //     setPlaceHolder((prev: string) => placeHolderArray[count]);
  //     if (count === placeHolderArray.length) {
  //       setCount(0);
  //     } else {
  //       setCount((prev) => prev + 1);
  //     }
  //   }, 2000);
  // })();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={clx(
          "space-y-8 flex items-center justify-between gap-3 bg-dark-7 px-5 py-2 rounded-full",
          className
        )}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex gap-3 w-full items-center">
              <FadeImg
                src={"./assets/search.svg"}
                alt="Profile"
                className="w-5 h-5 relative -right-1"
              />
              <FormControl className="border-none bg-transparent w-full">
                <Input
                  type="search"
                  className="no-focus  text-x-small-semibold text-light-1 !my-0 outline-none w-full"
                  placeholder={placeholder}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
export default SearchBar;
