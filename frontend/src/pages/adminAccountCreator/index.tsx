import Button from 'components/ui/button';
import Input from 'components/ui/input';
import Select from 'components/ui/select';
import useSignup from 'hooks/auth/useSignUp';
import useZodForm from 'hooks/useZodForm';
import ErrorContext from 'state/error/error.context';
import { useContext } from 'react';
import { z } from 'zod';
import init from 'zod-empty';
import { USER_TYPES } from 'API';

const options = [
  { value: 'brand', text: 'Brand' },
  { value: 'creator', text: 'Creator' },
];

const schema = z.object({
  password: z.string().min(8),
  email: z
    .string()
    .nonempty('Please enter your email address')
    .email('Please enter the correct email address'),
  // password: z.string().nonempty("Please enter your password").min(8),
  name: z.string().nonempty('Please enter your full name'),
  role: z.enum(['brand', 'creator']),
  about: z.string(),
});

export default function AdminAccountCreator() {
  const { errorState } = useContext(ErrorContext);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useZodForm({
    schema,
    defaultValues: init(schema),
    mode: 'onBlur',
  });

  const { performAction } = useSignup();

  const onSubmit = handleSubmit((data) => {
    localStorage.setItem(
      'userType',
      data.role === 'creator' ? USER_TYPES.CREATIVE_USER : USER_TYPES.BRAND_USER
    );
    performAction(data);
  });

  return (
    <form className="flex flex-col paper" onSubmit={onSubmit}>
      <h1 className="text-xl font-bold mb-4">Add new user</h1>
      <Input
        placeholder="Full Name"
        name="name"
        register={register}
        errors={errors}
      />
      <Input
        placeholder="Email Address"
        name="email"
        register={register}
        errors={errors}
      />
      <Select
        options={options}
        name="role"
        placeholder="Who are you?"
        className="mb-4"
        control={control}
      />
      <Input
        placeholder="Initial password"
        type="password"
        name="password"
        register={register}
        errors={errors}
      />
      <Button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
        Add user
      </Button>
      {errorState.map((error, index) => (
        <div key={index} className="text-danger my-4 text-center">
          <h1 className="text-lg font-bold">{error.title}</h1>
          {error.message}
        </div>
      ))}
    </form>
  );
}
