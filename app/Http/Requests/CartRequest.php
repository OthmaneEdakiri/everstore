<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CartRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "product_id" => ["required", "exists:products,id"],
            "user_id" => ["required", "exists:users,id"],
            "quantity" => [
                'required',
                'integer',
                'min:1',
            ],
            "total" => [
                'required',
                'numeric',
                'regex:/^\d{1,8}(\.\d{1,2})?$/',
            ],
        ];
    }
}
