import { HomeItem } from "@/model/home_type";
import { BaseResponseObject } from "@/model/reponse_type";
import { ContentImg } from "@/model/upload_media";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from '../../lib/baseQuery';

interface CreatePostBody {
    PV301: string;
    PV305: string;
    PL348?: string;
    PO322?: {
        image: ContentImg[];
        video: ContentImg[];
    };
    FO100?: number;
    NV106?: string;
    NV126?: string;
}

export const creataPiepApi = createApi({
    reducerPath: "creataPiepApi",
    baseQuery,
    tagTypes: ["CreatePiep"],
    endpoints: (builder) => ({
        createPiep: builder.mutation<BaseResponseObject<HomeItem>, CreatePostBody>({
            query: (body) => ({
                url: "create_piep",
                method: "POST",
                body
            })
        }),
        uploadImg: builder.mutation<BaseResponseObject<ContentImg[]>, FormData>({
            query: (formData) => ({
                url: 'upload_media',
                method: 'POST',
                body: formData,
            }),
        }),
        uploadImgVideo: builder.mutation<BaseResponseObject<ContentImg[]>, FormData>({
            query: (formData) => ({
                url: 'upload_img_video',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const {
    useCreatePiepMutation,
    useUploadImgMutation,
    useUploadImgVideoMutation,
} = creataPiepApi