const searchConditions = (key, numericKey) => {
    let conditions = [
        { name: { $regex: key, $options: "i" } },
        { brand: { $regex: key, $options: "i" } },
        { category: { $regex: key, $options: "i" } }
    ];

    if (!isNaN(numericKey)) {
        conditions.push({ price: numericKey });
    }

    return conditions;
};

module.exports = searchConditions