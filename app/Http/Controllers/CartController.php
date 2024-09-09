<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Cart;
use App\Http\Controllers\Controller;
use App\Http\Requests\CartRequest;
use App\Http\Resources\CartResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->has('user_id')) {
            $validated = $request->validate([
                'user_id' => ['required', 'exists:users,id']
            ]);

            $carts = Cart::where('user_id', $validated['user_id'])->with('product')->get();
        } else {
            $carts = Cart::all();
        }
        return CartResource::collection($carts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CartRequest $request)
    {

        $validatedData = $request->validated();

        $existingCartItem = Cart::where('product_id', $validatedData['product_id'])
                                ->where('user_id', $validatedData['user_id'])
                                ->first();

        if ($existingCartItem) {
            $newQuantity = $validatedData['quantity'] + $existingCartItem->quantity;
            $newTotal = round($validatedData['total'] + $existingCartItem->total, 2);

            $existingCartItem->quantity = $newQuantity;
            // اعطني كود يحترم هدا النوع من البيانات ($table->decimal("total", 10, 2);)
            $existingCartItem->total = $newTotal;

            $existingCartItem->save();

            $cartItem = $existingCartItem;
        } else {
            $cartItem = Cart::create($validatedData);
        }

        return response()->json([
            'cart' => new CartResource($cartItem),
            'message' => __('Cart updated successfully')
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        $cart->delete();

        return response()->json([
            'message' => __('Cart deleted successfully')
        ]);
    }
}
