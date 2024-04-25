type currencies = "Real" | "Dolar" | "Kwanzas";

interface ConversionRates {
    [key: string]: number;
}

interface ConversionOptions {
    value: number;
    fromCurrency: currencies;
    toCurrency: currencies;
}

const rates: ConversionRates = {
    "Dolar_Real": 5.06,
    "Real_Dolar": 0.20,
    "Dolar_Kwanzas": 832.63,
    "Kwanzas_Dolar": 0.0012,
    "Real_Kwanzas": 164.71,
    "Kwanzas_Real": 0.0061
}


export class CurrencyConversion {
    constructor(){}

    convert({value, fromCurrency, toCurrency}: ConversionOptions): number {
        const rateKey = `${fromCurrency}_${toCurrency}`;
        const rate = rates[rateKey];
        if (rate == undefined || rate == null) {
            throw new Error(`Taxa de conversão de ${fromCurrency} para ${toCurrency} não encontrada`);
        }
        return value * rate;
    }
}

