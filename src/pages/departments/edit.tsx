import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import {
  useBack,
  useOne,
  type BaseRecord,
  type HttpError,
} from "@refinedev/core";
import * as z from "zod";

import { EditView } from "@/components/refine-ui/views/edit-view";
import { EditViewHeader } from "@/components/refine-ui/views/edit-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "react-router";

const departmentEditSchema = z.object({
  code: z.string().min(2, "Code must be at least 2 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

type DepartmentFormValues = z.infer<typeof departmentEditSchema>;

const DepartmentsEdit = () => {
  const back = useBack();
  const { id } = useParams();

  const form = useForm<BaseRecord, HttpError, DepartmentFormValues>({
    resolver: zodResolver(departmentEditSchema),
    refineCoreProps: {
      resource: "departments",
      action: "edit",
      id,
    },
    defaultValues: {
      code: "",
      name: "",
      description: "",
    },
  });

  const { refineCore, handleSubmit, formState, control, reset } = form;
  const { onFinish } = refineCore;
  const { isSubmitting } = formState;

  const { result: departmentResult } = useOne({
    resource: "departments",
    id: id ?? "",
  });

  const departmentData = (departmentResult as { department?: any })
    ?.department ?? departmentResult;

  useEffect(() => {
    if (departmentData) {
      reset({
        code: departmentData.code ?? "",
        name: departmentData.name ?? "",
        description: departmentData.description ?? "",
      });
    }
  }, [reset, departmentData]);

  const onSubmit = async (values: DepartmentFormValues) => {
    try {
      await onFinish(values);
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  return (
    <EditView className="class-view">
      <EditViewHeader resource="departments" title="Edit Department" />
      <Breadcrumb />

      <Separator />

      <div className="my-4 flex items-center">
        <Card className="class-form-card">
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl pb-0 font-bold text-gradient-orange">
              Update department
            </CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="mt-7">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Code <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="CS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Description <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the department focus..."
                          className="min-h-28"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => back()}>
                    Cancel
                  </Button>
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </EditView>
  );
};

export default DepartmentsEdit;
