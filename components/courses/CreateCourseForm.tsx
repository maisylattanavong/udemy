'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Combobox } from "../custom/ComboBox"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title is Required and minimux 2 characters"
    }),
    categoryId: z.string().min(1, {
        message: "Category is required"
    }),
    subCategoryId: z.string().min(1, {
        message: "Subcategory is required"
    })
})

interface CreateCourseFormProps {
    categories: {
        label: string // category name
        value: string //categoryId
        subCategory: { label: string, value: string }[]
    }[]
}

const CreateCourseForm = ({ categories }: CreateCourseFormProps) => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            categoryId: "",
            subCategoryId: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className="p-10">
            <h1 className="text-xl font-bold">Let give some basics for your course</h1>
            <p className="text-sm mt-3">It is ok if you can not think of a good title or correct category now. you can change the later.</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="title" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subCategoryId"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Subcategory</FormLabel>
                                <FormControl>
                                    <Combobox options={categories.find((category)=>category.value=== form.watch("categoryId"))?.subCategory || []} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Combobox options={categories} {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default CreateCourseForm