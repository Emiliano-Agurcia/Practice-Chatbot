# React/Next.js Component Libraries and Setup

While you can create your own components from scratch, using established component libraries can speed up development and ensure best practices in accessibility, performance, and user experience. Here's a guide to some of the most popular options.

## Common Component Libraries

### 1. Radix UI
A low-level, headless UI component library focused on accessibility and customization.
- **Website**: [Radix UI](https://www.radix-ui.com/)
- **Documentation**: [Radix UI Docs](https://www.radix-ui.com/docs/primitives/overview/introduction)

**Core Utilities Installation:**
```bash
npm install class-variance-authority clsx tailwind-merge
```

These utilities help with component styling:
- `class-variance-authority` — For variant-based class generation
- `clsx` — Utility for composing class names
- `tailwind-merge` — For safely merging Tailwind classes

### 2. shadcn/ui
A collection of reusable components built on top of Radix UI and Tailwind CSS. (This is Radix UI but with styling, you can override it.)
- **Website**: [shadcn/ui](https://ui.shadcn.com/)
- **Documentation**: [shadcn/ui Docs](https://ui.shadcn.com/docs)

**Installation:**
```bash
# CLI tool
npx shadcn-ui@latest init
```

**Adding Components:**
```bash
npx shadcn-ui@latest add [component-name]
# Example:
npx shadcn-ui@latest add button
```

**Key Features:**
- Copy-paste component approach
- Built with Radix UI and Tailwind
- Fully customizable
- Modern styling defaults
- Great documentation

### 3. Material UI (MUI)
A comprehensive React UI framework implementing Google's Material Design.
- **Website**: [MUI](https://mui.com/)
- **Documentation**: [MUI Docs](https://mui.com/material-ui/getting-started/overview/)

**Installation:**
```bash
npm install @mui/material @emotion/react @emotion/styled
```

**Example:**
```tsx
import { Button, TextField } from '@mui/material'

function MyForm() {
  return (
    <form>
      <TextField label="Name" />
      <Button variant="contained">Submit</Button>
    </form>
  )
}
```

**Key Features:**
- Complete design system
- Extensive component library
- Built-in theming
- Strong community
- Good documentation

## Other Popular Options

### 1. Chakra UI
- **Website**: [Chakra UI](https://chakra-ui.com/)
- **Documentation**: [Chakra UI Docs](https://chakra-ui.com/docs/getting-started)
- Modern, modular component library
- Installation: `npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion`
- Great for rapid development
- Accessible by default

### 2. TailwindUI
- **Website**: [Tailwind UI](https://tailwindui.com/)
- **Documentation**: [Tailwind UI Docs](https://tailwindui.com/documentation)
- **Official Components**: [Headless UI](https://headlessui.dev/)
- Premium component collection
- Built with Tailwind CSS
- High-quality designs
- Copy-paste ready

### 3. Mantine
- **Website**: [Mantine](https://mantine.dev/)
- **Documentation**: [Mantine Docs](https://mantine.dev/getting-started/)
- Feature-rich component library
- Installation: `npm install @mantine/core @mantine/hooks`
- Modern styling
- Extensive documentation

## Setup and Best Practices

### Utility Setup
Create `src/lib/utils.ts` for class merging:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Best Practices

1. **Consistency:**
   - Stick to one main component library
   - Maintain consistent styling patterns
   - Use consistent prop patterns

2. **Customization:**
   ```tsx
   // Good - Using utility for class merging
   <Button className={cn(
     "custom-class",
     variant === "special" && "special-class"
   )}>
     Click me
   </Button>
   ```

3. **Accessibility:**
   - Maintain ARIA attributes
   - Ensure keyboard navigation works
   - Test with screen readers

4. **Performance:**
   - Import components individually
   - Use dynamic imports for large components
   - Consider bundle size

## Creating Custom Components

When creating your own components:

1. **Structure:**
```tsx
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "base-styles",
        variant === "outline" && "outline-styles",
        className
      )}
      {...props}
    />
  )
}
```

2. **Variants:**
```typescript
import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "base-styles",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        outline: "border-2 border-primary"
      },
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)
```

## Tips for Choosing a Library

1. **Consider Your Needs:**
   - Project scale
   - Design requirements
   - Customization needs
   - Team experience

2. **Evaluate:**
   - Bundle size
   - Learning curve
   - Documentation quality
   - Community support
   - Maintenance activity

3. **Start Small:**
   - Begin with basic components
   - Add complexity as needed
   - Consider mixing approaches (e.g., Radix + custom components)
