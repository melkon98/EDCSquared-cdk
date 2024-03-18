import { USER_TYPES } from 'API';
import './creatorStatsCard.css';
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { IDashboardValue } from 'state/dashboard';
import { Link, useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PlacesType, Tooltip as ReactTooltip } from 'react-tooltip';

interface Props {
  type: IDashboardValue;
  value?: string;
  secondValue?: string;
  icon?: string;
  button?: string;
  url?: string;
  isTooltip?: boolean;
  seeMore?: string;
  hourText?: boolean;
  boxesType?: string;
}

export const CreatorStatsCard: FC<Props> = ({
  type: { label, tooltip, placement },
  value,
  icon,
  button,
  url,
  isTooltip,
  boxesType,
  seeMore,
  secondValue,
  hourText = false,
}) => {
  const navigate = useNavigate();
  if (!value) return <Fragment />;
  const [isCopied, setIsCopied] = useState(false);
  const [tooltipId] = useState(Math.floor(Math.random() * 10000) + 1);
  const [hasEllipsis, setHasEllipsis] = useState(false);
  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  const blockRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  function ellipsisValidation(blockWith, textWith) {
    if (textWith > blockWith) setHasEllipsis(true);
  }

  useEffect(() => {
    ellipsisValidation(
      blockRef?.current?.clientWidth,
      textRef?.current?.clientWidth
    );
    window.addEventListener('resize', () => {
      ellipsisValidation(
        blockRef?.current?.clientWidth,
        textRef?.current?.clientWidth
      );
    });
  }, []);

  return (
    <>
      <div ref={blockRef} className="d-flex">
        {seeMore ? (
          <div className="right-[20px] lg:top-[unset] top-[22px] absolute z-[9]">
            <Link to={seeMore}>
              <img src="images/search-circle.svg" alt="" />
            </Link>
          </div>
        ) : null}
        {icon && <img src={icon} className="w-[20px] h-[20px]" />}
        <div className="lg:w-full w-[170px]">
          <div
            className={`creator-dashboard__item-block-key shrink-mobile mb-[10px] head-text text-black opacity-50 font-[700] lg:text-[15px] text-[12px] uppercase`}
          >
            {label} {hourText ? ' (LAST 24 HRS)' : ''}
          </div>
          {tooltip.length ? (
            <div>
              <img
                className="absolute right-[27px] lg:top-[29px] top-[26px]"
                data-tooltip-id={`tooltip-icon-${tooltipId}`}
                src="/images/info-icon.svg"
              />
              <ReactTooltip
                id={`tooltip-icon-${tooltipId}`}
                place={placement as PlacesType | undefined}
                content={tooltip}
                className={`custom-tooltip ${placement} ${tooltip.length > 120 ? 'text-[12px]' : 'lg:text-[14px] text-[12px]'}`}
              />
            </div>
          ) : null}
          {!button && (
            <div
              data-tooltip-id={`tooltip-${label}`}
              className={`${boxesType === 'briefDetails'
                ? 'text-[25px]'
                : 'lg:text-[33px] text-[28px]'
                } creator-dashboard__item-block-value my-0 font-[500] text-black z-[9] ${hasEllipsis ? 'ellipsis' : 'whitespace-nowrap'
                }`}
              data-cy={'handle-' + value.replace('@', '')}
            >
              <div className={`${hasEllipsis ? '' : 'w-fit'}`} ref={textRef}>
                {value}
              </div>
              <span className="text-[16px] ml-[10px]">{secondValue}</span>
              {isTooltip && hasEllipsis ? (
                <ReactTooltip
                  id={`tooltip-${label}`}
                  place={'top'}
                  content={value || ''}
                  className={`custom-tooltip lg:text-[14px] text-[12px] flex justify-center top-[12px]`}
                />
              ) : null}
            </div>
          )}
        </div>
      </div>
      {button && !url ? (
        <div className="flex xl:justify-center justify-start w-full z-50">
          <CopyToClipboard
            text="https://app.edcsquared.io/login"
            onCopy={handleCopy}
          >
            <button className={`discover-btn min-w-[150px] `}>
              <p className="text-[14px]">{isCopied ? 'Copied!' : button}</p>
            </button>
          </CopyToClipboard>
        </div>
      ) : button && url ? (
        <div className="flex xl:justify-center justify-start w-full z-[1]">
          <button
            className={`discover-btn min-w-[100px] `}
            onClick={() => navigate(url)}
          >
            <p className="text-[14px]">{button}</p>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default CreatorStatsCard;
