import { UserPaymentDetails } from 'API';
import { Storage } from 'aws-amplify';
import { useCallback, useContext, useEffect, useState } from 'react';
import { createUserPayment, UpdateUserPayment } from '../../hooks';
import {
  validatePaymentForm,
  validatePaymentFormAccountNumber,
  validatePaymentFormAddress,
  validatePaymentFormDocumentId,
  validatePaymentFormFullName,
  validatePaymentFormSwiftCode,
} from '../../state/auth';
import { IPayment, IPaymentError } from '../../state/payment';
import { IProfileImageUpload, ProfileContext } from '../../state/profileSteps';
import {
  defultPaymentError,
  defultPaymentState,
  UnknownType,
} from '../../utils';
import CountryList from '../../utils/constants/ISOCodeCountry';
import * as S from '../authentication/styles/auth.styled';
import { IconLoader } from '../loader';
import ShouldRender from '../shouldRender';

export interface PaymentDetailsProps {
  paymentDetails?: UserPaymentDetails | null;
  userId: string | null;
  onClose?: () => void;
  isOpen: boolean;
}
const PaymentDetailsModal = ({
  onClose,
  isOpen,
  userId,
  paymentDetails,
}: PaymentDetailsProps) => {
  const [formState, setFormState] = useState<IPayment>(defultPaymentState);
  const [formError, setFormError] = useState<IPaymentError>(defultPaymentError);
  const [imageForShow, setImageForShow] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [documentImg, setDocumentImg] = useState<IProfileImageUpload>({});
  const [type, setType] = useState<boolean>(false);
  const { setProfileState, succModal, setSuccModal } =
    useContext(ProfileContext);

  const { createPayment } = createUserPayment();
  const { updatePayment } = UpdateUserPayment();
  const updateState = (key: string, value: string): void => {
    setFormError((prev) => ({ ...prev, [key]: null }));
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

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
        if (paymentDetails) {
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
        onClose && onClose();
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
    paymentDetails,
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

  useEffect(() => {
    if (paymentDetails) {
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
      } = paymentDetails;
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
        accountNumber: accountNumber || '',
        postCode: postCode || '',
      });
    }
  }, [paymentDetails]);

  return (
    <>
      {isOpen && (
        <S.ModalOverlay className="z-[99999] overflow-y-auto items-start py-[20px]">
          <S.ModalContent
            className="flex flex-col p-2 gap-[20px]"
            $type="type"
            $withCheckBox={false}
          >
            <S.ModalTopBar className="mt-3 px-3 mr-0">
              <div className="w-full flex justify-between ">
                <h4 className="text-slate-800 text-base">Payment details</h4>
                <img src="/images/cross.svg" alt="close" onClick={onClose} />
              </div>
            </S.ModalTopBar>

            <div className="flex-column w-full p-4">
              <div className="brand-dashboard__profile-group">
                <div className="brand-dashboard__profile-label text-black text-left font-[400] text-[14px]">
                  Full Name
                </div>
                <input
                  className="brand-dashboard__profile-input h-[40px] py-0 pl-[20px] border-black rounded-[8px] text-black"
                  type="text"
                  maxLength={35}
                  value={formState.fullName}
                  onChange={(e): void =>
                    updateState('fullName', e.target.value)
                  }
                />
                <ShouldRender if={formError.fullName}>
                  <p className="error-text mb-0 text-right">
                    {formError.fullName}
                  </p>
                </ShouldRender>
              </div>

              <div className="brand-dashboard__profile-group">
                <div className="brand-dashboard__profile-label text-black text-left font-[400] text-[14px]">
                  First line of address
                </div>
                <input
                  className="brand-dashboard__profile-input h-[40px] py-0 pl-[20px] border-black rounded-[8px] text-black"
                  type="text"
                  value={formState.firstAddress}
                  maxLength={35}
                  onChange={(e): void =>
                    updateState('firstAddress', e.target.value)
                  }
                />
                <ShouldRender if={formError.firstAddress}>
                  <p className="error-text mb-0 text-right">
                    {formError.firstAddress}
                  </p>
                </ShouldRender>
              </div>
              <div className="brand-dashboard__profile-group">
                <div className="brand-dashboard__profile-label text-black text-left font-[400] text-[14px]">
                  Second line of address
                </div>

                <input
                  className="brand-dashboard__profile-input h-[40px] py-0 pl-[20px] border-black rounded-[8px] text-black"
                  type="text"
                  value={formState.secondAddress}
                  maxLength={35}
                  onChange={(e): void =>
                    updateState('secondAddress', e.target.value)
                  }
                />
                <ShouldRender if={formError.secondAddress}>
                  <p className="error-text mb-0 text-right">
                    {formError.secondAddress}
                  </p>
                </ShouldRender>
              </div>

              <div className="brand-dashboard__profile-group">
                <div className="brand-dashboard__profile-label text-black text-left font-[400] text-[14px]">
                  Post Code
                </div>

                <input
                  className="brand-dashboard__profile-input h-[40px] py-0 pl-[20px] border-black rounded-[8px] text-black"
                  type="text"
                  placeholder="Post Code"
                  value={formState.postCode}
                  maxLength={35}
                  onChange={(e): void =>
                    updateState('postCode', e.target.value)
                  }
                />
              </div>
              <div className="brand-dashboard__profile-group">
                <div className="brand-dashboard__profile-label text-black text-left font-[400] text-[14px]">
                  Country
                </div>
                <select
                  className=" bg-[#f9fbfd] w-full h-[40px] px-[20px] font-[400] text-[#000] border-black rounded-[8px]"
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
                  <p className="error-text mb-0 text-right">
                    {formError.country}
                  </p>
                </ShouldRender>
              </div>
              <div className="brand-dashboard__profile-group">
                <div className="brand-dashboard__profile-label text-black text-left font-[400] text-[14px]">
                  ID / Passport
                </div>
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
                        <img
                          className="upload mt-[16px]"
                          src="/images/upload.png"
                        />
                        <p className="text-[#212529] font-[400] text-[16px] text-center">
                          Click or drag file to this area to upload
                        </p>
                        <p className="text-[#6C757D] font-[400] text-[14px] sm:w-[280px] w-100% text-center mb-[16px]">
                          Support for a single or bulk upload. Maximum file size
                          2MB.
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
                <div className="brand-dashboard__profile-label text-black text-left font-[400] text-[14px]">
                  Account number
                </div>
                <input
                  className="brand-dashboard__profile-input h-[40px] py-0 pl-[20px] border-black rounded-[8px]"
                  type="text"
                  value={formState.accountNumber}
                  maxLength={22}
                  onChange={(e): void =>
                    updateState('accountNumber', e.target.value)
                  }
                />
                <ShouldRender if={formError.accountNumber}>
                  <p className="error-text mb-0 text-right">
                    {formError.accountNumber}
                  </p>
                </ShouldRender>
              </div>
              <div className="brand-dashboard__profile-group">
                <div className="brand-dashboard__profile-label text-black text-left font-[400] text-[14px]">
                  Swift / BIC code
                </div>
                <input
                  className="brand-dashboard__profile-input h-[40px] py-0 pl-[20px] border-black rounded-[8px]"
                  type="text"
                  value={formState.swiftCode}
                  maxLength={11}
                  onChange={(e): void =>
                    updateState('swiftCode', e.target.value)
                  }
                />
                <ShouldRender if={formError.swiftCode}>
                  <p className="error-text mb-0 text-right">
                    {formError.swiftCode}
                  </p>
                </ShouldRender>
              </div>
              {type && (
                <>
                  {' '}
                  <div className="brand-dashboard__profile-group">
                    <div className="brand-dashboard__profile-label text-black text-left font-[400] text-[14px]">
                      If business beneficiary invoice / document ID{' '}
                    </div>
                    <input
                      className="brand-dashboard__profile-input h-[40px] py-0 pl-[20px] border-black rounded-[8px]"
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
                  <label
                    htmlFor="individual"
                    className="px-1 pt-[1px] mr-5 text-[15px] text-black font-[500]"
                  >
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
                  <label
                    htmlFor="business"
                    className="px-1 pt-[1px] text-[15px] text-black font-[500]"
                  >
                    Business
                  </label>
                </div>
              </div>

              <button
                className="creator-button w-[100px] h-[40px] text-[16px] bg-black m-auto my-[10px]"
                onClick={handleSubmit}
              >
                {isLoading ? <IconLoader color="#005f73" /> : <span>Save</span>}
              </button>
            </div>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </>
  );
};

export default PaymentDetailsModal;
