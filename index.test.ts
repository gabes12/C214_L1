import { CurrencyConversion } from "./index"
import { describe, expect, it,  } from "@jest/globals"

describe("Currency Converter", () => {
    it("should convert USD to BRL", () => {
        const converter = new CurrencyConversion()
        const result = converter.convert({value: 10, fromCurrency: "Dolar", toCurrency: "Real"})

        expect(result).toBeCloseTo(50.6, 1)
    });

    it("should convert BRL to AOA", () => {
        const converter = new CurrencyConversion()
        const result = converter.convert({value: 10, fromCurrency: "Real", toCurrency: "Kwanzas"})

        expect(result).toBeCloseTo(1647.11, 1)
    });

    it("it should not convert USD to USD", () => {
        const converter = new CurrencyConversion()

        expect(() => converter.convert({value: 10, fromCurrency: "Dolar", toCurrency: "Dolar"})).toThrow("Taxa de conversão de Dolar para Dosadalar não encontrada")
    })
})