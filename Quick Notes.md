Project ideas:
Website

Caching:
  How to use File System as DB
  How caching works in next.js (cache:'no-store' | next: {revalidate 15}) This doesnt apply using axios

What can I do for specific info like:
  @custom-variant hover (&:hover);

  React Components?:
  - React.forwardRef:
    Allows you to forward a ref from a parent component to a DOM node (so someone using <Button ref={...} /> actually gets the underlying <button>).
  - <HTMLButtonElement, ButtonProps>:
    → First param: the element type the ref points to (button tag).
    → Second param: the props the component accepts (ButtonProps you defined).
  - ({ className, variant, size, asChild = false, ...props }, ref):
    → Destructures the props object and provides a default for asChild.
    → ...props captures all other props (onClick, aria-label, etc.) and passes them through.

Fonts:
  next/font/google: Searched in google fonts, Stored in layout.tsx, Referenced in globals.tsx > @theme <u>inline</u> (Explain this process as simple as possible)
  Most common ways of adding fonts
  Websites where you can export/download fonts
  Explain local vs non-local font handling (is non-local better?)
  Explain the differences between fonts with external network requests and the ones w/out.

Translation:
  Maybe you can change this route (my-app/i18n for request.ts)

  Clarify that you will use the most standard technique for nextjs apps
  Put the installation steps, and a simple how to use guide
  Briefly Reference other common techniques for nextjs apps

Images:
  How to declare component
  Free Images: Unsplash, Freepik, Pexels, Pixabay.

Website:
  Make a website folder, ask ideas of which topics to add.
  Starting to build
  Tricks/Gimmicks (Section scrolling, ghost components, side scrolling, etc.)
  [Website Building Tips video]()
  For section ideas, you can go to the websites in Components.md

Markdown:
  Include shortcuts for big things (table of contents)

Rendering.md:
Navigation.md:

InitialSetu.md:
  Add link to website documentation

Animation.md:
  Include some quick tips section like:
  You can see the purpose of basic css props (transition, ease-*, duration, delay), then put link at tailwind > Transitions & Animation
  icons and animate-spin
  skeleton loaders

Non-included sections:
  Styling: Better do it in the future when you 
  CSS: CSS can be easily implemented along AI (also there is documentation w3schools) 
  Tailwind: better see the documentation page, or use Tailwind Docs extension.

Use Figma extension
  Click component > code | Change CSS to preferred framework

Tutorials:
[Component Responsiveness](https://youtu.be/l04dDYW-QaI?si=vvSMTF165X0vxTMb)

[Website Building Tips](https://www.youtube.com/watch?v=OjEg0IBR_ak)
  80/20 Rule: Investigate and Design first, code later.
  Hero Section (Examples on vid)
  Repeateble design for consistency (Cards, Sections)
  Free Images: Unsplash, Freepik, Pexels, Pixabay.
  4 or 3 Colors
  1 font (3 max | Use variables)
  Bonus tips: Dynamic h1 size, flex-cards, section-snap scrolling.
  Not in video: 1 icon library

typescript```
<button className={`${condition ? "preset1" : ""}`}>
    {condition ? ( 
      // Changes Button opacity
      <div className="opacity-0 preset1-hover:opacity-100"></div>
    ) : (
      <></>
    )}
</button>
```