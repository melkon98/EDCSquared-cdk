import { BrandBrief, CreateBrandBriefInput } from 'API';
import Modal from 'components/authentication/modal';
import { verticalOptions } from 'hooks/utils';
import Input from 'components/ui/input';
import Label from 'components/ui/label';
import Select from 'components/ui/select';
import Routes from 'components/ui/switch';
import TextArea from 'components/ui/textArea';
import { UpdateBriendBrief } from 'hooks/query/useAdminActions';
import useZodForm from 'hooks/useZodForm';
import _ from 'lodash';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  SaveBriefProps,
  withSaveBrief,
} from 'state/brandBrief';
import { AdminRoutes } from 'utils';
import { z } from 'zod';
import init from 'zod-empty';

const schema = z.object({
  id: z.string().optional(),
  BriefName: z.string().nonempty(),
  vertical: z.string().nonempty(),
  objective: z.string().nonempty(),
  adText: z.string().nonempty(),
  brandBriefDetails: z.string().nonempty(),
  creativeInspirations: z.string().array(),
  active: z.boolean(),
});

const defaultValues = {
  ...init(schema),
  active: true,
};

type Props = {
  brief: BrandBrief;
};
export const EditBrief: FC<Props & SaveBriefProps> = ({ brief }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useZodForm({
    schema,
    defaultValues,
    mode: 'all',
  });
  const { updateBrief } = UpdateBriendBrief();
  useEffect(() => {
    if (brief) {
      reset({
        ...brief,
      });
    }
  }, [brief, reset]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    await updateBrief({ variables: { input: data } })
      .then(() => {
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  return (
    <div>
      <h2 className="text-[#0E0D0D] uppercase head-text text-[16px] font-[700] pl-6 m-0">
        Admin - Edit Brand Activations
      </h2>
      <div>
        <form onSubmit={onSubmit}>
          <div className="grid xl:grid-cols-2 p-6 xl:gap-8">
            <div className="xl:col-span-1 col-span-3">
              <Input
                required
                placeholder="Give your brief a name"
                name="BriefName"
                label="Activation Name"
                register={register}
                className="mb-5"
                errors={errors}
              />
              <Select
                required
                name="vertical"
                label="Vertical"
                placeholder="Select a vertical"
                options={verticalOptions}
                control={control}
                errors={errors}
              />
              <Input
                required
                name="objective"
                register={register}
                errors={errors}
              />
              <Routes name="active" control={control} required />
            </div>
            <div className="xl:col-span-1 col-span-3 bg-[#f9fbfd] border-[#005F730D] border-[1px] p-4 rounded-lg mt-[30px]">
              <Label name="Creative inspiration" />
              {_.times(4).map((index) => (
                <Input
                  key={index}
                  name={`creativeInspirations.${index}`}
                  className={`${index === 0 ? 'm-0' : 'mt-12'}`}
                  placeholder="https://www.tiktok.com/@user/video/id"
                  inputClassName="bg-white"
                  label=""
                  register={register}
                  errors={errors}
                />
              ))}
            </div>
          </div>
          <div className="grid xl:grid-cols-2 grid-cols-1">
            <TextArea
              required
              className="pb-6 px-6"
              rows={9}
              name="brandBriefDetails"
              label="Activation details"
              placeholder="Decsribe your brief in more detail..."
              register={register}
              errors={errors}
            />
            <TextArea
              required
              className="pb-6 px-6"
              rows={9}
              name="adText"
              label="Ad text / Caption"
              placeholder="Decsribe your brief in more detail..."
              register={register}
              errors={errors}
            />
          </div>
          <div className="xl:hidden w-full px-6 pb-6"></div>
          <div
            className="
          flex sm:flex-row w-full sm:justify-center
          font-sans text-base text-white font-bold flex-col-reverse gap-4 items-center px-6"
          >
            <Link to={AdminRoutes.BrandBriefs}>
              <button className="creator-button bg-[#F1EBDF]">CANCEL</button>
            </Link>
            <button
              type="submit"
              className="creator-button disabled:bg-[#a8a8a8]"
              disabled={!isValid || !isDirty}
            >
              SAVE ACTIVATION
            </button>
          </div>
        </form>
      </div>
      <Modal
        content="Great, Activation has been saved!"
        isOpen={showModal}
        type="brand"
        handleClose={() => navigate(AdminRoutes.BrandBriefs)}
        actionLabel="Back To Brand Activations"
        actionHandler={() => navigate(AdminRoutes.BrandBriefs)}
      />
    </div>
  );
};

export default withSaveBrief(EditBrief);
