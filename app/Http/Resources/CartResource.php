<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use function PHPSTORM_META\type;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            "total" => (float) $this->total,
            "quantity" => $this->quantity,
            "user_id" => $this->user_id,
            "product_id" => $this->product_id,
            "product" => new ProductResource($this->product)
        ];
    }

    public static function collection($resource)
    {
        $subTotal = $resource->sum('total');

        $values = parent::collection($resource)->additional([
            'sub_total' => $subTotal,
        ]);

        return $values;
    }
}
