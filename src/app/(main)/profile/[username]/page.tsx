import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

async function ProfilePage({ params }: { params: { username: string } }) {
  const { user } = await validateRequest();
  const userProfile = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
    include: {
      Posts: {
        select: {
          title: true,
          id: true,
        },
      },
    },
  });

  if (!userProfile) {
    return <div>User profile not found</div>;
  }

  const isAuthor = userProfile?.username === user?.username;

  return (
    <div>
      <h1>{userProfile?.name}</h1>

      <h2>Posts</h2>

      {!userProfile?.Posts?.length && <div>This user has no posts yet.</div>}

      {userProfile.Posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id}>
          {post.title}
        </Link>
      ))}

      {isAuthor && (
        <div>
          <Link href="/profile/edit">Edit Profile</Link>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
