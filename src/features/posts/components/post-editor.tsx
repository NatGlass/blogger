"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type CreatePostSchemaType, createPostSchema } from "../schema";
import { Textarea } from "@/components/ui/textarea";
import { CreatePostAction } from "../actions/create-post-action";

function PostEditor() {
  const form = useForm<CreatePostSchemaType>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (data: CreatePostSchemaType) => {
    await CreatePostAction(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <Input type="text" placeholder="Title" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <Textarea placeholder="Write something awesome..." {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Post</Button>
      </form>
    </Form>
  );
}
export default PostEditor;
