import { Country, getByCode } from 'countries-ts';

export default interface ProductionCompany {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string // Country code, fe.: US
}