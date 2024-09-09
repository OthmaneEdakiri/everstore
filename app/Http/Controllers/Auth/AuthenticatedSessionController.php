<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        $user = null;

        if(Auth::guard('web')->check()){
            $user = Auth::guard('web')->user();
        }elseif(Auth::guard('admin')->check()){
            $user = Auth::guard('admin')->user();
        }

        $request->session()->regenerate();

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('api', [$user->getRoleAttribute()])->plainTextToken
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {

        $guards = ['admin', 'web'];
        $user = null;

        if(Auth::guard('web')->check()){
            $user = Auth::guard('web')->user();
        }elseif(Auth::guard('admin')->check()){
            $user = Auth::guard('admin')->user();
        }

        if ($user) {
            $user->tokens()->delete();
        }

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
