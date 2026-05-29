/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Button } from "./Button";

export default {
  title: "Core/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "accent", "secondary", "outline", "ghost", "link", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export const Primary = {
  args: {
    variant: "primary",
    children: "Primary Button",
    size: "md",
  },
};

export const Accent = {
  args: {
    variant: "accent",
    children: "Accent Button",
    size: "md",
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Outline = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Ghost = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Link = {
  args: {
    variant: "link",
    children: "Link Button",
  },
};

export const Danger = {
  args: {
    variant: "danger",
    children: "Danger Button",
  },
};

export const AccessibilityStory = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="primary">Focus Me (Tab)</Button>
        <Button variant="secondary" aria-label="Custom accessible label">Accessible Secondary</Button>
      </div>
    </div>
  ),
};
