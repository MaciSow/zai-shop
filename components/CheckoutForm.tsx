import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import {Input} from "@/components/Input";
import {Select} from "@/components/Select";
import {useCreateCheckoutDataMutation} from "@/generated/types-and-hooks";

const checkoutFormSchema = yup
  .object({
    firstName: yup.string().required("Name is required"),
    lastName: yup.string().required("Surname is required"),
    email: yup.string().email("This isn't email format").required("Email is required"),
    country: yup.string().required("Country is required"),
    streetAddress: yup.string().required("Street address is required"),
    city: yup.string().required("City is required"),
    region: yup.string().required("Region is required"),
    postalCode: yup.string().required("Postal code is required"),
  })

type CheckoutData = yup.InferType<typeof checkoutFormSchema>

export const CheckoutForm = () => {
  const [createCheckout, createdCheckoutResult] = useCreateCheckoutDataMutation()

  const {register, formState: {errors}, handleSubmit} = useForm<CheckoutData>({
    resolver: yupResolver(checkoutFormSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    await createCheckout({
      variables: {
        checkoutData: data
      }
    })
  })

  if (createdCheckoutResult.data?.checkoutId) {
    const {id} = createdCheckoutResult.data.checkoutId

    return <h2 className="text-base font-semibold leading-7">Your new checkout: {id}</h2>
  }


  return (
    <form onSubmit={onSubmit}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Checkout form</h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Input
              label="First name"
              type="text"
              autoComplete="given-name"
              register={register('firstName')}
              errorMessage={errors.firstName?.message}
            />
          </div>

          <div className="sm:col-span-3">
            <Input
              label="Last name"
              type="text"
              autoComplete="family-name"
              register={register("lastName")}
              errorMessage={errors.lastName?.message}
            />
          </div>

          <div className="sm:col-span-4">
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              register={register("email")}
              errorMessage={errors.email?.message}
            />
          </div>


          <div className="sm:col-span-3">
            <Select
              label="Country"
              autoComplete="country-name"
              options={['USA', 'Canada', 'Mexico']}
              register={register("country")}
              errorMessage={errors.country?.message}
            />
          </div>

          <div className="col-span-full">
            <Input
              label="Street address"
              type="text"
              autoComplete="street-address"
              register={register("streetAddress")}
              errorMessage={errors.streetAddress?.message}
            />
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <Input
              label="City"
              type="text"
              autoComplete="address-level2"
              register={register("city")}
              errorMessage={errors.city?.message}
            />
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <Input
              label="State / Province"
              type="text"
              autoComplete="address-level1"
              register={register("region")}
              errorMessage={errors.region?.message}
            />
          </div>

          <div className="sm:col-span-2">
            <Input
              label="Postal code"
              type="text"
              autoComplete="postal-code"
              register={register("postalCode")}
              errorMessage={errors.postalCode?.message}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
