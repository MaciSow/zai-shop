import { Input } from '@/components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const newsletterFormSchema = yup.object({
  email: yup.string().email("This isn't email format").required('Email is required'),
});

type NewsletterData = yup.InferType<typeof newsletterFormSchema>;

export default function Home() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<NewsletterData>({
    resolver: yupResolver(newsletterFormSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await fetch('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="sm:col-span-4">
        <Input
          label="Email"
          autoComplete="email"
          register={register('email')}
          errorMessage={errors.email?.message}
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sent
      </button>
    </form>
  );
}
