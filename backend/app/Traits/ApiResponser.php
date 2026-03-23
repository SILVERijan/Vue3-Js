<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponser
{
    /**
     * Standard Success Response.
     *
     * @param  mixed  $data
     * @param  string|null  $message
     * @param  int  $code
     * @return \Illuminate\Http\JsonResponse
     */
    protected function successResponse($data, $message = null, $code = 200): JsonResponse
    {
        return response()->json([
            'status'  => $code,
            'success' => true,
            'message' => $message,
            'data'    => $data,
        ], $code);
    }

    /**
     * Standard Error Response.
     *
     * @param  string|null  $message
     * @param  int  $code
     * @return \Illuminate\Http\JsonResponse
     */
    protected function errorResponse($message = null, $code): JsonResponse
    {
        return response()->json([
            'status'  => $code,
            'success' => false,
            'message' => $message,
            'data'    => null,
        ], $code);
    }
}
