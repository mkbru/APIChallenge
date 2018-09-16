 function uid() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return  Math.floor(Math.random() * 90000) + 10000;
};

module.exports = uid;