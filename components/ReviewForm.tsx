import {Input} from "@/components/Input";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {MutationCreateReviewArgs, ReviewCreateInput, useCreateProductReviewMutation} from "@/generated/types-and-hooks";

interface ReviewFormData {
  headline: string,
  content: string,
}

interface Props {
  slug: string
}

export const ReviewForm = ({slug}: Props) => {
  const {register, handleSubmit} = useForm<ReviewFormData>()
  const [createReview, {data: successData}] = useCreateProductReviewMutation()


  const onSubmit = handleSubmit(async (data) => {
    const preparedReview: ReviewCreateInput = {
      name: "Page",
      email: "page@web.com",
      product: {connect: {slug}},
      ...data,
    }

    await createReview({
      variables: {
        review: preparedReview
      }
    })
  })

  if (successData) {
    return (<h2 className="text-base font-semibold leading-7 mt-8">Sent successful</h2>
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-8">Add review</h2>

      <div className=" grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <Input label="Headline" register={register('headline')}/>
        </div>

        <div className="col-span-full">
          <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
          <div className="mt-2">
                <textarea
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("content")}
                />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about product.</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Send
        </button>
      </div>
    </form>
  )
}