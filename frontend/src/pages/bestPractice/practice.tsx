import { BestPractices as IBestPractice } from 'API';
import SinglePractice from 'components/bestPractices/singlePractice';
import { getActiveBestPractice } from 'hooks';
import { useState, useEffect, Fragment } from 'react';
import './practice.css';

export default function BestPractice() {
  const { getActivePractice, data, loading } = getActiveBestPractice();
  const [practices, setPractices] = useState<Array<IBestPractice | null>>([]);
  const [selectedPractice, setSelectedPractice] = useState<IBestPractice>();

  const handleClick = (id: string): void => {
    const selected = practices.find((e) => e?.id === id);
    if (selected) setSelectedPractice(selected);
  };

  useEffect(() => {
    getActivePractice({ variables: { active: 'true' } });
  }, []);

  useEffect(() => {
    if (!loading && data?.[0]) setPractices(data);
  }, [data, loading]);

  return (
    <div className="creator-identity step-1">
      <div className="flex items-center justify-between mb-[20px]">
        <h2 className="text-[#0E0D0D] uppercase head-text text-[16px] font-[700]">Best practices</h2>
        {selectedPractice && (
          <button
            onClick={(): void => setSelectedPractice(undefined)}
            className="creator-button mr-[24px]"
          >
            Back
          </button>
        )}
      </div>
      <div
        className={`creator-identity__content ${
          !selectedPractice ? 'c-2' : ''
        }`}
      >
        {selectedPractice ? (
          <SinglePractice practice={selectedPractice} showDetails />
        ) : (
          practices.map((singlePractice, index) => {
            const key = `bestPractice---${singlePractice?.id || index}`;
            if (singlePractice)
              return (
                <SinglePractice
                  practice={singlePractice}
                  key={key}
                  onClick={handleClick}
                />
              );
            return <Fragment key={key} />;
          })
        )}
      </div>
    </div>
  );
}
