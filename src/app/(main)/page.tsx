import prisma from "@/lib/prisma";
import Link from "next/link";

async function HomePage() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          username: true,
          name: true,
          imageUrl: true,
        },
      },
    },
  });

  return (
    <div className="container">
      {posts.map((post) => (
        <div key={post.id}>
          <h2 className="text-3xl">{post.title}</h2>
          <p>{post.content}</p>
          <Link href={`/profile/${post.user.username}`}>
            <p className="text-sm text-muted-foreground">By {post.user.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
