import { CreateBrandProfileInput, GPT_INPUT, GPT_PROMPT } from 'API';
import { UnknownType } from 'utils';

export const isNameSuggestionDisable = (
  data: CreateBrandProfileInput
): boolean => !data.description || !data.toneVoice;

export const isPillarSuggestionDisable = (
  data: CreateBrandProfileInput
): boolean => isNameSuggestionDisable(data) || !data.name;

export const isMissionSuggestionDisable = (
  data: CreateBrandProfileInput
): boolean =>
  isPillarSuggestionDisable(data) ||
  !data.pillars ||
  data.pillars?.find((e) => !e?.length) !== undefined;

export const isTaglineSuggestionDisable = (
  data: CreateBrandProfileInput
): boolean => isMissionSuggestionDisable(data) || !data.internalMission;

const brandNames = (data: UnknownType): Array<string> => data?.BrandNames || [];
const brandPillars = (data: UnknownType): Array<string> => {
  if (data?.BrandPillar1) return Object.values(data);
  if (data?.BrandPillars)
    return data?.BrandPillars.map((e) => {
      if (e.PillarName) return e.PillarDescription;
      if (e.Pillar) return e.Description;
      return e;
    });
  return [];
};
const brandMission = (data: UnknownType): Array<string> => [
  data?.missionStatement || '',
];
const brandTagline = (data: UnknownType): Array<string> => {
  if (!data) return [];
  if (typeof data[0] !== 'string') return data.map((e) => Object.values(e)[0]);
  return data;
};

export const getSuggestions = (
  prompt: GPT_PROMPT,
  data?: string | null
): Array<string> | null => {
  if (!data) return null;
  try {
    const output = JSON.parse(data);
    switch (prompt) {
      case GPT_PROMPT.BRAND_NAME:
      case GPT_PROMPT.BRAND_NAME_REFRESH:
        return brandNames(output);

      case GPT_PROMPT.BRAND_PILLARS:
      case GPT_PROMPT.BRAND_PILLARS_REFRESH:
        return brandPillars(output);

      case GPT_PROMPT.BRAND_MISSION_STATEMENT:
      case GPT_PROMPT.BRAND_MISSION_STATEMENT_REFRESH:
        return brandMission(output);

      case GPT_PROMPT.BRAND_TAGLINE_STATEMENT:
      case GPT_PROMPT.BRAND_TAGLINE_STATEMENT_REFRESH:
        return brandTagline(output);

      default:
        return [];
    }
  } catch (err) {
    return null;
  }
};

export const getSuggestionInput = (
  prompt: GPT_PROMPT,
  prevData: CreateBrandProfileInput,
  firstApiCall: boolean,
  rawResponse: string
): GPT_INPUT => {
  const data = { ...prevData };
  if (!firstApiCall) {
    switch (prompt) {
      case GPT_PROMPT.BRAND_NAME:
        data.name = rawResponse;
        break;

      case GPT_PROMPT.BRAND_PILLARS:
        data.pillars = [rawResponse];
        break;

      case GPT_PROMPT.BRAND_MISSION_STATEMENT:
        data.internalMission = rawResponse;
        break;

      case GPT_PROMPT.BRAND_TAGLINE_STATEMENT:
        data.strapLine = rawResponse;
        break;
    }
  }
  return {
    prompType: firstApiCall ? prompt : ((prompt + '_REFRESH') as GPT_PROMPT),
    businessDescription: data.description,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    toneOfVoice: data.toneVoice,
    brandName: data.name,
    brandPillars: data.pillars,
    brandMissionStatement: data.internalMission,
    tagLine: data.strapLine,
  };
};
