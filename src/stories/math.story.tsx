import { defineStory, md } from '@terrafirmagreg-team/mdx/lib/story';
import { Math } from '@terrafirmagreg-team/ui/components/mdx/math';

export const story = defineStory({
  displayName: 'math',
  Component: Math,
  args: [
    {
      variant: 'Inline',
      initial: { children: 'e = mc^2' },
    },
    {
      variant: 'Block',
      initial: {
        children: md`\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}`,
        block: true,
      },
    },
    {
      variant: 'Aligned',
      initial: {
        children: md`
          \begin{aligned}
            \nabla \cdot \vec{E} &= \frac{\rho}{\varepsilon_0} \\
            \nabla \times \vec{B} &= \mu_0 \vec{J}
          \end{aligned}
        `,
        block: true,
      },
    },
  ],
});

