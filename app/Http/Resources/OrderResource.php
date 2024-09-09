<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'city' => $this->city,
            'order_items' => OrderItemResource::collection(
                $this->order_items
            ),
            'payment_method' => $this->payment_method,
            'phone' => $this->phone,
            'shipping_address' => $this->shipping_address,
            'status' => $this->status,
            'total_amount' => $this->total_amount,
            'user_id' => $this->user_id,
            'user' => $this->user,
            'created_at' => $this->created_at
        ];
    }
}
