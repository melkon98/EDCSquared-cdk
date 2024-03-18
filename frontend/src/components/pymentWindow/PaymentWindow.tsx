import { UserPaymentDetails, UserTransactions } from 'API';
import Modal from 'components/authentication/modal';
import { IconLoader } from 'components/loader';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router-dom';
import { withAdmin } from 'state/admin';
import { TransactionStatus, UnknownType } from 'utils';
import './PaymentWindow.css';

type AdminDashboardTableProps = {
  paymentDetails: UserPaymentDetails[] | null;
  updateTransactions;
};
type ParamsType = {
  date: string;
};
type MapType = { detail: UserPaymentDetails; transaction: UserTransactions };

type BeneficiariesType = {
  type: string;
  name: string;
  firstAddress: string;
  secondAddress: string;
  country: string;
  province: string;
  city: string;
  accountNumber: string;
  postalCode: string;
  swiftCode: string;
  documentId: string;
  bankCode: string;
  currency: string;
};

type PaymentType = {
  accountNumber: string;
  reference: string;
  documentId: string;
  purposeOfPayment: string;
  amount: string;
};

const PaymentWindow: FC<AdminDashboardTableProps> = ({
  paymentDetails,
  updateTransactions,
}) => {
  const { date } = useParams<ParamsType>();
  const BeneficiariesHeaders = [
    { label: 'Name', key: 'name' },
    { label: 'Type', key: 'type' },
    { label: 'First line of address', key: 'firstAddress' },
    { label: 'Second line of address', key: 'secondAddress' },
    { label: 'Country', key: 'country' },
    { label: 'Province', key: 'province' },
    { label: 'City', key: 'city' },
    { label: 'Postal code', key: 'postalCode' },
    { label: 'Account number', key: 'accountNumber' },
    { label: 'Swift / BIC code', key: 'swiftCode' },
    { label: 'Bank code', key: 'bankCode' },
    { label: 'Currency', key: 'currency' },
  ];

  const PaymentsHeaders = [
    { label: 'Account number', key: 'accountNumber' },
    { label: 'Invoice/Document ID', key: 'documentId' },
    { label: 'Third party reference', key: 'reference' },
    { label: 'Purpose Of Payment', key: 'purposeOfPayment' },
    { label: 'Amount', key: 'amount' },
  ];

  const [groupTransactions, setGroupTransactions] = useState<
    Map<string, MapType[]>
  >(new Map());
  const [selectedTransaction, setSelectedTransaction] = useState(new Set());
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const getMakeGroup = useCallback(() => {
    const GroupMap: Map<string, MapType[]> = new Map();
    if (paymentDetails?.length) {
      for (const detail of paymentDetails) {
        const { userTransactions } = detail;
        if (userTransactions?.items.length) {
          for (const transaction of userTransactions.items) {
            const day = new Date(transaction?.createdAt || '');
            let transactionDate = '';
            day.setMonth(day.getMonth() + 1);
            transactionDate = `${new Date(transaction?.createdAt || '')
              .toLocaleString()
              .split(',')[0]
              ?.replace(/\//g, '.')}-${day
                .toLocaleString()
                .split(',')[0]
                ?.replace(/\//g, '.')}`;
            if (atob(`${date}`) === transactionDate && transaction) {
              if (!GroupMap.get(atob(`${date}`))) {
                GroupMap.set(atob(`${date}`), [{ detail, transaction }]);
              } else {
                const data = GroupMap.get(atob(`${date}`));
                if (data) {
                  data.push({ detail, transaction });
                  GroupMap.set(atob(`${date}`), data);
                }
              }
            }
          }
        }
      }
    }
    setGroupTransactions(GroupMap);
  }, [date, paymentDetails]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case TransactionStatus.Approved:
        return 'text-[#94D2BD]';
      case TransactionStatus.Rejected:
        return 'text-[#D01C0B7D]';
      case TransactionStatus.Pending:
        return 'text-[#E9D8A6]';
    }
  };

  const selectUser = (id: string) => {
    const newSet = new Set(selectedTransaction);
    const acttionType =
      newSet.size === groupTransactions.get(atob(`${date}`))?.length
        ? 'delete'
        : 'add';
    if (id === 'all') {
      [...groupTransactions.entries()].map(([, value]) => {
        for (const data of value) {
          newSet[acttionType](data.transaction.id);
        }
      });
      setSelectedTransaction(newSet);
    } else {
      setSelectedTransaction(() => {
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    }
  };

  const getCSVdata = () => {
    const CSVdata: BeneficiariesType[] = [];

    [...groupTransactions.entries()].map(([, value]) => {
      for (const data of value) {
        CSVdata.push({
          name: data.detail.fullName,
          type: data.detail.documentID ? 'Buissnes' : 'Individual',
          firstAddress: data.detail.firstAddress,
          secondAddress: data.detail.secondAddress || '',
          country: data.detail.country,
          accountNumber: data.detail.accountNumber,
          swiftCode: data.detail.swiftCode,
          documentId: data.detail.documentID || '',
          postalCode: '',
          bankCode: '',
          province: '',
          city: '',
          currency: 'ZAR',
        });
      }
    });
    return CSVdata;
  };
  const getCSVPaymentData = () => {
    const CSVdata: PaymentType[] = [];

    [...groupTransactions.entries()].map(([, value]) => {
      for (const data of value) {
        CSVdata.push({
          accountNumber: data.detail.accountNumber,
          reference: '',
          documentId: data.detail.documentID || '',
          purposeOfPayment: 'INFLUENCER_PAYMENT',
          amount: data.transaction.paymentAmountZar?.toFixed(2) || '0.00',
        });
      }
    });

    return CSVdata;
  };
  const changeTransactionsStatus = async (newStatus: string) => {
    [...groupTransactions.entries()].map(async ([, value]) => {
      for (const data of value) {
        if (selectedTransaction.has(data.transaction.id)) {
          const input: UnknownType = {
            ...data.transaction,
            paymentStatus: newStatus,
          };
          delete input.createdAt;
          delete input.updatedAt;
          delete input.__typename;
          try {
            await updateTransactions({ variables: { input } });
            setShowSuccessModal(true);
            setSelectValue('');
            const newSet = new Set(selectedTransaction);
            newSet.clear();
            setSelectedTransaction(newSet);
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  };

  useEffect(() => {
    if (paymentDetails) {
      getMakeGroup();
    }
  }, [getMakeGroup, paymentDetails]);

  return (
    <div className="payment-window">
      <div className="flex justify-between items-center mb-5">
        <div className="text-[#0E0D0D] uppercase head-text text-[16px] font-[700] mb-0">
          Admin - Payment Window ({atob(`${date}` || '')}){' '}
        </div>
        <div className="flex items-center md:flex-row flex-col">
          <CSVLink
            data={getCSVPaymentData()}
            headers={PaymentsHeaders}
            filename={'Payments.csv'}
            className="md:mr-5"
          >
            <span className="flex items-center">
              <img src="/images/download-csv.svg" />
              <h6 className="text-[14px] font-[600] w-[120px]">
                Payment Export
              </h6>
            </span>
          </CSVLink>
          <CSVLink
            data={getCSVdata()}
            headers={BeneficiariesHeaders}
            filename={'Beneficiaries.csv'}
            className="md:mr-5"
          >
            <span className="flex items-center">
              <img src="/images/download-csv.svg" />
              <h6 className="text-[14px] font-[600] w-[160px]">
                Beneficiaries Export
              </h6>
            </span>
          </CSVLink>
          <select
            onChange={(e) => {
              changeTransactionsStatus(e.target.value);
              setSelectValue(e.target.value);
            }}
            disabled={!selectedTransaction.size}
            value={selectValue}
            className="bg-gray-50 mr-5 ml-7 w-[170px] disabled:text-[#cccccc] border select-status border-gray-300 text-gray-900 text-sm rounded-lg  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option hidden>Change Status</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        {groupTransactions.size ? (
          <table className="payment-window-table whitespace-nowrap">
            <thead>
              <tr className="admin-dashboard-table">
                <th className="admin-dashboard-table-header-label w-[10px]">
                  <input
                    type="checkbox"
                    onChange={() => {
                      selectUser('all');
                    }}
                    checked={
                      groupTransactions.get(atob(`${date}`))?.length ===
                      selectedTransaction.size
                    }
                  />
                </th>
                {BeneficiariesHeaders.map((item) => {
                  return (
                    <th
                      className="admin-dashboard-table-header-label"
                      key={'header' + item.key}
                    >
                      {item.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {[...groupTransactions.entries()].map(([key, value]) => {
                return (
                  <Fragment key={key}>
                    {value.map((data, index) => {
                      return (
                        <tr
                          key={index}
                          className={`${selectedTransaction.has(data.transaction.id)
                            ? 'active'
                            : ''
                            }`}
                        >
                          <td className="admin-dashboard-table-description">
                            <input
                              type="checkbox"
                              onChange={() => selectUser(data.transaction.id)}
                              checked={selectedTransaction.has(
                                data.transaction.id
                              )}
                            />
                          </td>
                          <td className="admin-dashboard-table-description">
                            {data.detail.documentID ? 'Buissnes' : 'Individual'}
                          </td>
                          <td className="admin-dashboard-table-description">
                            {data.detail.fullName}
                          </td>
                          <td className="admin-dashboard-table-description">
                            {data.detail.firstAddress}
                          </td>
                          <td className="admin-dashboard-table-description">
                            {data.detail.secondAddress}
                          </td>
                          <td className="admin-dashboard-table-description">
                            {data.detail.country}
                          </td>
                          <td className="admin-dashboard-table-description">
                            {data.detail.accountNumber}
                          </td>
                          <td className="admin-dashboard-table-description">
                            {data.detail.swiftCode}
                          </td>
                          <td className="admin-dashboard-table-description">
                            {data.detail.documentID && ''}
                          </td>
                          <td className="admin-dashboard-table-description">
                            {data.transaction.paymentAmount?.toFixed(2)}$
                          </td>
                          <td
                            className={`admin-dashboard-table-description ${getStatusColor(
                              data?.transaction?.paymentStatus || ''
                            )}`}
                          >
                            {data.transaction.paymentStatus}
                          </td>
                        </tr>
                      );
                    })}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="loader-content">
            <IconLoader />
          </div>
        )}
      </div>
      <Modal
        isOpen={showSuccessModal}
        handleClose={() => setShowSuccessModal(false)}
        type="brand"
        content="The selected trasnactions was successfully changed"
      />
    </div>
  );
};

export default PaymentWindow;
