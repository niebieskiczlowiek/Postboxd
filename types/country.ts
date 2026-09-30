import { Country as C, getByCode } from 'countries-ts';

export default interface Country {
    iso_3166_1: string, // Country code fe.: US
    name: string,
}