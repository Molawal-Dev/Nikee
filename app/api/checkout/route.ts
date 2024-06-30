import { CartItem } from '@/store/types/CartItemsTypes';
import { NextResponse } from 'next/server';
const stripe = require("stripe")(process.env.STRIPE_SECRET);

//getting active products from stripe
const getActiveProducts = async () => {
    const stripeProducts = await stripe.products.list();
    const availableProducts = stripeProducts.data.filter((product: any) => product.active === true);
    return availableProducts;
}

// CREATING A POST REQUEST. sending products to stripe.
export const POST = async(request: any) => {
    const {products} = await request.json();
    const data: CartItem[] = products;

    // const prods = await stripe.products.list();
    // console.log(prods);

    let activeProducts = await getActiveProducts();

    //creating the product in the dashboard before processing the payment.
    try{
        for(const product of data){
            //once the product is created once, it should not be created again
            const stripeProduct = activeProducts?.find((stripeProduct: any) => stripeProduct?.name?.toLowerCase() === product?.name?.toLowerCase())

            //it the product is not already existing
            if(stripeProduct === undefined){
                await stripe.products.create({
                    name: product.name,
                    default_price_data:{
                        unit_amount: product.price * 100,
                        currency: "usd",
                    },
                    images: product.imageUrl ? [product.imageUrl] : []
                })
            }
        }
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
    }

    activeProducts = await getActiveProducts()
    let stripeItems: any = [];

    for (const product of data) {
        const stripeProduct = activeProducts?.find((prod: any) => prod?.name?.toLowerCase() === product?.name?.toLowerCase())

        if(stripeProduct){
            stripeItems.push({
                price: stripeProduct?.default_price, // getting the priceId from the stripe database
                quantity: product.quantity 
            })
        }
    }

    const session = await stripe.checkout.sessions.create({
        line_items: stripeItems,
        mode: "payment",
        success_url: "http://localhost:3000/payment/payment-success",
        cancel_url: "http://localhost:3000/payment/cancelled-payment"
    })

    return NextResponse.json({ url: session.url });
}