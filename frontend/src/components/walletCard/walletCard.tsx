import './walletCard.css';

interface Props {
  dueDateCheck: boolean;
  walletTitle: string;
  cost: string;
}

export default function WalletCard({ dueDateCheck, walletTitle, cost }: Props) {
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ] as const;
  const d = new Date();
  let monthName = '';
  const getMonth = () => {
    
    return d.getMonth()+1===12 ? 0 : d.getMonth()+1
  }
  
  monthName = month[getMonth()] || 'January';
  const day = 1;
  // if (d.getDate() <= 15) {
  //   day = 15;
  //   monthName = month[d.getMonth()] || 'Invalid month';
  // } else {
  //   day = 1;
  //   monthName = month[(d.getMonth() + 1) % 13] || 'Invalid month';
  // }

  return (
    <div className='lg:w-full md:w-[260px] w-[200px]'>
      <div className="creator-dashboard__item-block-key shrink-mobile mb-[10px] head-text text-black opacity-50 font-[700] uppercase">{walletTitle}</div>
   
      <div className="creator-dashboard__item-block-value my-0 font-[500] text-[33px] text-black">{cost}  {dueDateCheck && (
        <span className="wallet-due-date text-[#000] md:contents hidden">
          Next payment processing date is {monthName} {day}.
        </span>
      )}</div>
         {dueDateCheck && (
        <div className="wallet-due-date text-[#000] md:hidden block">
          Next payment processing date is {monthName} {day}.
        </div>
      )}
    </div>
  );
}
