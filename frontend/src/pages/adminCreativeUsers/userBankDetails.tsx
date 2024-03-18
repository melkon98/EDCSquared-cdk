import Input from 'components/ui/input';
import Modal from 'components/authentication/modal';
import Select from 'components/ui/select';
import useZodForm from 'hooks/useZodForm';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { withSaveBrief } from 'state/brandBrief';
import { AdminRoutes } from 'utils';
import { z } from 'zod';
import init from 'zod-empty';
import _ from 'lodash';
import { UpdateUserPayment } from 'hooks';
import CountryList from 'utils/constants/ISOCodeCountry';
import { Storage } from 'aws-amplify';
import { UpdateUserPaymentDetailsInput } from 'API';

const schema = z.object({
  id: z.string().optional(),
  accountNumber: z.string().nonempty(),
  country: z.string().nonempty(),
  documentID: z.string(),
  firstAddress: z.string().nonempty(),
  fullName: z.string().nonempty(),
  secondAddress: z.string().nonempty(),
  swiftCode: z.string(),
});

const defaultValues = {
  ...init(schema),
  active: true,
};

type Props = {
  bankDetails: {
    id: string;
    accountNumber: string;
    country: string;
    createdAt: string;
    documentID: string;
    firstAddress: string;
    fullName: string;
    secondAddress: string;
    swiftCode: string;
  };
  userId: string;
};
export const UserBankDetails: FC<Props> = ({ bankDetails, userId }) => {
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
  const { updatePayment } = UpdateUserPayment();
  const [imageForShow, setImageForShow] = useState('');

  const getDocumentImg = async () => {
    try {
      const url = await Storage.get(`Document/${userId}`);
      fetch(url).then((res) => {
        if (res.status === 200) {
          setImageForShow(url);
        }
      });
    } catch (err) {
      console.log('Error', err);
    }
  };
  useEffect(() => {
    if (bankDetails) {
      reset({
        ...bankDetails,
      });
    }
  }, [bankDetails, reset]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await updatePayment({
      variables: { input: { ...data as UpdateUserPaymentDetailsInput } },
    })
      .then(() => {
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  const CountryOptions = useMemo(
    () =>
      CountryList.map(({ name: text, code: value, ...rest }) => ({
        text,
        value,
        ...rest,
      })),
    [CountryList]
  );

  useEffect(() => {
    if (userId) getDocumentImg();
  }, [userId]);
  return (
    <div>
      <h2 className="text-[#0E0D0D] uppercase head-text text-[16px] font-[700] pl-6 m-0">
        Admin - User's Bank Details
      </h2>
      <div>
        <form onSubmit={onSubmit}>
          <div className="grid xl:grid-cols-1 p-6 xl:gap-8">
            <div className="xl:col-span-1 col-span-3">
              <Input
                required
                name="fullName"
                label="Full Name"
                register={register}
                className="mb-5"
                errors={errors}
              />
              <Input
                required
                name="firstAddress"
                label="First Address"
                register={register}
                className="mb-5"
                errors={errors}
              />
              <Input
                required
                name="secondAddress"
                label="Second Address"
                register={register}
                className="mb-5"
                errors={errors}
              />
              <Select
                required
                name="country"
                label="Country *"
                placeholder="Select a country"
                options={CountryOptions}
                control={control}
                errors={errors}
              />
              <Input
                required
                name="accountNumber"
                label="Account Number"
                register={register}
                errors={errors}
              />
              <Input
                name="swiftCode"
                label="Swift / BIC code"
                register={register}
                className="mb-5"
                errors={errors}
              />
              <Input
                name="documentID"
                label="If business beneficiary invoice / document ID"
                register={register}
                className="mb-5"
                errors={errors}
              />

              {imageForShow && (
                <>
                  <label className="profile-label md:text-[16px] text-[13px] flex justify-between">ID / Passport</label>
                  <img
                    className="md:w-[50%] w-full h-[200px] rounded-[10px] object-cover"
                    src={imageForShow}
                  />
                  <div className="flex justify-between items-center mt-5">
                    <a href={imageForShow} download className="creator-button">
                      <svg
                        className="fill-current w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                      </svg>
                      <span className="text-[15px]">Download Document</span>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="grid xl:grid-cols-2 grid-cols-1"></div>
          <div className="xl:hidden w-full px-6 pb-6"></div>
          <div
            className="
          flex sm:flex-row w-full sm:justify-center
          font-sans text-base text-white font-bold flex-col-reverse gap-4 items-center px-6"
          >
            <Link to={AdminRoutes.Creators}>
              <button className="creator-button bg-[#F1EBDF]">CANCEL</button>
            </Link>
            <button
              type="submit"
              className="creator-button disabled:bg-[#a8a8a8]"
              disabled={!isValid || !isDirty}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <Modal
        content="Great, user's bank details has been saved!"
        isOpen={showModal}
        type="brand"
        handleClose={() => navigate(AdminRoutes.Creators)}
        actionLabel="Back To Creator users"
        actionHandler={() => navigate(AdminRoutes.Creators)}
      />
    </div>
  );
};

export default withSaveBrief(UserBankDetails);
