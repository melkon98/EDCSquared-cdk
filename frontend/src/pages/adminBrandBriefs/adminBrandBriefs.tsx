import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { BrandBrief } from 'API';
import { IconLoader } from 'components';
import Modal from 'components/authentication/modal';
import { verticalOptions } from 'hooks/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withAdmin } from 'state/admin';
import { AdminRoutes } from 'utils';
import EditBrief from './editBrief';


const adminBrandBriefs = ({ brandBriefs, sortBrandBriefs }) => {
  const [filteredData, setFilteredData] = useState<BrandBrief[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sortbyDateType, setSortByDateType] = useState(true);
  const [selectedBrief, setSelectedBrief] = useState<BrandBrief | null>(
    null
  );
  const navigate = useNavigate();

  const searchBrandBrief = (text: string) => {
    if (!text.trim()) {
      setFilteredData(brandBriefs);
    } else {
      const filterData: BrandBrief[] = [];
      console.log(brandBriefs);
      for (const data of brandBriefs) {
        const briefStatus = data.active ? 'active' : 'ended';
        if (
          (data.brandName &&
            data.brandName.toLowerCase().includes(text.toLowerCase())) ||
          (data.createdAt &&
            String(
              new Date(data?.createdAt || '').toLocaleString().split(',')[0]
            ).includes(text.toLowerCase())) ||
          (data.BriefName &&
            data.BriefName.toLowerCase().includes(text.toLowerCase())) ||
          (data.vertical &&
            data.vertical
              .replaceAll('-', ' ')
              .toLowerCase()
              .includes(text.toLowerCase())) ||
          (data.objective &&
            data.objective.toLowerCase().includes(text.toLowerCase())) ||
          (data.brandName &&
            data.brandName.toLowerCase().includes(text.toLowerCase())) ||
          briefStatus.toLowerCase().includes(text.toLowerCase())
        ) {
          filterData.push(data);
        }
      }
      setFilteredData(filterData);
    }
  };

  const sliceText = (text: string) => {
    if (text.length > 40) text = text.slice(0, 40) + '...';
    return text;
  };

  useEffect(() => {
    setFilteredData(brandBriefs);
  }, [brandBriefs]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    if (id && brandBriefs) {
      const brief = brandBriefs?.find((brief) => brief?.id === id);
      if (!brief) navigate(`${AdminRoutes.BrandBriefs}`);
      else {
        setSelectedBrief(brief);
      }
    } else {
      setSelectedBrief(null);
    }
  }, [window.location.href, brandBriefs]);

  return selectedBrief ? (
    <EditBrief brief={selectedBrief} />
  ) : (
    <>
      <div className="creative-requests py-0">
        <div className="flex justify-between items-center pb-[20px] pl-0">
          <h2 className="text-[#0E0D0D] uppercase head-text text-[16px] font-[700] p-0 m-0">
            Admin - Brand Activations
          </h2>
          <div className="flex">
            <h6 className="font-[600] mr-2">Sort by date:</h6>
            <div className="flex">
              <div>
                <ArrowUpIcon
                  className={`w-[20px] ${sortbyDateType ? 'text-[#f5a422]' : 'text-primary'
                    } cursor-pointer`}
                  onClick={() => {
                    sortBrandBriefs('ASC');
                    setSortByDateType((prev) => {
                      return !prev;
                    });
                  }}
                />
              </div>
              <div>
                <ArrowDownIcon
                  className={`w-[20px] ${!sortbyDateType ? 'text-[#f5a422]' : 'text-primary'
                    } cursor-pointer`}
                  onClick={() => {
                    sortBrandBriefs('DESC');
                    setSortByDateType((prev) => {
                      return !prev;
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex items-center mb-4">
          <section className="flex gap-4 w-full">
            <div className="brand-dashboard__item search-item search-input border rounded-[16px] h-[48px] px-[30px] border-[#F5F1E8]">
              <img
                className="brand-dashboard__item-search"
                alt=""
                src="/images/search.svg"
              />
              <input
                className="creatives-search bg-white"
                placeholder="Search"
                type="text"
                name="search creative request"
                onChange={(e) => {
                  searchBrandBrief(e.target.value);
                }}
              />
            </div>
          </section>
        </div>
        <div className="brand-table-wrapper h-[auto]">
          {filteredData && brandBriefs ? (
            <div className="w-100 border border-[#F5F1E8] overflow-x-auto max-w-full rounded-[16px] pt-[11px] min-h-[399px] bg-[#ffffff] h-[calc(100vh-144px)]">
              <div className="">
                <table className="creative-requests-table brand-table whitespace-nowrap">
                  <thead>
                    <tr className="">
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[20%]">
                        Activation Name
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[10%]">
                        BRAND
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[20%]">
                        VERTICAL
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[20%]">
                        OBJECTIVE
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[10%]">
                        Status
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[10%]">
                        CREATED
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData?.map((data, index) => (
                      <tr
                        key={`${data?.id}-brandBrief--${index}`}
                        className="h-[62px] cursor-pointer"
                        onClick={() =>
                          navigate(
                            `${AdminRoutes.BrandBriefs}?id=${data.id}`
                          )
                        }
                      >
                        <td className="text-[#3D636B] brand-table-descriptionc request-table-item  break-entry capitalized best-practice-headline w-[20%]">
                          {sliceText(data?.BriefName || '')}
                        </td>
                        <td
                          className={`brand-table-description request-table-item break-entry capitalized best-practice-headline font-[700] w-[10%]`}
                        >
                          {data.brandProfile?.name || 'N/A'}
                        </td>
                        <td className="brand-table-description request-table-item capitalized best-practice-headline w-[20%]">
                          {
                            verticalOptions?.find(
                              (vertical) => vertical.value === data.vertical
                            )?.text
                          }
                        </td>
                        <td className="brand-table-description request-table-item capitalized best-practice-headline w-[20%]">
                          {data.objective}
                        </td>
                        <td className="brand-table-description request-table-item capitalized best-practice-headline w-[20%]">
                          <div
                            className={`flex justify-center rounded-[20px] h-[21px] px-[16px] font-[400] text-[12px] w-[100px] ${data.active
                              ? 'text-white bg-[#1d1d1d] leading-[20px]'
                              : 'border-2 border-[#1d1d1d] text-[#1d1d1d]'
                              }`}
                          >
                            {' '}
                            {data.active ? 'Active' : 'Ended'}
                          </div>
                        </td>
                        <td className="brand-table-description request-table-item capitalized best-practice-headline w-[10%]">
                          {
                            new Date(data.createdAt || '')
                              .toLocaleString()
                              .split(',')[0]
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="loader-content">
              <IconLoader />
            </div>
          )}
          <Modal
            isOpen={showSuccessModal}
            handleClose={() => setShowSuccessModal(false)}
            type="brand"
            content="The creator of the creative request was successfully changed"
          />
        </div>
      </div>
    </>
  );
};

export default withAdmin(adminBrandBriefs);
