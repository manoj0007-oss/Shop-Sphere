export const config={apiBaseUrl:process.env.NEXT_PUBLIC_API_BASE_URL||'',appName:'ShopSphere',currency:'₹',deliveryCharge:40,freeDeliveryThreshold:499,taxRate:0.18,itemsPerPage:12} as const;
export function formatPrice(price:number):string{return `${config.currency}${price.toLocaleString('en-IN')}`;}
export function calculateDiscount(originalPrice:number,price:number):number{return Math.round(((originalPrice-price)/originalPrice)*100);}
