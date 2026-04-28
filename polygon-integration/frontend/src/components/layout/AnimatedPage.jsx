// frontend/src/components/layout/AnimatedPage.jsx
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animationVariants';
import { useAnimation } from '../../context/AnimationContext';

/**
 * Wrap each page's root element with this to get page transitions.
 * Usage:
 *   export default function MyPage() {
 *     return <AnimatedPage><div>...</div></AnimatedPage>
 *   }
 */
export default function AnimatedPage({ children, className = '', style = {} }) {
  const { isAnimated } = useAnimation();

  if (!isAnimated) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
      className={className}
      style={{ width: '100%', ...style }}
    >
      {children}
    </motion.div>
  );
}
