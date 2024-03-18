import { UserProfile } from 'API';
import GradientCard from 'components/gradientCard/gradientCard';
import PaymentCard from 'components/paymentCard/paymentCard';
import WalletCard from 'components/walletCard/walletCard';
import { CreatePaymentProps, GetUserPaymentDetailProps } from 'hooks/utils';
import { useEffect, useMemo, useState } from 'react';
import PaymentDetailsModal from '../../components/paymentCard/PaymentDetailsModal';
import { UseGetCreativeEarnings } from '../../hooks';
import './wallet.css';

interface Props {
  data: UserProfile;
  loading?: CreatePaymentProps;
  getPayment?: GetUserPaymentDetailProps;
}

function Wallet({ data, loading }: Props) {
  const [isWalletDetailsDialogOpen, setIsWalletDetailsDialogOpen] =
    useState(false);
  const [lifetimeEarnings, setLifetimeEarnings] = useState(0);
  const [currentEarnings, setCurrentEarnings] = useState(0);
  const paymentDetails = useMemo(() => {
    return data.userPaymentDetails;
  }, [data.userPaymentDetails]);
  const {
    getEarnings,
    loading: earningsLoading,
    data: earningsData,
  } = UseGetCreativeEarnings();

  useEffect(() => {
    getEarnings({ variables: { creatorId: data.id } });
  }, []);

  useEffect(() => {
    if (!earningsData || earningsLoading) {
      return;
    }

    const parsed = JSON.parse(earningsData.getCreativeEarnings as string);
    const { current, lifetime } = parsed.items.reduce(
      (a, v) => ({
        current: a.current + v.currentEarnings,
        lifetime: a.lifetime + v.lifetimeEarnings,
      }),
      {
        current: 0,
        lifetime: 0,
      }
    );

    setLifetimeEarnings(lifetime);
    setCurrentEarnings(current);
  }, [earningsData, earningsLoading]);

  const onClose = () => {
    setIsWalletDetailsDialogOpen(false);
  };

  return (
    <>
      <div className="sm:grid flex grid-cols-4 lg:gap-[20px] gap-[10px] mb-[20px] w-full lg:overflow-x-visible overflow-x-auto overflow-y-hidden creator-dashboard p-0 lg:pb-0 pb-[4px]">
        <GradientCard>
          <WalletCard
            dueDateCheck={true}
            walletTitle="CURRENT MONTH EARNINGS"
            cost={`$${currentEarnings.toFixed(2)}`}
          />
        </GradientCard>

        <GradientCard>
          <WalletCard
            dueDateCheck={false}
            walletTitle="Total earned"
            cost={`$${lifetimeEarnings.toFixed(2)}`}
          />
        </GradientCard>

        <GradientCard>
          <WalletCard
            dueDateCheck={false}
            walletTitle="Active creatives"
            cost={'0'}
          />
        </GradientCard>

        <GradientCard>
          <WalletCard
            dueDateCheck={false}
            walletTitle="Payment details"
            cost={''}
          ></WalletCard>

          <div className="flex justify-center ">
            <button
              className="creator-button w-[30%]"
              onClick={() => setIsWalletDetailsDialogOpen(true)}
            >
              Update
            </button>
          </div>
        </GradientCard>
      </div>
      <div className="wallet-section">
        <PaymentCard transactions={paymentDetails?.userTransactions?.items} />

        <PaymentDetailsModal
          userId={data.id}
          onClose={onClose}
          paymentDetails={paymentDetails}
          isOpen={isWalletDetailsDialogOpen}
        />
      </div>
    </>
  );
}

export default Wallet;
