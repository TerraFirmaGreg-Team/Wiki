import { defineStory, md } from '@terrafirmagreg-team/mdx/lib/story';
import { Mermaid } from '@terrafirmagreg-team/ui/components/mdx/mermaid';

export const story = defineStory({
  displayName: 'mermaid',
  Component: Mermaid,
  args: [
    {
      variant: 'Flowchart',
      initial: {
        chart: md`
          graph TD
            A[Start] --> B{Ready?}
            B -->|Yes| C[Done]
            B -->|No| D[Wait]
        `,
      },
    },
    {
      variant: 'Sequence',
      initial: {
        chart: md`
          sequenceDiagram
            Client->>Server: Request
            Server-->>Client: Response
        `,
      },
    },
    {
      variant: 'State',
      initial: {
        chart: md`
          stateDiagram-v2
            [*] --> Raw
            Raw --> Cooked: firepit
            Cooked --> [*]
        `,
      },
    },
    {
      variant: 'Class',
      initial: {
        chart: md`
          classDiagram
            Ore --|> Item
            Ingot --|> Item
            Item : +string name
            Item : +smelt()
        `,
      },
    },
    {
      variant: 'ER',
      initial: {
        chart: md`
          erDiagram
            ORE ||--o{ INGOT : "smelts into"
            INGOT ||--|{ TOOL : "forged into"
            INGOT {
              string metal
              int units
            }
        `,
      },
    },
    {
      variant: 'XYChart',
      initial: {
        chart: md`
          xychart-beta
            title "Ore yield"
            x-axis [copper, tin, iron]
            bar [45, 30, 25]
        `,
      },
    },
  ],
});

