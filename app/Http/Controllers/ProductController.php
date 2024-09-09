<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('categorie')->get();
        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $formFields = $request->validated();

        $this->storeUploadImage($request, $formFields);

        $product = Product::create($formFields);

        $response = new ProductResource($product);

        return response()->json([
            'product' => $response,
            'message' => __('Product created successfully')
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $formFields = $request->validated();
        $this->updateUploadImage($request, $formFields,$product);
        $product->fill($formFields)->save();
        $response = new ProductResource($product);

        return response()->json([
            'product' => $response,
            'message' => __('Product updated successfully')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }

    private function storeUploadImage(StoreProductRequest $request, array &$formFields)
    {
        unset($formFields['image']);
        if ($request->hasFile('image')) {
            $formFields['image'] = $request->file('image')->store('product', 'public');
        }
    }

    private function updateUploadImage(UpdateProductRequest $request, array &$formFields, Product $product)
    {
        unset($formFields['image']);
        if ($request->hasFile('image')) {
            if ($product->image &&  \Illuminate\Support\Facades\Storage::disk('public')->exists($product->image)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($product->image);
            }

            $formFields['image'] = $request->file('image')->store('product', 'public');
        }
    }

    public function destroyall(Request $request)
    {
        $ids = $request->ids;
        foreach ($ids as $id) {
            $product = Product::find($id);
            
            $product->delete();
        }
        return response()->json([
            'message' => __('Products deleted successfully')
        ]);
    }
}
