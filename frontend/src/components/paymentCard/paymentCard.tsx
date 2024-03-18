import './paymentCard.css';
import { FC, useState } from 'react';
import { withPayment } from 'state/payment';
import { TransactionStatus, UnknownType } from 'utils';

export type PaymentCardProps = {
  paymentData?: UnknownType;
  profileState?: UnknownType;
  transactions?: UnknownType;
};

const PaymentCard: FC<PaymentCardProps> = ({
  transactions,
}) => {
  const tableLimit = 7;
  const [currentPage, setCurrentPage] = useState(0);
  
  const handleClick = (e: UnknownType) => {
    if (e.target.classList.contains('brand-dashboard__list-mobile-wrap')) {
      e.target.classList.toggle('opened');
    } else {
      if (
        e.target.parentElement.classList.contains(
          'brand-dashboard__list-mobile-wrap'
        )
      ) {
        e.target.parentElement.classList.toggle('opened');
      } else {
        e.target.parentElement.parentElement.classList.toggle('opened');
      }
    }
  };

  const getDate = (date) => {    
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()
    
    if(day===1){
      return `01/${month<10 ? '0' + month : month}/${year}-15/${month<10 ? '0' + month : month}/${year}`
    }
    else{
      return `15/${month<10 ? '0' + month : month}/${year}-01/${month+1<10 ? '0' + (month+1) : month+1==13 ? '01' : month+1}/${month===12 ? year+1 : year}`
    }
  };

  return (
    <div className="brand-dashboard__item full mobile-list-item creator-dashboard-full h-fit border border-[#F5F1E8] rounded-[16px] bg-white py-[23px]">
      <div className="brand-dashboard__top mobile-main-title px-0">
        <div className="text-[#0E0D0D] uppercase head-text text-[16px] font-[700] ml-[24px]">Payment history</div>
       
        {/* <img
          className="brand-dashboard__top-icon-mobile"
          alt=""
          src="/images/dots-orange.svg"
        /> */}
      </div>
      <div className="brand-dashboard__list-mobile px-0 pb-0">
        {transactions?.length ?
          transactions?.map((e, i) => {
            let statusColor = '';
            switch (e?.status) {
              case TransactionStatus.Approved:
                statusColor = 'green';
                break;
              case TransactionStatus.Pending:
                statusColor = 'yellow';
                break;
              case TransactionStatus.Rejected:
                statusColor = 'red';
                break;
            }
            return (
              <div
                onClick={handleClick}
                key={`${e?.id}--${i}--mobile`}
                className="brand-dashboard__list-mobile-wrap "
              >
                <div className="brand-dashboard__list-mobile-item px-[24px]">
                  <span>{getDate(e?.createdAt)}</span>
                  <img alt="" src="/images/arrow-down-orange.svg" />
                </div>
                <div className="brand-dashboard__list-mobile-info">
                  <div className="brand-dashboard__list-mobile-table pl-[24px]">
                    <div className="brand-dashboard__list-mobile-keys">
                      <div className="brand-dashboard__list-mobile-key">
                        Payment amount
                      </div>
                      <div className="brand-dashboard__list-mobile-key">
                        Status
                      </div>
                    </div>
                    <div className="brand-dashboard__list-mobile-values">
                      <div className="brand-dashboard__list-mobile-value">
                        <div className="brand-dashboard__list-mobile-content">
                          ${e?.paymentAmount}
                        </div>
                      </div>
                      <div
                        className={`brand-dashboard__list-mobile-value ${statusColor}
                        brand-dashboard__list-mobile-status`}
                      >
                        <div className="brand-dashboard__list-mobile-content">
                          <span>{e?.paymentStatus}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }) : <div className='text-center'>no data</div>}
      </div>
      <div className=' mt-[16px] overflow-hidden'>
      <table className="creator-dashboard__list history-list">
        <thead>
          <tr>
            <th className='pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase'>Date</th>
            <th className='pt-[9px] pb-[20px] pr-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase'>Payment amount</th>
            <th className='pt-[9px] pb-[20px] pr-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase'>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.length ? (
            transactions?.map((e, index) => {
              let statusColor = '';
              switch (e?.paymentStatus) {
                case 'Approved':
                  statusColor = 'green';
                  break;
                case 'Pending':
                  statusColor = 'yellow';
                  break;
                case 'Rejected':
                  statusColor = 'red';
                  break;
              }
              return (
                <tr key={`${e?.id}-brandBrief--${index}`}>
                  <td className="brand-dashboard__list-name">
                    <div className="brand-dashboard__list-content">
                      {getDate(e?.createdAt)}
                    </div>
                  </td>
                  <td className="brand-dashboard__list-name">
                    <div className="brand-dashboard__list-content">
                      ${e.paymentAmount.toFixed(2)}
                    </div>
                  </td>
                  <td
                    className={`${statusColor} brand-dashboard__list-status text-left p-0`}
                  >
                    <div className="brand-dashboard__list-content">
                      <div className="brand-dashboard__list-dot"></div>
                      {e.paymentStatus}
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className='rounded-[30px]'><td colSpan={3} className="text-center py-5 rounded-[30px]"><p>No Data</p></td></tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default withPayment(PaymentCard);
