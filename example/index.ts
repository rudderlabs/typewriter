import Analytics from '@rudderstack/rudder-sdk-node'
import ruddertyper, {
	OrderPurchased,
	ProductAdded,
	ProductListViewed,
} from './analytics/ruddertyper'

const client = new Analytics(
	'26Sr4BnWAAm3xCIBL9Equ1uKB4N',
	'https://4466-157-47-60-34.ngrok.io/v1/batch',
	{ logLevel: 'verbose' }
)

client.track({
	event: 'Test Event',
	userId: 'desusaidesu',
})

ruddertyper.setRudderTyperOptions({
	analytics: client,
})

const orderpurchased: OrderPurchased = {
	category: 'Fashion',
	list_id: '001',
	products: [
		{
			brand: 'Nike',
			category: 'Shoes',
			coupon: 'SUMMER10',
			name: 'KnitFly',
			position: 3,
			price: 4550,
			product_id: 'Knit-001',
			quantity: 1,
			sku: 'BK-02',
			variant: 'Dark',
		},
	],
}
ruddertyper.orderPurchased(
	{
		userId: 'desusai',
		properties: orderpurchased,
	},
	() => console.log('Call back through Rudder Typer for Order Purchased')
)

const productAdded: ProductAdded = {
	category: 'Clothing',
	list_id: '32',
	productAddedDetails: {
		brand: 'Nike',
		category: 'Shoes',
		coupon: 'SUMMER10',
		name: 'KnitFly',
		position: 3,
		price: 4550,
		product_id: 'Knit-001',
		quantity: 1,
		sku: 'BK-02',
		variant: 'Dark',
		image_url: 'dummy_image',
		url: 'dummy_url',
	},
}
ruddertyper.productAdded(
	{
		userId: 'desusai',
		properties: productAdded,
	},
	() => console.log('Call back through Rudder Typer for Product Added')
)

const productListViewed: ProductListViewed = {
	category: 'Fashion',
	list_id: '001',
	products: [
		{
			brand: 'Nike',
			category: 'Shoes',
			coupon: 'SUMMER10',
			name: 'KnitFly',
			position: 3,
			price: 4550,
			product_id: 'Knit-001',
			quantity: 1,
			sku: 'BK-02',
			variant: 'Dark',
		},
	],
}

ruddertyper.productListViewed(
	{
		userId: 'desusai',
		properties: productListViewed,
	},
	() => console.log('Call back through Rudder Typer for Product List Viewed')
)
