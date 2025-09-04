"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/FileUpload";
import ColorPicker from "../ColorPicker";
import { createBook } from "@/lib/admin/actions/book";

interface Props extends Partial<Book> {
  type: "create" | "update";
}

const BookForm = ({ type, ...book }: Props) => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      coverColor: "",
      videoUrl: "",
      summary: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    const result = await createBook(values);

    if(result.success) {
      toast.success("Book added successfully!");
      router.push(`/admin/books/${result.data.id}`);
    } else {
      toast.error(result.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Title
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Book title"
                    className="book-form_input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Author
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Book author"
                    className="book-form_input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Genre
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Book genre"
                    className="book-form_input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Rating
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    required
                    placeholder="Book rating"
                    className="book-form_input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalCopies"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Total Copies
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={1000}
                    required
                    placeholder="Total copies"
                    className="book-form_input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverUrl"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Cover
                </FormLabel>
                <FormControl>
                  <FileUpload
                    type="image"
                    folder="books/covers"
                    onFileChange={field.onChange}
                    variant="light"
                    accept="image/*"
                    placeholder="Upload a book cover"
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverColor"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Primary Color
                </FormLabel>
                <FormControl>
                  <ColorPicker onPickerChange={field.onChange} value={field.value}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Book description"
                    {...field}
                    rows={5}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Trailer
                </FormLabel>
                <FormControl>
                  <FileUpload
                    type="video"
                    folder="books/videos"
                    onFileChange={field.onChange}
                    variant="light"
                    accept="video/*"
                    placeholder="Upload a book trailer"
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Summary
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Book summary"
                    {...field}
                    rows={10}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="book-form_btn bg-primary-admin hover:bg-primary-admin/90">
            Add book to library
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookForm;
