import { BestPractices } from 'API';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminRoutes } from 'utils';
import './bestPracticeTable.css';

interface Props {
  data?: Array<BestPractices | null>;
  openPractice: (practice: BestPractices) => void;
}

export const AdminPracticeTableDetails: FC<Props> = ({
  data,
  openPractice,
}) => {
  const navigate = useNavigate();

  const onBriefSelection = (brief?: BestPractices | null): void => {
    if (brief) openPractice(brief);
  };
  const onPracticeEdit = (practice?: BestPractices | null): void => {
    if (practice) navigate(AdminRoutes.EditPractice, { state: { practice } });
  };

  return (
    <table className="brand-table">
      <tr className="brand-table-header-bottom-border">
        <th className="brand-table-header-label">Heading</th>
        <th className="brand-table-header-label">Short description</th>
        <th className="brand-table-header-label centered">Status</th>
        <th className="brand-table-header-label centered">Details</th>
        <th className="brand-table-header-label centered">Edit</th>
      </tr>
      {data?.map((e, index) => (
        <tr key={`${e?.id}-brandBrief--${index}`}>
          <td className="brand-table-description break-entry capitalized best-practice-headline">
            {e?.headLine}
          </td>
          <td className="brand-table-description break-entry capitalized best-practice-description p-3">
            <div className="h-[90px] overflow-hidden">
              {e?.description.replaceAll(/<\/?[^>]+(>|$)/gi, '')}
            </div>
          </td>
          <td className="brand-table-description centered capitalized best-practice-status">
            {e?.active === 'true' ? 'Active' : 'Inactive'}
          </td>
          <td
            className="centered best-practice-icon"
            onClick={(): void => onBriefSelection(e)}
          >
            <img src="/images/search.svg" />
          </td>
          <td
            className="centered best-practice-icon"
            onClick={(): void => onPracticeEdit(e)}
          >
            <img src="/images/edit-icon.svg" />
          </td>
        </tr>
      ))}
    </table>
  );
};

export default AdminPracticeTableDetails;
