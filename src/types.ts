interface KerweItem {
  name: string,
  price: number,
  specialPrice: number | null,
  needsDeposit: boolean,
}

interface OrderItem {
  name: string,
  price: number,
  specialPrice: number | null,
  needsDeposit: boolean,
  amount: number,
  group: 'Getränke' | 'Essen' | 'Wein',
}

interface Order {
  items: { [key: string]: OrderItem },
  depositsPayed: number,
  totalPrice: number,
}
