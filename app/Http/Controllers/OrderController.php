<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Http\Resources\ProductResource;
use App\Models\Order;
use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Models\Cart;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user_id) {
            $orders = Order::where('user_id', $request->user_id)
                ->with(['order_items.product'])
                ->with('user')
                ->get();
        } else {
            $orders = Order::with(['order_items.product'])
                ->with('user')
                ->get();
        }

        return OrderResource::collection($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request)
    {
        $validatedData = $request->validated();

        $order = Order::create([
            'user_id' => $validatedData['user_id'],
            'phone' => $validatedData['phone'],
            'shipping_address' => $validatedData['shipping_address'],
            'city' => $validatedData['city'],
            'payment_method' => $validatedData['payment_method'],
            'total_amount' => $validatedData['total_amount'],
            'status' => 'pending',
        ]);

        if ($order) {
            foreach ($validatedData['cart_items'] as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem['product_id'],
                    'quantity' => $cartItem['quantity'],
                    'unit_price' => $cartItem['unit_price'],
                ]);
            }

            Cart::where('user_id', $validatedData['user_id'])->delete();
        }

        return new OrderResource($order);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return new OrderResource($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $validatedData = $request->validate([
            'status' => 'required|in:canceled,completed'
        ]);

        $order->status = $validatedData['status'];

        $order->save();

        $orderResource = new OrderResource($order);

        return response()->json([
            'order' => $orderResource,
            'message' => __('Order updated successfully')
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
