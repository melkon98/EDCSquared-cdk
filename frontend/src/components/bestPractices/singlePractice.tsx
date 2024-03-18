import './bestPractices.css';
import { FC, useEffect, useState } from 'react';
import { BestPractices as IBestPractice } from 'API';
import { Storage } from 'aws-amplify';
import classNames from 'classnames';
import parse from 'html-react-parser'
interface Props {
  practice: IBestPractice;
  showDots?: boolean;
  showDetails?: boolean;
  onClick?: (id: string) => void;
}
export const SinglePractice: FC<Props> = ({
  practice,
  onClick,
  showDetails,
}) => {
  const [practiceImage, setPracticeImage] = useState<string>();

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

  const [mobileDetailsOpened, setMobileDetailsOpened] = useState({
    first: false,
    second: false,
  });
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div
      className={classNames('creator-identity__block', {
        'best-practices-full': showDetails,
      })}
      onClick={(): void => onClick?.(practice.id)}
    >
      <h3 className="creator-identity__block-title">
        {practice.headLine}
      </h3>
      <div
        className={`creator-identity__img ${
          showDetails ? 'showed-details-img' : ''
        }`}
        style={{
          backgroundImage: `url(${practiceImage})`,
        }}
      ></div>
      <div className={showDetails ? 'c-1' : ''}>
        {/* <div>
          <p>
            The budget is crucial information as it lets creative teams assess
            the scale that the project can reach and ensures that they pitch
            ideas within the company's financial resources. It's inadvisable to
            allow marketing teams to use the budget as they wish because
            projects always have a specific fiscal limit. Teams can use their
            time and resources efficiently if they understand the budgetary
            constraints of the campaign.
          </p>
          {mobileDetailsOpened.first || windowSize > 991 ? (
            <div>
              <p>
                If the company already has an established brand, share
                information about its tone and image to ensure that the campaign
                is consistent with it. You may have a brand guideline or style
                guide that you canshare. Describe the tone of voice for previous
                marketing campaigns and communications to ensure that the team's
                work aligns with the established company image.
              </p>
              <p>
                If you have regular marketing channels that you use
                consistently, you can mention them in the brief. For example, if
                you always align social media content with current campaigns,
                you may specify this so the creative team can provide content
                that also works for social media. The creative team's ideas
                might be more suitable for other channels, so being transparent
                about your usual channels can help to guide the project.
              </p>
              <p>
                Companies with extensive marketing experience may have
                information about the success of previous campaigns. Provide
                creative teams with this information, including the campaign
                objectives and performance. Understanding the success or failure
                of historic marketing projects can help creative teams identify
                effective marketing methods for the target audience.
              </p>
              <p>
                If the company already has an established brand, share
                information about its tone and image to ensure that the campaign
                is consistent with it.
              </p>
            </div>
          ) : null}
        </div>
        {mobileDetailsOpened || windowSize > 991 ? (
          <div>
            <p>
              The budget is crucial information as it lets creative teams assess
              the scale that the project can reach and ensures that they pitch
              ideas within the company's financial resources. It's inadvisable
              to allow marketing teams to use the budget as they wish because
              projects always have a specific fiscal limit. Teams can use their
              time and resources efficiently if they understand the budgetary
              constraints of the campaign.
            </p>
            <p>
              If the company already has an established brand, share information
              about its tone and image to ensure that the campaign is consistent
              with it. You may have a brand guideline or style guide that you
              can share. Describe the tone of voice for previous marketing
              campaigns and communications to ensure that the team's work aligns
              with the established company image.
            </p>
            <p>
              If you have regular marketing channels that you use consistently,
              you can mention them in the brief. For example, if you always
              align social media content with current campaigns, you may specify
              this so the creative team can provide content that also works for
              social media. The creative team's ideas might be more suitable for
              other channels, so being transparent about your usual channels can
              help to guide the project.
            </p>
            <p>
              Companies with extensive marketing experience may have information
              about the success of previous campaigns. Provide creative teams
              with this information, including the campaign objectives and
              performance. Understanding the success or failure of historic
              marketing projects can help creative teams identify effective
              marketing methods for the target audience.
            </p>
            <p>
              If the company already has an established brand, share information
              about its tone and image to ensure that the campaign is consistent
              with it.
            </p>
          </div>
        ) : null} */}
        <div className='best-practices-description'>{parse(practice.description)}</div>
      </div>
      {/* <div className="creator-dashboard__creative-learn">
        <button
          className={`${mobileDetailsOpened.first ? 'opened ' : ''}learn-more`}
          onClick={() =>
            setMobileDetailsOpened((prev) => ({
              ...prev,
              first: !prev.first,
            }))
          }
        >
          Learn more
        </button>
      </div> */}
    </div>
  );
};

export default SinglePractice;
