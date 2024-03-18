import { useNavigate } from 'react-router-dom';
import './bestPractices.css';
import { AuthRoutes } from 'utils';
import { FC, useEffect, useState } from 'react';
import { BestPractices as IBestPractice } from 'API';
import { Storage } from 'aws-amplify';
import classNames from 'classnames';

interface Props {
  practice: IBestPractice;
  showDots?: boolean;
  showDetails?: boolean;
  onClick?: (id: string) => void;
}
export const SinglePracticeMini: FC<Props> = ({
  practice,
  showDots,
  onClick,
  showDetails,
}) => {
  const [practiceImage, setPracticeImage] = useState<string>();
  const navigate = useNavigate();

  const getImagePath = async (): Promise<void> => {
    const { urlPath } = practice;
    if (urlPath) {
      try {
        const url = await Storage.get(urlPath);
        fetch(url).then((res) => {
          if (res.status === 200) setPracticeImage(url);
        });
      } catch (err) {
        setPracticeImage(undefined);
      }
    }
  };

  useEffect(() => {
    getImagePath();
  }, [practice]);

  return (
    <div
      className={classNames('creator-dashboard__item border pt-[20px] border-black', {
        'best-practices-full': showDetails,
      })}
      onClick={(): void => onClick?.(practice.id)}
    >
      <div className="brand-dashboard__top">
        <div className="brand-dashboard__top-title text-[#0E0D0D] head-text font-[700]">
          BEST PRACTICES
        </div>
        {showDots && (
          <img
            className="brand-dashboard__top-icon"
            alt=""
            src="/images/dots-orange.svg"
            onClick={(): void => navigate(AuthRoutes.BestPractices)}
          />
        )}
      </div>
      <div className="best-practice-wrap">
        <div
          className="best-practice-image"
          style={{
            backgroundImage: `url(${practiceImage})`,
          }}
        ></div>
        <div className="best-practice-text">
          Creative checklist In the last few weeks I’ve had the pleasure of
          working with a new client, and I’m excited to share their story. They
          are a small, growing, innovative company that is looking for an
          experienced creative director.
        </div>
      </div>
      {/*<div
        className="best-practice-description"
        dangerouslySetInnerHTML={{ __html: practice.description }}
      />*/}
    </div>
  );
};

export default SinglePracticeMini;
