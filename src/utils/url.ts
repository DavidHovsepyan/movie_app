import {baseURL, queryString} from '../config'

export const generateTvSeriesUrl = (tvId: string) => {
 return `${baseURL}/${tvId}?${queryString}`;
};

export const generateTopEpisodesUrl = (seasonNumber: string, tvId: string) => {
 return `${baseURL}/${tvId}/season/${seasonNumber}?${queryString}`;
};
