import { FC } from 'react';

interface Props {
  searchText: string;
  setSearchText(value: string): void;
}

export const Search: FC<Props> = ({ searchText, setSearchText }) => {
  return (
    <div className="brand-dashboard__item search-item border border-black overflow-x-auto max-w-full rounded-[16px] py-[11px] bg-[#ffffff] h-[40px]">
      <img
        className="brand-dashboard__item-search"
        alt=""
        src="/images/search.svg"
      />
      <input
        className="creatives-search"
        placeholder="Search..."
        value={searchText}
        onChange={(e): void => setSearchText(e.target.value)}
      />
    </div>
  );
};
export default Search;
