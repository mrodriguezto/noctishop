export interface DashboardSummaryResponse {
  numberOfOrders: number;
  paidOrders: number;
  numberOfClients: number;
  numberOfProducts: number;
  productsWithNoInventory: number;
  lowInventory: number;
  unpaidOrders: number;
}
