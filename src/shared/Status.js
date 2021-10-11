export const orderStatus = (id) => {
  if (id === 1) {
    return 'Incomplete';
  }
  if (id === 2) {
    return 'Confirmed';
  }
  if (id === 3) {
    return 'In progress';
  }
  if (id === 4) {
    return 'Shipped';
  }
  if (id === 5) {
    return 'Customer unreachable';
  }
  if (id === 6) {
    return 'Out for delivery';
  }
  if (id === 7) {
    return 'Not delivered, returned';
  }
  if (id === 8) {
    return 'Not delivered, return confirmed';
  }
  if (id === 9) {
    return 'Delivered';
  }
  if (id === 10) {
    return 'Delivery confirmed';
  }
  if (id === 11) {
    return 'Return initiated';
  }
  if (id === 12) {
    return 'Return picked';
  }
  if (id === 13) {
    return 'Return confirmed';
  }
  if (id === 14) {
    return 'Return disputed';
  }
  if (id === 15) {
    return 'Canceled by seller ';
  }
  if (id === 16) {
    return 'Canceled by customer';
  }
  if (id === 17) {
    return 'Ready for pickup';
  }
};

export const changeStatus = (id) => {
  if (id === 1) {
    return 'Incomplete';
  }
  if (id === 2) {
    return 'Confirm';
  }
  if (id === 3) {
    return 'In progress';
  }
  if (id === 4) {
    return 'Shipping';
  }
  if (id === 5) {
    return 'Customer unreachable';
  }
  if (id === 6) {
    return 'Out for delivery';
  }
  if (id === 7) {
    return 'Not delivered, returned';
  }
  if (id === 8) {
    return 'Not delivered, return confirmed';
  }
  if (id === 9) {
    return 'Delivered';
  }
  if (id === 10) {
    return 'Delivery confirmed';
  }
  if (id === 11) {
    return 'Return initiated';
  }
  if (id === 12) {
    return 'Return picked';
  }
  if (id === 13) {
    return 'Return confirmed';
  }
  if (id === 14) {
    return 'Return disputed';
  }
  if (id === 15) {
    return 'Cancel by seller ';
  }
  if (id === 16) {
    return 'Cancel by customer';
  }
  if (id === 17) {
    return 'Ready for pickup';
  }
};



export const options = [
  { value: 'All', label: 'All', id: 0 },
  { value: 'Confirmed', label: 'Confirmed', id: 2 },
  { value: 'In progress', label: 'In progress', id: 3 },
  { value: 'Shipped', label: 'Shipped', id: 4 },
   { value: 'Delivered', label: 'Delivered', id: 9 },
   { value: 'Cancel by seller', label: 'Cancel by seller', id: 15 },
  { value: 'Cancel by customer', label: 'Cancel by customer', id: 16 },
  ];