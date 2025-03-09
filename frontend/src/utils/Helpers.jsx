// Helper function to format date as "DD MMM"
export const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
};

export const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};


export const calculateTotalCost = (
  tourCost,
  numberOfAdults,
  numberOfChildren,
  numberOfInfants
) => {
  const { adult_cost, child_cost, infant_cost, tax, discount } = tourCost;

  // Calculate total cost before discount
  const totalCostBeforeDiscount =
    numberOfAdults * adult_cost +
    numberOfChildren * child_cost +
    numberOfInfants * infant_cost +
    tax;

  // Calculate discount amount
  const discountAmount = totalCostBeforeDiscount * (discount / 100);

  // Calculate final total cost
  const finalTotalCost = totalCostBeforeDiscount - discountAmount;

  return finalTotalCost;
};