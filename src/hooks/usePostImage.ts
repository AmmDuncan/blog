import { useTheme } from '@/context/theme';
import { Post } from 'contentlayer/generated';
import { useMemo } from 'react';

export function usePostImage(post?: Post) {
  const { theme } = useTheme();
  const featureImage = useMemo(() => {
    if (theme === 'dark' && post?.feature_dark_mode_image) {
      return post.feature_dark_mode_image;
    }
    return post?.feature_image;
  }, [theme, post]);

  return { featureImage };
}
