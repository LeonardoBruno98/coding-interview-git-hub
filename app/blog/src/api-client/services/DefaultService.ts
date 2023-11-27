/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TrackPageViewRequest } from '../models/TrackPageViewRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static appControllerIndex(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static healthCheck(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health',
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static trackPageView(
        requestBody: TrackPageViewRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/tracking/trackPageView',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
