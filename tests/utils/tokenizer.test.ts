import { tokenizer } from "@/app/utils/tokenizer";
import { off } from "process";

describe('tokenizer', () => {
    it('tokenizes', () => {
        const tokens = tokenizer('The Lord of the Rings, Harry Potter')
        expect(tokens).toStrictEqual([
            'the lord of the rings',
            'harry potter',
            'lord',
            'of',
            'rings',
            'harry',
            'potter',
        ])
    })
    it('tokenizes without commas', () => {
        const tokens = tokenizer('The Lord of the Rings')
        expect(tokens).toStrictEqual([
            'the lord of the rings',
            'lord',
            'of',
            'rings',
        ])
    })
    it('handles falsey values', () => {
        let tokens = tokenizer('');
        expect(tokens).toStrictEqual([]);
        tokens = tokenizer(null);
        expect(tokens).toStrictEqual([]);
        tokens = tokenizer(undefined)
        expect(tokens).toStrictEqual([])
    })

    it('does not duplicate single values', () => {
        let tokens = tokenizer('Book');
        expect(tokens).toStrictEqual(['book'])
        tokens = tokenizer('Anthony, Taylor');
        expect(tokens).toStrictEqual(['anthony', 'taylor'])
    })
})