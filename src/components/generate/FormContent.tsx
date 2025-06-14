import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircleIcon } from "lucide-react";
import type { CreateReportInput } from "@/lib/schema";

interface FormContentProps {
  form: ReturnType<typeof useForm<CreateReportInput>>;
  onSubmit: (data: CreateReportInput) => void;
  isLoading: boolean;
}

const FormContent = ({ form, onSubmit, isLoading }: FormContentProps) => (
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 text-base"
    >
      <FormField
        control={form.control}
        name="reportType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Report type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Please select report type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="STOCK_SUMMARY">Stock Summary</SelectItem>
                <SelectItem value="MACRO_TRENDS">Macro Trends</SelectItem>
                <SelectItem value="CUSTOM">Custom Report</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="timeRange"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Time Range</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Please select time range" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="TODAY">Today</SelectItem>
                <SelectItem value="LAST_7_DAYS">Last 7 Days</SelectItem>
                <SelectItem value="LAST_30_DAYS">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="mimeType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select file type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Please select file type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="APPLICATION_PDF">PDF</SelectItem>
                <SelectItem value="TEXT_CSV">CSV</SelectItem>
                <SelectItem value="APPLICATION_JSON">JSON</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="customRequest"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tell our AI what to focus on</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Please enter any other specific requirements here for the report. Please note that this will depend on the request availability of the report data."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        <PlusCircleIcon className="h-4 w-4" />
        Generate
      </Button>
    </form>
  </Form>
);

export default FormContent;
