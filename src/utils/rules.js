export const money = value => `Rs ${value.toLocaleString('en-PK')}`;

export function checkCapacity(used, capacity) {
  return Number.isInteger(used) && used >= 0 && Number.isInteger(capacity) && capacity > 0 && used <= capacity;
}

export function deliveryFee(city, merchandise) {
  if (!['Islamabad', 'Rawalpindi'].includes(city)) return null;
  return merchandise >= 4000 ? 0 : 250;
}

export function selectionIssues(cart, products, box, scentFree) {
  const issues = [];
  if (!cart.length) issues.push('Add at least one gift to your box.');
  let used = 0;
  cart.forEach(line => {
    const item = products.find(p => p.id === line.id);
    if (!item) { issues.push('An old gift is no longer available. Remove it from your box.'); return; }
    used += item.slots * line.quantity;
    if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > item.stock) issues.push(`${item.name}: only ${item.stock} available. Reduce the quantity or remove it.`);
    if (scentFree && item.scented) issues.push(`${item.name} contains fragrance. Remove it or switch off scent-free packing.`);
  });
  if (!checkCapacity(used, box.capacity)) issues.push(`Your box uses ${used}/${box.capacity} spaces. Choose a bigger box or remove a gift.`);
  return issues;
}

export function validateForm(form) {
  const errors = {};
  if (form.recipient.trim().length < 2 || form.recipient.trim().length > 40) errors.recipient = 'Use 2–40 characters for the recipient’s name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter an email such as hello@example.com.';
  if (form.address.trim().length < 10 || form.address.trim().length > 180) errors.address = 'Use 10–180 characters, including a street and area.';
  if (deliveryFee(form.city, 0) === null) errors.city = 'We deliver to Islamabad and Rawalpindi only.';
  if (form.message.trim().length > 180) errors.message = 'Keep your gift message to 180 characters.';
  if (!form.consent) errors.consent = 'Confirm that you understand this is a demo order.';
  return errors;
}
