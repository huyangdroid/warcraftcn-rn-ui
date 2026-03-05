# WarcraftCN React Native UI

A React Native/Expo implementation of the [WarcraftCN UI](https://github.com/TheOrcDev/warcraftcn-ui) component library.

This package aims to mirror the core component APIs and retro Warcraft III–inspired aesthetics of the original web library, using:

- **Expo SDK 55** (React Native 0.83)
- **uniwind** for Tailwind-style styling
- **rn-primitives** for basic building blocks (Pressable, Text, View, etc.)

The goal is: drop-in, mobile‑first Warcraft UI primitives you can use in any Expo app.

---

## Status

This is an early port, but most of the core primitives from `components/ui` and the Warcraft‑specific set are implemented.

### Implemented components

Under `src/components/warcraft`:

- **Layout & chrome**
  - `WarcraftFrame`
  - `WarcraftPanel`
  - `WarcraftCard`, `WarcraftCardHeader`, `WarcraftCardTitle`, `WarcraftCardDescription`, `WarcraftCardAction`, `WarcraftCardContent`, `WarcraftCardFooter`
  - `WarcraftSeparator`
  - `WarcraftSidebar`, `WarcraftSidebarHeader`, `WarcraftSidebarFooter`, `WarcraftSidebarToggle`, `SidebarProvider`

- **Inputs & toggles**
  - `WarcraftButton`
  - `WarcraftInput`
  - `WarcraftTextarea`
  - `WarcraftCheckbox`
  - `WarcraftToggle`

- **Navigation & surfaces**
  - `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
  - `WarcraftScrollArea`
  - `Dialog`, `DialogTrigger`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`
  - `Drawer`, `DrawerTrigger`, `DrawerOverlay`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerClose`
  - `Sheet`, `SheetTrigger`, `SheetOverlay`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetClose`

- **Feedback & display**
  - `WarcraftBadge`
  - `WarcraftTag`
  - `WarcraftKbd`, `WarcraftKbdGroup`
  - `WarcraftSkeleton`
  - `Tooltip`, `TooltipTrigger`, `TooltipContent`

- **Menus**
  - `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`

The APIs are intentionally **close to the web library** where it makes sense, but adapted for React Native (no DOM, hover, or Radix under the hood).

---

## Project structure

```text
warcraftcn-rn-ui/
├── app/                     # expo-router entry + example screens
├── src/
│   ├── components/
│   │   ├── ui/              # local RN UI utilities
│   │   └── warcraft/        # WarcraftCN RN primitives (this library)
│   ├── hooks/
│   ├── constants/
│   ├── uniwind/             # Uniwind provider wiring
│   └── ...
├── assets/
├── uniwind.config.ts        # WarcraftCN theme tokens (colors, fonts)
├── app.json
├── package.json
└── README.md
```

The theme (colors, typography) is defined in `uniwind.config.ts` and consumed via the Uniwind provider in `src/uniwind/UniwindProvider.tsx` and `app/_layout.tsx`.

---

## Getting started

Install dependencies and run the Expo dev server:

```bash
npm install
npm run start
# or
npx expo start
```

Then open the app in:

- iOS Simulator
- Android Emulator
- A physical device via Expo Go

The main demo lives in `app/index.tsx` and showcases a small subset of the Warcraft components. You can add your own playground screens under `app/` to exercise more primitives.

---

## Usage

All Warcraft components are exported from `src/components/warcraft`. In a typical Expo app, you would either:

- Use them directly via relative imports, or
- Re-export them from a local `ui` index.

Example: button and dialog

```tsx
import React from "react";
import { View } from "react-native";
import {
  WarcraftButton,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/warcraft"; // adjust path to your setup

export function ExampleScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Dialog>
        <DialogTrigger>
          <WarcraftButton>Open dialog</WarcraftButton>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Warcraft dialog</DialogTitle>
            <DialogDescription>
              This dialog is implemented with React Native primitives and Uniwind classes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <WarcraftButton>Close</WarcraftButton>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
}
```

Example: sidebar layout

```tsx
import React from "react";
import { View, Text } from "rn-primitives";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarToggle,
} from "@/components/warcraft";

export function SidebarExample() {
  return (
    <SidebarProvider defaultState="expanded">
      <View className="flex-row flex-1">
        <Sidebar>
          <SidebarHeader>
            <Text className="text-wcAccent text-xs uppercase">Navigation</Text>
          </SidebarHeader>
          <SidebarFooter>
            <SidebarToggle label="Toggle sidebar" />
          </SidebarFooter>
        </Sidebar>
        <View className="flex-1 bg-wcBackground" />
      </View>
    </SidebarProvider>
  );
}
```

---

## Design notes

- **No Radix / web-only behavior** – components are built directly on top of React Native + rn-primitives. Where the web version uses hover/focus/ARIA attributes, the RN version uses touch‑friendly equivalents (e.g. `onPressIn`/`onPressOut` for tooltips).
- **Close, not identical APIs** – names and composition patterns follow the web library where possible (e.g. `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogClose`), but some props and behaviors differ due to platform constraints.
- **Theming via Uniwind** – all visual styling is done through Uniwind class names defined in `uniwind.config.ts`, matching the WarcraftCN palette (`wcBackground`, `wcPanel`, `wcBorder`, `wcAccent`, etc.).

---

## Roadmap

- Polish component docs and examples inside the Expo app.
- Add Storybook / component gallery for easier visual QA.
- Iterate on accessibility patterns for mobile (focus management, screen reader labels, etc.).

If you want to use this in production, read through the source of each component you rely on – the implementation is intentionally small and easy to customize.
