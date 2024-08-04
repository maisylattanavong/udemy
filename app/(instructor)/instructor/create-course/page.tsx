import CreateCourseForm from '@/components/courses/CreateCourseForm'
import { db } from '@/lib/db'
import React from 'react'

const CreateCoursePage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    },
    include: {
      subCategory: true
    }
  })

  return (
    <div>
      <CreateCourseForm categories={categories.map((category) => ({
        label: category.name,
        value: category.id,
        subCategory: category.subCategory.map((subcategory) => ({
          label: subcategory.name,
          value: subcategory.id
        }))
      }))} />
    </div>
  )
}

export default CreateCoursePage