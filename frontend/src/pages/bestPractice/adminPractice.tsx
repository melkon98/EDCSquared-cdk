import { useState, useEffect, FC, useMemo } from 'react';
import { BestPractices as IBestPractice } from 'API';
import { getSlicedArray } from 'components';
import AdminPracticeTableDetails from 'components/bestPracticeTable/bestPracticeTable';
import Pagination from 'components/pagination';
import { listBestPractices } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { AdminRoutes } from 'utils';
import './practice.css';
import SinglePractice from 'components/bestPractices/singlePractice';

const tableLimit = 8;
export const AdminBestPracticeTable: FC = () => {
  const navigate = useNavigate();
  const { getAllPractice, data } = listBestPractices();
  const [selectedPractice, setSelectedPractice] = useState<IBestPractice>();
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const goToPracticeCreation = (): void =>
    navigate(AdminRoutes.CreatePractice);

  useEffect(() => {
    getAllPractice({ variables: {} });
  }, []);

  const filteredData = useMemo(
    () =>
      data?.filter((e) =>
        e?.headLine?.toLowerCase().includes(input.toLowerCase())
      ),
    [data, input]
  );

  return (
    <div>
      <div className="campaign-brief-header-container">
        <div className="campaign-brief-details-text">
          Admin - Best practices
        </div>
        {selectedPractice && (
          <div
            className="back-btn"
            onClick={(): void => setSelectedPractice(undefined)}
          >
            <span className="back-btn-text">Back</span>
          </div>
        )}
      </div>
      {selectedPractice ? (
        <SinglePractice practice={selectedPractice} showDetails />
      ) : (
        <div className="brand-table-container">
          <div className="brand-table-wrapper">
            <div className="brand-brief-label-container">
              <input
                className="brand-search"
                placeholder="Search..."
                value={input}
                onChange={(e): void => setInput(e.target.value)}
              />
              <img src="/images/add-brief.svg" onClick={goToPracticeCreation} />
            </div>
            <div>
              <AdminPracticeTableDetails
                data={getSlicedArray(
                  filteredData || [],
                  tableLimit,
                  currentPage
                )}
                openPractice={setSelectedPractice}
              />
              <Pagination
                total={data?.length || 0}
                limit={tableLimit}
                goToPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBestPracticeTable;
