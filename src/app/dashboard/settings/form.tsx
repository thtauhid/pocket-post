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
import { toast } from "sonner";
import type { User } from "@prisma/client";

const providers = [
  {
    label: "Resend",
    value: "resend",
  },
  // {
  //   label: "Mailgun",
  //   value: "mailgun",
  // },
];

const formSchema = z.object({
  provider: z.enum(["resend", "mailgun"]),
  api_key: z.string().min(1, {
    message: "API Key is required",
  }),
  default_from: z.string().email({
    message: "Invalid email address",
  }),
  default_reply_to: z
    .string()
    .email({
      message: "Invalid email address",
    })
    .optional(),
});

type Props = {
  user: User | null;
};

export default function SettingsForm(props: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provider: props.user?.provider || "resend",
      api_key: props.user?.api_key || "",
      default_from: props.user?.default_from_email || "",
      default_reply_to: props.user?.default_reply_to_email || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const result = await data.json();

    if (result) {
      toast("Updated successfully");
    } else {
      toast("Failed to update");
    }
  }

  return (
    <div className="">
      <h1 className="font-bold text-2xl border-b border-b-stone-400 p-4">
        Settings
      </h1>

      <div className="m-4 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Provider</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a provider" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {providers.map((provider) => (
                        <SelectItem key={provider.value} value={provider.value}>
                          {provider.label}
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
              name="api_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="API Key" {...field} />
                  </FormControl>
                  <FormDescription>Enter your API key.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="default_from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default From Address</FormLabel>
                  <FormControl>
                    <Input placeholder="info@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the default from email address.
                    <b>This will be autofilled for you when sending emails.</b>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="default_reply_to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Reply To</FormLabel>
                  <FormControl>
                    <Input placeholder="info@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the default reply to email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
