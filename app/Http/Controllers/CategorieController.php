<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategorieResource;
use App\Models\Categorie;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategorieRequest;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Categorie::all();
        return CategorieResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategorieRequest $request)
    {
        $formFields = $request->validated();

        $categorie = Categorie::create($formFields);

        $response = new CategorieResource($categorie);

        return response()->json([
            'categorie' => $response,
            'message' => __('Categorie created successfully')
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Categorie $category)
    {
        return new CategorieResource($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategorieRequest $request, Categorie $category)
    {
        $formFields = $request->validated();

        $category->fill($formFields)->save();

        $response = new CategorieResource($category);

        return response()->json([
            'categorie' => $response,
            'message' => __('Categorie updated successfully')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categorie $categorie)
    {
        $categorie->delete();

        return response()->json([
            'message' => __('Categorie deleted successfully')
        ]);
    }

    public function destroyall(Request $request){
        $ids = $request->ids;

        foreach($ids as $id){
            $categorie = Categorie::find($id);
            $categorie->delete();
        }

        return response()->json([
            'message' => __('Categories deleted successfully')
        ]);
    }
}
