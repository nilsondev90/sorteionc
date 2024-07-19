declare module 'use-react-countries' {
    export interface Country {
        name: string;
        flags: { svg: string };
        countryCallingCode: string;
    }

    export function useCountries(): {
        countries: Country[];
    };
}