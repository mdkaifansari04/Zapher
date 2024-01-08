import { redirect } from "next/navigation";
import ThreadCard from "../../../../components/cards/threadCard";
import { fetchThreadById } from "../../../../libs/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import { fetchUserById } from "../../../../libs/actions/user.actions";
import CommentForm from "../../../../components/form/commentForm";

async function page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const userInfo = await fetchUserById(user.id);
  if (!userInfo || !userInfo.onBoarded) {
    redirect("/onboarding");
  }
  const thread = await fetchThreadById(params.id);
  return (
    <section className="flex flex-col">
      <div className="comment">
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>
      <div className="w-full h-0.5 bg-dark-6 mt-10"></div>
      <div className="mt-7">
        <CommentForm
          threadId={thread._id}
          image={userInfo.image}
          userId={userInfo._id}
          parentId={thread.parentId}
        />
      </div>
      <div className="mt-8">
        {thread.children.map((comment: any) => (
          <ThreadCard
            key={comment._id}
            id={comment._id}
            currentUserId={user.id}
            parentId={comment.parentId}
            content={comment.text}
            author={comment.author}
            community={comment.community}
            createdAt={comment.createdAt}
            comments={comment.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default page;
