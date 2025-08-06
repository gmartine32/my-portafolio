export const useAnimationVariants = (
  type: "fade" | "slide" | "scale" = "fade"
) => {
  const baseDelay = 0.05;

  const variantsMap = {
    fade: {
      containerVariants: {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: baseDelay,
          },
        },
      },
      itemVariants: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.5 },
        },
      },
    },
    slide: {
      containerVariants: {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: baseDelay,
          },
        },
      },
      itemVariants: {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        },
      },
    },
    scale: {
      containerVariants: {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: baseDelay,
          },
        },
      },
      itemVariants: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.4 },
        },
      },
    },
  };

  return variantsMap[type] || variantsMap.fade;
};
