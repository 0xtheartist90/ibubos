export const MAX_IMAGE_UPLOAD_BYTES = 4.5 * 1024 * 1024;

const supportedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

export const getUploadError = (file: { type: string; size: number }) => {
    if (!supportedImageTypes.has(file.type)) return 'unsupported-type' as const;
    if (file.size > MAX_IMAGE_UPLOAD_BYTES) return 'too-large' as const;

    return null;
};
