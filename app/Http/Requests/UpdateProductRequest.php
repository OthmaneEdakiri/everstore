<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'name' => ['required','string', 'max:255'],
            'price' => [
                'required',
                'numeric',
                'regex:/^\d{1,8}(\.\d{1,2})?$/',
            ],
            'image' => ['image', 'mimes:png,jpg,jpeg,svg,webp', 'max:10240'],
            'categorie_id' => ['required', 'exists:categories,id']
        ];
    }
}
