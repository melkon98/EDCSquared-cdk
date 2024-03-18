import Label from 'components/ui/label';
import Modal from 'components/ui/modal';
import { format, parse, parseISO } from 'date-fns';
import {
  LONG_DATE_FORMAT,
  MONTH_OPTIONS,
  NORMAL_DATE_FORMAT,
} from 'hooks/utils/constants';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { z } from 'zod';
import {
  AddCreativeEarningMutationVariables,
  CreativeRequestEarnings,
} from '../../API';
import Input from '../../components/ui/input';
import Select from '../../components/ui/select';
import Spinner from '../../components/ui/spinner';
import {
  UseAddCreativeEarning,
  UseGetCreativeEarningsByCreativeId,
} from '../../hooks';
import useZodForm from '../../hooks/useZodForm';
import { ceilToNearestDecimal, getISODate } from '../../utils/utils';

const object = z.object({
  amount: z.number().positive().lte(10000),
  fromDate: z.string(),
  toDate: z.string(),
  month: z.string(),
});

interface Props {
  onClose: () => void;
  userProfileId: string;
  getCreativeEarnings?: () => void;
  earning: CreativeRequestEarnings | null;
  updateCreativeRequestStatus?: (newStatus: string, comment?: string) => void;
}

const addEarningsModal: React.FC<Props> = ({
  onClose,
  userProfileId,
  getCreativeEarnings,
  earning,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [creativeEarnings, setCreativeEarnings] = useState<
    CreativeRequestEarnings[]
  >([]);

  const { addEarning, loading, data: earningData } = UseAddCreativeEarning();
  const {
    getEarningsByCreative,
    data: creativeEarningsItems,
    loading: earningLoading,
  } = UseGetCreativeEarningsByCreativeId();
  const [fromDate, setFromDate] = useState(new Date().toDateString());
  const [toDate, setToDate] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useZodForm({
    schema: object,
    defaultValues: {
      amount: 0,
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      month: MONTH_OPTIONS[0]?.value || '',
    },
  });

  const getEarnings = async () => {
    setIsLoading(true);
    await getEarningsByCreative({
      variables: { creativeRequestId: earning?.creativeRequestId || '' },
    });
  };

  useEffect(() => {
    getEarnings();
  }, []);

  useEffect(() => {
    if (!creativeEarningsItems) {
      return;
    }
    const items = JSON.parse(
      creativeEarningsItems.getCreativeEarningsByCreative || ''
    );
    setCreativeEarnings(items);
    setIsLoading(false);
  }, [creativeEarningsItems]);

  useEffect(() => {
    onReset();
  }, [earningData]);

  const onReset = async () => {
    setIsLoading(true);
    setFromDate('');
    setToDate('');
    reset();
    setIsLoading(false);
  };

  const onSubmit = async (data: AddCreativeEarningMutationVariables) => {
    const item = {
      creativeRequestId: earning?.creativeRequestId || '',
      fromDate: getISODate(fromDate),
      toDate: getISODate(toDate),
      amount: Number((Number(data.amount) * 0.1).toFixed(2)),
      month: format(parse(data.month, 'LLL', new Date()), 'yyyy-MM-dd'),
    } as CreativeRequestEarnings;

    setCreativeEarnings((prev) => [item, ...prev]);
    await addEarning({
      variables: { ...item, userProfileId },
    });

    window.location.reload();
  };

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const formatDate = (date: string, dateFormat = NORMAL_DATE_FORMAT) => {
    try {
      const parsed = parseISO(date);
      return format(parsed, dateFormat);
    } catch (e) {
      return date;
    }
  };

  return (
    <Modal
      modalWidth="min-w-[700px]"
      title={`CREATIVE ${earning?.creativeUniqueId}`}
      isOpen={true}
      handleClose={() => onClose()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="brand-dashboard__profile-group mt-5 flex gap-x-2 gap-y-2 align-items-stretch">
          <Input
            type="number"
            errors={errors}
            name="amount"
            step="0.01"
            label="Earnings"
            placeholder="Add Earnings"
            register={register}
          />

          <div className="flex-col">
            <Label name="From Date"></Label>
            <DatePicker
              name="fromDate"
              className="profile-input"
              value={fromDate}
              onChange={(date) =>
                date && setFromDate(format(date, LONG_DATE_FORMAT))
              }
            />
          </div>

          <div>
            <Label name="To Date"></Label>
            <DatePicker
              name="toDate"
              className="profile-input"
              value={toDate}
              onChange={(date) =>
                date && setToDate(() => format(date, LONG_DATE_FORMAT))
              }
            />
          </div>

          <div className="h-auto max-h-[25px] min-w-[25%]">
            <Select
              className="min-w-[100%]"
              required={true}
              name="month"
              options={MONTH_OPTIONS}
              control={control}
              label="Month"
            />
          </div>
        </div>

        <div>
          <div className="flex flex-column row-gap-3 max-h-[100px] overflow-y-auto overflow-x-hidden min-h-[70px] p-2">
            {!earningLoading ? (
              creativeEarnings.filter(e => e.amount !== 0).map((e, i) => {
                return (
                  <div className="border-b-2 p-1 border-slate-100" key={i}>
                    <h3>
                      <b>${ceilToNearestDecimal(e.amount)}</b> From{' '}
                      {formatDate(e.fromDate)}
                      &#32;
                      {formatDate(e.toDate)} Added {formatDate(e.updatedAt)}
                    </h3>
                  </div>
                );
              })
            ) : (
              <div className="z-[99999]">
                <Spinner className="w-8 h-8 mb-4" />
              </div>
            )}
          </div>
        </div>

        <div
          className="
          flex sm:flex-row w-full sm:justify-center
          font-sans text-base text-white font-bold flex-col-reverse gap-4 items-center px-6"
        >
          <div>
            <button
              type="button"
              onClick={onClose}
              className="creator-button bg-[#F1EBDF] font-[500] text-[14px] text-black"
            >
              CANCEL
            </button>
          </div>

          <button type="submit" className="creator-button bg-black">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default addEarningsModal;
