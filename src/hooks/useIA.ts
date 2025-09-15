import { TRPCError } from '@trpc/server';
import { trpc } from '../utils/trpc';
import { toast } from 'sonner';

export const useAI = () => {
  const generateImageMutation = trpc.generateImage.useMutation();

  const generateImage = (prompt: string) => {
    const imagePromise = generateImageMutation
      .mutateAsync({ prompt })
      .then((imageBase64) => {
        console.log('imageBase64', imageBase64);
        return imageBase64 || false;
      })
      .catch((e) => {
        const error = e as TRPCError;
        toast.error(`${error.message}`);
        return false;
      });

    toast.promise(imagePromise, {
      loading: 'Generating AI image...',
      success: (data) => {
        if (data) {
          return 'Image generated successfully';
        } else {
          return 'No image returned';
        }
      },
      error: 'Error generating image',
    });

    return imagePromise;
  };

  return {
    generateImage,
  };
};
