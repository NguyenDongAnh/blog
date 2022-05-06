import numeral from "numeral";

const formatNumber = (number) => numeral(number).format('0.0a')

export default formatNumber