module.exports = {
    capitalStringFirstLetter(string, letterToCapital) {
        return string.charAt(letterToCapital).toUpperCase() + string.toLowerCase().slice(1);
    },
    splitNumberString(numberStr, positionToSplit, splitFormat) {
        const numberArr = numberStr.split('');
        const formattedNumArr = [];
        for (let [index, number] of numberArr.entries()) {
            index % positionToSplit === 0 && index !== numberArr.length - 1 ? formattedNumArr.push(number + splitFormat) : formattedNumArr.push(number);
        };
        return formattedNumArr.join('')
    }
}
