import { UserPaymentDetails } from 'API';
import { Storage } from 'aws-amplify';
import Modal from 'components/authentication/modal';
import { IconLoader } from 'components/loader';
import ShouldRender from 'components/shouldRender';
import { createUserPayment, UpdateUserPayment } from 'hooks';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import {
  validatePaymentForm,
  validatePaymentFormAccountNumber,
  validatePaymentFormAddress,
  validatePaymentFormDocumentId,
  validatePaymentFormFullName,
  validatePaymentFormSwiftCode,
  validatePostCode,
} from 'state/auth';
import { IPayment, IPaymentError } from 'state/payment';
import { IProfileImageUpload, ProfileContext } from 'state/profileSteps';
import { defultPaymentError, defultPaymentState, UnknownType } from 'utils';
import CountryList from 'utils/constants/ISOCodeCountry';
import './paymentCard.css';

type PaymentDetailsProps = {
  paymentData?: UserPaymentDetails | null;
  userId?: string | null;
};

const PaymentDetails: FC<PaymentDetailsProps> = ({ paymentData, userId }) => {
  const [formState, setFormState] = useState<IPayment>(defultPaymentState);
  const [formError, setFormError] = useState<IPaymentError>(defultPaymentError);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [documentImg, setDocumentImg] = useState<IProfileImageUpload>({});
  const [type, setType] = useState<boolean>(false);
  const { setProfileState, succModal, setSuccModal } =
    useContext(ProfileContext);

  const { createPayment } = createUserPayment();

  const { updatePayment } = UpdateUserPayment();
  const [imageForShow, setImageForShow] = useState('');

  const getDocumentImg = async () => {
    try {
      const url = await Storage.get(`Document/${userId}`);
      fetch(url).then((res) => {
        if (res.status === 200) setImageForShow(url);
      });
    } catch (err) {
      console.log('Error', err);
    }
  };

  const validateProfileForm = useCallback((): boolean => {
    const fullName = validatePaymentFormFullName(
      formState.fullName,
      'Full Name'
    );
    const firstAddress = validatePaymentFormAddress(
      formState.firstAddress,
      'First Address'
    );
    const secondAddress = validatePaymentFormAddress(
      formState.secondAddress,
      'Second Address'
    );
    const postCode = validatePostCode(formState.postCode);
    const swiftCode = validatePaymentFormSwiftCode(formState.swiftCode);
    const country = validatePaymentForm(formState.country, 'Country');
    const documentID = type
      ? validatePaymentFormDocumentId(formState.documentID, 'Document ID')
      : '';
    const accountNumber = validatePaymentFormAccountNumber(
      formState.accountNumber
    );
    if (
      fullName ||
      firstAddress ||
      secondAddress ||
      swiftCode ||
      postCode ||
      country ||
      accountNumber ||
      documentID
    ) {
      setFormError({
        fullName,
        firstAddress,
        secondAddress,
        swiftCode,
        country,
        postCode,
        accountNumber,
        documentID,
      });
      return false;
    }
    return true;
  }, [formState, type]);

  const handleSubmit = useCallback(async () => {
    if (!userId) return;

    if (validateProfileForm()) {
      if (!documentImg.file) {
        setDocumentImg({ error: 'Document image is absent' });
      }
      setIsLoading(true);

      try {
        if (paymentData) {
          if (documentImg.file)
            await Storage.put(`Document/${userId}`, documentImg.file);
          const { data: updateRes } = await updatePayment({
            variables: {
              input: {
                ...formState,
                id: userId,
              },
            },
          });
          const paymentUpdatedData = updateRes?.updateUserPaymentDetails;
          setProfileState((prev) => {
            if (!prev.data) return { isLoading: false };

            return {
              ...prev,
              data: {
                ...prev.data,
                userPaymentDetails: paymentUpdatedData,
              },
            };
          });
        } else {
          const { data: updateRes } = await createPayment({
            variables: {
              input: {
                ...formState,
                id: userId,
              },
            },
          });
          const paymentCreatedData = updateRes?.createUserPaymentDetails;
          setProfileState((prev) => {
            if (!prev.data) return { isLoading: false };

            return {
              ...prev,
              data: {
                ...prev.data,
                userPaymentDetails: paymentCreatedData,
              },
            };
          });
        }

        setSuccModal(true);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [
    formState,
    validateProfileForm,
    userId,
    updatePayment,
    setProfileState,
    setSuccModal,
    createPayment,
    paymentData,
    documentImg,
  ]);
  const handleChange = (e: UnknownType) => {
    if (e.target.files[0].size > 2000000) {
      setDocumentImg(() => {
        return {
          error: 'Support for a single or bulk upload. Maximum file size 2MB',
        };
      });
    } else {
      setImageForShow(URL.createObjectURL(e.target.files[0]));
      setDocumentImg(() => {
        return { file: e.target.files[0] };
      });
    }
  };
  const updateState = (key: string, value: string): void => {
    setFormError((prev) => ({ ...prev, [key]: null }));
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (paymentData) {
      getDocumentImg();
      const {
        fullName,
        firstAddress,
        secondAddress,
        swiftCode,
        country,
        documentID,
        accountNumber,
        postCode,
      } = paymentData;
      if (documentID) {
        setType(true);
      }
      setFormState({
        fullName: fullName || '',
        firstAddress: firstAddress || '',
        secondAddress: secondAddress || '',
        swiftCode: swiftCode || '',
        country: country || '',
        documentID: documentID || '',
        postCode: postCode || '',
        accountNumber: accountNumber || '',
      });
    }
  }, [paymentData]);

  return (
    <div className="brand-dashboard__item creator-dashboard-full pb-0 border border-[#F5F1E8] rounded-[16px] ">
      <div className="">
        <div className="text-[#0E0D0D] uppercase head-text text-[16px] font-[700] ml-[24px]">
          Payment / Bank details
        </div>
      </div>
      <div className="brand-dashboard__profile-inputs mt-[10px]">
        <div className="brand-dashboard__profile-group">
          <div className="brand-dashboard__profile-label">Full Name</div>
          <input
            className="brand-dashboard__profile-input"
            type="text"
            maxLength={35}
            value={formState.fullName}
            onChange={(e): void => updateState('fullName', e.target.value)}
          />
          <ShouldRender if={formError.fullName}>
            <p className="error-text mb-0 text-right">{formError.fullName}</p>
          </ShouldRender>
        </div>
        <div className="brand-dashboard__profile-group">
          <div className="brand-dashboard__profile-label">
            First line of address
          </div>
          <input
            className="brand-dashboard__profile-input"
            type="text"
            value={formState.firstAddress}
            maxLength={35}
            onChange={(e): void => updateState('firstAddress', e.target.value)}
          />
          <ShouldRender if={formError.firstAddress}>
            <p className="error-text mb-0 text-right">
              {formError.firstAddress}
            </p>
          </ShouldRender>
        </div>
        <div className="brand-dashboard__profile-group">
          <div className="brand-dashboard__profile-label">
            Second line of address
          </div>
          <input
            className="brand-dashboard__profile-input"
            type="text"
            value={formState.secondAddress}
            maxLength={35}
            onChange={(e): void => updateState('secondAddress', e.target.value)}
          />
          <ShouldRender if={formError.secondAddress}>
            <p className="error-text mb-0 text-right">
              {formError.secondAddress}
            </p>
          </ShouldRender>
        </div>
        <div className="brand-dashboard__profile-group">
          <div className="brand-dashboard__profile-label">Country</div>
          <select
            className="create-brief-input select-input bg-[#f9fbfd] w-full h-[66px] px-[32px] py-[22px] text-[#3d636b94]"
            value={formState.country}
            onChange={(e): void => updateState('country', e.target.value)}
          >
            <option hidden></option>
            {CountryList.map((item, index) => {
              return (
                <option value={item.code} key={index}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <ShouldRender if={formError.country}>
            <p className="error-text mb-0 text-right">{formError.country}</p>
          </ShouldRender>
        </div>
        <div className="brand-dashboard__profile-group">
          <div className="brand-dashboard__profile-label">ID / Passport</div>
          <div className="field-label-container">
            <label
              htmlFor="profile-file-input"
              className={`upload-button ${
                imageForShow ? 'border-transparent bg-white' : ''
              }`}
            >
              {imageForShow ? (
                <img
                  className="lg:w-full sm:w-[50%] w-full h-[200px] rounded-[10px] object-cover"
                  src={imageForShow}
                />
              ) : (
                <div className="upload-button">
                  <img className="upload mt-[16px]" src="/images/upload.png" />
                  <p className="text-[#212529] font-[400] text-[16px] text-center">
                    Click or drag file to this area to upload
                  </p>

                  <p className="text-[#6C757D] font-[400] text-[14px] sm:w-[280px] w-100% text-center mb-[16px]">
                    Support for a single or bulk upload. Maximum file size 2MB.
                  </p>
                </div>
              )}
            </label>
            <input
              type="file"
              accept=".png, .jpg"
              id="profile-file-input"
              className="d-none"
              onChange={handleChange}
              multiple
            />
          </div>
          <ShouldRender if={documentImg.error}>
            <span className="text-[12px] text-red-600 font-[400]">
              {documentImg.error}
            </span>
          </ShouldRender>
        </div>
        <div className="brand-dashboard__profile-group">
          <div className="brand-dashboard__profile-label">Account number</div>
          <input
            className="brand-dashboard__profile-input"
            type="text"
            value={formState.accountNumber}
            maxLength={22}
            onChange={(e): void => updateState('accountNumber', e.target.value)}
          />
          <ShouldRender if={formError.accountNumber}>
            <p className="error-text mb-0 text-right">
              {formError.accountNumber}
            </p>
          </ShouldRender>
        </div>
        <div className="brand-dashboard__profile-group">
          <div className="brand-dashboard__profile-label">Swift / BIC code</div>
          <input
            className="brand-dashboard__profile-input"
            type="text"
            value={formState.swiftCode}
            maxLength={11}
            onChange={(e): void => updateState('swiftCode', e.target.value)}
          />
          <ShouldRender if={formError.swiftCode}>
            <p className="error-text mb-0 text-right">{formError.swiftCode}</p>
          </ShouldRender>
        </div>
        {type && (
          <>
            {' '}
            <div className="brand-dashboard__profile-group">
              <div className="brand-dashboard__profile-label">
                If business beneficiary invoice / document ID{' '}
              </div>
              <input
                className="brand-dashboard__profile-input"
                type="text"
                maxLength={35}
                value={formState.documentID}
                onChange={(e): void =>
                  updateState('documentID', e.target.value)
                }
              />
            </div>
            <ShouldRender if={formError.documentID}>
              <p className="error-text mb-0 text-right">
                {formError.documentID}
              </p>
            </ShouldRender>
          </>
        )}

        <div className="flex justify-start">
          <div className="flex items-center">
            <input
              type="radio"
              id="individual"
              name="fav_language"
              checked={!type}
              onChange={() => setType(!type)}
            />
            <label htmlFor="individual" className="px-1 pt-[1px] mr-5">
              Individual
            </label>
          </div>
          <div className="flex items-center">
            <input
              checked={type}
              type="radio"
              id="buissnes"
              name="fav_language"
              onChange={() => setType(!type)}
            />
            <label htmlFor="buissnes" className="px-1 pt-[1px]">
              Business
            </label>
          </div>
        </div>

        <button
          className="creator-button w-[100px] m-auto my-[28px]"
          onClick={handleSubmit}
        >
          {isLoading ? <IconLoader color="#005f73" /> : <span>Save</span>}
        </button>
      </div>
      <Modal
        isOpen={succModal}
        handleClose={() => setSuccModal(false)}
        type="brand"
        content="Your payment details have been successfully saved"
      />
    </div>
  );
};

export default PaymentDetails;
