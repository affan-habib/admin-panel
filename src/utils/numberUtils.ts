const numbers = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];

export const toBanglaNumber = (input: number) => {
    if(localStorage.getItem('language') === 'en') {
        return input;
    }
    const numberArr = String(input).split("").map((input) => {
        return Number(input)
    });
    const output = [];
    for (let i = 0; i < numberArr.length; ++i) {
        const digit = numberArr[i];
        if (typeof digit === 'number' && numbers[digit]) {
            output.push(numbers[digit]);
        } else {
            output.push(digit);
        }
    }
    return output.join('');
}