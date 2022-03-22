"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var rudder_sdk_node_1 = __importDefault(require("@rudderstack/rudder-sdk-node"));
var ruddertyper_1 = __importDefault(require("./analytics/ruddertyper"));
var client = new rudder_sdk_node_1["default"]('26Sr4BnWAAm3xCIBL9Equ1uKB4N', 'https://4466-157-47-60-34.ngrok.io/v1/batch', { logLevel: 'verbose' });
client.track({
    event: 'Test Event',
    userId: 'desusaidesu'
});
ruddertyper_1["default"].setRudderTyperOptions({
    analytics: client
});
var orderpurchased = {
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
            variant: 'Dark'
        },
    ]
};
ruddertyper_1["default"].orderPurchased({
    userId: 'desusai',
    properties: orderpurchased
}, function () { return console.log('Call back through Rudder Typer for Order Purchased'); });
var productAdded = {
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
        url: 'dummy_url'
    }
};
ruddertyper_1["default"].productAdded({
    userId: 'desusai',
    properties: productAdded
}, function () { return console.log('Call back through Rudder Typer for Product Added'); });
var productListViewed = {
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
            variant: 'Dark'
        },
    ]
};
ruddertyper_1["default"].productListViewed({
    userId: 'desusai',
    properties: productListViewed
}, function () { return console.log('Call back through Rudder Typer for Product List Viewed'); });
