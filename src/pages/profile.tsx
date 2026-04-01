import { useEffect, useMemo, useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "react-hook-form";

import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import UploadWidget from "@/components/upload-widget";
import { BACKEND_BASE_URL } from "@/constants";
import type { UploadWidgetValue, User } from "@/types";

type ProfileFormValues = {
  name: string;
  email: string;
};

const ProfilePage = () => {
  const { data: user, isLoading } = useGetIdentity<User>();
  const [avatar, setAvatar] = useState<UploadWidgetValue | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const { control, handleSubmit, reset, setError } = form;

  const initialAvatar = useMemo<UploadWidgetValue | null>(() => {
    if (!user?.image) return null;
    return {
      url: user.image,
      publicId: user.imageCldPubId ?? "",
    };
  }, [user]);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
        email: user.email ?? "",
      });
      setAvatar(initialAvatar);
    }
  }, [initialAvatar, reset, user]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!values.name || values.name.trim().length < 2) {
      setError("name", {
        type: "manual",
        message: "Name must be at least 2 characters",
      });
      return;
    }

    setIsSaving(true);

    try {
      const normalizedBaseUrl = BACKEND_BASE_URL.endsWith("/")
        ? BACKEND_BASE_URL.slice(0, -1)
        : BACKEND_BASE_URL;

      const response = await fetch(`${normalizedBaseUrl}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: values.name.trim(),
          image: avatar?.url ?? null,
          imageCldPubId: avatar?.publicId ?? null,
        }),
      });

      const responseText = await response.text();
      const payload = responseText ? JSON.parse(responseText) : null;

      if (!response.ok) {
        throw new Error(payload?.error || "Failed to update profile");
      }

      const updatedUser = payload?.data ?? user;
      if (updatedUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      const { toast } = await import("sonner");
      toast.success("Profile updated");
    } catch (error) {
      console.error("Error updating profile:", error);
      const { toast } = await import("sonner");
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <Breadcrumb />
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Breadcrumb />

      <div className="my-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Edit your profile
            </CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="mt-6">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <FormLabel>Profile photo</FormLabel>
                  <UploadWidget value={avatar} onChange={setAvatar} />
                </div>

                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
