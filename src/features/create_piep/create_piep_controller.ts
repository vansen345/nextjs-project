import { useAuth } from "@/lib/hook/useAuth";
import { ContentImg } from "@/model/upload_media";
import { RootState } from "@/store";
import imageCompression from 'browser-image-compression';
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalCreatePiep } from "../header/header_redux_slice";
import { setShouldRefreshHome } from "./create_piep_redux_slice";
import { useCreatePiepMutation, useUploadImgVideoMutation } from "./create_piep_services";


export const useCreatePiepController = () => {
    const { FO100, NV126, NV106 } = useAuth();

    const [images, setImages] = useState<ContentImg[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [PV301, setPV301] = useState("");
    const [PV305, setPV305] = useState("");
    const dispatch = useDispatch();
    const isModelCreatePiep = useSelector(
        (state: RootState) => state.header.isModelCreatePiep,
    );
    const inputRef = useRef<HTMLInputElement>(null);

    const onCloseCreate = () => {
        if (images.some(img => img.loading)) return;
        setPV301("");
        setPV305("");
        setImages([]);
        dispatch(setIsModalCreatePiep(false))
    }

    const [createPiep] = useCreatePiepMutation();
    // const [uploadImg] = useUploadImgMutation();
    const [uploadMedia] = useUploadImgVideoMutation();

    const handleOpenMedia = () => {
        setTimeout(() => {
            inputRef.current?.click();
        }, 200);
    };

    // const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = Array.from(e.target.files || []);
    //     const formData = new FormData();

    //     await Promise.all(
    //         files.map(async (file) => {
    //             const compressed = await imageCompression(file, {
    //                 maxSizeMB: 1,
    //                 maxWidthOrHeight: 1280,
    //             });
    //             formData.append('image', compressed, compressed.name);
    //         })
    //     );

    //     const tempImages: ContentImg[] = files.map((file, index) => ({
    //         FM600: 0,
    //         index: images.length + index + 1,
    //         IMG: URL.createObjectURL(file), // dùng base64 làm preview tạm
    //         RATIO: 1,
    //         THUMB: URL.createObjectURL(file),
    //         DES: "",
    //         loading: true,
    //         progress: 0,
    //     }));
    //     setImages((prev) => [...prev, ...tempImages]);


    //     const startIndex = images.length;
    //     const progressInterval = setInterval(() => {
    //         setImages((prev) => prev.map((img, i) => {
    //             if (i >= startIndex && img.loading && (img.progress || 0) < 90) {
    //                 return { ...img, progress: (img.progress || 0) + 10 };
    //             }
    //             return img;
    //         }));
    //     }, 200);

    //     try {
    //         const result = await uploadImg(formData).unwrap();
    //         clearInterval(progressInterval);


    //         setImages((prev) => {
    //             const newImages = [...prev];
    //             result.elements.forEach((img, i) => {
    //                 newImages[startIndex + i] = { ...img, loading: false, progress: 100 };
    //             });
    //             return newImages;
    //         });
    //     } catch (error) {
    //         clearInterval(progressInterval);
    //         console.log(error);
    //     }
    // };

    const handleMediaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const formData = new FormData();

        await Promise.all(
            files.map(async (file) => {
                if (file.type.startsWith('image/')) {
                    const compressed = await imageCompression(file, {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1280,
                    });
                    formData.append('media', compressed, compressed.name);
                } else {
                    formData.append('media', file, file.name);
                }
            })
        );

        // thêm preview tạm
        const tempMedia = files.map((file, index) => ({
            FM600: 0,
            index: images.length + index + 1,
            IMG: URL.createObjectURL(file),
            RATIO: 1,
            THUMB: URL.createObjectURL(file),
            DES: "",
            loading: true,
            progress: 0,
            type: file.type.startsWith('video/') ? 'video' : 'image',
        }));
        setImages((prev) => [...prev, ...tempMedia]);

        const startIndex = images.length;
        const progressInterval = setInterval(() => {
            setImages((prev) => prev.map((img, i) => {
                if (i >= startIndex && img.loading && (img.progress || 0) < 90) {
                    return { ...img, progress: (img.progress || 0) + 10 };
                }
                return img;
            }));
        }, 200);

        try {
            const result = await uploadMedia(formData).unwrap();
            clearInterval(progressInterval);
            setImages((prev) => {
                const newImages = [...prev];
                result.elements.forEach((img, i) => {
                    newImages[startIndex + i] = { ...img, loading: false, progress: 100 };
                });
                return newImages;
            });
            if (inputRef.current) inputRef.current.value = '';
        } catch (error) {
            clearInterval(progressInterval);
            console.log(error);
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmitCreatePiep = async () => {
        if (!PV301.trim()) return;
        if (!PV305.trim()) return;
        console.log(PV301);
        console.log(PV305);
        console.log(FO100);
        console.log(NV126);
        console.log(NV106);

        try {
            const mediaList = images.map(({ loading: _l, progress: _p, ...rest }) => rest);
            const imageList = mediaList.filter(item => item.IMG);
            const videoList = mediaList.filter(item => item.SRC);

            console.log('imageList', imageList);
            console.log('videoList', JSON.stringify(videoList));

            await createPiep({
                FO100: FO100,
                NV126: NV126,
                NV106: NV106,
                PV301,
                PV305,
                PO322: {
                    image: imageList,
                    video: videoList,
                },
            }).unwrap();

            setPV301("");
            setPV305("");
            setImages([]);
            onCloseCreate();
            dispatch(setShouldRefreshHome(true));
        } catch (error) {
            console.log(error);
        }

    }



    return {
        isLoading,
        isModelCreatePiep,
        images,
        setImages,
        onCloseCreate,
        // handleImageChange,
        removeImage,
        PV301,
        setPV301,
        PV305,
        setPV305,
        onSubmitCreatePiep,
        handleOpenMedia,
        NV126, NV106,
        inputRef,
        handleMediaChange
    }
} 