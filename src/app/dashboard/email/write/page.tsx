"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/lib/prisma";
import { toast } from "sonner";

const from_addresses = [
  {
    label: "Official",
    value: "info@tauhid.dev",
  },
  {
    label: "Personal",
    value: "thtauhid.71@gmail.com",
  },
];

const formSchema = z.object({
  subject: z.string(),
  from_address: z.string(),
  to_address: z.string(),
  body: z.string(),
});

export default function SettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      from_address: "",
      to_address: "",
      body: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      toast.success("Email sent successfully");
      console.log("Email sent successfully");
      const data = await response.json();
      console.log({ data });
    } else {
      toast.error("Failed to send email");
    }
  }

  return (
    <div className="">
      <h1 className="font-bold text-2xl border-b border-b-stone-400 p-4">
        Write Email
      </h1>

      <div className="m-4 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Write the email subject here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="from_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a from address" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {from_addresses.map((addr) => (
                        <SelectItem key={addr.value} value={addr.value}>
                          {addr.label} ({addr.value})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a verified email to display.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="to_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the recipient email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Body</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>Write the email body here.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Send</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
